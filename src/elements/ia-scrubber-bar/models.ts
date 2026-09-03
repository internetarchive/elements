/**
 * Which way a section marker points.
 *
 * The scrubber sets this on the two markers either side of the playhead, so
 * they can hint at the section boundary the listener would jump to.
 *
 * A const object rather than a TypeScript `enum`, because `erasableSyntaxOnly`
 * rules enums out.
 */
export const SectionMarkerMode = {
  /** Points back towards the start of the track. */
  left: 'left',
  /** Points on towards the end of the track. */
  right: 'right',
  /** Points both ways. */
  both: 'both',
  /** Points neither way, the resting state. */
  neither: 'neither',
} as const;

export type SectionMarkerMode =
  (typeof SectionMarkerMode)[keyof typeof SectionMarkerMode];
