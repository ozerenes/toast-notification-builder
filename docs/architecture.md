# Architecture Overview

This document describes the high-level architecture and design decisions of the Toast Notification Builder.

## Goals

- **Separate concerns**: Builder (configuration UI) vs. Toast Engine (runtime display and behavior).
- **Stateless, reusable UI**: Components receive props and emit events; domain types are the single source of truth.
- **TypeScript-first**: Domain and stores are strictly typed; no `any` in core paths.
- **Testable**: Stores and composables can be unit-tested; persistence is abstracted (e.g. preset storage).

## Non-Goals

- Full-featured toast framework or SSR.
- Backend persistence (presets are localStorage-only).
- Heavy abstractions or framework lock-in beyond Vue 3 + Pinia.

---

## High-Level Modules

| Module | Responsibility |
|--------|----------------|
| **Domain** | Types (`NotificationConfig`, `Position`, etc.), constants (`TYPE_DEFAULT_COLORS`, `POSITION_OPTIONS`). No Vue, no side effects. |
| **Builder** | UI to create/edit notification configs: form state (local), presets (store), live preview, optional code export. |
| **Toast Engine** | Display active toasts: stacking, position, animation, auto-dismiss. Backed by notification store. |
| **Persistence** | Preset store: save/load/delete presets via localStorage; validation and defensive parsing. |

---

## Folder Structure

```
src/
├── domain/                   # Types and constants (framework-agnostic)
│   ├── index.ts
│   ├── notification.ts       # NotificationConfig, ActiveNotification, Preset
│   ├── notificationDefaults.ts
│   └── notificationOptions.ts
├── infrastructure/             # Persistence adapters (injectable for tests)
│   ├── presetStorage.ts        # PresetStorage interface + createLocalStoragePresetStorage()
│   └── presetStorageProvider.ts # getPresetStorage(), setPresetStorageForTesting() for test injection
├── shared/                     # Shared utilities (ID generation, constants)
│   ├── id.ts                   # createId, createNotificationId, createPresetId
│   ├── constants.ts            # COPY_FEEDBACK_MS, MAX_DURATION_SEC
│   └── index.ts
├── stores/
│   ├── notification.store.ts # Active toasts + timeouts
│   ├── preset.store.ts       # Presets; uses infrastructure presetStorage
│   └── __tests__/
├── composables/
│   ├── index.ts
│   ├── useToast.ts             # show, dismiss, clearAll, showSuccess/Error/…
│   └── __tests__/
├── features/
│   ├── builder/                # Builder feature (config UI, preview, presets, export)
│   │   ├── index.ts            # Barrel: BuilderPanel, BuilderForm, BuilderPreview, types
│   │   ├── types.ts            # BuilderFormState, AnimationType
│   │   ├── exportCode.ts       # buildExportCode(form, animation)
│   │   ├── presetValidation.ts # validatePresetName, PRESET_VALIDATION
│   │   ├── BuilderPanel.vue    # Orchestrator: form state, preview, store wiring
│   │   ├── BuilderForm.vue     # Form container (modelValue / update:modelValue)
│   │   ├── BuilderPreview.vue  # Composes preview area, actions, presets, code export
│   │   ├── BuilderPreviewArea.vue
│   │   ├── BuilderPreviewActions.vue
│   │   ├── BuilderPresets.vue   # Save/load/apply presets
│   │   ├── BuilderCodeExport.vue
│   │   └── Builder*.vue        # Field-level: TypePills, TitleMessage, Duration, PositionGrid, …
│   └── toast/                  # Toast engine (display, animation)
│       ├── index.ts
│       ├── GlobalToastLayer.vue # Renders one ToastContainer per position (app-level)
│       ├── ToastContainer.vue   # List + transition for one position
│       ├── ToastItem.vue        # Single toast UI
│       ├── __tests__/
│       └── animations/         # toastAnimations.ts (types + names), toastAnimations.css
├── styles/
│   ├── tokens.css              # Design tokens (spacing, radius, font, colors)
│   └── builder-shared.css      # .builder-group, .builder-group__label
├── App.vue
└── main.ts
```

---

## Data Flow

### Builder

- **State ownership**: `BuilderPanel` holds form state in a single `ref<BuilderFormState>` (and optional `ref<AnimationType>` for preview). No Pinia for builder form.
- **Form → Store**: User clicks “Show notification” (or applies a preset) → `NotificationConfig` is built (e.g. add `id`) → `useNotificationStore().addNotification(config)`.
- **Presets**: `usePresetStore()` for save/load/delete; presets are `{ id, name, config, createdAt }`; config is `Omit<NotificationConfig, 'id'>`. Persistence is delegated to `getPresetStorage()` from `src/infrastructure/presetStorageProvider.ts` (default: localStorage adapter). Tests call `setPresetStorageForTesting(mockStorage)` so the store uses an in-memory mock and does not touch localStorage.

### Toast engine

- **Notification store**: Holds `activeNotifications: Ref<ActiveNotification[]>`, manages auto-dismiss timeouts (internal `dismissTimeouts` Map; not exposed and must be excluded from any future store serialization), and exposes `addNotification`, `removeNotification`, `clearAll`.
- **GlobalToastLayer**: Reads store (e.g. via `storeToRefs`), groups notifications by position, renders one `ToastContainer` per position with the chosen animation.
- **ToastContainer**: Receives `notifications`, `position`, optional `animation`; uses `TransitionGroup` and `ToastItem`; emits `close(id)` → store removes notification.

### Composable

- **useToast(store?)**: Thin wrapper over notification store: `show(config)`, `dismiss(id)`, `clearAll()`, and helpers `showSuccess`, `showError`, `showWarning`, `showInfo`. Accepts optional store for testing or multiple contexts; defaults to `useNotificationStore()`. Exposes reactive `notifications`.

---

## State Summary

| State | Where | Persisted |
|-------|--------|-----------|
| Builder form (type, title, message, duration, position, colors, options, animation) | `BuilderPanel` (ref) | No |
| Active toasts | `notification` store (Pinia) | No |
| Presets | `preset` store (Pinia) | Yes (localStorage) |

---

## Key Conventions

- **Vue 3 Composition API** with `<script setup>` and TypeScript.
- **Props/emits**: Typed with `defineProps<T>()` and `defineEmits<T>()`; v-model via `modelValue` / `update:modelValue` where appropriate.
- **Builder public API**: Only `BuilderPanel`, `BuilderForm`, `BuilderPreview`, and types are exported from `@/features/builder`; inner components stay private.
- **Design tokens**: Shared spacing, radius, font sizes, and colors in `styles/tokens.css`; components use `var(--…)` for consistency.

---

## Open / Future

- **Animation**: Multiple variants (fade, slide, scale, bounce, flip) exist in Toast animations; builder may expose animation choice in form state and pass it through to engine.
- **Code export**: Optional JS/JSON export of current config for copy-paste (e.g. in BuilderPanel or a dedicated export component).
- **Accessibility**: ARIA and keyboard behavior for toasts and builder controls to be reviewed and documented.
