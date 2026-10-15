import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import './syntax-highlighter';
import themeStyles from '@src/themes/theme-styles';

import { tagFromHash } from './element-hash';

/**
 * A template for demoing a service, which is code with no UI. The demo goes in
 * the `console` slot: inputs, a way to run it, and the result. The template
 * adds the import path, a usage snippet and the typed API under it.
 */
@customElement('service-template')
export class ServiceTemplate extends LitElement {
  /** The service's directory name, e.g. `field-parsers`. */
  @property({ type: String }) serviceName = '';

  /** The module's path under `@internetarchive/elements/services/`. */
  @property({ type: String }) importPath?: string;

  /** The import statement to show, when it isn't the default one. */
  @property({ type: String }) importCode?: string;

  /** A snippet showing how a consumer calls the service. */
  @property({ type: String }) usage = '';

  /** The TypeScript source of the service's public types. */
  @property({ type: String }) apiSource = '';

  /** Whether the demo is showing this service on its own. */
  @state() private focused = false;

  /** Whether the Import, Usage & API section is expanded. */
  @state() private detailsVisible = false;

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('serviceName')) {
      this.focused = this.serviceName === tagFromHash(window.location.hash);
      // Open when this is the only service on the page, since nothing is
      // buried under it.
      this.detailsVisible = this.focused;
    }
  }

  render() {
    return html`
      <div id="container">
        <h2><code>${this.serviceName}</code></h2>
        <h3>Try it</h3>
        <div class="console">
          <slot name="console"></slot>
        </div>
        <button
          class="details-toggle ${this.detailsVisible
            ? 'expanded'
            : 'collapsed'}"
          aria-expanded="${this.detailsVisible}"
          @click=${() => (this.detailsVisible = !this.detailsVisible)}
        >
          Import, Usage &amp; API
        </button>
        <div
          id="details"
          class="${this.detailsVisible ? 'expanded' : 'collapsed'}"
        >
          <div class="details-inner ${this.focused ? 'focused' : ''}">
            <h3>Import</h3>
            <syntax-highlighter
              language="typescript"
              .code=${this.importCode ?? this.defaultImport}
            ></syntax-highlighter>
            <h3>Usage</h3>
            <syntax-highlighter
              language="typescript"
              .code=${this.usage}
            ></syntax-highlighter>
            <h3>API</h3>
            <syntax-highlighter
              language="typescript"
              .code=${this.apiSource}
            ></syntax-highlighter>
            <slot name="usage-notes"></slot>
          </div>
        </div>
      </div>
    `;
  }

  private get defaultImport(): string {
    const path = this.importPath ?? `${this.serviceName}/${this.serviceName}`;
    return `import '@internetarchive/elements/services/${path}';`;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        #container {
          background: #f0f0f0;
          padding: 0 10px 10px;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
        }

        #details {
          display: grid;
          grid-template-rows: 1fr;
          transition: grid-template-rows 0.2s ease;
        }

        #details.collapsed {
          grid-template-rows: 0fr;
        }

        .details-inner {
          font-size: 14px;
          overflow: hidden;
          min-height: 0;
        }

        h2 {
          font-size: 0.85rem;
          font-weight: 600;
          margin: 10px 0 8px;
        }

        h3 {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #666;
          margin: 8px 0 4px;
        }

        .details-toggle {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #595959;
          cursor: pointer;
          user-select: none;
          border: none;
          background: none;
          padding: 0;
        }

        .details-toggle::before {
          content: '▾';
          font-size: 0.65rem;
          display: inline-block;
          transition: transform 0.15s;
        }

        .details-toggle.collapsed::before {
          transform: rotate(-90deg);
        }

        .console {
          background-color: var(--primary-background-color);
          padding: 0.5em;
        }

        .details-inner syntax-highlighter {
          display: block;
          --syntax-max-height: 8rem;
        }

        .details-inner.focused syntax-highlighter {
          --syntax-max-height: none;
        }
      `,
    ];
  }
}
