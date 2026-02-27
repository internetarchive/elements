import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { PropInputSettings } from '@demo/story-template';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
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

  render() {
    return html`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .exampleUsage=${this.exampleUsage}
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-status-indicator slot="demo"></ia-status-indicator>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    return `<ia-status-indicator${this.stringifiedProps ?? ''}></ia-status-indicator>`;
  }
}
