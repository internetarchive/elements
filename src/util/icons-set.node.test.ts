import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// A few of the icons that came from the iaux-icons set, offshoot and
// collection-browser.
const SAMPLE = [
  'close',
  'calendar-blank',
  'edit-pencil',
  'ia-logo',
  'paypal',
  'external-link',
  'license-by',
  'mediatype-web-unpadded',
  'sort-toggle-up',
  'mediatype-tv-commercial',
  'list-view',
];

/** Everything inside the root `<svg>`, with whitespace between tags dropped. */
function innerMarkup(source: string): string {
  return source
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .trim();
}

let scratch: string;
let sources: string[];
let consumerRequire: NodeJS.Require;

beforeAll(() => {
  scratch = mkdtempSync(join(tmpdir(), 'elements-icons-set-'));

  // Run the generator over a copy of `icons/`, so the test never rewrites the
  // repo's own `src/icons/`.
  mkdirSync(join(scratch, 'scripts'));
  cpSync(
    join(repoRoot, 'scripts/build-icons.mts'),
    join(scratch, 'scripts/build-icons.mts'),
  );
  cpSync(join(repoRoot, 'icons'), join(scratch, 'icons'), { recursive: true });
  execFileSync(process.execPath, [join(scratch, 'scripts/build-icons.mts')], {
    stdio: 'pipe',
  });
  sources = readdirSync(join(scratch, 'icons'))
    .filter((file) => file.endsWith('.svg'))
    .map((file) => file.slice(0, -'.svg'.length));

  const scope = join(scratch, 'node_modules', '@internetarchive');
  mkdirSync(scope, { recursive: true });
  symlinkSync(repoRoot, join(scope, 'elements'), 'dir');
  consumerRequire = createRequire(join(scratch, 'consumer.js'));
});

afterAll(() => {
  rmSync(scratch, { recursive: true, force: true });
});

describe('icon set', () => {
  it('builds every file in icons/ into a module and a raw svg', () => {
    expect(sources.length).toBeGreaterThan(SAMPLE.length);
    for (const name of sources) {
      const module = join(scratch, 'src/icons', `${name}.ts`);
      expect(existsSync(module), `${name}.ts`).toBe(true);
      expect(readFileSync(module, 'utf8')).toContain('aria-hidden="true"');
      expect(existsSync(join(scratch, 'src/icons', `${name}.svg`))).toBe(true);
    }
  });

  it('has no two sources with the same markup', () => {
    const byMarkup = new Map<string, string>();
    for (const name of sources) {
      const markup = innerMarkup(
        readFileSync(join(scratch, 'icons', `${name}.svg`), 'utf8'),
      );
      const existing = byMarkup.get(markup);
      expect(existing, `${name} duplicates ${existing}`).toBeUndefined();
      byMarkup.set(markup, name);
    }
  });

  it('has a source for each sampled icon', () => {
    for (const name of SAMPLE) {
      expect(sources).toContain(name);
    }
  });

  it('resolves the sampled icons through the export map', () => {
    for (const name of SAMPLE) {
      expect(
        consumerRequire.resolve(`@internetarchive/elements/icons/${name}`),
      ).toBe(join(repoRoot, `dist/src/icons/${name}.js`));
      expect(
        consumerRequire.resolve(`@internetarchive/elements/icons/${name}.svg`),
      ).toBe(join(repoRoot, `dist/src/icons/${name}.svg`));
    }
  });
});
