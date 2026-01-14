import {
  css,
  html,
  LitElement,
  nothing,
  TemplateResult,
  type CSSResultGroup,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { when } from 'lit/directives/when.js';

import './syntax-highlighter';
import themeStyles from '@src/themes/theme-styles';

import arrow from './arrow.svg';
import testTube from './test-tube.svg';

export interface StyleInputSettings {
  id: string;
  cssVariable: string;
  defaultValue?: string;
  inputType?: 'color' | 'text';
}

/**
 * A template for demoing the use of a custom element.
 */
@customElement('story-template')
export class StoryTemplate extends LitElement {
  @property({ type: String }) elementTag = '';

  @property({ type: String }) exampleUsage = '';

  @property({ type: Array }) styleInputData?: StyleInputSettings[];

  @property({ type: Boolean }) labs = false;

  @state() private visible = false;

  render() {
    return html`
      <h2>
        <a @click=${() => (this.visible = !this.visible)}>
          <img
            class="disclosure-arrow ${this.visible ? 'open' : ''}"
            src=${arrow}
          /><code> &lt;${this.elementTag}&gt;</code> ${when(
            this.labs,
            () =>
              html`<img
                src=${testTube}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`,
          )}
        </a>
      </h2>
      ${when(this.visible, () => this.elementDemoTemplate)}
    `;
  }

  private get elementDemoTemplate() {
    return html`
      <div id="container">
        <h3>Demo</h3>
        <div class="slot-container">
          <slot name="demo"></slot>
        </div>
        <h3>Import</h3>
        <syntax-highlighter .code=${this.importCode}></syntax-highlighter>
        <h3>Usage</h3>
        <syntax-highlighter .code=${this.exampleUsage}></syntax-highlighter>
        ${this.styleSettingsTemplate}
        <h3>Settings</h3>
        <div class="slot-container">
          <slot name="settings"></slot>
        </div>
      </div>
    `;
  }

  private get styleSettingsTemplate(): TemplateResult | typeof nothing {
    if (!this.styleInputData) return nothing;

    return html`${this.styleInputData.map(
      (input) => html`
        <input
          id=${input.id}
          class="style-input"
          type=${input.inputType ?? 'text'}
          value=${input.defaultValue ?? ''}
          data-variable=${input.cssVariable}
        />
      `,
    )}`;
  }

  private get importCode(): string {
    return `
import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';
    `;
  }

  private get elementClassName(): string | undefined {
    return customElements.get(this.elementTag)?.name;
  }

  private get modulePath(): string {
    return this.labs
      ? `@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`
      : `@internetarchive/elements/${this.elementTag}/${this.elementTag}`;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        #container {
          border: 1px solid #ccc;
          padding: 0 16px 16px 16px;
        }

        h2 {
          cursor: pointer;
          margin-top: 8px;
          margin-bottom: 8px;
        }

        h3 {
          margin-bottom: 8px;
        }

        .slot-container {
          background-color: var(--primary-background-color);
          padding: 1em;
        }

        .disclosure-arrow {
          width: 12px;
          height: 12px;
          transform: rotate(-90deg);
          transition: transform 0.2s ease-in-out;
        }

        .disclosure-arrow.open {
          transform: rotate(0deg);
        }

        .labs-icon {
          width: 20px;
          height: 20px;
          margin-left: 4px;
          filter: invert(1);
          vertical-align: middle;
        }
      `,
    ];
  }
}
