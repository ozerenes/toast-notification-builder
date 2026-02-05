<script setup lang="ts">
import { ToastContainer } from '@/features/toast'
import type { ActiveNotification, Position } from '@/domain'
import type { AnimationType } from './types'

defineProps<{
  notifications: ActiveNotification[]
  position: Position
  animation?: AnimationType
}>()

const emit = defineEmits<{
  close: [id: string]
}>()
</script>

<template>
  <div class="builder-preview__area">
    <ToastContainer
      :notifications="notifications"
      :position="position"
      contained
      :animation="animation"
      @close="emit('close', $event)"
    />
  </div>
</template>

<style scoped>
.builder-preview__area {
  position: relative;
  min-height: 120px;
  margin-bottom: var(--space-4);
  padding: var(--space-4);
  background: var(--color-surface-muted);
  border-radius: var(--radius-md);
}
</style>
