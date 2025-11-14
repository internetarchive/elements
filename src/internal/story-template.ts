import { LitElement, type CSSResultGroup, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('story-template')
export class StoryTemplate extends LitElement {
  @property({ type: String }) title = '';

  render() {
    return html`
      <h2>${this.title}</h2>
      <div id="container">
        <h3>Demo</h3>
        <slot name="demo"></slot>
        <h3>Usage</h3>
        <slot name="usage"></slot>
        <h3>Settings</h3>
        <slot name="settings"></slot>
      </div>
    `;
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
    `;
  }
}
