<script setup lang="ts">
import ToastContainer from '@/components/ToastContainer.vue'
import BuilderPresets from './BuilderPresets.vue'
import type { ActiveNotification, Position } from '@/domain'
import type { Preset } from '@/stores/preset.store'

defineProps<{
  notifications: ActiveNotification[]
  position: Position
  presets: Preset[]
}>()

const emit = defineEmits<{
  close: [id: string]
  showNotification: []
  savePreset: [name: string]
  loadPreset: [id: string]
  deletePreset: [id: string]
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

    <BuilderPresets
      :presets="presets"
      @save="emit('savePreset', $event)"
      @load="emit('loadPreset', $event)"
      @delete="emit('deletePreset', $event)"
    />
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
  background: var(--color-surface-muted, #f8fafc);
  border-radius: var(--radius-md);
}

.builder-preview__action {
  min-height: 36px;
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-primary, #4f46e5);
  color: #fff;
  cursor: pointer;
  transition: background 0.15s;
}

.builder-preview__action:hover {
  background: var(--color-primary-hover, #4338ca);
}

.builder-preview__action:active {
  transform: translateY(1px);
}
</style>
