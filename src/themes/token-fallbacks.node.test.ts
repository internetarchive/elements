import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Styles that render outside a shadow root, such as the donation form's
 * light-DOM styles, can't read the private `--ia-x--` aliases, so they read a
 * token by its public name with its value written out as the fallback:
 * `var(--ia-color-text-primary, #2c2c2c)`. Each written-out hex has to match
 * what the token resolves to in tokens/tokens.json.
 */

type TokenNode = { $value?: unknown; [key: string]: unknown };

const srcDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(
  readFileSync(join(srcDir, '..', 'tokens', 'tokens.json'), 'utf8'),
) as TokenNode;

/** Every leaf token's dotted path, keyed by its CSS name. */
const paths = new Map<string, string>();
(function walk(node: TokenNode, path: string[]) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') || child === null || typeof child !== 'object') {
      continue;
    }
    const next = [...path, key];
    if ('$value' in (child as TokenNode)) {
      paths.set(`--ia-${next.join('-')}`, next.join('.'));
    } else {
      walk(child as TokenNode, next);
    }
  }
})(tokens, []);

/** Follows `{a.b.c}` references to the value they end at. */
function resolve(path: string, depth = 0): string {
  if (depth > 10) throw new Error(`reference loop at ${path}`);
  let node: TokenNode | undefined = tokens;
  for (const key of path.split('.')) node = node?.[key] as TokenNode;
  const value = String(node?.$value);
  const ref = /^\{([^}]+)\}$/.exec(value);
  return ref ? resolve(ref[1], depth + 1) : value;
}

const fullHex = (hex: string) => {
  const h = hex.slice(1).toLowerCase();
  return `#${h.length === 3 ? [...h].map((c) => c + c).join('') : h}`;
};

const sourceFiles = (readdirSync(srcDir, { recursive: true }) as string[])
  .filter(
    (f) =>
      f.endsWith('.ts') &&
      !/\.test\.ts$|-story\.ts$/.test(f) &&
      f !== join('themes', 'tokens.ts'),
  )
  .map((f) => join(srcDir, f));

const fallbacks = sourceFiles.flatMap((file) =>
  [
    ...readFileSync(file, 'utf8').matchAll(
      /var\(\s*(--ia-[a-z0-9-]+)\s*,\s*(#[0-9a-fA-F]{3,8})\s*\)/g,
    ),
  ].map(([, name, hex]) => ({
    where: `${relative(srcDir, file)}: ${name}`,
    name,
    hex,
  })),
);

describe('hex fallbacks written beside a public token name', () => {
  it('exist, so this test is checking something', () => {
    expect(fallbacks.length).toBeGreaterThan(0);
  });

  it.each(fallbacks)('$where matches the token', ({ name, hex }) => {
    const path = paths.get(name);
    expect(path, `${name} is not a token`).toBeDefined();
    expect(fullHex(hex)).toBe(fullHex(resolve(path!)));
  });
});
