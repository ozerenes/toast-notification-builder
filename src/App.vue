<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BuilderPanel } from '@/features/builder'
import { GlobalToastLayer } from '@/features/toast'
import { getTheme, toggleTheme } from '@/theme/themeController'
import Icon from '@/components/Icon.vue'

const theme = ref<'light' | 'dark'>(getTheme())

onMounted(() => {
  theme.value = getTheme()
})

const onToggleTheme = () => {
  theme.value = toggleTheme()
}

const isDarkTheme = () => theme.value === 'dark'
</script>

<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__heading">Toast Notification Builder</h1>
      <button type="button" class="app__theme-toggle" @click="onToggleTheme">
        <Icon
          :name="isDarkTheme() ? 'sun' : 'moon'"
          :size="18"
          class="app__theme-icon"
          aria-hidden="true"
        />
      </button>
    </header>
    <BuilderPanel />
    <GlobalToastLayer />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--color-bg-secondary);
}

.app__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg);
  padding: var(--space-3) var(--space-4);
}

.app__heading {
  margin: 0;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
}

.app__theme-toggle {
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface-muted);
  color: var(--color-text);
  padding: var(--space-2);
  cursor: pointer;
}

.app__theme-icon {
  display: block;
  color: inherit;
}
</style>
