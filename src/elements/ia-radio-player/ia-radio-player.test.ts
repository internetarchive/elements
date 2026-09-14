import { fixture, oneEvent, elementUpdated } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import {
  TranscriptConfig,
  TranscriptEntryConfig,
} from '@src/elements/ia-transcript-view/models';
import type { IAAudioElement } from '@src/elements/ia-audio-element/ia-audio-element';
import type { IATranscriptView } from '@src/elements/ia-transcript-view/ia-transcript-view';
import type { IAPlaybackControls } from '@src/elements/ia-playback-controls/ia-playback-controls';
import type { IAScrubberBar } from '@src/elements/ia-scrubber-bar/ia-scrubber-bar';

import type { RadioPlayerConfig } from './models';
import type { SearchHandlerInterface } from './search/search-handler';
import type { IASearchResultsSwitcher } from './ia-search-results-switcher';
import type { IARadioPlayer } from './ia-radio-player';
import './ia-radio-player';

const CONFIG: RadioPlayerConfig = {
  title: 'Test Broadcast',
  date: '1 January 1970',
  logoUrl: 'https://archive.org/logo.png',
  waveformUrl: 'https://archive.org/waveform.png',
  audioSources: [{ url: './assets/test.mp3', mimetype: 'audio/mpeg' }],
  quickSearches: ['president', 'weather'],
};

/** Speech, then a music break from 10 to 20, then speech. */
function transcriptWithMusic(): TranscriptConfig {
  return new TranscriptConfig([
    new TranscriptEntryConfig(0, 0, 9, 'opening words', false),
    new TranscriptEntryConfig(1, 10, 20, '', true),
    new TranscriptEntryConfig(2, 21, 30, 'closing words', false),
  ]);
}

async function playerFixture(
  config: RadioPlayerConfig | undefined = CONFIG,
): Promise<IARadioPlayer> {
  return fixture<IARadioPlayer>(
    html`<ia-radio-player .config=${config}></ia-radio-player>`,
  );
}

function childIn<T extends Element>(el: IARadioPlayer, selector: string): T {
  const child = el.shadowRoot?.querySelector<T>(selector);
  if (!child) throw new Error(`no ${selector} rendered`);
  return child;
}

/** Tells the player how long the track is, the way the audio element would. */
async function reportDuration(
  el: IARadioPlayer,
  duration: number,
): Promise<void> {
  childIn<IAAudioElement>(el, 'ia-audio-element').dispatchEvent(
    new CustomEvent('durationchange', { detail: { duration } }),
  );
  await elementUpdated(el);
}

/** Reports a playback position, the way the audio element would. */
async function reportTime(
  el: IARadioPlayer,
  currentTime: number,
): Promise<void> {
  childIn<IAAudioElement>(el, 'ia-audio-element').dispatchEvent(
    new CustomEvent('timeupdate', { detail: { currentTime } }),
  );
  await elementUpdated(el);
}

/**
 * Runs `action` and collects any uncaught error it raises.
 *
 * An exception thrown inside a DOM event listener never reaches the code that
 * dispatched the event, it goes to the window, so a handler that throws looks
 * like nothing happening unless the window is watched.
 */
async function uncaughtErrorsDuring(action: () => void): Promise<string[]> {
  const errors: string[] = [];
  const onError = (e: ErrorEvent): void => {
    errors.push(e.message);
  };

  window.addEventListener('error', onError);
  try {
    action();
    await new Promise((resolve) => {
      setTimeout(resolve);
    });
  } finally {
    window.removeEventListener('error', onError);
  }

  return errors;
}

/** A search handler that returns a fixed transcript. */
function handlerReturning(config: TranscriptConfig): SearchHandlerInterface {
  return {
    async search() {
      return config;
    },
  };
}

describe('IA Radio Player', () => {
  test('shows the title and date from the config', async () => {
    const el = await playerFixture();

    expect(
      el.shadowRoot?.querySelector('.title')?.textContent?.trim(),
    ).to.equal('Test Broadcast');
    expect(el.shadowRoot?.querySelector('.date')?.textContent?.trim()).to.equal(
      '1 January 1970',
    );
  });

  test('shows the collection logo with an accessible name', async () => {
    const el = await playerFixture();
    const logo = childIn<HTMLImageElement>(el, '.collection-logo');

    expect(logo.getAttribute('src')).to.equal('https://archive.org/logo.png');
    expect(logo.getAttribute('alt')).to.equal('Collection logo');
  });

  test('renders nothing for a logo when the config has none', async () => {
    const el = await playerFixture({ ...CONFIG, logoUrl: '' });

    expect(el.shadowRoot?.querySelector('.collection-logo')).to.not.exist;
  });

  test('renders no waveform when the config has no waveform url', async () => {
    const el = await playerFixture({ ...CONFIG, waveformUrl: undefined });

    expect(el.shadowRoot?.querySelector('ia-waveform-progress')).to.not.exist;
  });

  test('hands its audio sources to the audio element', async () => {
    const el = await playerFixture();

    expect(
      childIn<IAAudioElement>(el, 'ia-audio-element').sources,
    ).to.deep.equal(CONFIG.audioSources);
  });

  test('renders with no config at all', async () => {
    const el = await fixture<IARadioPlayer>(
      html`<ia-radio-player></ia-radio-player>`,
    );

    expect(
      el.shadowRoot?.querySelector('.title')?.textContent?.trim(),
    ).to.equal('');
    expect(
      childIn<IAAudioElement>(el, 'ia-audio-element').sources,
    ).to.deep.equal([]);
  });

  test('turns the config quick searches into search bar entries', async () => {
    const el = await playerFixture();
    const searchBar = childIn<HTMLElement & { quickSearches: unknown }>(
      el,
      'ia-expandable-search-bar',
    );

    expect(searchBar.quickSearches).to.deep.equal([
      { displayText: 'president' },
      { displayText: 'weather' },
    ]);
  });

  describe('playback', () => {
    test('shows the controls as playing once playback starts', async () => {
      const el = await playerFixture();
      const controls = childIn<IAPlaybackControls>(el, 'ia-playback-controls');
      expect(controls.playbackMode).to.equal('paused');

      childIn<IAAudioElement>(el, 'ia-audio-element').dispatchEvent(
        new Event('playbackStarted'),
      );
      await elementUpdated(el);

      expect(controls.playbackMode).to.equal('playing');
    });

    test('shows the controls as paused again when playback pauses', async () => {
      const el = await playerFixture();
      const audio = childIn<IAAudioElement>(el, 'ia-audio-element');
      audio.dispatchEvent(new Event('playbackStarted'));
      await elementUpdated(el);

      audio.dispatchEvent(new Event('playbackPaused'));
      await elementUpdated(el);

      expect(
        childIn<IAPlaybackControls>(el, 'ia-playback-controls').playbackMode,
      ).to.equal('paused');
    });

    test('re-emits canplay', async () => {
      const el = await playerFixture();

      setTimeout(() =>
        childIn<IAAudioElement>(el, 'ia-audio-element').dispatchEvent(
          new Event('canplay'),
        ),
      );

      expect(await oneEvent(el, 'canplay')).to.exist;
    });

    test('seeks back ten seconds and reports it', async () => {
      const el = await playerFixture();
      const audio = childIn<IAAudioElement>(el, 'ia-audio-element');
      audio.seekTo(30);

      setTimeout(() =>
        childIn<IAPlaybackControls>(el, 'ia-playback-controls').dispatchEvent(
          new Event('back-button-pressed'),
        ),
      );
      await oneEvent(el, 'jumpBackButtonPressed');

      expect(audio.currentTime).to.equal(20);
    });

    test('seeks forward ten seconds and reports it', async () => {
      const el = await playerFixture();
      const audio = childIn<IAAudioElement>(el, 'ia-audio-element');
      audio.seekTo(30);

      setTimeout(() =>
        childIn<IAPlaybackControls>(el, 'ia-playback-controls').dispatchEvent(
          new Event('forward-button-pressed'),
        ),
      );
      await oneEvent(el, 'jumpForwardButtonPressed');

      expect(audio.currentTime).to.equal(40);
    });

    test('reports which way the play/pause button went', async () => {
      const el = await playerFixture();

      setTimeout(() =>
        childIn<IAPlaybackControls>(el, 'ia-playback-controls').dispatchEvent(
          new Event('play-pause-button-pressed'),
        ),
      );

      const { detail } = await oneEvent(el, 'playPauseButtonPressed');
      expect(detail.isPlaying).to.be.true;
    });

    test('passes a playback rate change on to the audio element', async () => {
      const el = await playerFixture();

      setTimeout(() =>
        childIn<IAPlaybackControls>(el, 'ia-playback-controls').dispatchEvent(
          new CustomEvent('playbackRateChange', {
            detail: { playbackRate: 1.5 },
          }),
        ),
      );

      const { detail } = await oneEvent(el, 'playbackRateChanged');
      expect(detail.playbackRate).to.equal(1.5);
      await elementUpdated(el);
      expect(
        childIn<IAAudioElement>(el, 'ia-audio-element').playbackRate,
      ).to.equal(1.5);
    });

    test('passes a volume change on to the audio element', async () => {
      const el = await playerFixture();

      setTimeout(() =>
        childIn<IAPlaybackControls>(el, 'ia-playback-controls').dispatchEvent(
          new CustomEvent('volumeChange', { detail: { volume: 0 } }),
        ),
      );

      const { detail } = await oneEvent(el, 'volumeChanged');
      // Muting is a volume of 0, which a falsy guard would drop.
      expect(detail.volume).to.equal(0);
      await elementUpdated(el);
      expect(childIn<IAAudioElement>(el, 'ia-audio-element').volume).to.equal(
        0,
      );
    });
  });

  describe('time and duration', () => {
    test('tracks the playback position and turns it into a percentage', async () => {
      const el = await playerFixture();
      await reportDuration(el, 100);

      await reportTime(el, 25);

      expect(el.currentTime).to.equal(25);
      expect(childIn<IAScrubberBar>(el, 'ia-scrubber-bar').value).to.equal(25);
    });

    test('accepts a report of time zero', async () => {
      const el = await playerFixture();
      await reportDuration(el, 100);
      await reportTime(el, 50);

      // Rewinding to the very start is a legitimate position, and a falsy
      // guard would ignore it and leave the scrubber where it was.
      await reportTime(el, 0);

      expect(el.currentTime).to.equal(0);
      expect(childIn<IAScrubberBar>(el, 'ia-scrubber-bar').value).to.equal(0);
    });

    test('does not divide by a duration it does not have yet', async () => {
      const el = await playerFixture();

      await reportTime(el, 25);

      expect(childIn<IAScrubberBar>(el, 'ia-scrubber-bar').value).to.equal(0);
    });

    test('ignores a duration that is not a real number', async () => {
      const el = await playerFixture();
      await reportDuration(el, 100);

      // A stream reports Infinity, and unloaded metadata reports NaN.
      await reportDuration(el, Number.POSITIVE_INFINITY);
      await reportDuration(el, Number.NaN);
      await reportTime(el, 25);

      expect(childIn<IAScrubberBar>(el, 'ia-scrubber-bar').value).to.equal(25);
    });

    test('emits currentTimeChanged as playback moves', async () => {
      const el = await playerFixture();
      await reportDuration(el, 100);

      setTimeout(() => reportTime(el, 42));

      const { detail } = await oneEvent(el, 'currentTimeChanged');
      expect(detail.currentTime).to.equal(42);
    });
  });

  describe('scrubbing', () => {
    test('seeks when the scrubber moves', async () => {
      const el = await playerFixture();
      await reportDuration(el, 100);

      setTimeout(() =>
        childIn<IAScrubberBar>(el, 'ia-scrubber-bar').dispatchEvent(
          new CustomEvent('valuechange', { detail: { value: 40 } }),
        ),
      );

      const { detail } = await oneEvent(el, 'timeChangedFromScrub');
      expect(detail.newTime).to.equal(40);
      expect(
        childIn<IAAudioElement>(el, 'ia-audio-element').currentTime,
      ).to.equal(40);
    });

    test('seeks when the scrubber is dragged all the way back to the start', async () => {
      const el = await playerFixture();
      await reportDuration(el, 100);
      await reportTime(el, 50);

      // Scrubbing to 0% is a real gesture, and a falsy guard would ignore it.
      setTimeout(() =>
        childIn<IAScrubberBar>(el, 'ia-scrubber-bar').dispatchEvent(
          new CustomEvent('valuechange', { detail: { value: 0 } }),
        ),
      );

      const { detail } = await oneEvent(el, 'timeChangedFromScrub');
      expect(detail.newTime).to.equal(0);
      expect(el.currentTime).to.equal(0);
    });
  });

  describe('sections', () => {
    test('marks the music sections on the scrubber', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .transcriptConfig=${transcriptWithMusic()}
        ></ia-radio-player>`,
      );
      await reportDuration(el, 100);

      // Start, the music break's two edges, and the end.
      expect(
        childIn<IAScrubberBar>(el, 'ia-scrubber-bar').sectionMarkerPercentages,
      ).to.deep.equal([0, 10, 20, 100]);
    });

    test('has no section markers before the duration is known', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .transcriptConfig=${transcriptWithMusic()}
        ></ia-radio-player>`,
      );

      expect(
        childIn<IAScrubberBar>(el, 'ia-scrubber-bar').sectionMarkerPercentages,
      ).to.deep.equal([0, 100]);
    });

    test('jumps to the next section boundary', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .transcriptConfig=${transcriptWithMusic()}
        ></ia-radio-player>`,
      );
      await reportDuration(el, 100);
      await reportTime(el, 5);

      childIn<IAPlaybackControls>(el, 'ia-playback-controls').dispatchEvent(
        new Event('next-section-button-pressed'),
      );

      // The next boundary is 10%, which is 10s, plus the nudge past the edge.
      expect(
        childIn<IAAudioElement>(el, 'ia-audio-element').currentTime,
      ).to.be.closeTo(10.1, 0.001);
    });

    test('jumps to the previous section boundary', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .transcriptConfig=${transcriptWithMusic()}
        ></ia-radio-player>`,
      );
      await reportDuration(el, 100);
      await reportTime(el, 50);

      childIn<IAPlaybackControls>(el, 'ia-playback-controls').dispatchEvent(
        new Event('prev-section-button-pressed'),
      );

      expect(
        childIn<IAAudioElement>(el, 'ia-audio-element').currentTime,
      ).to.be.closeTo(19.9, 0.001);
    });

    test('stays put when there is no next boundary to jump to', async () => {
      const el = await playerFixture();
      await reportDuration(el, 100);
      await reportTime(el, 100);
      const audio = childIn<IAAudioElement>(el, 'ia-audio-element');
      audio.seekTo(100);

      // Math.min of nothing is Infinity, and an audio element throws a
      // TypeError on a non-finite position, which inside a listener surfaces
      // as an uncaught error rather than as a wrong value.
      const errors = await uncaughtErrorsDuring(() =>
        childIn<IAPlaybackControls>(el, 'ia-playback-controls').dispatchEvent(
          new Event('next-section-button-pressed'),
        ),
      );

      expect(errors).to.deep.equal([]);
      expect(audio.currentTime).to.equal(100);
    });

    test('stays put when there is no previous boundary to jump to', async () => {
      const el = await playerFixture();
      await reportDuration(el, 100);
      await reportTime(el, 0);
      const audio = childIn<IAAudioElement>(el, 'ia-audio-element');
      audio.seekTo(0);

      // Math.max of nothing is -Infinity, with the same result.
      const errors = await uncaughtErrorsDuring(() =>
        childIn<IAPlaybackControls>(el, 'ia-playback-controls').dispatchEvent(
          new Event('prev-section-button-pressed'),
        ),
      );

      expect(errors).to.deep.equal([]);
      expect(audio.currentTime).to.equal(0);
    });

    test('skips past a music section when told to', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .transcriptConfig=${transcriptWithMusic()}
          skipMusicSections
        ></ia-radio-player>`,
      );
      await reportDuration(el, 100);

      await reportTime(el, 15);

      expect(
        childIn<IAAudioElement>(el, 'ia-audio-element').currentTime,
      ).to.be.closeTo(20.1, 0.001);
    });

    test('leaves the music alone unless asked to skip it', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .transcriptConfig=${transcriptWithMusic()}
        ></ia-radio-player>`,
      );
      await reportDuration(el, 100);
      const audio = childIn<IAAudioElement>(el, 'ia-audio-element');
      audio.seekTo(15);

      await reportTime(el, 15);

      expect(audio.currentTime).to.equal(15);
    });
  });

  describe('transcript', () => {
    test('shows the transcript it is given', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .transcriptConfig=${transcriptWithMusic()}
        ></ia-radio-player>`,
      );

      expect(
        childIn<IATranscriptView>(el, 'ia-transcript-view').config?.entries
          .length,
      ).to.equal(3);
    });

    test('prefers the search results transcript when there is one', async () => {
      const searchResults = new TranscriptConfig([
        new TranscriptEntryConfig(1, 0, 4, 'a result', false, 0),
      ]);
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .transcriptConfig=${transcriptWithMusic()}
          .searchResultsTranscript=${searchResults}
        ></ia-radio-player>`,
      );

      expect(
        childIn<IATranscriptView>(el, 'ia-transcript-view').config,
      ).to.equal(searchResults);
    });

    test('seeks to an entry the reader picks', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .transcriptConfig=${transcriptWithMusic()}
        ></ia-radio-player>`,
      );
      const entry = transcriptWithMusic().entries[2];

      setTimeout(() =>
        childIn<IATranscriptView>(el, 'ia-transcript-view').dispatchEvent(
          new CustomEvent('transcriptEntrySelected', { detail: { entry } }),
        ),
      );

      const { detail } = await oneEvent(el, 'transcriptEntrySelected');
      expect(detail.newTime).to.equal(21);
    });

    test('seeks to the very first entry, which starts at zero', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .transcriptConfig=${transcriptWithMusic()}
        ></ia-radio-player>`,
      );
      await reportDuration(el, 100);
      await reportTime(el, 50);
      const entry = transcriptWithMusic().entries[0];

      // The opening line starts at 0, and a falsy guard would make it the one
      // entry in the transcript that cannot be clicked.
      setTimeout(() =>
        childIn<IATranscriptView>(el, 'ia-transcript-view').dispatchEvent(
          new CustomEvent('transcriptEntrySelected', { detail: { entry } }),
        ),
      );

      const { detail } = await oneEvent(el, 'transcriptEntrySelected');
      expect(detail.newTime).to.equal(0);
      expect(el.currentTime).to.equal(0);
    });
  });

  describe('search', () => {
    const RESULTS = new TranscriptConfig([
      new TranscriptEntryConfig(1, 0, 4, 'first hit', false, 0),
      new TranscriptEntryConfig(2, 5, 9, 'between', false),
      new TranscriptEntryConfig(3, 10, 14, 'second hit', false, 1),
    ]);

    test('tracks what is typed in the search bar', async () => {
      const el = await playerFixture();

      setTimeout(() =>
        childIn(el, 'ia-expandable-search-bar').dispatchEvent(
          new CustomEvent('inputchange', { detail: { value: 'pres' } }),
        ),
      );

      const { detail } = await oneEvent(el, 'searchTermChanged');
      expect(detail.searchTerm).to.equal('pres');
      expect(el.searchTerm).to.equal('pres');
    });

    test('tracks the search bar being emptied a character at a time', async () => {
      const el = await playerFixture();
      childIn(el, 'ia-expandable-search-bar').dispatchEvent(
        new CustomEvent('inputchange', { detail: { value: 'a' } }),
      );

      // Backspacing the last character leaves an empty string, which a falsy
      // guard would drop, stranding the old term.
      setTimeout(() =>
        childIn(el, 'ia-expandable-search-bar').dispatchEvent(
          new CustomEvent('inputchange', { detail: { value: '' } }),
        ),
      );

      const { detail } = await oneEvent(el, 'searchTermChanged');
      expect(detail.searchTerm).to.equal('');
      expect(el.searchTerm).to.equal('');
    });

    test('runs a search on enter and shows the results switcher', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .transcriptConfig=${transcriptWithMusic()}
          .searchHandler=${handlerReturning(RESULTS)}
        ></ia-radio-player>`,
      );

      setTimeout(() =>
        childIn(el, 'ia-expandable-search-bar').dispatchEvent(
          new CustomEvent('enterKeyPressed', { detail: { value: 'hit' } }),
        ),
      );
      await oneEvent(el, 'searchExecuted');
      // One update to settle the search, another to render its outcome.
      await elementUpdated(el);
      await elementUpdated(el);

      const switcher = childIn<IASearchResultsSwitcher>(
        el,
        'ia-search-results-switcher',
      );
      expect(switcher.numberOfResults).to.equal(2);
    });

    test('shows a message when a search finds nothing', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .searchHandler=${handlerReturning(new TranscriptConfig([]))}
        ></ia-radio-player>`,
      );

      setTimeout(() =>
        childIn(el, 'ia-expandable-search-bar').dispatchEvent(
          new CustomEvent('enterKeyPressed', { detail: { value: 'nothing' } }),
        ),
      );
      await oneEvent(el, 'searchExecuted');
      await elementUpdated(el);
      await elementUpdated(el);

      expect(
        el.shadowRoot
          ?.querySelector('.no-search-results-message')
          ?.textContent?.trim(),
      ).to.equal('No search results.');
    });

    test('does not search for a term that is too short to be useful', async () => {
      let searched = false;
      const handler: SearchHandlerInterface = {
        async search() {
          searched = true;
          return RESULTS;
        },
      };
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .searchHandler=${handler}
        ></ia-radio-player>`,
      );

      childIn(el, 'ia-expandable-search-bar').dispatchEvent(
        new CustomEvent('enterKeyPressed', { detail: { value: 'a' } }),
      );
      await elementUpdated(el);

      expect(searched).to.be.false;
    });

    test('does nothing on enter with no search handler wired up', async () => {
      const el = await playerFixture();

      childIn(el, 'ia-expandable-search-bar').dispatchEvent(
        new CustomEvent('enterKeyPressed', { detail: { value: 'president' } }),
      );
      await elementUpdated(el);

      expect(el.searchResultsTranscript).to.be.undefined;
    });

    test('runs the pending term once a search handler arrives', async () => {
      const el = await playerFixture();
      childIn(el, 'ia-expandable-search-bar').dispatchEvent(
        new CustomEvent('inputchange', { detail: { value: 'hit' } }),
      );
      await elementUpdated(el);

      setTimeout(() => {
        el.searchHandler = handlerReturning(RESULTS);
      });

      expect(await oneEvent(el, 'searchExecuted')).to.exist;
    });

    test('clears the results when the search is cleared', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .searchResultsTranscript=${RESULTS}
          searchTerm="hit"
        ></ia-radio-player>`,
      );

      setTimeout(() =>
        childIn(el, 'ia-expandable-search-bar').dispatchEvent(
          new Event('searchCleared'),
        ),
      );
      await oneEvent(el, 'searchCleared');
      await elementUpdated(el);

      expect(el.searchTerm).to.equal('');
      expect(el.searchResultsTranscript).to.be.undefined;
      expect(el.shadowRoot?.querySelector('ia-search-results-switcher')).to.not
        .exist;
    });

    test('puts the spinner away when a search fails', async () => {
      const failing: SearchHandlerInterface = {
        async search() {
          throw new Error('the search service is down');
        },
      };
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .searchHandler=${failing}
        ></ia-radio-player>`,
      );

      setTimeout(() =>
        childIn(el, 'ia-expandable-search-bar').dispatchEvent(
          new CustomEvent('enterKeyPressed', { detail: { value: 'anything' } }),
        ),
      );
      await oneEvent(el, 'searchFailed');
      await elementUpdated(el);

      // A spinner left up hides the search UI for the life of the page.
      expect(el.shadowRoot?.querySelector('ia-status-indicator')).to.not.exist;
    });

    test('lets a failed search be retried', async () => {
      let shouldFail = true;
      const flaky: SearchHandlerInterface = {
        async search() {
          if (shouldFail) throw new Error('down');
          return RESULTS;
        },
      };
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .searchHandler=${flaky}
        ></ia-radio-player>`,
      );

      setTimeout(() =>
        childIn(el, 'ia-expandable-search-bar').dispatchEvent(
          new CustomEvent('enterKeyPressed', { detail: { value: 'hit' } }),
        ),
      );
      await oneEvent(el, 'searchFailed');
      await elementUpdated(el);

      shouldFail = false;
      setTimeout(() =>
        childIn(el, 'ia-expandable-search-bar').dispatchEvent(
          new CustomEvent('enterKeyPressed', { detail: { value: 'hit' } }),
        ),
      );
      await oneEvent(el, 'searchExecuted');
      await elementUpdated(el);
      await elementUpdated(el);

      expect(
        childIn<IASearchResultsSwitcher>(el, 'ia-search-results-switcher')
          .numberOfResults,
      ).to.equal(2);
    });

    test('ignores results from a search that has been superseded', async () => {
      const SLOW = new TranscriptConfig([
        new TranscriptEntryConfig(1, 0, 4, 'stale', false, 0),
      ]);
      const resolvers: (() => void)[] = [];
      const staggered: SearchHandlerInterface = {
        async search(term: string) {
          await new Promise<void>((resolve) => {
            resolvers.push(resolve);
          });
          return term === 'slow' ? SLOW : RESULTS;
        },
      };
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .searchHandler=${staggered}
        ></ia-radio-player>`,
      );

      const searchBar = childIn(el, 'ia-expandable-search-bar');
      searchBar.dispatchEvent(
        new CustomEvent('enterKeyPressed', { detail: { value: 'slow' } }),
      );
      searchBar.dispatchEvent(
        new CustomEvent('enterKeyPressed', { detail: { value: 'quick' } }),
      );

      // The newer search answers first, then the older one, which is exactly
      // the ordering that would otherwise leave stale results on screen.
      resolvers[1]();
      await elementUpdated(el);
      resolvers[0]();
      await elementUpdated(el);
      await elementUpdated(el);

      expect(
        el.searchResultsTranscript?.entries.map((entry) => entry.rawText),
      ).to.not.include('stale');
      expect(el.searchTerm).to.equal('quick');
    });

    test('offers the quick searches, and runs the one that is picked', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .searchHandler=${handlerReturning(RESULTS)}
        ></ia-radio-player>`,
      );
      const searchBar = childIn<HTMLElement & { showsDisclosure: boolean }>(
        el,
        'ia-expandable-search-bar',
      );

      // Without the disclosure the list has no way to be opened at all.
      expect(searchBar.showsDisclosure).to.be.true;

      setTimeout(() =>
        searchBar.dispatchEvent(
          new CustomEvent('quickSearchSelected', {
            detail: { quickSearchEntry: { displayText: 'president' } },
          }),
        ),
      );
      await oneEvent(el, 'searchExecuted');
      await elementUpdated(el);

      expect(el.searchTerm).to.equal('president');
    });

    test('does not offer a disclosure when there are no quick searches', async () => {
      const el = await playerFixture({ ...CONFIG, quickSearches: [] });
      const searchBar = childIn<HTMLElement & { showsDisclosure: boolean }>(
        el,
        'ia-expandable-search-bar',
      );

      expect(searchBar.showsDisclosure).to.be.false;
    });

    test('announces the search outcome through a region that is always present', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .searchHandler=${handlerReturning(RESULTS)}
        ></ia-radio-player>`,
      );

      // The region has to exist before its text changes, or a screen reader
      // has nothing to have been watching.
      const status = el.shadowRoot?.querySelector(
        '.search-results-info [role="status"]',
      );
      expect(status).to.exist;
      expect(status?.textContent?.trim()).to.equal('');

      setTimeout(() =>
        childIn(el, 'ia-expandable-search-bar').dispatchEvent(
          new CustomEvent('enterKeyPressed', { detail: { value: 'hit' } }),
        ),
      );
      await oneEvent(el, 'searchExecuted');
      await elementUpdated(el);
      await elementUpdated(el);

      expect(status?.textContent?.trim()).to.equal('2 search results');
    });

    test('announces when a search finds nothing', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .searchHandler=${handlerReturning(new TranscriptConfig([]))}
        ></ia-radio-player>`,
      );
      const status = el.shadowRoot?.querySelector(
        '.search-results-info [role="status"]',
      );

      setTimeout(() =>
        childIn(el, 'ia-expandable-search-bar').dispatchEvent(
          new CustomEvent('enterKeyPressed', { detail: { value: 'nothing' } }),
        ),
      );
      await oneEvent(el, 'searchExecuted');
      await elementUpdated(el);
      await elementUpdated(el);

      expect(status?.textContent?.trim()).to.equal('No search results.');
    });

    test('moves the transcript to the result the reader steps to', async () => {
      const el = await fixture<IARadioPlayer>(
        html`<ia-radio-player
          .config=${CONFIG}
          .searchResultsTranscript=${RESULTS}
          searchTerm="hit"
        ></ia-radio-player>`,
      );
      await elementUpdated(el);

      setTimeout(() =>
        childIn(el, 'ia-search-results-switcher').dispatchEvent(
          new CustomEvent('searchResultIndexChanged', {
            detail: { searchResultIndex: 1 },
          }),
        ),
      );

      const { detail } = await oneEvent(el, 'highlightedSearchResultChanged');
      expect(detail.searchResultIndex).to.equal(1);
      expect(
        childIn<IATranscriptView>(el, 'ia-transcript-view')
          .selectedSearchResultIndex,
      ).to.equal(1);
    });
  });
});

describe('IA Search Results Switcher', () => {
  async function switcherFixture(
    numberOfResults = 3,
  ): Promise<IASearchResultsSwitcher> {
    return fixture<IASearchResultsSwitcher>(
      html`<ia-search-results-switcher
        .numberOfResults=${numberOfResults}
      ></ia-search-results-switcher>`,
    );
  }

  function buttonIn(
    el: IASearchResultsSwitcher,
    id: string,
  ): HTMLButtonElement {
    const button = el.shadowRoot?.getElementById(id);
    if (!button) throw new Error(`no button with id ${id}`);
    return button as HTMLButtonElement;
  }

  test('counts from one for the reader', async () => {
    const el = await switcherFixture();

    expect(
      el.shadowRoot?.getElementById('current-result')?.textContent,
    ).to.equal('1');
    expect(
      el.shadowRoot?.getElementById('number-of-results')?.textContent,
    ).to.equal('3');
  });

  test('gives both arrows an accessible name', async () => {
    const el = await switcherFixture();

    // Two bare chevrons announce nothing on their own.
    expect(buttonIn(el, 'previous-button').getAttribute('aria-label')).to.equal(
      'Previous search result',
    );
    expect(buttonIn(el, 'next-button').getAttribute('aria-label')).to.equal(
      'Next search result',
    );
  });

  test('announces the position it moved to', async () => {
    const el = await switcherFixture();

    const status = el.shadowRoot?.querySelector('[role="status"]');
    expect(status?.textContent?.trim()).to.equal('Search result 1 of 3');

    buttonIn(el, 'next-button').dispatchEvent(new MouseEvent('click'));
    await elementUpdated(el);

    expect(status?.textContent?.trim()).to.equal('Search result 2 of 3');
  });

  test('steps forwards and reports the new index', async () => {
    const el = await switcherFixture();

    setTimeout(() =>
      buttonIn(el, 'next-button').dispatchEvent(new MouseEvent('click')),
    );

    const { detail } = await oneEvent(el, 'searchResultIndexChanged');
    expect(detail.searchResultIndex).to.equal(1);
  });

  test('wraps round to the first result past the last', async () => {
    const el = await switcherFixture(2);
    buttonIn(el, 'next-button').dispatchEvent(new MouseEvent('click'));

    buttonIn(el, 'next-button').dispatchEvent(new MouseEvent('click'));

    expect(el.currentResultIndex).to.equal(0);
  });

  test('wraps round to the last result before the first', async () => {
    const el = await switcherFixture(3);

    buttonIn(el, 'previous-button').dispatchEvent(new MouseEvent('click'));

    expect(el.currentResultIndex).to.equal(2);
  });

  test('goes back to the first result when the result count changes', async () => {
    const el = await switcherFixture(5);
    buttonIn(el, 'next-button').dispatchEvent(new MouseEvent('click'));
    expect(el.currentResultIndex).to.equal(1);

    el.numberOfResults = 2;
    await elementUpdated(el);

    expect(el.currentResultIndex).to.equal(0);
  });
});
