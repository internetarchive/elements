import type * as braintree from 'braintree-web';
import { PromisedSingleton } from '@internetarchive/promised-singleton';

import type { BraintreeManagerInterface } from '../../braintree-manager-interface';
import type { GooglePayHandlerInterface } from './google-pay-interface';

export class GooglePayHandler implements GooglePayHandlerInterface {
  paymentsClient: google.payments.api.PaymentsClient;

  instance: PromisedSingleton<braintree.GooglePayment>;

  async isBrowserSupported(): Promise<boolean> {
    // See https://developers.google.com/pay/api/web/reference/object#IsReadyToPayRequest
    const response = await this.paymentsClient.isReadyToPay({
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY'],
            allowedCardNetworks: [
              'AMEX',
              'DISCOVER',
              'INTERAC',
              'JCB',
              'MASTERCARD',
              'VISA',
            ],
          },
        },
      ],
      existingPaymentMethodRequired: false,
    });
    return response.result;
  }

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    googlePayMerchantId?: string;
    googlePayBraintreeClient: typeof braintree.googlePayment;
    googlePaymentsClient: google.payments.api.PaymentsClient;
  }) {
    this.braintreeManager = options.braintreeManager;
    this.googlePayMerchantId = options.googlePayMerchantId;
    this.googlePayBraintreeClient = options.googlePayBraintreeClient;
    this.paymentsClient = options.googlePaymentsClient;

    this.instance = new PromisedSingleton<braintree.GooglePayment>({
      generator: async () => {
        const braintreeInstance = await this.braintreeManager.instance.get();
        return this.googlePayBraintreeClient.create({
          client: braintreeInstance,
          googlePayVersion: 2,
          googleMerchantId: this.googlePayMerchantId,
        });
      },
    });
  }

  private braintreeManager: BraintreeManagerInterface;

  private googlePayMerchantId?: string;

  private googlePayBraintreeClient: typeof braintree.googlePayment;
}
