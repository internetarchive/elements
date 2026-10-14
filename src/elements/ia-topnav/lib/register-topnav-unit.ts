/**
 * Registers `--topnavUnit--` as a typed custom property so its value is
 * computed once, at the host where it's declared, and then inherits as that
 * fixed length everywhere else in the tree, including nested shadow roots.
 * Without registration, a custom property carrying a `calc()` with `em` in it
 * gets re-evaluated against each descendant's own font-size when read there,
 * which would make the unit compound through nested components instead of
 * staying constant.
 *
 * This has to be a JS call rather than an `@property` rule scoped to a shadow
 * root's stylesheet, since `@property` only registers at document scope.
 * `ia-topnav.ts` calls this once at module scope (document-global, and
 * idempotent), which makes it take effect for every `ia-topnav` shadow root
 * on the page.
 *
 * Returns whether the registered, non-compounding `--topnavUnit--` is active.
 * `false` means the browser doesn't support `CSS.registerProperty` (Firefox
 * before 128, Safari before 16.4), so callers should fall back to
 * `applyTopnavUnitFallback()`.
 */
export function registerTopnavUnit(): boolean {
  if (
    typeof CSS === 'undefined' ||
    typeof CSS.registerProperty !== 'function'
  ) {
    return false;
  }
  try {
    CSS.registerProperty({
      name: '--topnavUnit--',
      syntax: '<length>',
      inherits: true,
      initialValue: '1px',
    });
  } catch (e) {
    // A second ia-topnav module evaluation (or hot reload) already
    // registered it. Anything else is a real failure, so it surfaces.
    if (!(e instanceof DOMException) || e.name !== 'InvalidModificationError') {
      throw e;
    }
  }
  return true;
}

/**
 * Without a registered `--topnavUnit--`, its `calc(1em / 16)` value is just a
 * stored token stream that gets re-resolved against each descendant's own
 * font-size at the point it's substituted in, so it compounds under any
 * container that sets its own font-size (e.g. dropdown-menu's desktop
 * dropdown, itself sized with `calc(14 * var(--topnavUnit--))`). This sets
 * `--topnavUnit--` on the host as an already-resolved pixel value instead,
 * computed from the host's own rendered font-size, so there's no `em` left
 * for a descendant to re-resolve.
 */
export function applyTopnavUnitFallback(host: HTMLElement): void {
  const fontSizePx = parseFloat(getComputedStyle(host).fontSize);
  if (Number.isNaN(fontSizePx)) return;
  host.style.setProperty('--topnavUnit--', `${fontSizePx / 16}px`);
}
