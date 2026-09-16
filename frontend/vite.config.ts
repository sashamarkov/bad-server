import react from '@vitejs/plugin-react';
import { resolve, sep } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const rootDir = import.meta.dirname;

const toPosix = (p: string) => p.split(sep).join('/');

export default defineConfig({
  plugins: [svgr(), react(), tsconfigPaths({ root: rootDir })],
  resolve: {
    alias: {
      $fonts: resolve(rootDir, 'src/vendor/fonts'),
      $assets: resolve(rootDir, 'src/assets'),
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "${toPosix(resolve(rootDir, 'src/scss/variables'))}" as *;
          @use "${toPosix(resolve(rootDir, 'src/scss/mixins'))}";
        `,
      },
    },
  },
});