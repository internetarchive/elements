import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * A line-height with a unit (em, rem, px, %) is computed once and inherited as
 * that fixed length, so a child with a different font size gets the parent's
 * line spacing. Unitless is inherited as the ratio.
 */

const elementsDir = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'elements',
);

/** Fixed on purpose. Each needs a reason. */
const allowed: Record<string, string> = {
  // Line-clamped to two lines inside a max-height sized for 1.2em lines.
  'ia-dropdown/ia-icon-label.ts': 'fixed line box for -webkit-line-clamp',
};

const sources = (
  readdirSync(elementsDir, { recursive: true }) as string[]
).filter((f) => f.endsWith('.ts') && !/\.test\.ts$|-story\.ts$/.test(f));

describe('component line-heights', () => {
  it('are unitless', () => {
    const offenders = sources.flatMap((file) => {
      if (allowed[file]) return [];
      const text = readFileSync(join(elementsDir, file), 'utf8');
      return text
        .split('\n')
        .map((line, i) => ({ line: line.trim(), n: i + 1 }))
        .filter(({ line }) => /line-height:\s*-?[\d.]+(em|rem|px|%)/.test(line))
        .map(({ line, n }) => `${file}:${n}: ${line}`);
    });
    expect(offenders).toEqual([]);
  });
});
