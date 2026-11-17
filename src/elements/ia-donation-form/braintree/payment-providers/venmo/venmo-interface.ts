import type * as braintree from 'braintree-web';
import type { PromisedSingleton } from '@src/services/promised-singleton/promised-singleton';

export interface VenmoHandlerInterface {
  instance: PromisedSingleton<braintree.Venmo>;

  isBrowserSupported(): Promise<boolean>;
  startPayment(): Promise<braintree.VenmoTokenizePayload>;
}
