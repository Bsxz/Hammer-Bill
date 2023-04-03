import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'
// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  define: {
    isDev: command === 'serve'
  },
  plugins: [react(), viteMockServe(), svgsprites({
    noOptimizeList: ['add', 'chart', 'clock', 'cloud', 'custom',
      'export', 'leftarrow', 'loading', 'logo', 'menu', 'Piggybank', 'remind']
  })],
  build: {
    outDir: 'docs'
  }
}))
