/**
 * Toast notification domain types.
 */

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface NotificationConfig {
  id: string
  type: NotificationType
  title: string
  message: string
  duration: number // ms, 0 = persistent
  position: Position
  backgroundColor: string
  textColor: string
  showIcon: boolean
  showCloseButton: boolean
}

export interface ActiveNotification extends NotificationConfig {
  createdAt: number
}
