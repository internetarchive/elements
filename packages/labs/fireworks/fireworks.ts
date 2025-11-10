import { html, LitElement } from "lit";
import '@internetarchive/ia-components/components/button/button.js';
import { customElement } from "lit/decorators/custom-element.js";

@customElement("ia-fireworks")
export class Fireworks extends LitElement {
  render() {
    return html`
      <h1>Fireworks Component</h1>
      <ia-button>Launch Fireworks</ia-button>
    `;
  }
}
