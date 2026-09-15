import type * as braintree from 'braintree-web';
import type * as paypal from 'paypal-checkout-components';
import { createNanoEvents, type Emitter, type Unsubscribe } from 'nanoevents';

import type {
  PayPalButtonDataSourceDelegate,
  PayPalButtonDataSourceInterface,
} from '../braintree/payment-providers/paypal/paypal-button-datasource';
import type { ApplePayFlowHandlerInterface } from '../flow-handlers/handlers/apple-pay-flow-handler';
import type {
  CreditCardFlowHandlerEvents,
  CreditCardFlowHandlerInterface,
} from '../flow-handlers/handlers/credit-card-flow-handler';
import type {
  GooglePayFlowHandlerEvents,
  GooglePayFlowHandlerInterface,
} from '../flow-handlers/handlers/google-pay-flow-handler';
import type {
  PayPalFlowHandlerEvents,
  PayPalFlowHandlerInterface,
} from '../flow-handlers/handlers/paypal-flow-handler';
import type { VenmoFlowHandlerInterface } from '../flow-handlers/handlers/venmo-flow-handler';
import type { PaymentFlowHandlersInterface } from '../flow-handlers/payment-flow-handlers';
import { DonationPaymentInfo } from '../models/donation-payment-info';
import { DonationType } from '../models/donation-type';
import type { DonorContactInfo } from '../models/donor-contact-info';

/** A PayPal button data source that reports back on demand. */
export class MockPayPalButtonDataSource
  implements PayPalButtonDataSourceInterface
{
  delegate?: PayPalButtonDataSourceDelegate;

  donationInfo: DonationPaymentInfo = new DonationPaymentInfo({
    donationType: DonationType.OneTime,
    amount: 5,
    coverFees: false,
  });

  async payment(): Promise<string> {
    this.delegate?.payPalPaymentStarted(this, {});
    return 'foo';
  }

  async onAuthorize(): Promise<paypal.TokenizePayload | undefined> {
    this.delegate?.payPalPaymentAuthorized(this, {
      nonce: 'foo',
      type: 'bar',
      details: {
        email: 'foo@bar.com',
        payerId: '1234',
        firstName: 'Joe',
        lastName: 'Boop',
      },
    } as unknown as paypal.TokenizePayload);
    return undefined;
  }

  onCancel(data: paypal.CancellationData): void {
    this.delegate?.payPalPaymentCancelled(this, data);
  }

  onError(error: string): void {
    this.delegate?.payPalPaymentError(this, error);
  }
}

export class MockCreditCardFlowHandler
  implements CreditCardFlowHandlerInterface
{
  startupCalled = false;
  paymentInitiatedDonationInfo?: DonationPaymentInfo;
  paymentInitiatedDonorContactInfo?: DonorContactInfo;
  hostedFieldsResponse?: braintree.HostedFieldsTokenizePayload;

  private emitter: Emitter<CreditCardFlowHandlerEvents> =
    createNanoEvents<CreditCardFlowHandlerEvents>();

  emitValidHostedFieldsEvent(): void {
    this.emitter.emit('validityChanged', true);
  }

  async startup(): Promise<void> {
    this.startupCalled = true;
  }

  async tokenizeFields(): Promise<
    braintree.HostedFieldsTokenizePayload | undefined
  > {
    return undefined;
  }

  async paymentInitiated(
    hostedFieldsResponse: braintree.HostedFieldsTokenizePayload,
    donationInfo: DonationPaymentInfo,
    donorContactInfo: DonorContactInfo,
  ): Promise<void> {
    this.hostedFieldsResponse = hostedFieldsResponse;
    this.paymentInitiatedDonationInfo = donationInfo;
    this.paymentInitiatedDonorContactInfo = donorContactInfo;
  }

  on<E extends keyof CreditCardFlowHandlerEvents>(
    event: E,
    callback: CreditCardFlowHandlerEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }
}

export class MockPayPalFlowHandler implements PayPalFlowHandlerInterface {
  private emitter: Emitter<PayPalFlowHandlerEvents> =
    createNanoEvents<PayPalFlowHandlerEvents>();

  donationInfo?: DonationPaymentInfo;
  upsellDonationInfo?: DonationPaymentInfo;
  renderPayPalCalledDonationInfo?: DonationPaymentInfo;

  emitPaymentStartedEvent(): void {
    this.emitter.emit(
      'payPalPaymentStarted',
      new MockPayPalButtonDataSource(),
      {},
    );
  }

  emitPaymentCancelledEvent(): void {
    this.emitter.emit(
      'payPalPaymentCancelled',
      new MockPayPalButtonDataSource(),
      {},
    );
  }

  emitPaymentErrorEvent(): void {
    this.emitter.emit(
      'payPalPaymentError',
      new MockPayPalButtonDataSource(),
      'foo-error',
    );
  }

  on<E extends keyof PayPalFlowHandlerEvents>(
    event: E,
    callback: PayPalFlowHandlerEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }

  updateDonationInfo(donationInfo: DonationPaymentInfo): void {
    this.donationInfo = donationInfo;
  }

  updateUpsellDonationInfo(donationInfo: DonationPaymentInfo): void {
    this.upsellDonationInfo = donationInfo;
  }

  async renderPayPalButton(donationInfo: DonationPaymentInfo): Promise<void> {
    this.renderPayPalCalledDonationInfo = donationInfo;
  }
}

export class MockApplePayFlowHandler implements ApplePayFlowHandlerInterface {
  paymentInitiatedDonationInfo?: DonationPaymentInfo;
  paymentInitiatedEvent?: Event;

  async paymentInitiated(
    donationInfo: DonationPaymentInfo,
    e: Event,
  ): Promise<void> {
    this.paymentInitiatedDonationInfo = donationInfo;
    this.paymentInitiatedEvent = e;
  }
}

export class MockGooglePayFlowHandler implements GooglePayFlowHandlerInterface {
  private emitter: Emitter<GooglePayFlowHandlerEvents> =
    createNanoEvents<GooglePayFlowHandlerEvents>();

  paymentInitiatedDonationInfo?: DonationPaymentInfo;

  emitPaymentCancelledEvent(): void {
    this.emitter.emit('paymentCancelled');
  }

  on<E extends keyof GooglePayFlowHandlerEvents>(
    event: E,
    callback: GooglePayFlowHandlerEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }

  async paymentInitiated(donationInfo: DonationPaymentInfo): Promise<void> {
    this.paymentInitiatedDonationInfo = donationInfo;
  }
}

export class MockVenmoFlowHandler implements VenmoFlowHandlerInterface {
  startupCalled = false;
  paymentInitiatedDonationInfo?: DonationPaymentInfo;
  paymentInitiatedDonorInfo?: DonorContactInfo;

  async startup(): Promise<void> {
    this.startupCalled = true;
  }

  async paymentInitiated(
    contactInfo: DonorContactInfo,
    donationInfo: DonationPaymentInfo,
  ): Promise<void> {
    this.paymentInitiatedDonationInfo = donationInfo;
    this.paymentInitiatedDonorInfo = contactInfo;
  }
}

export class MockPaymentFlowHandlers implements PaymentFlowHandlersInterface {
  startupCalled = false;

  showUpsellModalOptions?: object;
  showConfirmationStepModalOptions?: object;

  creditCardHandler = new MockCreditCardFlowHandler();
  paypalHandler = new MockPayPalFlowHandler();
  applePayHandler = new MockApplePayFlowHandler();
  venmoHandler = new MockVenmoFlowHandler();
  googlePayHandler = new MockGooglePayFlowHandler();

  async showUpsellModal(options: object): Promise<void> {
    this.showUpsellModalOptions = options;
  }

  async showConfirmationStepModal(options: object): Promise<void> {
    this.showConfirmationStepModalOptions = options;
  }

  async startup(): Promise<void> {
    this.startupCalled = true;
    this.venmoHandler.startup();
  }
}
