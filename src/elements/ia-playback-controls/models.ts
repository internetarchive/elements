/**
 * Whether the track is currently playing or paused.
 *
 * A const object rather than a TypeScript `enum`, because `erasableSyntaxOnly`
 * rules enums out. The values are strings so the matching attribute works,
 * which a numeric enum never allowed.
 */
export const PlaybackMode = {
  playing: 'playing',
  paused: 'paused',
} as const;

export type PlaybackMode = (typeof PlaybackMode)[keyof typeof PlaybackMode];
