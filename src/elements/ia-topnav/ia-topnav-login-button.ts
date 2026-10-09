import { CSSResultGroup, css, html } from 'lit';
import TrackedElement from './tracked-element';
import userIcon from '@src/icons/topnav-user';
import { formatUrl, makeBooleanString } from './lib/helpers';
import { property, query } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { IATopNavConfig, TOPNAV_MOBILE_BREAKPOINT } from './models';
import { defaultTopNavConfig } from './data/menus';
import themeStyles from '@src/themes/theme-styles';
import { localized, msg } from '@lit/localize';

@customElement('ia-topnav-login-button')
@localized()
export class LoginButton extends TrackedElement {
  @property({ type: String }) baseHost = '';
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;
  @property({ type: String }) openMenu = '';

  @query('button.logged-out-menu') private toggleButton?: HTMLButtonElement;

  render() {
    return html`
      <div class="logged-out-toolbar">
        <button
          class="logged-out-menu ${this.avatarClass}"
          @click=${this.toggleDropdown}
          data-event-click-tracking="${this.analyticsEvent}"
          aria-label=${msg('Toggle login menu')}
          aria-expanded="${makeBooleanString(this.menuOpened)}"
        >
          ${userIcon}
        </button>
        <span>
          <a href="${this.signupPath}">${msg('Sign up')}</a>
          |
          <a href="${this.loginPath}">${msg('Log in')}</a>
        </span>
      </div>
    `;
  }

  /** Distance (px) from this element's right edge to the right edge of the dropdown toggle icon. */
  getDropdownToggleOffset(): number {
    if (!this.toggleButton) return 0;
    return (
      this.getBoundingClientRect().right -
      this.toggleButton.getBoundingClientRect().right
    );
  }

  get signupPath() {
    return formatUrl('/signup', this.baseHost);
  }

  get loginPath() {
    return formatUrl('/login', this.baseHost);
  }

  get analyticsEvent() {
    return `${this.config?.eventCategory}|NavLoginIcon`;
  }

  get menuOpened(): boolean {
    return this.openMenu === 'login';
  }

  get avatarClass() {
    return `dropdown-toggle${this.menuOpened ? ' active' : ''}`;
  }

  toggleDropdown(e: Event) {
    e.preventDefault();
    this.trackClick(e);
    this.dispatchEvent(
      new CustomEvent('menuToggled', {
        bubbles: true,
        composed: true,
        detail: {
          menuName: 'login',
        },
      }),
    );
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        .logged-out-menu {
          background: inherit;
          border: none;
        }
        .logged-out-menu:focus-visible {
          outline: none;
          border: none;
        }
        .dropdown-toggle {
          display: block;
          text-transform: uppercase;
          color: var(--grey80);
          cursor: pointer;
        }

        .dropdown-toggle svg {
          height: 100%;
          width: 4rem;
          color: var(--iconFill);
        }

        .dropdown-toggle:active svg,
        .dropdown-toggle:focus svg,
        .dropdown-toggle:hover svg {
          color: var(--linkHoverColor);
        }

        .active {
          border-radius: 1rem 1rem 0 0;
          background: var(--activeButtonBg);
        }

        .active svg {
          color: var(--activeColor);
        }

        span {
          display: none;
          font-size: 1.4rem;
          text-transform: uppercase;
          color: var(--loginTextColor);
        }

        span a {
          color: inherit;
          text-decoration: none;
          outline: 0;
        }

        a:hover,
        a:active,
        a:focus {
          color: var(--linkHoverColor) !important;
          outline: none !important;
          outline-offset: inherit !important;
        }

        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          .logged-out-toolbar {
            padding: 1rem 0.5rem;
            vertical-align: middle;
          }

          .active {
            background: transparent;
          }

          .dropdown-toggle {
            display: inline-block;
            vertical-align: middle;
          }

          .dropdown-toggle svg {
            height: 3rem;
            width: 3rem;
            display: block;
          }

          span {
            display: inline;
            vertical-align: middle;
          }
        }
      `,
    ];
  }
}
