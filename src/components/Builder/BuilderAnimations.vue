<script setup lang="ts">
import { ref } from 'vue'

const activeAnimation = ref<'fade' | 'slide' | 'pop'>('fade')

function setActiveAnimation(animation: 'fade' | 'slide' | 'pop') {
  activeAnimation.value = animation
}
</script>
<template>
  <div class="builder-group">
    <span class="builder-group__label">Animations</span>
    <div class="builder-animations">
      <button
        class="builder-animation-item"
        :class="{ 'builder-animation-item--active': activeAnimation === 'fade' }"
        type="button"
        @click="setActiveAnimation('fade')"
      >
        Fade
      </button>
      <button
        class="builder-animation-item"
        :class="{ 'builder-animation-item--active': activeAnimation === 'slide' }"
        type="button"
        @click="setActiveAnimation('slide')"
      >
        Slide
      </button>
      <button
        class="builder-animation-item"
        :class="{ 'builder-animation-item--active': activeAnimation === 'pop' }"
        type="button"
        @click="setActiveAnimation('pop')"
      >
        Pop
      </button>
    </div>
  </div>
</template>

<style scoped>
.builder-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.builder-group__label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted, #64748b);
}

.builder-animations {
  display: flex;
  gap: var(--space-2);
}

.builder-animation-item {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--color-border-subtle, #e2e8f0);
  border-radius: var(--radius-md);
  background: #fff;
  color: var(--color-text, #1e293b);
  cursor: pointer;
}

.builder-animation-item:hover {
  border-color: var(--color-primary, #4f46e5);
  background: var(--color-surface-muted, #f8fafc);
}

.builder-animation-item--active {
  border-color: var(--color-primary, #4f46e5);
  background: rgba(124, 58, 237, 0.08);
  color: var(--color-primary, #4f46e5);
}
</style>
