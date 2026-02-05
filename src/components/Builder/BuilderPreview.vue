<script setup lang="ts">
import ToastContainer from '@/components/ToastContainer.vue'
import type { ActiveNotification, Position } from '@/domain'

defineProps<{
  notifications: ActiveNotification[]
  position: Position
}>()

const emit = defineEmits<{
  close: [id: string]
  showNotification: []
}>()
</script>

<template>
  <div class="builder-preview">
    <div class="builder-preview__area">
      <ToastContainer
        :notifications="notifications"
        :position="position"
        contained
        @close="emit('close', $event)"
      />
    </div>
    <button type="button" class="builder-preview__action" @click="emit('showNotification')">
      Show Notification
    </button>
  </div>
</template>

<style scoped>
.builder-preview {
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
}

.builder-preview__area {
  position: relative;
  min-height: 120px;
  margin-bottom: var(--space-4);
  padding: var(--space-4);
  background: var(--builder-bg, #f8fafc);
  border-radius: var(--radius-md);
}

.builder-preview__action {
  min-height: 48px;
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: var(--radius-md);
  background: var(--builder-accent, #7c3aed);
  color: #fff;
  cursor: pointer;
  transition: background 0.15s;
}

.builder-preview__action:hover {
  background: var(--builder-accent-hover, #6d28d9);
}

.builder-preview__action:active {
  transform: translateY(1px);
}
</style>
