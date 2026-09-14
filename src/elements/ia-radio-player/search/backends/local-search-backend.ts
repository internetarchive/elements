import { TextRange } from '../models';
import type { TranscriptIndexInterface } from '../transcript-index';
import type { SearchBackendInterface } from './search-backend';

/**
 * Searches the transcript in the browser, with no network involved.
 *
 * A plain case-insensitive substring scan, which is enough for a transcript
 * already loaded on the page.
 */
export class LocalSearchBackend implements SearchBackendInterface {
  private transcriptIndex: TranscriptIndexInterface;

  constructor(transcriptIndex: TranscriptIndexInterface) {
    this.transcriptIndex = transcriptIndex;
  }

  async getSearchRanges(query: string): Promise<TextRange[]> {
    if (query === '') return [];

    const haystack = this.transcriptIndex.mergedTranscriptLowercased;
    const needle = query.toLowerCase();
    const ranges: TextRange[] = [];

    let index = haystack.indexOf(needle);
    while (index !== -1) {
      ranges.push(new TextRange(index, index + needle.length));
      index = haystack.indexOf(needle, index + 1);
    }

    return ranges;
  }
}
