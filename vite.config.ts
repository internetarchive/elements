/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';
import { playwright } from '@vitest/browser-playwright';

const alias = {
  '@src': path.resolve(__dirname, './src'),
  '@demo': path.resolve(__dirname, './demo'),
};

// Recursive patterns, so a build or an install nested anywhere under the repo
// is skipped and not just the top-level one. `.claude` holds the worktrees,
// whose tests belong to whatever branch is checked out there.
const exclude = ['**/node_modules/**', '**/dist/**', '.claude/**'];

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      // Stories are demo scaffolding, not shipped code. A demo test loads one
      // to drive the element it wraps, which would otherwise pull the story
      // into the report and skew the numbers for the element itself.
      exclude: ['dist/**/*', '**/*-story.ts'],
      reporter: ['lcov', 'text-summary', 'html'],
      enabled: true,
    },
    watch: false,
    projects: [
      {
        // Element tests, run in a real browser.
        resolve: { alias },
        test: {
          name: 'browser',
          include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
          exclude: [...exclude, '**/*.node.test.ts'],
          browser: {
            enabled: true,
            instances: [{ browser: 'chromium' }],
            headless: true,
            provider: playwright({
              launchOptions: {
                // Media elements refuse to play without a user gesture by
                // default, which no automated test can supply.
                args: ['--autoplay-policy=no-user-gesture-required'],
              },
            }),
          },
        },
      },
      {
        // Tests that need Node (the file system, Vite's build API). They run
        // against the built `dist`, so `pnpm test` builds first.
        resolve: { alias },
        test: {
          name: 'node',
          environment: 'node',
          include: ['src/**/*.node.test.ts'],
          exclude,
        },
      },
    ],
  },
});
