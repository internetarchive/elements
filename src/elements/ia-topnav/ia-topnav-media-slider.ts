import { CSSResultGroup, LitElement, PropertyValues, css, html } from 'lit';
import './ia-topnav-media-subnav';
import KeyboardNavigation from './lib/keyboard-navigation';
import { customElement, property } from 'lit/decorators.js';
import {
  IATopNavConfig,
  IATopNavMenuConfig,
  TOPNAV_MOBILE_BREAKPOINT,
} from './models';
import { buildTopNavMenus, defaultTopNavConfig } from './data/menus';
import themeStyles from '@src/themes/theme-styles';

@customElement('ia-topnav-media-slider')
export class MediaSlider extends LitElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: Boolean }) mediaSliderOpen = false;
  @property({ type: Object }) menus: IATopNavMenuConfig = buildTopNavMenus();
  @property({ type: String }) selectedMenuOption = 'texts';

  private previousKeydownListener: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((this: HTMLElement, ev: KeyboardEvent) => any) | undefined;

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        .media-slider-container {
          position: relative;
        }

        .overflow-clip {
          display: none;
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: 0;
          overflow: hidden;
          transition: height 0.2s ease;
        }

        .information-menu {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          padding: 0;
          height: 31.9rem;
          overflow-x: hidden;
          font-size: 1.4rem;
          background: var(--mediaSliderBg);
        }

        .open {
          display: block;
        }

        .hidden {
          display: none;
        }

        .info-box {
          padding: 1rem;
        }

        @media (max-width: ${TOPNAV_MOBILE_BREAKPOINT - 1}px) {
          .overflow-clip.open {
            display: block;
            height: 35.8rem;
            left: 4rem;
            top: 0;
          }
        }

        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          .overflow-clip {
            display: block;
          }

          .information-menu {
            left: 0;
            z-index: 3;
            height: auto;
            min-height: 21rem;
            background: var(--mediaSliderDesktopBg);
            transform: translate(0, -100%);
            transition: transform 0.2s ease;
          }

          .overflow-clip.open {
            height: 22rem;
          }

          .information-menu.open {
            transform: translate(0, 0);
          }

          .info-box {
            max-width: 100rem;
            padding: 1.5rem 0;
            margin: 0 auto;
          }
        }
      `,
    ];
  }

  updated(props: PropertyValues) {
    if (props.has('selectedMenuOption') && this.selectedMenuOption) {
      const container =
        this.shadowRoot?.querySelector('.has-focused')?.shadowRoot;
      if (container) {
        const keyboardNavigation = new KeyboardNavigation(
          container as unknown as HTMLElement,
          this.selectedMenuOption,
        );

        if (this.previousKeydownListener) {
          this.removeEventListener('keydown', this.previousKeydownListener);
        }
        this.addEventListener('keydown', keyboardNavigation.handleKeyDown);
        this.previousKeydownListener = keyboardNavigation.handleKeyDown;
      }
    }
  }

  shouldUpdate() {
    const scrollPane = this.shadowRoot
      ? this.shadowRoot.querySelector('.information-menu')
      : null;

    if (scrollPane) {
      scrollPane.scrollTop = 0;
    }
    return true;
  }

  render() {
    const sliderDetailsClass = this.mediaSliderOpen ? 'open' : 'closed';

    return html`
      <div class="media-slider-container">
        <div class="overflow-clip ${sliderDetailsClass}">
          <div class="information-menu ${sliderDetailsClass}">
            <div class="info-box">
              <ia-topnav-media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'audio'
                  ? 'has-focused'
                  : 'hidden'}"
                menu="audio"
                .menuItems=${this.menus.audio}
              ></ia-topnav-media-subnav>
              <ia-topnav-media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'images'
                  ? 'has-focused'
                  : 'hidden'}"
                menu="images"
                .menuItems=${this.menus.images}
              ></ia-topnav-media-subnav>
              <ia-topnav-media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'software'
                  ? 'has-focused'
                  : 'hidden'}"
                menu="software"
                .menuItems=${this.menus.software}
              ></ia-topnav-media-subnav>
              <ia-topnav-media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'texts'
                  ? 'has-focused'
                  : 'hidden'}"
                menu="texts"
                .menuItems=${this.menus.texts}
              ></ia-topnav-media-subnav>
              <ia-topnav-media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'video'
                  ? 'has-focused'
                  : 'hidden'}"
                menu="video"
                .menuItems=${this.menus.video}
              ></ia-topnav-media-subnav>
              <ia-topnav-media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'web'
                  ? 'has-focused'
                  : 'hidden'}"
                menu="web"
                .menuItems=${this.menus.web}
              ></ia-topnav-media-subnav>
              <ia-topnav-media-subnav
                .baseHost=${this.baseHost}
                .config=${this.config}
                class="${this.selectedMenuOption === 'more'
                  ? 'has-focused'
                  : 'hidden'}"
                menu="more"
                .menuItems=${this.menus.more}
              ></ia-topnav-media-subnav>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
