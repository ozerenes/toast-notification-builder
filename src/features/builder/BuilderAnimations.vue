<script setup lang="ts">
import type { AnimationType } from './types'
import { TOAST_ANIMATION_DEFINITIONS } from '@/features/toast/animations/toastAnimations'

defineProps<{
  modelValue: AnimationType
}>()

const emit = defineEmits<{
  'update:modelValue': [value: AnimationType]
}>()

const animations = TOAST_ANIMATION_DEFINITIONS

function setActiveAnimation(animation: AnimationType) {
  emit('update:modelValue', animation)
}
</script>

<template>
  <div class="builder-group">
    <span class="builder-group__label">Animations</span>
    <div class="builder-animations">
      <button
        v-for="animation in animations"
        :key="animation.id"
        class="builder-animation-item"
        :class="{ 'builder-animation-item--active': modelValue === animation.id }"
        type="button"
        @click="setActiveAnimation(animation.id)"
      >
        {{ animation.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.builder-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.builder-group__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
}

.builder-animations {
  display: flex;
  gap: var(--space-2);
}

.builder-animation-item {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  background: #fff;
  color: var(--color-text);
  cursor: pointer;
  width: 100%;
}

.builder-animation-item:hover {
  border-color: var(--color-primary);
  background: var(--color-bg-secondary);
  color: var(--color-primary);
}

.builder-animation-item--active {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: #fff;
}
</style>
