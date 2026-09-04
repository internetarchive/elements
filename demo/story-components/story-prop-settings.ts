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

import themeStyles from '@src/themes/theme-styles';
import { labelToId } from '../story-utils';

export type PropInputSettings<T> = {
  label: string;
  propertyName: keyof T;
  defaultValue: string | boolean | number;
  inputType?: 'text' | 'radio' | 'number';
  radioOptions?: string[] | boolean[];
  /*
   * Whether the property reflects to an attribute. Reflecting props are shown
   * in the usage example as attributes, since that is how they are most
   * naturally written in markup.
   */
  reflects?: boolean;
  /* Groups consecutive inputs under a shared heading */
  section?: string;
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
export class StoryPropsSettings extends LitElement {
  @property({ type: Object }) propInputData?: PropInputData;

  @queryAll('.prop-input')
  private propInputs?: NodeListOf<HTMLInputElement>;

  render() {
    if (!this.propInputData) return nothing;

    return html`
      <div class="settings-options">
        <table>
          ${this.propInputData.settings.map((input, index) => {
            const previous = this.propInputData?.settings[index - 1];
            const startsSection =
              !!input.section && input.section !== previous?.section;
            return html`
              ${startsSection
                ? html`<tr>
                    <th class="prop-section" colspan="2">${input.section}</th>
                  </tr>`
                : nothing}
              ${choose(
                input.inputType,
                [['radio', () => this.createRadioPropInput(input)]],
                () => this.createDefaultPropInput(input),
              ) ?? nothing}
            `;
          })}
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
            data-format=${typeof settings.defaultValue}
            placeholder=${settings.defaultValue}
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
                  id="${inputId}-${option}"
                  value=${option}
                  data-prop=${settings.propertyName}
                  data-format=${typeof settings.defaultValue}
                  ?checked=${settings.defaultValue === option}
                  @change=${this.applyProps}
                /><label for="${inputId}-${option}"> ${option} </label>`,
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
      let value: number | string | boolean = input.value;

      // Perform necessary conversions for props to apply
      switch (input.dataset.format) {
        case 'number':
          value = parseInt(value);
          break;
        case 'boolean':
          if (value === 'true') value = true;
          if (value === 'false') value = false;
          break;
      }

      // Always apply, so switching back to a default really resets the demo.
      appliedProps.push({ propName, value });

      // But leave defaults out of the example — consumers only need to pass
      // what they are actually changing.
      const setting = this.propInputData?.settings.find(
        (candidate) => candidate.propertyName === propName,
      );
      if (setting && value === setting.defaultValue) return;

      stringifiedProps.push(this.stringifyProp(propName, value, setting));
    });

    this.dispatchEvent(
      new CustomEvent('propsApplied', {
        detail: {
          stringifiedProps: stringifiedProps.join('\n  '),
          appliedProps,
        },
      }),
    );
  }

  /**
   * Renders one prop for the usage example. Reflecting props are written as
   * attributes -- Lit lowercases the property name for the attribute unless
   * told otherwise -- and everything else as a property binding.
   */
  private stringifyProp(
    propName: string,
    value: string | boolean | number,
    setting?: PropInputSettings<any>,
  ): string {
    if (!setting?.reflects) {
      const stringified =
        typeof value === 'string' ? `'${value}'` : value.toString();
      return `.${propName}=\${${stringified}}`;
    }

    const attribute = propName.toLowerCase();
    // A reflected boolean is present or absent, never ="false"
    if (typeof value === 'boolean') return attribute;
    return `${attribute}="${value}"`;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }

        .prop-section {
          text-align: left;
          padding-top: 0.75em;
          font-size: var(--font-size-standard--, 1em);
        }
      `,
    ];
  }
}
