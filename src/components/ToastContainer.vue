<script setup lang="ts">
import ToastItem from './ToastItem.vue'
import type { ActiveNotification, Position } from '@/domain'

withDefaults(
  defineProps<{
    notifications: ActiveNotification[]
    position: Position
    /** When true, container is positioned inside parent (e.g. preview area) instead of viewport. */
    contained?: boolean
  }>(),
  { contained: false }
)

const emit = defineEmits<{
  close: [id: string]
}>()
</script>

<template>
  <div
    class="toast-container"
    :class="[
      `toast-container--${position}`,
      position.startsWith('bottom') && 'toast-container--reverse',
      contained && 'toast-container--contained',
    ]"
  >
    <TransitionGroup name="toast-list" tag="div" class="toast-container__list">
      <ToastItem
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        @close="(id) => emit('close', id)"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  z-index: 1000;
  padding: var(--space-4);
  pointer-events: none;
}

.toast-container.toast-container--contained {
  position: absolute;
  z-index: 0;
}

.toast-container__list {
  display: flex;
  flex-direction: column;
  pointer-events: auto;
}

.toast-container--reverse .toast-container__list {
  flex-direction: column-reverse;
}

.toast-container--top-left {
  top: 0;
  left: 0;
}

.toast-container--top-right {
  top: 0;
  right: 0;
}

.toast-container--top-center {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.toast-container--bottom-left {
  bottom: 0;
  left: 0;
}

.toast-container--bottom-right {
  bottom: 0;
  right: 0;
}

.toast-container--bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

/* TransitionGroup: CSS only */
.toast-list-enter-active,
.toast-list-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.toast-list-enter-from,
.toast-list-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.toast-container--bottom-left .toast-list-enter-from,
.toast-container--bottom-right .toast-list-enter-from,
.toast-container--bottom-center .toast-list-enter-from {
  transform: translateY(8px);
}

.toast-list-move {
  transition: transform 0.2s ease;
}
</style>
