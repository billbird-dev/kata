import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Windi from 'vite-plugin-windicss';
import VueTypeImports from 'vite-plugin-vue-type-imports';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Windi(), VueTypeImports()],
  resolve: {
    alias: {
      $lib: '/lib',
      $src: '/src',
    },
  },
});
