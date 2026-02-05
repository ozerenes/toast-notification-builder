<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number
}>()
const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const isPersistent = computed(() => props.modelValue === 0)

const durationSeconds = computed({
  get: () => (props.modelValue === 0 ? 3 : props.modelValue / 1000),
  set: (v: number) => {
    emit('update:modelValue', v <= 0 ? 0 : Math.round(v) * 1000)
  },
})

function setPersistent(value: boolean) {
  emit('update:modelValue', value ? 0 : 3000)
}
</script>

<template>
  <div class="builder-group">
    <span class="builder-group__label">Duration</span>
    <div class="builder-duration">
      <input
        v-model.number="durationSeconds"
        type="range"
        min="0"
        max="10"
        step="1"
        class="builder-range"
        :disabled="isPersistent"
      />
      <span class="builder-duration__value">
        {{ isPersistent ? 'Persistent' : `${durationSeconds}s` }}
      </span>
    </div>
    <label class="builder-checkbox-wrap">
      <input
        :checked="isPersistent"
        type="checkbox"
        class="builder-checkbox"
        @change="setPersistent(($event.target as HTMLInputElement).checked)"
      />
      <span>Persistent (no auto-dismiss)</span>
    </label>
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
  color: var(--builder-text-muted, #64748b);
}

.builder-duration {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.builder-range {
  flex: 1;
  min-width: 0;
  min-height: 24px;
  accent-color: var(--builder-accent, #7c3aed);
}

.builder-duration__value {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  min-width: 4.5rem;
}

.builder-checkbox-wrap {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 24px;
  font-size: var(--font-size-xs);
  cursor: pointer;
}

.builder-checkbox {
  width: 1.125rem;
  height: 1.125rem;
  accent-color: var(--builder-accent, #7c3aed);
  cursor: pointer;
}
</style>
