import hljs from 'highlight.js';
import {
  type CSSResultGroup,
  LitElement,
  type PropertyValues,
  html,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { syntaxStyles } from './syntax-style-light';

/**
 * An element that syntax highlights and displays TypeScript code
 */
@customElement('syntax-highlighter')
export class SyntaxHighlighter extends LitElement {
  @property({ type: String }) code = '';

  @property({ type: String }) language: 'auto' | 'typescript' | 'html' | 'css' =
    'auto';

  @state() private highlightedCode = '';

  protected willUpdate(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('code')) {
      this.highlightCode();
    }
  }

  render() {
    return html`
      <pre><code class="hljs">${unsafeHTML(this.highlightedCode)}</code></pre>
    `;
  }

  private highlightCode() {
    const code = this.code.trim();

    let highlighted: string;
    if (this.language === 'auto') {
      highlighted = hljs.highlightAuto(code).value;
    } else {
      highlighted = hljs.highlight(code, {
        language: this.language,
      }).value;
    }

    this.highlightedCode = highlighted;
  }

  static get styles(): CSSResultGroup {
    return [syntaxStyles];
  }
}
