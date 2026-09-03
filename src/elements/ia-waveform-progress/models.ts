/**
 * A stretch of the waveform with no audio in it, marked out so listeners can
 * see where the quiet parts are before they get there.
 *
 * Both bounds are percentages of the whole track, not seconds.
 */
export interface ZoneOfSilence {
  /** Where the zone begins, as a percentage of the track (0 to 100). */
  startPercent: number;

  /** Where the zone ends, as a percentage of the track (0 to 100). */
  endPercent: number;
}
