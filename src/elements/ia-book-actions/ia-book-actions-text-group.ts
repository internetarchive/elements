import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '@src/utils/custom-element';
import { tokenStyles } from '@src/themes/tokens';

@customElement('ia-book-actions-text-group')
export class IABookActionsTextGroup extends LitElement {
  @property({ type: String }) texts = '';

  @property({ type: String }) textClass = '';

  render() {
    return html`
      <span class="variable-texts ${this.textClass}">${this.texts}</span>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      tokenStyles,
      css`
        :host {
          display: inline-block;
        }
        .variable-texts {
          margin-right: var(--ia-space-2--);
          vertical-align: middle;
          font-size: var(--ia-font-size-lg--);
        }
        .hidden {
          display: none;
        }
        .visible {
          display: inline-block;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-book-actions-text-group': IABookActionsTextGroup;
  }
}
