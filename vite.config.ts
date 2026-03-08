import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "https://niyi-16.github.io/",
  plugins: [react()],
  css: {
    preprocessorOptions:{
      scss: {
        additionalData: `@use "/src/assets/_variables" as var;\n`
      }
    }
  }
})
