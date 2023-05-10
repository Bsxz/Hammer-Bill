import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  define: {
    isDev: command === 'serve'
  },
  server: {
    open: true
  },
  plugins: [react(), viteMockServe(), svgsprites({
    noOptimizeList: ['add', 'chart', 'clock', 'cloud', 'custom',
      'export', 'back', 'loading', 'logo', 'menu', 'Piggybank',
      'remind', 'flight', 'calendar']
  })]
}))
