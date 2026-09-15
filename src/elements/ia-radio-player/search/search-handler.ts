import {
  TranscriptConfig,
  TranscriptEntryConfig,
} from '@src/elements/ia-transcript-view/models';

import { TextRange, type SearchResult } from './models';
import { getIntersection } from './search-helper';
import type { TranscriptIndexInterface } from './transcript-index';
import type { SearchBackendInterface } from './backends/search-backend';

/**
 * What the radio player needs from a search implementation.
 *
 * The player takes one of these rather than searching itself, so how the
 * search runs is the consumer's choice.
 */
export interface SearchHandlerInterface {
  search(query: string): Promise<TranscriptConfig>;
}

/**
 * Runs a transcript search and returns the transcript rebuilt around the
 * results.
 *
 * Matching is delegated to a backend, and the character bookkeeping to a
 * transcript index. What this adds is the reassembly: a match may span several
 * transcript entries, and it has to come back as one result carrying the right
 * time codes, with the unmatched text either side split back into its original
 * entries.
 */
export class SearchHandler implements SearchHandlerInterface {
  private searchBackend: SearchBackendInterface;

  private transcriptIndex: TranscriptIndexInterface;

  constructor(
    searchBackend: SearchBackendInterface,
    transcriptIndex: TranscriptIndexInterface,
  ) {
    this.searchBackend = searchBackend;
    this.transcriptIndex = transcriptIndex;
  }

  /** The transcript with the results for `query` woven into it. */
  async search(query: string): Promise<TranscriptConfig> {
    const chunks = await this.getSearchSeparatedTranscript(query);
    const entries: TranscriptEntryConfig[] = [];

    let searchResultIndex = 0;
    let entryIdentifier = 1;

    chunks.forEach((chunk) => {
      if (chunk.isSearchMatch) {
        const matchEntry = this.entryForMatch(chunk, entryIdentifier);
        if (!matchEntry) return;

        matchEntry.searchMatchIndex = searchResultIndex;
        searchResultIndex += 1;
        entryIdentifier += 1;
        entries.push(matchEntry);
        return;
      }

      // Unmatched text goes back to being however many original entries it
      // covered, so the times stay right.
      this.transcriptIndex.transcriptEntryRanges.forEach((indexMap) => {
        const intersection = getIntersection(chunk.range, indexMap.range);
        if (!intersection) return;

        // An entry with no text of its own, a music break, occupies no
        // characters, so it only ever meets a chunk at a single point. It still
        // belongs in the rebuilt transcript, since the view draws a row and a
        // time code for it. For an entry that does have text, meeting at a
        // single point just means the chunk stops where the entry starts, and
        // there is nothing of it in this chunk.
        if (intersection.length === 0 && indexMap.range.length > 0) return;

        const entry = SearchHandler.blankEntryFrom(indexMap.entry);
        entry.rawText = this.transcriptIndex.mergedTranscript
          .substring(intersection.startIndex, intersection.endIndex)
          .trim();
        entry.id = entryIdentifier;
        entryIdentifier += 1;
        entries.push(entry);
      });
    });

    return new TranscriptConfig(entries);
  }

  /**
   * One entry standing for a whole match.
   *
   * A match can run across several transcript entries, and it should stay one
   * result rather than being broken up, so it starts where the first entry it
   * touches starts and ends where the last one ends.
   */
  private entryForMatch(
    chunk: SearchResult,
    entryIdentifier: number,
  ): TranscriptEntryConfig | undefined {
    const startEntry = this.transcriptIndex.getTranscriptEntryAt(
      chunk.range.startIndex,
    );
    if (!startEntry) return undefined;

    // The span's end is exclusive, so the last character of the match is one
    // before it. Looking up the end itself lands on the space between entries
    // whenever a match finishes on an entry's final character, which would
    // leave the result carrying the wrong end time.
    const lastCharIndex = Math.max(
      chunk.range.startIndex,
      chunk.range.endIndex - 1,
    );
    const endEntry =
      this.transcriptIndex.getTranscriptEntryAt(lastCharIndex) ?? startEntry;

    const entry = SearchHandler.blankEntryFrom(startEntry.entry);
    entry.rawText = chunk.text;
    entry.id = entryIdentifier;
    entry.end = endEntry.entry.end;

    return entry;
  }

  /**
   * The merged transcript split into alternating matched and unmatched chunks.
   *
   * Searching `foo bar baz boop` for `baz` gives three chunks: `foo bar `,
   * then `baz` as a match, then ` boop`.
   */
  async getSearchSeparatedTranscript(query: string): Promise<SearchResult[]> {
    const searchRanges = await this.searchBackend.getSearchRanges(query);
    const { mergedTranscript } = this.transcriptIndex;

    if (searchRanges.length === 0) {
      return [this.chunkFor(new TextRange(0, mergedTranscript.length), false)];
    }

    // The backend may return matches in any order, and the walk below runs
    // start to finish, so out-of-order ranges would rebuild the wrong chunks.
    const orderedRanges = [...searchRanges].sort(
      (a, b) => a.startIndex - b.startIndex,
    );

    const chunks: SearchResult[] = [];
    let startIndex = 0;

    orderedRanges.forEach((searchRange) => {
      // A backend may report matches that overlap each other, as a scan
      // stepping one character at a time does for a repeated string. Only the
      // first of an overlapping set can be shown, and taking a later one would
      // build a backwards span, which `substring` quietly reverses into
      // duplicated text.
      if (searchRange.startIndex < startIndex) return;

      chunks.push(
        this.chunkFor(new TextRange(startIndex, searchRange.startIndex), false),
      );
      chunks.push(this.chunkFor(searchRange, true));
      startIndex = searchRange.endIndex;
    });

    chunks.push(
      this.chunkFor(new TextRange(startIndex, mergedTranscript.length), false),
    );

    return chunks;
  }

  private chunkFor(range: TextRange, isSearchMatch: boolean): SearchResult {
    return {
      range,
      text: this.transcriptIndex.mergedTranscript.substring(
        range.startIndex,
        range.endIndex,
      ),
      isSearchMatch,
    };
  }

  /** A copy of an entry with its text and result index cleared. */
  private static blankEntryFrom(
    source: TranscriptEntryConfig,
  ): TranscriptEntryConfig {
    return new TranscriptEntryConfig(
      source.id,
      source.start,
      source.end,
      '',
      source.isMusic,
    );
  }
}
