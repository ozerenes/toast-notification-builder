import { setActivePinia, createPinia } from 'pinia'
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

describe('usePresetStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear()
    }
  })

  it('loads empty presets when localStorage is empty', () => {
    const store = usePresetStore()
    expect(store.presets).toEqual([])
  })

  it('saves and loads presets from localStorage', () => {
    setActivePinia(createPinia())
    const store = usePresetStore()
    store.savePreset('My Preset', baseConfig)
    expect(store.presets).toHaveLength(1)
    expect(store.presets[0].name).toBe('My Preset')
    expect(store.presets[0].config.type).toBe('info')
    expect(store.presets[0].config.animation).toBe('slide')

    setActivePinia(createPinia())
    const store2 = usePresetStore()
    expect(store2.presets).toHaveLength(1)
    expect(store2.presets[0].name).toBe('My Preset')
  })

  it('guards against broken data in localStorage', () => {
    if (typeof window === 'undefined' || !window.localStorage) return
    window.localStorage.setItem('toast-builder-presets', 'not valid json')
    const store = usePresetStore()
    store.loadPresets()
    expect(store.presets).toEqual([])
  })

  it('skips invalid preset entries when loading', () => {
    if (typeof window === 'undefined' || !window.localStorage) return
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
    window.localStorage.setItem('toast-builder-presets', JSON.stringify([...valid, ...invalid]))
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
