<script setup lang="ts">
import { computed, ref } from 'vue'
import { BuilderForm, BuilderPreview, type BuilderFormState } from '@/components/Builder'
import type { AnimationType } from '@/components/Builder'
import { useNotificationStore } from '@/stores/notification.store'
import { usePresetStore } from '@/stores/preset.store'
import type { ActiveNotification, NotificationConfig } from '@/domain'
import { TYPE_DEFAULT_COLORS } from '@/domain'

const form = ref<BuilderFormState>({
  type: 'info',
  title: '',
  message: '',
  duration: 3000,
  position: 'top-right',
  backgroundColor: TYPE_DEFAULT_COLORS.info.backgroundColor,
  textColor: TYPE_DEFAULT_COLORS.info.textColor,
  showIcon: true,
  showCloseButton: true,
})

const animation = ref<AnimationType>('slide')

const previewNotification = computed<ActiveNotification>(() => ({
  id: `preview-${animation.value}`,
  createdAt: 0,
  ...form.value,
}))

const previewNotifications = computed(() => [previewNotification.value])

const exportCode = computed(() => {
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
  } = form.value

  const idSnippet =
    "typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `toast-${Date.now()}`"
  const lines = [
    "import { useNotificationStore } from '@/stores/notification.store'",
    '',
    'const notificationStore = useNotificationStore()',
    'notificationStore.addNotification({',
    `  id: ${idSnippet},`,
    `  type: '${type}',`,
    `  title: '${title || 'Success!'}',`,
    `  message: '${message || 'Your changes have been saved.'}',`,
    `  duration: ${duration},`,
    `  position: '${position}',`,
    `  backgroundColor: '${backgroundColor}',`,
    `  textColor: '${textColor}',`,
    `  showIcon: ${showIcon},`,
    `  showCloseButton: ${showCloseButton},`,
    `  animation: '${animation.value}',`,
    '})',
  ]

  return lines.join('\n')
})

const notificationStore = useNotificationStore()
const presetStore = usePresetStore()

function onAnimationChange(value: AnimationType) {
  animation.value = value
}

function onFormUpdate(patch: Partial<BuilderFormState>) {
  form.value = { ...form.value, ...patch }
}

function onPreviewClose() {
  /* Preview is read-only; ignore close. */
}

function showNotification() {
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  const config: NotificationConfig = { ...form.value, id, animation: animation.value }
  notificationStore.addNotification(config)
}

function handleSavePreset(name: string) {
  const trimmed = name.trim()
  if (!trimmed) return

  const config: Omit<NotificationConfig, 'id'> = { ...form.value, animation: animation.value }
  presetStore.savePreset(trimmed, config)
}

function buildFormStateFromPreset(config: Omit<NotificationConfig, 'id'>): BuilderFormState {
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
  } = config
  return {
    type,
    title,
    message,
    duration,
    position,
    backgroundColor,
    textColor,
    showIcon,
    showCloseButton,
  }
}

function handleLoadPreset(id: string): void {
  const preset = presetStore.getPresetById(id)
  if (!preset) return

  form.value = buildFormStateFromPreset(preset.config)
  if (preset.config.animation != null) {
    animation.value = preset.config.animation
  }
}

function handleDeletePreset(id: string) {
  presetStore.deletePreset(id)
}
</script>

<template>
  <div class="builder-panel">
    <section class="builder-panel__config" aria-labelledby="config-heading">
      <h2 id="config-heading" class="builder-panel__heading">Configuration</h2>
      <BuilderForm
        :model-value="form"
        :animation="animation"
        @update:model-value="onFormUpdate"
        @update:animation="onAnimationChange"
      />
    </section>
    <section class="builder-panel__preview" aria-labelledby="preview-heading">
      <h2 id="preview-heading" class="builder-panel__heading">Preview</h2>
      <BuilderPreview
        :notifications="previewNotifications"
        :position="form.position"
        :presets="presetStore.presets"
        :export-code="exportCode"
        :animation="animation"
        @close="onPreviewClose"
        @show-notification="showNotification"
        @save-preset="handleSavePreset"
        @load-preset="handleLoadPreset"
        @delete-preset="handleDeletePreset"
      />
    </section>
  </div>
</template>

<style scoped>
.builder-panel {
  display: flex;
  flex-direction: row;
  gap: var(--space-4);
  min-height: 100%;
  padding: var(--space-4);
  max-width: 1024px;
  margin: 0 auto;
}

.builder-panel__heading {
  margin: 0;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border-subtle);
  padding: var(--space-3);
}

.builder-panel__config,
.builder-panel__preview {
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-lg);
}

@media (max-width: 1024px) {
  .builder-panel {
    flex-direction: column;
  }
}

@media (min-width: 640px) {
  .builder-panel {
    padding: var(--space-4);
  }

  .builder-panel__config {
    flex: 1;
    min-width: 0;
  }

  .builder-panel__preview {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .builder-panel__preview :deep(.builder-preview__area) {
    flex: 1;
    min-height: 160px;
  }
}
</style>
