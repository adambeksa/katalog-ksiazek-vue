import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  server: {
    // Pliki XML Wolnych Lektur nie mają CORS - na produkcji to samo robi rewrite w vercel.json
    proxy: {
      '/wl-xml': {
        target: 'https://wolnelektury.pl',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wl-xml/, '/media/book/xml'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables" as *; @use "@/styles/mixins" as *;`,
        // @ts-expect-error - 'api' is a valid option for sass-embedded but missing in vite types
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

