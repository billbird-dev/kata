import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  plugins: [vue()],

  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'kata-lib',
    },
    rollupOptions: {
      treeshake: true,
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
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
