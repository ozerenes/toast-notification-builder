import { setActivePinia, createPinia } from 'pinia'
import { useToast } from '../useToast'
import { useNotificationStore } from '@/stores/notification.store'

describe('useToast', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('show() adds notification to store and returns id', () => {
    const toast = useToast()
    const id = toast.show({
      type: 'info',
      title: 'Hi',
      message: 'Hello',
      duration: 3000,
      position: 'top-right',
      backgroundColor: '#fff',
      textColor: '#000',
      showIcon: true,
      showCloseButton: true,
    })
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)

    const store = useNotificationStore()
    expect(store.activeNotifications).toHaveLength(1)
    expect(store.activeNotifications[0].title).toBe('Hi')
    expect(store.activeNotifications[0].message).toBe('Hello')
  })

  it('dismiss() removes notification from store', () => {
    const toast = useToast()
    const id = toast.show({
      type: 'success',
      title: 'Ok',
      message: 'Done',
      duration: 0,
      position: 'top-right',
      backgroundColor: '#22c55e',
      textColor: '#fff',
      showIcon: true,
      showCloseButton: true,
    })
    expect(useNotificationStore().activeNotifications).toHaveLength(1)

    toast.dismiss(id)
    expect(useNotificationStore().activeNotifications).toHaveLength(0)
  })

  it('clearAll() removes all notifications', () => {
    const toast = useToast()
    toast.show({
      type: 'info',
      title: 'A',
      message: 'a',
      duration: 0,
      position: 'top-right',
      backgroundColor: '#fff',
      textColor: '#000',
      showIcon: true,
      showCloseButton: true,
    })
    toast.show({
      type: 'info',
      title: 'B',
      message: 'b',
      duration: 0,
      position: 'top-right',
      backgroundColor: '#fff',
      textColor: '#000',
      showIcon: true,
      showCloseButton: true,
    })
    expect(useNotificationStore().activeNotifications).toHaveLength(2)

    toast.clearAll()
    expect(useNotificationStore().activeNotifications).toHaveLength(0)
  })

  it('works with injected store for testing', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = useNotificationStore()
    const toast = useToast(store)

    toast.show({
      type: 'error',
      title: 'Error',
      message: 'Something failed',
      duration: 0,
      position: 'bottom-right',
      backgroundColor: '#ef4444',
      textColor: '#fff',
      showIcon: true,
      showCloseButton: true,
    })

    expect(store.activeNotifications).toHaveLength(1)
    expect(store.activeNotifications[0].type).toBe('error')
  })
})
