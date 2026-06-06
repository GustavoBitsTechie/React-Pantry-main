import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    include: '**/*.jsx'
  })],
  server: {
    port: 3000,
    open: true,
    middlewareMode: false,
    fs: {
      strict: false
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
