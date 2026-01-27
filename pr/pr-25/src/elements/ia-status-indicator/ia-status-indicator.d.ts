import { CSSResultGroup, LitElement, TemplateResult } from 'lit';
/**
 * Renders an SVG indicator, which defualts to an animated circular indicator
 */
export declare class IAStatusIndicator extends LitElement {
    loadingTitle: string;
    successTitle: string;
    errorTitle: string;
    loadingStyle: 'ring' | 'ring-dots';
    mode: 'loading' | 'success' | 'error';
    render(): TemplateResult;
    /** A circular loading indicator to render when processing */
    private get loadingIndicatorTemplate();
    /** A check mark to render on success */
    private get successIndicatorTemplate();
    /** An "!" to render on error */
    private get errorIndicatorTemplate();
    private get shouldShowLoadingDots();
    static get styles(): CSSResultGroup;
}
//# sourceMappingURL=ia-status-indicator.d.ts.map