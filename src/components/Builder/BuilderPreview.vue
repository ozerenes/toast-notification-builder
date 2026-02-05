<script setup lang="ts">
import { computed, ref } from 'vue'
import ToastContainer from '@/components/ToastContainer.vue'
import BuilderPresets from './BuilderPresets.vue'
import type { ActiveNotification, Position } from '@/domain'
import type { Preset } from '@/stores/preset.store'

const props = defineProps<{
  notifications: ActiveNotification[]
  position: Position
  presets: Preset[]
  exportCode: string
}>()

const emit = defineEmits<{
  close: [id: string]
  showNotification: []
  savePreset: [name: string]
  loadPreset: [id: string]
  deletePreset: [id: string]
}>()

const copied = ref(false)

const highlightedCode = computed(() => {
  const code = props.exportCode

  // Escape HTML
  let html = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // Keywords (const)
  html = html.replace(/\b(const)\b/g, '<span class="builder-export__token--keyword">$1</span>')

  // Property names (before :)
  html = html.replace(
    /(\btype|\btitle|\bmessage|\bduration|\bposition|\bshowIcon|\bshowCloseButton|\banimation)(?=\s*:)/g,
    '<span class="builder-export__token--property">$1</span>'
  )

  // Strings ('...')
  html = html.replace(/'([^']*)'/g, '<span class="builder-export__token--string">\'$1\'</span>')

  // Booleans
  html = html.replace(/\b(true|false)\b/g, '<span class="builder-export__token--boolean">$1</span>')

  // Numbers
  html = html.replace(/\b(\d+)\b/g, '<span class="builder-export__token--number">$1</span>')

  return html
})

async function copyToClipboard() {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(props.exportCode)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 1500)
    }
  } catch {
    // ignore clipboard errors silently
  }
}
</script>

<template>
  <div class="builder-preview">
    <div class="builder-preview__area">
      <ToastContainer
        :notifications="notifications"
        :position="position"
        contained
        @close="emit('close', $event)"
      />
    </div>
    <button type="button" class="builder-preview__action" @click="emit('showNotification')">
      Show Notification
    </button>

    <BuilderPresets
      :presets="presets"
      @save="emit('savePreset', $event)"
      @load="emit('loadPreset', $event)"
      @delete="emit('deletePreset', $event)"
    />

    <section class="builder-export" aria-label="Code export">
      <h3 class="builder-export__title">Code Export</h3>
      <div class="builder-export__body">
        <pre class="builder-export__code"><code v-html="highlightedCode"></code></pre>
        <button type="button" class="builder-export__copy" @click="copyToClipboard">
          {{ copied ? 'Copied!' : 'Copy to Clipboard' }}
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.builder-preview {
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
}

.builder-preview__area {
  position: relative;
  min-height: 120px;
  margin-bottom: var(--space-4);
  padding: var(--space-4);
  background: var(--color-surface-muted, #f8fafc);
  border-radius: var(--radius-md);
}

.builder-preview__action {
  min-height: 36px;
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-primary, #4f46e5);
  color: #fff;
  cursor: pointer;
  transition: background 0.15s;
}

.builder-preview__action:hover {
  background: var(--color-primary-hover, #4338ca);
}

.builder-preview__action:active {
  transform: translateY(1px);
}

.builder-export {
  margin-top: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.builder-export__title {
  margin: 0;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted, #64748b);
}

.builder-export__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.builder-export__code {
  margin: 0;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: #1e1e1e;
  color: #e5e7eb;
  font-size: var(--font-size-xs);
  overflow-x: auto;
  text-wrap: wrap;
}

.builder-export__code :deep(.builder-export__token--keyword) {
  color: #569bd5;
}

.builder-export__code :deep(.builder-export__token--property) {
  color: #559cd6;
}

.builder-export__code :deep(.builder-export__token--string) {
  color: #ce9178;
}

.builder-export__code :deep(.builder-export__token--number) {
  color: #a5f3fc;
}

.builder-export__code :deep(.builder-export__token--boolean) {
  color: #7dd3fc;
}

.builder-export__copy {
  align-self: flex-start;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle, #e2e8f0);
  background: #fff;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
}
</style>
