<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { BuilderForm, BuilderPreview, type BuilderFormState } from '@/components/Builder'
import { useNotificationStore } from '@/stores/notification.store'
import type { ActiveNotification, NotificationConfig } from '@/domain'
import { TYPE_DEFAULT_COLORS } from '@/domain'

const form = reactive<BuilderFormState>({
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

watch(
  () => form.type,
  (type) => {
    form.backgroundColor = TYPE_DEFAULT_COLORS[type].backgroundColor
    form.textColor = TYPE_DEFAULT_COLORS[type].textColor
  }
)

const previewNotification = computed<ActiveNotification>(() => ({
  id: 'preview',
  createdAt: 0,
  ...form,
}))

const previewNotifications = computed(() => [previewNotification.value])

const notificationStore = useNotificationStore()

function onFormUpdate(patch: BuilderFormState) {
  Object.assign(form, patch)
}

function onPreviewClose() {
  /* Preview is read-only; ignore close. */
}

function showNotification() {
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  const config: NotificationConfig = { ...form, id }
  notificationStore.addNotification(config)
}
</script>

<template>
  <div class="builder-panel">
    <section class="builder-panel__config" aria-labelledby="config-heading">
      <h2 id="config-heading" class="builder-panel__heading">Configuration</h2>
      <BuilderForm :model-value="form" @update:model-value="onFormUpdate" />
    </section>
    <section class="builder-panel__preview" aria-labelledby="preview-heading">
      <h2 id="preview-heading" class="builder-panel__heading">Preview</h2>
      <BuilderPreview
        :notifications="previewNotifications"
        :position="form.position"
        @close="onPreviewClose"
        @show-notification="showNotification"
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
  max-width: 1200px;
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
    min-height: 200px;
  }
}
</style>
