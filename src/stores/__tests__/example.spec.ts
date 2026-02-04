import { setActivePinia, createPinia } from 'pinia'
import { useExampleStore } from '@/stores/example'

describe('useExampleStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('holds initial state', () => {
    const store = useExampleStore()
    expect(store.count).toBe(0)
  })

  it('increments count', () => {
    const store = useExampleStore()
    store.increment()
    expect(store.count).toBe(1)
  })
})
