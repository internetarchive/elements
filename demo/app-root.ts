import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@src/components/ia-button/ia-button-story';
import '@src/labs/ia-snow/ia-snow-story';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <h1>Component Catalog</h1>

      <h2>Button</h2>
      <ia-button-story></ia-button-story>

      <h2>Snow</h2>
      <ia-snow-story></ia-snow-story>
    `;
  }
}
