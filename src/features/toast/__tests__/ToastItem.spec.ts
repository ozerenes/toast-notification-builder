import { mount } from '@vue/test-utils'
import ToastItem from '../ToastItem.vue'
import type { ActiveNotification } from '@/domain'

const baseNotification: ActiveNotification = {
  id: 'toast-1',
  type: 'success',
  title: 'Done',
  message: 'Operation completed.',
  duration: 3000,
  position: 'top-right',
  backgroundColor: '#22c55e',
  textColor: '#ffffff',
  showIcon: true,
  showCloseButton: true,
  createdAt: Date.now(),
}

describe('ToastItem', () => {
  it('renders notification title and message', () => {
    const wrapper = mount(ToastItem, {
      props: { notification: baseNotification },
    })
    expect(wrapper.find('.toast-item__title').text()).toBe('Done')
    expect(wrapper.find('.toast-item__message').text()).toBe('Operation completed.')
  })

  it('renders type icon when showIcon is true', () => {
    const wrapper = mount(ToastItem, {
      props: { notification: baseNotification },
    })
    expect(wrapper.find('.toast-item__icon').text()).toBe('✓')
  })

  it('hides icon when showIcon is false', () => {
    const wrapper = mount(ToastItem, {
      props: {
        notification: { ...baseNotification, showIcon: false },
      },
    })
    expect(wrapper.find('.toast-item__icon').exists()).toBe(false)
  })

  it('emits close with notification id when close button is clicked', async () => {
    const wrapper = mount(ToastItem, {
      props: { notification: baseNotification },
    })
    await wrapper.find('.toast-item__close').trigger('click')
    expect(wrapper.emitted('close')).toEqual([['toast-1']])
  })

  it('hides close button when showCloseButton is false', () => {
    const wrapper = mount(ToastItem, {
      props: {
        notification: { ...baseNotification, showCloseButton: false },
      },
    })
    expect(wrapper.find('.toast-item__close').exists()).toBe(false)
  })
})
