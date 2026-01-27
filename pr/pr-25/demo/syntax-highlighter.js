import { __decorate } from "tslib";
import hljs from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';
import { LitElement, html, } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { syntaxStyles } from './syntax-style-light';
/**
 * An element that syntax highlights and displays TypeScript code
 */
let SyntaxHighlighter = class SyntaxHighlighter extends LitElement {
    constructor() {
        super(...arguments);
        this.code = '';
        this.highlightedCode = '';
    }
    connectedCallback() {
        super.connectedCallback();
        hljs.registerLanguage('typescript', typescript);
    }
    willUpdate(_changedProperties) {
        if (_changedProperties.has('code')) {
            this.highlightCode();
        }
    }
    render() {
        return html `
      <pre><code class="hljs language-typescript">${unsafeHTML(this.highlightedCode)}</code></pre>
    `;
    }
    highlightCode() {
        const code = this.code.trim();
        const highlighted = hljs.highlight(code, {
            language: 'typescript',
        }).value;
        this.highlightedCode = highlighted;
    }
    static get styles() {
        return [syntaxStyles];
    }
};
__decorate([
    property({ type: String })
], SyntaxHighlighter.prototype, "code", void 0);
__decorate([
    state()
], SyntaxHighlighter.prototype, "highlightedCode", void 0);
SyntaxHighlighter = __decorate([
    customElement('syntax-highlighter')
], SyntaxHighlighter);
export { SyntaxHighlighter };
//# sourceMappingURL=syntax-highlighter.js.map