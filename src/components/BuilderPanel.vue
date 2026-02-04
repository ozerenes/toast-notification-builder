<script setup lang="ts">
import { reactive } from 'vue'
import type { NotificationConfig } from '@/domain'

/** Builder form state: NotificationConfig without id (id generated on trigger). */
export type BuilderFormState = Omit<NotificationConfig, 'id'>

const form = reactive<BuilderFormState>({
  type: 'info',
  title: '',
  message: '',
  duration: 3000,
  position: 'top-right',
  backgroundColor: '#3b82f6',
  textColor: '#ffffff',
  showIcon: true,
  showCloseButton: true,
})
</script>

<template>
  <div class="builder-panel">
    <section class="builder-panel__form" aria-label="Notification configuration">
      <p class="builder-panel__placeholder">
        Configuration — state ready (form controls in next commit). Type: {{ form.type }}
      </p>
    </section>
    <section class="builder-panel__preview" aria-label="Live preview">
      <!-- Preview: Commit 3 -->
    </section>
  </div>
</template>

<style scoped>
.builder-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  min-height: 400px;
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
}

.builder-panel__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.builder-panel__preview {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
  background: var(--preview-bg, #f1f5f9);
  border-radius: 8px;
  min-height: 200px;
}
</style>
