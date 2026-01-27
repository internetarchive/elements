import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@src/elements/ia-button/ia-button-story';
import '@src/labs/ia-snow/ia-snow-story';
import '@src/elements/ia-combo-box/ia-combo-box-story';
import '@src/elements/ia-status-indicator/ia-status-indicator-story';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <h1>🏛️ Internet Archive Elements ⚛️</h1>

      <h2>🚀 Production-Ready Elements</h2>

      <ia-status-indicator-story></ia-status-indicator-story>
      <ia-combo-box-story></ia-combo-box-story>

      <h2>🧪 Labs Elements</h2>

      <ia-snow-story></ia-snow-story>
      <ia-button-story></ia-button-story>
    `;
  }
}
