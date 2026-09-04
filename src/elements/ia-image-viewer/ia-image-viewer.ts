import {
  css,
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { keyed } from 'lit/directives/keyed.js';
import { msg, str } from '@lit/localize';

import themeStyles from '@src/themes/theme-styles';
import { prefersReducedMotion } from '@src/util/prefers-reduced-motion';
import { ImageViewerGestures } from './image-viewer-gestures';
import type { ImageViewerImage, SlideDirection, WrapEdge } from './models';
import type { IAImageViewerSlide } from './ia-imgview-slide';
import './ia-imgview-slide';
import './ia-imgview-controls';

/** Detail carried by the load and failure events a slide reports. */
type SlideImageEvent = CustomEvent<{ image: ImageViewerImage }>;

/**
 * A swipeable image carousel.
 *
 * Shows one image at a time from a list, with previous/next buttons, a
 * counter, keyboard arrows, horizontal wheel scrolling and touch swipes.
 * Clicking an image opens it in a new tab.
 *
 * The viewer holds no opinion about where the images came from: it takes a
 * plain list of names and URLs, and reports the image it lands on through
 * `imageChanged` so a host can mirror that into its own URL or analytics.
 *
 * @fires imageChanged - The viewer settled on a new image.
 * @fires imageLoaded - An image the viewer showed finished loading.
 * @fires imageLoadFailed - An image the viewer showed could not be loaded.
 *   Fires once per image until it loads successfully or the set changes.
 * @fires imageActivated - An image was clicked. Cancelable: preventing it
 *   stops the default of opening the image in a new tab.
 */
@customElement('ia-image-viewer')
export class IAImageViewer extends LitElement {
  @property({ type: Array }) images: ImageViewerImage[] = [];

  /**
   * Name of the image to show. Changing it jumps straight to that image
   * without animating. An unknown name shows the first image.
   */
  @property({ type: String }) currentImageName?: string;

  /** Read by the gesture controller, which tracks touches against it. */
  @query('.image-area') imageArea?: HTMLElement;

  /** Read by the gesture controller, which translates it during a drag. */
  @query('.slide-track') slideTrack?: HTMLElement;

  /** Read by the gesture controller to navigate relative to the current image. */
  @state() currentIndex = 0;

  @state() private animating = false;

  /**
   * Incremented when an animation is interrupted to force the track element to
   * be recreated via the `keyed()` directive, which guarantees the CSS
   * animation restarts even if the direction is the same.
   */
  @state() private slideGeneration = 0;

  /** Which edge just wrapped, if any. Drives the glow indicator. */
  @state() private wrapEdge: WrapEdge | null = null;

  /**
   * Images already reported as failed, so a broken image isn't counted again
   * every time the viewer passes over it. Navigating back re-fires `error` on
   * the recreated element, and the neighbouring slides staged during an
   * animation or a drag load the same image too, so without this a single
   * broken derivative reports several times a session.
   *
   * Cleared when the image set changes, which is the point a name stops
   * standing for the same file.
   */
  private reportedFailures = new Set<string>();

  private slideTarget: number | null = null;

  private slideDirection: SlideDirection | null = null;

  private gestures = new ImageViewerGestures(this);

  get imageCount(): number {
    return this.images.length;
  }

  /** The image currently on screen, if there is one. */
  get currentImage(): ImageViewerImage | undefined {
    return this.images[this.currentIndex];
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('images') || changed.has('currentImageName')) {
      const requested = this.currentImageName
        ? this.images.findIndex((i) => i.name === this.currentImageName)
        : -1;
      this.currentIndex = requested >= 0 ? requested : 0;

      this.animating = false;
      this.slideGeneration = 0;
      this.slideTarget = null;
      this.slideDirection = null;
      this.wrapEdge = null;
      this.reportedFailures.clear();
      this.preloadAdjacentImages();
    }
  }

  render(): TemplateResult | typeof nothing {
    if (this.images.length === 0) return nothing;

    const { dragging } = this.gestures;
    const current = this.images[this.currentIndex];
    const showControls = this.images.length > 1;

    const trackClasses = {
      'slide-track': true,
      'sliding-next':
        this.animating && !dragging && this.slideDirection === 'next',
      'sliding-prev':
        this.animating && !dragging && this.slideDirection === 'prev',
      dragging,
    };

    const prevIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    const nextIndex = (this.currentIndex + 1) % this.images.length;

    const slideTarget =
      this.animating && !dragging && this.slideTarget !== null
        ? this.images[this.slideTarget]
        : null;
    const prevImage = dragging ? this.images[prevIndex] : slideTarget;
    const nextImage = dragging ? this.images[nextIndex] : slideTarget;
    const showPrev =
      dragging || (slideTarget !== null && this.slideDirection === 'prev');
    const showNext =
      dragging || (slideTarget !== null && this.slideDirection === 'next');

    const displayIndex =
      this.animating && this.slideTarget !== null
        ? this.slideTarget
        : this.currentIndex;

    return html`
      <div class="viewer">
        <div class="image-area">
          ${this.wrapEdge
            ? html`<div
                class="wrap-glow ${this.wrapEdge === 'start'
                  ? 'glow-start'
                  : 'glow-end'}"
                @animationend=${this.onWrapGlowEnd}
              ></div>`
            : nothing}
          ${keyed(
            this.slideGeneration,
            html`<div
              class=${classMap(trackClasses)}
              @animationend=${this.onSlideEnd}
              @imageLoaded=${this.onImageLoaded}
              @imageFailed=${this.onImageFailed}
              @imageActivated=${this.onImageActivated}
            >
              ${showPrev && prevImage ? this.slideTemplate(prevImage) : nothing}
              ${this.slideTemplate(current)}
              ${showNext && nextImage ? this.slideTemplate(nextImage) : nothing}
            </div>`,
          )}
        </div>
        ${showControls
          ? html`
              <ia-imgview-controls
                .currentIndex=${displayIndex}
                .totalImages=${this.images.length}
                @showPrevious=${this.showPrevious}
                @showNext=${this.showNext}
              ></ia-imgview-controls>
            `
          : nothing}
        ${this.announcementTemplate}
      </div>
    `;
  }

  private slideTemplate(image: ImageViewerImage): TemplateResult {
    return html`<ia-imgview-slide .image=${image}></ia-imgview-slide>`;
  }

  /**
   * Announces the image to a screen reader, which otherwise gets nothing when
   * the counter and the picture change under it.
   */
  private get announcementTemplate(): TemplateResult {
    const current = this.images[this.currentIndex];
    const position = msg(
      str`Image ${this.currentIndex + 1} of ${this.images.length}`,
    );
    const label = current?.title ?? current?.name;
    return html`
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        ${label ? `${position}: ${label}` : position}
      </div>
    `;
  }

  /**
   * Passes a slide's load result on to the host, which is where reporting
   * belongs. The slide's own events stop at this shadow root, so they're
   * re-dispatched rather than allowed to escape.
   */
  private onImageLoaded(e: SlideImageEvent): void {
    // A load that succeeds clears the failure, so an image that breaks again
    // later is reported again rather than swallowed as a repeat.
    this.reportedFailures.delete(e.detail.image.name);
    this.dispatchEvent(
      new CustomEvent('imageLoaded', { detail: { image: e.detail.image } }),
    );
  }

  private onImageFailed(e: SlideImageEvent): void {
    const { image } = e.detail;
    if (this.reportedFailures.has(image.name)) return;
    this.reportedFailures.add(image.name);
    this.dispatchEvent(
      new CustomEvent('imageLoadFailed', { detail: { image } }),
    );
  }

  /**
   * Decides whether a click on a slide opens the image.
   *
   * Two things can stop it: the click is the tail end of a swipe, or the host
   * cancels the event to show the image its own way. The slide's event doesn't
   * cross this shadow root, so it's re-raised here for the host to see, and a
   * veto is passed back down to cancel the click.
   */
  private onImageActivated(e: SlideImageEvent): void {
    if (this.gestures.consumeSwipeTap()) {
      e.preventDefault();
      return;
    }
    const allowed = this.dispatchEvent(
      new CustomEvent('imageActivated', {
        detail: { image: e.detail.image },
        cancelable: true,
      }),
    );
    if (!allowed) e.preventDefault();
  }

  /**
   * Inserts the neighbouring slides around the current one so the touch target
   * element stays in the DOM (avoiding touchcancel). These aren't rendered
   * from the template, so they're marked for the gesture controller to clean
   * up. The dragging class shifts the track to centre on the middle slide.
   */
  insertDragSlides(): void {
    const track = this.slideTrack;
    if (!track) return;
    const prevIdx =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    const nextIdx = (this.currentIndex + 1) % this.images.length;

    track.insertBefore(
      this.createDragSlide(this.images[prevIdx]),
      track.firstChild,
    );
    track.appendChild(this.createDragSlide(this.images[nextIdx]));

    track.classList.add('dragging');
  }

  removeDragSlides(): void {
    const track = this.slideTrack;
    if (!track) return;
    track.querySelectorAll('[data-drag-slide]').forEach((el) => el.remove());
    track.classList.remove('dragging');
  }

  private createDragSlide(image: ImageViewerImage): IAImageViewerSlide {
    const slide = document.createElement(
      'ia-imgview-slide',
    ) as IAImageViewerSlide;
    slide.image = image;
    slide.dataset.dragSlide = '';
    return slide;
  }

  showNext(): void {
    this.settleIfAnimating();
    this.moveTo((this.currentIndex + 1) % this.images.length, 'next');
  }

  showPrevious(): void {
    this.settleIfAnimating();
    this.moveTo(
      (this.currentIndex - 1 + this.images.length) % this.images.length,
      'prev',
    );
  }

  /**
   * Starts the move to another image. With reduced motion there's no animation
   * to wait on, so the move lands immediately: nothing would fire the
   * `animationend` that otherwise commits it.
   */
  private moveTo(target: number, direction: SlideDirection): void {
    const wraps =
      direction === 'next'
        ? this.currentIndex === this.images.length - 1
        : this.currentIndex === 0;
    this.preloadAroundIndex(target);

    if (prefersReducedMotion()) {
      this.currentIndex = target;
      this.settleAtCurrentIndex();
      return;
    }

    this.slideTarget = target;
    this.slideDirection = direction;
    this.animating = true;
    this.wrapEdge = wraps ? (direction === 'next' ? 'end' : 'start') : null;
  }

  /**
   * Moves to the image a completed drag landed on. The drag has already
   * animated the track there, so this only updates state.
   */
  commitDrag(direction: SlideDirection): void {
    const wraps =
      direction === 'next'
        ? this.currentIndex === this.images.length - 1
        : this.currentIndex === 0;
    const step = direction === 'next' ? 1 : -1;
    this.currentIndex =
      (this.currentIndex + step + this.images.length) % this.images.length;
    if (wraps && !prefersReducedMotion()) {
      this.wrapEdge = direction === 'next' ? 'end' : 'start';
    }
    this.emitImageChanged();
  }

  /**
   * If an animation is in progress, immediately commit its target so the next
   * animation starts from the right position. Bumps the generation key to
   * force the track element to be recreated, which restarts the CSS animation.
   */
  settleIfAnimating(): void {
    if (!this.animating || this.slideTarget === null) return;
    this.currentIndex = this.slideTarget;
    this.slideGeneration++;
  }

  private onWrapGlowEnd(): void {
    this.wrapEdge = null;
  }

  private onSlideEnd(): void {
    if (this.slideTarget === null) return;
    this.currentIndex = this.slideTarget;
    this.settleAtCurrentIndex();
  }

  /** Finishes a move, however it was driven. */
  private settleAtCurrentIndex(): void {
    this.slideTarget = null;
    this.slideDirection = null;
    this.animating = false;
    this.gestures.animationSettled();
    this.emitImageChanged();
    this.preloadAdjacentImages();
  }

  private emitImageChanged(): void {
    const image = this.images[this.currentIndex];
    if (!image) return;
    this.dispatchEvent(
      new CustomEvent('imageChanged', {
        detail: { image, index: this.currentIndex },
      }),
    );
  }

  /**
   * Preloads the next and previous images around `currentIndex` so the first
   * navigation feels instant.
   */
  private preloadAdjacentImages(): void {
    this.preloadAroundIndex(this.currentIndex);
  }

  /**
   * Preloads images adjacent to the given index. Called both at rest (around
   * `currentIndex`) and at the start of a move (around the target) so rapid
   * navigation stays ahead of the browser cache.
   *
   * A preload that fails is deliberately not reported. These requests are
   * speculative and the viewer may never show them, so counting them would
   * inflate the failure rate with images nobody looked at. Navigating to a
   * broken image renders a real slide, whose `error` reports it then.
   */
  preloadAroundIndex(index: number): void {
    if (this.images.length <= 1) return;
    const next = (index + 1) % this.images.length;
    const prev = (index - 1 + this.images.length) % this.images.length;
    for (const idx of [next, prev]) {
      const img = new Image();
      img.src = this.images[idx].url;
    }
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --image-viewer-height--: var(--image-viewer-height, 100%);
          --image-viewer-max-width--: var(--image-viewer-max-width, none);
          --image-viewer-slide-duration--: var(
            --image-viewer-slide-duration,
            500ms
          );
          --image-viewer-glow-color--: var(
            --image-viewer-glow-color,
            rgba(255, 255, 255, 0.25)
          );
          --image-viewer-glow-width--: var(--image-viewer-glow-width, 100px);
          /*
           * The breakpoint the controls query against. Named so the query in
           * ia-imgview-controls resolves to this host rather than to whatever
           * container the consumer happens to have further up.
           */
          container: image-viewer / inline-size;

          display: block;
          height: var(--image-viewer-height--);
          max-width: var(--image-viewer-max-width--);
          margin: 0 auto;
        }

        .viewer {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .image-area {
          position: relative;
          flex: 1;
          min-height: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          touch-action: pan-y pinch-zoom;
        }

        .wrap-glow {
          position: absolute;
          top: 0;
          bottom: 0;
          width: var(--image-viewer-glow-width--);
          pointer-events: none;
          z-index: 2;
          animation: glow-fade 700ms ease-out both;
        }

        .glow-start {
          left: 0;
          background: linear-gradient(
            to right,
            var(--image-viewer-glow-color--),
            transparent
          );
        }

        .glow-end {
          right: 0;
          background: linear-gradient(
            to left,
            var(--image-viewer-glow-color--),
            transparent
          );
        }

        @keyframes glow-fade {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .slide-track {
          display: flex;
          width: 100%;
          height: 100%;
          flex-shrink: 0;
        }

        @keyframes slide-next {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes slide-prev {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .slide-track.dragging {
          transform: translateX(-100%);
        }

        .slide-track.sliding-next {
          animation: slide-next var(--image-viewer-slide-duration--) ease-in-out
            both;
        }

        .slide-track.sliding-prev {
          animation: slide-prev var(--image-viewer-slide-duration--) ease-in-out
            both;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          border: 0;
          overflow: hidden;
          white-space: nowrap;
          clip-path: inset(50%);
        }
      `,
    ];
  }
}
