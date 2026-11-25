// The icon set and the logo as SVG markup, on window.IADesignSystem, for
// designs that draw them inline: iconNames, iconSvg() and logoSvg().

import { IA_ICONS } from '../../demo/docs/assets/icons.js';
import logoWhite from '../../demo/docs/assets/brand/ia-logo-white.svg?raw';
import logoDark from '../../demo/docs/assets/brand/ia-logo-dark.svg?raw';
import markWhite from '../../demo/docs/assets/brand/ia-mark-white.svg?raw';
import markDark from '../../demo/docs/assets/brand/ia-mark-dark.svg?raw';
import wordmarkWhite from '../../demo/docs/assets/brand/ia-wordmark-white.svg?raw';
import wordmarkDark from '../../demo/docs/assets/brand/ia-wordmark-dark.svg?raw';

interface IconShape {
  tag: string;
  attrs?: Record<string, string | number>;
  children?: IconShape[];
}

interface IconDef {
  viewBox: string;
  shapes: IconShape[];
  rotate?: number;
}

const ICONS = IA_ICONS as Record<string, IconDef>;

const BRAND: Record<string, string> = {
  'ia-logo-white': logoWhite.trim(),
  'ia-logo-dark': logoDark.trim(),
  'ia-mark-white': markWhite.trim(),
  'ia-mark-dark': markDark.trim(),
  'ia-wordmark-white': wordmarkWhite.trim(),
  'ia-wordmark-dark': wordmarkDark.trim(),
};

const SIZES: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
};

const attr = (v: unknown) =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');

// An icon that draws with a <mask> names it {uid}; each drawn icon gets its own.
let iconCount = 0;

const draw = (shapes: IconShape[] | undefined, uid: string): string =>
  (shapes ?? [])
    .map(({ tag, attrs = {}, children }) => {
      const a = Object.entries(attrs)
        .map(([k, v]) => ` ${k}="${attr(String(v).replace(/\{uid\}/g, uid))}"`)
        .join('');
      const inner = draw(children, uid);
      return inner ? `<${tag}${a}>${inner}</${tag}>` : `<${tag}${a}/>`;
    })
    .join('');

/** Every icon name in the set. */
export const iconNames = Object.keys(ICONS);

/**
 * An icon as SVG markup, drawn in currentColor.
 * size: 'sm' 16 · 'md' 20 (default) · 'lg' 24 · 'xl' 32 · '2xl' 40.
 * label: give one only when the icon is the control's only name.
 */
export function iconSvg(
  name: string,
  { size = 'md', label = '' }: { size?: string | number; label?: string } = {},
): string {
  const def = ICONS[name];
  if (!def) return '';
  const px = SIZES[size] ?? size;
  const [, , w, h] = def.viewBox.split(/\s+/).map(Number);
  let body = draw(def.shapes, `ia-icon-${++iconCount}`);
  if (def.rotate) {
    body = `<g transform="rotate(${def.rotate} ${w / 2} ${h / 2})">${body}</g>`;
  }
  const stroked = JSON.stringify(def.shapes).includes('stroke-width');
  const a11y = label
    ? `role="img" aria-label="${attr(label)}"`
    : 'aria-hidden="true" focusable="false"';
  return (
    `<svg class="ia-icon" xmlns="http://www.w3.org/2000/svg" viewBox="${def.viewBox}" width="${px}" height="${px}" ` +
    `fill="currentColor"${stroked ? ' stroke="currentColor"' : ''} ${a11y}>${body}</svg>`
  );
}

/**
 * The logo as SVG markup. part: 'logo' (mark + wordmark, 132×30), 'mark' or
 * 'wordmark'. colorway: 'white' for dark chrome, 'dark' for light surfaces.
 */
export function logoSvg({
  part = 'logo',
  colorway = 'white',
}: { part?: string; colorway?: string } = {}): string {
  return BRAND[`ia-${part}-${colorway}`] ?? '';
}
