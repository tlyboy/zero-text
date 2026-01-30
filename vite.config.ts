import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'vue-router/vite'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Layouts from 'vite-plugin-vue-layouts'
import { VueRouterAutoImports } from 'vue-router/unplugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/route-map.d.ts',
    }),
    vue(),
    vueDevTools(),
    tailwindcss(),
    Layouts(),
    AutoImport({
      imports: ['vue', VueRouterAutoImports, '@vueuse/core', 'pinia'],
      dirs: ['src/composables', 'src/stores'],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
