import type * as braintree from 'braintree-web';
import { PromisedSingleton } from '@internetarchive/promised-singleton';

import type { DonationPaymentInfo } from '../../../models/donation-payment-info';
import { DonationType } from '../../../models/donation-type';
import type { BraintreeManagerInterface } from '../../braintree-manager-interface';
import type { ApplePayHandlerInterface } from './apple-pay-interface';
import { ApplePaySessionDataSource } from './apple-pay-session-datasource';
import type { ApplePaySessionManagerInterface } from './apple-pay-session-manager';

export class ApplePayHandler implements ApplePayHandlerInterface {
  instance: PromisedSingleton<braintree.ApplePay | undefined>;

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    applePayClient: typeof braintree.applePay;
    applePaySessionManager: ApplePaySessionManagerInterface;
    instancePromisedSingleton?: PromisedSingleton<
      braintree.ApplePay | undefined
    >;
  }) {
    this.braintreeManager = options.braintreeManager;
    this.applePayClient = options.applePayClient;
    this.applePaySessionManager = options.applePaySessionManager;

    this.instance =
      options.instancePromisedSingleton ??
      new PromisedSingleton<braintree.ApplePay | undefined>({
        generator: async () => {
          if (!this.applePaySessionManager.canMakePayments()) {
            return undefined;
          }

          const braintreeClient = await this.braintreeManager.instance.get();
          return this.applePayClient.create({ client: braintreeClient });
        },
      });
  }

  private braintreeManager: BraintreeManagerInterface;

  private applePaySessionManager: ApplePaySessionManagerInterface;

  private applePayClient: typeof braintree.applePay;

  async isAvailable(): Promise<boolean> {
    try {
      const instance = await this.instance.get();
      return !!instance;
    } catch {
      return false;
    }
  }

  /**
   * Starts the Apple Pay sheet. The event that triggered it has to be passed
   * in, even though nothing here reads it: Apple Pay refuses to launch outside
   * a user gesture.
   */
  async createPaymentRequest(
    _e: Event,
    donationInfo: DonationPaymentInfo,
  ): Promise<ApplePaySessionDataSource> {
    const applePayInstance = await this.instance.get();
    if (!applePayInstance) {
      throw new Error('Apple Pay is not available in this browser');
    }

    const label =
      donationInfo.donationType === DonationType.OneTime
        ? 'Internet Archive'
        : 'Internet Archive Monthly';

    const paymentRequest = applePayInstance.createPaymentRequest({
      total: {
        label,
        amount: `${donationInfo.total}`,
      },
      requiredBillingContactFields: ['postalAddress'],
      requiredShippingContactFields: ['name', 'email'],
    });
    const session = this.applePaySessionManager.createNewPaymentSession(
      paymentRequest as ApplePayJS.ApplePayPaymentRequest,
    );

    const sessionDataSource = new ApplePaySessionDataSource({
      donationInfo,
      session,
      applePayInstance,
      braintreeManager: this.braintreeManager,
    });

    session.onvalidatemerchant =
      sessionDataSource.onvalidatemerchant.bind(sessionDataSource);
    session.onpaymentauthorized =
      sessionDataSource.onpaymentauthorized.bind(sessionDataSource);
    session.oncancel = sessionDataSource.oncancel.bind(sessionDataSource);

    session.begin();

    return sessionDataSource;
  }
}
