/**
 * `--ia-unit` is 1px at the browser's default font size and grows with the
 * user's own font-size setting, whatever the page sets on its root. Every
 * size token that scales is `calc(N * var(--ia-unit, 1px))`.
 *
 * `font-size: medium` is the only CSS value that means the user's default
 * size regardless of the page, so this reads it from a hidden probe and sets
 * the result as an absolute length in a `:where(:root)` rule. That rule has no
 * specificity, so a page's own `--ia-unit` on `:root`, `html` or any element
 * wins whenever its stylesheet loads. The probe stays in the document, one
 * `1em` wide, and a resize observer on it re-reads the size when the user
 * changes their font-size setting with the page open.
 */
export function iaUnitFromDefaultFontSize(defaultFontSizePx: number): string {
  return `${defaultFontSizePx / 16}px`;
}

const sheets = new WeakMap<Document, CSSStyleSheet>();
const probes = new WeakMap<Document, HTMLElement>();
const applied = new WeakMap<Document, string>();

function probeFor(doc: Document, root: HTMLElement): HTMLElement {
  let probe = probes.get(doc);
  if (probe?.isConnected) return probe;
  probe = doc.createElement('div');
  probe.setAttribute('aria-hidden', 'true');
  probe.dataset.iaUnitProbe = '';
  probe.style.cssText =
    'position: absolute; top: 0; left: 0; width: 1em; height: 0; ' +
    'overflow: hidden; visibility: hidden; pointer-events: none; ' +
    'font-size: medium';
  root.append(probe);
  probes.set(doc, probe);
  const view = doc.defaultView;
  if (view && 'ResizeObserver' in view) {
    new view.ResizeObserver(() => applyIaUnit(doc)).observe(probe);
  }
  return probe;
}

export function applyIaUnit(doc: Document = document): void {
  const view = doc.defaultView;
  const root = doc.documentElement;
  if (!view || !root) return;
  const probe = probeFor(doc, root);
  const px = parseFloat(view.getComputedStyle(probe).fontSize);
  if (!(px > 0)) return;
  const unit = iaUnitFromDefaultFontSize(px);
  // The observer also fires once when it starts. Rewriting an unchanged rule
  // would still restyle the whole page.
  if (applied.get(doc) === unit) return;
  applied.set(doc, unit);
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
