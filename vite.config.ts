import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Windi from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Windi()],
  resolve: {
    alias: {
      $lib: '/lib',
      $src: '/src',
    },
  },
});
