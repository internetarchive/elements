/**
 * Trims the string, collapses runs of spaces and tabs down to one space, and
 * turns runs of newlines and existing `<br>` tags into a single `<br />`.
 *
 * The whitespace patterns list only real whitespace. A pipe written into a
 * character class here would be treated as whitespace too, and quietly
 * disappear from any review body containing one.
 *
 * @param {string} str The string to transform
 * @returns {string} The string with space collapsed
 */
export default function collapseSpace(str: string): string {
  return str
    .trim()
    .replace(/[ \t]+/g, ' ')
    .replace(/(?:\r?\n)+/g, '<br />')
    .replace(/(<br[^>]*>(<\/br>)?)+/g, '<br />');
}
