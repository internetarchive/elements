import {
  LitElement,
  html,
  TemplateResult,
  PropertyValues,
  css,
  type CSSResultGroup,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import themeStyles from '@src/themes/theme-styles';

/**
 * Placeholder shown in place of the theater when `viewAvailable` is false,
 * i.e. the item has no files that can be experienced in the browser. Emits
 * `loadingStateUpdated` so the navigator hides its loading spinner.
 */
@customElement('ia-no-theater-available')
export class IANoTheaterAvailable extends LitElement {
  @property({ type: String }) identifier?: string = '';

  emitLoaded(): void {
    this.dispatchEvent(
      new CustomEvent<{ loaded: boolean }>('loadingStateUpdated', {
        detail: { loaded: true },
      }),
    );
  }

  updated(changed: PropertyValues): void {
    if (changed.has('identifier')) {
      this.emitLoaded();
    }
  }

  get downloadUrl(): string {
    return `/download/${this.identifier}`;
  }

  render(): TemplateResult {
    return html`
      <section>
        <h2>THERE IS NO PREVIEW AVAILABLE FOR THIS ITEM</h2>
        <p>
          This item does not appear to have any files that can be experienced on
          Archive.org. <br />
          Please download files in this item to interact with them on your
          computer.
        </p>
        <a href=${this.downloadUrl}>Show all files</a>
      </section>
    `;
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
          color: var(--item-navigator-text-color--);
          text-align: center;
          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        section {
          width: 100%;
          margin: 5%;
          padding: 0 5%;
        }

        p {
          font-size: 1.4em;
        }

        a {
          color: var(--item-navigator-text-color--);
          background-color: var(--navy-blue);
          min-height: 35px;
          cursor: pointer;
          line-height: normal;
          border-radius: 0.4em;
          text-align: center;
          vertical-align: middle;
          font-size: 1.4em;
          font-family: var(--base-font-family);
          display: inline-block;
          padding: 0.85em 1.2em;
          border: 1px solid var(--lightest-gray);
          white-space: nowrap;
          appearance: auto;
          box-sizing: border-box;
          user-select: none;
          text-decoration: none;
        }
      `,
    ];
  }
}
