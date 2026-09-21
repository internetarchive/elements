/**
 * Removes leading and trailing whitespace and <br> tags and replaces internal spaces
   with a single space char and internal newlines with a single newline char
 * 
 * @param {string} str The string to transform
 * @returns {string} The string with space collapsed
 */
export default function collapseSpace(str: string): string {
  return str
    .trim()
    .replace(/[ |\t]+/g, ' ')
    .replace(/[\n|\r\n]+/g, '<br />')
    .replace(/(<br[^>]*>(<\/br>)?)+/g, '<br />');
}
