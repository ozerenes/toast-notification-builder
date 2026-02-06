# Toast Notification Builder

A take-home case: configure toast notifications in a builder UI, see a live preview, and trigger real toasts from a shared runtime engine.

---

## Overview

This project solves the need to design and try toast notifications without writing code. It is designed as a real-world notification engine with a separate configuration layer, not just a visual demo. You use a form to set type, title, message, duration, position, colors, and options (icon, close button). A **live preview** shows a single static toast that updates as you change the form. A separate **runtime toast engine** displays real toasts when you click "Show notification": they stack by position, support auto-dismiss, and reuse the same animations and styling. The split between preview and runtime keeps the builder UI simple while the engine behaves like a real notification system.

---

## Tech Stack

- Vue 3 (Composition API, `<script setup>`)
- TypeScript
- Pinia
- Vite
- Jest (unit and integration tests)
- CSS (design tokens, no preprocessor)

---

## Architecture & Approach

**Domain layer** (`src/domain/`): Types (`NotificationConfig`, `ActiveNotification`, `Preset`, `Position`, `NotificationAnimation`) and constants. No framework dependency; single source of truth for shape and options.

**Toast engine** (`src/features/toast/`, `src/stores/notification.store.ts`): Pinia store holds active toasts and manages auto-dismiss timeouts (and pause/resume on hover). `GlobalToastLayer` groups notifications by position and renders one `ToastContainer` per position at the application root; each container uses `TransitionGroup` and `ToastItem` with configurable enter/leave animations.

**Builder** (`src/features/builder/`): Configuration UI. `BuilderPanel` owns form state (local `ref`); form drives both a **preview** (computed single toast, rendered in a contained area) and, on "Show notification", the **runtime** engine via `addNotification`. Presets and code export are part of the builder.

**Persistence** (`src/infrastructure/`): Presets are saved and loaded via an abstract `PresetStorage` interface; default implementation uses `localStorage`. The store is wired through a provider so tests can inject an in-memory implementation.

**Separation of preview and runtime:** Preview is a read-only, single-toast reflection of the form, rendered inside the builder layout. Runtime is the real stack of toasts, viewport-positioned and driven by the notification store. This separation keeps the builder from depending on timeout or stacking logic and makes it clear that "Show notification" is the boundary between configuring and actually firing a toast.

---

## Features

**Core**

- Configure type (success, error, warning, info), title, message, duration, position (6 positions), background/text color, show icon, show close button, and animation (fade, slide, scale, bounce, flip — all transform/opacity based).
- Live preview that updates as the form changes; preview close is ignored (preview is static).
- Runtime toasts: stacking per position, auto-dismiss with optional pause on hover, close button and programmatic dismiss.
- Save, load, and delete presets; presets persist in `localStorage`.

**Bonus (optional enhancements)**

- Code export: copy a JS/JSON snippet of the current configuration.
- Light/dark theme with persistence.

---

## Running the Project

```bash
npm install
npm run dev
```

Tests:

```bash
npm run test
```

---

## Live Demo

A deployed build is available at [https://toast-notification-builder-kappa.vercel.app/](https://toast-notification-builder-kappa.vercel.app/) for quick review without cloning.

---

## Assumptions & Trade-offs

- No backend: presets and theme are client-only; `localStorage` is used by design for this case.
- Preset storage is abstracted behind an interface so the app can be tested without touching `localStorage`.
- UI is built for desktop first; responsive behavior is limited.
- Toast engine is in-app only; no SDK or embed script for external use.

---

## Notes for Reviewers

The code is structured for clarity and maintainability: domain types and persistence are isolated, the builder and toast engine are separated, and tests cover stores, composables, and key UI flows. The primary focus of this case was architecture, type safety, and long-term maintainability rather than visual polish or feature count.
