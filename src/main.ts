import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { usePresetStore } from '@/stores/preset.store'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './styles/tokens.css'
import '@/features/toast/animations/toastAnimations.css'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
// Explicit preset init: load from storage once at bootstrap (keeps store factory side-effect-free).
usePresetStore().loadPresets()
app.mount('#app')
