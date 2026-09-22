import {
  css,
  unsafeCSS,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  PropertyValues,
  svg,
  SVGTemplateResult,
  TemplateResult,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { customElement } from '@src/util/custom-element';
import { msg } from '@lit/localize';

import themeStyles from '@src/themes/theme-styles';
import { maskedIcon } from '@src/util/masked-icon';

import audioIcon from './icons/audio.svg';
import collectionIcon from './icons/collection.svg';
import etreeIcon from './icons/etree.svg';
import imagesIcon from './icons/images.svg';
import searchIcon from './icons/search.svg';
import softwareIcon from './icons/software.svg';
import textsIcon from './icons/texts.svg';
import tvIcon from './icons/tv.svg';
import videoIcon from './icons/video.svg';
import webIcon from './icons/web.svg';

/** How long a mode change takes to fade. Drives both the CSS and the timer. */
const FADE_DURATION_MS = 250;

/** Fixed running order for the layers. See the note in render(). */
const LAYER_ORDER: LoadingStatus[] = ['ready', 'loading', 'success', 'error'];

export type LoadingStatus = 'ready' | 'loading' | 'success' | 'error';

/**
 * The mediatype glyphs this element ships. These are *icon* names, which do not
 * map one-to-one onto archive.org mediatype values — a consumer holding a
 * `MediaType` translates at its own call site (e.g. `movies` -> `video`).
 */
export type MediaTypeIcon =
  | 'audio'
  | 'collection'
  | 'etree'
  | 'images'
  | 'search'
  | 'software'
  | 'texts'
  | 'tv'
  | 'video'
  | 'web';

const MEDIATYPE_ICONS: Record<MediaTypeIcon, string> = {
  audio: audioIcon,
  collection: collectionIcon,
  etree: etreeIcon,
  images: imagesIcon,
  search: searchIcon,
  software: softwareIcon,
  texts: textsIcon,
  tv: tvIcon,
  video: videoIcon,
  web: webIcon,
};

/**
 * Renders an SVG indicator, which defaults to an animated circular indicator.
 *
 * In `loading` mode the middle of the ring resolves in this order:
 *   1. slotted `icon` content
 *   2. the `mediatype` glyph
 *   3. nothing, when `hideDots` is set
 *   4. three animated dots (the default)
 */
@customElement('ia-status-indicator')
export class IAStatusIndicator extends LitElement {
  /* An optional title to use for the loading state of the indicator. Will be used for screen readers. */
  @property({ type: String }) loadingTitle = msg('Loading...');

  /* An optional title to use for the success state of the indicator. Will be used for screen readers. */
  @property({ type: String }) successTitle = msg('Success');

  /* An optional title to use for the error state of the indicator. Will be used for screen readers. */
  @property({ type: String }) errorTitle = msg('Error');

  /* The state of the indicator that should be shown */
  @property({ type: String }) mode: LoadingStatus = 'loading';

  /* An optional mediatype glyph to render in the middle of the loading ring */
  @property({ type: String }) mediatype?: MediaTypeIcon;

  /* Renders a bare ring, with no dots in the middle. Ignored when a center icon is present. */
  @property({ type: Boolean }) hideDots = false;

  /* Whether a consumer has slotted their own center icon */
  @state() private hasSlottedIcon = false;

  /* The mode being faded out, if a change is currently in flight */
  @state() private _outgoingMode?: LoadingStatus;

  /* Set once the first render is done, so the element doesn't fade in on mount */
  @state() private _canAnimate = false;

  private _fadeTimer?: ReturnType<typeof setTimeout>;

  render(): TemplateResult {
    // Always in the same running order, so reversing a fade part way through
    // is an insert and a remove rather than a reorder. Reordering keyed nodes
    // moves them, which cancels the transitions they're in the middle of.
    const modes = LAYER_ORDER.filter(
      (mode) => mode === this.mode || mode === this._outgoingMode,
    );

    // Keyed on the mode so lit gives each one its own element. Reusing a
    // single element across modes would swap the artwork inside a node that
    // never leaves full opacity, and nothing would fade.
    return html`
      <div class="layers ${this._canAnimate ? 'animate' : ''}">
        ${repeat(
          modes,
          (mode) => mode,
          (mode) => this.layerTemplate(mode, mode === this.mode),
        )}
      </div>
    `;
  }

  /**
   * One mode's artwork, stacked in the same cell as the other layer so that a
   * mode change fades between them. At rest only the active layer exists; the
   * one being faded out is dropped as soon as the transition is over, so the
   * shadow tree holds a single mode's markup and a single `<title>`.
   */
  private layerTemplate(
    mode: LoadingStatus,
    isActive: boolean,
  ): TemplateResult {
    // `mode` is a public string attribute, so a consumer can hand us anything.
    // An unrecognised one draws nothing, the same as it always has.
    const content =
      {
        ready: () => this.placeholderTemplate,
        loading: () => this.loadingIndicatorTemplate,
        success: () => this.successIndicatorTemplate,
        error: () => this.errorIndicatorTemplate,
      }[mode]?.() ?? nothing;

    return html`<div
      class="layer ${isActive ? 'active' : 'outgoing'}"
      aria-hidden=${isActive ? nothing : 'true'}
    >
      ${content}
    </div>`;
  }

  willUpdate(changedProps: PropertyValues): void {
    if (!changedProps.has('mode')) return;
    // Hold on to the mode we're leaving so both can be on screen together for
    // the length of the fade.
    const previous = changedProps.get('mode') as LoadingStatus | undefined;
    if (previous === undefined || previous === this.mode) return;

    this._outgoingMode = previous;
    clearTimeout(this._fadeTimer);
    this._fadeTimer = setTimeout(() => {
      this._outgoingMode = undefined;
    }, FADE_DURATION_MS);
  }

  firstUpdated(): void {
    // Fading applies to mode changes, not to the element appearing. Waiting a
    // frame is what makes that true: enabling it inline would put the
    // transition in the element's very first computed style, and it would
    // fade up from nothing on mount.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._canAnimate = true;
      });
    });
  }

  disconnectedCallback(): void {
    clearTimeout(this._fadeTimer);
    // Nothing reschedules this timer, so leaving the mode set would strand the
    // outgoing layer on reconnect.
    this._outgoingMode = undefined;
    super.disconnectedCallback();
  }

  /**
   * The `ready` state: reserves the indicator's space without drawing, so a
   * consumer's layout doesn't shift once the indicator appears.
   */
  private get placeholderTemplate(): TemplateResult {
    return html`<div class="placeholder"></div>`;
  }

  /**
   * The asset URL for the current mediatype, if it maps to a glyph we ship.
   *
   * Unmapped values (e.g. archive.org's `account` or `data`) resolve to
   * undefined and degrade to the default dots rather than a broken mask.
   */
  private get mediatypeIconUrl(): string | undefined {
    if (!this.mediatype) return undefined;
    return MEDIATYPE_ICONS[this.mediatype];
  }

  /** Whether the middle of the ring is occupied by a glyph rather than dots */
  private get hasCenterIcon(): boolean {
    return this.hasSlottedIcon || !!this.mediatypeIconUrl;
  }

  /**
   * A circular loading indicator to render when processing.
   *
   * Two ring geometries are kept deliberately: the original 120x120 ring is
   * tuned for the dots, and the roomier 100x100 ring leaves space for a center
   * glyph. Keeping both means existing consumers see no visual change.
   */
  private get loadingIndicatorTemplate(): TemplateResult {
    const hasCenterIcon = this.hasCenterIcon;
    return html`
      <div class="indicator">
        ${hasCenterIcon ? this.iconRingSvg : this.dottedRingSvg}
        <span class="center" ?hidden=${!hasCenterIcon}>
          <slot name="icon" @slotchange=${this.handleIconSlotChange}>
            ${this.mediatypeIconTemplate}
          </slot>
        </span>
      </div>
    `;
  }

  /** The original ring, with the three animated dots in the middle */
  private get dottedRingSvg(): SVGTemplateResult {
    return svg`
      <svg
        class="loading-indicator"
        viewBox="0 0 120 120"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.loadingTitle}</title>
        <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <path
            class="loading-ring"
            d="M60,10 C69.8019971,10 78.9452178,12.8205573 86.6623125,17.6943223 L76.4086287,27.9484118 C71.4880919,25.4243078 65.9103784,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 C96,53.3014663 94.1704984,47.0302355 90.9839104,41.6587228 L101.110332,31.5326452 C106.715332,39.6116982 110,49.4222615 110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
          ></path>
          <g
            class="loading-dots ${this.hideDots ? 'hidden' : ''}"
            transform="translate(40.000000, 55.000000)"
          >
            <circle id="left-dot" cx="5" cy="5" r="5"></circle>
            <circle id="middle-dot" cx="20" cy="5" r="5"></circle>
            <circle id="right-dot" cx="35" cy="5" r="5"></circle>
          </g>
        </g>
      </svg>
    `;
  }

  /** The roomier ring, used when a glyph occupies the middle */
  private get iconRingSvg(): SVGTemplateResult {
    return svg`
      <svg
        class="loading-indicator icon-ring"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.loadingTitle}</title>
        <g fill-rule="evenodd">
          <path
            class="loading-ring"
            fill-rule="nonzero"
            d="m17.8618849 11.6970233c18.5864635-15.59603144 45.6875867-15.59603102 64.2740497.000001 1.9271446 1.6170806 2.1785128 4.4902567.5614466 6.4174186-1.6170661 1.9271618-4.4902166 2.1785323-6.4173612.5614517-15.1996922-12.75416882-37.3625282-12.75416916-52.5622206-.000001-15.19969387 12.7541707-19.04823077 34.5805019-9.1273354 51.7641499 9.9208955 17.183646 30.7471499 24.7638499 49.3923323 17.9774983 18.6451823-6.7863521 29.7266014-25.9801026 26.2811129-45.5206248-.436848-2.4775114 1.2174186-4.8400696 3.6949079-5.2769215 2.4774893-.4368518 4.8400264 1.2174296 5.2768744 3.694941 4.2132065 23.8945096-9.3373563 47.3649806-32.137028 55.6634567-22.799672 8.2984758-48.2663986-.9707372-60.39785211-21.9832155-12.1314534-21.012481-7.42539173-47.7021198 11.16107351-63.2981544z"
          ></path>
        </g>
      </svg>
    `;
  }

  /**
   * The bundled mediatype glyph. `maskedIcon` supplies the mask geometry and
   * the decorative `aria-hidden`; this component supplies the size and paint.
   */
  private get mediatypeIconTemplate(): TemplateResult | typeof nothing {
    const url = this.mediatypeIconUrl;
    if (!url) return nothing;

    return maskedIcon(url);
  }

  private handleIconSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this.hasSlottedIcon = slot.assignedNodes({ flatten: false }).length > 0;
  }

  /** A check mark to render on success */
  private get successIndicatorTemplate(): TemplateResult {
    return html`
      <svg
        class="success-indicator"
        viewBox="0 0 120 120"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.successTitle}</title>
        <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <path
            class="success-icon"
            d="M60,10 C70.5816709,10 80.3955961,13.2871104 88.4763646,18.8959201 L78.3502633,29.0214223 C72.9767592,25.8315427 66.7022695,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 L95.995,59.46 L108.327675,47.128668 C109.350926,50.9806166 109.925886,55.015198 109.993301,59.1731586 L110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
          ></path>
          <polygon
            class="success-icon"
            transform="translate(75.000000, 41.500000) rotate(44.000000) translate(-75.000000, -41.500000) "
            points="96 85 54 85 54 65 76 64.999 76 -2 96 -2"
          ></polygon>
        </g>
      </svg>
    `;
  }

  /** An "!" to render on error */
  private get errorIndicatorTemplate(): TemplateResult {
    return html`
      <svg
        class="error-indicator"
        viewBox="0 0 120 120"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.errorTitle}</title>
        <path
          class="error-icon"
          d="m56.4612493 8.80450354 41.8901185 75.94632926c1.7706782 2.8433173 2.1150372 5.2623412 1.0330766 7.2570716-1.0819604 1.9947304-3.26978 2.9920956-6.5634587 2.9920956h-85.69973905c-3.29367873 0-5.46954894-.9973652-6.52761065-2.9920956-1.0580617-1.9947304-.70175345-4.4137543 1.06892476-7.2570716l41.89011844-75.12308969c1.8184757-2.84331737 3.9693609-4.37738627 6.4526556-4.60220671s4.6341799 1.03483527 6.4526556 3.77896714zm28.5387507 75.19549646-35.037482-62-34.962518 62zm-31-34.7484359v-10.2515641h-8v10.2515641l2.089172 14.7484359h3.8184713zm-8 19.7484359v8h8v-8z"
        />
      </svg>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --indicator-width--: var(--icon-width);

          /* Loading */
          --loading-ring-color--: var(--primary-text-color);
          --loading-dot-color--: var(--primary-text-color);
          --loading-icon-color--: var(--primary-text-color);

          /* Success */
          --success-icon-color--: var(--color-success);

          /* Error */
          --error-icon-color--: var(--color-danger);

          display: inline-block;
          width: var(--indicator-width--);
        }

        /* Every mode occupies the same cell, so the element keeps one size */
        .layers {
          display: grid;
        }

        .layer {
          grid-area: 1 / 1;
          opacity: 0;
        }

        .animate .layer {
          transition: opacity ${unsafeCSS(FADE_DURATION_MS)}ms ease-out;
        }

        .layer.active {
          opacity: 1;
        }

        /*
         * A freshly inserted element has no previous value to transition from,
         * so without this the incoming layer would appear at full opacity
         * while only the outgoing one faded. Browsers without @starting-style
         * skip the fade in rather than breaking.
         */
        @starting-style {
          .animate .layer.active {
            opacity: 0;
          }
        }

        .layer.outgoing {
          opacity: 0;
        }

        /* A ring on its way out would otherwise keep animating unseen */
        .layer.outgoing .loading-ring,
        .layer.outgoing .loading-dots > * {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate .layer {
            transition: none;
          }
        }

        .placeholder {
          height: var(--indicator-width--);
        }

        /* Stacks the center glyph over the ring */
        .indicator {
          position: relative;
          display: block;
        }

        .indicator svg {
          display: block;
          width: 100%;
          height: auto;
        }

        .center {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
        }

        .center[hidden] {
          display: none;
        }

        /*
         * Sized to fit within the icon ring's inner diameter. maskedIcon sets
         * the mask itself; background-color is what paints the glyph, so it
         * recolors with the ring.
         */
        .ia-icon {
          width: 50%;
          height: 50%;
          background-color: var(--loading-icon-color--);
        }

        .success-icon {
          fill: var(--success-icon-color--);
        }

        .error-icon {
          fill: var(--error-icon-color--);
        }

        .loading-ring {
          fill: var(--loading-ring-color--);
          animation: rotate 1.3s infinite linear;
          transform-origin: 50px 50px;
          transform-box: fill-box;
        }

        .loading-dots {
          fill: var(--loading-dot-color--);
          transition: opacity 0.25s ease-out;
        }

        .loading-dots.hidden {
          display: none;
        }

        .loading-dots > * {
          opacity: 0;
          animation: dot 1.3s infinite;
        }

        .loading-dots #left-dot {
          animation-delay: 0.2s;
        }

        .loading-dots #middle-dot {
          animation-delay: 0.4s;
        }

        .loading-dots #right-dot {
          animation-delay: 0.6s;
        }

        @keyframes rotate {
          0% {
            transform: rotate(-360deg);
          }
          100% {
            /* This frame is supposed to be inferred, but Safari doesn't rotate it unless we're explicit */
            transform: rotate(0deg);
          }
        }

        @keyframes dot {
          0% {
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-status-indicator': IAStatusIndicator;
  }
}
