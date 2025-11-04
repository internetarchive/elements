import { html, LitElement } from "lit";
import { customElement } from "lit/decorators/custom-element.js";

@customElement("ia-button")
export class IAButton extends LitElement {
  render() {
    return html`
      <button>Click me</button>
    `;
  }
}
