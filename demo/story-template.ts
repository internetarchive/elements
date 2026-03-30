import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { when } from 'lit/directives/when.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import './syntax-highlighter';
import themeStyles from '@src/themes/theme-styles';
import type { StyleInputData } from './story-components/story-styles-settings';
import type {
  AppliedProps,
  PropInputData,
} from './story-components/story-prop-settings';

import testTube from './test-tube.svg';

import './story-components/story-styles-settings';
import './story-components/story-prop-settings';

/**
 * A template for demoing the use of a custom element.
 */
@customElement('story-template')
export class StoryTemplate extends LitElement {
  @property({ type: String }) elementTag = '';

  @property({ type: String }) elementClassName = '';

  @property({ type: String }) customExampleUsage?: string;

  /* Optional stringified properties to always include in the example usage */
  @property({ type: String }) defaultUsageProps?: string;

  @property({ type: Object }) styleInputData?: StyleInputData;

  @property({ type: Object }) propInputData?: PropInputData;

  @property({ type: Boolean }) labs = false;

  @state() private detailsVisible = false;

  /* Stringified styles applied for the demo component */
  @state() private stringifiedStyles?: string;

  /* Stringified properties for the component in .myprop=${'foo'} format */
  @state() private stringifiedProps?: string;

  /* Whether settings inputs have been slotted in and should be displayed */
  @state() private shouldShowPropertySettings: boolean = false;

  /* Component that has been slotted into the demo, if applicable */
  @state() private slottedDemoComponent?: any;

  /* Tracks which copy button was last clicked, for feedback */
  @state() private copiedKey: 'import' | 'usage' | 'styling' | null = null;
  private _copyTimeout?: ReturnType<typeof setTimeout>;

  render() {
    return html`
      <div id="container">
        <h2>
          <code>&lt;${this.elementTag}&gt;</code>
          ${when(
            this.labs,
            () =>
              html`<img
                src=${testTube}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`,
          )}
        </h2>
        <h3>Demo</h3>
        <div class="slot-container" style=${ifDefined(this.stringifiedStyles)}>
          <slot
            name="demo"
            @slotchange=${this.handleDemoComponentSlotted}
          ></slot>
        </div>
        <button
          class="details-toggle ${this.detailsVisible ? 'expanded' : 'collapsed'}"
          @click=${() => (this.detailsVisible = !this.detailsVisible)}
        >
          Import, Usage &amp; Settings
        </button>
        <div id="details" class="${this.detailsVisible ? 'expanded' : 'collapsed'}">
          <div class="details-inner">
            ${this.detailsTemplate}
          </div>
        </div>
      </div>
    `;
  }

  private get detailsTemplate() {
    return html`
        <h3>
          Import
          <button
            class="copy-btn ${this.copiedKey === 'import' ? 'copied' : ''}"
            @click=${() => this.copyToClipboard(this.importCode, 'import')}
          >
            ${this.copiedKey === 'import' ? 'Copied!' : 'Copy'}
          </button>
        </h3>
        <syntax-highlighter
          language="typescript"
          .code=${this.importCode}
        ></syntax-highlighter>
        <h3>
          Usage
          <button
            class="copy-btn ${this.copiedKey === 'usage' ? 'copied' : ''}"
            @click=${() =>
              this.copyToClipboard(
                this.customExampleUsage ?? this.exampleUsage,
                'usage',
              )}
          >
            ${this.copiedKey === 'usage' ? 'Copied!' : 'Copy'}
          </button>
        </h3>
        <syntax-highlighter
          language="auto"
          .code=${this.customExampleUsage ?? this.exampleUsage}
        ></syntax-highlighter>
        ${when(
          this.cssCode,
          () => html`
            <h3>
              Styling
              <button
                class="copy-btn ${this.copiedKey === 'styling' ? 'copied' : ''}"
                @click=${() => this.copyToClipboard(this.cssCode, 'styling')}
              >
                ${this.copiedKey === 'styling' ? 'Copied!' : 'Copy'}
              </button>
            </h3>
            <syntax-highlighter
              language="css"
              .code=${this.cssCode}
            ></syntax-highlighter>
          `,
        )}
        <div class="two-col">
          <div class="left-col">
            <h3>Settings</h3>
            ${when(
              !!this.propInputData,
              () => html`
                <story-props-settings
                  .propInputData=${this.propInputData}
                  @propsApplied=${this.handlePropsApplied}
                ></story-props-settings>
              `,
            )}
            ${when(
              !this.propInputData && !this.shouldShowPropertySettings,
              () =>
                html`<p class="section-placeholder">No settings to adjust</p>`,
            )}
            <div
              class="slot-container ${this.shouldShowPropertySettings ? '' : 'hidden'}"
              @slotchange=${this.handleSettingsSlotChange}
            >
              <slot name="settings"></slot>
            </div>
          </div>
          <div class="right-col">
            <h3>Styles</h3>
            ${when(
              !!this.styleInputData,
              () => html`
                <story-styles-settings
                  .styleInputData=${this.styleInputData}
                  @stylesApplied=${this.handleStylesApplied}
                ></story-styles-settings>
              `,
              () =>
                html`<p class="section-placeholder">No styles to adjust</p>`,
            )}
          </div>
        </div>
    `;
  }

  private async copyToClipboard(
    text: string,
    which: 'import' | 'usage' | 'styling',
  ): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copiedKey = which;
      clearTimeout(this._copyTimeout);
      this._copyTimeout = setTimeout(() => (this.copiedKey = null), 2000);
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }
  }

  private get importCode(): string {
    if (this.elementClassName) {
      return `import '${this.modulePath}';\nimport { ${this.elementClassName} } from '${this.modulePath}';`;
    } else {
      return `import '${this.modulePath}';`;
    }
  }

  private get exampleUsage(): string {
    const defaultProps = this.defaultUsageProps
      ? '\n ' + this.defaultUsageProps + '\n'
      : '';
    const appliedProps = this.stringifiedProps ?? '';
    return `<${this.elementTag}${defaultProps}${appliedProps}></${this.elementTag}>`;
  }

  private get cssCode(): string {
    if (!this.stringifiedStyles) return '';
    return `${this.elementTag} {\n ${this.stringifiedStyles}\n}`;
  }

  private get modulePath(): string {
    return this.labs
      ? `@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`
      : `@internetarchive/elements/${this.elementTag}/${this.elementTag}`;
  }

  /* Toggles visibility of section depending on whether inputs have been slotted in */
  private handleSettingsSlotChange(e: Event): void {
    const slottedChildren = (e.target as HTMLSlotElement).assignedElements();
    this.shouldShowPropertySettings = slottedChildren.length > 0;
  }

  /* Detects and stores a reference to slotted demo component */
  private handleDemoComponentSlotted(e: Event): void {
    const slottedComponent = (
      e.target as HTMLSlotElement
    ).assignedElements()[0];
    if (slottedComponent) this.slottedDemoComponent = slottedComponent;
  }

  /* Applies styles from the settings to the component and code demo */
  private handleStylesApplied(e: CustomEvent): void {
    const stringifiedStyles = e.detail.styles;
    if (!stringifiedStyles) return;

    this.stringifiedStyles = stringifiedStyles;
  }

  /* Applies props from the settings to the component and code demo */
  private handlePropsApplied(e: CustomEvent): void {
    const stringifiedProps = e.detail.stringifiedProps;
    const appliedProps: AppliedProps = e.detail.appliedProps;
    if (!stringifiedProps || !appliedProps) return;

    this.stringifiedProps = stringifiedProps;
    appliedProps.forEach((prop) => {
      this.slottedDemoComponent[prop.propName] = prop.value;
    });
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
          display: flex;
          align-items: center;
          gap: 6px;
        }

        h3 {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #666;
          display: flex;
          align-items: center;
          gap: 5px;
          margin: 8px 0 4px;
          position: relative;
          z-index: 1;
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

        .copy-btn {
          background: none;
          border: 1px solid #bbb;
          border-radius: 3px;
          padding: 1px 7px;
          font-size: 0.7rem;
          cursor: pointer;
          color: #555;
          line-height: 1.4;
        }

        .copy-btn:hover {
          background: #0f3e6e;
          color: #fff;
          border-color: #0f3e6e;
        }

        .copy-btn.copied {
          background: #2a7a2a;
          color: #fff;
          border-color: #2a7a2a;
        }

        .slot-container {
          background-color: var(--primary-background-color);
          padding: 0.5em;
        }

        .slot-container.hidden {
          display: none;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 12px;
        }

        .left-col,
        .right-col {
          min-width: 0;
        }

        .section-placeholder {
          font-size: 0.78rem;
          color: #767676;
          margin: 4px 0;
          font-style: italic;
        }

        .details-inner syntax-highlighter {
          display: block;
          --syntax-max-height: 5.5rem;
        }

        .labs-icon {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      `,
    ];
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._copyTimeout);
  }
}
