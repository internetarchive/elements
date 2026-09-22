import type * as braintree from 'braintree-web';
import type { PromisedSingleton } from '@internetarchive/promised-singleton';

export interface GooglePayHandlerInterface {
  paymentsClient: google.payments.api.PaymentsClient;
  instance: PromisedSingleton<braintree.GooglePayment>;

  isBrowserSupported(): Promise<boolean>;
}
