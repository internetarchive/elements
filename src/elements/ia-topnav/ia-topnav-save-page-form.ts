import { CSSResultGroup, css, html } from 'lit';
import TrackedElement from './tracked-element';
import { customElement, property, state } from 'lit/decorators.js';
import { IATopNavConfig, TOPNAV_MOBILE_BREAKPOINT } from './models';
import { defaultTopNavConfig } from './data/menus';
import themeStyles from '@src/themes/theme-styles';
import { srOnlyStyles } from '@src/themes/sr-only-styles';

@customElement('ia-topnav-save-page-form')
export class SavePageForm extends TrackedElement {
  @property({ type: Object }) config: IATopNavConfig = defaultTopNavConfig;

  @state() inputValid = true;

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        div {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-column-gap: 0.8rem;
          margin: 0;
          padding: 0;
          border: none;
        }

        input[type='text'] {
          width: 100%;
          height: 3rem;
          box-sizing: border-box;
          border: 1px solid var(--savePageInputBorder);
          border-radius: 0.5rem;
          color: var(--grey13);
          font-size: inherit;
        }

        input[type='submit'] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          padding: 0.4rem 0.8rem;
          font: normal 1.3rem var(--themeFontFamily);
          text-transform: uppercase;
          color: var(--savePageSubmitText);
          border: none;
          border-radius: 16px;
          background: var(--savePageSubmitBg);
          cursor: pointer;
        }

        .error {
          display: none;
          margin-top: 0.5rem;
          font-weight: bold;
          color: var(--savePageErrorText);
        }

        .visible {
          display: block;
        }

        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          h3 {
            margin-top: 0;
            font: normal 100 1.6rem var(--themeFontFamily);
          }
        }
      `,
      srOnlyStyles,
    ];
  }

  private validateURL(e: SubmitEvent) {
    const target = e.target as HTMLFormElement;
    const urlInput = target.querySelector(
      '[name="url_preload"]',
    ) as HTMLInputElement;
    const valid = /\..{2,}$/.test(urlInput.value);

    if (!valid) {
      e.preventDefault();
      this.inputValid = false;
      return;
    }
    this.inputValid = true;
    this.trackSubmit(e);
  }

  get errorClass() {
    return `error${this.inputValid ? '' : ' visible'}`;
  }

  render() {
    return html`
      <form
        action="//web.archive.org/save"
        method="post"
        data-event-submit-tracking="${this.config.eventCategory}|SavePageSubmit"
        @submit=${this.validateURL}
      >
        <h3>Save Page Now</h3>
        <p>
          Capture a web page as it appears now for use as a trusted citation in
          the future.
        </p>
        <div>
          <label for="url_preload" class="sr-only">Enter a URL to save</label>
          <input
            type="text"
            name="url_preload"
            id="url_preload"
            placeholder="https://"
          />
          <input type="submit" value="Save" />
        </div>
        <p class=${this.errorClass}>Please enter a valid web address</p>
      </form>
    `;
  }
}
