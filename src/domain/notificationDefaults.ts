import type { NotificationType } from './notification'

export const TYPE_DEFAULT_COLORS: Record<
  NotificationType,
  { backgroundColor: string; textColor: string }
> = {
  success: { backgroundColor: '#22c55e', textColor: '#ffffff' },
  error: { backgroundColor: '#ef4444', textColor: '#ffffff' },
  warning: { backgroundColor: '#f59e0b', textColor: '#ffffff' },
  info: { backgroundColor: '#3b82f6', textColor: '#ffffff' },
}
