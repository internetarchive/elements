import { afterEach, describe, expect, test } from 'vitest';

import {
  MockApplePaySession,
  mockApplePayPaymentRequest,
} from '../../test-helpers/mock-apple-pay.test-helpers';
import { setGlobal } from '../../test-helpers/mock-models.test-helpers';
import { ApplePaySessionManager } from './apple-pay-session-manager';

describe('ApplePaySessionManager', () => {
  afterEach(() => {
    setGlobal('ApplePaySession', undefined);
  });

  test('can make payments when the browser has ApplePaySession', () => {
    setGlobal('ApplePaySession', MockApplePaySession);
    expect(new ApplePaySessionManager().canMakePayments()).to.be.true;
  });

  test('cannot make payments without ApplePaySession', () => {
    expect(new ApplePaySessionManager().canMakePayments()).to.be.false;
  });

  test('creates a version 3 session for the payment request', () => {
    setGlobal('ApplePaySession', MockApplePaySession);

    const session = new ApplePaySessionManager().createNewPaymentSession(
      mockApplePayPaymentRequest,
    ) as unknown as MockApplePaySession;

    expect(session.versionCheck).to.equal(ApplePaySessionManager.VERSION);
    expect(session.paymentRequestCheck).to.deep.equal(
      mockApplePayPaymentRequest,
    );
  });
});
