<script setup lang="ts">
import { computed } from 'vue'
import type { ActiveNotification, NotificationType } from '@/domain'

const props = defineProps<{
  notification: ActiveNotification
}>()

const emit = defineEmits<{
  close: [id: string]
}>()

const iconMap: Record<NotificationType, string> = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i',
}

const icon = computed(() => iconMap[props.notification.type])

function onClose(id: string) {
  emit('close', id)
}
</script>

<template>
  <div
    class="toast-item"
    role="status"
    aria-live="polite"
    :style="{
      backgroundColor: notification.backgroundColor,
      color: notification.textColor,
    }"
  >
    <div class="toast-item__content">
      <span v-if="notification.showIcon" class="toast-item__icon" aria-hidden="true">
        {{ icon }}
      </span>
      <div class="toast-item__text">
        <span class="toast-item__title">{{ notification.title }}</span>
        <span class="toast-item__message">{{ notification.message }}</span>
      </div>
      <button
        v-if="notification.showCloseButton"
        type="button"
        class="toast-item__close"
        aria-label="Close notification"
        :style="{
          color: notification.textColor,
        }"
        @click="onClose(notification.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.toast-item {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: var(--space-2);
  min-width: 240px;
  max-width: 360px;
}

.toast-item__content {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
}

.toast-item__icon {
  flex-shrink: 0;
  font-size: var(--font-size-base);
  line-height: var(--line-height-tight);
}

.toast-item__text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.toast-item__title {
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
}

.toast-item__message {
  font-size: var(--font-size-xs);
  opacity: 0.95;
}

.toast-item__close {
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  font-size: var(--font-size-lg);
  line-height: 1;
  cursor: pointer;
}

.toast-item__close:hover {
  opacity: 0.8;
}
</style>
