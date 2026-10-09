/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';
import { playwright } from '@vitest/browser-playwright';
import type { Plugin } from 'vite';

/**
 * Adds `/__test__/fail-once.js?id=<id>` to the dev server for the lazy-loader
 * retry test: the first request for an id is a 404 and every later one serves a
 * script that sets `window.otherService`.
 */
function failOnceScript(): Plugin {
  const seen = new Set<string>();
  return {
    name: 'fail-once-script',
    configureServer(server) {
      server.middlewares.use('/__test__/fail-once.js', (req, res) => {
        const id = new URL(req.url ?? '', 'http://localhost').searchParams.get(
          'id',
        );
        if (id && seen.has(id)) {
          res.setHeader('Content-Type', 'text/javascript');
          res.end(
            'window.otherService = { getResponse() { return "someotherresponse"; } }',
          );
          return;
        }
        if (id) seen.add(id);
        res.statusCode = 404;
        res.end('Not Found');
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [failOnceScript()],
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
    // Recursive patterns, so a build or an install nested anywhere under the
    // repo is skipped and not just the top-level one. `.claude` holds the
    // worktrees, whose tests belong to whatever branch is checked out there.
    exclude: ['**/node_modules/**', '**/dist/**', '.claude/**'],
  },
});
