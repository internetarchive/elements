import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * A line-height with a unit (em, rem, px, %) is computed once and inherited as
 * that fixed length, so a child with a different font size gets the parent's
 * line spacing. Unitless is inherited as the ratio.
 */

const srcDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirs = ['elements', 'labs'];

/** Fixed on purpose, by file and the exact value text. Each needs a reason. */
const allowed: { file: string; value: string; reason: string }[] = [
  {
    file: 'elements/ia-dropdown/ia-icon-label.ts',
    value: '1.2em',
    reason: 'two-line -webkit-line-clamp inside a max-height sized for it',
  },
];

const unitLength =
  /(?<![\w.-])-?\d*\.?\d+(?:em|rem|px|%|pt|lh|rlh|vh|vw)(?![\w-])/;

/**
 * Every line-height in the source with a length in its value: the property,
 * a custom property or var() fallback named for one, and the `size/height`
 * part of the font shorthand.
 */
function unitLineHeights(text: string): { line: number; value: string }[] {
  const found: { line: number; value: string }[] = [];
  const lineOf = (index: number) => text.slice(0, index).split('\n').length;
  // The name, then everything up to the end of its declaration or argument.
  const named = /line-?height[\w-]*\s*[:,]([^;`}]*)/gi;
  for (const m of text.matchAll(named)) {
    const value = m[1].match(unitLength);
    if (value) found.push({ line: lineOf(m.index), value: value[0] });
  }
  const fontShorthand = /\bfont\s*:[^;`]*\/\s*(-?\d*\.?\d+[a-z%]+)/gi;
  for (const m of text.matchAll(fontShorthand)) {
    if (unitLength.test(m[1]))
      found.push({ line: lineOf(m.index), value: m[1] });
  }
  return found;
}

const sources = sourceDirs.flatMap((dir) =>
  (readdirSync(join(srcDir, dir), { recursive: true }) as string[])
    .filter((f) => f.endsWith('.ts') && !/\.test\.ts$|-story\.ts$/.test(f))
    .map((f) => `${dir}/${f}`),
);

describe('component line-heights', () => {
  it('are unitless', () => {
    const offenders = sources.flatMap((file) =>
      unitLineHeights(readFileSync(join(srcDir, file), 'utf8'))
        .filter(
          ({ value }) =>
            !allowed.some((a) => a.file === file && a.value === value),
        )
        .map(({ line, value }) => `${file}:${line}: ${value}`),
    );
    expect(offenders).toEqual([]);
  });

  it('finds them in every form it claims to', () => {
    const found = (css: string) => unitLineHeights(css).map((f) => f.value);
    expect(found('line-height: 1.2em;')).toEqual(['1.2em']);
    expect(found('line-height: 100%;')).toEqual(['100%']);
    expect(found('--x-line-height--: var(\n  --y,\n  1em\n);')).toEqual([
      '1em',
    ]);
    expect(found('css`var(--fooLineHeight, 1.2em)`')).toEqual(['1.2em']);
    expect(found('font: normal 14px/20px sans-serif;')).toEqual(['20px']);
    expect(found('line-height: 1.5; font: 1.2rem/1.5 x;')).toEqual([]);
    expect(found('line-height: var(--ia-font-line-height-tight--);')).toEqual(
      [],
    );
  });
});
