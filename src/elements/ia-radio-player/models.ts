import type { AudioSource } from '@src/elements/ia-audio-element/models';

/**
 * A stretch of the broadcast that is music rather than speech.
 *
 * Both bounds are seconds into the track. Used to mark the waveform and,
 * optionally, to skip past them.
 */
export interface MusicZone {
  start: number;
  end: number;
}

/**
 * Everything the player needs to know about the broadcast it is playing.
 */
export interface RadioPlayerConfig {
  /** The title shown above the player. */
  title: string;

  /** The broadcast date, shown beside the title. */
  date: string;

  /** The collection logo shown alongside the player. */
  logoUrl: string;

  /** The waveform image drawn behind the progress bar, if there is one. */
  waveformUrl?: string;

  /** The audio to play, in order of preference. */
  audioSources: AudioSource[];

  /** Suggested searches offered under the search bar. */
  quickSearches?: string[];
}
