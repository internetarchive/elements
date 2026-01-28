import hljs from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
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

  @property({ type: String }) language: 'typescript' | 'html' | 'css' =
    'typescript';

  @state() private highlightedCode = '';

  connectedCallback(): void {
    super.connectedCallback();
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('html', xml);
    hljs.registerLanguage('css', css);
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('code')) {
      this.highlightCode();
    }
  }

  render() {
    return html`
      <pre><code class="hljs">${unsafeHTML(
        this.highlightedCode,
      )}</code></pre>
    `;
  }

  private highlightCode() {
    const code = this.code.trim();
    const highlighted = hljs.highlight(code, {
      language: this.language,
    }).value;
    this.highlightedCode = highlighted;
  }

  static get styles(): CSSResultGroup {
    return [syntaxStyles];
  }
}
