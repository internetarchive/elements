import {
  css,
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type { ZoneOfSilence } from './models';

/**
 * Event names emitted by this component
 */
const Events = {
  ValueChange: 'valuechange',
};

/**
 * Renders a waveform image with a progress fill over it, optionally marking
 * out the stretches of silence.
 *
 * When `interactive` is set, dragging anywhere across the waveform scrubs, and
 * the element emits `valuechange` with the new percentage.
 */
@customElement('ia-waveform-progress')
export class IAWaveformProgress extends LitElement {
  /** How far through the track playback is, as a percentage (0 to 100) */
  @property({ type: Number }) percentComplete = 0;

  /** URL of the waveform image to render */
  @property({ type: String }) waveformUrl = '';

  /** Whether dragging across the waveform scrubs the track */
  @property({ type: Boolean }) interactive = false;

  /** Stretches of the track with no audio, to mark on the waveform */
  @property({ type: Array }) zonesOfSilence: ZoneOfSilence[] = [];

  /**
   * The percentage actually rendered.
   *
   * `percentComplete` is driven from outside by whatever is playing the audio,
   * but while the listener is dragging, their position wins. Keeping the two
   * apart is what lets the drag survive the playback updates arriving
   * underneath it.
   */
  @state() private displayedPercent = 0;

  private userIsInteracting = false;

  @query('.container') private container?: HTMLElement | null;

  render(): TemplateResult {
    return html`
      <div class="container">
        <div id="fill" style="width: ${this.displayedPercent}%"></div>
        <img class="waveform-image" src=${this.waveformUrl} alt="" />
        ${this.zonesOfSilenceTemplate}
        ${this.interactive ? this.interactionCoverTemplate : nothing}
      </div>
    `;
  }

  private get zonesOfSilenceTemplate(): TemplateResult {
    return html`
      ${this.zonesOfSilence.map(
        (zone) => html`
          <div
            class="zone-of-silence"
            style="left: ${zone.startPercent}%; width: ${zone.endPercent -
            zone.startPercent}%"
          ></div>
        `,
      )}
    `;
  }

  private get interactionCoverTemplate(): TemplateResult {
    return html`
      <div
        id="dragcover"
        @mousedown=${this.dragStart}
        @mouseup=${this.dragEnd}
        @mouseleave=${this.dragEnd}
        @mousemove=${this.drag}
        @touchstart=${this.dragStart}
        @touchend=${this.dragEnd}
        @touchcancel=${this.dragEnd}
        @touchmove=${this.drag}
      ></div>
    `;
  }

  updated(changedProperties: PropertyValues): void {
    if (!changedProperties.has('percentComplete') || this.userIsInteracting) {
      return;
    }

    this.displayedPercent = this.percentComplete;
  }

  private drag(e: MouseEvent | TouchEvent): void {
    if (!this.userIsInteracting) return;
    this.updateDisplayedPercent(e);
  }

  /**
   * Only the primary mouse button scrubs.
   *
   * A right-click would otherwise seek the track on its way to opening the
   * context menu, and the menu swallows the `mouseup`, so the drag would stay
   * latched on afterwards.
   */
  private dragStart(e: MouseEvent | TouchEvent): void {
    if ('button' in e && e.button !== 0) return;

    this.userIsInteracting = true;
    this.updateDisplayedPercent(e);
  }

  /**
   * Ends the drag.
   *
   * Bound to `touchcancel` as well as `touchend`, because a touch taken over by
   * the system (an incoming call, a browser gesture) never delivers `touchend`,
   * and a drag left latched on would ignore playback updates from then on.
   */
  private dragEnd(): void {
    this.userIsInteracting = false;
  }

  private updateDisplayedPercent(e: MouseEvent | TouchEvent): void {
    const pageX = IAWaveformProgress.pageXFrom(e);
    if (pageX === undefined || !this.container) return;

    const bounds = this.container.getBoundingClientRect();
    if (bounds.width === 0) return;

    // `pageX` is measured from the document origin, so the container's own
    // viewport position has to be put back into document space before the two
    // can be subtracted.
    const offsetX = pageX - (bounds.left + window.scrollX);
    const percent = (offsetX / bounds.width) * 100;

    this.displayedPercent = Math.min(Math.max(percent, 0), 100);
    this.dispatchEvent(
      new CustomEvent<{ value: number }>(Events.ValueChange, {
        detail: { value: this.displayedPercent },
      }),
    );
  }

  /**
   * The horizontal page position of a pointer, from either flavour of event.
   *
   * A `TouchEvent` carries no `pageX` of its own, so the first touch supplies
   * it. A `touchend` has no touches left to read, which is why this can come
   * back undefined.
   */
  private static pageXFrom(e: MouseEvent | TouchEvent): number | undefined {
    if ('touches' in e) return e.touches[0]?.pageX;
    return e.pageX;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --waveform-fill-color--: var(--ia-theme-waveform-fill-color, #3272b6);
        --waveform-zone-of-silence-color--: var(
          --ia-theme-waveform-zone-of-silence-color,
          #f6e652
        );
        --waveform-side-margin--: var(--ia-theme-waveform-side-margin, 10px);

        display: inline-block;
      }

      #dragcover {
        width: 100%;
        height: 100%;
        position: absolute;
        touch-action: none;
      }

      .container {
        display: block;
        position: relative;
        background-color: white;
        height: 100%;
        margin-left: var(--waveform-side-margin--);
        margin-right: var(--waveform-side-margin--);
      }

      .waveform-image {
        width: 100%;
        height: 100%;
        position: absolute;
      }

      .zone-of-silence {
        position: absolute;
        top: 0;
        bottom: 0;
        background: linear-gradient(
          #000,
          #000 47%,
          var(--waveform-zone-of-silence-color--) 50%,
          #000 53%,
          #000 100%
        );
      }

      #fill {
        position: absolute;
        height: 100%;
        background-color: var(--waveform-fill-color--);
      }
    `;
  }
}
