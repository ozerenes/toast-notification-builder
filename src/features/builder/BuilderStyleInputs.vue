<script setup lang="ts">
defineProps<{
  backgroundColor: string
  textColor: string
}>()
const emit = defineEmits<{
  'update:backgroundColor': [value: string]
  'update:textColor': [value: string]
}>()
</script>

<template>
  <div class="builder-group">
    <span class="builder-group__label">Style</span>
    <div class="builder-colors">
      <label class="builder-color-wrap">
        <span class="builder-color-wrap__label">Background</span>
        <div class="builder-color-input-wrap">
          <input
            :value="backgroundColor"
            type="color"
            class="builder-color-input"
            @input="emit('update:backgroundColor', ($event.target as HTMLInputElement).value)"
          />
          <input
            :value="backgroundColor"
            type="text"
            class="builder-input builder-input--hex"
            aria-label="Background color hex"
            @input="emit('update:backgroundColor', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </label>
      <label class="builder-color-wrap">
        <span class="builder-color-wrap__label">Text</span>
        <div class="builder-color-input-wrap">
          <input
            :value="textColor"
            type="color"
            class="builder-color-input"
            @input="emit('update:textColor', ($event.target as HTMLInputElement).value)"
          />
          <input
            :value="textColor"
            type="text"
            class="builder-input builder-input--hex"
            aria-label="Text color hex"
            @input="emit('update:textColor', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </label>
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

.builder-colors {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.builder-color-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  cursor: pointer;
}

.builder-color-wrap__label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted, #64748b);
  min-width: 4.5rem;
}

.builder-color-input-wrap {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.builder-color-input {
  -webkit-appearance: none;
  appearance: none;
  width: 26px;
  height: 26px;
  padding: 0;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle, #e2e8f0);
  cursor: pointer;
  background: #fff;
  overflow: hidden;
}

.builder-color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.builder-color-input::-webkit-color-swatch {
  border: none;
  border-radius: inherit;
}

.builder-color-input::-moz-color-swatch {
  border: none;
  border-radius: inherit;
}

.builder-input {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-border-subtle, #e2e8f0);
  border-radius: var(--radius-md);
  color: var(--color-text, #1e293b);
  background: #fff;
}

.builder-input--hex {
  min-width: 0;
  width: 100%;
  flex: 1;
  font-family: ui-monospace, monospace;
}
</style>
