<script setup lang="ts">
import BuilderDuration from './BuilderDuration.vue'
import BuilderOptions from './BuilderOptions.vue'
import BuilderPositionGrid from './BuilderPositionGrid.vue'
import BuilderStyleInputs from './BuilderStyleInputs.vue'
import BuilderTitleMessage from './BuilderTitleMessage.vue'
import BuilderTypePills from './BuilderTypePills.vue'
import BuilderAnimations from './BuilderAnimations.vue'
import type { AnimationType, BuilderFormState } from './types'
import { TYPE_DEFAULT_COLORS } from '@/domain'
import type { NotificationType } from '@/domain'

const props = defineProps<{
  modelValue: BuilderFormState
  animation: AnimationType
}>()
const emit = defineEmits<{
  'update:modelValue': [value: BuilderFormState]
  'update:animation': [value: AnimationType]
}>()

function update<K extends keyof BuilderFormState>(key: K, value: BuilderFormState[K]) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

function updateType(type: NotificationType) {
  const colors = TYPE_DEFAULT_COLORS[type]
  emit('update:modelValue', {
    ...props.modelValue,
    type,
    backgroundColor: colors.backgroundColor,
    textColor: colors.textColor,
  })
}

function updateAnimation(value: AnimationType) {
  emit('update:animation', value)
}
</script>

<template>
  <div class="builder-form">
    <BuilderTypePills :model-value="modelValue.type" @update:model-value="updateType" />
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
    <div class="divider" />
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
    <BuilderAnimations :model-value="animation" @update:model-value="updateAnimation" />
  </div>
</template>

<style src="@/styles/builder-shared.css"></style>
<style scoped>
.builder-form {
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
  gap: var(--space-4);
}

.divider {
  height: 1px;
  background-color: var(--color-border-subtle);
  margin: var(--space-4) 0;
}

@media (max-width: 640px) {
  .builder-form {
    padding: var(--space-3);
    gap: var(--space-3);
  }

  .divider {
    margin: var(--space-3) 0;
  }
}
</style>
