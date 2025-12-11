/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';
import { playwright } from '@vitest/browser-playwright';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@demo': path.resolve(__dirname, './demo'),
    },
  },
  test: {
    browser: {
      enabled: true,
      instances: [{ browser: 'chromium' }],
      headless: true,
      provider: playwright(),
    },
    coverage: {
      exclude: ['dist/**/*'],
      reporter: ['lcov', 'text-summary', 'html'],
      enabled: true,
    },
    watch: false,
    exclude: ['node_modules', 'dist'],
  },
});
