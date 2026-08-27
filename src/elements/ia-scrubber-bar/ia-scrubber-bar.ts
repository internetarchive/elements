import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import { SectionMarkerMode } from './models';

import './ia-section-marker';

/**
 * Event names emitted by this component
 */
const Events = {
  ValueChange: 'valuechange',
  UserInteractionStarted: 'userInteractionStarted',
  UserInteractionEnded: 'userInteractionEnded',
};

/**
 * The keys that move a range input.
 *
 * Only these count as scrubbing. Tab in particular must not, since it takes
 * focus away and its keyup lands on whatever it moved to, never here.
 */
const VALUE_KEYS = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'PageUp',
  'PageDown',
]);

/**
 * The section boundaries either side of the playhead.
 *
 * `undefined` where there is no boundary on that side, which is the case at
 * the very start and the very end of the track.
 */
interface SurroundingMarkers {
  lower?: number;
  upper?: number;
}

/**
 * A range slider styled as a playback scrubber, with optional section markers
 * laid over the track.
 */
@customElement('ia-scrubber-bar')
export class IAScrubberBar extends LitElement {
  /** The current position along the track */
  @property({ type: Number }) value = 0;

  /** The lowest position the scrubber can reach */
  @property({ type: Number }) min = 0;

  /** The highest position the scrubber can reach */
  @property({ type: Number }) max = 100;

  /** How finely the scrubber can be moved */
  @property({ type: Number }) step = 0.1;

  /** Where to draw section boundaries, as percentages of the track */
  @property({ type: Array }) sectionMarkerPercentages: number[] = [];

  /** Whether the markers either side of the playhead point towards it */
  @property({ type: Boolean }) expandSectionMarkers = false;

  /** The accessible name for the slider */
  @property({ type: String }) label = msg('Playback position');

  /**
   * The position actually shown.
   *
   * `value` is driven from outside by whatever is playing the audio, but while
   * the listener is scrubbing their position wins. Keeping the two apart is
   * what stops playback updates fighting the drag.
   */
  @state() private currentValue = 0;

  private userIsInteracting = false;

  /** How far along the track the playhead is, as a percentage */
  get percentage(): number {
    const range = this.max - this.min;
    if (range === 0) return 0;

    return ((this.currentValue - this.min) / range) * 100;
  }

  render(): TemplateResult {
    const surrounding = this.surroundingMarkers;

    return html`
      <div class="container" style="--fill-percent--: ${this.percentage}%">
        <div class="color-fill"></div>

        <div class="marker-container">
          ${this.sectionMarkerPercentages.map(
            (markerPercent) => html`
              <ia-section-marker
                data-location=${markerPercent}
                style="left: ${markerPercent}%"
                .markerMode=${this.markerModeFor(markerPercent, surrounding)}
              ></ia-section-marker>
            `,
          )}
        </div>

        <input
          id="slider"
          type="range"
          aria-label=${this.label}
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(this.currentValue)}
          @mousedown=${this.interactionStarted}
          @mouseup=${this.interactionEnded}
          @touchstart=${this.interactionStarted}
          @touchend=${this.interactionEnded}
          @touchcancel=${this.interactionEnded}
          @keydown=${this.handleKeyDown}
          @keyup=${this.handleKeyUp}
          @blur=${this.handleBlur}
          @input=${this.handleSlide}
          @change=${this.handleSlide}
        />
      </div>
    `;
  }

  updated(changedProperties: PropertyValues): void {
    if (this.userIsInteracting || !changedProperties.has('value')) return;

    this.currentValue = this.value;
  }

  /**
   * The section boundaries immediately below and above the playhead.
   *
   * Returns nothing when the markers aren't meant to react to the playhead, so
   * every marker falls back to its resting state.
   */
  private get surroundingMarkers(): SurroundingMarkers {
    if (!this.expandSectionMarkers) return {};

    const sorted = this.sortedMarkers;

    return {
      lower: sorted.filter((percent) => percent <= this.currentValue).pop(),
      upper: sorted.find((percent) => percent > this.currentValue),
    };
  }

  /**
   * The marker percentages in ascending numeric order.
   *
   * Sorted on a copy with an explicit comparator: the default `sort()` orders
   * lexicographically, which puts 100 before 9, and it sorts in place, which
   * would reorder the caller's own array.
   */
  private get sortedMarkers(): number[] {
    return [...this.sectionMarkerPercentages].sort((a, b) => a - b);
  }

  private markerModeFor(
    markerPercent: number,
    surrounding: SurroundingMarkers,
  ): SectionMarkerMode {
    if (markerPercent === surrounding.upper) return SectionMarkerMode.left;
    if (markerPercent === surrounding.lower) return SectionMarkerMode.right;

    return SectionMarkerMode.neither;
  }

  private handleSlide(e: Event): void {
    this.currentValue = parseFloat((e.target as HTMLInputElement).value);

    this.dispatchEvent(
      new CustomEvent<{ value: number }>(Events.ValueChange, {
        detail: { value: this.currentValue },
      }),
    );
  }

  private interactionStarted(): void {
    this.userIsInteracting = true;
    this.dispatchEvent(new Event(Events.UserInteractionStarted));
  }

  /**
   * Starts an interaction when the slider is scrubbed from the keyboard.
   *
   * Without this, arrowing along the bar sets the value but leaves
   * `userIsInteracting` false, so the next playback tick snaps the thumb back
   * to the playhead mid-scrub.
   *
   * Guarded against the auto-repeat that holding a key produces, which would
   * otherwise emit a fresh `userInteractionStarted` on every repeat.
   */
  private handleKeyDown(e: KeyboardEvent): void {
    if (!VALUE_KEYS.has(e.key) || this.userIsInteracting) return;

    this.interactionStarted();
  }

  private handleKeyUp(e: KeyboardEvent): void {
    if (!VALUE_KEYS.has(e.key)) return;

    this.interactionEnded();
  }

  /**
   * Releases an interaction that focus left behind.
   *
   * A keyup can go missing, e.g. focus moves while the key is still down, and
   * an interaction left latched on would ignore playback updates for good.
   */
  private handleBlur(): void {
    if (!this.userIsInteracting) return;

    this.interactionEnded();
  }

  /**
   * Ends the interaction.
   *
   * Bound to `touchcancel` as well as `touchend`, because a touch the system
   * takes over never delivers `touchend`, and an interaction left latched on
   * would ignore playback updates from then on.
   */
  private interactionEnded(): void {
    this.userIsInteracting = false;
    this.dispatchEvent(new Event(Events.UserInteractionEnded));
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --scrubber-bar-height--: var(--ia-theme-scrubber-bar-height, 20px);
        --scrubber-marker-inset--: var(--ia-theme-scrubber-marker-inset, 10px);

        --scrubber-thumb-color--: var(--ia-theme-scrubber-thumb-color, #fff);
        --scrubber-thumb-diameter--: var(
          --ia-theme-scrubber-thumb-diameter,
          20px
        );
        --scrubber-thumb-border--: var(
          --ia-theme-scrubber-thumb-border,
          1px solid #000
        );
        --scrubber-thumb-border-radius--: var(
          --ia-theme-scrubber-thumb-border-radius,
          50%
        );
        /*
          Centres the thumb on the track. The thumb is content-box, so its
          border adds 1px above and below the diameter, hence the extra -1px.
          Comes out at -6px for the default track and thumb sizes.
        */
        --scrubber-thumb-top-margin--: var(
          --ia-theme-scrubber-thumb-top-margin,
          calc(
            (
                var(--scrubber-track-height--) - var(
                    --scrubber-thumb-diameter--
                  )
              ) /
              2 - 1px
          )
        );

        --scrubber-track-height--: var(--ia-theme-scrubber-track-height, 10px);
        --scrubber-track-border--: var(
          --ia-theme-scrubber-track-border,
          1px solid #fff
        );
        --scrubber-track-border-radius--: var(
          --ia-theme-scrubber-track-border-radius,
          5px
        );
        --scrubber-track-color--: var(
          --ia-theme-scrubber-track-color,
          rgba(0, 0, 0, 0.1)
        );
        --scrubber-track-fill-color--: var(
          --ia-theme-scrubber-track-fill-color,
          #3272b6
        );

        /*
          How far off the bottom the track sits. The fill and the section
          markers both line up against this, so they follow the track when its
          height is themed. Comes out at 7px for the default sizes.
        */
        --scrubber-track-offset--: calc(
          (var(--scrubber-bar-height--) - var(--scrubber-track-height--)) / 2 +
            2px
        );
      }

      .container {
        position: relative;
        height: var(--scrubber-bar-height--);
      }

      /*
        The fill is a plain element rather than a track pseudo-element, so the
        played portion is just a hard gradient stop driven by a custom property.
      */
      .color-fill {
        height: var(--scrubber-track-height--);
        border-radius: 1em;
        position: absolute;
        bottom: var(--scrubber-track-offset--);
        left: 2px;
        right: -2px;
        background: linear-gradient(
          to right,
          var(--scrubber-track-fill-color--) 0%,
          var(--scrubber-track-fill-color--) var(--fill-percent--),
          var(--scrubber-track-color--) var(--fill-percent--),
          var(--scrubber-track-color--) 100%
        );
      }

      .marker-container {
        position: absolute;
        left: var(--scrubber-marker-inset--);
        right: var(--scrubber-marker-inset--);
        height: 100%;
      }

      ia-section-marker {
        position: absolute;
        width: 2rem;
        height: var(--scrubber-track-height--);
        bottom: var(--scrubber-track-offset--);
        /*
          The left offset puts the marker where it belongs, but the divider runs
          down the middle of the marker, so it shifts back by half its own width
          to line the divider up with that point.
        */
        transform: translateX(-50%);
      }

      input[type='range'] {
        -webkit-appearance: none;
        appearance: none;
        height: var(--scrubber-bar-height--);
        padding: 0;
        width: 100%;
        background: none;
        outline: none;
        position: absolute;
        bottom: 0;
      }

      input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        box-sizing: content-box;
        margin-top: var(--scrubber-thumb-top-margin--);
        background-color: var(--scrubber-thumb-color--);
        height: var(--scrubber-thumb-diameter--);
        width: var(--scrubber-thumb-diameter--);
        border-radius: var(--scrubber-thumb-border-radius--);
        border: var(--scrubber-thumb-border--);
        cursor: pointer;
      }

      input[type='range']::-moz-range-thumb {
        background-color: var(--scrubber-thumb-color--);
        height: var(--scrubber-thumb-diameter--);
        width: var(--scrubber-thumb-diameter--);
        border-radius: var(--scrubber-thumb-border-radius--);
        border: var(--scrubber-thumb-border--);
        cursor: pointer;
      }

      input[type='range']::-webkit-slider-runnable-track {
        border: var(--scrubber-track-border--);
        height: var(--scrubber-track-height--);
        border-radius: var(--scrubber-track-border-radius--);
      }

      input[type='range']::-moz-range-track {
        border: var(--scrubber-track-border--);
        height: var(--scrubber-track-height--);
        border-radius: var(--scrubber-track-border-radius--);
      }

      input[type='range']::-moz-range-progress {
        height: var(--scrubber-track-height--);
        border-radius: var(--scrubber-track-border-radius--);
      }
    `;
  }
}
