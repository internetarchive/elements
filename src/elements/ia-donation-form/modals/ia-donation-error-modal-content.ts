import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import themeStyles from '@src/themes/theme-styles';

/** The footer of the error modal: a link to the help article on failed donations. */
@customElement('ia-donation-error-modal-content')
export class IADonationErrorModalContent extends LitElement {
  render(): TemplateResult {
    return html`
      <div class="container">
        <a
          href="https://help.archive.org/help/why-is-there-a-problem-processing-my-donation/"
          rel="noopener"
          target="_blank"
        >
          ${msg('Questions?')}
        </a>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --donation-error-modal-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-error-modal-link-top-margin--: var(
            --ia-donation-error-modal-link-top-margin,
            var(--donation-error-modal-base-font-size--)
          );
          --donation-error-modal-link-color--: var(
            --ia-donation-error-modal-link-color,
            var(--mid-gray)
          );
          --donation-error-modal-link-font-size--: var(
            --ia-donation-error-modal-link-font-size,
            calc(var(--donation-error-modal-base-font-size--) * 1.4)
          );
        }

        .container {
          margin-top: var(--donation-error-modal-link-top-margin--);
          text-align: center;
        }

        a,
        a:link,
        a:visited {
          color: var(--donation-error-modal-link-color--);
          font-size: var(--donation-error-modal-link-font-size--);
        }
      `,
    ];
  }
}
