import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Every foreground/background pairing the design system recommends has to
 * meet the contrast its role needs, resolved from tokens/tokens.json so the
 * check can't drift from the published values. Thresholds follow WCAG 2.2:
 * 4.5 for text (1.4.3), 3 for control boundaries and focus indicators (1.4.11).
 */

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const tokens = JSON.parse(
  readFileSync(join(repoRoot, 'tokens', 'tokens.json'), 'utf8'),
);

function toRgb(hex: string): number[] {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

function luminance(rgb: number[]): number {
  const [r, g, b] = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [l1, l2] = [luminance(toRgb(a)), luminance(toRgb(b))];
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return Math.round(ratio * 100) / 100;
}

/** Follows `{a.b.c}` references to the hex value they end at. */
function resolve(path: string, depth = 0): string {
  if (depth > 10) throw new Error(`reference loop at ${path}`);
  let node = tokens;
  for (const key of path.split('.')) {
    node = node?.[key];
    if (node === undefined) throw new Error(`unknown token: ${path}`);
  }
  if (!('$value' in node)) throw new Error(`not a leaf token: ${path}`);
  const ref = /^\{([^}]+)\}$/.exec(String(node.$value));
  return ref ? resolve(ref[1], depth + 1) : node.$value;
}

const TEXT = 4.5;
const UI = 3;
const SURFACES = ['page', 'raised', 'sunken'].map((s) => `color.surface.${s}`);
const DARK = ['chrome', 'inverse', 'chrome-secondary', 'theater'].map(
  (s) => `color.surface.${s}`,
);

type Pair = { fg: string; bg: string; min: number; why: string };
const pairs: Pair[] = [];
const add = (fg: string, bg: string, min: number, why: string) =>
  pairs.push({ fg, bg, min, why });

// Body text on every light surface it can land on.
for (const bg of SURFACES) {
  add('color.text.primary', bg, TEXT, 'body text');
  add('color.text.secondary', bg, TEXT, 'secondary text');
  add('color.text.link', bg, TEXT, 'link text');
  add('color.text.link-hover', bg, TEXT, 'link hover');
  add('color.text.danger', bg, TEXT, 'inline error text');
  add('color.border.strong', bg, UI, 'input and control borders');
  add('color.border.focus', bg, UI, 'focus indicator');
}
// Inverse chrome.
for (const bg of DARK) {
  add('color.text.inverse', bg, TEXT, 'text on dark chrome');
  add('color.text.inverse-secondary', bg, TEXT, 'secondary text on dark');
  add('color.text.inverse-link', bg, TEXT, 'links on dark chrome');
  add('color.text.inverse-link-hover', bg, TEXT, 'link hover on dark');
  add('color.border.focus-inverse', bg, UI, 'focus indicator on dark');
}
// Every CTA label against its own fill.
for (const intent of [
  'primary',
  'secondary',
  'danger',
  'warning',
  'donate',
  'disabled',
]) {
  add(
    `color.action.${intent}-text`,
    `color.action.${intent}-fill`,
    TEXT,
    `${intent} button label`,
  );
}
// A filled button's fill is what sets it apart from the page. The secondary
// fill is white and the warning fill too light, so on those two the border
// carries the boundary and has to clear 3:1 itself. Disabled controls are
// exempt from 1.4.11.
for (const intent of ['primary', 'danger', 'donate']) {
  add(
    `color.action.${intent}-fill`,
    'color.surface.page',
    UI,
    `${intent} button fill against the page`,
  );
}
add(
  'color.action.secondary-border',
  'color.surface.page',
  UI,
  'secondary button border',
);
add(
  'color.action.warning-border',
  'color.surface.page',
  UI,
  'warning button border',
);
// Status colors as text, and on their own tints.
for (const bg of SURFACES) {
  for (const s of ['success', 'warning', 'danger', 'info']) {
    add(`color.status.${s}`, bg, TEXT, `${s} text`);
  }
}
for (const s of ['success', 'warning', 'danger', 'info']) {
  add(
    'color.text.primary',
    `color.status.${s}-subtle`,
    TEXT,
    `text on ${s} tint`,
  );
  add(
    `color.status.${s}`,
    `color.status.${s}-subtle`,
    TEXT,
    `${s} ink on its tint`,
  );
}
// The two selected tiers.
add(
  'color.selected.strong-text',
  'color.selected.strong-fill',
  TEXT,
  'strong selected',
);
add(
  'color.selected.soft-text',
  'color.selected.soft-fill',
  TEXT,
  'soft selected',
);
add(
  'color.text.primary',
  'color.selected.soft-fill',
  TEXT,
  'primary text on a soft selection',
);
// Environment badge label.
for (const env of ['development', 'staging']) {
  add(
    'color.text.inverse',
    `color.environment.${env}`,
    TEXT,
    `${env} badge label`,
  );
}
// Brand.
add(
  'color.action.donate-fill',
  'color.action.donate-subtle',
  TEXT,
  'amount on the donation thermometer track',
);
add(
  'color.brand.donate',
  'color.surface.chrome',
  UI,
  'donate heart on the topnav',
);
add(
  'color.brand.donate',
  'color.surface.chrome-secondary',
  UI,
  'donate heart on the subnav',
);
// A media-type glyph on a tile's white card, and in the topnav's open menu.
for (const type of [
  'texts',
  'movies',
  'audio',
  'software',
  'image',
  'web',
  'data',
  'collection',
  'tv',
  'radio',
  'film',
]) {
  add(
    `color.mediatype.${type}`,
    'color.surface.raised',
    UI,
    `${type} glyph on a tile`,
  );
}
for (const type of ['web', 'texts', 'movies', 'audio', 'software', 'image']) {
  add(
    `color.mediatype.${type}`,
    'color.surface.chrome-secondary',
    UI,
    `open ${type} menu in the topnav`,
  );
}
// The dropdown panel's selected option, and the collection tile.
add(
  'color.text.inverse',
  'color.surface.collection',
  TEXT,
  'collection tile text',
);
add(
  'color.text.inverse',
  'color.selected.soft-fill-inverse',
  TEXT,
  'selected option on a dark panel',
);

describe('design token contrast', () => {
  it.each(pairs)('$fg on $bg: $why', ({ fg, bg, min }) => {
    expect(contrast(resolve(fg), resolve(bg))).toBeGreaterThanOrEqual(min);
  });
});
