import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@src/elements/ia-button/ia-button-story';
import '@src/labs/ia-snow/ia-snow-story';
import '@src/elements/ia-loading-indicator/ia-loading-indicator-story';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <h1>🏛️ Internet Archive Elements ⚛️</h1>

      <ia-button-story></ia-button-story>

      <ia-snow-story></ia-snow-story>

      <ia-loading-indicator-story></ia-loading-indicator-story>
    `;
  }
}
