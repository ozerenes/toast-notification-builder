<script setup lang="ts">
defineProps<{
  showIcon: boolean
  showCloseButton: boolean
}>()
const emit = defineEmits<{
  'update:showIcon': [value: boolean]
  'update:showCloseButton': [value: boolean]
}>()
</script>

<template>
  <div class="builder-group builder-group--options">
    <span class="builder-group__label">Options</span>
    <div class="builder-options">
      <label class="builder-checkbox-wrap">
        <input
          :checked="showIcon"
          type="checkbox"
          class="builder-checkbox"
          @change="emit('update:showIcon', ($event.target as HTMLInputElement).checked)"
        />
        <span>Show icon</span>
      </label>
      <label class="builder-checkbox-wrap">
        <input
          :checked="showCloseButton"
          type="checkbox"
          class="builder-checkbox"
          @change="emit('update:showCloseButton', ($event.target as HTMLInputElement).checked)"
        />
        <span>Show close button</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.builder-group {
  margin-bottom: var(--space-4);
}

.builder-options {
  display: flex;
  gap: var(--space-6);
}

.builder-group--options {
  gap: var(--space-4);
}

.builder-group--options .builder-checkbox-wrap:last-of-type {
  margin-bottom: 0;
}

.builder-group__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--builder-text-muted, #64748b);
  margin-bottom: var(--space-2);
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
  width: 1.1rem;
  height: 1.1rem;
  accent-color: var(--builder-accent, #7c3aed);
  cursor: pointer;
  margin: 0;
}
</style>
