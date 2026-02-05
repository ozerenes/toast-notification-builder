import { setActivePinia, createPinia } from 'pinia'
import { setPresetStorageForTesting } from '@/infrastructure/presetStorageProvider'
import type { PresetStorage } from '@/infrastructure/presetStorage'
import type { Preset } from '@/domain'
import { usePresetStore } from '../preset.store'
import type { NotificationConfig } from '@/domain'

const baseConfig: Omit<NotificationConfig, 'id'> = {
  type: 'info',
  title: 'Title',
  message: 'Message',
  duration: 3000,
  position: 'top-right',
  backgroundColor: '#fff',
  textColor: '#000',
  showIcon: true,
  showCloseButton: true,
  animation: 'slide',
}

function createInMemoryPresetStorage(initial: unknown = null): PresetStorage {
  let data: unknown = Array.isArray(initial) ? initial : null
  return {
    load(): unknown {
      return data ?? null
    },
    save(presets: Preset[]): void {
      data = presets
    },
    clear(): void {
      data = []
    },
  }
}

describe('usePresetStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    setPresetStorageForTesting(createInMemoryPresetStorage())
  })

  afterEach(() => {
    setPresetStorageForTesting(null)
  })

  it('loads empty presets when storage is empty', () => {
    const store = usePresetStore()
    expect(store.presets).toEqual([])
  })

  it('saves and loads presets from storage', () => {
    const storage = createInMemoryPresetStorage()
    setPresetStorageForTesting(storage)
    const store = usePresetStore()
    store.savePreset('My Preset', baseConfig)
    expect(store.presets).toHaveLength(1)
    expect(store.presets[0].name).toBe('My Preset')
    expect(store.presets[0].config.type).toBe('info')
    expect(store.presets[0].config.animation).toBe('slide')

    setActivePinia(createPinia())
    setPresetStorageForTesting(storage)
    const store2 = usePresetStore()
    store2.loadPresets()
    expect(store2.presets).toHaveLength(1)
    expect(store2.presets[0].name).toBe('My Preset')
  })

  it('guards against broken data from storage', () => {
    setPresetStorageForTesting({
      load: () => 'not valid json',
      save: () => {},
      clear: () => {},
    })
    const store = usePresetStore()
    store.loadPresets()
    expect(store.presets).toEqual([])
  })

  it('skips invalid preset entries when loading', () => {
    const valid = [
      {
        id: 'valid-1',
        name: 'Valid',
        config: { ...baseConfig },
        createdAt: Date.now(),
      },
    ]
    const invalid = [
      { id: 'x', name: 'X', config: null, createdAt: 1 },
      { id: 'y', name: 'Y', config: { type: 1 }, createdAt: 1 },
    ]
    setPresetStorageForTesting(createInMemoryPresetStorage([...valid, ...invalid]))
    const store = usePresetStore()
    store.loadPresets()
    expect(store.presets).toHaveLength(1)
    expect(store.presets[0].name).toBe('Valid')
  })

  it('cloneConfig returns independent copy (reference safety)', () => {
    const store = usePresetStore()
    const mutableConfig = { ...baseConfig }
    store.savePreset('Ref Test', mutableConfig)
    mutableConfig.duration = 99999
    const preset = store.presets[0]
    expect(preset.config.duration).toBe(3000)
  })
})
