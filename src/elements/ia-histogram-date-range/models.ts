/**
 * What interval bins should be snapped to for determining their time ranges.
 *  - `none` (default): Bins should each represent an identical duration of time,
 *     without regard for the actual dates represented.
 *  - `month`: Bins should each represent one or more full, non-overlapping months.
 *     The bin ranges will be "snapped" to the nearest month boundaries, which can
 *     result in bins that represent different amounts of time, particularly if the
 *     provided bins do not evenly divide the provided date range, or if the months
 *     represented are of different lengths.
 *  - `year`: Same as `month`, but snapping to year boundaries instead of months.
 */
export type BinSnappingInterval = 'none' | 'month' | 'year';

/** Named bar scaling behaviors the element implements itself. */
export type BarScalingPreset = 'linear' | 'logarithmic';

/** Maps a bin's value to the relative height its bar should be drawn at. */
export type BarScalingFunction = (binValue: number) => number;

/** How bar heights relate to bin values: a preset name, or a function. */
export type BarScalingOption = BarScalingPreset | BarScalingFunction;
