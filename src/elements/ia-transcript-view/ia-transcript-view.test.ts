import { fixture, oneEvent, elementUpdated } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { formatDuration } from './duration-formatter';
import { TranscriptConfig, TranscriptEntryConfig } from './models';
import type { IATranscriptEntry } from './ia-transcript-entry';
import type { IATranscriptView } from './ia-transcript-view';
import './ia-transcript-view';

/** Three consecutive speech entries, ids 1 to 3. */
function sampleConfig(): TranscriptConfig {
  return new TranscriptConfig([
    new TranscriptEntryConfig(1, 64, 67, 'foo', false),
    new TranscriptEntryConfig(2, 68, 73, 'bar', false),
    new TranscriptEntryConfig(3, 74, 78, 'baz', false),
  ]);
}

/** Waits out the scroll animation, which runs for a second. */
function settleScroll(ms = 1200): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * A transcript far taller than its viewport, so scrolling has somewhere to go.
 */
async function scrollableFixture(): Promise<IATranscriptView> {
  const config = new TranscriptConfig(
    Array.from(
      { length: 60 },
      (_, i) =>
        new TranscriptEntryConfig(
          i,
          i * 5,
          i * 5 + 4,
          `Entry number ${i}, long enough that the column has to wrap it several times over`,
          false,
        ),
    ),
  );

  return fixture<IATranscriptView>(
    html`<ia-transcript-view
      style="display: block; width: 300px; --ia-theme-transcript-height: 80px"
      .config=${config}
    ></ia-transcript-view>`,
  );
}

function entriesIn(el: IATranscriptView): IATranscriptEntry[] {
  return [
    ...(el.shadowRoot?.querySelectorAll<IATranscriptEntry>(
      'ia-transcript-entry',
    ) ?? []),
  ];
}

describe('IA Transcript View', () => {
  test('has no entries by default', async () => {
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view></ia-transcript-view>`,
    );

    expect(el.config).to.be.undefined;
    expect(entriesIn(el).length).to.equal(0);
  });

  test('renders an entry for each transcript entry', async () => {
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${sampleConfig()}></ia-transcript-view>`,
    );

    expect(entriesIn(el).length).to.equal(3);
  });

  test('displays context zones if enabled', async () => {
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view showContextZones></ia-transcript-view>`,
    );

    expect(el.shadowRoot?.querySelectorAll('.context-overlay').length).to.equal(
      2,
    );
  });

  test('displays the current timestamp', async () => {
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view
        .config=${sampleConfig()}
        currentTime="69"
      ></ia-transcript-view>`,
    );

    const timeDisplay = el.shadowRoot?.querySelector('.time-display');
    expect(timeDisplay?.textContent?.trim()).to.equal('1:09');
  });

  test('the autoscroll button turns autoscroll back on', async () => {
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${sampleConfig()}></ia-transcript-view>`,
    );
    el.autoScroll = false;
    await elementUpdated(el);

    const button = el.shadowRoot?.querySelector('.auto-scroll-button');
    expect(button?.classList.contains('hidden')).to.be.false;

    button?.dispatchEvent(new MouseEvent('click'));

    expect(el.autoScroll).to.be.true;
  });

  test('hides the autoscroll button while autoscroll is on', async () => {
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${sampleConfig()}></ia-transcript-view>`,
    );

    const button = el.shadowRoot?.querySelector('.auto-scroll-button');
    expect(button?.classList.contains('hidden')).to.be.true;
  });

  test('emits `autoScrollChanged` when autoscroll flips', async () => {
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${sampleConfig()}></ia-transcript-view>`,
    );

    setTimeout(() => {
      el.autoScroll = false;
    });

    const { detail } = await oneEvent(el, 'autoScrollChanged');
    expect(detail.autoScroll).to.be.false;
  });

  test('emits `transcriptEntrySelected` when an entry is clicked', async () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 64, 67, 'foo', false, undefined),
      new TranscriptEntryConfig(2, 68, 73, 'bar', false, 1),
      new TranscriptEntryConfig(3, 74, 78, 'baz', false, undefined),
    ]);
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view
        .config=${config}
        currentTime="70"
      ></ia-transcript-view>`,
    );

    setTimeout(() =>
      entriesIn(el)[1].dispatchEvent(
        new MouseEvent('click', { bubbles: true }),
      ),
    );

    const { detail } = await oneEvent(el, 'transcriptEntrySelected');
    expect(detail.entry.rawText).to.equal('bar');
    // Clicking a search result makes it the selected one, and stops the
    // transcript scrolling out from under the reader.
    expect(el.selectedSearchResultIndex).to.equal(1);
    expect(el.autoScroll).to.be.false;
  });

  test('renders `data-search-result-index` as an attribute', async () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 64, 67, 'foo', false, undefined),
      new TranscriptEntryConfig(2, 68, 73, 'bar', false, 0),
      new TranscriptEntryConfig(3, 74, 78, 'baz', false, 1),
    ]);
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${config}></ia-transcript-view>`,
    );

    const entries = entriesIn(el);
    // Search results are looked up with an attribute selector, so this has to
    // be an attribute rather than a property binding.
    expect(entries[1].getAttribute('data-search-result-index')).to.equal('0');
    expect(entries[2].getAttribute('data-search-result-index')).to.equal('1');
  });

  test('leaves the attribute off entries that are not search results', async () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 64, 67, 'foo', false, undefined),
    ]);
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${config}></ia-transcript-view>`,
    );

    // Rendering the attribute regardless would leave the literal string
    // "undefined" on every non-result entry.
    expect(entriesIn(el)[0].hasAttribute('data-search-result-index')).to.be
      .false;
  });

  test('marks entries as search results and flags the selected one', async () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 64, 67, 'foo', false, undefined),
      new TranscriptEntryConfig(2, 68, 73, 'bar', false, 0),
      new TranscriptEntryConfig(3, 74, 78, 'baz', false, 1),
    ]);
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${config}></ia-transcript-view>`,
    );

    const entries = entriesIn(el);
    expect(entries[0].isSearchResult).to.be.false;
    expect(entries[1].isSearchResult).to.be.true;
    expect(entries[1].isSelected).to.be.true;
    expect(entries[2].isSelected).to.be.false;
  });

  test('disables autoscroll on a manual scroll and restores it after the delay', async () => {
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${sampleConfig()}></ia-transcript-view>`,
    );
    el.scrollTimerDelay = 50;

    el.shadowRoot
      ?.querySelector('.scroll-container')
      ?.dispatchEvent(new MouseEvent('wheel'));

    expect(el.autoScroll).to.be.false;

    await new Promise((resolve) => {
      setTimeout(resolve, 80);
    });

    expect(el.autoScroll).to.be.true;
  });

  test('tracks the entry being spoken as time moves', async () => {
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view
        .config=${sampleConfig()}
        currentTime="65"
      ></ia-transcript-view>`,
    );

    expect(entriesIn(el)[0].isActive).to.be.true;

    setTimeout(() => {
      el.currentTime = 69;
    });
    expect(await oneEvent(el, 'currentEntriesUpdated')).to.exist;
    await elementUpdated(el);

    expect(entriesIn(el)[0].isActive).to.be.false;
    expect(entriesIn(el)[1].isActive).to.be.true;
  });

  test('marks every overlapping entry as active', async () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 64, 67, 'foo', false),
      new TranscriptEntryConfig(2, 68, 73, 'bar', false),
      new TranscriptEntryConfig(3, 74, 78, 'baz', false),
      new TranscriptEntryConfig(4, 74, 78, 'blop', false),
      new TranscriptEntryConfig(5, 79, 84, 'boop', false),
    ]);
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view
        .config=${config}
        currentTime="75"
      ></ia-transcript-view>`,
    );

    const active = entriesIn(el).filter((entry) => entry.isActive);
    expect(active.length).to.equal(2);
    expect(active[0].entry?.rawText).to.equal('baz');
    expect(active[1].entry?.rawText).to.equal('blop');
  });

  test('returns null for the closest id if there are no entries', async () => {
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view></ia-transcript-view>`,
    );

    expect(el.entryIdentifierClosestToTime(65)).to.be.null;
  });

  test('finds the id closest to a given time', async () => {
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${sampleConfig()}></ia-transcript-view>`,
    );

    expect(el.entryIdentifierClosestToTime(65)).to.equal(1);
    expect(el.entryIdentifierClosestToTime(68)).to.equal(2);
    expect(el.entryIdentifierClosestToTime(1000)).to.equal(3);
  });

  test('finds an entry whose id is 0', async () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(0, 0, 5, 'first', false),
      new TranscriptEntryConfig(1, 6, 10, 'second', false),
    ]);
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${config}></ia-transcript-view>`,
    );

    // A falsy check here would treat id 0 as "nothing found".
    expect(el.entryIdentifierClosestToTime(1)).to.equal(0);
  });

  test('scrolls an off-screen entry into view as playback reaches it', async () => {
    const el = await scrollableFixture();
    const scroller = el.shadowRoot?.querySelector('#scroll-container');
    expect(scroller?.scrollTop).to.equal(0);

    el.currentTime = 250;
    await elementUpdated(el);
    await settleScroll();

    expect(scroller?.scrollTop).to.be.greaterThan(0);
  });

  test('lands exactly on target rather than overshooting it', async () => {
    const el = await scrollableFixture();
    const scroller = el.shadowRoot?.querySelector('#scroll-container');

    el.currentTime = 250;
    await elementUpdated(el);
    await settleScroll();
    const settled = scroller?.scrollTop;

    // Nothing should move after the animation has finished.
    await settleScroll(100);
    expect(scroller?.scrollTop).to.equal(settled);
  });

  test('scrolling to a search result stops it following playback', async () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 64, 67, 'foo', false, 0),
      new TranscriptEntryConfig(2, 68, 73, 'bar', false, 1),
    ]);
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${config}></ia-transcript-view>`,
    );
    // Receiving a transcript that has search results in it jumps to the first
    // one, which is itself a reason to stop following playback. Turn it back
    // on so the assertion below is about the index change alone.
    el.autoScroll = true;
    await elementUpdated(el);

    el.selectedSearchResultIndex = 1;
    await elementUpdated(el);

    expect(el.autoScroll).to.be.false;
  });

  test('resets on any new config, even an equivalent one', async () => {
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${sampleConfig()}></ia-transcript-view>`,
    );
    el.selectedSearchResultIndex = 3;
    await elementUpdated(el);

    // Assignment is what resets, not a change in content, so consumers have to
    // hold a stable reference rather than rebuild the config each render.
    el.config = sampleConfig();
    await elementUpdated(el);

    expect(el.selectedSearchResultIndex).to.equal(0);
  });

  test('resets the selected search result when the transcript changes', async () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 64, 67, 'foo', false, 0),
      new TranscriptEntryConfig(2, 68, 73, 'bar', false, 1),
    ]);
    const el = await fixture<IATranscriptView>(
      html`<ia-transcript-view .config=${config}></ia-transcript-view>`,
    );

    el.selectedSearchResultIndex = 1;
    await elementUpdated(el);

    el.config = sampleConfig();
    await elementUpdated(el);

    expect(el.selectedSearchResultIndex).to.equal(0);
  });
});

describe('IA Transcript Entry', () => {
  test('has no entry, and is neither active nor selected, by default', async () => {
    const el = await fixture<IATranscriptEntry>(
      html`<ia-transcript-entry></ia-transcript-entry>`,
    );

    expect(el.entry).to.be.undefined;
    expect(el.isActive).to.be.false;
    expect(el.isSelected).to.be.false;
  });

  test('displays the entry text', async () => {
    const entry = new TranscriptEntryConfig(1, 1, 2, 'foo-bar', false);
    const el = await fixture<IATranscriptEntry>(
      html`<ia-transcript-entry .entry=${entry}></ia-transcript-entry>`,
    );

    expect(el.shadowRoot?.textContent?.trim()).to.equal('foo-bar');
  });

  test('reflects its flags to attributes so the view can style them', async () => {
    const el = await fixture<IATranscriptEntry>(
      html`<ia-transcript-entry isActive isSelected></ia-transcript-entry>`,
    );

    expect(el.hasAttribute('isactive')).to.be.true;
    expect(el.hasAttribute('isselected')).to.be.true;
  });
});

describe('Transcript models', () => {
  test('filters search results', async () => {
    const config = new TranscriptConfig([
      new TranscriptEntryConfig(1, 64, 67, 'foo', false, undefined),
      new TranscriptEntryConfig(2, 68, 73, 'bar', false, 1),
      new TranscriptEntryConfig(3, 74, 78, 'baz', false, undefined),
    ]);

    expect(config.searchResults.length).to.equal(1);
    expect(config.searchResults[0].displayText).to.equal('bar');
  });

  test('says so when a stretch is music rather than speech', async () => {
    const entry = new TranscriptEntryConfig(1, 64, 67, 'foo', true);

    expect(entry.displayText).to.equal('[Transcript unavailable]');
  });

  test('shows the raw text for speech', async () => {
    const entry = new TranscriptEntryConfig(1, 64, 67, 'foo', false);

    expect(entry.displayText).to.equal('foo');
  });
});

describe('formatDuration', () => {
  test.each([
    [0, '0:00'],
    [7, '0:07'],
    [35, '0:35'],
    [63, '1:03'],
    [69, '1:09'],
    [3601, '1:00:01'],
    [3663, '1:01:03'],
    [36000, '10:00:00'],
  ])('formats %i seconds as %s', (seconds, expected) => {
    expect(formatDuration(seconds)).to.equal(expected);
  });

  test('rounds part-seconds down', () => {
    expect(formatDuration(69.9)).to.equal('1:09');
  });

  test.each([
    [Number.NaN],
    [Number.POSITIVE_INFINITY],
    ['foo' as unknown as number],
    [undefined as unknown as number],
  ])('returns an empty string for %s', (value) => {
    expect(formatDuration(value)).to.equal('');
  });
});
