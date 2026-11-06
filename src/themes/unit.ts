/**
 * `--ia-unit` is 1px at the browser's default font size and grows with the
 * user's own font-size setting, whatever the page sets on its root. Every
 * size token that scales is `calc(N * var(--ia-unit, 1px))`.
 *
 * `font-size: medium` is the only CSS value that means the user's default
 * size regardless of the page, so this reads it once from a probe and sets
 * the result on `<html>` as an absolute length. A page that already sets
 * `--ia-unit` keeps its own value.
 */
export function iaUnitFromDefaultFontSize(defaultFontSizePx: number): string {
  return `${defaultFontSizePx / 16}px`;
}

export function applyIaUnit(doc: Document = document): void {
  const root = doc.documentElement;
  if (!root || getComputedStyle(root).getPropertyValue('--ia-unit').trim()) {
    return;
  }
  const probe = doc.createElement('div');
  probe.style.cssText =
    'position: absolute; visibility: hidden; font-size: medium';
  root.append(probe);
  const px = parseFloat(getComputedStyle(probe).fontSize);
  probe.remove();
  if (px > 0)
    root.style.setProperty('--ia-unit', iaUnitFromDefaultFontSize(px));
}

if (typeof document !== 'undefined') applyIaUnit();
