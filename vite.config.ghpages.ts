import { defineConfig } from 'vitest/config';
import { readdirSync } from 'fs';
import path from 'path';
import { docChrome } from './demo/docs/chrome-plugin';

// Every page of the demo: the components page, the design system pages beside
// it, and the screens they frame.
const pages = [
  ...readdirSync(__dirname).filter((f) => f.endsWith('.html')),
  ...readdirSync(path.resolve(__dirname, 'demo/docs/screens')).map(
    (f) => `demo/docs/screens/${f}`,
  ),
];

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [docChrome()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@demo': path.resolve(__dirname, './demo'),
    },
  },
  build: {
    outDir: './ghpages',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [
          page.replace(/\.html$/, ''),
          path.resolve(__dirname, page),
        ]),
      ),
    },
  },
});
