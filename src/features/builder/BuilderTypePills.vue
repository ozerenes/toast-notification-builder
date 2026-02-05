<script setup lang="ts">
import { NOTIFICATION_TYPE_OPTIONS, TYPE_DEFAULT_COLORS } from '@/domain'
import type { NotificationType } from '@/domain'

defineProps<{
  modelValue: NotificationType
}>()
const emit = defineEmits<{
  'update:modelValue': [value: NotificationType]
}>()
</script>

<template>
  <div class="builder-group">
    <span class="builder-group__label">Type</span>
    <div class="builder-type-pills" role="radiogroup" aria-label="Notification type">
      <button
        v-for="t in NOTIFICATION_TYPE_OPTIONS"
        :key="t.value"
        type="button"
        role="radio"
        :aria-checked="modelValue === t.value"
        class="builder-pill"
        :class="{ 'builder-pill--active': modelValue === t.value }"
        :style="
          modelValue === t.value
            ? {
                backgroundColor: TYPE_DEFAULT_COLORS[t.value].backgroundColor,
                color: TYPE_DEFAULT_COLORS[t.value].textColor,
              }
            : undefined
        "
        @click="emit('update:modelValue', t.value)"
        @keydown.enter.prevent="emit('update:modelValue', t.value)"
        @keydown.space.prevent="emit('update:modelValue', t.value)"
      >
        <span class="builder-pill__icon" aria-hidden="true">{{ t.icon }}</span>
        {{ t.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.builder-type-pills {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-2);
}

.builder-pill {
  min-height: 36px;
  padding: var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  flex-direction: column;
  width: 100%;
  max-width: 130px;
}

.builder-pill:hover {
  border-color: var(--color-primary);
}

.builder-pill--active {
  border-color: transparent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.builder-pill__icon {
  margin-right: var(--space-1);
}
</style>
