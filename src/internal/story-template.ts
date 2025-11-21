import { LitElement, type CSSResultGroup, css, html, type PropertyValues } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';

import hljs from 'highlight.js/lib/core';
// import typescript from 'highlight.js/lib/languages/typescript';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { syntaxStyles } from './syntax-highlighting';

@customElement('story-template')
export class StoryTemplate extends LitElement {
  @property({ type: String }) elementTag = '';

  @property({ type: String }) exampleUsage = '';

  @property({ type: Boolean }) labs = false;

  @state() highlightedImportCode = '';

  @state() highlightedExampleUsage = '';

  protected willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has('elementTag') || _changedProperties.has('labs')) {
      const code = this.importCode.trim();
      const highlighted = hljs.highlight(code, { language: 'typescript' }).value;
      this.highlightedImportCode = highlighted;
    }

    if (_changedProperties.has('exampleUsage')) {
      const code = this.exampleUsage.trim();
      const highlighted = hljs.highlight(code, { language: 'typescript' }).value;
      this.highlightedExampleUsage = highlighted;
    }
  }

  render() {
    return html`
      <h2>&lt;${this.elementTag}&gt;</h2>
      <div id="container">
        <h3>Demo</h3>
        <slot name="demo"></slot>
        <h3>Import</h3>
        <div class="code-example">${unsafeHTML(this.highlightedImportCode)}</div>
        <h3>Usage</h3>
        <div class="code-example">${unsafeHTML(this.highlightedExampleUsage)}</div>
        <h3>Settings</h3>
        <slot name="settings"></slot>
      </div>
    `;
  }

  private get importCode() {
    return `
import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';
    `
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
    return [
      syntaxStyles,
      css`
        #container {
          border: 1px solid #ccc;
          padding: 0 16px 16px 16px;
        }

        h3 {
          margin-bottom: 8px;
        }

        .code-example {
          white-space: pre;
          font-family: monospace;
        }
      `
    ];
  }
}
