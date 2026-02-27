import {
  css,
  html,
  LitElement,
  nothing,
  TemplateResult,
  type CSSResultGroup,
} from 'lit';
import { property, queryAll } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { choose } from 'lit/directives/choose.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import themeStyles from '@src/themes/theme-styles';
import { labelToId } from '../story-utils';

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

export type AppliedProps = {
  propName: string;
  value: string | boolean | number;
}[];

/**
 * A template for displaying the prop options.
 */
@customElement('story-props-settings')
export class StoryTemplate extends LitElement {
  @property({ type: Object }) propInputData?: PropInputData;

  @queryAll('.prop-input')
  private propInputs?: NodeListOf<HTMLInputElement>;

  render() {
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
    const inputId = labelToId(settings.label);

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

    const inputId = labelToId(settings.label);

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

  /* Applies properties to demo component */
  private applyProps() {
    const stringifiedProps: string[] = [];
    const appliedProps: AppliedProps = [];
    this.propInputs?.forEach((input) => {
      if (
        !input.dataset.prop ||
        !input.value ||
        (input.type === 'radio' && !input.checked)
      )
        return;

      const propName = input.dataset.prop;
      stringifiedProps.push(`.${propName}=\${'${input.value}'}`);
      appliedProps.push({ propName, value: input.value });
    });

    this.dispatchEvent(
      new CustomEvent('propsApplied', {
        detail: {
          stringifiedProps: '\n  ' + stringifiedProps.join('\n  ') + '\n',
          appliedProps,
        },
      }),
    );
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }
      `,
    ];
  }
}
