import currency from 'currency.js';

import { countries } from './form-elements/contact-form/countries';

type LocaleStatusDetail = { status: string; readyLocale?: string };

let readyLocale: string | undefined;

if (typeof window !== 'undefined') {
  window.addEventListener('lit-localize-status', (event) => {
    const detail = (event as CustomEvent<LocaleStatusDetail>).detail;
    if (detail.status === 'ready') readyLocale = detail.readyLocale;
  });
}

/**
 * The language the app last finished loading, falling back to the page's
 * `lang`. `@lit/localize` only hands `getLocale` to whoever configures it, and
 * this package never does, so the locale is read from its status event.
 */
export function currentLocale(): string {
  if (readyLocale) return readyLocale;
  if (typeof document === 'undefined') return 'en';
  return document.documentElement.lang || 'en';
}

function isEnglish(locale: string): boolean {
  return locale === 'en' || locale.startsWith('en-');
}

/**
 * Formats a US dollar amount for the current language. English keeps the
 * `$10.00` form. Other languages get `Intl.NumberFormat`'s USD form, like
 * `10,00 US$` in Spanish.
 */
export function formatUsd(amount: number, precision = 2): string {
  const locale = currentLocale();
  if (isEnglish(locale)) {
    return currency(amount, { symbol: '$', precision }).format();
  }
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    }).format(amount);
  } catch {
    return currency(amount, { symbol: '$', precision }).format();
  }
}

/**
 * The country choices as `[code, name]` pairs. English keeps the list in its
 * own order and spelling. Other languages get each name from
 * `Intl.DisplayNames`, sorted in that language, and a country the browser
 * can't name keeps its English name.
 */
export function localizedCountries(): [string, string][] {
  const locale = currentLocale();
  const entries = Object.entries(countries);
  if (isEnglish(locale)) return entries;
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
    const collator = new Intl.Collator(locale);
    return entries
      .map(([code, englishName]): [string, string] => {
        const name = displayNames.of(code);
        return [code, name && name !== code ? name : englishName.trim()];
      })
      .sort((a, b) => collator.compare(a[1], b[1]));
  } catch {
    return entries;
  }
}
