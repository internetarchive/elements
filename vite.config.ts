/// <reference types="vitest" />
import { mergeConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import baseConfig from './vite.config.base';

// https://vitejs.dev/config/
export default mergeConfig(baseConfig, {
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
