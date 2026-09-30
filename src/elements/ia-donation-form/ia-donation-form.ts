import type * as paypal from 'paypal-checkout-components';
import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';

import themeStyles from '@src/themes/theme-styles';
import type { BraintreeManagerInterface } from './braintree/braintree-manager-interface';
import type { PaymentFlowHandlersInterface } from './flow-handlers/payment-flow-handlers';
import type { IADonationContactForm } from './form-elements/contact-form/ia-donation-contact-form';
import {
  EditDonationAmountSelectionLayout,
  EditDonationFrequencySelectionMode,
} from './form-elements/ia-donation-edit-donation';
import type { IADonationHeader } from './form-elements/ia-donation-header';
import type { IADonationPaymentSelector } from './form-elements/ia-donation-payment-selector';
import {
  DonationSectionBadgeMode,
  type IADonationSection,
} from './form-elements/ia-donation-section';
import { lockIcon } from './icons';
import {
  DonationPaymentInfo,
  defaultDonationAmounts,
  defaultSelectedDonationInfo,
} from './models/donation-payment-info';
import type { DonationRequest } from './models/donation-request';
import { DonationType } from './models/donation-type';
import type { DonorContactInfo } from './models/donor-contact-info';
import { PaymentProvider } from './models/payment-provider';
import { UpsellModalCTAMode } from './modals/ia-donation-upsell-modal-content';
import './form-elements/ia-donation-header';
import './form-elements/ia-donation-payment-selector';
import './form-elements/ia-donation-section';
import './form-elements/ia-donation-total-amount';

/**
 * The donation form: amount picker, total, payment method buttons, then the
 * contact form and Donate button for the methods that need them. The
 * controller wires it to Braintree, the modals and recaptcha; on its own it
 * renders and emits events.
 */
@customElement('ia-donation-form')
export class IADonationForm extends LitElement {
  @property({ type: Object }) braintreeManager?: BraintreeManagerInterface;

  @property({ type: Object })
  paymentFlowHandlers?: PaymentFlowHandlersInterface;

  @property({ type: Object }) donationRequest?: DonationRequest;

  @property({ type: Object })
  donationInfo: DonationPaymentInfo = defaultSelectedDonationInfo;

  /** The contact form lives in the light DOM (for autofill) and is handed in here */
  @property({ type: Object }) contactForm?: IADonationContactForm;

  @property({ type: Array }) amountOptions: number[] = defaultDonationAmounts;

  @property({ type: String })
  amountSelectionLayout: EditDonationAmountSelectionLayout =
    EditDonationAmountSelectionLayout.MultiLine;

  @property({ type: String })
  frequencySelectionMode: EditDonationFrequencySelectionMode =
    EditDonationFrequencySelectionMode.Button;

  @state() private creditCardVisible = false;

  @state() private contactFormVisible = false;

  @state() private donationInfoValid = true;

  @state() private selectedPaymentProvider?: PaymentProvider;

  @query('#contactFormSection') contactFormSection?: IADonationSection;

  @query('ia-donation-header') donationFormHeader!: IADonationHeader;

  @query('ia-donation-payment-selector')
  paymentSelector!: IADonationPaymentSelector;

  private paypalButtonNeedsRender = true;

  render(): TemplateResult {
    return html`
      <ia-donation-header
        .amountOptions=${this.amountOptions}
        .amountSelectionLayout=${this.amountSelectionLayout}
        .frequencySelectionMode=${this.frequencySelectionMode}
        @donationInfoChanged=${this.donationInfoChanged}
        @editDonationError=${this.editDonationError}
      >
      </ia-donation-header>

      <ia-donation-section
        .badgeMode=${DonationSectionBadgeMode.HideBadgeLeaveSpacing}
        id="total-amount-section"
      >
        <ia-donation-total-amount .donationInfo=${this.donationInfo}>
        </ia-donation-total-amount>
      </ia-donation-section>

      <ia-donation-section
        .sectionBadge=${`${this.paymentSelectorNumberingStart}`}
        headline=${msg('Choose a payment method')}
      >
        <ia-donation-payment-selector
          .paymentProviders=${this.braintreeManager?.paymentProviders}
          @firstUpdated=${this.paymentSelectorFirstUpdated}
          @creditCardSelected=${this.creditCardSelected}
          @venmoSelected=${this.venmoSelected}
          @applePaySelected=${this.applePaySelected}
          @googlePaySelected=${this.googlePaySelected}
          @paypalBlockerSelected=${this.paypalBlockerSelected}
          @resetPaymentMethod=${() => {
            this.selectedPaymentProvider = undefined;
            this.contactFormVisible = false;
          }}
        >
          <slot name="paypal-button" slot="paypal-button"></slot>
        </ia-donation-payment-selector>
      </ia-donation-section>

      <div
        class="contact-form-section ${this.contactFormVisible ? '' : 'hidden'}"
      >
        ${this.contactFormSectionTemplate}
      </div>
    `;
  }

  /** Developer convenience: show the confirmation step without a payment. */
  async showConfirmationModalDev(options: {
    donationType: DonationType;
    amount: number;
    currencyType: string;
    cancelDonationCB: () => void;
    confirmDonationCB: () => void;
  }): Promise<void> {
    this.paymentFlowHandlers?.showConfirmationStepModal(options);
  }

  /**
   * Developer convenience: show the upsell modal without going through a
   * payment. With the PayPal slot mode it also renders the PayPal button.
   */
  async showUpsellModalDev(options: {
    oneTimeAmount: number;
    ctaMode?: UpsellModalCTAMode;
    yesSelected?: (amount: number) => void;
    noSelected?: () => void;
    amountChanged?: (amount: number) => void;
    userClosedModalCallback?: () => void;
  }): Promise<void> {
    this.paymentFlowHandlers?.showUpsellModal(options);

    if (options.ctaMode === UpsellModalCTAMode.PayPalUpsellSlot) {
      const handler =
        await this.braintreeManager?.paymentProviders.paypalHandler.get();
      const donationInfo = new DonationPaymentInfo({
        amount: options.oneTimeAmount,
        donationType: DonationType.OneTime,
        coverFees: false,
      });
      handler?.renderPayPalButton({
        selector: '#paypal-upsell-button',
        style: {
          color: 'blue' as paypal.ButtonColorOption,
          label: 'paypal' as paypal.ButtonLabelOption,
          shape: 'rect' as paypal.ButtonShapeOption,
          size: 'responsive' as paypal.ButtonSizeOption,
          tagline: false,
        },
        donationInfo,
      });
    }
  }

  get contactFormSectionTemplate(): TemplateResult {
    const headline =
      this.selectedPaymentProvider === PaymentProvider.Venmo
        ? msg('Help us stay in touch')
        : msg('Enter payment information');

    return html`
      <ia-donation-section
        .sectionBadge=${`${this.paymentSelectorNumberingStart + 1}`}
        headline=${headline}
        id="contactFormSection"
      >
        <slot name="contact-form"></slot>
        <div
          class="credit-card-fields ${this.creditCardVisible ? '' : 'hidden'}"
        >
          <slot name="braintree-hosted-fields"></slot>
        </div>
      </ia-donation-section>

      <ia-donation-section
        .sectionBadge=${`${this.paymentSelectorNumberingStart + 2}`}
      >
        <slot name="recaptcha"></slot>
        <button id="donate-button" @click=${this.donateClicked}>
          ${msg('Donate')}
        </button>

        <div class="secure-process-note">
          ${lockIcon} ${msg('Your payment will be securely processed')}
        </div>
      </ia-donation-section>
    `;
  }

  /**
   * The step number of the payment selector. With the frequency buttons
   * showing they're step 1 and the amount is 2, so payment is 3. In checkbox
   * mode the amount picker is step 1 and payment is 2.
   */
  private get paymentSelectorNumberingStart(): number {
    return this.frequencySelectionMode ===
      EditDonationFrequencySelectionMode.Button
      ? 3
      : 2;
  }

  private editDonationError(): void {
    this.donationInfoValid = false;
  }

  private paymentSelectorFirstUpdated(): void {
    if (this.paymentFlowHandlers?.paypalHandler) {
      this.renderPayPalButtonIfNeeded();
    }
  }

  private applePaySelected(e: CustomEvent): void {
    this.selectedPaymentProvider = PaymentProvider.ApplePay;
    this.contactFormVisible = false;
    this.creditCardVisible = false;

    if (!this.donationInfoValid) {
      this.showInvalidDonationInfoAlert();
      return;
    }

    const originalEvent = e.detail.originalEvent;
    if (this.donationInfo) {
      this.paymentFlowHandlers?.applePayHandler?.paymentInitiated(
        this.donationInfo,
        originalEvent,
      );
    }
    this.emitPaymentFlowStartedEvent();
  }

  private googlePaySelected(): void {
    this.selectedPaymentProvider = PaymentProvider.GooglePay;
    this.contactFormVisible = false;
    this.creditCardVisible = false;

    if (!this.donationInfoValid) {
      this.showInvalidDonationInfoAlert();
      return;
    }
    if (this.donationInfo) {
      this.paymentFlowHandlers?.googlePayHandler?.paymentInitiated(
        this.donationInfo,
      );
    }
    this.emitPaymentFlowStartedEvent();
  }

  private async creditCardSelected(): Promise<void> {
    if (!this.donationInfoValid) {
      this.showInvalidDonationInfoAlert();
      return;
    }
    this.selectedPaymentProvider = PaymentProvider.CreditCard;
    this.contactFormVisible = true;
    this.creditCardVisible = true;
    this.focusContactForm();
  }

  private async venmoSelected(): Promise<void> {
    if (!this.donationInfoValid) {
      this.showInvalidDonationInfoAlert();
      return;
    }
    this.selectedPaymentProvider = PaymentProvider.Venmo;
    this.contactFormVisible = true;
    this.creditCardVisible = false;
    this.focusContactForm();
  }

  private paypalBlockerSelected(): void {
    this.contactFormVisible = false;
    this.creditCardVisible = false;
    this.showInvalidDonationInfoAlert();
  }

  private async focusContactForm(): Promise<void> {
    await this.updateComplete;
    if (this.contactFormSection) {
      this.contactForm?.focus();
    }
  }

  private async donateClicked(): Promise<void> {
    if (!this.contactForm) {
      alert(msg('Please enter contact info.'));
      return;
    }
    if (!this.donationInfoValid || !this.donationInfo) {
      this.showInvalidDonationInfoAlert();
      return;
    }

    const contactInfo = this.contactForm.donorContactInfo;

    switch (this.selectedPaymentProvider) {
      case PaymentProvider.CreditCard:
        this.handleCreditCardDonationFlow(contactInfo, this.donationInfo);
        break;
      case PaymentProvider.Venmo:
        this.handleVenmoDonationFlow(contactInfo, this.donationInfo);
        break;
    }
  }

  private async handleCreditCardDonationFlow(
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo,
  ): Promise<void> {
    const creditCardFlowHandler = this.paymentFlowHandlers?.creditCardHandler;
    const creditCardHandler =
      await this.braintreeManager?.paymentProviders.creditCardHandler.get();
    creditCardHandler?.hideErrorMessage();
    const valid = this.contactForm?.reportValidity();
    const hostedFieldsResponse = await creditCardFlowHandler?.tokenizeFields();

    if (!valid || hostedFieldsResponse === undefined) {
      return;
    }

    this.emitPaymentFlowStartedEvent();
    creditCardFlowHandler?.paymentInitiated(
      hostedFieldsResponse,
      donationInfo,
      contactInfo,
    );
  }

  private async handleVenmoDonationFlow(
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo,
  ): Promise<void> {
    const valid = this.contactForm?.reportValidity();
    if (!valid) {
      return;
    }
    this.paymentFlowHandlers?.venmoHandler?.paymentInitiated(
      contactInfo,
      donationInfo,
    );
  }

  private emitPaymentFlowEvent(name: string, extra: object = {}): void {
    if (!this.selectedPaymentProvider) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent(name, {
        detail: { paymentProvider: this.selectedPaymentProvider, ...extra },
      }),
    );
  }

  private emitPaymentFlowStartedEvent(): void {
    this.emitPaymentFlowEvent('paymentFlowStarted');
  }

  private emitPaymentFlowConfirmedEvent(): void {
    this.emitPaymentFlowEvent('paymentFlowConfirmed');
  }

  private emitPaymentFlowCancelledEvent(): void {
    this.emitPaymentFlowEvent('paymentFlowCancelled');
  }

  private emitPaymentFlowErrorEvent(error?: string): void {
    this.emitPaymentFlowEvent('paymentFlowError', { error });
  }

  private showInvalidDonationInfoAlert(): void {
    alert(msg('Please enter a valid donation amount.'));
  }

  private async renderPayPalButtonIfNeeded(): Promise<void> {
    if (!this.paypalButtonNeedsRender) {
      return;
    }
    this.paypalButtonNeedsRender = false;
    if (this.donationInfo) {
      await this.paymentFlowHandlers?.paypalHandler?.renderPayPalButton(
        this.donationInfo,
      );
    }
    this.paymentSelector.showPaypalButton();
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('donationInfo') && this.donationInfo) {
      // The PayPal button holds its own copy of the donation info, since the
      // donor starts that payment from the button rather than from our code
      this.paymentFlowHandlers?.paypalHandler?.updateDonationInfo(
        this.donationInfo,
      );
      this.donationFormHeader.donationInfo = this.donationInfo;
    }

    if (
      (changedProperties.has('paymentFlowHandlers') ||
        changedProperties.has('donationInfo')) &&
      this.donationInfo &&
      this.paymentFlowHandlers
    ) {
      this.setupFlowHandlers();
    }

    if (changedProperties.has('donationInfoValid')) {
      this.paymentSelector.donationInfoValid = this.donationInfoValid;
    }

    if (changedProperties.has('selectedPaymentProvider')) {
      this.dispatchEvent(
        new CustomEvent('paymentProviderSelected', {
          detail: {
            paymentProvider: this.selectedPaymentProvider,
            previousPaymentProvider: changedProperties.get(
              'selectedPaymentProvider',
            ),
          },
        }),
      );
    }
  }

  private flowHandlersConfigured = false;

  private setupFlowHandlers(): void {
    if (this.flowHandlersConfigured) {
      return;
    }
    this.flowHandlersConfigured = true;
    this.bindFlowListenerEvents();
    this.renderPayPalButtonIfNeeded();
    if (this.donationInfo) {
      this.paymentFlowHandlers?.paypalHandler?.updateDonationInfo(
        this.donationInfo,
      );
    }
  }

  private bindFlowListenerEvents(): void {
    const paypal = this.paymentFlowHandlers?.paypalHandler;
    paypal?.on('payPalPaymentStarted', () => {
      this.selectedPaymentProvider = PaymentProvider.PayPal;
      this.emitPaymentFlowStartedEvent();
    });
    paypal?.on('payPalPaymentConfirmed', () => {
      this.selectedPaymentProvider = PaymentProvider.PayPal;
      this.emitPaymentFlowConfirmedEvent();
    });
    paypal?.on('payPalPaymentCancelled', () => {
      this.selectedPaymentProvider = PaymentProvider.PayPal;
      this.emitPaymentFlowCancelledEvent();
    });
    paypal?.on('payPalPaymentError', (_datasource, error) => {
      this.selectedPaymentProvider = PaymentProvider.PayPal;
      this.emitPaymentFlowErrorEvent(error);
    });

    this.paymentFlowHandlers?.googlePayHandler?.on('paymentCancelled', () => {
      this.selectedPaymentProvider = PaymentProvider.GooglePay;
      this.emitPaymentFlowCancelledEvent();
    });
  }

  private donationInfoChanged(e: CustomEvent): void {
    const donationInfo: DonationPaymentInfo = e.detail.donationInfo;
    this.donationInfo = new DonationPaymentInfo({
      amount: donationInfo.amount,
      donationType: donationInfo.donationType,
      coverFees: donationInfo.coverFees,
    });
    this.donationInfoValid = true;
    this.dispatchEvent(
      new CustomEvent('donationInfoChanged', { detail: { donationInfo } }),
    );
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          /*
           * The donation form was built for a 10px root font size. Sizing off
           * this base keeps it self-contained, so it looks the same whatever
           * the page's root size is. Every part of the form reads it, and the
           * two parts with their own base variable get it passed through.
           */
          --donation-form-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --ia-donation-section-base-font-size: var(
            --donation-form-base-font-size--
          );
          --ia-donation-edit-base-font-size: var(
            --donation-form-base-font-size--
          );

          --donation-form-donate-button-font-size--: var(
            --ia-donation-form-donate-button-font-size,
            calc(var(--donation-form-base-font-size--) * 2.6)
          );
          --donation-form-donate-button-height--: var(
            --ia-donation-form-donate-button-height,
            calc(var(--donation-form-base-font-size--) * 4)
          );
          --donation-form-donate-button-color--: var(
            --ia-donation-form-donate-button-color,
            var(--mint-green)
          );
          --donation-form-donate-button-text-color--: var(
            --ia-donation-form-donate-button-text-color,
            var(--true-white)
          );
          --donation-form-donate-button-hover-color--: var(
            --ia-donation-form-donate-button-hover-color,
            #278367
          );
          --donation-form-total-top-margin--: var(
            --ia-donation-form-total-amount-top-margin,
            calc(var(--donation-form-base-font-size--) * 1.5)
          );
          --donation-form-total-bottom-margin--: var(
            --ia-donation-form-total-amount-bottom-margin,
            calc(var(--donation-form-base-font-size--) * 1.2)
          );
        }

        h1 {
          margin: 0;
          padding: 0;
        }

        .hidden {
          display: none;
        }

        .secure-process-note {
          margin-top: 0.5em;
          font-size: 0.75em;
          text-align: center;
        }

        .secure-process-note .ia-icon {
          width: calc(var(--donation-form-base-font-size--) * 1.2);
          height: calc(var(--donation-form-base-font-size--) * 1.5);
          vertical-align: bottom;
          background-color: currentColor;
        }

        #donate-button {
          width: 100%;
          appearance: none;
          font-size: var(--donation-form-donate-button-font-size--);
          font-weight: bold;
          text-align: center;
          color: var(--donation-form-donate-button-text-color--);
          cursor: pointer;
          border: none;
          border-radius: 5px;
          background-color: var(--donation-form-donate-button-color--);
          padding-top: var(--padding-sm);
          padding-bottom: var(--padding-sm);
          height: var(--donation-form-donate-button-height--);
        }

        #donate-button:hover {
          background-color: var(--donation-form-donate-button-hover-color--);
        }

        #total-amount-section {
          display: block;
          margin-top: var(--donation-form-total-top-margin--);
          margin-bottom: var(--donation-form-total-bottom-margin--);
        }
      `,
    ];
  }
}
