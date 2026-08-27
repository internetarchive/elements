import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IAScrubberBar } from './ia-scrubber-bar';

import './ia-scrubber-bar';
import '@demo/story-template';

const SECTION_MARKERS = [8, 22, 37, 55, 78, 91];

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Played colour',
    cssVariable: '--ia-theme-scrubber-track-fill-color',
    defaultValue: '#3272b6',
    inputType: 'color',
  },
  {
    label: 'Thumb colour',
    cssVariable: '--ia-theme-scrubber-thumb-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Marker colour',
    cssVariable: '--ia-theme-scrubber-marker-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Thumb size',
    cssVariable: '--ia-theme-scrubber-thumb-diameter',
    defaultValue: 20,
    inputType: 'range',
    min: 8,
    max: 40,
    step: 1,
    unit: 'px',
  },
  {
    label: 'Track height',
    cssVariable: '--ia-theme-scrubber-track-height',
    defaultValue: 10,
    inputType: 'range',
    min: 2,
    max: 20,
    step: 1,
    unit: 'px',
  },
];

const propInputSettings: PropInputSettings<IAScrubberBar>[] = [
  {
    label: 'Expand section markers',
    propertyName: 'expandSectionMarkers',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
];

@customElement('ia-scrubber-bar-story')
export class IAScrubberBarStory extends LitElement {
  @state() private value = 30;

  @state() private showMarkers = true;

  @state() private interacting = false;

  @state() private lastEmitted?: number;

  @state() private simulating = false;

  private simulationTimer?: ReturnType<typeof setInterval>;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopSimulation();
  }

  render() {
    return html`
      <story-template
        elementTag="ia-scrubber-bar"
        elementClassName="IAScrubberBar"
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
        .defaultUsageProps=${'.value=${30}\n  .sectionMarkerPercentages=${[8, 22, 37]}'}
      >
        <ia-scrubber-bar
          slot="demo"
          class="scrubber"
          expandSectionMarkers
          .value=${this.value}
          .sectionMarkerPercentages=${this.showMarkers ? SECTION_MARKERS : []}
          @valuechange=${(e: CustomEvent<{ value: number }>) => {
            this.lastEmitted = e.detail.value;
            this.value = e.detail.value;
          }}
          @userInteractionStarted=${() => {
            this.interacting = true;
          }}
          @userInteractionEnded=${() => {
            this.interacting = false;
          }}
        ></ia-scrubber-bar>

        <div slot="demo" class="panel">
          <div class="row">
            <label for="markers">Section markers</label>
            <input
              id="markers"
              type="checkbox"
              .checked=${this.showMarkers}
              @change=${(e: Event) => {
                this.showMarkers = (e.target as HTMLInputElement).checked;
              }}
            />
          </div>

          <div class="row">
            <button @click=${this.toggleSimulation}>
              ${this.simulating ? 'Stop' : 'Simulate playback from outside'}
            </button>
            <span class="hint">
              Drag the scrubber while this runs to see it hold your position.
            </span>
          </div>

          <p class="readout">
            <code>value</code> ${this.value.toFixed(1)} &middot;
            <code>valuechange</code>
            ${this.lastEmitted === undefined
              ? 'none yet'
              : this.lastEmitted.toFixed(1)}
            &middot; ${this.interacting ? 'interacting' : 'idle'}
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            A range input styled as a playback scrubber. The section markers are
            laid over the track at the percentages you give it, and with
            <code>expandSectionMarkers</code> the two either side of the
            playhead point towards it.
          </p>
          <p>
            While the listener is scrubbing, <code>value</code> coming in from
            outside is ignored, so playback updates can't drag the thumb out
            from under them. Press the button above and start dragging to see
            it. The element picks the external value back up on release, and
            brackets the whole thing with
            <code>userInteractionStarted</code> and
            <code>userInteractionEnded</code> so the player knows to stop
            seeking meanwhile.
          </p>
          <p>
            The defaults are built for the radio player's dark chrome, which is
            why the demo sits on a dark panel.
          </p>
        </div>
      </story-template>
    `;
  }

  /**
   * Nudges `value` from outside on a timer, standing in for audio playing.
   *
   * Toggles rather than starting a second timer, and stops on disconnect, so
   * navigating away doesn't leave it writing to a detached element.
   */
  private toggleSimulation(): void {
    if (this.simulating) {
      this.stopSimulation();
      return;
    }

    this.simulating = true;
    this.simulationTimer = setInterval(() => {
      this.value = (this.value + 1) % 100;
    }, 100);
  }

  private stopSimulation(): void {
    clearInterval(this.simulationTimer);
    this.simulationTimer = undefined;
    this.simulating = false;
  }

  static get styles(): CSSResultGroup {
    return css`
      .scrubber {
        display: block;
        background-color: #151515;
        padding: 1.5rem 1rem;
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
        min-width: 10em;
      }

      .hint {
        font-size: 0.85em;
        font-style: italic;
      }

      .readout {
        font-size: 0.9em;
      }
    `;
  }
}
