import type * as braintree from 'braintree-web';
import type * as paypal from 'paypal-checkout-components';

/**
 * The payment libraries are loaded from their CDNs at runtime and attach
 * themselves to `window`. These give those globals the shapes from their
 * `@types` packages. `grecaptcha` and `google.payments` are already declared
 * globally by theirs.
 */
declare global {
  interface Window {
    braintree: typeof braintree;
    paypal: typeof paypal;
  }
}

export {};
