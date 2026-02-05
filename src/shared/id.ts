/**
 * Single source for generating unique IDs (notifications, presets, etc.).
 * Safe in SSR/test when crypto is missing.
 */
export function createId(prefix = 'id'): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).slice(2, 10)
  return `${prefix}_${timestamp}_${random}`
}

/** Id generator for toast notifications (used in useToast and builder). */
export function createNotificationId(): string {
  return createId('toast')
}

/** Id generator for presets (used in preset store). */
export function createPresetId(): string {
  return createId('preset')
}
