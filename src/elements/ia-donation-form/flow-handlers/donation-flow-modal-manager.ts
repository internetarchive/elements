import { html } from 'lit';
import { msg } from '@lit/localize';
import {
  ModalConfig,
  type ModalManagerInterface,
} from '@internetarchive/modal-manager';

import type { DonationEventLoggerInterface } from '../analytics';
import type { BraintreeManagerInterface } from '../braintree/braintree-manager-interface';
import type { DonationPaymentInfo } from '../models/donation-payment-info';
import {
  type DonationResponse,
  type ErrorResponse,
  type SuccessResponse,
} from '../models/donation-response';
import { DonationType } from '../models/donation-type';
import type { BillingInfo, CustomerInfo } from '../models/donor-contact-info';
import type { PaymentProvider } from '../models/payment-provider';
import { UpsellModalCTAMode } from '../modals/ia-donation-upsell-modal-content';
import '../modals/ia-donation-confirm-modal';
import '../modals/ia-donation-error-modal-content';
import '../modals/ia-donation-upsell-modal-content';

const ModalHeaderColor = {
  Blue: '#497fbf',
  Green: '#55A183',
  Red: '#691916',
} as const;

/**
 * The high-level modal flow. Each payment provider gets the donor to a nonce
 * differently (PayPal button, Apple Pay sheet, the Venmo app), but from there
 * the modals are the same: processing, upsell, thank you, error. The flow
 * handlers call this to take the donor through them.
 */
export interface DonationFlowModalManagerInterface {
  showConfirmationStepModal(options: {
    amount: number;
    donationType: DonationType;
    currencyType: string;
    confirmDonationCB: () => void;
    cancelDonationCB: () => void;
  }): Promise<void>;

  closeModal(): void;

  showProcessingModal(): void;

  showThankYouModal(options: {
    successResponse: SuccessResponse;
    upsellSuccessResponse?: SuccessResponse;
  }): void;

  showErrorModal(options: {
    message: string;
    userClosedModalCallback?: () => void;
  }): void;

  showUpsellModal(options: {
    oneTimeAmount: number;
    ctaMode?: UpsellModalCTAMode;
    yesSelected?: (amount: number) => void;
    noSelected?: () => void;
    amountChanged?: (amount: number) => void;
    userClosedModalCallback?: () => void;
  }): Promise<void>;

  /**
   * The main flow, once the provider has handed back a nonce: show
   * processing, submit, then the upsell or thank you or error.
   */
  startDonationSubmissionFlow(options: {
    nonce: string;
    paymentProvider: PaymentProvider;
    donationInfo: DonationPaymentInfo;
    billingInfo: BillingInfo;
    customerInfo: CustomerInfo;
    upsellOnetimeTransactionId?: string;
    customerId?: string;
    recaptchaToken?: string;
    bin?: string;
    binName?: string;
  }): Promise<DonationResponse | undefined>;

  /**
   * What happens after a successful donation depends on its type: a one-time
   * donation gets the monthly upsell, a monthly one goes straight to thanks.
   */
  handleSuccessfulDonationResponse(
    donationInfo: DonationPaymentInfo,
    response: SuccessResponse,
  ): void;
}

export class DonationFlowModalManager
  implements DonationFlowModalManagerInterface
{
  private braintreeManager: BraintreeManagerInterface;

  private modalManager: ModalManagerInterface;

  private analytics: DonationEventLoggerInterface;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    modalManager: ModalManagerInterface;
    analytics: DonationEventLoggerInterface;
  }) {
    this.modalManager = options.modalManager;
    this.braintreeManager = options.braintreeManager;
    this.analytics = options.analytics;
  }

  closeModal(): void {
    this.modalManager.closeModal();
  }

  showProcessingModal(): void {
    const modalConfig = new ModalConfig({
      headerColor: ModalHeaderColor.Blue,
      showProcessingIndicator: true,
      closeOnBackdropClick: false,
      showCloseButton: false,
      processingImageMode: 'processing',
      title: html`${msg('Processing...')}`,
    });
    this.modalManager.showModal({ config: modalConfig });
  }

  showThankYouModal(options: {
    successResponse: SuccessResponse;
    upsellSuccessResponse?: SuccessResponse;
  }): void {
    const modalConfig = new ModalConfig({
      showProcessingIndicator: true,
      processingImageMode: 'complete',
      headerColor: ModalHeaderColor.Green,
      title: html`${msg('Thank You!')}`,
    });
    this.modalManager.showModal({ config: modalConfig });

    const selectedPayment = options.successResponse.paymentProvider.replace(
      /\s+/g,
      '',
    );
    let action = `Donated-${selectedPayment}`;
    if (options.upsellSuccessResponse) {
      action += `-upsell`;
    }
    const label = options.successResponse.donationType;
    this.analytics.logDonationFlowEvent(action, label);

    this.braintreeManager.donationSuccessful(options);
  }

  showErrorModal(options: {
    message: string;
    userClosedModalCallback?: () => void;
  }): void {
    const modalConfig = new ModalConfig({
      headerColor: ModalHeaderColor.Red,
      title: html`${msg('Processing error')}`,
      headline: html`${msg("There's been a problem completing your donation.")}`,
      message: html`${options.message}`,
    });

    this.modalManager.showModal({
      config: modalConfig,
      userClosedModalCallback: options.userClosedModalCallback,
      customModalContent: html`
        <ia-donation-error-modal-content></ia-donation-error-modal-content>
      `,
    });
  }

  showConfirmationStepModal(options: {
    amount: number;
    donationType: DonationType;
    currencyType: string;
    confirmDonationCB: () => void;
    cancelDonationCB: () => void;
  }): Promise<void> {
    const modalTitle =
      options.donationType === DonationType.Upsell
        ? msg('Confirm monthly donation')
        : msg('Complete donation');

    const modalConfig = new ModalConfig({
      closeOnBackdropClick: false,
      headerColor: ModalHeaderColor.Green,
      title: html`${modalTitle}`,
      message: html`
        <ia-donation-confirm-modal
          .amount=${options.amount}
          .currencyType=${options.currencyType}
          .donationType=${options.donationType}
          .confirmDonation=${options.confirmDonationCB}
          .cancelDonation=${options.cancelDonationCB}
        ></ia-donation-confirm-modal>
      `,
    });
    return this.modalManager.showModal({
      config: modalConfig,
      userClosedModalCallback: options.cancelDonationCB,
    });
  }

  showUpsellModal(options: {
    oneTimeAmount: number;
    yesSelected?: (amount: number) => void;
    noSelected?: () => void;
    amountChanged?: (amount: number) => void;
    userClosedModalCallback?: () => void;
    ctaMode?: UpsellModalCTAMode;
  }): Promise<void> {
    const modalConfig = new ModalConfig({
      headerColor: ModalHeaderColor.Green,
      title: html`${msg('Donation received')}`,
      processingImageMode: 'complete',
      showProcessingIndicator: true,
    });

    const upsellAmount = DonationFlowModalManager.getDefaultUpsellAmount(
      options.oneTimeAmount,
    );
    options.amountChanged?.(upsellAmount);

    const modalContent = html`
      <ia-donation-upsell-modal-content
        .amount=${upsellAmount}
        .yesButtonMode=${options.ctaMode ?? UpsellModalCTAMode.YesButton}
        @yesSelected=${(e: CustomEvent): void =>
          options.yesSelected?.(e.detail.amount)}
        @noThanksSelected=${options.noSelected}
        @amountChanged=${(e: CustomEvent): void =>
          options.amountChanged?.(e.detail.amount)}
      >
        <slot name="paypal-upsell-button"></slot>
      </ia-donation-upsell-modal-content>
    `;
    return this.modalManager.showModal({
      config: modalConfig,
      customModalContent: modalContent,
      userClosedModalCallback: options.userClosedModalCallback,
    });
  }

  async startDonationSubmissionFlow(options: {
    nonce: string;
    paymentProvider: PaymentProvider;
    donationInfo: DonationPaymentInfo;
    billingInfo: BillingInfo;
    customerInfo: CustomerInfo;
    upsellOnetimeTransactionId?: string;
    customerId?: string;
    recaptchaToken?: string;
    bin?: string;
    binName?: string;
  }): Promise<DonationResponse | undefined> {
    this.showProcessingModal();

    try {
      const response = await this.braintreeManager.submitDonation(options);

      if (response.success) {
        this.handleSuccessfulDonationResponse(
          options.donationInfo,
          response.value as SuccessResponse,
        );
      } else {
        const error = response.value as ErrorResponse;
        this.showErrorModal({ message: error.message });
      }
      return response;
    } catch (error) {
      this.showErrorModal({ message: `${error}` });
      console.error('error getting a response', error);
      return undefined;
    }
  }

  private async upsellModalYesSelected(
    oneTimeDonationResponse: SuccessResponse,
    amount: number,
  ): Promise<DonationResponse | undefined> {
    this.showProcessingModal();

    try {
      const response = await this.braintreeManager.submitUpsellDonation({
        oneTimeDonationResponse,
        amount,
      });

      if (response.success) {
        this.showThankYouModal({
          successResponse: oneTimeDonationResponse,
          upsellSuccessResponse: response.value as SuccessResponse,
        });
      } else {
        const error = response.value as ErrorResponse;
        this.showErrorModal({ message: error.message });
      }

      return response;
    } catch (error) {
      this.showErrorModal({ message: `${error}` });
      console.error('error getting a response', error);
      return undefined;
    }
  }

  /** The monthly amount the upsell suggests, stepped up with the one-time gift. */
  static getDefaultUpsellAmount(oneTimeAmount: number): number {
    if (oneTimeAmount <= 10) return 8;
    if (oneTimeAmount <= 25) return 10;
    if (oneTimeAmount <= 100) return 25;
    return 50;
  }

  handleSuccessfulDonationResponse(
    donationInfo: DonationPaymentInfo,
    response: SuccessResponse,
  ): void {
    switch (donationInfo.donationType) {
      case DonationType.OneTime:
        this.showUpsellModal({
          oneTimeAmount: response.amount,
          yesSelected: (amount: number) => {
            this.upsellModalYesSelected(response, amount);
          },
          noSelected: () => {
            this.showThankYouModal({ successResponse: response });
          },
          userClosedModalCallback: () => {
            this.showThankYouModal({ successResponse: response });
          },
        });
        break;
      case DonationType.Monthly:
        this.showThankYouModal({ successResponse: response });
        break;
      // The upsell itself is completed in `upsellModalYesSelected`
      case DonationType.Upsell:
        break;
    }
  }
}
