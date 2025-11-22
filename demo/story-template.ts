import { LitElement, type CSSResultGroup, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';

import './syntax-highlighter';

@customElement('story-template')
export class StoryTemplate extends LitElement {
  @property({ type: String }) elementTag = '';

  @property({ type: String }) exampleUsage = '';

  @property({ type: Boolean }) labs = false;

  render() {
    return html`
      <h2><code> &lt;${this.elementTag}&gt;</code></h2>
      <div id="container">
        <h3>Demo</h3>
        <div class="slot-container">
          <slot name="demo"></slot>
        </div>
        <h3>Import</h3>
        <syntax-highlighter .code=${this.importCode}></syntax-highlighter>
        <h3>Usage</h3>
        <syntax-highlighter .code=${this.exampleUsage}></syntax-highlighter>
        <h3>Settings</h3>
        <div class="slot-container">
          <slot name="settings"></slot>
        </div>
      </div>
    `;
  }

  private get importCode() {
    return `
import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';
    `;
  }

  private get elementClassName() {
    return customElements.get(this.elementTag)?.name;
  }

  private get modulePath() {
    return this.labs
      ? `@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`
      : `@internetarchive/elements/${this.elementTag}/${this.elementTag}`;
  }

  static get styles(): CSSResultGroup {
    return css`
      #container {
        border: 1px solid #ccc;
        padding: 0 16px 16px 16px;
      }

      h3 {
        margin-bottom: 8px;
      }

      .slot-container {
        background: #282c34;
        padding: 10px;
      }
    `;
  }
}
