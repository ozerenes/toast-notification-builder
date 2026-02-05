/**
 * Toast notification domain types.
 */

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export type Position =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center'

/** Animation name for toast enter/leave (must match ToastAnimation in UI). */
export type NotificationAnimation = 'fade' | 'slide' | 'scale' | 'bounce' | 'flip'

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
  /** Optional; defaults to 'slide' when not provided. */
  animation?: NotificationAnimation
}

export interface ActiveNotification extends NotificationConfig {
  createdAt: number
}

/** Preset DTO for persistence (save/load). */
export interface Preset {
  id: string
  name: string
  config: Omit<NotificationConfig, 'id'>
  createdAt: number
}
