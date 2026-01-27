import {
  css,
  html,
  LitElement,
  nothing,
  TemplateResult,
  type CSSResultGroup,
} from 'lit';
import { property, queryAll, state } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { when } from 'lit/directives/when.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import './syntax-highlighter';
import themeStyles from '@src/themes/theme-styles';

import arrow from './arrow.svg';
import testTube from './test-tube.svg';

export type StyleInputSettings = {
  label: string;
  cssVariable: string;
  defaultValue?: string;
  inputType?: 'color' | 'text';
};

export type StyleInputData = {
  settings: StyleInputSettings[];
};

/**
 * A template for demoing the use of a custom element.
 */
@customElement('story-template')
export class StoryTemplate extends LitElement {
  @property({ type: String }) elementTag = '';

  @property({ type: String }) elementClassName = '';

  @property({ type: String }) exampleUsage = '';

  @property({ type: Object }) styleInputData?: StyleInputData;

  @property({ type: Boolean }) labs = false;

  @state() private visible = false;

  /* Stringified styles applied for the demo component */
  @state() private appliedStyles?: string;

  /* Whether settings inputs have been slotted in and should be displayed */
  @state() private shouldShowPropertySettings: boolean = false;

  @queryAll('.style-input')
  private styleInputs?: NodeListOf<HTMLInputElement>;

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
        <div class="slot-container" style=${ifDefined(this.appliedStyles)}>
          <slot name="demo"></slot>
        </div>
        <h3>Import</h3>
        <syntax-highlighter .code=${this.importCode}></syntax-highlighter>
        <h3>Usage</h3>
        <syntax-highlighter
          .code=${this.exampleUsage + this.cssCode}
        ></syntax-highlighter>
        ${this.styleSettingsTemplate}
        ${this.shouldShowPropertySettings ? html` <h3>Settings</h3>` : nothing}
        <div
          class="slot-container"
          style="${!this.shouldShowPropertySettings ? 'display: none' : ''}"
          @slotchange=${this.handleSettingsSlotChange}
        >
          <slot name="settings"></slot>
        </div>
      </div>
    `;
  }

  private get styleSettingsTemplate(): TemplateResult | typeof nothing {
    if (!this.styleInputData) return nothing;

    return html`
      <h3>Styles</h3>
      <div class="style-options">
        <table>
          ${this.styleInputData.settings.map(
            (input) => html`
              <tr>
                <td>
                  <label for=${this.labelToId(input.label)}
                    >${input.label}</label
                  >
                </td>
                <td>
                  <input
                    id=${this.labelToId(input.label)}
                    class="style-input"
                    type=${input.inputType ?? 'text'}
                    value=${input.defaultValue ?? ''}
                    data-variable=${input.cssVariable}
                  />
                </td>
              </tr>
            `,
          )}
        </table>
        <button @click=${this.applyStyles}>Apply</button>
      </div>
    `;
  }

  private get importCode(): string {
    if (this.elementClassName) {
      return `
import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';
    `;
    } else {
      return `
import '${this.modulePath}';
  `;
    }
  }

  private get cssCode(): string {
    if (!this.appliedStyles) return '';
    return `

${this.elementTag} {
  ${this.appliedStyles}
}
    `;
  }

  private get modulePath(): string {
    return this.labs
      ? `@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`
      : `@internetarchive/elements/${this.elementTag}/${this.elementTag}`;
  }

  /* Toggles visibility of section depending on whether inputs have been slotted into it */
  private handleSettingsSlotChange(e: Event): void {
    const slottedChildren = (e.target as HTMLSlotElement).assignedElements();
    this.shouldShowPropertySettings = slottedChildren.length > 0;
  }

  /* Applies styles to demo component. */
  private applyStyles(): void {
    const appliedStyles: string[] = [];

    this.styleInputs?.forEach((input) => {
      if (!input.dataset.variable || !input.value) return;
      appliedStyles.push(`${input.dataset.variable}: ${input.value};`);
    });

    this.appliedStyles = appliedStyles.join('\n  ');
  }

  /* Converts a label to a usable input id, i.e. My setting -> my-setting */
  private labelToId(label: string): string {
    return label.toLowerCase().split(' ').join('-');
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

        .slot-container,
        .style-options {
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
