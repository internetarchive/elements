import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import './ia-button';
import '../../../demo/story-template';
const styleInputSettings = [
    {
        label: 'Text Color (Primary)',
        cssVariable: '--ia-theme-primary-cta-text-color',
        defaultValue: '#ffffff',
        inputType: 'color',
    },
    {
        label: 'Background Color (Primary)',
        cssVariable: '--ia-theme-primary-cta-fill',
        defaultValue: '#194880',
        inputType: 'color',
    },
];
let IAButtonStory = class IAButtonStory extends LitElement {
    render() {
        return html `
      <story-template
        elementTag="ia-button"
        .exampleUsage=${this.exampleUsage}
        .styleInputData=${{ settings: styleInputSettings }}
      >
        <div slot="demo">
          <ia-button @click=${() => alert('Button clicked!')}
            >Click Me</ia-button
          >
        </div>
      </story-template>
    `;
    }
    get exampleUsage() {
        return `<ia-button @click=\${() => alert('Button clicked!')}>Click Me</ia-button>`;
    }
};
IAButtonStory = __decorate([
    customElement('ia-button-story')
], IAButtonStory);
export { IAButtonStory };
//# sourceMappingURL=ia-button-story.js.map