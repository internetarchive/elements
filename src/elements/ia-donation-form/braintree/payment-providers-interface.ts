import type { PromisedSingleton } from '@internetarchive/promised-singleton';
import type { Unsubscribe } from 'nanoevents';

import type { ApplePayHandlerInterface } from './payment-providers/apple-pay/apple-pay-interface';
import type {
  CreditCardHandlerEvents,
  CreditCardHandlerInterface,
} from './payment-providers/credit-card/credit-card-interface';
import type { GooglePayHandlerInterface } from './payment-providers/google-pay/google-pay-interface';
import type { PayPalHandlerInterface } from './payment-providers/paypal/paypal-interface';
import type { VenmoHandlerInterface } from './payment-providers/venmo/venmo-interface';

/** The child handler events that bubble up through the providers. */
export type PaymentProvidersEvents = CreditCardHandlerEvents;

export interface PaymentProvidersInterface {
  on<E extends keyof PaymentProvidersEvents>(
    event: E,
    callback: PaymentProvidersEvents[E],
  ): Unsubscribe;
  creditCardHandler: PromisedSingleton<CreditCardHandlerInterface>;
  applePayHandler: PromisedSingleton<ApplePayHandlerInterface>;
  venmoHandler: PromisedSingleton<VenmoHandlerInterface | undefined>;
  paypalHandler: PromisedSingleton<PayPalHandlerInterface>;
  googlePayHandler: PromisedSingleton<GooglePayHandlerInterface>;
}
