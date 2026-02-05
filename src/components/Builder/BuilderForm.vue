<script setup lang="ts">
import BuilderDuration from './BuilderDuration.vue'
import BuilderOptions from './BuilderOptions.vue'
import BuilderPositionGrid from './BuilderPositionGrid.vue'
import BuilderStyleInputs from './BuilderStyleInputs.vue'
import BuilderTitleMessage from './BuilderTitleMessage.vue'
import BuilderTypePills from './BuilderTypePills.vue'
import BuilderAnimations from './BuilderAnimations.vue'
import type { BuilderFormState } from './types'

const props = defineProps<{
  modelValue: BuilderFormState
}>()
const emit = defineEmits<{
  'update:modelValue': [value: BuilderFormState]
}>()

function update<K extends keyof BuilderFormState>(key: K, value: BuilderFormState[K]) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>

<template>
  <div class="builder-form">
    <BuilderTypePills :model-value="modelValue.type" @update:model-value="update('type', $event)" />
    <BuilderTitleMessage
      :title="modelValue.title"
      :message="modelValue.message"
      @update:title="update('title', $event)"
      @update:message="update('message', $event)"
    />
    <BuilderDuration
      :model-value="modelValue.duration"
      @update:model-value="update('duration', $event)"
    />
    <BuilderPositionGrid
      :model-value="modelValue.position"
      @update:model-value="update('position', $event)"
    />
    <BuilderStyleInputs
      :background-color="modelValue.backgroundColor"
      :text-color="modelValue.textColor"
      @update:background-color="update('backgroundColor', $event)"
      @update:text-color="update('textColor', $event)"
    />
    <BuilderOptions
      :show-icon="modelValue.showIcon"
      :show-close-button="modelValue.showCloseButton"
      @update:show-icon="update('showIcon', $event)"
      @update:show-close-button="update('showCloseButton', $event)"
    />
    <BuilderAnimations
      :show-icon="modelValue.showIcon"
      :show-close-button="modelValue.showCloseButton"
      @update:show-icon="update('showIcon', $event)"
      @update:show-close-button="update('showCloseButton', $event)"
    />
  </div>
</template>

<style scoped>
.builder-form {
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
}
</style>
