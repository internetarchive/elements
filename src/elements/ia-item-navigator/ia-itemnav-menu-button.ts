import {
  css,
  html,
  LitElement,
  TemplateResult,
  type CSSResultGroup,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import themeStyles from '@src/themes/theme-styles';

/**
 * A single entry in the item navigator's side menu. Renders either a button
 * (default) or a link (when `href` is set) with an icon, label and optional
 * detail text, and emits `menuTypeSelected` when activated.
 */
@customElement('ia-itemnav-menu-button')
export class IAItemNavMenuButton extends LitElement {
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Object }) icon: TemplateResult | string = '';

  @property({ type: String }) href = '';

  @property({ type: String }) label = '';

  @property({ type: Object }) menuDetails: TemplateResult | string = '';

  @property({ type: String }) buttonId = '';

  @property({ type: Boolean }) selected = false;

  @property({ type: Boolean }) followable = false;

  onClick(e: Event): void {
    e.preventDefault();
    this.dispatchMenuTypeSelectedEvent();
  }

  dispatchMenuTypeSelectedEvent(): void {
    this.dispatchEvent(
      new CustomEvent('menuTypeSelected', {
        bubbles: true,
        composed: true,
        detail: {
          id: this.buttonId,
        },
      }),
    );
  }

  get iconClass(): string {
    return this.selected ? 'active' : '';
  }

  get menuItem(): TemplateResult {
    return html`
      <span
        class="icon ${this.iconClass}"
        aria-hidden="true"
        title=${this.label}
        >${this.icon}</span
      >
      <span class="label">${this.label}</span>
      <span class="menu-details">${this.menuDetails}</span>
    `;
  }

  get linkButton(): TemplateResult {
    // A followable link really does navigate, so it is a link and nothing
    // more; only the in-place variant is a disclosure.
    return html`
      <a
        href=${this.href}
        class="menu-item"
        aria-label=${this.label}
        aria-expanded=${ifDefined(this.followable ? undefined : this.selected)}
        @click=${this.followable ? undefined : this.onClick}
        >${this.menuItem}</a
      >
    `;
  }

  get clickButton(): TemplateResult {
    return html`
      <button
        class="menu-item"
        aria-label=${this.label}
        aria-expanded=${this.selected}
        @click=${this.onClick}
      >
        ${this.menuItem}
      </button>
    `;
  }

  render(): TemplateResult {
    return this.href ? this.linkButton : this.clickButton;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-active-button-bg--: var(
            --item-navigator-active-button-bg,
            var(--mid-gray)
          );
          --item-navigator-menu-button-label-display--: var(
            --item-navigator-menu-button-label-display,
            none
          );
          --item-navigator-icon-inactive-color--: var(
            --item-navigator-icon-inactive-color,
            var(--lighter-gray)
          );
          --item-navigator-icon-active-color--: var(
            --item-navigator-icon-active-color,
            var(--item-navigator-text-color--)
          );
          /* Every glyph is square, so one knob sizes both axes. */
          --item-navigator-icon-size--: var(--item-navigator-icon-size, 2.4em);

          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        a {
          display: inline-block;
          text-decoration: none;
        }

        button.menu-item {
          -webkit-appearance: none;
          appearance: none;
          /* Inherit font-size so the em-sized icon/label resolve against the
             component base rather than the UA default button font-size. */
          font: inherit;
        }

        .menu-item {
          display: inline-flex;
          width: 100%;
          padding: 0;
          text-align: left;
          background: transparent;
          align-items: center;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
          border-radius: 6px;
        }

        .menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .label {
          display: var(--item-navigator-menu-button-label-display--);
          padding: 0;
          font-size: 1.6em;
          font-weight: 400;
          color: var(--item-navigator-text-color--);
          text-align: left;
          vertical-align: middle;
          margin-left: 1em;
        }

        .menu-details {
          color: var(--item-navigator-text-color--);
          display: inline-block;
          margin-left: 0.5em;
          font-style: italic;
          font-size: 1.5em;
        }

        .menu-item > .icon {
          position: relative;
          display: inline-flex;
          z-index: 2;
          min-width: 4.2em;
          max-width: 4.2em;
          height: 4.2em;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
        }

        .menu-item > .icon > * {
          /* Prevent tooltip containing icon literal description */
          pointer-events: none;
        }

        /* Size the glyph within the icon box to match the shortcut-rail
           icons, rather than letting the svg fill the whole box. */
        .menu-item > .icon .ia-icon {
          width: var(--item-navigator-icon-size--);
          height: var(--item-navigator-icon-size--);
        }

        .menu-item[aria-expanded='true'] .icon {
          background-color: var(--item-navigator-active-button-bg--);
          border-radius: 1em 0 0 1em;
        }

        /* Our glyphs are masked spans: the mask supplies the shape, these
           supply the paint. */
        .icon span.ia-icon {
          background-color: var(--item-navigator-icon-inactive-color--);
        }

        .icon.active span.ia-icon {
          background-color: var(--item-navigator-icon-active-color--);
        }

        /* Host-supplied icons may still be inline svg, so keep theming those
           the original way. */
        .icon .fill-color {
          fill: var(--item-navigator-icon-inactive-color--);
        }

        .icon.active .fill-color {
          fill: var(--item-navigator-icon-active-color--);
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-itemnav-menu-button': IAItemNavMenuButton;
  }
}
