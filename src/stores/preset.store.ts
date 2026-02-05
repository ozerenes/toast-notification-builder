import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { NotificationConfig, Preset } from '@/domain'
import { createLocalStoragePresetStorage } from '@/infrastructure/presetStorage'

export type { Preset } from '@/domain'

const presetStorage = createLocalStoragePresetStorage()

interface PresetState {
  presets: Preset[]
}

function createPresetId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).slice(2, 10)
  return `preset_${timestamp}_${random}`
}

function cloneConfig(config: Omit<NotificationConfig, 'id'>): Omit<NotificationConfig, 'id'> {
  // NotificationConfig is a flat object of primitives, so a shallow clone is sufficient
  return { ...config }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isValidPreset(value: unknown): value is Preset {
  if (!isPlainObject(value)) return false

  const { id, name, config, createdAt } = value as {
    id: unknown
    name: unknown
    config: unknown
    createdAt: unknown
  }

  if (typeof id !== 'string') return false
  if (typeof name !== 'string') return false
  if (typeof createdAt !== 'number') return false
  if (!isPlainObject(config)) return false

  const cfg = config as Record<string, unknown>

  const requiredStringProps: string[] = [
    'type',
    'title',
    'message',
    'position',
    'backgroundColor',
    'textColor',
  ]

  for (const key of requiredStringProps) {
    if (typeof cfg[key] !== 'string') return false
  }

  if (typeof cfg.duration !== 'number') return false
  if (typeof cfg.showIcon !== 'boolean') return false
  if (typeof cfg.showCloseButton !== 'boolean') return false
  if (cfg.animation !== undefined && typeof cfg.animation !== 'string') return false

  return true
}

export const usePresetStore = defineStore('preset', () => {
  const state = ref<PresetState>({ presets: [] })

  const presets = computed(() => state.value.presets)

  function getPresetById(id: string): Preset | undefined {
    return state.value.presets.find((preset) => preset.id === id)
  }

  function loadPresets(): void {
    const raw = presetStorage.load()

    if (!Array.isArray(raw)) {
      // Missing, invalid, or corrupted storage – reset to empty
      state.value.presets = []
      return
    }

    const parsed: Preset[] = []

    for (const candidate of raw) {
      if (isValidPreset(candidate)) {
        // Defensive clone to avoid sharing references with storage representation
        const clonedConfig = cloneConfig(candidate.config)
        parsed.push({
          id: candidate.id,
          name: candidate.name,
          config: clonedConfig,
          createdAt: candidate.createdAt,
        })
      }
    }

    state.value.presets = parsed
  }

  function savePreset(name: string, config: Omit<NotificationConfig, 'id'>): void {
    const clonedConfig = cloneConfig(config)

    const preset: Preset = {
      id: createPresetId(),
      name,
      config: clonedConfig,
      createdAt: Date.now(),
    }

    state.value.presets = [...state.value.presets, preset]
    presetStorage.save(state.value.presets)
  }

  function deletePreset(id: string): void {
    state.value.presets = state.value.presets.filter((preset) => preset.id !== id)
    presetStorage.save(state.value.presets)
  }

  function clearPresets(): void {
    state.value.presets = []
    presetStorage.clear()
  }

  // No automatic loadPresets() here; app bootstrap calls loadPresets() once (see main.ts).
  // This keeps store creation side-effect-free and makes init explicit for tests/SSR.

  return {
    // state
    presets,
    // getters
    getPresetById,
    // actions
    savePreset,
    deletePreset,
    loadPresets,
    clearPresets,
  }
})
