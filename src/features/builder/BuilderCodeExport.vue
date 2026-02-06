<script setup lang="ts">
import { computed, ref } from 'vue'
import { COPY_FEEDBACK_MS } from '@/shared/constants'
import Icon from '@/components/Icon.vue'

const props = defineProps<{
  exportCode: string
}>()

const copied = ref(false)

type CodeTokenType = 'keyword' | 'property' | 'string' | 'boolean' | 'number' | 'plain'

interface CodeSegment {
  text: string
  type: CodeTokenType
}

const highlightedCodeSegments = computed<CodeSegment[]>(() => {
  const code = props.exportCode
  const segments: CodeSegment[] = []
  const tokenRegex =
    /\bimport\b|\bconst\b|\baddNotification\b|\bcreateNotificationId\b|(\btype|\btitle|\bmessage|\bduration|\bposition|\bbackgroundColor|\btextColor|\bshowIcon|\bshowCloseButton|\banimation)(?=\s*:)|'[^']*'|`[^`]*`|\btrue\b|\bfalse\b|\b\d+\b/g

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = tokenRegex.exec(code)) !== null) {
    const matchStart = match.index
    const matchText = match[0]

    if (matchStart > lastIndex) {
      segments.push({ text: code.slice(lastIndex, matchStart), type: 'plain' })
    }

    let type: CodeTokenType = 'plain'
    if (
      matchText === 'import' ||
      matchText === 'const' ||
      matchText === 'addNotification' ||
      matchText === 'createNotificationId'
    ) {
      type = 'keyword'
    } else if (match[1]) {
      type = 'property'
    } else if (
      (matchText.startsWith("'") && matchText.endsWith("'")) ||
      (matchText.startsWith('`') && matchText.endsWith('`'))
    ) {
      type = 'string'
    } else if (matchText === 'true' || matchText === 'false') {
      type = 'boolean'
    } else if (/^\d+$/.test(matchText)) {
      const before = code.slice(0, matchStart)
      const lastColonIndex = before.lastIndexOf(':')
      if (lastColonIndex !== -1 && /^\s*$/.test(before.slice(lastColonIndex + 1))) {
        type = 'number'
      }
    }
    segments.push({ text: matchText, type })
    lastIndex = matchStart + matchText.length
  }

  if (lastIndex < code.length) {
    segments.push({ text: code.slice(lastIndex), type: 'plain' })
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
      }, COPY_FEEDBACK_MS)
    }
  } catch {
    // ignore clipboard errors silently
  }
}
</script>

<template>
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
        <Icon
          :name="copied ? 'check' : 'copy'"
          :size="14"
          class="builder-export__copy-icon"
          aria-hidden="true"
        />
      </button>
      <button type="button" class="builder-export__copy-inline" @click="copyToClipboard">
        {{ copied ? 'Copied!' : 'Copy to Clipboard' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
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
  color: var(--color-text-muted);
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
  background: var(--color-code-bg);
  color: var(--color-code-fg);
  font-size: var(--font-size-xs);
  overflow-x: auto;
  text-wrap: wrap;
}

.builder-export__code :deep(.builder-export__token--keyword) {
  color: var(--color-code-keyword);
}

.builder-export__code :deep(.builder-export__token--property) {
  color: var(--color-code-property);
}

.builder-export__code :deep(.builder-export__token--string) {
  color: var(--color-code-string);
}

.builder-export__code :deep(.builder-export__token--number) {
  color: var(--color-code-number);
}

.builder-export__code :deep(.builder-export__token--boolean) {
  color: var(--color-code-boolean);
}

.builder-export__copy {
  position: absolute;
  top: 0.35rem;
  right: 0.45rem;
  padding: 0.2rem 0.45rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle);
  background: var(--color-surface);
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
  display: block;
  color: currentColor;
}

.builder-export__copy-inline {
  align-self: flex-start;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle);
  background: var(--color-surface);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
}

@media (max-width: 640px) {
  .builder-export__code {
    max-height: 12rem;
    overflow-y: auto;
  }
}
</style>
