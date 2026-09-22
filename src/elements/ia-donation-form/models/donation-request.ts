import type { BillingInfo, CustomerInfo } from './donor-contact-info';
import type { DonationType } from './donation-type';
import type { PaymentProvider } from './payment-provider';

/**
 * Extra fields sent with a donation. Each one has to exist in the Braintree
 * control panel before the backend will accept it, which is why the names are
 * snake_case: they match the Braintree field names.
 */
export class DonationRequestCustomFields {
  logged_in_user?: string;
  referrer?: string;
  fee_amount_covered?: number;

  /**
   * Campaign and A/B test information about where the donor came from.
   *
   * Freeform, but keep it something identifiable so it can be queried in
   * CiviCRM. The donation banner uses `{Source}-{Test Name}-{Variant Name}`,
   * e.g. `DonateBanner-Campaign Start 2020-IADefault`. Add more segments for
   * more specificity: `DonateBanner-MidJuly2020 Campaign-VariantA-Button1`.
   */
  origin?: string;

  constructor(options?: {
    logged_in_user?: string;
    referrer?: string;
    fee_amount_covered?: number;
    origin?: string;
  }) {
    this.logged_in_user = options?.logged_in_user;
    this.referrer = options?.referrer;
    this.fee_amount_covered = options?.fee_amount_covered;
    this.origin = options?.origin;
  }
}

/** The request submitted to the backend to make a donation. */
export class DonationRequest {
  paymentProvider: PaymentProvider;
  paymentMethodNonce: string;
  recaptchaToken?: string;
  customerId?: string;
  deviceData?: string;
  upsellOnetimeTransactionId?: string;

  /** First 6 digits of the credit card */
  bin?: string;
  /** The credit card's bank name */
  binName?: string;

  amount: number;
  donationType: DonationType;

  customer: CustomerInfo;
  billing: BillingInfo;
  customFields: DonationRequestCustomFields = new DonationRequestCustomFields();

  constructor(options: {
    paymentProvider: PaymentProvider;
    paymentMethodNonce: string;
    recaptchaToken?: string;
    customerId?: string;
    deviceData?: string;
    upsellOnetimeTransactionId?: string;
    bin?: string;
    binName?: string;
    amount: number;
    donationType: DonationType;
    customer: CustomerInfo;
    billing: BillingInfo;
    customFields?: DonationRequestCustomFields;
  }) {
    this.paymentProvider = options.paymentProvider;
    this.paymentMethodNonce = options.paymentMethodNonce;
    this.recaptchaToken = options.recaptchaToken;
    this.customerId = options.customerId;
    this.deviceData = options.deviceData;
    this.upsellOnetimeTransactionId = options.upsellOnetimeTransactionId;

    this.bin = options.bin;
    this.binName = options.binName;

    this.amount = options.amount;
    this.donationType = options.donationType;

    this.customer = options.customer;
    this.billing = options.billing;

    if (options.customFields) {
      this.customFields = options.customFields;
    }
  }
}
