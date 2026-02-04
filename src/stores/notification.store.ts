import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ActiveNotification, NotificationConfig } from '@/domain'

/**
 * Toast engine (runtime) store.
 */
export const useNotificationStore = defineStore('notification', () => {
  const activeNotifications = ref<ActiveNotification[]>([])
  const dismissTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

  function addNotification(config: NotificationConfig) {
    const active: ActiveNotification = { ...config, createdAt: Date.now() }
    activeNotifications.value.push(active)

    if (config.duration > 0) {
      const timeoutId = setTimeout(() => {
        removeNotification(config.id)
        dismissTimeouts.delete(config.id)
      }, config.duration)
      dismissTimeouts.set(config.id, timeoutId)
    }
  }

  function removeNotification(id: string) {
    const timeoutId = dismissTimeouts.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      dismissTimeouts.delete(id)
    }
    activeNotifications.value = activeNotifications.value.filter((n) => n.id !== id)
  }

  return { activeNotifications, addNotification, removeNotification }
})
