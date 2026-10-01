import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { msg, str } from '@lit/localize';

import { formatPlaybackRate } from './playback-rate-formatter';
import { PlaybackMode } from './models';

import nextSectionIcon from './assets/next-section';
import pauseIcon from './assets/pause';
import playIcon from './assets/play';
import playbackSpeedIcon from './assets/playback-speed';
import previousSectionIcon from './assets/previous-section';
import replayIcon from './assets/replay';
import skipAheadIcon from './assets/skip-ahead';
import volumeFullIcon from './assets/volume-full';
import volumeMediumIcon from './assets/volume-medium';
import volumeMuteIcon from './assets/volume-mute';

/**
 * Event names emitted by this component
 */
const Events = {
  PlaybackRateChange: 'playbackRateChange',
  VolumeChange: 'volumeChange',
  BackButtonPressed: 'back-button-pressed',
  ForwardButtonPressed: 'forward-button-pressed',
  PlayPauseButtonPressed: 'play-pause-button-pressed',
  PrevSectionButtonPressed: 'prev-section-button-pressed',
  NextSectionButtonPressed: 'next-section-button-pressed',
};

/** The rate the controls start at, and the fallback for an unusable one */
const DEFAULT_PLAYBACK_RATE = 1;

/** How much one press of the speed button moves the playback rate */
const PLAYBACK_RATE_STEP = 0.25;

/**
 * The slowest rate the speed button offers, and the one it wraps back around
 * to once it passes the top.
 */
const MIN_PLAYBACK_RATE = 0.5;

/**
 * The fastest rate the speed button offers. Pressing it here is what sends the
 * rate back round to the slowest.
 */
const MAX_PLAYBACK_RATE = 2;

/** How much one press of the volume button moves the volume */
const VOLUME_STEP = 0.25;

/**
 * The transport controls for a player: play and pause, skip back and forward
 * ten seconds, jump between sections, and cycle the speed and volume.
 *
 * The element owns no playback itself. It reports presses and lets whatever is
 * playing the audio decide what to do with them.
 */
@customElement('ia-playback-controls')
export class IAPlaybackControls extends LitElement {
  /** Whether the track is playing or paused */
  @property({ type: String }) playbackMode: PlaybackMode = PlaybackMode.paused;

  /** Playback speed multiplier, where 1 is normal speed */
  @property({ type: Number }) playbackRate = DEFAULT_PLAYBACK_RATE;

  /** Playback volume, from 0 (muted) to 1 (full) */
  @property({ type: Number }) volume = 1;

  render(): TemplateResult {
    return html`
      <div class="container">
        <div class="vertical-button-stack playback-speed">
          <div class="vertical-button-container">
            <button
              id="playback-rate-btn"
              class="unstyled-button"
              aria-label=${this.playbackRateLabel}
              @click=${this.handlePlaybackRateChange}
            >
              ${playbackSpeedIcon}
            </button>
          </div>
          <div class="vertical-button-value" aria-hidden="true">
            ${this.formattedPlaybackRate}x
          </div>
        </div>

        <button
          id="prev-section-btn"
          class="jump-btn unstyled-button"
          aria-label=${msg('Previous section')}
          @click=${this.handlePrevSectionButton}
        >
          ${previousSectionIcon}
        </button>

        <button
          id="back-btn"
          class="jump-btn unstyled-button"
          aria-label=${msg('Skip back ten seconds')}
          @click=${this.handleBackButton}
        >
          ${replayIcon}
        </button>

        <button
          id="play-pause-btn"
          aria-label=${this.isPlaying ? msg('Pause') : msg('Play')}
          @click=${this.handlePlayPauseButton}
        >
          ${this.playPauseButtonIcon}
        </button>

        <button
          id="forward-btn"
          class="jump-btn unstyled-button"
          aria-label=${msg('Skip ahead ten seconds')}
          @click=${this.handleForwardButton}
        >
          ${skipAheadIcon}
        </button>

        <button
          id="next-section-btn"
          class="jump-btn unstyled-button"
          aria-label=${msg('Next section')}
          @click=${this.handleNextSectionButton}
        >
          ${nextSectionIcon}
        </button>

        <div class="vertical-button-stack volume">
          <div class="vertical-button-container">
            <button
              id="volume-control-btn"
              class="unstyled-button"
              aria-label=${this.volumeLabel}
              @click=${this.handleVolumeChange}
            >
              ${this.volumeButtonIcon}
            </button>
          </div>
          <div class="vertical-button-value" aria-hidden="true">
            ${this.volumePercent}%
          </div>
        </div>
      </div>
    `;
  }

  private get isPlaying(): boolean {
    return this.playbackMode === PlaybackMode.playing;
  }

  /**
   * The volume held to the 0 to 1 range the controls can represent.
   *
   * `volume` is a public property, so it can arrive out of range or as
   * something that isn't a number at all. Everything that displays, announces
   * or steps the volume reads it through here, so an impossible value never
   * reaches the screen reader.
   */
  private get clampedVolume(): number {
    return Math.min(Math.max(this.volume || 0, 0), 1);
  }

  /** The volume as a whole number, for display and for screen readers */
  private get volumePercent(): number {
    return Math.round(this.clampedVolume * 100);
  }

  /**
   * The accessible name for the speed button.
   *
   * The rate is left bare rather than followed by a unit like "times", because
   * `@lit/localize` has no plural support, so a unit baked into the string
   * reads wrong at 1 and translators have no way to correct it. The visible
   * label beside the button carries the "x".
   */
  private get playbackRateLabel(): string {
    return msg(str`Playback speed, currently ${this.formattedPlaybackRate}`);
  }

  /**
   * The playback rate written for the reader's locale, so the quarter steps
   * use whatever decimal separator they expect rather than always a point.
   *
   * `playbackRate` is a public property, so it can arrive as something that
   * isn't a usable number. Everything that displays or announces the rate
   * reads it through here, so `NaN` never reaches the screen reader. Rates
   * outside the range the button steps through are shown as they are: they
   * are still rates a media element will play at.
   */
  private get formattedPlaybackRate(): string {
    const rate = Number.isFinite(this.playbackRate)
      ? this.playbackRate
      : DEFAULT_PLAYBACK_RATE;

    return formatPlaybackRate(rate);
  }

  /**
   * The accessible name for the volume button.
   *
   * "percent" is safe to include, unlike a pluralised unit: it reads correctly
   * at every value.
   */
  private get volumeLabel(): string {
    return msg(str`Volume, currently ${this.volumePercent} percent`);
  }

  private get playPauseButtonIcon(): TemplateResult {
    return this.isPlaying ? pauseIcon : playIcon;
  }

  private get volumeButtonIcon(): TemplateResult {
    if (this.clampedVolume <= 0) return volumeMuteIcon;
    if (this.clampedVolume >= 1) return volumeFullIcon;
    return volumeMediumIcon;
  }

  /**
   * Steps the playback rate up, wrapping back to the slowest once it reaches
   * the fastest.
   *
   * The rate is clamped on the way in as well as the way out, so a rate set
   * from outside the range lands back on the documented steps rather than
   * drifting off the grid, overshooting the top, or climbing forever.
   */
  private handlePlaybackRateChange(): void {
    const current = Math.max(
      this.playbackRate || MIN_PLAYBACK_RATE,
      MIN_PLAYBACK_RATE,
    );
    this.playbackRate =
      current >= MAX_PLAYBACK_RATE
        ? MIN_PLAYBACK_RATE
        : Math.min(current + PLAYBACK_RATE_STEP, MAX_PLAYBACK_RATE);

    this.dispatchEvent(
      new CustomEvent<{ playbackRate: number }>(Events.PlaybackRateChange, {
        detail: { playbackRate: this.playbackRate },
      }),
    );
  }

  /** Steps the volume up, wrapping round to muted once it passes full. */
  private handleVolumeChange(): void {
    const current = this.clampedVolume;
    this.volume = current >= 1 ? 0 : Math.min(current + VOLUME_STEP, 1);

    this.dispatchEvent(
      new CustomEvent<{ volume: number }>(Events.VolumeChange, {
        detail: { volume: this.volume },
      }),
    );
  }

  private handleBackButton(): void {
    this.dispatchEvent(new Event(Events.BackButtonPressed));
  }

  private handleForwardButton(): void {
    this.dispatchEvent(new Event(Events.ForwardButtonPressed));
  }

  private handlePrevSectionButton(): void {
    this.dispatchEvent(new Event(Events.PrevSectionButtonPressed));
  }

  private handleNextSectionButton(): void {
    this.dispatchEvent(new Event(Events.NextSectionButtonPressed));
  }

  private handlePlayPauseButton(): void {
    this.playbackMode = this.isPlaying
      ? PlaybackMode.paused
      : PlaybackMode.playing;

    this.dispatchEvent(new Event(Events.PlayPauseButtonPressed));
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --playback-controls-icon-color--: var(
          --ia-theme-playback-controls-icon-color,
          #fff
        );
        --playback-controls-play-icon-color--: var(
          --ia-theme-playback-controls-play-icon-color,
          #333
        );
        --playback-controls-play-button-color--: var(
          --ia-theme-playback-controls-play-button-color,
          #fff
        );
        --playback-controls-play-button-diameter--: var(
          --ia-theme-playback-controls-play-button-diameter,
          4rem
        );

        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 0.25rem;
        padding-right: 0.25rem;
      }

      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--playback-controls-icon-color--);
        width: 100%;
      }

      .vertical-button-stack {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .vertical-button-container {
        text-align: center;
      }

      .vertical-button-container button,
      .vertical-button-container svg {
        vertical-align: bottom;
      }

      .vertical-button-value {
        font-size: 0.7em;
        line-height: 1.4em;
        text-align: center;
      }

      #play-pause-btn {
        border-radius: 50%;
        /* Buttons are border-box, so the UA's default padding would eat into
           the icon's content box and shrink the glyph relative to the circle
           by a different amount at every diameter. */
        padding: 0;
        height: var(--playback-controls-play-button-diameter--);
        width: var(--playback-controls-play-button-diameter--);
        border: none;
        background-color: var(--playback-controls-play-button-color--);
        color: var(--playback-controls-play-icon-color--);
        vertical-align: middle;
      }

      #play-pause-btn:active {
        opacity: 0.75;
      }

      #play-pause-btn svg {
        width: 100%;
        height: 100%;
      }

      .unstyled-button {
        background: none;
        border: none;
        margin: 0;
        padding: 0;
        /* Buttons don't inherit color from their parent, so the icons'
           currentColor needs it passed down explicitly. */
        color: inherit;
      }

      button {
        cursor: pointer;
      }

      .jump-btn:active {
        opacity: 0.75;
      }
    `;
  }
}
