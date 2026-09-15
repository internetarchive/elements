import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { oneEvent } from '../test-helpers/dom.test-helpers';
import {
  UpsellModalCTAMode,
  type IADonationUpsellModalContent,
} from './ia-donation-upsell-modal-content';
import './ia-donation-upsell-modal-content';

function amountInput(el: IADonationUpsellModalContent): HTMLInputElement {
  return el.shadowRoot!.querySelector('#amount-input')!;
}

function typeAmount(el: IADonationUpsellModalContent, value: string): void {
  const input = amountInput(el);
  input.value = value;
  input.dispatchEvent(new Event('input'));
}

function errorText(el: IADonationUpsellModalContent): string {
  return el
    .shadowRoot!.querySelector('.error')!
    .textContent!.replace(/\s+/g, ' ')
    .trim();
}

describe('IADonationUpsellModalContent', () => {
  describe('buttons', () => {
    test('shows a continue button', async () => {
      const el = await fixture<IADonationUpsellModalContent>(
        html`<ia-donation-upsell-modal-content></ia-donation-upsell-modal-content>`,
      );

      expect(el.shadowRoot!.querySelector('#no-button')).to.exist;
    });

    test('shows the yes button in YesButton mode', async () => {
      const el = await fixture<IADonationUpsellModalContent>(
        html`<ia-donation-upsell-modal-content
          .yesButtonMode=${UpsellModalCTAMode.YesButton}
        ></ia-donation-upsell-modal-content>`,
      );

      expect(el.shadowRoot!.querySelector('#yes-button')).to.exist;
      expect(el.shadowRoot!.querySelector('.paypal-upsell-slot-container')).to
        .be.null;
    });

    test('shows the PayPal slot in PayPalUpsellSlot mode', async () => {
      const el = await fixture<IADonationUpsellModalContent>(
        html`<ia-donation-upsell-modal-content
          .yesButtonMode=${UpsellModalCTAMode.PayPalUpsellSlot}
        ></ia-donation-upsell-modal-content>`,
      );

      expect(el.shadowRoot!.querySelector('.paypal-upsell-slot-container')).to
        .exist;
      expect(el.shadowRoot!.querySelector('#yes-button')).to.be.null;
    });
  });

  describe('events', () => {
    test('emits yesSelected with the amount', async () => {
      const el = await fixture<IADonationUpsellModalContent>(
        html`<ia-donation-upsell-modal-content
          .amount=${7.5}
          .yesButtonMode=${UpsellModalCTAMode.YesButton}
        ></ia-donation-upsell-modal-content>`,
      );

      const selected = oneEvent(el, 'yesSelected');
      el.shadowRoot!.querySelector<HTMLButtonElement>('#yes-button')!.click();
      expect((await selected).detail.amount).to.equal(7.5);
    });

    test('emits noThanksSelected on continue', async () => {
      const el = await fixture<IADonationUpsellModalContent>(
        html`<ia-donation-upsell-modal-content></ia-donation-upsell-modal-content>`,
      );

      const selected = oneEvent(el, 'noThanksSelected');
      el.shadowRoot!.querySelector<HTMLButtonElement>('#no-button')!.click();
      expect(await selected).to.exist;
    });
  });

  describe('amount', () => {
    test('emits amountChanged with a valid amount', async () => {
      const el = await fixture<IADonationUpsellModalContent>(
        html`<ia-donation-upsell-modal-content></ia-donation-upsell-modal-content>`,
      );

      const changed = oneEvent(el, 'amountChanged');
      typeAmount(el, '3.50');
      expect((await changed).detail.amount).to.equal(3.5);
      expect(el.amount).to.equal(3.5);
    });

    test('does nothing for an empty field', async () => {
      const el = await fixture<IADonationUpsellModalContent>(
        html`<ia-donation-upsell-modal-content></ia-donation-upsell-modal-content>`,
      );

      typeAmount(el, '');
      await el.updateComplete;
      expect(el.error).to.be.undefined;
      expect(el.amount).to.equal(5);
    });

    test('shows an error for a non-number', async () => {
      const el = await fixture<IADonationUpsellModalContent>(
        html`<ia-donation-upsell-modal-content></ia-donation-upsell-modal-content>`,
      );

      typeAmount(el, 'a');
      await el.updateComplete;
      expect(errorText(el)).to.equal('Please enter a valid amount.');
    });

    test('shows an error and disables yes for an amount under $1', async () => {
      const el = await fixture<IADonationUpsellModalContent>(
        html`<ia-donation-upsell-modal-content></ia-donation-upsell-modal-content>`,
      );

      typeAmount(el, '0.99');
      await el.updateComplete;
      expect(errorText(el)).to.equal('The minimum donation amount is $1.');
      expect(
        el.shadowRoot!.querySelector<HTMLButtonElement>('#yes-button')!
          .disabled,
      ).to.be.true;
    });

    test('shows an error for $10,000 or more', async () => {
      const el = await fixture<IADonationUpsellModalContent>(
        html`<ia-donation-upsell-modal-content></ia-donation-upsell-modal-content>`,
      );

      typeAmount(el, '10000');
      await el.updateComplete;
      expect(errorText(el)).to.include('To make a donation of $10,000 or more');
    });

    test('covers the PayPal button while there is an error', async () => {
      const el = await fixture<IADonationUpsellModalContent>(
        html`<ia-donation-upsell-modal-content
          .yesButtonMode=${UpsellModalCTAMode.PayPalUpsellSlot}
        ></ia-donation-upsell-modal-content>`,
      );
      const blocker = el.shadowRoot!.querySelector<HTMLDivElement>(
        '.paypal-upsell-slot-blocker',
      )!;
      expect(blocker.classList.contains('hidden')).to.be.true;

      typeAmount(el, '0.5');
      await el.updateComplete;
      expect(blocker.classList.contains('hidden')).to.be.false;

      typeAmount(el, '5');
      await el.updateComplete;
      expect(blocker.classList.contains('hidden')).to.be.true;
    });
  });
});
