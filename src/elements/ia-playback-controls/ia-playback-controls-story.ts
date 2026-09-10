import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IAPlaybackControls } from './ia-playback-controls';

import './ia-playback-controls';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Icon colour',
    cssVariable: '--ia-theme-playback-controls-icon-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Play button colour',
    cssVariable: '--ia-theme-playback-controls-play-button-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Play icon colour',
    cssVariable: '--ia-theme-playback-controls-play-icon-color',
    defaultValue: '#333333',
    inputType: 'color',
  },
  {
    label: 'Play button size',
    cssVariable: '--ia-theme-playback-controls-play-button-diameter',
    defaultValue: 4,
    inputType: 'range',
    min: 2,
    max: 8,
    step: 0.5,
    unit: 'rem',
  },
];

const propInputSettings: PropInputSettings<IAPlaybackControls>[] = [
  {
    label: 'Playback mode',
    propertyName: 'playbackMode',
    defaultValue: 'paused',
    inputType: 'radio',
    radioOptions: ['paused', 'playing'],
  },
];

const MAX_LOG_ENTRIES = 8;

@customElement('ia-playback-controls-story')
export class IAPlaybackControlsStory extends LitElement {
  @state() private log: string[] = [];

  render() {
    return html`
      <story-template
        elementTag="ia-playback-controls"
        elementClassName="IAPlaybackControls"
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-playback-controls
          slot="demo"
          class="controls"
          @play-pause-button-pressed=${this.record}
          @back-button-pressed=${this.record}
          @forward-button-pressed=${this.record}
          @prev-section-button-pressed=${this.record}
          @next-section-button-pressed=${this.record}
          @playbackRateChange=${this.record}
          @volumeChange=${this.record}
        ></ia-playback-controls>

        <div slot="demo" class="panel">
          <div class="log-header">
            <strong>Events</strong>
            <button @click=${() => (this.log = [])}>Clear</button>
          </div>
          ${this.log.length === 0
            ? html`<p class="empty">Press a control to see what it emits.</p>`
            : html`<ol class="log">
                ${this.log.map((entry) => html`<li><code>${entry}</code></li>`)}
              </ol>`}
        </div>

        <div slot="usage-notes">
          <p>
            The transport controls for a player. The element doesn't play
            anything itself, it just reports presses and lets whatever owns the
            audio decide what to do.
          </p>
          <p>
            The speed and volume buttons cycle rather than opening a slider.
            Speed steps by 0.25 and wraps from 2&times; back to 0.5&times;;
            volume steps by 0.25 and wraps from full back to muted. Both keep
            their own state and report the new value on the event.
          </p>
          <p>
            The icons inherit <code>currentColor</code>, so the two colour
            variables above are all it takes to sit the controls on a light or a
            dark background. The demo above is on a dark panel because the
            defaults are meant for the radio player's dark chrome.
          </p>
        </div>
      </story-template>
    `;
  }

  private record(e: Event): void {
    const detail = (e as CustomEvent).detail;
    const suffix = detail ? ` ${JSON.stringify(detail)}` : '';
    this.log = [`${e.type}${suffix}`, ...this.log].slice(0, MAX_LOG_ENTRIES);
  }

  static get styles(): CSSResultGroup {
    return css`
      .controls {
        background-color: #151515;
        padding: 1rem 0.5rem;
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
      }

      .empty {
        font-size: 0.9em;
        font-style: italic;
      }
    `;
  }
}
