import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type {
  MockHostedFieldsClient,
  mockHostedFieldsEvent,
} from '../../braintree/test-helpers/mock-clients.test-helpers';
import { MockBraintreeManager } from '../../braintree/test-helpers/mock-managers.test-helpers';
import type { IADonationBadgedInput } from '../../form-elements/ia-donation-badged-input';
import type { RecaptchaManagerInterface } from '../../recaptcha-manager';
import type { DonationFlowModalManagerInterface } from '../donation-flow-modal-manager';
import { CreditCardFlowHandler } from './credit-card-flow-handler';
import '../../form-elements/ia-donation-badged-input';

/** startup() never touches either of these, they only satisfy the constructor. */
const stubModalManager = {} as DonationFlowModalManagerInterface;
const stubRecaptchaManager = {} as RecaptchaManagerInterface;

/** A hosted fields event for the number field, wrapped by a real badged input. */
async function numberFieldEvent(state: {
  isEmpty: boolean;
  isValid: boolean;
}): Promise<{
  event: ReturnType<typeof mockHostedFieldsEvent>;
  badgedInput: IADonationBadgedInput;
}> {
  const badgedInput = await fixture<IADonationBadgedInput>(
    html`<ia-donation-badged-input></ia-donation-badged-input>`,
  );
  const container = document.createElement('div');
  badgedInput.appendChild(container);

  const event = {
    cards: [],
    emittedBy: 'number',
    fields: {
      number: {
        container,
        isFocused: false,
        isEmpty: state.isEmpty,
        isPotentiallyValid: state.isValid,
        isValid: state.isValid,
      },
    },
  } as unknown as ReturnType<typeof mockHostedFieldsEvent>;

  return { event, badgedInput };
}

async function setup(): Promise<{
  flowHandler: CreditCardFlowHandler;
  client: MockHostedFieldsClient;
  hideErrorMessage: { called: boolean };
}> {
  const braintreeManager = new MockBraintreeManager();
  const creditCardHandler =
    await braintreeManager.paymentProviders.creditCardHandler.get();

  const hideErrorMessage = { called: false };
  creditCardHandler.hideErrorMessage = (): void => {
    hideErrorMessage.called = true;
  };

  const flowHandler = new CreditCardFlowHandler({
    braintreeManager,
    donationFlowModalManager: stubModalManager,
    recaptchaManager: stubRecaptchaManager,
  });
  await flowHandler.startup();

  const client = (await creditCardHandler.instance.get()) as unknown as
    | MockHostedFieldsClient
    | undefined;
  return { flowHandler, client: client!, hideErrorMessage };
}

describe('CreditCardFlowHandler hosted field events', () => {
  test('clears a field error and hides the error message on focus', async () => {
    const { client, hideErrorMessage } = await setup();
    const { event, badgedInput } = await numberFieldEvent({
      isEmpty: false,
      isValid: true,
    });
    badgedInput.error = true;

    client.emitEvent('focus', event);

    expect(badgedInput.error).to.be.false;
    expect(hideErrorMessage.called).to.be.true;
  });

  test('does not mark an empty field errored on blur', async () => {
    const { client } = await setup();
    const { event, badgedInput } = await numberFieldEvent({
      isEmpty: true,
      isValid: false,
    });

    client.emitEvent('blur', event);

    expect(badgedInput.error).to.be.false;
  });

  test('marks a non-empty invalid field errored on blur', async () => {
    const { client } = await setup();
    const { event, badgedInput } = await numberFieldEvent({
      isEmpty: false,
      isValid: false,
    });

    client.emitEvent('blur', event);

    expect(badgedInput.error).to.be.true;
  });

  test('does not mark a valid field errored on blur', async () => {
    const { client } = await setup();
    const { event, badgedInput } = await numberFieldEvent({
      isEmpty: false,
      isValid: true,
    });

    client.emitEvent('blur', event);

    expect(badgedInput.error).to.be.false;
  });

  test('emits validityChanged from the combined validity of the three fields', async () => {
    const { flowHandler, client } = await setup();
    const emitted: boolean[] = [];
    flowHandler.on('validityChanged', (isValid) => emitted.push(isValid));

    client.emitValidityChangedEvent(true);
    client.emitValidityChangedEvent(false);

    expect(emitted).to.deep.equal([true, false]);
  });
});
