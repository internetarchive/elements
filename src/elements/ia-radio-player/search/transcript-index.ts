import type {
  TranscriptConfig,
  TranscriptEntryConfig,
} from '@src/elements/ia-transcript-view/models';

import { TextRange, type TranscriptEntryRange } from './models';

/**
 * What the search needs to know about a transcript in order to run against it
 * and put the results back together.
 */
export interface TranscriptIndexInterface {
  /** Every entry's text joined into one string, separated by single spaces. */
  mergedTranscript: string;

  /** The same string lowercased, for case-insensitive matching. */
  mergedTranscriptLowercased: string;

  /** Each entry paired with the span it occupies in the merged transcript. */
  transcriptEntryRanges: TranscriptEntryRange[];

  /** The entry covering a given character position, if any. */
  getTranscriptEntryAt(
    overallCharIndex: number,
  ): TranscriptEntryRange | undefined;
}

/**
 * Indexes a transcript so searches can run against the whole thing at once.
 *
 * Entries are joined into a single string, and each one's span within it is
 * recorded. That lets a match cross entry boundaries and still be split back
 * into entries afterwards.
 */
export class TranscriptIndex implements TranscriptIndexInterface {
  readonly mergedTranscript: string;

  readonly mergedTranscriptLowercased: string;

  readonly transcriptEntryRanges: TranscriptEntryRange[];

  constructor(transcriptConfig: TranscriptConfig) {
    const { merged, ranges } = TranscriptIndex.buildIndex(transcriptConfig);

    this.mergedTranscript = merged;
    this.mergedTranscriptLowercased = merged.toLowerCase();
    this.transcriptEntryRanges = ranges;
  }

  getTranscriptEntryAt(
    overallCharIndex: number,
  ): TranscriptEntryRange | undefined {
    return this.transcriptEntryRanges.find(
      ({ range }) =>
        range.startIndex <= overallCharIndex &&
        range.endIndex > overallCharIndex,
    );
  }

  /**
   * Joins the entries and records where each one landed.
   *
   * Spans are measured against `rawText`, which is what actually goes into the
   * merged string. A music entry's `displayText` is a placeholder that is not
   * in there, so measuring that instead would give it a span far longer than
   * the text it stands for, overlapping the entries after it.
   *
   * Each span is taken from the string as it is being built, and the string is
   * never adjusted afterwards. Trimming it at the end would shift every
   * character left of the trim out from under the spans already recorded, which
   * an entry with no text at the front of a transcript is enough to trigger.
   */
  private static buildIndex(transcriptConfig: TranscriptConfig): {
    merged: string;
    ranges: TranscriptEntryRange[];
  } {
    const ranges: TranscriptEntryRange[] = [];
    let merged = '';

    transcriptConfig.entries.forEach((entry: TranscriptEntryConfig) => {
      // A space between entries, or the words either side would run together.
      // Skipped around entries with no text, which need no separating.
      if (merged !== '' && entry.rawText !== '') merged += ' ';

      const startIndex = merged.length;
      merged += entry.rawText;

      ranges.push({ entry, range: new TextRange(startIndex, merged.length) });
    });

    return { merged, ranges };
  }
}
