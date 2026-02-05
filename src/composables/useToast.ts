import { useNotificationStore } from '@/stores/notification.store'
import type { NotificationConfig, NotificationType, Position } from '@/domain'
import { TYPE_DEFAULT_COLORS } from '@/domain'

const DEFAULT_POSITION: Position = 'top-right'
const DEFAULT_DURATION = 3000

function createId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export interface ShowOptions {
  message?: string
  duration?: number
  position?: Position
  showIcon?: boolean
  showCloseButton?: boolean
}

export type NotificationStore = ReturnType<typeof useNotificationStore>

/**
 * Composable for toast notifications. Use for show, dismiss, clearAll and type shortcuts.
 * Accepts optional store for testing or multiple contexts; defaults to useNotificationStore().
 */
export function useToast(storeOrUndefined?: NotificationStore | null) {
  const store = storeOrUndefined ?? useNotificationStore()

  function show(config: Omit<NotificationConfig, 'id'>): string
  function show(config: NotificationConfig): string
  function show(config: NotificationConfig | Omit<NotificationConfig, 'id'>): string {
    const id = 'id' in config && config.id ? config.id : createId()
    const full: NotificationConfig = { ...config, id } as NotificationConfig
    store.addNotification(full)
    return id
  }

  function dismiss(id: string): void {
    store.removeNotification(id)
  }

  function clearAll(): void {
    store.clearAll()
  }

  function showByType(
    type: NotificationType,
    title: string,
    messageOrOptions?: string | ShowOptions,
    options?: ShowOptions
  ): string {
    const colors = TYPE_DEFAULT_COLORS[type]
    const msgOpts =
      typeof messageOrOptions === 'string'
        ? { message: messageOrOptions, ...options }
        : { message: '', ...messageOrOptions }
    const {
      message = '',
      duration = DEFAULT_DURATION,
      position = DEFAULT_POSITION,
      showIcon = true,
      showCloseButton = true,
    } = msgOpts
    return show({
      type,
      title,
      message,
      duration,
      position,
      backgroundColor: colors.backgroundColor,
      textColor: colors.textColor,
      showIcon,
      showCloseButton,
    })
  }

  return {
    show,
    dismiss,
    clearAll,
    showSuccess: (title: string, messageOrOptions?: string | ShowOptions, options?: ShowOptions) =>
      showByType('success', title, messageOrOptions, options),
    showError: (title: string, messageOrOptions?: string | ShowOptions, options?: ShowOptions) =>
      showByType('error', title, messageOrOptions, options),
    showWarning: (title: string, messageOrOptions?: string | ShowOptions, options?: ShowOptions) =>
      showByType('warning', title, messageOrOptions, options),
    showInfo: (title: string, messageOrOptions?: string | ShowOptions, options?: ShowOptions) =>
      showByType('info', title, messageOrOptions, options),
    /** Reactive list of active notifications (from store). */
    notifications: store.activeNotifications,
  }
}
