import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For deployment to subdirectory if needed:
  // base: '/Nandini-Workspace/',
})
