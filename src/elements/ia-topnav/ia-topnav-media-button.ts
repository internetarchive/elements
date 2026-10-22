import { CSSResultGroup, TemplateResult, css, html } from 'lit';
import TrackedElement from './tracked-element';
import audio from '@src/icons/topnav-audio';
import donate from '@src/icons/topnav-donate';
import ellipses from '@src/icons/topnav-ellipses';
import images from '@src/icons/topnav-images';
import software from '@src/icons/topnav-software';
import texts from '@src/icons/topnav-texts';
import video from '@src/icons/topnav-video';
import web from '@src/icons/topnav-web';
import { toSentenceCase } from './lib/helpers';
import { property } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { IATopNavConfig, TOPNAV_MOBILE_BREAKPOINT } from './models';
import { defaultTopNavConfig } from './data/menus';
import themeStyles from '@src/themes/theme-styles';
import { localized, msg } from '@lit/localize';
import topnavFocusStyles from './focus-styles';

const icons: Record<string, TemplateResult> = {
  audio,
  donate,
  ellipses,
  images,
  software,
  texts,
  video,
  web,
};

@customElement('ia-topnav-media-button')
@localized()
export class MediaButton extends TrackedElement {
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: String }) icon = '';
  @property({ type: String }) href = '';
  @property({ type: String }) label = '';
  @property({ type: String }) mediatype = '';
  @property({ type: String }) openMenu = '';
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) followable = false;

  render() {
    return html`
      <a
        href="${this.href}"
        class="menu-item ${this.mediatype} ${this.buttonClass}"
        @click=${this.followable ? this.trackClick : this.onClick}
        data-event-click-tracking="${this.analyticsEvent}"
        title=${this.tooltip}
      >
        ${this.menuItem}
      </a>
    `;
  }

  static get icons(): Record<string, TemplateResult> {
    return icons;
  }

  onClick(e: Event) {
    this.trackClick(e);
    e.preventDefault();
    // On desktop viewport widths, the media subnav is always visible. To
    // ensure the media subnav is open on mobile if the viewport is
    // resized, the openMenu needs to be set to 'media'.
    if (this.openMenu !== 'media') {
      this.dispatchMenuToggledEvent();
    }
    this.dispatchMediaTypeSelectedEvent();
  }

  dispatchMenuToggledEvent() {
    this.dispatchEvent(
      new CustomEvent('menuToggled', {
        bubbles: true,
        composed: true,
        detail: {
          menuName: 'media',
        },
      }),
    );
  }

  dispatchMediaTypeSelectedEvent() {
    this.dispatchEvent(
      new CustomEvent('mediaTypeSelected', {
        bubbles: true,
        composed: true,
        detail: {
          mediatype: this.mediatype,
        },
      }),
    );
  }

  get buttonClass() {
    return this.selected ? 'selected' : '';
  }

  /**
   * The button's tooltip.
   *
   * Each menu has its own whole phrase, so a translator can reword it and
   * move the menu name freely, and the name shown is a translated one.
   */
  get tooltip() {
    const phrases = this.selected
      ? {
          web: msg('Collapse web menu'),
          texts: msg('Collapse texts menu'),
          video: msg('Collapse video menu'),
          audio: msg('Collapse audio menu'),
          software: msg('Collapse software menu'),
          images: msg('Collapse images menu'),
          donate: msg('Collapse donate menu'),
          more: msg('Collapse more menu'),
        }
      : {
          web: msg('Expand web menu'),
          texts: msg('Expand texts menu'),
          video: msg('Expand video menu'),
          audio: msg('Expand audio menu'),
          software: msg('Expand software menu'),
          images: msg('Expand images menu'),
          donate: msg('Expand donate menu'),
          more: msg('Expand more menu'),
        };
    return (
      (phrases as Record<string, string>)[this.mediatype] ??
      (this.selected ? msg('Collapse menu') : msg('Expand menu'))
    );
  }

  get iconClass() {
    return this.selected ? 'active' : '';
  }

  get analyticsEvent() {
    return `${this.config.eventCategory}|NavMenu${toSentenceCase(this.mediatype)}`;
  }

  get menuItem() {
    return html`
      <span class="icon ${this.iconClass}">
        ${MediaButton.icons[this.icon]}
      </span>
      <span class="label">${this.label}</span>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      topnavFocusStyles,
      css`
        a {
          display: inline-block;
          text-decoration: none;
        }

        .menu-item {
          display: inline-block;
          width: 100%;
          padding: 0;
          font-size: calc(16 * var(--topnavUnit--));
          text-align: left;
          background: transparent;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }

        /* The bar would clip a ring drawn outside its items. */
        :host {
          --topnav-focus-offset: calc(-1 * var(--ia-size-focus-ring--));
        }

        .label {
          display: inline-block;
          padding: 0;
          font-weight: 400;
          color: var(--primaryTextColor);
          text-align: left;
          vertical-align: middle;
        }

        .menu-item > .icon {
          display: inline-flex;
          vertical-align: middle;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
        }

        .menu-item > .icon > svg {
          height: calc(40 * var(--topnavUnit--));
          width: calc(40 * var(--topnavUnit--));
        }

        .menu-item.selected .icon {
          background-color: var(--activeButtonBg);
          border-radius: calc(10 * var(--topnavUnit--)) 0 0
            calc(10 * var(--topnavUnit--));
        }

        .icon svg {
          color: var(--iconFill, var(--ia-color-text-inverse-secondary--));
        }

        .icon.active svg {
          color: var(--activeColor, var(--ia-color-text-inverse--));
        }

        .donate svg {
          color: var(--ia-color-brand-donate--);
        }

        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          .menu-item {
            width: auto;
            height: calc(50 * var(--topnavUnit--));
            color: var(--mediaLabelDesktopColor);
            display: inline-flex;
          }
          .menu-item:hover,
          .menu-item:active,
          .menu-item:focus {
            color: var(--linkHoverColor);
          }

          .menu-item:hover svg,
          .menu-item:active svg,
          .menu-item:focus svg {
            color: var(--linkHoverColor);
          }

          /* Visually hidden, so the link's name still contains the label. */
          .label {
            position: absolute;
            width: 1px;
            height: 1px;
            margin: -1px;
            overflow: hidden;
            white-space: nowrap;
            clip-path: inset(50%);
          }

          .web:after {
            display: none;
            content: 'web';
          }
          .donate,
          .more {
            display: none;
          }

          .menu-item.selected {
            background: var(--activeDesktopMenuIcon);
          }

          .menu-item.selected .label,
          .menu-item.selected.web:after {
            color: var(--linkHoverColor);
          }

          .menu-item.selected .icon {
            background: transparent;
          }

          /* An open media type's glyph takes its media type's color (D-43). */
          .web.selected svg {
            color: var(--ia-color-mediatype-web--);
          }

          .texts.selected svg {
            color: var(--ia-color-mediatype-texts--);
          }

          .video.selected svg {
            color: var(--ia-color-mediatype-movies--);
          }

          .audio.selected svg {
            color: var(--ia-color-mediatype-audio--);
          }

          .software.selected svg {
            color: var(--ia-color-mediatype-software--);
          }

          .images.selected svg {
            color: var(--ia-color-mediatype-image--);
          }
        }

        @media (min-width: 1200px) {
          .label {
            position: static;
            width: auto;
            height: auto;
            margin: 0;
            overflow: visible;
            white-space: normal;
            clip-path: none;
          }

          .label,
          .web:after {
            display: inline;
            padding-right: calc(10 * var(--topnavUnit--));
            font-size: calc(13 * var(--topnavUnit--));
            text-transform: uppercase;
            color: inherit;
          }

          .web .label {
            display: none;
          }
        }
      `,
    ];
  }
}
