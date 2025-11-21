import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@src/elements/ia-button/ia-button-story';
import '@src/labs/ia-snow/ia-snow-story';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <h1>Component Catalog</h1>

      <ia-button-story></ia-button-story>

      <ia-snow-story></ia-snow-story>
    `;
  }
}
