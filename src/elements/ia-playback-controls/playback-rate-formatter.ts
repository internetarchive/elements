/**
 * Formats a playback rate for display.
 *
 * The rate moves in quarter steps, and the decimal separator for those varies
 * by locale, so the number goes through `Intl` rather than straight into a
 * template. Omitting the locale uses the reader's own.
 */
export function formatPlaybackRate(rate: number, locale?: string): string {
  return new Intl.NumberFormat(locale).format(rate);
}
