import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import type { AudioSource } from './models';

/**
 * Event names emitted by this component
 */
const Events = {
  TimeUpdate: 'timeupdate',
  DurationChange: 'durationchange',
  PlaybackStarted: 'playbackStarted',
  PlaybackPaused: 'playbackPaused',
  CanPlay: 'canplay',
  Error: 'error',
};

/**
 * A declarative wrapper around the native `<audio>` element.
 *
 * `HTMLAudioElement` is imperative and its events do not cross a shadow root
 * boundary, so this element exposes playback as reactive properties and
 * re-dispatches the events consumers care about from the host.
 *
 * The element renders nothing visible unless `showControls` is set.
 */
@customElement('ia-audio-element')
export class IAAudioElement extends LitElement {
  /** Whether to show the browser's native playback controls */
  @property({ type: Boolean }) showControls = false;

  /** Playback speed multiplier, where 1 is normal speed */
  @property({ type: Number }) playbackRate = 1;

  /** Playback volume, from 0 (muted) to 1 (full) */
  @property({ type: Number }) volume = 1;

  /** The sources to offer the browser, in order of preference */
  @property({ type: Array }) sources: AudioSource[] = [];

  @query('audio') private audioElement?: HTMLAudioElement | null;

  /**
   * Length of the loaded track in seconds.
   *
   * Matches `HTMLMediaElement.duration`, so it is `NaN` until the browser has
   * read the track's metadata, and can be `Infinity` for a stream. Check with
   * `Number.isFinite` before doing arithmetic on it. Returns 0 only before the
   * element has rendered at all.
   */
  get duration(): number {
    return this.audioElement?.duration ?? 0;
  }

  /** Playback position within the track in seconds */
  get currentTime(): number {
    return this.audioElement?.currentTime ?? 0;
  }

  /** Reloads the current sources, e.g. after changing them */
  load(): void {
    if (!this.audioElement) return;

    this.audioElement.load();
    // Loading resets the playback rate, so it has to be applied again.
    this.audioElement.playbackRate = this.playbackRate;
  }

  /**
   * Starts playback.
   *
   * `HTMLMediaElement.play()` returns a promise that rejects when the browser
   * blocks playback (autoplay policy), when a `pause()` interrupts the request,
   * and when no source can be decoded. The rejection is swallowed rather than
   * left floating, so watch the events to know what happened: `playbackStarted`
   * means playback began, and `error` means the browser could not load a
   * source.
   */
  play(): void {
    this.audioElement?.play().catch(() => {});
  }

  /** Pauses playback */
  pause(): void {
    this.audioElement?.pause();
  }

  /** Jumps to an absolute position in the track */
  seekTo(seconds: number): void {
    if (!this.audioElement) return;
    this.audioElement.currentTime = seconds;
  }

  /** Jumps forwards or backwards relative to the current position */
  seekBy(seconds: number): void {
    if (!this.audioElement) return;
    this.audioElement.currentTime += seconds;
  }

  render(): TemplateResult {
    return html`
      <audio
        ?controls=${this.showControls}
        .volume=${this.volume}
        .playbackRate=${this.playbackRate}
        @timeupdate=${this.handleTimeChange}
        @durationchange=${this.handleDurationChange}
        @play=${this.playbackStarted}
        @pause=${this.playbackPaused}
        @canplay=${this.canPlay}
        @error=${this.handleMediaError}
      >
        ${this.sources.map(
          (source) =>
            html`<source
              src=${source.url}
              type=${source.mimetype}
              @error=${this.handleSourceError}
            />`,
        )}
      </audio>
    `;
  }

  private handleDurationChange(e: Event): void {
    const target = e.target as HTMLAudioElement;
    this.dispatchEvent(
      new CustomEvent<{ duration: number }>(Events.DurationChange, {
        detail: { duration: target.duration },
      }),
    );
  }

  private handleTimeChange(e: Event): void {
    const target = e.target as HTMLAudioElement;
    this.dispatchEvent(
      new CustomEvent<{ currentTime: number }>(Events.TimeUpdate, {
        detail: { currentTime: target.currentTime },
      }),
    );
  }

  private playbackStarted(): void {
    this.dispatchEvent(new Event(Events.PlaybackStarted));
  }

  private playbackPaused(): void {
    this.dispatchEvent(new Event(Events.PlaybackPaused));
  }

  private canPlay(): void {
    this.dispatchEvent(new Event(Events.CanPlay));
  }

  /**
   * Fired by the `<audio>` itself when the resource it committed to turns out
   * to be unplayable. It carries a `MediaError` describing what went wrong.
   */
  private handleMediaError(e: Event): void {
    this.emitError((e.target as HTMLAudioElement).error);
  }

  /**
   * Fired by a `<source>` the browser could not use. The browser walks the
   * sources in order, so one failing only matters once there are none left to
   * try, which it signals by dropping to `NETWORK_NO_SOURCE`. It reports no
   * `MediaError` on this path.
   */
  private handleSourceError(): void {
    if (this.audioElement?.networkState !== HTMLMediaElement.NETWORK_NO_SOURCE)
      return;

    this.emitError(null);
  }

  private emitError(error: MediaError | null): void {
    this.dispatchEvent(
      new CustomEvent<{ error: MediaError | null }>(Events.Error, {
        detail: { error },
      }),
    );
  }
}
