import type { NotificationConfig } from '@/domain'

export type BuilderFormState = Omit<NotificationConfig, 'id'>
