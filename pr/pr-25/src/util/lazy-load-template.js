import { Directive, directive, } from 'lit/directive.js';
const resolved = new WeakSet();
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
export class LazyLoadTemplate extends Directive {
    constructor(partInfo) {
        super(partInfo);
    }
    update(part, [importPromise, value]) {
        if (!resolved.has(part)) {
            importPromise();
            resolved.add(part);
        }
        return this.render(importPromise, value);
    }
    render(_importPromise, value) {
        return value();
    }
}
export const lazyLoadTemplate = directive(LazyLoadTemplate);
//# sourceMappingURL=lazy-load-template.js.map