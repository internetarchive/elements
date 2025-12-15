import type { TemplateResult } from 'lit';
import {
  Directive,
  directive,
  DirectiveParameters,
  DirectiveResult,
  Part,
  PartInfo,
} from 'lit/directive.js';

const resolved = new WeakSet();

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
 *       await import('./players/radio-player/radio-player-controller');
 *       const appDataStack = await this.appDataStack?.get();
 *       this.browserHistoryHandler = await appDataStack?.browserHistoryHandler.get();
 *     },
 *     (): TemplateResult => {
 *       return html`
 *         <radio-player-controller
 *           .metadataResponse=${this.metadataResponse}
 *           .browserHistoryHandler=${this.browserHistoryHandler}
 *         >
 *         </radio-player-controller>
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
  constructor(partInfo: PartInfo) {
    super(partInfo);
  }

  update(part: Part, [importPromise, value]: DirectiveParameters<this>) {
    if (!resolved.has(part)) {
      importPromise();
      resolved.add(part);
    }
    return this.render(importPromise, value);
  }

  render(_importPromise: () => Promise<void>, value: () => TemplateResult) {
    return value();
  }
}

export const lazyLoadTemplate = directive(LazyLoadTemplate);
