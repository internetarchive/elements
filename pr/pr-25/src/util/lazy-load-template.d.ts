import type { TemplateResult } from 'lit';
import { Directive, DirectiveParameters, DirectiveResult, Part, PartInfo } from 'lit/directive.js';
/**
 * A LazyLoadedTemplate is a wrapper for a TemplateResult
 * lazy-loaded with the `lazyLoadTemplate` function.
 *
 * It can be used in an html`` block, eg.
 *
 * html`
 *   ${this.radioPlayerTemplate}  <-- see `radioPlayerTemplate` example below
 * `
 */
export type LazyLoadedTemplate = DirectiveResult<typeof LazyLoadTemplate>;
/**
 * This utility let's you asynchronously load a webcomponent.
 *
 * Derived from an example shown in:
 * https://www.youtube.com/watch?v=x9YDQUJx2uw
 *
 * Example use:
 *
 * get radioPlayerTemplate(): LazyLoadedTemplate {
 *   return lazyLoadTemplate(
 *     async (): Promise<void> => {
 *       await import('./players/radio-player');
 *     },
 *     (): TemplateResult => {
 *       return html`
 *         <radio-player
 *           .metadataResponse=${this.metadataResponse}
 *           .browserHistoryHandler=${this.browserHistoryHandler}
 *         >
 *         </radio-player>
 *       `;
 *     },
 *   );
 * }
 *
 * ...
 *
 * return html`
 *   ${this.radioPlayerTemplate}
 * `
 */
export declare class LazyLoadTemplate extends Directive {
    constructor(partInfo: PartInfo);
    update(part: Part, [importPromise, value]: DirectiveParameters<this>): TemplateResult;
    render(_importPromise: () => Promise<void>, value: () => TemplateResult): TemplateResult;
}
export declare const lazyLoadTemplate: (_importPromise: () => Promise<void>, value: () => TemplateResult) => DirectiveResult<typeof LazyLoadTemplate>;
//# sourceMappingURL=lazy-load-template.d.ts.map