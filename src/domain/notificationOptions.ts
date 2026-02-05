import type { NotificationType, Position } from './notification'

export interface NotificationTypeOption {
  value: NotificationType
  label: string
  icon: string
}

export interface PositionOption {
  value: Position
  label: string
  name: string
}

export const NOTIFICATION_TYPE_OPTIONS: NotificationTypeOption[] = [
  { value: 'success', label: 'Success', icon: '✓' },
  { value: 'error', label: 'Error', icon: '✕' },
  { value: 'warning', label: 'Warning', icon: '!' },
  { value: 'info', label: 'Info', icon: 'i' },
]

export const POSITION_OPTIONS: PositionOption[] = [
  { value: 'top-left', label: 'TL', name: 'Top Left' },
  { value: 'top-center', label: 'TC', name: 'Top Center' },
  { value: 'top-right', label: 'TR', name: 'Top Right' },
  { value: 'bottom-left', label: 'BL', name: 'Bottom Left' },
  { value: 'bottom-center', label: 'BC', name: 'Bottom Center' },
  { value: 'bottom-right', label: 'BR', name: 'Bottom Right' },
]
