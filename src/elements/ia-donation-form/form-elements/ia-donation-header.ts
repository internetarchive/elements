import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  defaultDonationAmounts,
  type DonationPaymentInfo,
} from '../models/donation-payment-info';
import {
  EditDonationAmountSelectionLayout,
  EditDonationFrequencySelectionMode,
} from './ia-donation-edit-donation';
import './ia-donation-edit-donation';
import './ia-donation-summary';

/** Whether the top of the form shows the editable amount picker or the collapsed summary. */
export const DonationHeaderMode = {
  Summary: 'summary',
  Edit: 'edit',
} as const;

export type DonationHeaderMode =
  (typeof DonationHeaderMode)[keyof typeof DonationHeaderMode];

/**
 * The top of the donation form: the frequency and amount picker, or a
 * one-line summary of the choice with an edit button. Relays the picker's
 * events upward.
 */
@customElement('ia-donation-header')
export class IADonationHeader extends LitElement {
  @property({ type: Object }) donationInfo?: DonationPaymentInfo;

  @property({ type: String }) mode: DonationHeaderMode =
    DonationHeaderMode.Edit;

  @property({ type: Array }) amountOptions: number[] = defaultDonationAmounts;

  @property({ type: String })
  amountSelectionLayout: EditDonationAmountSelectionLayout =
    EditDonationAmountSelectionLayout.MultiLine;

  @property({ type: String })
  frequencySelectionMode: EditDonationFrequencySelectionMode =
    EditDonationFrequencySelectionMode.Button;

  render(): TemplateResult {
    switch (this.mode) {
      case DonationHeaderMode.Summary:
        return this.donationSummaryTemplate;
      case DonationHeaderMode.Edit:
        return this.editDonationTemplate;
    }
  }

  private get editDonationTemplate(): TemplateResult {
    return html`
      <ia-donation-edit-donation
        .donationInfo=${this.donationInfo}
        .amountOptions=${this.amountOptions}
        .amountSelectionLayout=${this.amountSelectionLayout}
        .frequencySelectionMode=${this.frequencySelectionMode}
        @donationInfoChanged=${this.donationInfoChanged}
        @showSummaryClicked=${this.showSummaryClicked}
        @editDonationError=${this.editDonationError}
      >
      </ia-donation-edit-donation>
    `;
  }

  private get donationSummaryTemplate(): TemplateResult {
    return html`
      <ia-donation-summary
        .donationInfo=${this.donationInfo}
        @editClicked=${this.summaryEditClicked}
      >
      </ia-donation-summary>
    `;
  }

  private donationInfoChanged(e: CustomEvent): void {
    this.donationInfo = e.detail.donationInfo as DonationPaymentInfo;
    this.dispatchEvent(
      new CustomEvent('donationInfoChanged', {
        detail: { donationInfo: this.donationInfo },
      }),
    );
  }

  private editDonationError(e: CustomEvent): void {
    this.dispatchEvent(
      new CustomEvent('editDonationError', { detail: e.detail }),
    );
  }

  private summaryEditClicked(): void {
    this.mode = DonationHeaderMode.Edit;
  }

  private showSummaryClicked(): void {
    this.mode = DonationHeaderMode.Summary;
  }
}
