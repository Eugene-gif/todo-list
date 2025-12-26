import { defineConfig } from 'vite';
import { resolve } from 'path';
// import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  base: process.env.IS_HOST === 'true' ? "/" : '/todo-list',
  build: {
    outDir: process.env.IS_HOST === 'true' ? 'public_html' : 'dist',
  },
  server: {
    open: true,
    host: true,
  },
  // plugins: [injectHTML()],
  resolve: {
    alias: { '@': resolve(__dirname, './src') }
  },
});