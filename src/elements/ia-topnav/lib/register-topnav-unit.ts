/**
 * @deprecated ia-topnav no longer needs this. Its unit is `--ia-unit` divided
 * down to a px length, so it can't compound through nested font sizes, and
 * the topnav sets it up on its own. Always returns `true`.
 */
export function registerTopnavUnit(): boolean {
  return true;
}

/**
 * @deprecated ia-topnav no longer needs this; see `registerTopnavUnit`. Does
 * nothing.
 */
// The parameter stays so existing calls still typecheck.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function applyTopnavUnitFallback(_host: HTMLElement): void {}
