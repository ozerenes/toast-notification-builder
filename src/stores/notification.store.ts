import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ActiveNotification, NotificationConfig } from '@/domain'

/**
 * Toast engine (runtime) store.
 */
export const useNotificationStore = defineStore('notification', () => {
  const activeNotifications = ref<ActiveNotification[]>([])
  const dismissTimeouts = new Map<string, ReturnType<typeof setTimeout>>()
  const pauseMeta = new Map<string, { totalPausedMs: number; pausedAt: number | null }>()

  function addNotification(config: NotificationConfig) {
    const now = Date.now()
    const active: ActiveNotification = { ...config, createdAt: now }
    activeNotifications.value.push(active)

    if (config.duration > 0) {
      const timeoutId = setTimeout(() => {
        removeNotification(config.id)
        dismissTimeouts.delete(config.id)
        pauseMeta.delete(config.id)
      }, config.duration)
      dismissTimeouts.set(config.id, timeoutId)
    }

    // Track pause metadata for potential hover-based pause/resume.
    pauseMeta.set(config.id, { totalPausedMs: 0, pausedAt: null })
  }

  function removeNotification(id: string) {
    const timeoutId = dismissTimeouts.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      dismissTimeouts.delete(id)
    }
    pauseMeta.delete(id)
    activeNotifications.value = activeNotifications.value.filter((n) => n.id !== id)
  }

  function pauseAutoDismiss(id: string) {
    const meta = pauseMeta.get(id)
    if (!meta || meta.pausedAt !== null) return

    meta.pausedAt = Date.now()

    const timeoutId = dismissTimeouts.get(id)
    if (timeoutId) {
      clearTimeout(timeoutId)
      dismissTimeouts.delete(id)
    }
  }

  function resumeAutoDismiss(id: string) {
    const meta = pauseMeta.get(id)
    if (!meta || meta.pausedAt === null) return

    const notification = activeNotifications.value.find((n) => n.id === id)
    if (!notification || notification.duration <= 0) {
      pauseMeta.delete(id)
      return
    }

    const now = Date.now()
    meta.totalPausedMs += now - meta.pausedAt
    meta.pausedAt = null

    const elapsedActive = now - notification.createdAt - meta.totalPausedMs
    const remaining = notification.duration - elapsedActive

    if (remaining <= 0) {
      removeNotification(id)
      pauseMeta.delete(id)
      return
    }

    const timeoutId = setTimeout(() => {
      removeNotification(id)
      dismissTimeouts.delete(id)
      pauseMeta.delete(id)
    }, remaining)
    dismissTimeouts.set(id, timeoutId)
  }

  function clearAll() {
    // Clear all timeouts first to avoid leaks, then reset the list.
    for (const id of dismissTimeouts.keys()) {
      clearTimeout(dismissTimeouts.get(id)!)
    }
    dismissTimeouts.clear()
    activeNotifications.value = []
  }

  return { activeNotifications, addNotification, removeNotification, clearAll, pauseAutoDismiss, resumeAutoDismiss }
})
