import type * as braintree from 'braintree-web';

import type { DonationPaymentInfo } from '../../../models/donation-payment-info';
import { BillingInfo, CustomerInfo } from '../../../models/donor-contact-info';
import { PaymentProvider } from '../../../models/payment-provider';
import type { BraintreeManagerInterface } from '../../braintree-manager-interface';
import type {
  ApplePaySessionDataSourceDelegate,
  ApplePaySessionDataSourceInterface,
} from './apple-pay-session-datasource-interface';

export class ApplePaySessionDataSource
  implements ApplePaySessionDataSourceInterface
{
  delegate?: ApplePaySessionDataSourceDelegate;
  donationInfo: DonationPaymentInfo;

  private session: ApplePaySession;
  private applePayInstance: braintree.ApplePay;
  private braintreeManager: BraintreeManagerInterface;

  constructor(options: {
    donationInfo: DonationPaymentInfo;
    session: ApplePaySession;
    applePayInstance: braintree.ApplePay;
    braintreeManager: BraintreeManagerInterface;
  }) {
    this.session = options.session;
    this.donationInfo = options.donationInfo;
    this.applePayInstance = options.applePayInstance;
    this.braintreeManager = options.braintreeManager;
  }

  async onvalidatemerchant(
    event: ApplePayJS.ApplePayValidateMerchantEvent,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.applePayInstance.performValidation(
        {
          validationURL: event.validationURL,
          displayName: 'Internet Archive',
        },
        (validationErr, validationData) => {
          if (validationErr) {
            this.delegate?.paymentFailed(validationErr);
            this.session.abort();
            reject(`Merchant validation error: ${validationErr}`);
          } else {
            this.session.completeMerchantValidation(validationData);
            resolve();
          }
        },
      );
    });
  }

  async oncancel(): Promise<void> {
    this.delegate?.paymentCancelled();
  }

  async onpaymentauthorized(
    event: ApplePayJS.ApplePayPaymentAuthorizedEvent,
  ): Promise<void> {
    let payload: braintree.ApplePayPayload;
    try {
      payload = await this.applePayInstance.tokenize({
        token: event.payment.token,
      });
    } catch (err) {
      this.delegate?.paymentFailed(err);
      this.session.completePayment(ApplePaySession.STATUS_FAILURE);
      return;
    }

    const payment = event.payment;
    const billingContact = payment.billingContact;
    const shippingContact = payment.shippingContact;
    const [line1, line2] = billingContact?.addressLines ?? [];

    const billingInfo = new BillingInfo({
      streetAddress: line1,
      extendedAddress: line2,
      locality: billingContact?.locality,
      region: billingContact?.administrativeArea,
      postalCode: billingContact?.postalCode,
      countryCodeAlpha2: billingContact?.countryCode,
    });

    const customerInfo = new CustomerInfo({
      email: shippingContact?.emailAddress,
      firstName: shippingContact?.givenName,
      lastName: shippingContact?.familyName,
    });

    try {
      const donationResponse = await this.braintreeManager.submitDonation({
        nonce: payload.nonce,
        paymentProvider: PaymentProvider.ApplePay,
        donationInfo: this.donationInfo,
        billingInfo,
        customerInfo,
      });
      if (donationResponse.success) {
        this.delegate?.paymentComplete(donationResponse);
        this.session.completePayment(ApplePaySession.STATUS_SUCCESS);
      } else {
        this.delegate?.paymentFailed('Failure submitting data');
        this.session.completePayment(ApplePaySession.STATUS_FAILURE);
      }
    } catch (err) {
      this.delegate?.paymentFailed(err);
      this.session.completePayment(ApplePaySession.STATUS_FAILURE);
    }
  }
}
