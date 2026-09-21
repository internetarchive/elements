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
      provider: playwright({
        launchOptions: {
          // Media elements refuse to play without a user gesture by default,
          // which no automated test can supply.
          args: ['--autoplay-policy=no-user-gesture-required'],
        },
      }),
    },
    coverage: {
      // Stories are demo scaffolding, not shipped code. A demo test loads one
      // to drive the element it wraps, which would otherwise pull the story
      // into the report and skew the numbers for the element itself.
      exclude: ['dist/**/*', '**/*-story.ts'],
      reporter: ['lcov', 'text-summary', 'html'],
      enabled: true,
    },
    watch: false,
    exclude: ['node_modules', 'dist'],
  },
});
