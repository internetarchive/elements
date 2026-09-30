import type * as braintree from 'braintree-web';
import { createNanoEvents, type Emitter, type Unsubscribe } from 'nanoevents';

import type { BraintreeManagerInterface } from '../../braintree/braintree-manager-interface';
import type { DonationPaymentInfo } from '../../models/donation-payment-info';
import { BillingInfo, CustomerInfo } from '../../models/donor-contact-info';
import { PaymentProvider } from '../../models/payment-provider';
import type { DonationFlowModalManagerInterface } from '../donation-flow-modal-manager';

export interface GooglePayFlowHandlerInterface {
  paymentInitiated(donationInfo: DonationPaymentInfo): Promise<void>;
  on<E extends keyof GooglePayFlowHandlerEvents>(
    event: E,
    callback: GooglePayFlowHandlerEvents[E],
  ): Unsubscribe;
}

export interface GooglePayFlowHandlerEvents {
  paymentCancelled: () => void;
}

/** The Google Pay flow: the payment sheet collects everything, this submits what it returns. */
export class GooglePayFlowHandler implements GooglePayFlowHandlerInterface {
  private donationFlowModalManager: DonationFlowModalManagerInterface;

  private braintreeManager: BraintreeManagerInterface;

  private emitter: Emitter<GooglePayFlowHandlerEvents> =
    createNanoEvents<GooglePayFlowHandlerEvents>();

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    donationFlowModalManager: DonationFlowModalManagerInterface;
  }) {
    this.braintreeManager = options.braintreeManager;
    this.donationFlowModalManager = options.donationFlowModalManager;
  }

  on<E extends keyof GooglePayFlowHandlerEvents>(
    event: E,
    callback: GooglePayFlowHandlerEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }

  async paymentInitiated(donationInfo: DonationPaymentInfo): Promise<void> {
    const handler =
      await this.braintreeManager.paymentProviders.googlePayHandler.get();
    const instance = await handler.instance.get();

    const paymentDataRequest = instance.createPaymentDataRequest({
      emailRequired: true,
      transactionInfo: {
        currencyCode: 'USD',
        totalPriceStatus: 'FINAL',
        totalPrice: `${donationInfo.total}`,
      },
    });

    const cardPaymentMethod = paymentDataRequest.allowedPaymentMethods[0];
    cardPaymentMethod.parameters.billingAddressRequired = true;
    cardPaymentMethod.parameters.billingAddressParameters = {
      format: 'FULL',
      phoneNumberRequired: false,
    };

    try {
      const paymentData =
        await handler.paymentsClient.loadPaymentData(paymentDataRequest);
      const result: braintree.GooglePaymentTokenizePayload =
        await instance.parseResponse(paymentData);

      const billingInfo = paymentData.paymentMethodData.info?.billingAddress;
      // Google Pay gives one full name; the last word is the surname
      const name = billingInfo?.name?.trim();
      let firstName: string | undefined = name;
      let lastName: string | undefined = '';
      const lastSpace = name?.lastIndexOf(' ') ?? -1;
      if (name && lastSpace > 0) {
        firstName = name.substring(0, lastSpace);
        lastName = name.substring(lastSpace + 1);
      }

      const customer = new CustomerInfo({
        email: paymentData.email,
        firstName,
        lastName,
      });

      const billing = new BillingInfo({
        streetAddress: billingInfo?.address1,
        extendedAddress: billingInfo?.address2,
        locality: billingInfo?.locality,
        region: billingInfo?.administrativeArea,
        postalCode: billingInfo?.postalCode,
        countryCodeAlpha2: billingInfo?.countryCode,
      });

      this.donationFlowModalManager.startDonationSubmissionFlow({
        nonce: result.nonce,
        paymentProvider: PaymentProvider.GooglePay,
        bin: result.details.bin,
        binName: result.binData.issuingBank,
        donationInfo,
        customerInfo: customer,
        billingInfo: billing,
      });
    } catch {
      // The sheet was dismissed, or Google couldn't complete it
      this.emitter.emit('paymentCancelled');
      this.donationFlowModalManager.closeModal();
    }
  }
}
