/**
 * Registers `--topnavUnit--` as an inherited `<length>`, so its
 * `calc(1em / 16)` is worked out once, at the `ia-topnav` host, and inherits
 * as that px length everywhere below it, nested shadow roots included.
 * Unregistered, the `em` would be resolved again against each part's own font
 * size, and the unit would compound through nested components.
 *
 * `@property` only registers at document scope, not from a shadow root's
 * stylesheet, so this is a JS call. `ia-topnav.ts` makes it when the module
 * loads, so consumers don't need to call it. It's idempotent.
 *
 * Returns `false` where `CSS.registerProperty` isn't supported (Firefox
 * before 128, Safari before 16.4).
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
    // Already registered by an earlier evaluation of this module (a second
    // copy, or a hot reload). Anything else is a real failure.
    if (!(e instanceof DOMException) || e.name !== 'InvalidModificationError') {
      throw e;
    }
  }
  return true;
}

/**
 * @deprecated ia-topnav no longer needs this. Every browser elements supports
 * has `CSS.registerProperty`, which `registerTopnavUnit` uses. Does nothing.
 */
// The parameter stays so existing calls still typecheck.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function applyTopnavUnitFallback(_host: HTMLElement): void {}
