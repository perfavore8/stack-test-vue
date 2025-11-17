import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  base: '/saa-soft-test/',
  plugins: [vue()],
  server: {
    port: 3001,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        chunkFileNames: `assets/[name].js`,
      },
    },
  },
});
