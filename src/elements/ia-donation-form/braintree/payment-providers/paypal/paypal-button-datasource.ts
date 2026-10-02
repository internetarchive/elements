import type * as braintree from 'braintree-web';
import type * as paypal from 'paypal-checkout-components';
import currency from 'currency.js';

import type { DonationPaymentInfo } from '../../../models/donation-payment-info';
import { DonationType } from '../../../models/donation-type';

/**
 * The go-between for the PayPal button.
 *
 * The button can't live in the shadow DOM, so it's rendered at the top of the
 * page in the global scope, which makes it hard to talk to directly. The data
 * source hooks into all of the button's callbacks and relays them to a
 * delegate that cares about the events.
 */
export interface PayPalButtonDataSourceInterface {
  /** The delegate to tell about button events */
  delegate?: PayPalButtonDataSourceDelegate;

  /**
   * The donation info for this button. The donor starts checkout from the
   * button itself, not from our code, so this has to be kept current as they
   * change the form.
   */
  donationInfo: DonationPaymentInfo;

  /** The donor pressed the button */
  payment(): Promise<string>;

  /** The donor authorized the donation */
  onAuthorize(
    data: paypal.AuthorizationData,
    actions: object,
  ): Promise<paypal.TokenizePayload | undefined>;

  /** The donor cancelled the donation */
  onCancel(data: paypal.CancellationData): void;

  /** Something went wrong */
  onError(error: string): void;
}

/** Anything interested in what the PayPal button is doing. */
export interface PayPalButtonDataSourceDelegate {
  /** The donor pressed the button */
  payPalPaymentStarted(
    dataSource: PayPalButtonDataSourceInterface,
    options: object,
  ): Promise<void>;

  /** PayPal authorized the payment and handed back a payload to submit */
  payPalPaymentAuthorized(
    dataSource: PayPalButtonDataSourceInterface,
    payload: paypal.TokenizePayload,
  ): Promise<void>;

  /** The donor confirmed the donation in our confirmation step */
  payPalPaymentConfirmed(
    dataSource: PayPalButtonDataSourceInterface,
    payload: paypal.TokenizePayload,
  ): Promise<void>;

  /** The donor cancelled */
  payPalPaymentCancelled(
    dataSource: PayPalButtonDataSourceInterface,
    data: object,
  ): Promise<void>;

  /** Something went wrong */
  payPalPaymentError(
    dataSource: PayPalButtonDataSourceInterface,
    error: string,
  ): Promise<void>;
}

export class PayPalButtonDataSource implements PayPalButtonDataSourceInterface {
  delegate?: PayPalButtonDataSourceDelegate;

  donationInfo: DonationPaymentInfo;

  private paypalInstance: braintree.PayPalCheckout;

  constructor(options: {
    donationInfo: DonationPaymentInfo;
    paypalInstance: braintree.PayPalCheckout;
  }) {
    this.donationInfo = options.donationInfo;
    this.paypalInstance = options.paypalInstance;
  }

  async payment(): Promise<string> {
    const donationType = this.donationInfo.donationType;
    const flow = donationType === DonationType.OneTime ? 'checkout' : 'vault';

    const options: braintree.PayPalCheckoutCreatePaymentOptions = {
      flow: flow as paypal.FlowType,
      intent: 'capture' as paypal.Intent,
      enableShippingAddress: true,
    };

    if (flow === 'checkout') {
      options.amount = this.donationInfo.total;
      options.currency = 'USD';
    } else {
      options.billingAgreementDescription = `Subscribe to donate ${currency(
        this.donationInfo.total,
        { symbol: '$' },
      ).format()} monthly`;
    }

    this.delegate?.payPalPaymentStarted(this, options);

    return this.paypalInstance.createPayment(options);
  }

  async onAuthorize(
    data: paypal.AuthorizationData,
  ): Promise<paypal.TokenizePayload> {
    const payload = await this.paypalInstance.tokenizePayment(data);

    this.delegate?.payPalPaymentAuthorized(this, payload);

    return payload;
  }

  async onConfirm(
    data: paypal.AuthorizationData,
  ): Promise<paypal.TokenizePayload> {
    const payload = await this.paypalInstance.tokenizePayment(data);
    this.delegate?.payPalPaymentConfirmed(this, payload);

    return payload;
  }

  onCancel(data: object): void {
    this.delegate?.payPalPaymentCancelled(this, data);
  }

  onError(error: string): void {
    console.error('PayPal error', error);
    this.delegate?.payPalPaymentError(this, error);
  }
}
