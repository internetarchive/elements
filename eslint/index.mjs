import { noHandBuiltDownloadUrl } from './no-hand-built-download-url.mjs';

/**
 * ESLint plugin shipped with @internetarchive/elements.
 *
 * ```js
 * import elements from '@internetarchive/elements/eslint-plugin';
 *
 * export default [
 *   {
 *     plugins: { elements },
 *     rules: { 'elements/no-hand-built-download-url': 'error' },
 *   },
 * ];
 * ```
 */
export default {
  meta: { name: '@internetarchive/elements' },
  rules: { 'no-hand-built-download-url': noHandBuiltDownloadUrl },
};
