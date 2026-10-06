import { configureLocalization } from '@lit/localize';

/** The URL query param a deep link uses to request a starting locale. */
export const LANG_PARAM = 'lang';

/**
 * The demo app is the one place in this repo allowed to call
 * configureLocalization: @lit/localize throws if it's configured twice, and
 * every element's own msg() calls expect a single app-level owner. The
 * package's source never calls it; only this demo does, so a reviewer can
 * view elements in Spanish from a PR preview.
 */
export const { getLocale, setLocale } = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['es'],
  // The demo is this package's own test bed, so it loads the built Spanish
  // module straight from source rather than through a published dependency.
  loadLocale: () => import('@src/locales/es'),
});

/** Reads the locale a deep link's `?lang=` param asks for. */
export function localeFromUrl(): 'en' | 'es' {
  const requested = new URLSearchParams(window.location.search).get(LANG_PARAM);
  return requested === 'es' ? 'es' : 'en';
}

/**
 * Writes the given locale into the URL's `lang` param, replacing history
 * rather than pushing so switching languages doesn't add back-button stops.
 * The source locale is the default, so it's left as an absent param rather
 * than written out as `lang=en`.
 */
export function writeLocaleToUrl(locale: 'en' | 'es'): void {
  const url = new URL(window.location.href);
  if (locale === 'en') url.searchParams.delete(LANG_PARAM);
  else url.searchParams.set(LANG_PARAM, locale);
  window.history.replaceState(null, '', url);
}
