/**
 * Resolves a menu link against the topnav's base host. Absolute `http(s)`
 * URLs pass through untouched, anything else is prefixed with `baseHost`.
 */
export function formatUrl(url: string = '', baseHost: string): string {
  return /^https?:/.test(url) ? url : `${baseHost}${url}`;
}

/** The string form an `aria-*` boolean attribute expects. */
export function makeBooleanString(value: boolean): 'true' | 'false' {
  return value ? 'true' : 'false';
}

/**
 * Joins a space-separated phrase into one capitalized word, e.g.
 * `'mobile apps'` becomes `'MobileApps'`. Used to build analytics event names.
 */
export function toSentenceCase(phrase: string): string {
  const words = phrase.split(' ');
  const lastWord = words.pop() ?? '';
  const capitalizedWord = `${lastWord.slice(0, 1).toUpperCase()}${lastWord.slice(1)}`;
  return words.length
    ? toSentenceCase(`${words.join(' ')}${capitalizedWord}`)
    : capitalizedWord;
}
