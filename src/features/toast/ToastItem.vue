<script setup lang="ts">
import type { ActiveNotification, NotificationType } from '@/domain'
import Icon, { type IconName } from '@/components/Icon.vue'

const props = defineProps<{
  notification: ActiveNotification
}>()

const emit = defineEmits<{
  close: [id: string]
  pause: [id: string]
  resume: [id: string]
}>()

const iconNameMap: Record<NotificationType, IconName> = {
  success: 'check',
  error: 'x',
  warning: 'warning',
  info: 'info',
}

function onClose(id: string) {
  emit('close', id)
}

function onHoverStart() {
  emit('pause', props.notification.id)
}

function onHoverEnd() {
  emit('resume', props.notification.id)
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
      '--toast-progress-duration': `${notification.duration}ms`,
    }"
    @mouseenter="onHoverStart"
    @mouseleave="onHoverEnd"
  >
    <div class="toast-item__content">
      <Icon
        v-if="notification.showIcon"
        :name="iconNameMap[notification.type]"
        :size="18"
        class="toast-item__icon"
        aria-hidden="true"
      />
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
        <Icon name="x" :size="16" class="toast-item__close-icon" aria-hidden="true" />
      </button>
    </div>
    <div
      v-if="notification.duration > 0"
      class="toast-item__progress"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.toast-item {
  position: relative;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: var(--space-2);
  min-width: 240px;
  max-width: 360px;
  overflow: hidden;
}

.toast-item__content {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
}

.toast-item__icon {
  flex-shrink: 0;
  color: currentColor;
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

.toast-item__close-icon {
  display: block;
  color: currentColor;
}

.toast-item__progress {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: var(--toast-progress-height);
  background-color: var(--toast-progress-color);
  transform-origin: left;
  transform: scaleX(1);
  animation-name: toast-progress-bar;
  animation-duration: var(--toast-progress-duration, 0ms);
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.toast-item:hover .toast-item__progress {
  animation-play-state: paused;
}

@keyframes toast-progress-bar {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .toast-item__progress {
    animation: none;
    transform: scaleX(1);
  }
}
</style>
