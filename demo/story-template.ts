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
import { choose } from 'lit/directives/choose.js';

import './syntax-highlighter';
import themeStyles from '@src/themes/theme-styles';
import type { StyleInputData } from './story-components/story-styles-settings';

import arrow from './arrow.svg';
import testTube from './test-tube.svg';

import './story-components/story-styles-settings';

export type PropInputSettings<T> = {
  label: string;
  propertyName: keyof T;
  defaultValue?: string;
  inputType?: 'text' | 'radio';
  radioOptions?: string[];
};

export type PropInputData = {
  settings: PropInputSettings<any>[];
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

  @property({ type: Object }) propInputData?: PropInputData;

  @property({ type: Boolean }) labs = false;

  @state() private visible = false;

  /* Stringified styles applied for the demo component */
  @state() private appliedStyles?: string;

  /* Stringified properties for the component in .myprop=${'foo'} format */
  @state()
  private appliedProps?: string;

  /* Component that has been slotted into the demo, if applicable */
  @state() private slottedDemoComponent?: any;

  @queryAll('.prop-input')
  private propInputs?: NodeListOf<HTMLInputElement>;

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
          <slot
            name="demo"
            @slotchange=${this.handleDemoComponentSlotted}
          ></slot>
        </div>
        <h3>Import</h3>
        <syntax-highlighter
          language="typescript"
          .code=${this.importCode}
        ></syntax-highlighter>
        <h3>Usage</h3>
        <syntax-highlighter
          language="auto"
          .code=${this.demoUsage}
        ></syntax-highlighter>
        ${when(
          this.cssCode,
          () => html`
            <h3>Styling</h3>
            <syntax-highlighter
              language="css"
              .code=${this.cssCode}
            ></syntax-highlighter>
          `,
        )}
        <story-styles-settings
          .styleInputData=${this.styleInputData}
          @stylesApplied=${this.handleStylesApplied}
        ></story-styles-settings>
        ${this.propSettingsTemplate}
      </div>
    `;
  }

  private get propSettingsTemplate(): TemplateResult | typeof nothing {
    if (!this.propInputData) return nothing;

    return html`
      <h3>Properties</h3>
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map(
            (input) =>
              choose(
                input.inputType,
                [['radio', () => this.createRadioPropInput(input)]],
                () => this.createDefaultPropInput(input),
              ) ?? nothing,
          )}
        </table>
        <button @click=${this.applyProps}>Apply</button>
      </div>
    `;
  }

  private createDefaultPropInput(
    settings: PropInputSettings<any>,
  ): TemplateResult | typeof nothing {
    const inputId = this.labelToId(settings.label);

    return html`
      <tr>
        <td><label for=${inputId}>${settings.label}</label></td>
        <td>
          <input
            class="prop-input"
            type=${settings.inputType ?? 'text'}
            id=${inputId}
            data-prop=${settings.propertyName}
            placeholder=${ifDefined(settings?.defaultValue)}
          />
        </td>
      </tr>
    `;
  }

  private createRadioPropInput(
    settings: PropInputSettings<any>,
  ): TemplateResult | typeof nothing {
    if (settings.inputType !== 'radio' || !settings.radioOptions)
      return nothing;

    const inputId = this.labelToId(settings.label);

    return html`
      <tr>
        <td><legend>${settings.label}</legend></td>
        <td>
          ${settings.radioOptions.map(
            (option) =>
              html`<input
                  type="radio"
                  class="prop-input"
                  name=${inputId}
                  id=${option}
                  value=${option}
                  data-prop=${settings.propertyName}
                  ?checked=${settings.defaultValue === option}
                /><label for=${option}> ${option} </label>`,
          )}
        </td>
      </tr>
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

  private get demoUsage(): string {
    return `<${this.elementTag}${this.appliedProps ?? ''}></${this.elementTag}>`;
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

  /* Detects and stores a reference to slotted demo component */
  private handleDemoComponentSlotted(e: Event): void {
    const slottedComponent = (
      e.target as HTMLSlotElement
    ).assignedElements()[0];
    if (slottedComponent) this.slottedDemoComponent = slottedComponent;
  }

  /* Applies styles from the settings to the component and code demo */
  private handleStylesApplied(e: CustomEvent): void {
    const appliedStyles = e.detail.styles;
    if (!appliedStyles) return;

    this.appliedStyles = appliedStyles;
  }

  /* Applies properties to demo component */
  private applyProps() {
    const appliedProps: string[] = [];
    this.propInputs?.forEach((input) => {
      if (
        !input.dataset.prop ||
        !input.value ||
        (input.type === 'radio' && !input.checked)
      )
        return;

      const prop = input.dataset.prop;
      appliedProps.push(`.${prop}=\${'${input.value}'}`);
      this.slottedDemoComponent?.setAttribute(prop, input.value);
    });

    if (!appliedProps.length) return;

    this.appliedProps = '\n  ' + appliedProps.join('\n  ') + '\n';
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
        .settings-options {
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
