import { IconName } from '@/assets/icons'
import type { NotificationType, Position } from './notification'

export interface NotificationTypeOption {
  value: NotificationType
  label: string
  icon: IconName
}

export interface PositionOption {
  value: Position
  label: string
  name: string
}

export const NOTIFICATION_TYPE_OPTIONS: NotificationTypeOption[] = [
  { value: 'success', label: 'Success', icon: 'check' },
  { value: 'error', label: 'Error', icon: 'x' },
  { value: 'warning', label: 'Warning', icon: 'warning' },
  { value: 'info', label: 'Info', icon: 'info' },
]

/**
 * Returns the icon name associated with a given notification type.
 * Kept in the domain layer so both Builder and Toast UI share a single mapping.
 */
export function getNotificationTypeIcon(type: NotificationType): IconName {
  const option = NOTIFICATION_TYPE_OPTIONS.find((opt) => opt.value === type)
  // Fallback to "info" to avoid rendering issues if an unknown type sneaks in.
  return option?.icon ?? 'info'
}

export const POSITION_OPTIONS: PositionOption[] = [
  { value: 'top-left', label: 'TL', name: 'Top Left' },
  { value: 'top-center', label: 'TC', name: 'Top Center' },
  { value: 'top-right', label: 'TR', name: 'Top Right' },
  { value: 'bottom-left', label: 'BL', name: 'Bottom Left' },
  { value: 'bottom-center', label: 'BC', name: 'Bottom Center' },
  { value: 'bottom-right', label: 'BR', name: 'Bottom Right' },
]
