import {
  css,
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { msg, str } from '@lit/localize';
import currency from 'currency.js';

import themeStyles from '@src/themes/theme-styles';
import { CurrencyValidator } from '../currency-validator';
import {
  DonationPaymentInfo,
  defaultDonationAmounts,
  defaultSelectedDonationInfo,
} from '../models/donation-payment-info';
import { DonationType } from '../models/donation-type';
import { DonationSectionBadgeMode } from './ia-donation-section';
import './ia-donation-section';

/** Whether the numbered step badges show on the sections. */
export const EditDonationStepNumberMode = {
  HideNumbers: 'hidenumbers',
  ShowNumbers: 'shownumbers',
} as const;

export type EditDonationStepNumberMode =
  (typeof EditDonationStepNumberMode)[keyof typeof EditDonationStepNumberMode];

/** The radio button groups in the form. */
export const EditDonationSelectionGroup = {
  DonationType: 'donationType',
  Amount: 'amount',
} as const;

export type EditDonationSelectionGroup =
  (typeof EditDonationSelectionGroup)[keyof typeof EditDonationSelectionGroup];

/** The outcome of validating an amount. Sent in the `editDonationError` event. */
export const EditDonationInfoStatus = {
  ValidDonationAmount: 'valid_donation_amount',
  InvalidDonationAmount: 'invalid_donation_amount',
  DonationTooHigh: 'donation_too_high',
  DonationTooLow: 'donation_too_low',
} as const;

export type EditDonationInfoStatus =
  (typeof EditDonationInfoStatus)[keyof typeof EditDonationInfoStatus];

/** How the one-time / monthly choice is presented. */
export const EditDonationFrequencySelectionMode = {
  Button: 'button',
  Checkbox: 'checkbox',
  Hide: 'hide',
} as const;

export type EditDonationFrequencySelectionMode =
  (typeof EditDonationFrequencySelectionMode)[keyof typeof EditDonationFrequencySelectionMode];

/** Whether the amount buttons wrap onto several lines or stay on one. */
export const EditDonationAmountSelectionLayout = {
  SingleLine: 'single-line',
  MultiLine: 'multi-line',
} as const;

export type EditDonationAmountSelectionLayout =
  (typeof EditDonationAmountSelectionLayout)[keyof typeof EditDonationAmountSelectionLayout];

/**
 * The part of the donation form where the donor picks a frequency, an amount
 * (preset or custom) and whether to cover the processing fee. Fires
 * `donationInfoChanged` with the new `DonationPaymentInfo` on every change
 * and `editDonationError` when a custom amount is out of range.
 *
 * The petabox donation banner uses this on its own, without the rest of the
 * form.
 */
@customElement('ia-donation-edit-donation')
export class IADonationEditDonation extends LitElement {
  @property({ type: Object })
  donationInfo: DonationPaymentInfo = defaultSelectedDonationInfo;

  @property({ type: String })
  stepNumberMode: EditDonationStepNumberMode =
    EditDonationStepNumberMode.ShowNumbers;

  /**
   * A convenience for setting the selected amount from plain HTML. When
   * present it wins over `donationInfo`.
   */
  @property({ type: Number }) defaultSelectedAmount?: number;

  @property({ type: Array }) amountOptions: number[] = defaultDonationAmounts;

  @property({ type: String })
  amountSelectionLayout: EditDonationAmountSelectionLayout =
    EditDonationAmountSelectionLayout.MultiLine;

  @property({ type: String, reflect: true })
  frequencySelectionMode: EditDonationFrequencySelectionMode =
    EditDonationFrequencySelectionMode.Button;

  @property({ type: String, reflect: true }) customAmountMode:
    | 'display'
    | 'hide' = 'display';

  @property({ type: String, reflect: true }) coverFeesCheckboxMode:
    | 'display'
    | 'hide' = 'display';

  /** `slot` renders the `edit-donation-amount-title` slot in place of the default headline. */
  @property({ type: String, reflect: true }) amountTitleDisplayMode:
    | 'default'
    | 'slot' = 'default';

  @state() private error?: TemplateResult;

  @state() private customAmountSelected = false;

  @query('#custom-amount-button') private customAmountButton!: HTMLInputElement;

  @query('#custom-amount-input') private customAmountInput!: HTMLInputElement;

  private currencyValidator: CurrencyValidator = new CurrencyValidator();

  render(): TemplateResult {
    const amountTitle =
      this.amountTitleDisplayMode === 'default'
        ? msg('Choose an amount (USD)')
        : '';
    return html`
      ${this.frequencySelectionMode ===
      EditDonationFrequencySelectionMode.Button
        ? this.frequencyButtonsTemplate
        : nothing}

      <ia-donation-section
        sectionBadge="${this.amountSelectionSectionNumber}"
        headline=${amountTitle}
        badgeMode=${this.formSectionNumberMode}
      >
        ${this.amountTitleDisplayMode === 'slot'
          ? html`<slot name="edit-donation-amount-title"></slot>`
          : nothing}
        <ul class="amount-selector">
          ${this.presetAmountsTemplate}
          ${this.customAmountMode === 'display'
            ? html`<li class="custom-amount">${this.customAmountTemplate}</li>`
            : nothing}
        </ul>

        <div class="errors">${this.error}</div>

        ${this.coverFeesCheckboxMode === 'display'
          ? html`<div class="checkbox-options">
              ${this.coverFeesCheckboxTemplate}
              ${this.frequencySelectionMode ===
              EditDonationFrequencySelectionMode.Checkbox
                ? this.frequencyCheckboxTemplate
                : nothing}
            </div>`
          : nothing}
      </ia-donation-section>
    `;
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('customAmountSelected')) {
      if (this.customAmountButton) {
        this.customAmountButton.checked = this.customAmountSelected;
      }
    }
    if (changedProperties.has('amountOptions')) {
      this.customAmountSelected = false;
      this.updateSelectedDonationInfo();
      this.setupAmountColumnsLayoutConfig();
    }
    if (changedProperties.has('amountSelectionLayout')) {
      this.setupAmountColumnsLayoutConfig();
    }
    if (changedProperties.has('donationInfo')) {
      this.updateSelectedDonationInfo();
    }
    if (
      changedProperties.has('defaultSelectedAmount') &&
      this.defaultSelectedAmount !== undefined
    ) {
      this.customAmountSelected = false;
      this.donationInfo = new DonationPaymentInfo({
        donationType: this.donationInfo.donationType,
        amount: this.defaultSelectedAmount,
        coverFees: this.donationInfo.coverFees,
      });
    }
  }

  private get frequencyButtonsTemplate(): TemplateResult {
    return html`
      <ia-donation-section
        sectionBadge="1"
        headline=${msg('Choose a frequency')}
        badgeMode=${this.formSectionNumberMode}
      >
        <ul class="frequency-selector">
          ${this.frequencyTemplate}
        </ul>
      </ia-donation-section>
    `;
  }

  private get frequencyCheckboxTemplate(): TemplateResult {
    return html`
      <div class="checkbox-option-container">
        <input
          type="checkbox"
          id="make-this-monthly"
          @input=${this.monthlyCheckboxChecked}
          .checked=${this.donationInfo.donationType === DonationType.Monthly}
          tabindex="0"
        />
        <label for="make-this-monthly">${msg('Make this monthly')}</label>
      </div>
    `;
  }

  private get coverFeesCheckboxTemplate(): TemplateResult {
    return html`
      <div class="checkbox-option-container">
        <input
          type="checkbox"
          id="cover-fees"
          @input=${this.coverFeesChecked}
          .checked=${this.donationInfo.coverFees}
          tabindex="0"
        />
        <label for="cover-fees">${this.coverFeesText}</label>
      </div>
    `;
  }

  /** The amount step is 2 when the frequency buttons come first, otherwise 1. */
  private get amountSelectionSectionNumber(): number {
    return this.frequencySelectionMode ===
      EditDonationFrequencySelectionMode.Button
      ? 2
      : 1;
  }

  private get formSectionNumberMode(): DonationSectionBadgeMode {
    switch (this.stepNumberMode) {
      case EditDonationStepNumberMode.ShowNumbers:
        return DonationSectionBadgeMode.ShowBadge;
      case EditDonationStepNumberMode.HideNumbers:
        return DonationSectionBadgeMode.HideBadge;
    }
  }

  /**
   * Picks the amount grid's column count, and how many columns the custom
   * amount field spans, from how many preset amounts there are.
   */
  private setupAmountColumnsLayoutConfig(): void {
    const minimalView =
      this.customAmountMode === 'hide' &&
      this.coverFeesCheckboxMode === 'hide' &&
      this.frequencySelectionMode === EditDonationFrequencySelectionMode.Hide;
    const amountCount = this.amountOptions.length;
    let columnCount = 5;
    let customAmountSpan = 3;
    switch (amountCount) {
      case 7:
        columnCount = 5;
        customAmountSpan = 3;
        break;
      case 6:
        columnCount = 4;
        customAmountSpan = 2;
        break;
      case 5:
        columnCount = 4;
        customAmountSpan = 3;
        break;
      case 4:
        if (minimalView) {
          columnCount = 4;
          customAmountSpan = 0;
          break;
        }
        columnCount = 3;
        customAmountSpan = 2;
        break;
      case 3:
        columnCount = 2;
        customAmountSpan = 1;
        break;
    }

    if (
      this.amountSelectionLayout ===
      EditDonationAmountSelectionLayout.SingleLine
    ) {
      columnCount = amountCount + 3;
      customAmountSpan = 3;
    }

    this.style.setProperty(
      '--ia-donation-edit-amount-column-count',
      `${columnCount}`,
    );
    this.style.setProperty(
      '--ia-donation-edit-custom-amount-col-span',
      `${customAmountSpan}`,
    );
  }

  /**
   * Syncs the radios and the custom field with `donationInfo`. A preset
   * amount checks its radio and clears the custom field; anything else
   * selects the custom field and formats the amount into it.
   */
  private updateSelectedDonationInfo(): void {
    // Keep the custom amount selected while the donor is typing in it, even
    // if the value matches a preset, so the selection doesn't jump to the
    // preset radio mid-keystroke.
    // With the custom field hidden both sides would be null, so guard on it
    // existing first.
    const typingInCustomAmount =
      !!this.customAmountInput &&
      this.shadowRoot?.activeElement === this.customAmountInput;
    if (
      !this.isCustomAmount &&
      !(this.customAmountSelected && typingInCustomAmount)
    ) {
      const radioButton = this.shadowRoot?.querySelector<HTMLInputElement>(
        `input[type="radio"][name="${EditDonationSelectionGroup.Amount}"][value="${this.donationInfo.amount}"]`,
      );
      if (radioButton) radioButton.checked = true;
      this.customAmountSelected = false;
      this.error = undefined;
      if (this.customAmountInput) {
        this.customAmountInput.value = '';
      }
    } else {
      this.customAmountSelected = true;
      // Leave the field alone while it has focus, the donor may be typing
      if (!typingInCustomAmount && this.customAmountInput) {
        this.customAmountInput.value = this.customAmountDisplayValue;
        const donationInfoStatus = this.getDonationInfoStatus(
          this.donationInfo.amount,
        );
        this.handleDonationInfoStatus(donationInfoStatus);
      }
    }
  }

  private get coverFeesText(): string {
    const feeAmountString = currency(this.donationInfo.fee, {
      symbol: '$',
    }).format();

    return msg(str`I'll generously add ${feeAmountString} to cover fees.`);
  }

  /**
   * Formats a dollar amount without cents when it's a whole number and with
   * them when it isn't: `$5` and `$5.50`.
   */
  private formatShortenedAmount(dollars: number): string {
    const precision = dollars % 1 === 0 ? 0 : 2;
    return currency(dollars, { symbol: '$', precision }).format();
  }

  private get frequencyTemplate(): TemplateResult {
    return html`
      <li>
        ${this.getRadioButton({
          group: EditDonationSelectionGroup.DonationType,
          value: DonationType.OneTime,
          displayText: msg('One time'),
          checked: this.donationInfo.donationType === DonationType.OneTime,
        })}
      </li>

      <li>
        ${this.getRadioButton({
          group: EditDonationSelectionGroup.DonationType,
          value: DonationType.Monthly,
          displayText: msg('Monthly'),
          checked: this.donationInfo.donationType === DonationType.Monthly,
        })}
      </li>
    `;
  }

  private get presetAmountsTemplate(): TemplateResult {
    return html`
      ${this.amountOptions.map((amount) => {
        const checked =
          !this.customAmountSelected && amount === this.donationInfo.amount;

        return html`
          <li>
            ${this.getRadioButton({
              group: EditDonationSelectionGroup.Amount,
              value: `${amount}`,
              displayText: this.formatShortenedAmount(amount),
              checked,
            })}
          </li>
        `;
      })}
    `;
  }

  private getRadioButton(options: {
    group: EditDonationSelectionGroup;
    value: string;
    displayText: string;
    checked: boolean;
  }): TemplateResult {
    const radioId = `${options.group}-${options.value}-option`;
    return html`
      <div class="selection-button">
        <input
          type="radio"
          name=${options.group}
          value=${options.value}
          id=${radioId}
          tabindex="0"
          .checked=${options.checked}
          @change=${this.radioSelected}
          @click=${(e: Event): void => {
            // `change` doesn't fire when the checked radio is clicked again,
            // so re-selecting the current amount is caught here. It matters
            // after a custom amount, which unchecks the presets visually.
            const isAmountSelection =
              options.group === EditDonationSelectionGroup.Amount;
            if (isAmountSelection) {
              const isSameValue =
                parseFloat(options.value) === this.donationInfo.amount;
              if (isSameValue) {
                this.radioSelected(e);
              }
            }
          }}
        />
        <label for=${radioId}>${options.displayText}</label>
      </div>
    `;
  }

  private get isCustomAmount(): boolean {
    return !this.amountOptions.includes(this.donationInfo.amount);
  }

  private get customAmountDisplayValue(): string {
    if (!this.isCustomAmount) return '';
    return currency(this.donationInfo.amount, { symbol: '' }).format();
  }

  private get customAmountTemplate(): TemplateResult {
    return html`
      <div class="selection-button">
        <input
          type="radio"
          name=${EditDonationSelectionGroup.Amount}
          value="custom"
          id="custom-amount-button"
          tabindex="0"
          @change=${this.customRadioSelected}
        />

        <label for="custom-amount-button">
          <span class="custom-amount-text">${msg('Custom: $')}</span
          ><input
            type="text"
            id="custom-amount-input"
            tabindex="-1"
            aria-label=${msg('Custom amount in dollars')}
            value=${this.customAmountDisplayValue}
            @input=${this.customAmountChanged}
            @keydown=${this.currencyValidator.keydown}
            @focus=${this.customAmountFocused}
            @blur=${this.customAmountBlurred}
          />
        </label>
      </div>
    `;
  }

  private customRadioSelected(): void {
    this.customAmountInput.focus();
  }

  private customAmountFocused(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.customAmountSelected = true;
    this.handleCustomAmountInput(target.value);
  }

  /**
   * Once focus leaves the custom field the mid-keystroke protection is over,
   * so the UI re-syncs with `donationInfo`: a typed amount equal to a preset
   * moves to that preset, anything else gets re-formatted in place.
   */
  private customAmountBlurred(): void {
    this.updateSelectedDonationInfo();
  }

  private coverFeesChecked(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.updateDonationInfo({ coverFees: target.checked });
  }

  private customAmountChanged(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.customAmountSelected = true;
    this.handleCustomAmountInput(target.value);
  }

  private handleCustomAmountInput(value: string): void {
    const amount = parseFloat(value);
    if (isNaN(amount)) {
      this.dispatchEditDonationError(
        EditDonationInfoStatus.InvalidDonationAmount,
      );
    } else {
      this.amountChanged(amount);
    }
  }

  private handleDonationInfoStatus(status: EditDonationInfoStatus): void {
    switch (status) {
      case EditDonationInfoStatus.ValidDonationAmount:
        this.error = undefined;
        break;
      case EditDonationInfoStatus.DonationTooHigh:
        this.error = msg(html`
          To make a donation of $10,000 or more, please contact our philanthropy
          department at
          <a href="mailto:donations@archive.org">donations@archive.org</a>
        `);
        this.dispatchEditDonationError(status);
        break;
      case EditDonationInfoStatus.DonationTooLow:
        if (this.customAmountInput.value.length > 0) {
          this.error = html`${msg('Please select an amount (minimum $1)')}`;
        }
        this.dispatchEditDonationError(status);
        break;
      case EditDonationInfoStatus.InvalidDonationAmount:
        this.error = html`${msg('Please enter a valid donation amount')}`;
        this.dispatchEditDonationError(status);
        break;
    }
  }

  private amountChanged(amount: number): void {
    const donationInfoStatus = this.getDonationInfoStatus(amount);
    this.handleDonationInfoStatus(donationInfoStatus);

    // Only a valid amount makes it into the donation info
    if (donationInfoStatus === EditDonationInfoStatus.ValidDonationAmount) {
      this.updateDonationInfo({ amount });
    }
  }

  private getDonationInfoStatus(amount: number): EditDonationInfoStatus {
    if (isNaN(amount)) {
      return EditDonationInfoStatus.InvalidDonationAmount;
    }

    if (amount >= 10000) {
      return EditDonationInfoStatus.DonationTooHigh;
    }

    if (amount < 1) {
      return EditDonationInfoStatus.DonationTooLow;
    }

    return EditDonationInfoStatus.ValidDonationAmount;
  }

  private radioSelected(e: Event): void {
    const radioButton = e.target as HTMLInputElement;
    const group = radioButton.name as EditDonationSelectionGroup;
    const { value } = radioButton;

    switch (group) {
      case EditDonationSelectionGroup.Amount:
        this.presetAmountChanged(parseFloat(value));
        break;
      case EditDonationSelectionGroup.DonationType:
        this.updateDonationInfo({ donationType: value as DonationType });
        break;
      default:
        break;
    }
  }

  private monthlyCheckboxChecked(e: Event): void {
    const isChecked = (e.target as HTMLInputElement).checked;
    const donationType = isChecked
      ? DonationType.Monthly
      : DonationType.OneTime;
    this.updateDonationInfo({ donationType });
  }

  private dispatchEditDonationError(error: EditDonationInfoStatus): void {
    const event = new CustomEvent('editDonationError', {
      detail: { error },
    });
    this.dispatchEvent(event);
  }

  private presetAmountChanged(amount: number): void {
    this.error = undefined;
    this.customAmountSelected = false;
    if (this.customAmountInput) {
      this.customAmountInput.value = '';
    }
    this.updateDonationInfo({ amount });
  }

  private updateDonationInfo(options: {
    donationType?: DonationType;
    amount?: number;
    coverFees?: boolean;
  }): void {
    const newDonationInfo = new DonationPaymentInfo({
      donationType: options.donationType ?? this.donationInfo.donationType,
      amount: options.amount ?? this.donationInfo.amount,
      coverFees: options.coverFees ?? this.donationInfo.coverFees,
    });

    this.donationInfo = newDonationInfo;

    const event = new CustomEvent('donationInfoChanged', {
      detail: { donationInfo: newDonationInfo },
    });
    this.dispatchEvent(event);
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          /*
           * The donation form was built for a 10px root font size. Sizing off
           * this base keeps the element self-contained, so it looks the same
           * whatever the page's root size is. Override it to rescale
           * everything, sections included.
           */
          --donation-edit-base-font-size--: var(
            --ia-donation-edit-base-font-size,
            10px
          );

          --donation-edit-button-border-color--: var(
            --ia-donation-edit-button-border-color,
            var(--mid-gray)
          );
          --donation-edit-button-grid-gap--: var(
            --ia-donation-edit-button-grid-gap,
            var(--donation-edit-base-font-size--)
          );
          --donation-edit-button-font-size--: var(
            --ia-donation-edit-button-font-size,
            calc(var(--donation-edit-base-font-size--) * 1.6)
          );
          --donation-edit-button-font-color--: var(
            --ia-donation-edit-button-font-color,
            #000
          );
          --donation-edit-button-selected-font-color--: var(
            --ia-donation-edit-button-selected-font-color,
            #000
          );
          --donation-edit-button-selected-color--: var(
            --ia-donation-edit-button-selected-color,
            #f9bf3b
          );
          --donation-edit-button-focused-outline-color--: var(
            --ia-donation-edit-button-focused-outline-color,
            #7fb3f9
          );
          --donation-edit-button-color--: var(
            --ia-donation-edit-button-color,
            var(--true-white)
          );
          --donation-edit-cover-fees-font-size--: var(
            --ia-donation-edit-cover-fees-font-size,
            calc(var(--donation-edit-base-font-size--) * 1.2)
          );
          --donation-edit-cover-fees-font-weight--: var(
            --ia-donation-edit-cover-fees-font-weight,
            bold
          );
          --donation-edit-custom-amount-width--: var(
            --ia-donation-edit-custom-amount-width,
            calc(var(--donation-edit-base-font-size--) * 4)
          );
          --donation-edit-input-font-color--: var(
            --ia-donation-edit-input-font-color,
            var(--mid-gray)
          );
          --donation-edit-input-border--: var(
            --ia-donation-edit-input-border,
            1px solid #d9d9d9
          );
          /* These two are set on the host by the element itself, from the number of amounts */
          --donation-edit-amount-column-count--: var(
            --ia-donation-edit-amount-column-count,
            5
          );
          --donation-edit-custom-amount-col-span--: var(
            --ia-donation-edit-custom-amount-col-span,
            3
          );
          --donation-edit-error-color--: var(--color-danger);

          /* Passed through to the sections */
          --ia-donation-section-base-font-size: var(
            --donation-edit-base-font-size--
          );
          --ia-donation-section-background-color: var(
            --ia-donation-edit-background-color,
            transparent
          );
          --ia-donation-section-badge-background-color: var(
            --ia-donation-edit-badge-background-color,
            var(--mid-gray)
          );
          --ia-donation-section-badge-font-color: var(
            --ia-donation-edit-badge-font-color,
            var(--true-white)
          );
        }

        .errors {
          color: var(--donation-edit-error-color--);
          font-size: calc(var(--donation-edit-base-font-size--) * 1.4);
          margin-top: var(--padding-sm);
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-gap: var(--donation-edit-button-grid-gap--);
        }

        li {
          margin: 0;
          padding: 0;
          display: inline-block;
        }

        .frequency-selector {
          grid-template-columns: repeat(2, 1fr);
        }

        .amount-selector {
          grid-template-columns: repeat(
            var(--donation-edit-amount-column-count--),
            1fr
          );
        }

        .custom-amount {
          grid-column: span var(--donation-edit-custom-amount-col-span--);
        }

        .selection-button {
          height: calc(var(--donation-edit-base-font-size--) * 3);
        }

        .selection-button label {
          padding: 0 calc(var(--donation-edit-base-font-size--) * 0.3);
          display: flex;
          cursor: pointer;
          text-align: center;
          font-size: var(--donation-edit-button-font-size--);
          font-weight: bold;
          border: 1px solid var(--donation-edit-button-border-color--);
          border-radius: 5px;
          height: 100%;
          justify-content: center;
          align-items: center;
        }

        label[for='custom-amount-button'] {
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .custom-amount-text {
          white-space: nowrap;
          margin-right: var(--padding-sm);
        }

        input[type='radio'] {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        input[type='radio'] + label {
          color: var(--donation-edit-button-font-color--);
          background-color: var(--donation-edit-button-color--);
        }

        input[type='radio']:checked + label {
          color: var(--donation-edit-button-selected-font-color--);
          background-color: var(--donation-edit-button-selected-color--);
        }

        input[type='radio']:focus + label {
          outline: 2px solid var(--donation-edit-button-focused-outline-color--);
        }

        .checkbox-options {
          margin-top: var(--donation-edit-base-font-size--);
        }

        .checkbox-option-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checkbox-option-container input {
          width: calc(var(--donation-edit-base-font-size--) * 2);
        }

        .checkbox-option-container label {
          font-size: var(--donation-edit-cover-fees-font-size--);
          font-weight: var(--donation-edit-cover-fees-font-weight--);
          flex: 1;
        }

        #custom-amount-input {
          width: var(--donation-edit-custom-amount-width--);
          font-size: var(--donation-edit-button-font-size--);
          font-weight: bold;
          color: var(--donation-edit-input-font-color--);
          padding: calc(var(--donation-edit-base-font-size--) * 0.1);
          border: var(--donation-edit-input-border--);
          appearance: none;
        }
      `,
    ];
  }
}
