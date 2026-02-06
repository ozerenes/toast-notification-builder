import IconCheck from './icon-check.svg'
import IconCopy from './icon-copy.svg'
import IconInfo from './icon-info.svg'
import IconMoon from './icon-moon.svg'
import IconSun from './icon-sun.svg'
import IconTriangleAlert from './icon-triangle-alert.svg'
import IconX from './icon-x.svg'

export const ICONS = {
  sun: IconSun,
  moon: IconMoon,
  check: IconCheck,
  x: IconX,
  warning: IconTriangleAlert,
  info: IconInfo,
  copy: IconCopy,
} as const

export type IconName = keyof typeof ICONS
