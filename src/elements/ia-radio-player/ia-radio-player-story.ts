import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import {
  TranscriptConfig,
  TranscriptEntryConfig,
} from '@src/elements/ia-transcript-view/models';

import type { RadioPlayerConfig } from './models';
import type { IARadioPlayer } from './ia-radio-player';
import { TranscriptIndex } from './search/transcript-index';
import { LocalSearchBackend } from './search/backends/local-search-backend';
import { SearchHandler } from './search/search-handler';

import './ia-radio-player';
import '@demo/story-template';

/** Seconds each transcript line covers. */
const SECONDS_PER_ENTRY = 6;

/** Seconds between plucked notes in the generated demo track. */
const NOTE_SECONDS = 1.5;

/** Semitones from the root, a minor pentatonic, for the demo track's notes. */
const PENTATONIC = [0, 3, 5, 7, 10];

/** Lines of a fictional broadcast, with music breaks marked. */
const LINES: [text: string, isMusic: boolean][] = [
  ['Good evening, and welcome to the programme.', false],
  ['Tonight we look back at the early days of radio.', false],
  ['', true],
  ['The first broadcast went out in nineteen twenty two.', false],
  ['It reached perhaps a few hundred listeners.', false],
  ['The transmitter sat in a shed behind the post office.', false],
  ['', true],
  ['By the end of the decade the audience was in the millions.', false],
  ['Whole families gathered around a single radio set.', false],
  ['The evening schedule became a fixed point in the week.', false],
  ['', true],
  ['We hear from some of those early broadcasters after the break.', false],
  ['Stay with us.', false],
  ['And now, the news.', false],
];

const TOTAL_SECONDS = LINES.length * SECONDS_PER_ENTRY;

const TRANSCRIPT = new TranscriptConfig(
  LINES.map(
    ([text, isMusic], i) =>
      new TranscriptEntryConfig(
        i,
        i * SECONDS_PER_ENTRY,
        i * SECONDS_PER_ENTRY + SECONDS_PER_ENTRY - 1,
        text,
        isMusic,
      ),
  ),
);

/**
 * Builds a playable track so the demo works without fetching anything.
 *
 * Quiet plucked notes, one every {@link NOTE_SECONDS}, walking down a
 * pentatonic scale as the track runs. The pitch says where you are, so it is
 * obvious by ear that playback is running and that scrubbing moved somewhere
 * else, and the gap between notes keeps it off the ear for a whole minute.
 * Served as a blob rather than a data URI, since a minute of audio makes for a
 * very long string.
 */
function toneTrackUrl(seconds = TOTAL_SECONDS): string {
  const sampleRate = 8000;
  const sampleCount = sampleRate * seconds;
  const headerLength = 44;

  const buffer = new ArrayBuffer(headerLength + sampleCount);
  const view = new DataView(buffer);

  const writeAscii = (offset: number, text: string): void => {
    [...text].forEach((char, i) =>
      view.setUint8(offset + i, char.charCodeAt(0)),
    );
  };

  // Canonical 8-bit unsigned mono WAV header.
  writeAscii(0, 'RIFF');
  view.setUint32(4, 36 + sampleCount, true);
  writeAscii(8, 'WAVE');
  writeAscii(12, 'fmt ');
  view.setUint32(16, 16, true); // PCM header size
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate, true); // byte rate
  view.setUint16(32, 1, true); // block align
  view.setUint16(34, 8, true); // bits per sample
  writeAscii(36, 'data');
  view.setUint32(40, sampleCount, true);

  for (let i = 0; i < sampleCount; i += 1) {
    const secondsIn = i / sampleRate;

    const noteIndex = Math.floor(secondsIn / NOTE_SECONDS);
    const secondsIntoNote = secondsIn - noteIndex * NOTE_SECONDS;

    // Down one semitone per transcript entry, so two places in the track never
    // sound alike, over a pentatonic scale so consecutive notes sit together.
    const degree = PENTATONIC[noteIndex % PENTATONIC.length];
    const drop = Math.floor(secondsIn / SECONDS_PER_ENTRY);
    const frequency = 220 * 2 ** ((degree - drop) / 12);

    // Struck and left to ring, rather than a tone that never stops.
    const envelope = Math.exp(-3.2 * secondsIntoNote);
    // A touch of the second harmonic, which is what stops it sounding like the
    // bare sine it would otherwise be.
    const wave =
      (Math.sin(2 * Math.PI * frequency * secondsIn) +
        0.35 * Math.sin(4 * Math.PI * frequency * secondsIn)) /
      1.35;

    const amplitude = 14; // quiet, so it doesn't startle anyone
    const sample = 128 + Math.round(wave * envelope * amplitude);
    view.setUint8(headerLength + i, sample);
  }

  return URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' }));
}

/** A waveform image, drawn rather than fetched. */
function waveformDataUri(barCount = 240): string {
  const bars = Array.from({ length: barCount }, (_, i) => {
    const wobble =
      Math.sin(i / 4) * 0.3 + Math.sin(i / 13) * 0.4 + Math.sin(i / 31) * 0.3;
    const height = Math.max(0.06, Math.abs(wobble)) * 100;
    return `<rect x="${i * 2}" y="${((100 - height) / 2).toFixed(2)}" width="1" height="${height.toFixed(2)}" />`;
  }).join('');

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${barCount * 2} 100" preserveAspectRatio="none">` +
    `<g fill="#2b2b2b">${bars}</g></svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** A collection logo, drawn rather than fetched. */
const LOGO_URL = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">` +
    `<rect width="160" height="160" rx="12" fill="#2c2c2c"/>` +
    `<circle cx="80" cy="80" r="46" fill="none" stroke="#fff" stroke-width="6"/>` +
    `<circle cx="80" cy="80" r="12" fill="#fff"/>` +
    `<path d="M80 34 L80 12" stroke="#fff" stroke-width="6" stroke-linecap="round"/>` +
    `</svg>`,
)}`;

const CONFIG: RadioPlayerConfig = {
  title: 'The Early Days of Radio',
  date: 'Broadcast 14 March 1958',
  logoUrl: LOGO_URL,
  waveformUrl: waveformDataUri(),
  audioSources: [{ url: toneTrackUrl(), mimetype: 'audio/wav' }],
  quickSearches: ['radio', 'listeners', 'broadcast'],
};

/** Searching runs in the browser against the transcript above. */
const SEARCH_HANDLER = new SearchHandler(
  new LocalSearchBackend(new TranscriptIndex(TRANSCRIPT)),
  new TranscriptIndex(TRANSCRIPT),
);

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Title colour',
    cssVariable: '--ia-theme-radio-player-title-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Waveform fill',
    cssVariable: '--ia-theme-waveform-fill-color',
    defaultValue: '#3272b6',
    inputType: 'color',
  },
  {
    label: 'Transcript active text',
    cssVariable: '--ia-theme-transcript-active-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Waveform height',
    cssVariable: '--ia-theme-radio-player-waveform-height',
    defaultValue: 5,
    inputType: 'range',
    min: 2,
    max: 10,
    step: 0.5,
    unit: 'rem',
  },
];

const propInputSettings: PropInputSettings<IARadioPlayer>[] = [
  {
    label: 'Skip music sections',
    propertyName: 'skipMusicSections',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
];

const MAX_LOG_ENTRIES = 8;

@customElement('ia-radio-player-story')
export class IARadioPlayerStory extends LitElement {
  @state() private log: string[] = [];

  render() {
    return html`
      <story-template
        elementTag="ia-radio-player"
        elementClassName="IARadioPlayer"
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
        .defaultUsageProps=${'.config=${radioPlayerConfig}\n  .transcriptConfig=${transcript}\n  .searchHandler=${searchHandler}'}
      >
        <ia-radio-player
          slot="demo"
          class="player"
          .config=${CONFIG}
          .transcriptConfig=${TRANSCRIPT}
          .searchHandler=${SEARCH_HANDLER}
          @playPauseButtonPressed=${this.record}
          @searchExecuted=${this.record}
          @searchCleared=${this.record}
          @highlightedSearchResultChanged=${this.record}
          @timeChangedFromScrub=${this.record}
          @transcriptEntrySelected=${this.record}
          @jumpBackButtonPressed=${this.record}
          @jumpForwardButtonPressed=${this.record}
          @nextSectionButtonPressed=${this.record}
          @prevSectionButtonPressed=${this.record}
        ></ia-radio-player>

        <div slot="demo" class="panel">
          <div class="log-header">
            <strong>Events</strong>
            <button @click=${() => (this.log = [])}>Clear</button>
          </div>
          ${this.log.length === 0
            ? html`<p class="empty">
                Press play, drag the waveform, or search the transcript for
                something like "radio".
              </p>`
            : html`<ol class="log">
                ${this.log.map((entry) => html`<li><code>${entry}</code></li>`)}
              </ol>`}
        </div>

        <div slot="usage-notes">
          <p>
            The whole player: audio, transport controls, waveform, scrubber,
            search and transcript wired together. It owns no playback or search
            logic itself, it just coordinates the pieces.
          </p>
          <p>
            The audio here is a run of quiet generated notes that walk down in
            pitch as the track goes on, so you can hear that playback is running
            and that scrubbing moved somewhere else. The waveform and the logo
            are drawn rather than fetched, so the demo needs no network.
          </p>
          <p>
            Searching is wired to a
            <code>SearchHandler</code> over a <code>LocalSearchBackend</code>,
            which searches the transcript in the browser. Type at least two
            characters and press Enter. The arrows that appear step between
            matches and scroll the transcript to each one. Swap in a
            <code>FullTextSearchBackend</code> to search against archive.org
            instead.
          </p>
          <p>
            The three music breaks are marked on the waveform and as boundaries
            on the scrubber. The section buttons either side of the transport
            controls jump between those boundaries, and
            <code>skipMusicSections</code> above makes playback jump past them
            entirely.
          </p>
        </div>
      </story-template>
    `;
  }

  private record(e: Event): void {
    const { detail } = e as CustomEvent;
    const suffix = detail ? ` ${JSON.stringify(detail)}` : '';
    this.log = [`${e.type}${suffix}`, ...this.log].slice(0, MAX_LOG_ENTRIES);
  }

  static get styles(): CSSResultGroup {
    return css`
      .player {
        display: block;
        background-color: #151515;
        padding: 1rem;
        border-radius: 4px;
      }

      .panel {
        margin-top: 1em;
      }

      .log-header {
        display: flex;
        align-items: center;
        gap: 0.5em;
        margin-bottom: 0.5em;
      }

      .log {
        margin: 0;
        padding-left: 1.5em;
        font-size: 0.9em;
        word-break: break-all;
      }

      .empty {
        font-size: 0.9em;
        font-style: italic;
      }
    `;
  }
}
