import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IADonationThermometer } from './ia-donation-thermometer';

import './ia-donation-thermometer';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Height',
    cssVariable: '--ia-donation-thermometer-height',
    defaultValue: 20,
    inputType: 'range',
    min: 10,
    max: 60,
    unit: 'px',
  },
  {
    label: 'Border',
    cssVariable: '--ia-donation-thermometer-border',
    defaultValue: '1px solid #23765d',
    inputType: 'text',
    presets: [{ label: 'None', value: '0', note: 'donation banner' }],
    presetsInline: true,
  },
  {
    label: 'Border radius',
    cssVariable: '--ia-donation-thermometer-border-radius',
    defaultValue: '9999px',
    inputType: 'text',
    presets: [{ label: 'Square', value: '0' }],
    presetsInline: true,
  },
  {
    label: 'Goal padding',
    cssVariable: '--ia-donation-thermometer-goal-padding',
    defaultValue: '0 10px',
    inputType: 'text',
    presets: [{ label: 'Banner', value: '0 0.5rem', note: 'donation banner' }],
    presetsInline: true,
  },
  {
    section: 'Color',
    label: 'Fill',
    cssVariable: '--ia-donation-thermometer-fill-color',
    defaultValue: '#23765d',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Track',
    cssVariable: '--ia-donation-thermometer-track-color',
    defaultValue: '#b8f5e2',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Value on fill',
    cssVariable: '--ia-donation-thermometer-value-on-fill-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Value on track',
    cssVariable: '--ia-donation-thermometer-value-on-track-color',
    defaultValue: '#23765d',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Goal text',
    cssVariable: '--ia-theme-primary-text-color',
    defaultValue: '#2c2c2c',
    inputType: 'color',
  },
];

const propInputSettings: PropInputSettings<IADonationThermometer>[] = [
  {
    label: 'Current amount',
    propertyName: 'currentAmount',
    defaultValue: 2_350_000,
    inputType: 'number',
  },
  {
    label: 'Goal amount',
    propertyName: 'goalAmount',
    defaultValue: 6_500_000,
    inputType: 'number',
  },
  {
    label: 'Show current amount',
    propertyName: 'currentAmountMode',
    defaultValue: 'on',
    inputType: 'radio',
    radioOptions: ['on', 'off'],
  },
  {
    label: 'Goal text',
    propertyName: 'goalMessageMode',
    defaultValue: 'amount',
    inputType: 'radio',
    radioOptions: ['amount', 'message', 'off'],
  },
  {
    label: 'Accessible label',
    propertyName: 'label',
    defaultValue: 'Donation progress',
  },
  {
    section: 'Goal messages',
    label: 'Near goal',
    propertyName: 'goalNearMessage',
    defaultValue: 'We’ve almost reached our goal!',
  },
  {
    section: 'Goal messages',
    label: 'Goal reached',
    propertyName: 'goalReachedMessage',
    defaultValue: "We've reached our goal!",
  },
];

@customElement('ia-donation-thermometer-story')
export class IADonationThermometerStory extends LitElement {
  render() {
    return html`
      <story-template
        elementTag="ia-donation-thermometer"
        elementClassName="IADonationThermometer"
        .defaultUsageProps=${'.currentAmount=${2_350_000} .goalAmount=${6_500_000}'}
        .styleInputData=${{ settings: styleInputSettings, revertable: true }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-donation-thermometer
          slot="demo"
          .currentAmount=${2_350_000}
          .goalAmount=${6_500_000}
        ></ia-donation-thermometer>
      </story-template>
    `;
  }
}
