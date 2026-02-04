import { setActivePinia, createPinia } from 'pinia'
import { useExampleStore } from '../example'

describe('useExampleStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('increments count', () => {
    const store = useExampleStore()
    expect(store.count).toBe(0)
    store.increment()
    expect(store.count).toBe(1)
  })
})
