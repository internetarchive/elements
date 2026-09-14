import { msg } from '@lit/localize';

/**
 * One line of a transcript: a stretch of time and the words spoken in it.
 */
export class TranscriptEntryConfig {
  /** Identifies this entry within its transcript. */
  id: number;

  /** When the entry starts, in seconds into the track. */
  start: number;

  /** When the entry ends, in seconds into the track. */
  end: number;

  /** Whether this stretch is music rather than speech. */
  isMusic: boolean;

  /** Where this entry falls in the search results, if it is one. */
  searchMatchIndex?: number;

  /** The transcribed words. */
  rawText: string;

  constructor(
    id: number,
    start: number,
    end: number,
    rawText: string,
    isMusic: boolean,
    searchMatchIndex?: number,
  ) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.rawText = rawText;
    this.isMusic = isMusic;
    this.searchMatchIndex = searchMatchIndex;
  }

  /**
   * What to show for this entry.
   *
   * Music stretches carry no words worth reading, so they say so instead.
   */
  get displayText(): string {
    if (this.isMusic) return msg('[Transcript unavailable]');

    return this.rawText;
  }
}

/**
 * A whole transcript, as an ordered list of entries.
 */
export class TranscriptConfig {
  entries: TranscriptEntryConfig[] = [];

  constructor(entries: TranscriptEntryConfig[]) {
    this.entries = entries;
  }

  /** Just the entries that matched the current search. */
  get searchResults(): TranscriptEntryConfig[] {
    return this.entries.filter((entry) => entry.searchMatchIndex !== undefined);
  }
}
