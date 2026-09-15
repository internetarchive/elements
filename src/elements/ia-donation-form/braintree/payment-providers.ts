import { PromisedSingleton } from '@internetarchive/promised-singleton';
import { createNanoEvents, type Unsubscribe } from 'nanoevents';

import type { BraintreeManagerInterface } from './braintree-manager-interface';
import { HostingEnvironment } from './hosting-environment';
import type { PaymentClientsInterface } from './payment-clients';
import type {
  PaymentProvidersEvents,
  PaymentProvidersInterface,
} from './payment-providers-interface';
import { ApplePayHandler } from './payment-providers/apple-pay/apple-pay';
import type { ApplePayHandlerInterface } from './payment-providers/apple-pay/apple-pay-interface';
import { ApplePaySessionManager } from './payment-providers/apple-pay/apple-pay-session-manager';
import { CreditCardHandler } from './payment-providers/credit-card/credit-card';
import type { CreditCardHandlerInterface } from './payment-providers/credit-card/credit-card-interface';
import type { HostedFieldConfiguration } from './payment-providers/credit-card/hosted-field-configuration';
import { GooglePayHandler } from './payment-providers/google-pay/google-pay';
import type { GooglePayHandlerInterface } from './payment-providers/google-pay/google-pay-interface';
import { PayPalHandler } from './payment-providers/paypal/paypal';
import type { PayPalHandlerInterface } from './payment-providers/paypal/paypal-interface';
import { VenmoHandler } from './payment-providers/venmo/venmo';
import type { VenmoHandlerInterface } from './payment-providers/venmo/venmo-interface';

/**
 * The IA-specific handlers for each payment provider, each created on first
 * request. They're data-focused rather than UI-focused, though there's some
 * overlap with the flow handlers.
 */
export class PaymentProviders implements PaymentProvidersInterface {
  on<E extends keyof PaymentProvidersEvents>(
    event: E,
    callback: PaymentProvidersEvents[E],
  ): Unsubscribe {
    return this.emitter.on(event, callback);
  }

  creditCardHandler = new PromisedSingleton<CreditCardHandlerInterface>({
    generator: async () => {
      const client = await this.paymentClients.hostedFields.get();
      const handler = new CreditCardHandler({
        braintreeManager: this.braintreeManager,
        hostedFieldClient: client,
        hostedFieldConfig: this.hostedFieldConfig,
      });

      handler.on('hostedFieldsRetry', (retryNumber: number) => {
        this.emitter.emit('hostedFieldsRetry', retryNumber);
      });

      handler.on('hostedFieldsFailed', (error: unknown) => {
        this.emitter.emit('hostedFieldsFailed', error);
      });

      return handler;
    },
  });

  applePayHandler = new PromisedSingleton<ApplePayHandlerInterface>({
    generator: async () => {
      const client = await this.paymentClients.applePay.get();
      return new ApplePayHandler({
        braintreeManager: this.braintreeManager,
        applePayClient: client,
        applePaySessionManager: new ApplePaySessionManager(),
      });
    },
  });

  /** Undefined when no Venmo profile id was configured, so Venmo isn't offered. */
  venmoHandler = new PromisedSingleton<VenmoHandlerInterface | undefined>({
    generator: async () => {
      const client = await this.paymentClients.venmo.get();
      if (!this.venmoProfileId) {
        return undefined;
      }
      return new VenmoHandler({
        braintreeManager: this.braintreeManager,
        venmoClient: client,
        venmoProfileId: this.venmoProfileId,
      });
    },
  });

  paypalHandler = new PromisedSingleton<PayPalHandlerInterface>({
    generator: async () => {
      const [client, paypalLibrary] = await Promise.all([
        this.paymentClients.payPal.get(),
        this.paymentClients.paypalLibrary.get(),
      ]);
      return new PayPalHandler({
        braintreeManager: this.braintreeManager,
        paypalClient: client,
        paypalButton: paypalLibrary.Button,
        hostingEnvironment: this.hostingEnvironment,
      });
    },
  });

  googlePayHandler = new PromisedSingleton<GooglePayHandlerInterface>({
    generator: async () => {
      const [braintreeClient, googlePaymentsClient] = await Promise.all([
        this.paymentClients.googlePayBraintreeClient.get(),
        this.paymentClients.googlePaymentsClient.get(),
      ]);
      return new GooglePayHandler({
        braintreeManager: this.braintreeManager,
        googlePayMerchantId: this.googlePayMerchantId,
        googlePayBraintreeClient: braintreeClient,
        googlePaymentsClient,
      });
    },
  });

  private braintreeManager: BraintreeManagerInterface;

  private venmoProfileId?: string;

  private googlePayMerchantId?: string;

  private hostedFieldConfig: HostedFieldConfiguration;

  private hostingEnvironment: HostingEnvironment =
    HostingEnvironment.Development;

  private paymentClients: PaymentClientsInterface;

  private emitter = createNanoEvents<PaymentProvidersEvents>();

  constructor(options: {
    braintreeManager: BraintreeManagerInterface;
    paymentClients: PaymentClientsInterface;
    venmoProfileId?: string;
    googlePayMerchantId?: string;
    hostingEnvironment: HostingEnvironment;
    hostedFieldConfig: HostedFieldConfiguration;
  }) {
    this.braintreeManager = options.braintreeManager;
    this.venmoProfileId = options.venmoProfileId;
    this.googlePayMerchantId = options.googlePayMerchantId;
    this.paymentClients = options.paymentClients;
    this.hostingEnvironment = options.hostingEnvironment;
    this.hostedFieldConfig = options.hostedFieldConfig;
  }
}
