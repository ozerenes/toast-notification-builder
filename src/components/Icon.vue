<script setup lang="ts">
import { computed } from 'vue'
import { ICONS, type IconName } from '@/assets/icons'

defineOptions({ name: 'AppIcon' })

export type { IconName }

const props = withDefaults(
  defineProps<{
    name: IconName
    size?: number | string
  }>(),
  {
    size: 16,
  }
)

const iconComponent = computed(() => ICONS[props.name])

const sizeStyle = computed(() => {
  const value = props.size
  const size = typeof value === 'number' ? `${value}px` : value
  return {
    width: size,
    height: size,
  }
})
</script>

<template>
  <component :is="iconComponent" class="icon" :style="sizeStyle" />
</template>

<style scoped>
.icon {
  display: block;
  color: currentColor;
}
</style>
