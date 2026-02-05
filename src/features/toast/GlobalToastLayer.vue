<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import ToastContainer from './ToastContainer.vue'
import { useNotificationStore } from '@/stores/notification.store'
import type { ActiveNotification } from '@/domain'
import { POSITION_OPTIONS } from '@/domain'
import type { ToastAnimation } from './animations/toastAnimations'

const store = useNotificationStore()
const { activeNotifications } = storeToRefs(store)

const notificationsByPosition = computed(() => {
  const byPosition = new Map<string, ActiveNotification[]>()
  const list = activeNotifications.value ?? []
  for (const opt of POSITION_OPTIONS) {
    byPosition.set(
      opt.value,
      list.filter((n) => n.position === opt.value)
    )
  }
  return byPosition
})

function animationForPosition(position: string): ToastAnimation {
  const list = notificationsByPosition.value.get(position) ?? []
  const first = list[0]
  return (first?.animation as ToastAnimation) ?? 'slide'
}
</script>

<template>
  <ToastContainer
    v-for="opt in POSITION_OPTIONS"
    :key="opt.value"
    :notifications="notificationsByPosition.get(opt.value) ?? []"
    :position="opt.value"
    :animation="animationForPosition(opt.value)"
    @close="store.removeNotification"
  />
</template>
