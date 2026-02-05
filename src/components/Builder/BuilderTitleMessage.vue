<script setup lang="ts">
defineProps<{
  title: string
  message: string
}>()
const emit = defineEmits<{
  'update:title': [value: string]
  'update:message': [value: string]
}>()
</script>

<template>
  <div class="builder-group">
    <label class="builder-group__label" for="builder-title">Title</label>
    <input
      id="builder-title"
      :value="title"
      type="text"
      class="builder-input"
      placeholder="e.g. Success!"
      @input="emit('update:title', ($event.target as HTMLInputElement).value)"
    />
  </div>
  <div class="builder-group">
    <label class="builder-group__label" for="builder-message">Message</label>
    <textarea
      id="builder-message"
      :value="message"
      class="builder-textarea"
      rows="3"
      placeholder="e.g. Your changes have been saved."
      @input="emit('update:message', ($event.target as HTMLTextAreaElement).value)"
    />
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

.builder-input,
.builder-textarea {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-xs);
  border: 1px solid var(--builder-border, #e2e8f0);
  border-radius: var(--radius-md);
  color: var(--builder-text, #1e293b);
  background: #fff;
}

.builder-textarea {
  min-height: 60px;
  resize: vertical;
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-xs);
}
</style>
