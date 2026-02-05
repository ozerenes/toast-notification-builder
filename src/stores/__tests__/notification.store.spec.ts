import { setActivePinia, createPinia } from 'pinia'
import { useNotificationStore } from '../notification.store'
import type { NotificationConfig } from '../../domain'

const mockConfig: NotificationConfig = {
  id: 'test-1',
  type: 'info',
  title: 'Test',
  message: 'Message',
  duration: 3000,
  position: 'top-right',
  backgroundColor: '#fff',
  textColor: '#000',
  showIcon: true,
  showCloseButton: true,
}

describe('useNotificationStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a notification', () => {
    const store = useNotificationStore()
    store.addNotification(mockConfig)
    expect(store.activeNotifications).toHaveLength(1)
  })

  it('auto-dismisses after duration', (done) => {
    const store = useNotificationStore()
    store.addNotification({ ...mockConfig, id: 'auto-1', duration: 50 })
    expect(store.activeNotifications).toHaveLength(1)
    setTimeout(() => {
      expect(store.activeNotifications).toHaveLength(0)
      done()
    }, 100)
  })

  it('manual dismiss removes notification and clears timeout', () => {
    const store = useNotificationStore()
    store.addNotification({ ...mockConfig, id: 'manual-1', duration: 10000 })
    expect(store.activeNotifications).toHaveLength(1)
    store.removeNotification('manual-1')
    expect(store.activeNotifications).toHaveLength(0)
    setTimeout(() => {
      expect(store.activeNotifications).toHaveLength(0)
    }, 50)
  })

  it('timeout is cleared on removeNotification', (done) => {
    const store = useNotificationStore()
    store.addNotification({ ...mockConfig, id: 'timeout-1', duration: 200 })
    store.removeNotification('timeout-1')
    setTimeout(() => {
      expect(store.activeNotifications).toHaveLength(0)
      done()
    }, 250)
  })
})
