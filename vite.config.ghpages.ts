import { mergeConfig } from 'vitest/config';
import baseConfig from './vite.config.base';

// https://vitejs.dev/config/
export default mergeConfig(baseConfig, {
  base: './',
  build: {
    outDir: './ghpages',
    emptyOutDir: true,
    manifest: true,
  },
});
