/**
 * `--ia-unit` is 1px at the browser's default font size and grows with the
 * user's own font-size setting, whatever the page sets on its root. Every
 * size token that scales is `calc(N * var(--ia-unit, 1px))`.
 *
 * `font-size: medium` is the only CSS value that means the user's default
 * size regardless of the page, so this reads it once from a probe, when the
 * module loads, and sets the result as an absolute length in a `:where(:root)`
 * rule. That rule has no specificity, so a page's own `--ia-unit` on `:root`,
 * `html` or any element wins whenever its stylesheet loads.
 */
export function iaUnitFromDefaultFontSize(defaultFontSizePx: number): string {
  return `${defaultFontSizePx / 16}px`;
}

const sheets = new WeakMap<Document, CSSStyleSheet>();

export function applyIaUnit(doc: Document = document): void {
  const view = doc.defaultView;
  const root = doc.documentElement;
  if (!view || !root) return;
  const probe = doc.createElement('div');
  probe.style.cssText =
    'position: absolute; visibility: hidden; font-size: medium';
  root.append(probe);
  const px = parseFloat(view.getComputedStyle(probe).fontSize);
  probe.remove();
  if (!(px > 0)) return;
  const unit = iaUnitFromDefaultFontSize(px);
  if (!('adoptedStyleSheets' in doc)) {
    // No constructable stylesheets: an inline value, which a page overrides
    // only with !important.
    root.style.setProperty('--ia-unit', unit);
    return;
  }
  let sheet = sheets.get(doc);
  if (!sheet) {
    sheet = new view.CSSStyleSheet();
    sheets.set(doc, sheet);
    doc.adoptedStyleSheets = [sheet, ...doc.adoptedStyleSheets];
  }
  sheet.replaceSync(`:where(:root) { --ia-unit: ${unit}; }`);
}

if (typeof document !== 'undefined') applyIaUnit();
