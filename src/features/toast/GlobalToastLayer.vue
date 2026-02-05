<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import ToastContainer from './ToastContainer.vue'
import { useNotificationStore } from '@/stores/notification.store'
import type { ActiveNotification } from '@/domain'
import { POSITION_OPTIONS } from '@/domain'
import type { ToastAnimation } from './animations/toastAnimations'

const DEFAULT_ANIMATION: ToastAnimation = 'slide'

const store = useNotificationStore()
const { activeNotifications } = storeToRefs(store)

const notificationsByPosition = computed(() => {
  const byPosition = new Map<string, ActiveNotification[]>()
  for (const opt of POSITION_OPTIONS) {
    byPosition.set(opt.value, [])
  }
  const list = activeNotifications.value ?? []
  for (const n of list) {
    const bucket = byPosition.get(n.position)
    if (bucket) bucket.push(n)
  }
  return byPosition
})

const animationByPosition = computed(() => {
  const map = new Map<string, ToastAnimation>()
  for (const opt of POSITION_OPTIONS) {
    const list = notificationsByPosition.value.get(opt.value) ?? []
    const first = list[0]
    map.set(opt.value, (first?.animation as ToastAnimation) ?? DEFAULT_ANIMATION)
  }
  return map
})
</script>

<template>
  <ToastContainer
    v-for="opt in POSITION_OPTIONS"
    :key="opt.value"
    :notifications="notificationsByPosition.get(opt.value) ?? []"
    :position="opt.value"
    :animation="animationByPosition.get(opt.value) ?? DEFAULT_ANIMATION"
    @close="store.removeNotification"
  />
</template>
