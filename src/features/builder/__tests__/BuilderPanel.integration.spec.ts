import { mount, flushPromises } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import BuilderPanel from '../BuilderPanel.vue'
import { useNotificationStore } from '@/stores/notification.store'

describe('BuilderPanel integration', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds notification to store when Show Notification is clicked', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const wrapper = mount(BuilderPanel, {
      global: {
        plugins: [pinia],
      },
    })

    const titleInput = wrapper.find('#builder-title')
    const messageInput = wrapper.find('#builder-message')
    await titleInput.setValue('Integration Title')
    await messageInput.setValue('Integration message')
    await flushPromises()

    const showButton = wrapper
      .findAll('button')
      .find((w) => w.text().trim() === 'Show Notification')
    expect(showButton).toBeDefined()
    await showButton!.trigger('click')
    await flushPromises()

    const store = useNotificationStore()
    expect(store.activeNotifications).toHaveLength(1)
    expect(store.activeNotifications[0].title).toBe('Integration Title')
    expect(store.activeNotifications[0].message).toBe('Integration message')
  })
})
