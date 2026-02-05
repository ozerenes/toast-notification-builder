<script setup lang="ts">
import { ref, computed } from 'vue'
import type { NotificationType, Position, PositionOption } from '@/domain'
import { POSITION_OPTIONS, TYPE_DEFAULT_COLORS } from '@/domain'
import type { Preset } from '@/stores/preset.store'

const props = defineProps<{
  presets: Preset[]
}>()

const emit = defineEmits<{
  save: [name: string]
  load: [id: string]
  delete: [id: string]
}>()

const presetName = ref('')

const sortedPresets = computed(() => [...props.presets].sort((a, b) => b.createdAt - a.createdAt))

const hasPresets = computed(() => sortedPresets.value.length > 0)

const positionOptionMap: Map<Position, PositionOption> = new Map(
  (POSITION_OPTIONS as PositionOption[]).map((option) => [option.value, option])
)

function formatDuration(duration: number): string {
  if (duration === 0) return 'Persistent'
  const seconds = Math.round(duration / 1000)
  return `${seconds}s`
}

function getPositionLabel(position: Position): string {
  const option = positionOptionMap.get(position)
  return option?.name ?? position
}

function getTypeColor(type: NotificationType): string {
  return TYPE_DEFAULT_COLORS[type].backgroundColor
}

function handleSave() {
  const name = presetName.value.trim()
  if (!name) return
  emit('save', name)
  presetName.value = ''
}
</script>

<template>
  <section class="builder-presets" aria-label="Saved presets">
    <header class="builder-presets__header">
      <span class="builder-presets__title">Saved Presets</span>
    </header>

    <TransitionGroup
      v-if="hasPresets"
      name="builder-presets"
      tag="div"
      class="builder-presets__list"
    >
      <article v-for="preset in sortedPresets" :key="preset.id" class="builder-presets__item">
        <div class="builder-presets__meta">
          <span
            class="builder-presets__dot"
            :style="{ backgroundColor: getTypeColor(preset.config.type) }"
          />
          <div class="builder-presets__text">
            <div class="builder-presets__name">
              {{ preset.name }}
            </div>
            <div class="builder-presets__details">
              {{ formatDuration(preset.config.duration) }} •
              {{ getPositionLabel(preset.config.position) }}
            </div>
          </div>
        </div>
        <div class="builder-presets__actions">
          <button type="button" class="builder-presets__button" @click="emit('load', preset.id)">
            Load
          </button>
          <button
            type="button"
            class="builder-presets__button builder-presets__button--danger"
            @click="emit('delete', preset.id)"
          >
            Delete
          </button>
        </div>
      </article>
    </TransitionGroup>
    <p v-else class="builder-presets__empty">No presets yet. Configure a toast and save it.</p>

    <form class="builder-presets__footer" @submit.prevent="handleSave">
      <input
        v-model="presetName"
        type="text"
        class="builder-presets__input"
        placeholder="Preset name..."
      />
      <button type="submit" class="builder-presets__save" :disabled="!presetName.trim()">
        Save
      </button>
    </form>
  </section>
</template>

<style scoped>
.builder-presets {
  margin-top: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.builder-presets__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.builder-presets__title {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted, #64748b);
}

.builder-presets__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  max-height: 160px;
  overflow-y: auto;
}

.builder-presets__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background-color: var(--color-surface-muted, #f8fafc);
}

.builder-presets__meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.builder-presets__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.builder-presets__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.builder-presets__name {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text, #1e293b);
}

.builder-presets__details {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted, #64748b);
}

.builder-presets__actions {
  display: flex;
  gap: var(--space-2);
}

.builder-presets__button {
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle, #e2e8f0);
  padding: 0.35rem 0.9rem;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  background-color: #fff;
  cursor: pointer;
}

.builder-presets__button--danger {
  color: #ef4444;
}

.builder-presets__button:hover {
  background-color: var(--color-surface-muted, #f8fafc);
}

.builder-presets__empty {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted, #64748b);
}

.builder-presets__footer {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-1);
}

.builder-presets__input {
  flex: 1;
  min-width: 0;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle, #e2e8f0);
  font-size: var(--font-size-sm);
}

.builder-presets__save {
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-md);
  border: none;
  background-color: var(--color-primary, #4f46e5);
  color: #fff;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
}

.builder-presets__save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.builder-presets-enter-active,
.builder-presets-leave-active {
  transition: all 0.15s ease-out;
}

.builder-presets-enter-from,
.builder-presets-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
