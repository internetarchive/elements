import { type CSSResultGroup, LitElement, type PropertyValues } from 'lit';
/**
 * An element that syntax highlights and displays TypeScript code
 */
export declare class SyntaxHighlighter extends LitElement {
    code: string;
    private highlightedCode;
    connectedCallback(): void;
    protected willUpdate(_changedProperties: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    private highlightCode;
    static get styles(): CSSResultGroup;
}
//# sourceMappingURL=syntax-highlighter.d.ts.map