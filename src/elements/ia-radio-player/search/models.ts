import type { TranscriptEntryConfig } from '@src/elements/ia-transcript-view/models';

/**
 * A span of characters within the merged transcript.
 *
 * Named `TextRange` rather than `Range` so it doesn't shadow the DOM's own
 * `Range` for anyone importing it.
 */
export class TextRange {
  startIndex: number;

  endIndex: number;

  constructor(startIndex: number, endIndex: number) {
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }

  /** How many characters the span covers. */
  get length(): number {
    return Math.abs(this.endIndex - this.startIndex);
  }
}

/**
 * A transcript entry paired with the span it occupies in the merged transcript.
 *
 * Search runs against one long string rather than entry by entry, so a match
 * can cross entry boundaries. This is what lets the results be split back into
 * entries afterwards.
 */
export interface TranscriptEntryRange {
  entry: TranscriptEntryConfig;
  range: TextRange;
}

/**
 * One chunk of the merged transcript, either a search match or the text
 * between matches.
 *
 * Searching produces an alternating run of these, which is the first step in
 * rebuilding a transcript that knows where its results are.
 */
export interface SearchResult {
  range: TextRange;
  text: string;
  isSearchMatch: boolean;
}
