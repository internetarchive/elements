import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Every length token is px and sits under a group that says whether it grows
 * with the user's font-size setting. The split is a design decision, so it's
 * pinned here group by group.
 */

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const tokens = JSON.parse(
  readFileSync(join(repoRoot, 'tokens', 'tokens.json'), 'utf8'),
);

type Node = Record<string, unknown> & {
  $value?: unknown;
  $extensions?: { ia?: { scale?: boolean } };
};

function lengths(node: Node, path: string[] = [], scale?: boolean) {
  const out: { path: string; value: string; scale?: boolean }[] = [];
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') || !child || typeof child !== 'object') continue;
    const c = child as Node;
    if ('$value' in c) {
      const value = String(c.$value);
      if (/\d(px|rem|em)\b/.test(value)) {
        out.push({ path: [...path, key].join('.'), value, scale });
      }
    } else {
      out.push(
        ...lengths(c, [...path, key], c.$extensions?.ia?.scale ?? scale),
      );
    }
  }
  return out;
}

const all = lengths(tokens);
const scaling = new Set(all.filter((t) => t.scale).map((t) => t.path));

describe('length tokens', () => {
  it.each(all)('$path has a scale flag and is px', ({ value, scale }) => {
    expect(scale).not.toBeUndefined();
    expect(value).not.toMatch(/\d(rem|em)\b/);
  });

  it('scale exactly the groups that hold or space text', () => {
    const groups = [
      ...new Set([...scaling].map((p) => p.split('.').slice(0, -1).join('.'))),
    ].sort();
    expect(groups).toEqual([
      'container',
      'font.size',
      'size.control',
      'size.icon',
      'space',
    ]);
  });

  it('keep hairlines, focus rings, corners, the touch minimum, shadows and breakpoints fixed', () => {
    for (const path of [
      'size.borderWidth',
      'size.focusRing',
      'size.focusRingOffset',
      'size.target.min',
      'radius.default',
      'shadow.overlay',
      'blur.scrim',
      'breakpoint.md',
    ]) {
      expect(scaling.has(path), path).toBe(false);
      expect(
        all.some((t) => t.path === path),
        path,
      ).toBe(true);
    }
  });
});
