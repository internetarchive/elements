import hljs from "highlight.js";
import typescript from 'highlight.js/lib/languages/typescript';
import { type CSSResultGroup, LitElement, type PropertyValues, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { syntaxStyles } from "./syntax-style";

@customElement('syntax-highlighter')
export class SyntaxHighlighter extends LitElement {
  @property({ type: String }) code = '';

  @state() private highlightedCode = '';

  connectedCallback(): void {
    super.connectedCallback();
    hljs.registerLanguage('typescript', typescript);
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);
    if (_changedProperties.has('code')) {
      const code = this.code.trim();
      const highlighted = hljs.highlight(code, { language: 'typescript' }).value;
      this.highlightedCode = highlighted;
    }
  }

  render() {
    return html`
      <pre><code class="hljs language-typescript">${unsafeHTML(this.highlightedCode)}</code></pre>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      syntaxStyles,
    ];
  }
}
