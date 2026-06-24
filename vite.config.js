import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Learn-cybersecurity/',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    cssCodeSplit: false,
    modulePreload: false
  },
  server: {
    port: 3000,
    open: true
  }
})
