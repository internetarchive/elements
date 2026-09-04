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
import { msg } from '@lit/localize';

import themeStyles from '@src/themes/theme-styles';
import type { ImageViewerImage } from './models';

/**
 * A single image in the viewer's track.
 *
 * Owns everything about one image: its load state, its failure message, and
 * the link that opens the full-size file. The viewer creates these both from
 * its template and by hand during a drag, so the element works with no
 * per-instance setup beyond its properties.
 */
@customElement('ia-imgview-slide')
export class IAImageViewerSlide extends LitElement {
  @property({ type: Object }) image?: ImageViewerImage;

  @query('.main-image') private imageElement?: HTMLImageElement;

  @state() private loaded = false;

  @state() private failed = false;

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('image')) {
      this.loaded = false;
      this.failed = false;
    }
  }

  protected updated(): void {
    this.checkAlreadyResolved();
  }

  render(): TemplateResult | typeof nothing {
    if (!this.image) return nothing;

    const imageClasses = { 'main-image': true, loaded: this.loaded };
    const linkClasses = { 'image-link': true, failed: this.failed };

    return html`
      <a
        class=${classMap(linkClasses)}
        href=${this.image.url}
        target="_blank"
        rel="noopener noreferrer"
        @click=${this.onClick}
      >
        <img
          class=${classMap(imageClasses)}
          src=${this.image.url}
          alt=${this.image.title ?? this.image.name}
          data-image-name=${this.image.name}
          draggable="false"
          @load=${this.markLoaded}
          @error=${this.markFailed}
        />
        <div class="loading-spinner"></div>
        ${this.failed
          ? html`<p class="image-failed">
              ${msg('This image could not be loaded.')}
            </p>`
          : nothing}
      </a>
    `;
  }

  /**
   * Lets the viewer veto opening the image, which it does when the click is
   * the tail end of a swipe. A host can veto it too, to show the image its own
   * way instead of in a new tab.
   */
  private onClick(e: MouseEvent): void {
    if (!this.image) return;
    const allowed = this.dispatchEvent(
      new CustomEvent('imageActivated', {
        detail: { image: this.image },
        bubbles: true,
        cancelable: true,
      }),
    );
    if (!allowed) e.preventDefault();
  }

  private markLoaded = (): void => {
    this.loaded = true;
    this.failed = false;
    this.report('imageLoaded');
  };

  private markFailed = (): void => {
    this.loaded = false;
    this.failed = true;
    this.report('imageFailed');
  };

  /**
   * Tells the viewer what happened to this image, so it can pass failures on
   * to the host. Bubbles because the viewer listens on the track, which is
   * also where the slides it creates by hand during a drag end up.
   */
  private report(name: 'imageLoaded' | 'imageFailed'): void {
    if (!this.image) return;
    this.dispatchEvent(
      new CustomEvent(name, { detail: { image: this.image }, bubbles: true }),
    );
  }

  /**
   * Catches an image that finished before its listeners could fire, because
   * the browser had already resolved the request (from the cache or a
   * preload) by the time the element rendered.
   *
   * `complete` is true for a failed image as well as a loaded one, so the two
   * are told apart by `naturalWidth`, which stays 0 when the load failed.
   */
  private checkAlreadyResolved(): void {
    const img = this.imageElement;
    if (!img || this.loaded || this.failed || !img.complete) return;
    if (img.naturalWidth > 0) this.markLoaded();
    else this.markFailed();
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --imgview-slide-text-color--: var(
            --image-viewer-text-color,
            var(--true-white)
          );

          flex: 0 0 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .image-link {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          cursor: pointer;
        }

        .main-image {
          display: block;
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          opacity: 0;
          transition: opacity 0.2s ease;
          user-select: none;
        }

        .main-image.loaded {
          opacity: 1;
        }

        .main-image.loaded + .loading-spinner,
        .image-link.failed .loading-spinner {
          display: none;
        }

        .loading-spinner {
          position: absolute;
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-top-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .image-failed {
          position: absolute;
          margin: 0;
          padding: 0 1.6rem;
          color: var(--imgview-slide-text-color--);
          font-size: 1.4rem;
          text-align: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-spinner {
            animation: none;
          }

          .main-image {
            transition: none;
          }
        }
      `,
    ];
  }
}
