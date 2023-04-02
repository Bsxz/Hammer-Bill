
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import { svgsprites } from './vite_plugins/svgsprites'
// https://vitejs.dev/config/
const __unconfig_default =  defineConfig(({ command }) => ({
  define: {
    isDev: command === 'serve',
  },
  plugins: [react(), viteMockServe(), svgsprites()],
  build: {
    outDir: 'docs',
  },
}))

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;