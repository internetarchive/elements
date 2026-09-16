import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { DonationPaymentInfo } from '../models/donation-payment-info';
import type { IADonationEditDonation } from './ia-donation-edit-donation';

import './ia-donation-edit-donation';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Base font size',
    cssVariable: '--ia-donation-edit-base-font-size',
    defaultValue: 10,
    inputType: 'range',
    min: 8,
    max: 16,
    step: 1,
    unit: 'px',
  },
  {
    label: 'Button gap',
    cssVariable: '--ia-donation-edit-button-grid-gap',
    defaultValue: '10px',
    inputType: 'text',
  },
  {
    section: 'Color',
    label: 'Button',
    cssVariable: '--ia-donation-edit-button-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Button text',
    cssVariable: '--ia-donation-edit-button-font-color',
    defaultValue: '#000000',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Button border',
    cssVariable: '--ia-donation-edit-button-border-color',
    defaultValue: '#333333',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Selected button',
    cssVariable: '--ia-donation-edit-button-selected-color',
    defaultValue: '#f9bf3b',
    inputType: 'color',
    presets: [
      { label: 'Banner green', value: '#31a481', note: 'donation banner' },
    ],
    presetsInline: true,
  },
  {
    section: 'Color',
    label: 'Selected button text',
    cssVariable: '--ia-donation-edit-button-selected-font-color',
    defaultValue: '#000000',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Step badge',
    cssVariable: '--ia-donation-edit-badge-background-color',
    defaultValue: '#333333',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Background',
    cssVariable: '--ia-donation-edit-background-color',
    defaultValue: 'transparent',
    inputType: 'text',
    presets: [{ label: 'Mint', value: '#d1faed', note: 'donation form' }],
    presetsInline: true,
  },
];

const propInputSettings: PropInputSettings<IADonationEditDonation>[] = [
  {
    label: 'Selected amount',
    propertyName: 'defaultSelectedAmount',
    defaultValue: 10,
    inputType: 'number',
  },
  {
    label: 'Step numbers',
    propertyName: 'stepNumberMode',
    defaultValue: 'shownumbers',
    inputType: 'radio',
    radioOptions: ['shownumbers', 'hidenumbers'],
  },
  {
    label: 'Frequency choice',
    propertyName: 'frequencySelectionMode',
    defaultValue: 'button',
    inputType: 'radio',
    radioOptions: ['button', 'checkbox', 'hide'],
  },
  {
    label: 'Amount layout',
    propertyName: 'amountSelectionLayout',
    defaultValue: 'multi-line',
    inputType: 'radio',
    radioOptions: ['multi-line', 'single-line'],
  },
  {
    label: 'Custom amount',
    propertyName: 'customAmountMode',
    defaultValue: 'display',
    inputType: 'radio',
    radioOptions: ['display', 'hide'],
  },
  {
    label: 'Cover fees checkbox',
    propertyName: 'coverFeesCheckboxMode',
    defaultValue: 'display',
    inputType: 'radio',
    radioOptions: ['display', 'hide'],
  },
  {
    label: 'Amount headline',
    propertyName: 'amountTitleDisplayMode',
    defaultValue: 'default',
    inputType: 'radio',
    radioOptions: ['default', 'slot'],
  },
];

@customElement('ia-donation-edit-donation-story')
export class IADonationEditDonationStory extends LitElement {
  /** The last donationInfoChanged payload, shown under the demo. */
  @state() private lastChange?: DonationPaymentInfo;

  /** The last editDonationError code, cleared on the next valid change. */
  @state() private lastError?: string;

  render() {
    return html`
      <story-template
        elementTag="ia-donation-edit-donation"
        elementClassName="IADonationEditDonation"
        importPath="ia-donation-form/form-elements/ia-donation-edit-donation"
        .defaultUsageProps=${'@donationInfoChanged=${(e: CustomEvent) => console.log(e.detail.donationInfo)}'}
        .styleInputData=${{ settings: styleInputSettings, revertable: true }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-donation-edit-donation
          slot="demo"
          @donationInfoChanged=${this.handleChanged}
          @editDonationError=${this.handleError}
        >
          <p slot="edit-donation-amount-title" class="slotted-title">
            <b>Can you chip in?</b> <span>(USD)</span>
          </p>
        </ia-donation-edit-donation>

        <div slot="settings" class="readout">
          <h4>Events</h4>
          <dl>
            <dt>donationInfoChanged</dt>
            <dd>
              ${this.lastChange
                ? html`${this.lastChange.donationType},
                    $${this.lastChange.amount}${this.lastChange.coverFees
                      ? html` + $${this.lastChange.fee} fee`
                      : ''}
                    = <b>$${this.lastChange.total}</b>`
                : html`<i>none yet</i>`}
            </dd>
            <dt>editDonationError</dt>
            <dd>${this.lastError ?? html`<i>none</i>`}</dd>
          </dl>
        </div>
      </story-template>
    `;
  }

  private handleChanged(e: CustomEvent): void {
    this.lastChange = e.detail.donationInfo;
    this.lastError = undefined;
  }

  private handleError(e: CustomEvent): void {
    this.lastError = e.detail.error;
  }

  static get styles(): CSSResultGroup {
    return css`
      ia-donation-edit-donation {
        display: block;
        max-width: 32rem;
      }

      .slotted-title {
        margin: 0 0 5px 0;
        font-size: 1.125rem;
        line-height: 1.5rem;
      }

      .readout h4 {
        margin: 0 0 0.25rem;
      }

      .readout dl {
        margin: 0;
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0.25rem 1rem;
      }

      .readout dt {
        font-family: monospace;
      }

      .readout dd {
        margin: 0;
      }
    `;
  }
}
