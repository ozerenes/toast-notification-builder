<script setup lang="ts">
import { POSITION_OPTIONS, type Position } from '@/domain'

defineProps<{
  modelValue: Position
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Position]
}>()

function onSelect(position: Position) {
  emit('update:modelValue', position)
}
</script>

<template>
  <div class="builder-group">
    <span class="builder-group__label">Position</span>
    <div class="builder-position-grid" role="radiogroup" aria-label="Toast position">
      <button
        v-for="option in POSITION_OPTIONS"
        :key="option.value"
        type="button"
        class="builder-position-cell"
        :class="{ 'builder-position-cell--active': modelValue === option.value }"
        @click="onSelect(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.builder-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.builder-group__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted, #64748b);
}

.builder-position-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 60px));
  gap: var(--space-2);
}

.builder-position-cell {
  min-height: 32px;
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle, #e2e8f0);
  background: #fff;
  color: var(--color-text, #1e293b);
  cursor: pointer;
  text-align: center;
}

.builder-position-cell--active {
  border-color: var(--color-primary, #4f46e5);
  background: rgba(124, 58, 237, 0.06);
  color: var(--color-primary, #4f46e5);
}
</style>
