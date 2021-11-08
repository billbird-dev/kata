import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Windi from 'vite-plugin-windicss';
// import VueTypeImports from 'vite-plugin-vue-type-imports';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [vue(), Windi()],
  build: {
    minify: 'terser',
  },
  resolve: {
    alias: {
      'src/': new URL('./src/', import.meta.url).pathname,
    },
  },
});
