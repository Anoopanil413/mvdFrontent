// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      strategies: 'generateSW',
      manifest: {
        name: 'Let Me Go',
        short_name: 'LetMeGo',
        description: 'A community-driven platform that helps maintain proper parking etiquette.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          }
        ],
        screenshots: [
          {
            src: '/screenshot.png',
            sizes: '1920x872',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: '/screenshota.png',
            sizes: '1080x1920',
            type: 'image/png',
            form_factor: 'wide'
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})