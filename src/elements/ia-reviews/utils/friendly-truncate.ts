/**
 * Truncates a string, given the original string and a max length.
 * Continues up to 20 chars after the limit to find the last space,
 * if possible.
 *
 * Avoids breaking up anchor tags.
 *
 * @param {string} str The original string
 * @param {number} maxLength The max length to truncate to
 * @param {boolean} useSpaceTruncation Whether to truncate at the last space
 * @returns {string} The truncated field
 */
export default function friendlyTruncate(
  str: string,
  maxLength: number = 100,
  useSpaceTruncation: boolean = true,
): string {
  if (str.length < maxLength) return str;

  let cutoffPoint = maxLength;

  if (useSpaceTruncation) {
    const lastSpace = str.indexOf(' ', maxLength);
    const safeDistanceFromMax = lastSpace - maxLength <= 20;

    // No need to truncate if the safe last space is at the end of the string
    if (safeDistanceFromMax && lastSpace === str.length - 1) {
      return str;
    }

    if (lastSpace !== -1 && safeDistanceFromMax) {
      cutoffPoint = lastSpace;
    }
  }

  return truncateTagSafe(str, cutoffPoint, maxLength);
}

/**
 * Utility function to prevent truncation in the middle of
 * an anchor tag.
 *
 * @param {string} str The string to truncate
 * @param {number} cutoffPoint The index currently selsected for truncation
 * @param {number} maxLength The max length for the string
 * @returns {string} The string, truncated either earlier or later to preserve anchor tags
 */
function truncateTagSafe(
  str: string,
  cutoffPoint: number,
  maxLength: number,
): string {
  let truncatedString = str.slice(0, cutoffPoint);

  const openingAnchorTags = truncatedString.match(/<a/gi);
  if (openingAnchorTags) {
    const closingAnchorTags = truncatedString.match(/<\/a/gi);

    if (
      !closingAnchorTags ||
      closingAnchorTags.length < openingAnchorTags.length
    ) {
      const firstClosingTag = str.indexOf('</a>', cutoffPoint);
      const safeDistanceFromMax = firstClosingTag - maxLength <= 20;

      // No need to truncate if closing tag is at the end of the string
      if (safeDistanceFromMax && str.length === firstClosingTag + 4) {
        return str;
      }

      // Truncate at end of first closing tag if possible
      if (firstClosingTag !== -1 && safeDistanceFromMax) {
        truncatedString = str.slice(0, firstClosingTag + 4);
      } else {
        // Otherwise, truncate before last opening tag
        const lastOpeningTag = truncatedString.lastIndexOf('<a');
        truncatedString = str.slice(0, lastOpeningTag);
      }
    }
  }

  return truncatedString.concat('...');
}
