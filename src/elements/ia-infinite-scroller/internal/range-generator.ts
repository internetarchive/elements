/**
 * Generate an array of numbers from a start, stop, and step
 *
 * eg. getRange(5, 15, 1) will produce [5,6,7,8,9,10,11,12,13,14,15]
 *
 * @private
 * @param {number} start
 * @param {number} stop
 * @param {number} step
 * @returns {number[]}
 */
export function generateRange(
  start: number,
  stop: number,
  step: number,
): number[] {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step,
  );
}
