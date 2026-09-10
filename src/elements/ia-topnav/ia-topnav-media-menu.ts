import { CSSResultGroup, LitElement, PropertyValues, css, html } from 'lit';
import { customElement, property, queryAll } from 'lit/decorators.js';

import { defaultTopNavConfig } from './data/menus';
import formatUrl from './lib/format-url';
import './ia-topnav-media-button';
import { MediaButton } from './ia-topnav-media-button';
import { IATopNavConfig, TOPNAV_MOBILE_BREAKPOINT } from './models';
import themeStyles from '@src/themes/theme-styles';

const menuSelection = [
  {
    icon: 'web',
    menu: 'web',
    href: 'https://web.archive.org',
    label: 'Wayback Machine',
  },
  {
    icon: 'texts',
    menu: 'texts',
    href: '/details/texts',
    label: 'Texts',
  },
  {
    icon: 'video',
    menu: 'video',
    href: '/details/movies',
    label: 'Video',
  },
  {
    icon: 'audio',
    menu: 'audio',
    href: '/details/audio',
    label: 'Audio',
  },
  {
    icon: 'software',
    menu: 'software',
    href: '/details/software',
    label: 'Software',
  },
  {
    icon: 'images',
    menu: 'images',
    href: '/details/image',
    label: 'Images',
  },
  {
    icon: 'donate',
    menu: 'donate',
    href: '/donate/?origin=iawww-mbhmbgrmenu',
    label: 'Donate',
    followable: true,
  },
  {
    icon: 'ellipses',
    menu: 'more',
    href: '/about/',
    label: 'More',
  },
];

@customElement('ia-topnav-media-menu')
export class MediaMenu extends LitElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: String }) openMenu = '';
  @property({ type: String }) selectedMenuOption = '';
  @property({ type: Object }) currentTab: { moveTo: string } | undefined;

  @queryAll('ia-topnav-media-button') mediaButtons?: MediaButton[];

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          outline: none;
        }

        .media-menu-inner {
          z-index: -1;
          top: -40rem;
          background-color: var(--mediaMenuBg);
          margin: 0;
          overflow: hidden;
          transition-duration: 0.2s;
          transition-property: top;
          transition-timing-function: ease;
        }

        .menu-group {
          position: relative;
          line-height: normal;
        }

        /* Mobile view styles */
        @media (max-width: ${TOPNAV_MOBILE_BREAKPOINT - 1}px) {
          .media-menu-inner {
            position: absolute;
            width: 100%;
          }

          .open .media-menu-inner {
            top: 0;
          }

          .overflow-clip {
            position: absolute;
            z-index: -1; /** needs to be under the navigation, otherwise it intercepts clicks */
            top: 4rem;
            left: 0;
            height: 0;
            width: 100%;
            overflow: hidden;
            transition-duration: 0.2s;
            transition-property: height;
          }

          .open .overflow-clip {
            height: 40rem;
          }
        }

        /* Desktop view styles */
        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          .media-menu-inner {
            display: block;
            position: static;
            width: auto;
            height: 5rem;
            transition-property: none;
          }

          .menu-group {
            font-size: 0;
          }
        }
      `,
    ];
  }

  updated(props: PropertyValues) {
    if (props.has('currentTab')) {
      const mediaButtons = Array.from(this.mediaButtons ?? []);

      mediaButtons.map((button, index) => {
        const linkItem = button.shadowRoot?.querySelector('a.menu-item');
        if (linkItem) {
          if (linkItem.classList.contains(`${this.selectedMenuOption}`)) {
            linkItem.classList.remove('selected');
            (linkItem as HTMLElement).blur();

            const newFocusIndex =
              this.currentTab?.moveTo === 'next' ? index + 1 : index - 1;
            (
              mediaButtons[newFocusIndex]?.shadowRoot?.querySelector(
                'a.menu-item',
              ) as HTMLElement
            ).focus();
          }
        }
      });
    }
  }

  get mediaMenuOptionsTemplate() {
    const buttons = menuSelection.map(
      ({ icon, menu, label, href, followable }) => {
        const selected = this.selectedMenuOption === menu;
        return html`
          <ia-topnav-media-button
            .config=${this.config}
            .icon=${icon}
            .href=${formatUrl(href as string & Location, this.baseHost)}
            ?followable=${followable}
            .label=${label}
            .mediatype=${menu}
            .openMenu=${this.openMenu}
            .selected=${selected}
            .selectedMenuOption=${this.selectedMenuOption}
            data-mediatype="${menu}"
          ></ia-topnav-media-button>
        `;
      },
    );
    return buttons;
  }

  get menuOpened() {
    return this.openMenu === 'media';
  }

  get menuClass() {
    return this.menuOpened ? 'open' : 'closed';
  }

  render() {
    return html`
      <div class="media-menu-container ${this.menuClass}">
        <div class="overflow-clip">
          <nav class="media-menu-inner" aria-expanded="${this.menuOpened}">
            <div class="menu-group">${this.mediaMenuOptionsTemplate}</div>
          </nav>
        </div>
      </div>
    `;
  }
}
