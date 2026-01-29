import hljs from 'highlight.js';
import {
  type CSSResultGroup,
  LitElement,
  html,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { syntaxStyles } from './syntax-style-light';

type LanguageName = string

/**
 * An element that syntax highlights and displays TypeScript code
 */
@customElement('syntax-highlighter')
export class SyntaxHighlighter extends LitElement {
  @property({ type: String }) code = '';

  /**
   * The language to use for syntax highlighting, or 'auto' to automatically detect
   *
   * See https://highlightjs.readthedocs.io/en/latest/supported-languages.html for supported languages.
   */
  @property({ type: String }) language: 'auto' | LanguageName = 'auto';

  render() {
    return html`
      <pre><code class="hljs">${unsafeHTML(this.highlightedCode)}</code></pre>
    `;
  }

  private get highlightedCode() {
    const code = this.code.trim();

    let highlighted: string;
    if (this.language === 'auto') {
      highlighted = hljs.highlightAuto(code).value;
    } else {
      highlighted = hljs.highlight(code, {
        language: this.language,
      }).value;
    }

    return highlighted;
  }

  static get styles(): CSSResultGroup {
    return [syntaxStyles];
  }
}
