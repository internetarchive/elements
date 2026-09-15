import type * as braintree from 'braintree-web';
import type { PromisedSingleton } from '@internetarchive/promised-singleton';
import type { Unsubscribe } from 'nanoevents';

import type { BillingInfo, CustomerInfo } from '../models/donor-contact-info';
import type { DonationPaymentInfo } from '../models/donation-payment-info';
import type { DonationRequest } from '../models/donation-request';
import type {
  DonationResponse,
  SuccessResponse,
} from '../models/donation-response';
import type { PaymentProvider } from '../models/payment-provider';
import type { PaymentProvidersInterface } from './payment-providers-interface';

export interface BraintreeManagerEvents {
  paymentProvidersHostedFieldsRetry: (retryNumber: number) => void;
  paymentProvidersHostedFieldsFailed: (error: unknown) => void;
}

/**
 * The BraintreeManager is the main entry point for the shared Braintree
 * functionality. One instance is created and handed down through all of the
 * components.
 */
export interface BraintreeManagerInterface {
  on<E extends keyof BraintreeManagerEvents>(
    event: E,
    callback: BraintreeManagerEvents[E],
  ): Unsubscribe;

  /**
   * The IA-specific handlers for each payment provider. They're data-focused
   * rather than UI-focused, though there's some overlap with the flow handlers.
   */
  paymentProviders: PaymentProvidersInterface;

  /** The Braintree client instance, used to create the provider clients. */
  instance: PromisedSingleton<braintree.Client>;

  /** Set the referrer for later submission */
  setReferrer(referrer: string): void;

  /** Set the origin for later submission */
  setOrigin(origin: string): void;

  /** Set the logged-in user for later submission */
  setLoggedInUser(loggedInUser: string): void;

  /** Perform startup tasks like device data collection */
  startup(): void;

  /** Submit a donation to the backend */
  submitDonation(options: {
    nonce: string;
    paymentProvider: PaymentProvider;
    donationInfo: DonationPaymentInfo;
    billingInfo: BillingInfo;
    customerInfo: CustomerInfo;
    upsellOnetimeTransactionId?: string;
    customerId?: string;
    recaptchaToken?: string;
    /** First 6 digits of the credit card */
    bin?: string;
    /** The credit card's bank name */
    binName?: string;
  }): Promise<DonationResponse>;

  /** Submit the monthly upsell that follows a one-time donation */
  submitUpsellDonation(options: {
    oneTimeDonationResponse: SuccessResponse;
    amount: number;
  }): Promise<DonationResponse>;

  /** Finish the donation after a successful completion */
  donationSuccessful(options: {
    successResponse: SuccessResponse;
    upsellSuccessResponse?: SuccessResponse;
  }): void;
}

/**
 * The consumer's bridge to its backend: it submits the donation request and
 * is told when the whole flow is finished so it can redirect to a thank-you
 * page.
 */
export interface BraintreeEndpointManagerInterface {
  /** Submit the request to the backend and return its modeled response. */
  submitData(request: DonationRequest): Promise<DonationResponse>;

  /**
   * Called once the donor is done with the flow, after a monthly donation or
   * after the upsell step, so the consumer can redirect them.
   */
  donationSuccessful(options: {
    successResponse: SuccessResponse;
    upsellSuccessResponse?: SuccessResponse;
  }): void;
}
