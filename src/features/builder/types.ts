import type { NotificationConfig, NotificationAnimation } from '@/domain'

export type AnimationType = NotificationAnimation

export type BuilderFormState = Omit<NotificationConfig, 'id'>
