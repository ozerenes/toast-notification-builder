import type { NotificationType, Position } from './notification'

export interface NotificationTypeOption {
  value: NotificationType
  label: string
  icon: string
}

export interface PositionOption {
  value: Position
  label: string
}

export const NOTIFICATION_TYPE_OPTIONS: NotificationTypeOption[] = [
  { value: 'success', label: 'Success', icon: '✓' },
  { value: 'error', label: 'Error', icon: '✕' },
  { value: 'warning', label: 'Warning', icon: '!' },
  { value: 'info', label: 'Info', icon: 'i' },
]

export const POSITION_OPTIONS: PositionOption[] = [
  { value: 'top-left', label: 'TL' },
  { value: 'top-center', label: 'TC' },
  { value: 'top-right', label: 'TR' },
  { value: 'bottom-left', label: 'BL' },
  { value: 'bottom-center', label: 'BC' },
  { value: 'bottom-right', label: 'BR' },
]
