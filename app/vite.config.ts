import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Windi from 'vite-plugin-windicss';
// import VueTypeImports from 'vite-plugin-vue-type-imports';
import analyze from 'rollup-plugin-analyzer';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [vue({ refTransform: true }), Windi(), analyze()],
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      'src/': new URL('./src/', import.meta.url).pathname,
    },
  },
});
