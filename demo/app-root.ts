import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@src/components/ia-button/ia-button';
import '@src/labs/ia-snow/ia-snow';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <h1>Component Catalog</h1>

      <h2>Button</h2>
      <ia-button @click=${() => alert('Button clicked!')}>Click Me</ia-button>

      <h2>Snow</h2>
      <ia-snow></ia-snow>
    `;
  }
}
