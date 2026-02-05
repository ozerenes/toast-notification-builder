export const TOAST_ANIMATIONS = ['fade', 'slide', 'scale', 'bounce', 'flip'] as const

export type ToastAnimation = (typeof TOAST_ANIMATIONS)[number]

const TOAST_TRANSITION_PREFIX = 'toast-anim-'

export type ToastTransitionName = `${typeof TOAST_TRANSITION_PREFIX}${ToastAnimation}`

export interface ToastAnimationDefinition {
  /** Stable identifier used in configuration / persistence. */
  readonly id: ToastAnimation
  /** Human-readable label for UI surfaces. */
  readonly label: string
  /** Name passed directly to Vue's <TransitionGroup name="…"> prop. */
  readonly transitionName: ToastTransitionName
}

const ANIMATION_LABELS: Record<ToastAnimation, string> = {
  fade: 'Fade',
  slide: 'Slide',
  scale: 'Scale',
  bounce: 'Bounce',
  flip: 'Flip',
}

const createTransitionName = (animation: ToastAnimation): ToastTransitionName =>
  `${TOAST_TRANSITION_PREFIX}${animation}` as ToastTransitionName

const buildAnimationDefinition = (animation: ToastAnimation): ToastAnimationDefinition => ({
  id: animation,
  label: ANIMATION_LABELS[animation],
  transitionName: createTransitionName(animation),
})

export const TOAST_ANIMATION_DEFINITIONS: readonly ToastAnimationDefinition[] =
  TOAST_ANIMATIONS.map(buildAnimationDefinition)

/**
 * Resolve the Vue TransitionGroup `name` value for a given toast animation.
 *
 * Example usage in a component:
 * ```vue
 * <script setup lang="ts">
 * import { computed } from 'vue'
 * import { getToastTransitionName, type ToastAnimation } from './toastAnimations'
 *
 * const selectedAnimation = ref<ToastAnimation>('fade')
 * const animationClass = computed(() => getToastTransitionName(selectedAnimation.value))
 * </script>
 *
 * <template>
 *   <TransitionGroup :name="animationClass" tag="div">
 *     <!-- toast items -->
 *   </TransitionGroup>
 * </template>
 * ```
 */
export const getToastTransitionName = (animation: ToastAnimation): ToastTransitionName =>
  createTransitionName(animation)

export const isToastAnimation = (value: unknown): value is ToastAnimation =>
  typeof value === 'string' && (TOAST_ANIMATIONS as readonly string[]).includes(value)
