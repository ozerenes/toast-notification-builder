<script setup lang="ts">
import { computed, ref } from 'vue'
import { ToastContainer } from '@/features/toast'
import BuilderPresets from './BuilderPresets.vue'
import { useNotificationStore } from '@/stores/notification.store'
import type { ActiveNotification, Position, Preset } from '@/domain'
import type { AnimationType } from './types'

const props = defineProps<{
  notifications: ActiveNotification[]
  position: Position
  presets: Preset[]
  exportCode: string
  animation?: AnimationType
}>()

const emit = defineEmits<{
  close: [id: string]
  showNotification: []
  savePreset: [name: string]
  loadPreset: [id: string]
  deletePreset: [id: string]
}>()

const notificationStore = useNotificationStore()
const copied = ref(false)

function clearAllNotifications() {
  notificationStore.clearAll()
}

type CodeTokenType = 'keyword' | 'property' | 'string' | 'boolean' | 'number' | 'plain'

interface CodeSegment {
  text: string
  type: CodeTokenType
}

const highlightedCodeSegments = computed<CodeSegment[]>(() => {
  const code = props.exportCode
  const segments: CodeSegment[] = []

  // Match keywords, properties, strings, booleans and numbers
  const tokenRegex =
    /\bimport\b|\bconst\b|\baddNotification\b|(\btype|\btitle|\bmessage|\bduration|\bposition|\bbackgroundColor|\btextColor|\bshowIcon|\bshowCloseButton|\banimation)(?=\s*:)|'[^']*'|`[^`]*`|\btrue\b|\bfalse\b|\b\d+\b/g

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = tokenRegex.exec(code)) !== null) {
    const matchStart = match.index
    const matchText = match[0]

    if (matchStart > lastIndex) {
      segments.push({
        text: code.slice(lastIndex, matchStart),
        type: 'plain',
      })
    }

    let type: CodeTokenType = 'plain'

    if (matchText === 'import' || matchText === 'const' || matchText === 'addNotification') {
      type = 'keyword'
    } else if (match[1]) {
      // Captured property name
      type = 'property'
    } else if (
      (matchText.startsWith("'") && matchText.endsWith("'")) ||
      (matchText.startsWith('`') && matchText.endsWith('`'))
    ) {
      type = 'string'
    } else if (matchText === 'true' || matchText === 'false') {
      type = 'boolean'
    } else if (/^\d+$/.test(matchText)) {
      // Heuristic: number used as value after a colon (e.g. duration: 3000)
      const before = code.slice(0, matchStart)
      const lastColonIndex = before.lastIndexOf(':')
      if (lastColonIndex !== -1 && /^\s*$/.test(before.slice(lastColonIndex + 1))) {
        type = 'number'
      }
    }

    segments.push({
      text: matchText,
      type,
    })

    lastIndex = matchStart + matchText.length
  }

  if (lastIndex < code.length) {
    segments.push({
      text: code.slice(lastIndex),
      type: 'plain',
    })
  }

  return segments
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
        :animation="props.animation"
        @close="emit('close', $event)"
      />
    </div>
    <div class="builder-preview__actions">
      <button type="button" class="builder-preview__action" @click="emit('showNotification')">
        Show Notification
      </button>
      <button
        type="button"
        class="builder-preview__action builder-preview__action--danger"
        @click="clearAllNotifications"
      >
        Clear Notifications
      </button>
    </div>

    <BuilderPresets
      :presets="presets"
      @save="emit('savePreset', $event)"
      @load="emit('loadPreset', $event)"
      @delete="emit('deletePreset', $event)"
    />

    <section class="builder-export" aria-label="Code export">
      <h3 class="builder-export__title">Code Export</h3>
      <div class="builder-export__body">
        <pre
          class="builder-export__code"
        ><code><template v-for="(segment, index) in highlightedCodeSegments" :key="index"><span
          v-if="segment.type !== 'plain'"
          :class="{
            'builder-export__token--keyword': segment.type === 'keyword',
            'builder-export__token--property': segment.type === 'property',
            'builder-export__token--string': segment.type === 'string',
            'builder-export__token--boolean': segment.type === 'boolean',
            'builder-export__token--number': segment.type === 'number',
          }"
        >{{ segment.text }}</span><template v-else>{{ segment.text }}</template></template></code></pre>
        <button
          type="button"
          class="builder-export__copy"
          :aria-label="copied ? 'Code copied' : 'Copy code'"
          @click="copyToClipboard"
        >
          <span class="builder-export__copy-icon" aria-hidden="true">
            {{ copied ? '✓' : '⧉' }}
          </span>
        </button>
        <button type="button" class="builder-export__copy-inline" @click="copyToClipboard">
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
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-xs);
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

.builder-preview__action--danger {
  background: #ef4444;
}

.builder-preview__action--danger:hover {
  background: #b91c1c;
}

.builder-export {
  margin-top: var(--space-2);
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
  position: relative;
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
  position: absolute;
  top: 0.35rem;
  right: 0.45rem;
  padding: 0.2rem 0.45rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle, #e2e8f0);
  background: #fff;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 120ms ease-out,
    transform 120ms ease-out;
}

.builder-export__body:hover .builder-export__copy {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.builder-export__copy-icon {
  display: inline-block;
  font-size: 0.85rem;
  line-height: 1;
}

.builder-export__copy-inline {
  align-self: flex-start;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle, #e2e8f0);
  background: #fff;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
}

.builder-preview__actions {
  display: flex;
  flex-direction: row;
  gap: var(--space-2);
}
</style>
