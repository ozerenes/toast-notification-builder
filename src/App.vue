<script setup lang="ts">
import { BuilderPanel } from '@/features/builder'
import { GlobalToastLayer } from '@/features/toast'
import { toggleTheme } from '@/theme/themeController'

const onToggleTheme = () => {
  toggleTheme()
}
</script>

<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__heading">Toast Notification Builder</h1>
      <button type="button" class="app__theme-toggle" @click="onToggleTheme">Toggle theme</button>
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
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface-muted);
  color: var(--color-text);
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  cursor: pointer;
}
</style>
