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
    expect(store.activeNotifications.length).toBe(1)
  })
})
