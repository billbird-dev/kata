import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Windi from 'vite-plugin-windicss';
import PurgeIcons from 'vite-plugin-purge-icons';
// import VueTypeImports from 'vite-plugin-vue-type-imports';
import analyze from 'rollup-plugin-visualizer';
import { dependencies } from './package.json';

function renderChunks(deps: Record<string, string>) {
  let chunks: { [x: string]: string[] } = {};

  Object.keys(deps).forEach((key) => {
    if (['vue', 'vue-router'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [vue({ refTransform: true }), Windi(), analyze(), PurgeIcons()],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
          ...renderChunks(dependencies),
        },
      },
    },
  },
  resolve: {
    alias: {
      'src/': new URL('./src/', import.meta.url).pathname,
    },
  },
});
