import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { AudioSource } from './models';
import type { IAAudioElement } from './ia-audio-element';

import './ia-audio-element';
import '@demo/story-template';

import arrowOgg from './assets/arrow.ogg';
import arrowMp3 from './assets/arrow.mp3';
import springOgg from './assets/spring.ogg';
import springMp3 from './assets/spring.mp3';

const TRACKS: Record<string, AudioSource[]> = {
  arrow: [
    { url: arrowOgg, mimetype: 'audio/ogg' },
    { url: arrowMp3, mimetype: 'audio/mpeg' },
  ],
  spring: [
    { url: springOgg, mimetype: 'audio/ogg' },
    { url: springMp3, mimetype: 'audio/mpeg' },
  ],
};

const propInputSettings: PropInputSettings<IAAudioElement>[] = [
  {
    label: 'Show native controls',
    propertyName: 'showControls',
    defaultValue: true,
    inputType: 'radio',
    radioOptions: [true, false],
  },
];

@customElement('ia-audio-element-story')
export class IAAudioElementStory extends LitElement {
  @query('ia-audio-element') private audio?: IAAudioElement;

  @state() private trackName = 'arrow';

  @state() private currentTime = 0;

  @state() private duration = 0;

  @state() private playing = false;

  @state() private playbackRate = 1;

  @state() private volume = 1;

  render() {
    return html`
      <story-template
        elementTag="ia-audio-element"
        elementClassName="IAAudioElement"
        .propInputData=${{ settings: propInputSettings }}
        .defaultUsageProps=${'.sources=${[{ url: "/audio/track.mp3", mimetype: "audio/mpeg" }]}'}
      >
        <ia-audio-element
          slot="demo"
          showControls
          .sources=${TRACKS[this.trackName]}
          .playbackRate=${this.playbackRate}
          .volume=${this.volume}
          @timeupdate=${(e: CustomEvent<{ currentTime: number }>) => {
            this.currentTime = e.detail.currentTime;
          }}
          @durationchange=${(e: CustomEvent<{ duration: number }>) => {
            this.duration = e.detail.duration;
          }}
          @playbackStarted=${() => {
            this.playing = true;
          }}
          @playbackPaused=${() => {
            this.playing = false;
          }}
        ></ia-audio-element>

        <div slot="demo" class="panel">
          <div class="row">
            <button @click=${this.togglePlayback}>
              ${this.playing ? 'Pause' : 'Play'}
            </button>
            <button @click=${() => this.audio?.seekBy(-0.25)}>◀ 0.25s</button>
            <button @click=${() => this.audio?.seekBy(0.25)}>0.25s ▶</button>
            <button @click=${() => this.audio?.seekTo(0)}>Back to start</button>
          </div>

          <div class="row">
            <label for="track">Track</label>
            <select id="track" @change=${this.handleTrackChange}>
              <option value="arrow">arrow</option>
              <option value="spring">spring</option>
            </select>
          </div>

          <div class="row">
            <label for="rate">Playback rate</label>
            <input
              id="rate"
              type="range"
              min="0.5"
              max="2"
              step="0.25"
              .value=${String(this.playbackRate)}
              @input=${(e: Event) => {
                this.playbackRate = Number(
                  (e.target as HTMLInputElement).value,
                );
              }}
            />
            <span class="value">${this.playbackRate}&times;</span>
          </div>

          <div class="row">
            <label for="volume">Volume</label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              .value=${String(this.volume)}
              @input=${(e: Event) => {
                this.volume = Number((e.target as HTMLInputElement).value);
              }}
            />
            <span class="value">${Math.round(this.volume * 100)}%</span>
          </div>

          <p class="readout">
            <code>currentTime</code> ${this.currentTime.toFixed(2)}s /
            <code>duration</code>
            ${Number.isFinite(this.duration)
              ? `${this.duration.toFixed(2)}s`
              : 'unknown'}
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            A declarative wrapper around the native
            <code>&lt;audio&gt;</code> element. It renders nothing visible
            unless <code>showControls</code> is set, so most consumers drive it
            through its methods (<code>play</code>, <code>pause</code>,
            <code>load</code>, <code>seekTo</code>, <code>seekBy</code>) and
            listen for its events.
          </p>
          <p>
            Native media events do not cross a shadow root boundary, so this
            element re-dispatches the useful ones from the host:
            <code>timeupdate</code> and <code>durationchange</code> carry their
            value in <code>event.detail</code>, and
            <code>playbackStarted</code>, <code>playbackPaused</code> and
            <code>canplay</code> are plain events. <code>error</code> fires once
            the browser has run out of sources to try, so a single failing
            source with a working fallback after it stays quiet.
          </p>
          <p>
            <code>duration</code> follows
            <code>HTMLMediaElement.duration</code>, which means it is
            <code>NaN</code> until the metadata loads and can be
            <code>Infinity</code> for a stream. Check it with
            <code>Number.isFinite</code> before doing arithmetic, as the readout
            above does.
          </p>
          <p>
            Changing <code>sources</code> re-renders the
            <code>&lt;source&gt;</code> tags but does not reload the track on
            its own. Call <code>load()</code> afterwards, as the track selector
            above does.
          </p>
        </div>
      </story-template>
    `;
  }

  private togglePlayback(): void {
    if (this.playing) this.audio?.pause();
    else this.audio?.play();
  }

  private async handleTrackChange(e: Event): Promise<void> {
    this.trackName = (e.target as HTMLSelectElement).value;
    this.currentTime = 0;
    this.duration = 0;

    // Wait for the new <source> tags to render before telling the browser to
    // pick one up again.
    await this.updateComplete;
    this.audio?.load();
  }

  static get styles(): CSSResultGroup {
    return css`
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
        min-width: 8em;
      }

      .value {
        min-width: 3em;
      }

      .readout {
        font-size: 0.9em;
      }
    `;
  }
}
