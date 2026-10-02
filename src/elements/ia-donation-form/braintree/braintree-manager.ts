import type * as braintree from 'braintree-web';
import { PromisedSingleton } from '@internetarchive/promised-singleton';
import { createNanoEvents, type Unsubscribe } from 'nanoevents';

import type { BillingInfo, CustomerInfo } from '../models/donor-contact-info';
import { DonationPaymentInfo } from '../models/donation-payment-info';
import {
  DonationRequest,
  DonationRequestCustomFields,
} from '../models/donation-request';
import {
  DonationResponse,
  type SuccessResponse,
} from '../models/donation-response';
import { DonationType } from '../models/donation-type';
import type { PaymentProvider } from '../models/payment-provider';
import type {
  BraintreeEndpointManagerInterface,
  BraintreeManagerEvents,
  BraintreeManagerInterface,
} from './braintree-manager-interface';
import type { HostingEnvironment } from './hosting-environment';
import type { PaymentClientsInterface } from './payment-clients';
import { PaymentProviders } from './payment-providers';
import type { PaymentProvidersInterface } from './payment-providers-interface';
import type { HostedFieldConfiguration } from './payment-providers/credit-card/hosted-field-configuration';

export class BraintreeManager implements BraintreeManagerInterface {
  private referrer?: string;

  /**
   * Campaign and A/B test information about where the donor came from, sent
   * as a custom field. See `DonationRequestCustomFields.origin` for the format.
   */
  private origin?: string;

  private loggedInUser?: string;

  /**
   * The device data token from Braintree's DataCollector. Several providers
   * submit it as an anti-fraud measure.
   */
  private deviceData?: string;

  private emitter = createNanoEvents<BraintreeManagerEvents>();

  on<E extends keyof BraintreeManagerEvents>(
    event: E,
    callback: BraintreeManagerEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }

  paymentProviders: PaymentProvidersInterface;

  async startup(): Promise<void> {
    return this.collectDeviceData();
  }

  instance = new PromisedSingleton<braintree.Client>({
    generator: async () => {
      const client = await this.paymentClients.braintreeClient.get();
      return client.create({ authorization: this.authorizationToken });
    },
  });

  async submitDonation(options: {
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
  }): Promise<DonationResponse> {
    // `donationInfo` doesn't always arrive as a DonationPaymentInfo instance.
    // Coming back from Venmo in Chrome it's a plain object with none of the
    // getters, so the fee and total are calculated from the fields instead.
    const { amount, coverFees } = options.donationInfo;
    const total = DonationPaymentInfo.calculateTotal(amount, coverFees);
    const feeAmountCovered = coverFees
      ? DonationPaymentInfo.calculateFeeAmount(amount)
      : 0;

    const customFields = new DonationRequestCustomFields({
      fee_amount_covered: feeAmountCovered,
      logged_in_user: this.loggedInUser,
      referrer: this.referrer,
      origin: this.origin,
    });

    const donationRequest = new DonationRequest({
      deviceData: this.deviceData,
      paymentProvider: options.paymentProvider,
      paymentMethodNonce: options.nonce,
      amount: total,
      donationType: options.donationInfo.donationType,
      customer: options.customerInfo,
      billing: options.billingInfo,
      customFields,
      upsellOnetimeTransactionId: options.upsellOnetimeTransactionId,
      customerId: options.customerId,
      recaptchaToken: options.recaptchaToken,
      bin: options.bin,
      binName: options.binName,
    });

    const jsonResponse = await this.endpointManager.submitData(donationRequest);
    return new DonationResponse(jsonResponse);
  }

  async submitUpsellDonation(options: {
    oneTimeDonationResponse: SuccessResponse;
    amount: number;
  }): Promise<DonationResponse> {
    const response = options.oneTimeDonationResponse;

    const donationInfo = new DonationPaymentInfo({
      amount: options.amount,
      donationType: DonationType.Upsell,
      coverFees: false,
    });

    return this.submitDonation({
      nonce: response.paymentMethodNonce,
      paymentProvider: response.paymentProvider,
      customerId: response.customer_id,
      donationInfo,
      customerInfo: response.customer,
      billingInfo: response.billing,
      upsellOnetimeTransactionId: response.transaction_id,
    });
  }

  donationSuccessful(options: {
    successResponse: SuccessResponse;
    upsellSuccessResponse?: SuccessResponse;
  }): void {
    this.endpointManager.donationSuccessful(options);
  }

  private deviceDataCollectionStarted = false;

  /** Collect Braintree device data, which helps with fraud detection. */
  private async collectDeviceData(): Promise<void> {
    if (this.deviceDataCollectionStarted) {
      return;
    }
    this.deviceDataCollectionStarted = true;

    const instance = await this.instance.get();
    if (!instance) {
      return;
    }

    const collector = await this.paymentClients.dataCollector.get();
    const dataCollector = await collector.create({
      client: instance,
      kount: false,
      paypal: true,
    });
    this.deviceData = dataCollector.deviceData;
  }

  private authorizationToken: string;

  private endpointManager: BraintreeEndpointManagerInterface;

  private paymentClients: PaymentClientsInterface;

  constructor(options: {
    authorizationToken: string;
    paymentClients: PaymentClientsInterface;
    endpointManager: BraintreeEndpointManagerInterface;
    hostedFieldConfig: HostedFieldConfiguration;
    hostingEnvironment: HostingEnvironment;
    venmoProfileId?: string;
    googlePayMerchantId?: string;
    referrer?: string;
    loggedInUser?: string;
    origin?: string;
  }) {
    this.authorizationToken = options.authorizationToken;
    this.endpointManager = options.endpointManager;
    this.paymentClients = options.paymentClients;

    this.referrer = options.referrer;
    this.loggedInUser = options.loggedInUser;
    this.origin = options.origin;

    this.paymentProviders = new PaymentProviders({
      braintreeManager: this,
      paymentClients: this.paymentClients,
      venmoProfileId: options.venmoProfileId,
      googlePayMerchantId: options.googlePayMerchantId,
      hostingEnvironment: options.hostingEnvironment,
      hostedFieldConfig: options.hostedFieldConfig,
    });

    this.paymentProviders.on('hostedFieldsRetry', (retryNumber: number) => {
      this.emitter.emit('paymentProvidersHostedFieldsRetry', retryNumber);
    });

    this.paymentProviders.on('hostedFieldsFailed', (error: unknown) => {
      this.emitter.emit('paymentProvidersHostedFieldsFailed', error);
    });
  }

  setReferrer(referrer: string): void {
    this.referrer = referrer;
  }

  setLoggedInUser(loggedInUser: string): void {
    this.loggedInUser = loggedInUser;
  }

  setOrigin(origin: string): void {
    this.origin = origin;
  }
}
