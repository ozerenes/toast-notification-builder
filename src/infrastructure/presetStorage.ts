/**
 * Preset persistence abstraction.
 * Store uses this adapter; tests can inject a mock implementation.
 */
import type { Preset } from '@/domain'

export interface PresetStorage {
  load(): unknown
  save(presets: Preset[]): void
  clear(): void
}

const DEFAULT_STORAGE_KEY = 'toast-builder-presets'

/**
 * Default localStorage-backed preset storage.
 * Safe in SSR/test: no-op when window or localStorage is missing.
 */
export function createLocalStoragePresetStorage(storageKey = DEFAULT_STORAGE_KEY): PresetStorage {
  return {
    load(): unknown {
      if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
        return null
      }

      try {
        const raw = window.localStorage.getItem(storageKey)
        if (!raw) return null
        return JSON.parse(raw)
      } catch {
        return null
      }
    },

    save(presets: Preset[]): void {
      if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
        return
      }

      try {
        window.localStorage.setItem(storageKey, JSON.stringify(presets))
      } catch {
        // Swallow storage errors to avoid breaking the app
      }
    },

    clear(): void {
      if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
        return
      }

      try {
        window.localStorage.removeItem(storageKey)
      } catch {
        // Swallow storage errors
      }
    },
  }
}
