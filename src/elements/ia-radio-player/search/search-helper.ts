import { TextRange } from './models';

/**
 * Where two spans overlap, or nothing if they don't.
 *
 * Used to work out which transcript entries a stretch of the merged transcript
 * belongs to.
 */
export function getIntersection(
  a: TextRange,
  b: TextRange,
): TextRange | undefined {
  const earlier = a.startIndex < b.startIndex ? a : b;
  const later = earlier === a ? b : a;

  if (earlier.endIndex < later.startIndex) return undefined;

  return new TextRange(
    later.startIndex,
    Math.min(earlier.endIndex, later.endIndex),
  );
}
