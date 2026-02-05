<script setup lang="ts">
const emit = defineEmits<{
  showNotification: []
  clearAll: []
}>()
</script>

<template>
  <div class="builder-preview__actions">
    <button type="button" class="builder-preview__action" @click="emit('showNotification')">
      Show Notification
    </button>
    <button
      type="button"
      class="builder-preview__action builder-preview__action--danger"
      @click="emit('clearAll')"
    >
      Clear Notifications
    </button>
  </div>
</template>

<style scoped>
.builder-preview__action {
  min-height: 36px;
  width: 100%;
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-xs);
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: var(--color-bg);
  cursor: pointer;
  transition: background 0.15s;
}

.builder-preview__action:hover {
  background: var(--color-primary-hover);
}

.builder-preview__action:active {
  transform: translateY(1px);
}

.builder-preview__action--danger {
  background: var(--color-danger);
}

.builder-preview__action--danger:hover {
  background: var(--color-danger-hover);
}

.builder-preview__actions {
  display: flex;
  flex-direction: row;
  gap: var(--space-2);
}
</style>
