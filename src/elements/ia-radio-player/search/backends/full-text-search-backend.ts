import { TextRange } from '../models';
import type { SearchBackendInterface } from './search-backend';
import type {
  FullTextSearchResponseDoc,
  FullTextSearchServiceInterface,
} from './full-text-search-response';

/** Makes a string safe to drop into a regular expression as a literal. */
function escapeForRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Turns archive.org full text search hits into spans of the transcript.
 *
 * The search service returns matched snippets with the matches wrapped in
 * tags. This finds where each snippet sits in the full transcript, then works
 * out the span of each match inside it, so the handler can rebuild the
 * transcript with its results in the right places.
 */
export class FullTextSearchBackend implements SearchBackendInterface {
  private service: FullTextSearchServiceInterface;

  /** The tag opening a match, e.g. `{{{` or `<em>` */
  private startTag: string;

  /** The tag closing a match, e.g. `}}}` or `</em>` */
  private endTag: string;

  constructor(
    service: FullTextSearchServiceInterface,
    startTag = '{{{',
    endTag = '}}}',
  ) {
    this.service = service;
    this.startTag = startTag;
    this.endTag = endTag;
  }

  async getSearchRanges(query: string): Promise<TextRange[]> {
    const results = await this.service.searchRequested(query);

    return results.value.docs.flatMap((doc: FullTextSearchResponseDoc) =>
      doc.highlight.cc.flatMap((highlight) =>
        this.rangesOfResultInTranscript(highlight, doc.text),
      ),
    );
  }

  /**
   * The spans of each tagged match within the full transcript.
   *
   * With `highlight` of `bar {{{baz}}} snip` and a transcript of
   * `beep boop foo bar baz snip`, the match sits at 18 to 21, so that is the
   * span returned. Each match found shifts the ones after it back by the
   * length of the tags already stepped over, since those tags are not in the
   * transcript itself.
   */
  private rangesOfResultInTranscript(
    highlight: string,
    transcript: string,
  ): TextRange[] {
    const regex = new RegExp(
      `${escapeForRegExp(this.startTag)}(.*?)${escapeForRegExp(this.endTag)}`,
      'gm',
    );

    const highlightStart = this.startIndexOfHighlight(highlight, transcript);
    if (highlightStart === -1) return [];

    const totalTagLength = this.startTag.length + this.endTag.length;
    const ranges: TextRange[] = [];

    let matchIndex = 0;
    let match = regex.exec(highlight);
    while (match !== null) {
      const adjustedStart = match.index - matchIndex * totalTagLength;
      const start = highlightStart + adjustedStart;

      ranges.push(new TextRange(start, start + match[1].length));

      matchIndex += 1;
      match = regex.exec(highlight);
    }

    return ranges;
  }

  /**
   * Where a highlighted snippet begins in the full transcript.
   *
   * The tags are stripped first, since the transcript has none in it. Returns
   * -1 when the snippet isn't found.
   */
  private startIndexOfHighlight(highlight: string, transcript: string): number {
    const untagged = highlight
      .replaceAll(this.startTag, '')
      .replaceAll(this.endTag, '');

    return transcript.indexOf(untagged);
  }
}
