import { CSSResultGroup, LitElement, PropertyValues, css, html } from 'lit';
import { property, queryAll } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import { defaultTopNavConfig } from './data/menus';
import { formatUrl } from './lib/helpers';
import './ia-topnav-media-button';
import { MediaButton } from './ia-topnav-media-button';
import { IATopNavConfig, TOPNAV_MOBILE_BREAKPOINT } from './models';
import themeStyles from '@src/themes/theme-styles';
import { localized, msg } from '@lit/localize';

type MediaMenuOption = {
  icon: string;
  menu: string;
  href: string;
  label: string;
  followable?: boolean;
};

/**
 * The top-level media buttons. A function so the labels are read in the
 * current locale each time the menu renders.
 */
function menuSelection(): MediaMenuOption[] {
  return [
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
      label: msg('Texts'),
    },
    {
      icon: 'video',
      menu: 'video',
      href: '/details/movies',
      label: msg('Video'),
    },
    {
      icon: 'audio',
      menu: 'audio',
      href: '/details/audio',
      label: msg('Audio'),
    },
    {
      icon: 'software',
      menu: 'software',
      href: '/details/software',
      label: msg('Software'),
    },
    {
      icon: 'images',
      menu: 'images',
      href: '/details/image',
      label: msg('Images'),
    },
    {
      icon: 'donate',
      menu: 'donate',
      href: '/donate/?origin=iawww-mbhmbgrmenu',
      label: msg('Donate'),
      followable: true,
    },
    {
      icon: 'ellipses',
      menu: 'more',
      href: '/about/',
      label: msg('More'),
    },
  ];
}

@customElement('ia-topnav-media-menu')
@localized()
export class MediaMenu extends LitElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: String }) openMenu = '';
  @property({ type: String }) selectedMenuOption = '';
  @property({ type: Object }) currentTab: { moveTo: string } | undefined;

  @queryAll('ia-topnav-media-button') mediaButtons?: MediaButton[];

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

  get mediaMenuOptionsTemplate() {
    const buttons = menuSelection().map(
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

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          outline: none;
        }

        .media-menu-inner {
          z-index: -1;
          top: calc(-400 * var(--topnavUnit--));
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
            top: calc(40 * var(--topnavUnit--));
            left: 0;
            height: 0;
            width: 100%;
            overflow: hidden;
            transition-duration: 0.2s;
            transition-property: height;
          }

          .open .overflow-clip {
            height: calc(400 * var(--topnavUnit--));
          }
        }

        /* Desktop view styles */
        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          .media-menu-inner {
            display: block;
            position: static;
            width: auto;
            height: calc(50 * var(--topnavUnit--));
            transition-property: none;
          }

          .menu-group {
            font-size: 0;
          }
        }
      `,
    ];
  }
}
