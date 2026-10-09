import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

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
    return css`
      :host {
        display: inline-block;
      }
      .variable-texts {
        margin-right: 10px;
        vertical-align: middle;
        font-size: 1.7rem;
      }
      .hidden {
        display: none;
      }
      .visible {
        display: inline-block;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-book-actions-text-group': IABookActionsTextGroup;
  }
}
