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
  color: var(--builder-text-muted, #64748b);
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
  color: var(--builder-text-muted, #64748b);
  min-width: 4.5rem;
}

.builder-color-input {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  background: #fff;
}

.builder-color-input-wrap {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.builder-input {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
  border: 1px solid var(--builder-border, #e2e8f0);
  border-radius: var(--radius-md);
  color: var(--builder-text, #1e293b);
  background: #fff;
}

.builder-input--hex {
  min-width: 0;
  width: 100%;
  flex: 1;
  font-family: ui-monospace, monospace;
}
</style>
