export interface ApplePaySessionManagerInterface {
  canMakePayments(): boolean;
  createNewPaymentSession(
    paymentRequest: ApplePayJS.ApplePayPaymentRequest,
  ): ApplePaySession;
}

/** A thin wrapper over the browser's `ApplePaySession` so it can be mocked. */
export class ApplePaySessionManager implements ApplePaySessionManagerInterface {
  static VERSION = 3;

  canMakePayments(): boolean {
    return (
      'ApplePaySession' in window &&
      ApplePaySession.supportsVersion(ApplePaySessionManager.VERSION) &&
      ApplePaySession.canMakePayments()
    );
  }

  createNewPaymentSession(
    paymentRequest: ApplePayJS.ApplePayPaymentRequest,
  ): ApplePaySession {
    return new ApplePaySession(ApplePaySessionManager.VERSION, paymentRequest);
  }
}
