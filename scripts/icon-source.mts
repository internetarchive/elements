/**
 * Parsing helpers shared by `build-icons.mts` and `lint-icons.mts`. Plain
 * string handling only, so importing this pulls in no dependencies.
 */

/** Strips the XML prolog, doctype and comments that precede the root. */
export function stripPrologue(source: string): string {
  return source
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!DOCTYPE[\s\S]*?>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();
}

export function parseAttributes(source: string): [string, string][] {
  const attributes: [string, string][] = [];
  for (const match of source.matchAll(
    /([^\s=/]+)\s*=\s*("([^"]*)"|'([^']*)')/g,
  )) {
    attributes.push([match[1], match[3] ?? match[4]]);
  }
  return attributes;
}
