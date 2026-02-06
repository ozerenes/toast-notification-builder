type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  const value = window.localStorage.getItem(STORAGE_KEY)
  return value === 'light' || value === 'dark' ? value : null
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.setAttribute('data-theme', theme)
}

export function setTheme(theme: Theme) {
  applyTheme(theme)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, theme)
  }
}

export function initTheme() {
  const stored = getStoredTheme()
  const theme = stored ?? 'light'
  applyTheme(theme)
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, theme)
  }
}

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  const value = document.documentElement.getAttribute('data-theme') as Theme | null
  return value === 'dark' || value === 'light' ? value : 'light'
}

export function toggleTheme(): Theme {
  const current =
    (typeof document !== 'undefined' &&
      (document.documentElement.getAttribute('data-theme') as Theme | null)) ||
    'light'

  const next: Theme = current === 'dark' ? 'light' : 'dark'
  setTheme(next)
  return next
}
