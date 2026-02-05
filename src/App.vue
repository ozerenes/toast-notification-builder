<script setup lang="ts">
import BuilderPanel from '@/components/BuilderPanel.vue'
</script>

<template>
  <div class="app">
    <h1 class="app__heading">Toast Notification Builder</h1>
    <BuilderPanel />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--color-bg-secondary);
}
.app__heading {
  margin: 0;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: #1e293b;
  border-bottom: 1px solid var(--color-border);
  background-color: #fff;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-family-sans);
}
</style>
