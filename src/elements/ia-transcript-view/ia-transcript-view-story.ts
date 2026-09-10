import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import { TranscriptConfig, TranscriptEntryConfig } from './models';
import { formatDuration } from './duration-formatter';
import type { IATranscriptView } from './ia-transcript-view';

import './ia-transcript-view';
import '@demo/story-template';

/** Lines of a fictional broadcast, with a couple of music breaks in it. */
const LINES: [text: string, isMusic: boolean][] = [
  ['Good evening, and welcome to the programme.', false],
  ['Tonight we are looking back at the early days of radio.', false],
  ['', true],
  ['Our first broadcast went out in nineteen twenty two.', false],
  ['It reached perhaps a few hundred listeners.', false],
  ['The transmitter sat in a shed behind the post office.', false],
  ['', true],
  ['By the end of the decade the audience was in the millions.', false],
  ['Whole families would gather around a single set.', false],
  ['The evening schedule became a fixed point in the week.', false],
  ['Announcers wore evening dress, though nobody could see them.', false],
  ['', true],
  [
    'We will hear from some of those early broadcasters after the break.',
    false,
  ],
  ['Stay with us.', false],
  ['And now, the news.', false],
];

const SECONDS_PER_ENTRY = 6;

/** Builds a transcript, optionally marking some entries as search hits. */
function buildTranscript(searchTerm: string): TranscriptConfig {
  let matchIndex = 0;

  const entries = LINES.map(([text, isMusic], i) => {
    const matched =
      searchTerm !== '' &&
      !isMusic &&
      text.toLowerCase().includes(searchTerm.toLowerCase());

    let searchMatchIndex;
    if (matched) {
      searchMatchIndex = matchIndex;
      matchIndex += 1;
    }

    return new TranscriptEntryConfig(
      i,
      i * SECONDS_PER_ENTRY,
      i * SECONDS_PER_ENTRY + SECONDS_PER_ENTRY - 1,
      text,
      isMusic,
      searchMatchIndex,
    );
  });

  return new TranscriptConfig(entries);
}

const TOTAL_SECONDS = LINES.length * SECONDS_PER_ENTRY;

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Height',
    cssVariable: '--ia-theme-transcript-height',
    defaultValue: 200,
    inputType: 'range',
    min: 80,
    max: 400,
    step: 10,
    unit: 'px',
  },
  {
    label: 'Text colour',
    cssVariable: '--ia-theme-transcript-normal-text-color',
    defaultValue: '#808080',
    inputType: 'color',
  },
  {
    label: 'Active text colour',
    cssVariable: '--ia-theme-transcript-active-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Selected result border',
    cssVariable: '--ia-theme-transcript-search-result-active-border-color',
    defaultValue: '#008000',
    inputType: 'color',
  },
  {
    label: 'Timestamp colour',
    cssVariable: '--ia-theme-transcript-time-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
];

const propInputSettings: PropInputSettings<IATranscriptView>[] = [
  {
    label: 'Show context zones',
    propertyName: 'showContextZones',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Autoscroll',
    propertyName: 'autoScroll',
    defaultValue: true,
    inputType: 'radio',
    radioOptions: [true, false],
  },
];

@customElement('ia-transcript-view-story')
export class IATranscriptViewStory extends LitElement {
  @state() private currentTime = 0;

  @state() private searchTerm = '';

  /**
   * Held as state and rebuilt only when the search term changes.
   *
   * The view resets its selected result and stops following playback whenever
   * it is handed a new `config`, and lit-html re-commits any non-primitive on
   * every render, so building this per render would reset the view constantly.
   */
  @state() private transcript: TranscriptConfig = buildTranscript('');

  @state() private selectedSearchResultIndex = 0;

  @state() private playing = false;

  private playbackTimer?: ReturnType<typeof setInterval>;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopPlayback();
  }

  private get resultCount(): number {
    return this.transcript.searchResults.length;
  }

  render() {
    return html`
      <story-template
        elementTag="ia-transcript-view"
        elementClassName="IATranscriptView"
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
        .defaultUsageProps=${'.config=${transcriptConfig}\n  .currentTime=${currentTime}'}
      >
        <ia-transcript-view
          slot="demo"
          class="transcript"
          .config=${this.transcript}
          .currentTime=${this.currentTime}
          .selectedSearchResultIndex=${this.selectedSearchResultIndex}
          @transcriptEntrySelected=${(
            e: CustomEvent<{ entry: TranscriptEntryConfig }>,
          ) => {
            this.currentTime = e.detail.entry.start;
          }}
        ></ia-transcript-view>

        <div slot="demo" class="panel">
          <div class="row">
            <button @click=${this.togglePlayback}>
              ${this.playing ? 'Pause' : 'Play'}
            </button>
            <input
              type="range"
              min="0"
              max=${TOTAL_SECONDS}
              step="1"
              .value=${String(this.currentTime)}
              @input=${(e: Event) => {
                this.currentTime = Number((e.target as HTMLInputElement).value);
              }}
            />
            <span class="value">${formatDuration(this.currentTime)}</span>
          </div>

          <div class="row">
            <label for="search">Search the transcript</label>
            <input
              id="search"
              type="text"
              placeholder="e.g. radio"
              .value=${this.searchTerm}
              @input=${this.handleSearchInput}
            />
          </div>

          ${this.searchTerm === ''
            ? html`<p class="hint">
                Type something to outline the matching lines.
              </p>`
            : html`<div class="row">
                <button
                  ?disabled=${this.resultCount === 0}
                  @click=${() => this.stepResult(-1)}
                >
                  Previous
                </button>
                <button
                  ?disabled=${this.resultCount === 0}
                  @click=${() => this.stepResult(1)}
                >
                  Next
                </button>
                <span class="value">
                  ${this.resultCount === 0
                    ? 'no matches'
                    : `${this.selectedSearchResultIndex + 1} of ${this.resultCount}`}
                </span>
              </div>`}
        </div>

        <div slot="usage-notes">
          <p>
            A transcript that follows playback. Drive it by setting
            <code>currentTime</code>; it highlights whatever is being spoken and
            scrolls to keep it in view.
          </p>
          <p>
            Scroll the transcript by hand and it stops following, showing a
            "Scroll text with audio" button to hand control back. It also picks
            following back up on its own after
            <code>scrollTimerDelay</code> milliseconds, fifteen seconds by
            default.
          </p>
          <p>
            Entries carrying a <code>searchMatchIndex</code> are outlined as
            search results, and the one matching
            <code>selectedSearchResultIndex</code> is outlined differently and
            scrolled to. Music stretches show
            <em>[Transcript unavailable]</em> instead of their text.
          </p>
          <p>
            Turn on "Show context zones" above to see the band the active entry
            is kept inside while scrolling.
          </p>
          <p>
            Hold <code>config</code> in a stable reference and replace it only
            when the transcript really changes. Assigning it resets
            <code>selectedSearchResultIndex</code> and stops the view following
            playback, and Lit re-commits any object binding on every render, so
            building the config inside <code>render()</code> resets the view
            each time it draws.
          </p>
        </div>
      </story-template>
    `;
  }

  private handleSearchInput(e: Event): void {
    this.searchTerm = (e.target as HTMLInputElement).value;
    this.transcript = buildTranscript(this.searchTerm);
    this.selectedSearchResultIndex = 0;
  }

  private stepResult(direction: number): void {
    const count = this.resultCount;
    if (count === 0) return;

    this.selectedSearchResultIndex =
      (this.selectedSearchResultIndex + direction + count) % count;
  }

  private togglePlayback(): void {
    if (this.playing) {
      this.stopPlayback();
      return;
    }

    this.playing = true;
    this.playbackTimer = setInterval(() => {
      this.currentTime = (this.currentTime + 1) % TOTAL_SECONDS;
    }, 500);
  }

  private stopPlayback(): void {
    clearInterval(this.playbackTimer);
    this.playbackTimer = undefined;
    this.playing = false;
  }

  static get styles(): CSSResultGroup {
    return css`
      .transcript {
        display: block;
        background-color: #151515;
        padding: 1rem;
        border-radius: 4px;
      }

      .panel {
        margin-top: 1em;
      }

      .row {
        display: flex;
        align-items: center;
        gap: 0.5em;
        margin-bottom: 0.5em;
      }

      .row label {
        min-width: 11em;
      }

      .row input[type='range'] {
        flex: 1 1 auto;
        max-width: 20em;
      }

      .value {
        min-width: 5em;
      }

      .hint {
        font-size: 0.9em;
        font-style: italic;
      }
    `;
  }
}
