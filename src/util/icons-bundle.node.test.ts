import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// A fragment of each seed icon's path data that appears in no other icon.
const SEARCH_PATH = 'm17.0555551 41.3194459';
const ELLIPSES_PATH = 'm10.5 17.5c1.3807119';
const CARET_OPEN_PATH = 'm6.7226499 3.51689722';

let scratch: string;
let entryCount = 0;
let consumerRequire: NodeJS.Require;

/**
 * Bundles a consumer module that sits outside the repo and reaches this
 * package the way an installed copy would: through
 * `node_modules/@internetarchive/elements`. The specifiers then resolve
 * against the real export map and `sideEffects` in package.json, over the
 * built `dist`.
 */
async function bundle(source: string): Promise<string> {
  entryCount += 1;
  const entry = join(scratch, `entry-${entryCount}.js`);
  writeFileSync(entry, source);
  const result = await build({
    configFile: false,
    root: scratch,
    logLevel: 'silent',
    build: {
      write: false,
      minify: false,
      target: 'esnext',
      rollupOptions: { input: entry },
    },
  });
  const outputs = Array.isArray(result) ? result : [result];
  return outputs
    .flatMap((output) => ('output' in output ? output.output : []))
    .map((chunk) => ('code' in chunk ? chunk.code : ''))
    .join('\n');
}

beforeAll(() => {
  scratch = mkdtempSync(join(tmpdir(), 'elements-icons-'));
  const scope = join(scratch, 'node_modules', '@internetarchive');
  mkdirSync(scope, { recursive: true });
  symlinkSync(repoRoot, join(scope, 'elements'), 'dir');
  consumerRequire = createRequire(join(scratch, 'consumer.js'));
});

afterAll(() => {
  rmSync(scratch, { recursive: true, force: true });
});

describe('icon exports', () => {
  it('bundles only the icon that was imported', async () => {
    const code = await bundle(`
      import search from '@internetarchive/elements/icons/search';
      console.log(search);
    `);
    expect(code).toContain(SEARCH_PATH);
    expect(code).not.toContain(ELLIPSES_PATH);
    expect(code).not.toContain(CARET_OPEN_PATH);
    expect(code).not.toContain('ia-button');
    expect(code).not.toContain('customElements.define(tagName');
  });

  it('keeps the registration of an element imported for its side effect', async () => {
    const code = await bundle(
      `import '@internetarchive/elements/ia-button/ia-button';`,
    );
    expect(code).toContain('ia-button');
    expect(code).toContain('customElements.define(tagName');
  });

  it('resolves icons/<name> to the icon module, not an element', () => {
    expect(
      consumerRequire.resolve('@internetarchive/elements/icons/search'),
    ).toBe(join(repoRoot, 'dist/src/icons/search.js'));
  });

  it('resolves icons/<name>.svg to the raw file', async () => {
    const resolved = consumerRequire.resolve(
      '@internetarchive/elements/icons/search.svg',
    );
    expect(resolved).toBe(join(repoRoot, 'dist/src/icons/search.svg'));
    expect(readFileSync(resolved, 'utf8')).toBe(
      readFileSync(join(repoRoot, 'icons/search.svg'), 'utf8'),
    );

    const code = await bundle(`
      import raw from '@internetarchive/elements/icons/search.svg?raw';
      console.log(raw);
    `);
    expect(code).toContain(SEARCH_PATH);
  });
});
