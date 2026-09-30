import type * as paypal from 'paypal-checkout-components';
import { createNanoEvents, type Emitter, type Unsubscribe } from 'nanoevents';
import { msg } from '@lit/localize';

import type { BraintreeManagerInterface } from '../../braintree/braintree-manager-interface';
import type {
  PayPalButtonDataSourceDelegate,
  PayPalButtonDataSourceInterface,
} from '../../braintree/payment-providers/paypal/paypal-button-datasource';
import { DonationPaymentInfo } from '../../models/donation-payment-info';
import type {
  DonationResponse,
  ErrorResponse,
  SuccessResponse,
} from '../../models/donation-response';
import { DonationType } from '../../models/donation-type';
import { BillingInfo, CustomerInfo } from '../../models/donor-contact-info';
import { PaymentProvider } from '../../models/payment-provider';
import { UpsellModalCTAMode } from '../../modals/ia-donation-upsell-modal-content';
import {
  DonationFlowModalManager,
  type DonationFlowModalManagerInterface,
} from '../donation-flow-modal-manager';

export interface PayPalFlowHandlerInterface {
  updateDonationInfo(donationInfo: DonationPaymentInfo): void;
  updateUpsellDonationInfo(donationInfo: DonationPaymentInfo): void;
  renderPayPalButton(donationInfo: DonationPaymentInfo): Promise<void>;
  on<E extends keyof PayPalFlowHandlerEvents>(
    event: E,
    callback: PayPalFlowHandlerEvents[E],
  ): Unsubscribe;
}

/** The one-time donation's results, kept for the upsell that follows it. */
class UpsellDataSourceContainer {
  upsellButtonDataSource: PayPalButtonDataSourceInterface;
  oneTimePayload: paypal.TokenizePayload;
  oneTimeSuccessResponse: SuccessResponse;

  constructor(options: {
    upsellButtonDataSource: PayPalButtonDataSourceInterface;
    oneTimePayload: paypal.TokenizePayload;
    oneTimeSuccessResponse: SuccessResponse;
  }) {
    this.upsellButtonDataSource = options.upsellButtonDataSource;
    this.oneTimePayload = options.oneTimePayload;
    this.oneTimeSuccessResponse = options.oneTimeSuccessResponse;
  }
}

export interface PayPalFlowHandlerEvents {
  payPalPaymentStarted: (
    dataSource: PayPalButtonDataSourceInterface,
    options: object,
  ) => void;
  payPalPaymentCancelled: (
    dataSource: PayPalButtonDataSourceInterface,
    data: object,
  ) => void;
  payPalPaymentError: (
    dataSource: PayPalButtonDataSourceInterface,
    error: string,
  ) => void;
  payPalPaymentConfirmed: (
    dataSource: PayPalButtonDataSourceInterface,
    data: object,
  ) => void;
}

/** The PayPal flow: button press, authorization, our confirmation step, submit, upsell. */
export class PayPalFlowHandler
  implements PayPalFlowHandlerInterface, PayPalButtonDataSourceDelegate
{
  private upsellButtonDataSourceContainer?: UpsellDataSourceContainer;

  private buttonDataSource?: PayPalButtonDataSourceInterface;

  private donationFlowModalManager: DonationFlowModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  private emitter: Emitter<PayPalFlowHandlerEvents> =
    createNanoEvents<PayPalFlowHandlerEvents>();

  updateDonationInfo(donationInfo: DonationPaymentInfo): void {
    if (this.buttonDataSource) {
      this.buttonDataSource.donationInfo = donationInfo;
    }
  }

  updateUpsellDonationInfo(donationInfo: DonationPaymentInfo): void {
    if (this.upsellButtonDataSourceContainer) {
      this.upsellButtonDataSourceContainer.upsellButtonDataSource.donationInfo =
        donationInfo;
    }
  }

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    donationFlowModalManager: DonationFlowModalManagerInterface;
  }) {
    this.braintreeManager = options.braintreeManager;
    this.donationFlowModalManager = options.donationFlowModalManager;
  }

  on<E extends keyof PayPalFlowHandlerEvents>(
    event: E,
    callback: PayPalFlowHandlerEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }

  async payPalPaymentStarted(
    dataSource: PayPalButtonDataSourceInterface,
    options: object,
  ): Promise<void> {
    this.emitter.emit('payPalPaymentStarted', dataSource, options);
  }

  /**
   * PayPal has authorized the payment. The donor confirms the amount in our
   * own step before it's submitted, which leads to `payPalPaymentConfirmed`.
   */
  async payPalPaymentAuthorized(
    dataSource: PayPalButtonDataSourceInterface,
    payload: paypal.TokenizePayload,
  ): Promise<void> {
    const { donationType, total } = dataSource.donationInfo;
    this.donationFlowModalManager.showConfirmationStepModal({
      donationType,
      amount: total,
      currencyType: 'USD',
      confirmDonationCB: () => {
        this.payPalPaymentConfirmed(dataSource, payload);
      },
      cancelDonationCB: () => {
        this.donationFlowModalManager.closeModal();
        this.payPalPaymentCancelled(dataSource, {});
      },
    });
  }

  async payPalPaymentConfirmed(
    dataSource: PayPalButtonDataSourceInterface,
    payload: paypal.TokenizePayload,
  ): Promise<void> {
    this.emitter.emit('payPalPaymentConfirmed', dataSource, {});
    this.donationFlowModalManager.showProcessingModal();

    const donationType = dataSource.donationInfo.donationType;

    const details = payload.details;

    const customerInfo = new CustomerInfo({
      email: details?.email,
      firstName: details?.firstName,
      lastName: details?.lastName,
    });

    const shippingAddress = details?.shippingAddress;

    const billingInfo = new BillingInfo({
      streetAddress: shippingAddress?.line1,
      extendedAddress: shippingAddress?.line2,
      locality: shippingAddress?.city,
      region: shippingAddress?.state,
      postalCode: shippingAddress?.postalCode,
      countryCodeAlpha2: shippingAddress?.countryCode,
    });

    const oneTimeTransaction =
      this.upsellButtonDataSourceContainer?.oneTimeSuccessResponse
        .transaction_id;

    const response: DonationResponse =
      await this.braintreeManager.submitDonation({
        nonce: payload.nonce,
        paymentProvider: PaymentProvider.PayPal,
        donationInfo: dataSource.donationInfo,
        customerInfo,
        billingInfo,
        upsellOnetimeTransactionId: oneTimeTransaction,
      });

    if (!response.success) {
      const error = response.value as ErrorResponse;
      this.donationFlowModalManager.showErrorModal({ message: error.message });
      return;
    }

    const successResponse = response.value as SuccessResponse;

    switch (donationType) {
      case DonationType.OneTime:
        this.showUpsellModal(payload, successResponse);
        break;
      case DonationType.Monthly:
        this.donationFlowModalManager.showThankYouModal({ successResponse });
        break;
      case DonationType.Upsell:
        if (this.upsellButtonDataSourceContainer) {
          this.donationFlowModalManager.showThankYouModal({
            successResponse:
              this.upsellButtonDataSourceContainer.oneTimeSuccessResponse,
            upsellSuccessResponse: successResponse,
          });
        } else {
          // An upsell with no record of the one-time donation it follows
          this.donationFlowModalManager.showErrorModal({
            message: msg('Error setting up monthly donation'),
          });
        }
        break;
    }
  }

  async payPalPaymentCancelled(
    dataSource: PayPalButtonDataSourceInterface,
    data: object,
  ): Promise<void> {
    this.emitter.emit('payPalPaymentCancelled', dataSource, data);
  }

  async payPalPaymentError(
    dataSource: PayPalButtonDataSourceInterface,
    error: string,
  ): Promise<void> {
    this.emitter.emit('payPalPaymentError', dataSource, error);
    console.error(
      'PayPalFlowHandler payment error:',
      dataSource,
      dataSource.donationInfo,
      error,
    );
  }

  async renderPayPalButton(donationInfo: DonationPaymentInfo): Promise<void> {
    const handler =
      await this.braintreeManager.paymentProviders.paypalHandler.get();

    this.buttonDataSource = await handler.renderPayPalButton({
      selector: '#paypal-button',
      style: {
        color: 'blue' as paypal.ButtonColorOption,
        label: 'paypal' as paypal.ButtonLabelOption,
        shape: 'rect' as paypal.ButtonShapeOption,
        size: 'medium' as paypal.ButtonSizeOption,
        tagline: false,
      },
      donationInfo,
    });

    if (this.buttonDataSource) {
      this.buttonDataSource.delegate = this;
    }
  }

  private async showUpsellModal(
    oneTimePayload: paypal.TokenizePayload,
    oneTimeSuccessResponse: SuccessResponse,
  ): Promise<void> {
    this.donationFlowModalManager.showUpsellModal({
      oneTimeAmount: oneTimeSuccessResponse.amount,
      amountChanged: this.upsellAmountChanged.bind(this),
      noSelected: () => {
        this.donationFlowModalManager.showThankYouModal({
          successResponse: oneTimeSuccessResponse,
        });
      },
      ctaMode: UpsellModalCTAMode.PayPalUpsellSlot,
      userClosedModalCallback: () => {
        this.donationFlowModalManager.showThankYouModal({
          successResponse: oneTimeSuccessResponse,
        });
      },
    });

    const amount = DonationFlowModalManager.getDefaultUpsellAmount(
      oneTimeSuccessResponse.amount,
    );

    const upsellDonationInfo = new DonationPaymentInfo({
      amount,
      donationType: DonationType.Upsell,
      coverFees: false,
    });

    if (!this.upsellButtonDataSourceContainer) {
      this.renderUpsellPayPalButton({
        donationInfo: upsellDonationInfo,
        oneTimePayload,
        oneTimeSuccessResponse,
      });
    }
  }

  private upsellAmountChanged(amount: number): void {
    if (this.upsellButtonDataSourceContainer) {
      this.upsellButtonDataSourceContainer.upsellButtonDataSource.donationInfo.amount =
        amount;
    }
  }

  private async renderUpsellPayPalButton(options: {
    donationInfo: DonationPaymentInfo;
    oneTimePayload: paypal.TokenizePayload;
    oneTimeSuccessResponse: SuccessResponse;
  }): Promise<void> {
    const handler =
      await this.braintreeManager.paymentProviders.paypalHandler.get();

    const upsellButtonDataSource = await handler.renderPayPalButton({
      selector: '#paypal-upsell-button',
      style: {
        color: 'blue' as paypal.ButtonColorOption,
        label: 'paypal' as paypal.ButtonLabelOption,
        shape: 'rect' as paypal.ButtonShapeOption,
        size: 'responsive' as paypal.ButtonSizeOption,
        tagline: false,
      },
      donationInfo: options.donationInfo,
    });

    if (upsellButtonDataSource) {
      upsellButtonDataSource.delegate = this;
      this.upsellButtonDataSourceContainer = new UpsellDataSourceContainer({
        upsellButtonDataSource,
        oneTimePayload: options.oneTimePayload,
        oneTimeSuccessResponse: options.oneTimeSuccessResponse,
      });
    } else {
      console.error('error rendering paypal upsell button');
    }
  }
}
