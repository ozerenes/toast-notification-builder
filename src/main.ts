import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './styles/tokens.css'
import '@/features/toast/animations/toastAnimations.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
