import type { Preset } from '@/domain'

export const PRESET_VALIDATION = {
  EMPTY_NAME: 'Please enter a preset name.',
  DUPLICATE_NAME: 'A preset with this name already exists.',
} as const

export type PresetNameValidation =
  | { valid: true; name: string }
  | { valid: false; error: string }

/**
 * Validates preset name before save. Single place for preset name rules (trim, empty, duplicate).
 */
export function validatePresetName(
  rawName: string,
  existingPresets: Preset[]
): PresetNameValidation {
  const name = rawName.trim()
  if (!name) {
    return { valid: false, error: PRESET_VALIDATION.EMPTY_NAME }
  }

  const exists = existingPresets.some(
    (preset) => preset.name.trim().toLowerCase() === name.toLowerCase()
  )
  if (exists) {
    return { valid: false, error: PRESET_VALIDATION.DUPLICATE_NAME }
  }

  return { valid: true, name }
}
