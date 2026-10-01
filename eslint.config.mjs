import typescriptEslint from '@typescript-eslint/eslint-plugin';
import esX from 'eslint-plugin-es-x';
import html from 'eslint-plugin-html';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'es-x': esX,
      html,
    },

    languageOptions: {
      parser: tsParser,
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src', 'demo'],
        },
      },
    },

    rules: {
      // Regex syntax newer than the browser floor is a parse error, not a
      // degraded feature: the engine rejects the whole module, so every page
      // importing a component from this package renders blank. The floor is
      // Safari 16.4, so these three stay banned even though `tsc` accepts
      // them all.
      'es-x/no-regexp-lookbehind-assertions': 'error',
      'es-x/no-regexp-v-flag': 'error',
      'es-x/no-regexp-modifiers': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'lit/decorators.js',
              importNames: ['customElement'],
              message:
                "Import customElement from '@src/util/custom-element' instead, so a tag already claimed by another bundle of this package is skipped rather than throwing.",
            },
            {
              name: 'lit/decorators/custom-element.js',
              importNames: ['customElement'],
              message:
                "Import customElement from '@src/util/custom-element' instead, so a tag already claimed by another bundle of this package is skipped rather than throwing.",
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ['**/*.js', '**/*.mjs', '**/*.d.ts', '.claude/', '.wireit/'],
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
];
