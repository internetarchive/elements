import { __decorate } from "tslib";
import { html, LitElement, nothing } from 'lit';
import { customElement, query, queryAll, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ia-status-indicator';
import '../../../demo/story-template';
const styleInputSettings = [
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
const propInputSettings = [
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
let IAStatusIndicatorStory = class IAStatusIndicatorStory extends LitElement {
    constructor() {
        super(...arguments);
        /* Applied properties fro the component in .myprop=${'foo'} format */
        this.stringifiedProps = '';
    }
    render() {
        return html `
      <story-template
        elementTag="ia-status-indicator"
        .exampleUsage=${this.exampleUsage}
        .styleInputData=${{ settings: styleInputSettings }}
      >
        <div slot="demo">
          <ia-status-indicator></ia-status-indicator>
        </div>

        <div slot="settings">
          <table>
            ${propInputSettings.map((inputSettings) => this.createPropInput(inputSettings))}
          </table>
          <button @click=${this.apply}>Apply</button>
        </div>
      </story-template>
    `;
    }
    get exampleUsage() {
        return `<ia-status-indicator${this.stringifiedProps ?? ''}></ia-status-indicator>`;
    }
    /* Creates a property input */
    createPropInput(settings) {
        return (choose(settings.inputType, [['radio', () => this.radioPropInputTemplate(settings)]], () => this.defaultPropInputTemplate(settings)) ?? nothing);
    }
    defaultPropInputTemplate(settings) {
        const inputId = settings.label.toLowerCase().split(' ').join('-');
        return html `
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
    radioPropInputTemplate(settings) {
        if (settings.inputType !== 'radio' || !settings.radioOptions)
            return nothing;
        const inputId = settings.label.toLowerCase().split(' ').join('-');
        return html `
      <tr>
        <td><legend>${settings.label}</legend></td>
        <td>
          ${settings.radioOptions.map((option) => html `<input
                  type="radio"
                  class="prop-input"
                  name=${inputId}
                  id=${option}
                  value=${option}
                  data-prop=${settings.propertyName}
                  ?checked=${settings.defaultValue === option}
                /><label for=${option}> ${option} </label>`)}
        </td>
      </tr>
    `;
    }
    apply() {
        const appliedProps = [];
        this.propInputs?.forEach((input) => {
            if (!input.dataset.prop ||
                !input.value ||
                (input.type === 'radio' && !input.checked))
                return;
            const prop = input.dataset.prop;
            appliedProps.push(`.${prop}=\${'${input.value}'}`);
            this.component.setAttribute(prop, input.value);
        });
        if (!appliedProps.length)
            return;
        this.stringifiedProps = '\n  ' + appliedProps.join('\n  ') + '\n';
    }
};
__decorate([
    state()
], IAStatusIndicatorStory.prototype, "stringifiedProps", void 0);
__decorate([
    query('ia-status-indicator')
], IAStatusIndicatorStory.prototype, "component", void 0);
__decorate([
    queryAll('.prop-input')
], IAStatusIndicatorStory.prototype, "propInputs", void 0);
IAStatusIndicatorStory = __decorate([
    customElement('ia-status-indicator-story')
], IAStatusIndicatorStory);
export { IAStatusIndicatorStory };
//# sourceMappingURL=ia-status-indicator-story.js.map