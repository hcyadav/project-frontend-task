import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [react(), checker({
    typescript: {
      buildMode: true, // Ensure it runs during build in development
    }
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
