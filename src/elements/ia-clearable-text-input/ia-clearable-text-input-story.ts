import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IaClearableTextInput } from './ia-clearable-text-input';

import './ia-clearable-text-input';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Height',
    cssVariable: '--input-height',
    defaultValue: '3rem',
  },
  {
    label: 'Text color',
    cssVariable: '--input-color',
    defaultValue: '#555555',
    inputType: 'color',
  },
  {
    label: 'Border color',
    cssVariable: '--input-border-color',
    defaultValue: '#cccccc',
    inputType: 'color',
  },
  {
    label: 'Border radius',
    cssVariable: '--input-border-radius',
    defaultValue: '2rem',
  },
  {
    label: 'Font size',
    cssVariable: '--input-font-size',
    defaultValue: '1.7rem',
  },
  {
    label: 'Clear icon background',
    cssVariable: '--clear-button-icon-background',
    defaultValue: '#2c2c2c',
    inputType: 'color',
  },
  {
    label: 'Clear icon color',
    cssVariable: '--clear-button-icon-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
];

const propInputSettings: PropInputSettings<IaClearableTextInput>[] = [
  {
    label: 'Value',
    propertyName: 'value',
    defaultValue: '',
  },
  {
    label: 'Placeholder',
    propertyName: 'placeholder',
    defaultValue: 'Search...',
  },
  {
    label: 'Screen reader label',
    propertyName: 'screenReaderLabel',
    defaultValue: 'Search the archive',
  },
  {
    label: 'Clear button screen reader label',
    propertyName: 'clearButtonScreenReaderLabel',
    defaultValue: 'Clear',
  },
  {
    label: 'Focus the field after clearing',
    propertyName: 'focusOnClear',
    defaultValue: true,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Always show the clear button',
    propertyName: 'forceClearButton',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
];

@customElement('ia-clearable-text-input-story')
export class IaClearableTextInputStory extends LitElement {
  render() {
    return html`
      <story-template
        elementTag="ia-clearable-text-input"
        elementClassName="IaClearableTextInput"
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-clearable-text-input slot="demo"></ia-clearable-text-input>
        <div slot="usage-notes">
          <p>
            A text field with a clear button that appears once there's something
            to clear. Set <code>forceClearButton</code> to keep the button
            visible even when the field is empty.
          </p>
          <p>
            Emits <code>input</code> on every value change, including when the
            clear button empties the field, <code>clear</code> carrying the
            value the field held beforehand, and <code>submit</code> carrying
            the current value when Enter is pressed.
          </p>
          <p>
            <code>screenReaderLabel</code> is what labels the field, so it needs
            setting for the component to be accessible.
          </p>
        </div>
      </story-template>
    `;
  }
}
