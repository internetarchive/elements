import { describe, expect, test } from 'vitest';

import {
  TranscriptConfig,
  TranscriptEntryConfig,
} from '@src/elements/ia-transcript-view/models';

import { TextRange } from './models';
import { getIntersection } from './search-helper';
import { TranscriptIndex } from './transcript-index';
import { SearchHandler } from './search-handler';
import { LocalSearchBackend } from './backends/local-search-backend';
import { FullTextSearchBackend } from './backends/full-text-search-backend';
import {
  FullTextSearchResponse,
  type FullTextSearchServiceInterface,
} from './backends/full-text-search-response';

/** Three speech entries: 'foo bar baz', 'boop blop', 'bang boing'. */
function sampleTranscript(): TranscriptConfig {
  return new TranscriptConfig([
    new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false),
    new TranscriptEntryConfig(2, 5, 9, 'boop blop', false),
    new TranscriptEntryConfig(3, 10, 13, 'bang boing', false),
  ]);
}

describe('TextRange', () => {
  test('keeps the indices it was given, in the order given', () => {
    const range = new TextRange(9, 13);
    expect(range.startIndex).to.equal(9);
    expect(range.endIndex).to.equal(13);

    const backwards = new TextRange(14, 7);
    expect(backwards.startIndex).to.equal(14);
    expect(backwards.endIndex).to.equal(7);
  });

  test.each([
    [9, 13, 4],
    [7, 2, 5],
    [7, 7, 0],
  ])('the length from %i to %i is %i', (start, end, length) => {
    expect(new TextRange(start, end).length).to.equal(length);
  });
});

describe('getIntersection', () => {
  test('finds the overlap of two spans', () => {
    const intersection = getIntersection(
      new TextRange(0, 10),
      new TextRange(7, 15),
    );

    expect(intersection?.startIndex).to.equal(7);
    expect(intersection?.endIndex).to.equal(10);
  });

  test('does not care which order the spans come in', () => {
    const intersection = getIntersection(
      new TextRange(7, 15),
      new TextRange(0, 10),
    );

    expect(intersection?.startIndex).to.equal(7);
    expect(intersection?.endIndex).to.equal(10);
  });

  test.each([
    ['contained span first', new TextRange(3, 17), new TextRange(7, 15)],
    ['containing span first', new TextRange(7, 15), new TextRange(3, 17)],
  ])('handles one span sitting inside the other, %s', (_label, a, b) => {
    const intersection = getIntersection(a, b);

    expect(intersection?.startIndex).to.equal(7);
    expect(intersection?.endIndex).to.equal(15);
  });

  test('returns nothing when the spans do not overlap', () => {
    expect(getIntersection(new TextRange(0, 10), new TextRange(11, 15))).to.be
      .undefined;
  });

  test('picks out the expected text from a block', () => {
    const intersection = getIntersection(
      new TextRange(0, 11),
      new TextRange(8, 15),
    );
    const text = 'foo bar baz boop blop bump snip snap';

    expect(
      text.substring(intersection!.startIndex, intersection!.endIndex),
    ).to.equal('baz');
  });
});

describe('TranscriptIndex', () => {
  test('joins the entries into one string, a space between each', () => {
    const index = new TranscriptIndex(sampleTranscript());

    expect(index.mergedTranscript).to.equal('foo bar baz boop blop bang boing');
  });

  test('offers the merged transcript lowercased too', () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 0, 4, 'Foo BAR', false),
    ]);

    expect(new TranscriptIndex(config).mergedTranscriptLowercased).to.equal(
      'foo bar',
    );
  });

  test('records where each entry sits in the merged transcript', () => {
    const config = sampleTranscript();
    const index = new TranscriptIndex(config);
    const ranges = index.transcriptEntryRanges;

    // The space between entries pushes each subsequent span along by one.
    expect(ranges[0].entry).to.equal(config.entries[0]);
    expect(ranges[0].range.startIndex).to.equal(0);
    expect(ranges[0].range.endIndex).to.equal(11);

    expect(ranges[1].range.startIndex).to.equal(12);
    expect(ranges[1].range.endIndex).to.equal(21);

    expect(ranges[2].range.startIndex).to.equal(22);
    expect(ranges[2].range.endIndex).to.equal(32);
  });

  test('measures a music entry by the text actually in the transcript', () => {
    // A music entry's displayText is a placeholder that never reaches the
    // merged transcript. Measuring that instead would give it a span far
    // longer than its text and overlap the entries after it.
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 0, 4, 'intro', false),
      new TranscriptEntryConfig(2, 5, 9, '', true),
      new TranscriptEntryConfig(3, 10, 13, 'outro', false),
    ]);
    const index = new TranscriptIndex(config);
    const ranges = index.transcriptEntryRanges;

    // No text, so it occupies no characters and needs no separator either way.
    expect(index.mergedTranscript).to.equal('intro outro');
    expect(ranges[1].range.startIndex).to.equal(5);
    expect(ranges[1].range.endIndex).to.equal(5);
    // The entry after it must not be swallowed by the music entry's span.
    expect(
      index.getTranscriptEntryAt(ranges[2].range.startIndex)?.entry,
    ).to.equal(config.entries[2]);
  });

  test('keeps the spans right when the transcript opens with no text', () => {
    // A broadcast that opens on music has an empty first entry. Trimming the
    // joined string after measuring would slide every later entry one
    // character left of where it was recorded.
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 0, 4, '', true),
      new TranscriptEntryConfig(2, 5, 9, 'hello world', false),
      new TranscriptEntryConfig(3, 10, 13, 'goodbye', false),
    ]);
    const index = new TranscriptIndex(config);

    expect(index.mergedTranscript).to.equal('hello world goodbye');
    expect(index.getTranscriptEntryAt(0)?.entry).to.equal(config.entries[1]);
    expect(
      index.mergedTranscript.substring(
        index.transcriptEntryRanges[1].range.startIndex,
        index.transcriptEntryRanges[1].range.endIndex,
      ),
    ).to.equal('hello world');
  });

  test('finds the entry covering a character position', () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false),
      new TranscriptEntryConfig(2, 5, 9, 'boop blop', false),
      new TranscriptEntryConfig(3, 10, 13, 'bump baz boing', false),
    ]);
    const index = new TranscriptIndex(config);

    expect(index.getTranscriptEntryAt(14)?.entry).to.equal(config.entries[1]);
    expect(index.getTranscriptEntryAt(23)?.entry).to.equal(config.entries[2]);
    // The joining space belongs to no entry.
    expect(index.getTranscriptEntryAt(11)).to.be.undefined;
    // Past the end of the transcript.
    expect(index.getTranscriptEntryAt(45)).to.be.undefined;
  });
});

describe('LocalSearchBackend', () => {
  test('finds every occurrence, regardless of case', async () => {
    const index = new TranscriptIndex(sampleTranscript());
    const ranges = await new LocalSearchBackend(index).getSearchRanges('BA');

    // 'bar' at 4, 'baz' at 8, 'bang' at 22.
    expect(ranges.map((r) => r.startIndex)).to.deep.equal([4, 8, 22]);
    expect(ranges.every((r) => r.length === 2)).to.be.true;
  });

  test('reports every occurrence, including overlapping ones', async () => {
    // The backend reports what it finds; resolving overlaps is the search
    // handler's job, since only it knows what it has already used.
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 0, 4, 'aaaa', false),
    ]);
    const backend = new LocalSearchBackend(new TranscriptIndex(config));

    expect(
      (await backend.getSearchRanges('aa')).map((r) => r.startIndex),
    ).to.deep.equal([0, 1, 2]);
  });

  test('returns nothing for a term that is not there', async () => {
    const index = new TranscriptIndex(sampleTranscript());

    expect(
      await new LocalSearchBackend(index).getSearchRanges('zzz'),
    ).to.deep.equal([]);
  });

  test('returns nothing for an empty query rather than hanging', async () => {
    const index = new TranscriptIndex(sampleTranscript());

    // Scanning for an empty string never advances past the end of the
    // haystack, so a loop searching for one has no way to terminate.
    expect(
      await new LocalSearchBackend(index).getSearchRanges(''),
    ).to.deep.equal([]);
  });
});

describe('FullTextSearchBackend', () => {
  /** A stub search service returning one document with the given highlights. */
  function serviceReturning(
    text: string,
    highlights: string[],
  ): FullTextSearchServiceInterface {
    return {
      async searchRequested() {
        return new FullTextSearchResponse({
          success: true,
          value: {
            numFound: 1,
            start: 0,
            docs: [
              {
                identifier: 'test-item',
                title: 'Test Item',
                text,
                times: '',
                downloads: 0,
                collection: 'test',
                highlight: { cc: highlights },
                description: '',
                mediatype: 'audio',
                __href__: '/details/test-item',
                'SE-BYPASS': 0,
              },
            ],
            highlighting: {},
            facet_counts: { facet_dates: {}, facet_fields: {} },
          },
        });
      },
    };
  }

  test('locates a tagged match within the transcript', async () => {
    const transcript = 'beep boop foo bar baz snip snap';
    const backend = new FullTextSearchBackend(
      serviceReturning(transcript, ['bar {{{baz}}} snip']),
    );

    const ranges = await backend.getSearchRanges('baz');

    expect(ranges.length).to.equal(1);
    expect(
      transcript.substring(ranges[0].startIndex, ranges[0].endIndex),
    ).to.equal('baz');
  });

  test('locates several matches in one highlight', async () => {
    const transcript = 'one two three two one';
    const backend = new FullTextSearchBackend(
      serviceReturning(transcript, ['one {{{two}}} three {{{two}}} one']),
    );

    const ranges = await backend.getSearchRanges('two');

    expect(
      ranges.map((r) => transcript.substring(r.startIndex, r.endIndex)),
    ).to.deep.equal(['two', 'two']);
  });

  test('accepts other tag pairs', async () => {
    const transcript = 'alpha beta gamma';
    const backend = new FullTextSearchBackend(
      serviceReturning(transcript, ['alpha <em>beta</em> gamma']),
      '<em>',
      '</em>',
    );

    const ranges = await backend.getSearchRanges('beta');

    expect(
      transcript.substring(ranges[0].startIndex, ranges[0].endIndex),
    ).to.equal('beta');
  });

  test('treats regex characters in the tags literally', async () => {
    const transcript = 'alpha beta gamma';
    // Tags built into a pattern unescaped would either throw or match the
    // wrong thing.
    const backend = new FullTextSearchBackend(
      serviceReturning(transcript, ['alpha (((beta))) gamma']),
      '(((',
      ')))',
    );

    const ranges = await backend.getSearchRanges('beta');

    expect(
      transcript.substring(ranges[0].startIndex, ranges[0].endIndex),
    ).to.equal('beta');
  });

  test('returns nothing when the highlight is not in the transcript', async () => {
    const backend = new FullTextSearchBackend(
      serviceReturning('completely different text', ['no {{{match}}} here']),
    );

    expect(await backend.getSearchRanges('match')).to.deep.equal([]);
  });

  test('returns nothing when the service finds no documents', async () => {
    const service: FullTextSearchServiceInterface = {
      async searchRequested() {
        return new FullTextSearchResponse({
          success: true,
          value: {
            numFound: 0,
            start: 0,
            docs: [],
            highlighting: {},
            facet_counts: { facet_dates: {}, facet_fields: {} },
          },
        });
      },
    };

    expect(
      await new FullTextSearchBackend(service).getSearchRanges('anything'),
    ).to.deep.equal([]);
  });
});

describe('SearchHandler', () => {
  /** A handler searching the sample transcript locally. */
  function localHandler(config = sampleTranscript()): SearchHandler {
    const index = new TranscriptIndex(config);
    return new SearchHandler(new LocalSearchBackend(index), index);
  }

  test('splits the transcript into matched and unmatched chunks', async () => {
    const chunks = await localHandler().getSearchSeparatedTranscript('baz');

    expect(chunks.map((chunk) => chunk.text)).to.deep.equal([
      'foo bar ',
      'baz',
      ' boop blop bang boing',
    ]);
    expect(chunks.map((chunk) => chunk.isSearchMatch)).to.deep.equal([
      false,
      true,
      false,
    ]);
  });

  test('returns the whole transcript as one unmatched chunk when nothing matches', async () => {
    const chunks = await localHandler().getSearchSeparatedTranscript('zzz');

    expect(chunks.length).to.equal(1);
    expect(chunks[0].isSearchMatch).to.be.false;
    expect(chunks[0].text).to.equal('foo bar baz boop blop bang boing');
  });

  test('marks up the transcript with the results', async () => {
    const transcript = await localHandler().search('baz');
    const results = transcript.searchResults;

    expect(results.length).to.equal(1);
    expect(results[0].rawText).to.equal('baz');
    expect(results[0].searchMatchIndex).to.equal(0);
  });

  test('numbers the results in order', async () => {
    // bar, baz, boop, blop, bang, boing.
    const transcript = await localHandler().search('b');

    expect(
      transcript.searchResults.map((entry) => entry.searchMatchIndex),
    ).to.deep.equal([0, 1, 2, 3, 4, 5]);
  });

  test('gives every entry a unique id', async () => {
    const transcript = await localHandler().search('baz');
    const ids = transcript.entries.map((entry) => entry.id);

    expect(new Set(ids).size).to.equal(ids.length);
  });

  test('keeps a match that spans two entries as a single result', async () => {
    // 'baz boop' runs across the boundary between entry 1 and entry 2.
    const transcript = await localHandler().search('baz boop');
    const results = transcript.searchResults;

    expect(results.length).to.equal(1);
    expect(results[0].rawText).to.equal('baz boop');
    // It starts where the first entry it touches starts, and ends where the
    // last one ends, so the time codes cover the whole match.
    expect(results[0].start).to.equal(0);
    expect(results[0].end).to.equal(9);
  });

  test('rebuilds the unmatched text into its original entries', async () => {
    const transcript = await localHandler().search('blop');
    const texts = transcript.entries.map((entry) => entry.rawText);

    expect(texts).to.deep.equal(['foo bar baz', 'boop', 'blop', 'bang boing']);
  });

  test('handles out-of-order ranges from a backend', async () => {
    const config = sampleTranscript();
    const index = new TranscriptIndex(config);
    const shuffledBackend = {
      async getSearchRanges() {
        // 'bang' at 22 deliberately before 'baz' at 8.
        return [new TextRange(22, 26), new TextRange(8, 11)];
      },
    };

    const transcript = await new SearchHandler(shuffledBackend, index).search(
      'irrelevant',
    );

    expect(
      transcript.searchResults.map((entry) => entry.rawText),
    ).to.deep.equal(['baz', 'bang']);
  });

  test('finds a match in a transcript that opens with no text', async () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 0, 4, '', true),
      new TranscriptEntryConfig(2, 5, 9, 'hello world', false),
      new TranscriptEntryConfig(3, 10, 13, 'goodbye', false),
    ]);

    const transcript = await localHandler(config).search('hello');

    expect(
      transcript.searchResults.map((entry) => entry.rawText),
    ).to.deep.equal(['hello']);
  });

  test('gives a match ending on an entry boundary that entry end time', async () => {
    // 'baz boop blop' runs from inside entry 1 to the last character of
    // entry 2, whose end time is 9.
    const transcript = await localHandler().search('baz boop blop');
    const [result] = transcript.searchResults;

    expect(result.rawText).to.equal('baz boop blop');
    expect(result.start).to.equal(0);
    expect(result.end).to.equal(9);
  });

  test('gives a match running to the end of the transcript the final end time', async () => {
    const transcript = await localHandler().search('blop bang boing');
    const [result] = transcript.searchResults;

    expect(result.end).to.equal(13);
  });

  test('takes only the first of a set of overlapping matches', async () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 0, 4, 'aaaa', false),
    ]);

    // The backend reports 'aa' at 0, 1 and 2. Only 0 and 2 can both be shown.
    const transcript = await localHandler(config).search('aa');

    expect(transcript.entries.map((entry) => entry.rawText)).to.deep.equal([
      'aa',
      'aa',
    ]);
    expect(
      transcript.searchResults.map((entry) => entry.searchMatchIndex),
    ).to.deep.equal([0, 1]);
  });

  test('keeps entries that have no text of their own', async () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 0, 4, 'intro words', false),
      new TranscriptEntryConfig(2, 5, 9, '', true),
      new TranscriptEntryConfig(3, 10, 13, 'outro words', false),
    ]);

    // The music row still has to be drawn while a search is running, with its
    // own time codes.
    const transcript = await localHandler(config).search('zzz');

    expect(transcript.entries.length).to.equal(3);
    expect(transcript.entries[1].isMusic).to.be.true;
    expect(transcript.entries[1].start).to.equal(5);
    expect(transcript.entries[1].end).to.equal(9);
  });

  test('returns an empty transcript for an empty transcript', async () => {
    const handler = localHandler(new TranscriptConfig([]));

    expect((await handler.search('anything')).entries).to.deep.equal([]);
  });
});
