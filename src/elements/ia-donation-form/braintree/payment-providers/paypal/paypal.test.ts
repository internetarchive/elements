import type * as paypal from 'paypal-checkout-components';
import { afterEach, describe, expect, test } from 'vitest';

import { HostingEnvironment } from '../../hosting-environment';
import {
  MockPayPalClient,
  MockPaypalLibrary,
} from '../../test-helpers/mock-clients.test-helpers';
import { MockBraintreeManager } from '../../test-helpers/mock-managers.test-helpers';
import {
  fiveDollars,
  setGlobal,
} from '../../test-helpers/mock-models.test-helpers';
import { PayPalHandler } from './paypal';

const style: paypal.ButtonStyle = {
  color: 'blue' as paypal.ButtonColorOption,
  label: 'paypal' as paypal.ButtonLabelOption,
  shape: 'rect' as paypal.ButtonShapeOption,
  size: 'medium' as paypal.ButtonSizeOption,
  tagline: false,
};

describe('PayPalHandler', () => {
  afterEach(() => {
    setGlobal('paypal', undefined);
  });

  test('renders the PayPal button and returns its data source', async () => {
    const library = new MockPaypalLibrary();
    // The handler reads the funding sources off the loaded library
    setGlobal('paypal', library);
    const handler = new PayPalHandler({
      braintreeManager: new MockBraintreeManager(),
      paypalClient: new MockPayPalClient().module,
      paypalButton: library.buttonRenderer,
      hostingEnvironment: HostingEnvironment.Development,
    });

    const dataSource = await handler.renderPayPalButton({
      selector: '#paypal-button',
      style,
      donationInfo: fiveDollars(),
    });

    expect(dataSource?.donationInfo.amount).to.equal(5);
    expect(library.renderCalls).to.have.length(1);
    expect(library.renderCalls[0].selector).to.equal('#paypal-button');
    const options = library.renderCalls[0].options as {
      env: string;
      style: paypal.ButtonStyle;
      funding: { disallowed: string[] };
    };
    expect(options.env).to.equal('sandbox');
    expect(options.style).to.equal(style);
    expect(options.funding.disallowed).to.deep.equal(['venmo']);
  });

  test('uses the production PayPal environment in production', async () => {
    const library = new MockPaypalLibrary();
    setGlobal('paypal', library);
    const handler = new PayPalHandler({
      braintreeManager: new MockBraintreeManager(),
      paypalClient: new MockPayPalClient().module,
      paypalButton: library.buttonRenderer,
      hostingEnvironment: HostingEnvironment.Production,
    });

    await handler.renderPayPalButton({
      selector: '#paypal-button',
      style,
      donationInfo: fiveDollars(),
    });

    expect((library.renderCalls[0].options as { env: string }).env).to.equal(
      'production',
    );
  });
});
