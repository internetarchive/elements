import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { StyleInputSettings } from '@demo/story-components/story-styles-settings';

import '@demo/story-template';
import './ia-clearable-text-input';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Input height',
    cssVariable: '--input-height',
    defaultValue: '3rem',
    inputType: 'text',
  },
  {
    label: 'Border color',
    cssVariable: '--input-border-color',
    defaultValue: '#ccc',
    inputType: 'color',
  },
  {
    label: 'Border radius',
    cssVariable: '--input-border-radius',
    defaultValue: '2rem',
    inputType: 'text',
  },
  {
    label: 'Background color',
    cssVariable: '--input-background-color',
    defaultValue: 'transparent',
    inputType: 'color',
  },
  {
    label: 'Text color',
    cssVariable: '--input-color',
    defaultValue: '#555',
    inputType: 'color',
  },
  {
    label: 'Focused border color',
    cssVariable: '--input-focused-border-color',
    defaultValue: '#66afe9',
    inputType: 'color',
  },
];

@customElement('ia-clearable-text-input-story')
export class IAClearableTextInputStory extends LitElement {
  @state() private lastInputResult = '';

  @state() private lastClearResult = '';

  @state() private lastSubmitResult = '';

  render() {
    return html`
      <story-template
        elementTag="ia-clearable-text-input"
        elementClassName="IaClearableTextInput"
        .styleInputData=${{ settings: styleInputSettings }}
        .customExampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <ia-clearable-text-input
            .placeholder=${'Search...'}
            .screenReaderLabel=${'Search'}
            @clear=${this.onClear}
            @input=${this.onInput}
            @submit=${this.onSubmit}
          ></ia-clearable-text-input>
          <p>
            Current value (updated on each input event):
            <span id="input-result">${this.lastInputResult}</span>
          </p>
          <p ?hidden=${!this.lastClearResult}>
            Value before the last clear event:
            <span id="clear-result">${this.lastClearResult}</span>
          </p>
          <p ?hidden=${!this.lastSubmitResult}>
            Last submitted value:
            <span id="submit-result">${this.lastSubmitResult}</span>
          </p>
        </div>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    return `
      <ia-clearable-text-input
        .placeholder=\${'Search...'}
        .screenReaderLabel=\${'Search'}
        @clear=\${(e: CustomEvent<string>) => console.log(e.detail)}
        @submit=\${(e: CustomEvent<string>) => console.log(e.detail)}
      ></ia-clearable-text-input>
    `.replace(/\n {6}/g, '\n');
  }

  private onClear(e: CustomEvent<string>): void {
    this.lastClearResult = e.detail;
  }

  private onInput(e: Event): void {
    this.lastInputResult = (e.target as HTMLInputElement).value;
  }

  private onSubmit(e: CustomEvent<string>): void {
    this.lastSubmitResult = e.detail;
  }

  static get styles(): CSSResultGroup {
    return css`
      p {
        margin: 0.8rem 0 0;
      }
    `;
  }
}
