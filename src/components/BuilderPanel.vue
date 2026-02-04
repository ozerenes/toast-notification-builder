<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { NotificationConfig } from '@/domain'
import { TYPE_DEFAULT_COLORS } from '@/domain/notificationDefaults'

/** Builder form state: config without id and colors (id at trigger, colors from type). */
export type BuilderFormState = Omit<NotificationConfig, 'id' | 'backgroundColor' | 'textColor'>

const form = reactive<BuilderFormState>({
  type: 'info',
  title: '',
  message: '',
  duration: 3000,
  position: 'top-right',
  showIcon: true,
  showCloseButton: true,
})

const colors = computed(() => TYPE_DEFAULT_COLORS[form.type])

const isPersistent = computed(() => form.duration === 0)
</script>

<template>
  <div class="builder-panel">
    <section class="builder-panel__form" aria-label="Notification configuration">
      <p class="builder-panel__placeholder">
        State: type={{ form.type }}, persistent={{ isPersistent }}, bg={{ colors.backgroundColor }}
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
