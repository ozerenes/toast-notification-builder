import type { NotificationConfig } from '@/domain'
import type { ToastAnimation } from '@/components/Toast/animations/toastAnimations'

export type AnimationType = ToastAnimation

export type BuilderFormState = Omit<NotificationConfig, 'id'>
