<script setup lang="ts">
import BuilderPreviewArea from './BuilderPreviewArea.vue'
import BuilderPreviewActions from './BuilderPreviewActions.vue'
import BuilderPresets from './BuilderPresets.vue'
import BuilderCodeExport from './BuilderCodeExport.vue'
import type { ActiveNotification, Position, Preset } from '@/domain'
import type { AnimationType } from './types'

defineProps<{
  notifications: ActiveNotification[]
  position: Position
  presets: Preset[]
  exportCode: string
  animation?: AnimationType
}>()

const emit = defineEmits<{
  close: [id: string]
  showNotification: []
  clearAll: []
  savePreset: [name: string]
  loadPreset: [id: string]
  deletePreset: [id: string]
}>()
</script>

<template>
  <div class="builder-preview">
    <BuilderPreviewArea
      :notifications="notifications"
      :position="position"
      :animation="animation"
      @close="emit('close', $event)"
    />
    <BuilderPreviewActions
      @show-notification="emit('showNotification')"
      @clear-all="emit('clearAll')"
    />
    <BuilderPresets
      :presets="presets"
      @save="emit('savePreset', $event)"
      @load="emit('loadPreset', $event)"
      @delete="emit('deletePreset', $event)"
    />
    <BuilderCodeExport :export-code="exportCode" />
  </div>
</template>

<style scoped>
.builder-preview {
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
}
</style>
