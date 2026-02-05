/**
 * Provides the PresetStorage instance used by the preset store.
 * Tests can inject a mock via setPresetStorageForTesting() so the store
 * does not depend on real localStorage.
 */
import type { PresetStorage } from './presetStorage'
import { createLocalStoragePresetStorage } from './presetStorage'

let testOverride: PresetStorage | null = null

/**
 * Returns the preset storage adapter. In production this is the default
 * localStorage adapter; in tests it can be overridden with setPresetStorageForTesting().
 */
export function getPresetStorage(): PresetStorage {
  if (testOverride !== null) {
    return testOverride
  }
  return createLocalStoragePresetStorage()
}

/**
 * Inject a custom storage for tests. Pass null to reset to the default adapter.
 * Only use in test setup/teardown.
 */
export function setPresetStorageForTesting(storage: PresetStorage | null): void {
  testOverride = storage
}
