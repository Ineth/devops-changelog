import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents from 'vite-plugin-components';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      dirs: ['src/components', 'src/views'],
    }),
  ], // TODO: add vite-plugin-components
  base: process.env.NODE_ENV === 'production' ? '/devops-changelog/' : '/',
  resolve: {
    alias: [{ find: '@/', replacement: `${__dirname}/src/` }],
  },
});
