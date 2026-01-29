import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, query, queryAll, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { StyleInputSettings } from '@demo/story-template';
import { IAStatusIndicator } from './ia-status-indicator';

import './ia-status-indicator';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Width',
    cssVariable: '--ia-theme-icon-width',
    defaultValue: '1.25rem',
  },
  {
    label: 'Color - loading',
    cssVariable: '--ia-theme-primary-text-color',
    defaultValue: '#2c2c2c',
    inputType: 'color',
  },
  {
    label: 'Color - success',
    cssVariable: '--ia-theme-color-success',
    defaultValue: '#31a481',
    inputType: 'color',
  },
  {
    label: 'Color - error',
    cssVariable: '--ia-theme-color-danger',
    defaultValue: '#e51c23',
    inputType: 'color',
  },
];

export type PropInputSettings<T> = {
  label: string;
  propertyName: keyof T;
  defaultValue?: string;
  inputType?: 'text' | 'radio';
  radioOptions?: string[];
};

const propInputSettings: PropInputSettings<IAStatusIndicator>[] = [
  {
    label: 'Mode',
    propertyName: 'mode',
    defaultValue: 'loading',
    inputType: 'radio',
    radioOptions: ['loading', 'success', 'error'],
  },
  {
    label: 'Accessible title - loading',
    propertyName: 'loadingTitle',
    defaultValue: 'Loading...',
  },
  {
    label: 'Loading style',
    propertyName: 'loadingStyle',
    defaultValue: 'ring-dots',
    inputType: 'radio',
    radioOptions: ['ring-dots', 'ring'],
  },
  {
    label: 'Accessible title - success',
    propertyName: 'successTitle',
    defaultValue: 'Success',
  },
  {
    label: 'Accessible title - error',
    propertyName: 'errorTitle',
    defaultValue: 'Error',
  },
];

@customElement('ia-status-indicator-story')
export class IAStatusIndicatorStory extends LitElement {
  /* Applied properties fro the component in .myprop=${'foo'} format */
  @state()
  private stringifiedProps: string = '';

  @query('ia-status-indicator')
  private component!: IAStatusIndicator;

  @queryAll('.prop-input')
  private propInputs?: NodeListOf<HTMLInputElement>;

  render() {
    return html`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .exampleUsage=${this.exampleUsage}
        .styleInputData=${{ settings: styleInputSettings }}
      >
        <div slot="demo">
          <ia-status-indicator></ia-status-indicator>
        </div>

        <div slot="settings">
          <table>
            ${propInputSettings.map((inputSettings) =>
              this.createPropInput(inputSettings),
            )}
          </table>
          <button @click=${this.apply}>Apply</button>
        </div>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    return `<ia-status-indicator${this.stringifiedProps ?? ''}></ia-status-indicator>`;
  }

  /* Creates a property input */
  private createPropInput(
    settings: PropInputSettings<IAStatusIndicator>,
  ): TemplateResult | typeof nothing {
    return (
      choose(
        settings.inputType,
        [['radio', () => this.radioPropInputTemplate(settings)]],
        () => this.defaultPropInputTemplate(settings),
      ) ?? nothing
    );
  }

  private defaultPropInputTemplate(
    settings: PropInputSettings<IAStatusIndicator>,
  ): TemplateResult {
    const inputId = settings.label.toLowerCase().split(' ').join('-');

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

  /* Generator for a radio prop input, including the associated label text */
  private radioPropInputTemplate(
    settings: PropInputSettings<IAStatusIndicator>,
  ): TemplateResult | typeof nothing {
    if (settings.inputType !== 'radio' || !settings.radioOptions)
      return nothing;

    const inputId = settings.label.toLowerCase().split(' ').join('-');

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

  private apply() {
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
      this.component.setAttribute(prop, input.value);
    });

    if (!appliedProps.length) return;

    this.stringifiedProps = '\n  ' + appliedProps.join('\n  ') + '\n';
  }
}
