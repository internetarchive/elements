import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement } from '@src/util/custom-element';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IADonationSection } from './ia-donation-section';

import './ia-donation-section';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Base font size',
    cssVariable: '--ia-donation-section-base-font-size',
    defaultValue: 10,
    inputType: 'range',
    min: 8,
    max: 16,
    step: 1,
    unit: 'px',
  },
  {
    section: 'Color',
    label: 'Badge',
    cssVariable: '--ia-donation-section-badge-background-color',
    defaultValue: '#333333',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Badge text',
    cssVariable: '--ia-donation-section-badge-font-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Text',
    cssVariable: '--ia-theme-primary-text-color',
    defaultValue: '#2c2c2c',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Background',
    cssVariable: '--ia-donation-section-background-color',
    defaultValue: 'transparent',
    inputType: 'text',
    presets: [{ label: 'Mint', value: '#d1faed', note: 'donation form' }],
    presetsInline: true,
  },
];

const propInputSettings: PropInputSettings<IADonationSection>[] = [
  {
    label: 'Badge',
    propertyName: 'sectionBadge',
    defaultValue: '1',
  },
  {
    label: 'Headline',
    propertyName: 'headline',
    defaultValue: 'Choose a frequency',
  },
  {
    label: 'Badge mode',
    propertyName: 'badgeMode',
    defaultValue: 'showbadge',
    inputType: 'radio',
    radioOptions: ['showbadge', 'hidebadge', 'hidebadgeleavespacing'],
  },
];

@customElement('ia-donation-section-story')
export class IADonationSectionStory extends LitElement {
  render() {
    return html`
      <story-template
        elementTag="ia-donation-section"
        elementClassName="IADonationSection"
        importPath="ia-donation-form/form-elements/ia-donation-section"
        .defaultUsageProps=${'sectionBadge="1" headline="Choose a frequency"'}
        .defaultSlottedContent=${'<p>Anything slotted in lands under the headline.</p>'}
        .styleInputData=${{ settings: styleInputSettings, revertable: true }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-donation-section
          slot="demo"
          sectionBadge="1"
          headline="Choose a frequency"
        >
          <p class="content">
            Anything slotted in lands under the headline. The badge and headline
            scale with the base font size, the slotted content keeps the page's
            own sizing.
          </p>
        </ia-donation-section>
      </story-template>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .content {
        margin: 0;
        font-size: 0.9rem;
      }
    `;
  }
}
