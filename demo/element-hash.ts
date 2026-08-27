/**
 * How the demo addresses a single element through the URL hash. Both the
 * router and the story template need to agree on the spelling, and this
 * module imports nothing so either can pull it in without a cycle.
 */

/** Prefix for both the anchor ids and the URL hash, e.g. `#elem-ia-button`. */
export const HASH_PREFIX = 'elem-';

/**
 * The element tag a hash addresses, or undefined when it addresses none. The
 * tag isn't checked against the elements that exist, so a hash naming a
 * removed element yields a tag that nothing matches.
 */
export function tagFromHash(hash: string): string | undefined {
  if (!hash.startsWith(`#${HASH_PREFIX}`)) return undefined;
  return hash.slice(HASH_PREFIX.length + 1) || undefined;
}
