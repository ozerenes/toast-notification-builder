/**
 * Isolated export code generation for the builder (copy-paste snippet).
 */
import type { BuilderFormState } from './types'
import type { AnimationType } from './types'

const EXPORT_DEFAULT_TITLE = 'Success!'
const EXPORT_DEFAULT_MESSAGE = 'Your changes have been saved.'

export function buildExportCode(form: BuilderFormState, animation: AnimationType): string {
  const {
    type,
    title,
    message,
    duration,
    position,
    backgroundColor,
    textColor,
    showIcon,
    showCloseButton,
  } = form

  const lines = [
    "import { createNotificationId } from '@/shared/id'",
    "import { useNotificationStore } from '@/stores/notification.store'",
    '',
    'const notificationStore = useNotificationStore()',
    'notificationStore.addNotification({',
    `  id: createNotificationId(),`,
    `  type: '${type}',`,
    `  title: '${title || EXPORT_DEFAULT_TITLE}',`,
    `  message: '${message || EXPORT_DEFAULT_MESSAGE}',`,
    `  duration: ${duration},`,
    `  position: '${position}',`,
    `  backgroundColor: '${backgroundColor}',`,
    `  textColor: '${textColor}',`,
    `  showIcon: ${showIcon},`,
    `  showCloseButton: ${showCloseButton},`,
    `  animation: '${animation}',`,
    '})',
  ]

  return lines.join('\n')
}
