/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@demo': path.resolve(__dirname, './demo'),
    },
  },
  build: {
    outDir: './ghpages/demo',
    emptyOutDir: true,
    manifest: true,
  },
});
