/**
 * Vite configuration only.
 * Jest config lives in jest.config.cjs.
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
