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
        @click="onClose(notification.id)"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
.toast-item {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.5rem;
  min-width: 280px;
  max-width: 360px;
}

.toast-item__content {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.toast-item__icon {
  flex-shrink: 0;
  font-size: 1rem;
  line-height: 1.25;
}

.toast-item__text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.toast-item__title {
  font-weight: 600;
  font-size: 0.875rem;
}

.toast-item__message {
  font-size: 0.8125rem;
  opacity: 0.95;
}

.toast-item__close {
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.8;
}

.toast-item__close:hover {
  opacity: 1;
}
</style>
