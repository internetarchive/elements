import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { ZoneOfSilence } from './models';
import type { IAWaveformProgress } from './ia-waveform-progress';

import './ia-waveform-progress';
import '@demo/story-template';

/**
 * Builds a waveform image so the demo doesn't have to reach for a real one.
 *
 * The bar heights come from a fixed formula rather than `Math.random`, so the
 * shape is the same on every reload and screenshots stay comparable.
 */
function waveformDataUri(barCount = 200): string {
  const bars = Array.from({ length: barCount }, (_, i) => {
    const wobble =
      Math.sin(i / 3) * 0.3 + Math.sin(i / 11) * 0.4 + Math.sin(i / 29) * 0.3;
    const height = Math.max(0.06, Math.abs(wobble)) * 100;
    const y = (100 - height) / 2;
    return `<rect x="${i * 2}" y="${y.toFixed(2)}" width="1" height="${height.toFixed(2)}" />`;
  }).join('');

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${barCount * 2} 100" preserveAspectRatio="none">` +
    `<g fill="#151515">${bars}</g></svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const WAVEFORM_URL = waveformDataUri();

const ZONES_OF_SILENCE: ZoneOfSilence[] = [
  { startPercent: 12, endPercent: 18 },
  { startPercent: 44, endPercent: 47 },
  { startPercent: 71, endPercent: 79 },
];

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Progress fill colour',
    cssVariable: '--ia-theme-waveform-fill-color',
    defaultValue: '#3272b6',
    inputType: 'color',
  },
  {
    label: 'Zone of silence colour',
    cssVariable: '--ia-theme-waveform-zone-of-silence-color',
    defaultValue: '#f6e652',
    inputType: 'color',
  },
  {
    label: 'Side margin',
    cssVariable: '--ia-theme-waveform-side-margin',
    defaultValue: 10,
    inputType: 'range',
    min: 0,
    max: 40,
    step: 1,
    unit: 'px',
  },
];

const propInputSettings: PropInputSettings<IAWaveformProgress>[] = [
  {
    label: 'Interactive',
    propertyName: 'interactive',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
];

@customElement('ia-waveform-progress-story')
export class IAWaveformProgressStory extends LitElement {
  @state() private percentComplete = 35;

  @state() private lastEmitted?: number;

  @state() private showZones = true;

  render() {
    return html`
      <story-template
        elementTag="ia-waveform-progress"
        elementClassName="IAWaveformProgress"
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
        .defaultUsageProps=${'.percentComplete=${35}\n  .waveformUrl=${waveformUrl}'}
      >
        <ia-waveform-progress
          slot="demo"
          interactive
          style="width: 100%; height: 80px"
          .waveformUrl=${WAVEFORM_URL}
          .percentComplete=${this.percentComplete}
          .zonesOfSilence=${this.showZones ? ZONES_OF_SILENCE : []}
          @valuechange=${(e: CustomEvent<{ value: number }>) => {
            this.lastEmitted = e.detail.value;
            this.percentComplete = e.detail.value;
          }}
        ></ia-waveform-progress>

        <div slot="demo" class="panel">
          <div class="row">
            <label for="percent">Playback position</label>
            <input
              id="percent"
              type="range"
              min="0"
              max="100"
              step="0.5"
              .value=${String(this.percentComplete)}
              @input=${(e: Event) => {
                this.percentComplete = Number(
                  (e.target as HTMLInputElement).value,
                );
              }}
            />
            <span class="value">${this.percentComplete.toFixed(1)}%</span>
          </div>

          <div class="row">
            <label for="zones">Zones of silence</label>
            <input
              id="zones"
              type="checkbox"
              .checked=${this.showZones}
              @change=${(e: Event) => {
                this.showZones = (e.target as HTMLInputElement).checked;
              }}
            />
          </div>

          <p class="readout">
            Last <code>valuechange</code>:
            ${this.lastEmitted === undefined
              ? 'none yet, drag across the waveform'
              : `${this.lastEmitted.toFixed(1)}%`}
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            Draws a waveform image with a progress fill over it. The element has
            no intrinsic size, so give it a width and a height.
          </p>
          <p>
            With <code>interactive</code> set, dragging across the waveform
            scrubs and emits <code>valuechange</code> with the new percentage.
            While a drag is in progress the element ignores
            <code>percentComplete</code> coming in from outside, so playback
            updates can't yank the handle out from under the listener. It picks
            the external value back up on release.
          </p>
          <p>
            <code>zonesOfSilence</code> marks stretches with no audio. Both
            bounds are percentages of the whole track, not seconds.
          </p>
        </div>
      </story-template>
    `;
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
        min-width: 10em;
      }

      .row input[type='range'] {
        flex: 1 1 auto;
        max-width: 20em;
      }

      .value {
        min-width: 4em;
      }

      .readout {
        font-size: 0.9em;
      }
    `;
  }
}
