import { elementUpdated, fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { DonationPaymentInfo } from '../models/donation-payment-info';
import { DonationType } from '../models/donation-type';
import {
  DonationSectionBadgeMode,
  type IADonationSection,
} from './ia-donation-section';
import {
  EditDonationInfoStatus,
  EditDonationStepNumberMode,
  type IADonationEditDonation,
} from './ia-donation-edit-donation';
import './ia-donation-edit-donation';

/** A $5 one-time gift, not covering fees. */
function fiveDollars(): DonationPaymentInfo {
  return new DonationPaymentInfo({
    donationType: DonationType.OneTime,
    amount: 5,
    coverFees: false,
  });
}

/** Resolves with the next event of that name, so an action can be awaited. */
function oneEvent(el: Element, name: string): Promise<CustomEvent> {
  return new Promise((resolve) => {
    el.addEventListener(name, (e) => resolve(e as CustomEvent), {
      once: true,
    });
  });
}

function customInput(el: IADonationEditDonation): HTMLInputElement {
  return el.shadowRoot!.querySelector('#custom-amount-input')!;
}

function customRadio(el: IADonationEditDonation): HTMLInputElement {
  return el.shadowRoot!.querySelector('#custom-amount-button')!;
}

function presetRadio(
  el: IADonationEditDonation,
  amount: number | string,
): HTMLInputElement {
  return el.shadowRoot!.querySelector(
    `.amount-selector input[type=radio][value="${amount}"]`,
  )!;
}

function typeCustomAmount(el: IADonationEditDonation, value: string): void {
  const input = customInput(el);
  input.value = value;
  input.dispatchEvent(new Event('input'));
}

describe('IADonationEditDonation', () => {
  test('emits donationInfoChanged when a preset amount is selected', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
      ></ia-donation-edit-donation>
    `);

    const changed = oneEvent(el, 'donationInfoChanged');
    el.shadowRoot!.querySelector<HTMLInputElement>(
      '#amount-10-option',
    )!.click();
    const { donationInfo } = (await changed).detail;

    expect(donationInfo.amount).to.equal(10);
    expect(el.donationInfo.amount).to.equal(10);
  });

  test('emits donationInfoChanged when a frequency is selected', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
      ></ia-donation-edit-donation>
    `);

    const changed = oneEvent(el, 'donationInfoChanged');
    el.shadowRoot!.querySelector<HTMLInputElement>(
      '#donationType-monthly-option',
    )!.click();
    const { donationInfo } = (await changed).detail;

    expect(donationInfo.amount).to.equal(5);
    expect(donationInfo.donationType).to.equal(DonationType.Monthly);
  });

  test('focuses the custom amount input when its radio is selected', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
      ></ia-donation-edit-donation>
    `);

    customRadio(el).click();
    await elementUpdated(el);

    expect(el.shadowRoot!.activeElement).to.equal(customInput(el));
  });

  test('checks the custom radio when the custom amount is focused', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
      ></ia-donation-edit-donation>
    `);

    expect(customRadio(el).checked).to.be.false;
    customInput(el).dispatchEvent(new FocusEvent('focus'));
    await elementUpdated(el);
    expect(customRadio(el).checked).to.be.true;
  });

  test('displays trailing zeros in the custom amount', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${new DonationPaymentInfo({
          amount: 2.4,
          donationType: DonationType.OneTime,
          coverFees: false,
        })}
        .amountOptions=${[2, 4, 6, 8]}
      ></ia-donation-edit-donation>
    `);

    expect(customInput(el).value).to.equal('2.40');
  });

  test('re-formats the custom amount with trailing zeros on blur', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${new DonationPaymentInfo({
          amount: 2.4,
          donationType: DonationType.OneTime,
          coverFees: false,
        })}
        .amountOptions=${[2, 4, 6, 8]}
      ></ia-donation-edit-donation>
    `);

    customInput(el).value = '2.4';
    customInput(el).dispatchEvent(new FocusEvent('blur'));
    await elementUpdated(el);
    expect(customInput(el).value).to.equal('2.40');
  });

  test('emits donationInfoChanged when cover fees is checked and unchecked', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
      ></ia-donation-edit-donation>
    `);
    const checkbox =
      el.shadowRoot!.querySelector<HTMLInputElement>('#cover-fees')!;

    let changed = oneEvent(el, 'donationInfoChanged');
    checkbox.click();
    let { donationInfo } = (await changed).detail;
    expect(donationInfo.amount).to.equal(5);
    expect(donationInfo.coverFees).to.be.true;

    changed = oneEvent(el, 'donationInfoChanged');
    checkbox.click();
    ({ donationInfo } = (await changed).detail);
    expect(donationInfo.coverFees).to.be.false;
  });

  test('tells the donor how much the fee is', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
      ></ia-donation-edit-donation>
    `);

    const label = el.shadowRoot!.querySelector('label[for="cover-fees"]')!;
    expect(label.textContent?.trim()).to.equal(
      "I'll generously add $0.40 to cover fees.",
    );
  });

  test('selects the custom radio when the custom amount changes', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
      ></ia-donation-edit-donation>
    `);

    expect(customRadio(el).checked).to.be.false;
    typeCustomAmount(el, '3.50');
    await elementUpdated(el);
    expect(customRadio(el).checked).to.be.true;
    expect(el.donationInfo.amount).to.equal(3.5);
  });

  test.each([
    ['0.50', EditDonationInfoStatus.DonationTooLow],
    ['10000', EditDonationInfoStatus.DonationTooHigh],
    ['', EditDonationInfoStatus.InvalidDonationAmount],
  ])(
    'emits editDonationError for a custom amount of "%s"',
    async (value, status) => {
      const el = await fixture<IADonationEditDonation>(html`
        <ia-donation-edit-donation
          .donationInfo=${fiveDollars()}
        ></ia-donation-edit-donation>
      `);

      const errored = oneEvent(el, 'editDonationError');
      typeCustomAmount(el, value);
      const { error } = (await errored).detail;
      expect(error).to.equal(status);
    },
  );

  test('does not update donationInfo when the amount is out of range', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
      ></ia-donation-edit-donation>
    `);

    typeCustomAmount(el, '0.50');
    await el.updateComplete;
    expect(el.donationInfo.amount).to.equal(5);
  });

  test('displays an error message for an amount that is too high', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
      ></ia-donation-edit-donation>
    `);
    const errors = el.shadowRoot!.querySelector<HTMLDivElement>('.errors')!;
    expect(errors.textContent?.trim()).to.equal('');

    const errored = oneEvent(el, 'editDonationError');
    typeCustomAmount(el, '10000');
    await errored;
    await elementUpdated(el);

    expect(errors.textContent).to.include('$10,000 or more');
    expect(errors.querySelector('a')?.getAttribute('href')).to.equal(
      'mailto:donations@archive.org',
    );
  });

  test('clears the error once a preset is picked', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
      ></ia-donation-edit-donation>
    `);
    const errors = el.shadowRoot!.querySelector<HTMLDivElement>('.errors')!;

    typeCustomAmount(el, '0.50');
    await elementUpdated(el);
    expect(errors.textContent?.trim()).to.not.equal('');

    presetRadio(el, 25).click();
    await elementUpdated(el);
    expect(errors.textContent?.trim()).to.equal('');
    expect(customInput(el).value).to.equal('');
  });

  test('can hide the step numbers', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
        .stepNumberMode=${EditDonationStepNumberMode.HideNumbers}
      ></ia-donation-edit-donation>
    `);

    const sections = el.shadowRoot!.querySelectorAll<IADonationSection>(
      'ia-donation-section',
    );
    expect(sections.length).to.equal(2);
    sections.forEach((section) => {
      expect(section.badgeMode).to.equal(DonationSectionBadgeMode.HideBadge);
    });
  });

  test('numbers the amount step 2 after the frequency buttons and 1 without them', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
      ></ia-donation-edit-donation>
    `);
    const sections = (): IADonationSection[] =>
      Array.from(
        el.shadowRoot!.querySelectorAll<IADonationSection>(
          'ia-donation-section',
        ),
      );

    expect(sections().map((s) => s.sectionBadge)).to.deep.equal(['1', '2']);

    el.frequencySelectionMode = 'checkbox';
    await elementUpdated(el);
    expect(sections().map((s) => s.sectionBadge)).to.deep.equal(['1']);
    expect(el.shadowRoot!.querySelector('#make-this-monthly')).to.exist;

    el.frequencySelectionMode = 'hide';
    await elementUpdated(el);
    expect(sections().map((s) => s.sectionBadge)).to.deep.equal(['1']);
    expect(el.shadowRoot!.querySelector('#make-this-monthly')).to.be.null;
  });

  test('the monthly checkbox switches the donation type', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
        frequencySelectionMode="checkbox"
      ></ia-donation-edit-donation>
    `);
    const checkbox =
      el.shadowRoot!.querySelector<HTMLInputElement>('#make-this-monthly')!;

    const changed = oneEvent(el, 'donationInfoChanged');
    checkbox.click();
    const { donationInfo } = (await changed).detail;
    expect(donationInfo.donationType).to.equal(DonationType.Monthly);
  });

  test('still selects a preset set programmatically when the custom amount is hidden', async () => {
    // A non-preset starting amount with no custom field to hold it
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${new DonationPaymentInfo({
          amount: 10,
          donationType: DonationType.OneTime,
          coverFees: false,
        })}
        .amountOptions=${[5, 20, 50]}
        customAmountMode="hide"
      ></ia-donation-edit-donation>
    `);
    await elementUpdated(el);

    el.donationInfo = new DonationPaymentInfo({
      amount: 20,
      donationType: DonationType.OneTime,
      coverFees: false,
    });
    await elementUpdated(el);
    await elementUpdated(el);

    expect(presetRadio(el, 20).checked).to.be.true;
  });

  test('can hide the custom amount and cover fees', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
        customAmountMode="hide"
        coverFeesCheckboxMode="hide"
      ></ia-donation-edit-donation>
    `);

    expect(el.shadowRoot!.querySelector('#custom-amount-input')).to.be.null;
    expect(el.shadowRoot!.querySelector('#cover-fees')).to.be.null;
  });

  test('can replace the amount headline with slotted content', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
        amountTitleDisplayMode="slot"
      >
        <p slot="edit-donation-amount-title">Can you chip in?</p>
      </ia-donation-edit-donation>
    `);

    const amountSection = el.shadowRoot!.querySelectorAll<IADonationSection>(
      'ia-donation-section',
    )[1];
    expect(amountSection.headline).to.equal('');
    const slot = el.shadowRoot!.querySelector<HTMLSlotElement>(
      'slot[name="edit-donation-amount-title"]',
    )!;
    expect(slot.assignedElements()[0].textContent).to.equal('Can you chip in?');
  });

  test('uses defaultSelectedAmount if provided', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .donationInfo=${fiveDollars()}
        defaultSelectedAmount="8.34"
      ></ia-donation-edit-donation>
    `);

    expect(el.donationInfo.amount).to.equal(8.34);
  });

  test('selects the matching preset when defaultSelectedAmount is one of the amountOptions', async () => {
    const el = await fixture<IADonationEditDonation>(html`
      <ia-donation-edit-donation
        .amountOptions=${[2.5, 3.7, 5.45, 20]}
        defaultSelectedAmount="5.45"
      ></ia-donation-edit-donation>
    `);

    expect(presetRadio(el, '5.45').checked).to.be.true;
    expect(customInput(el).value).to.equal('');
  });

  describe('programmatic donationInfo updates', () => {
    test('checks the matching preset when donationInfo is set while custom is selected', async () => {
      // Boot with a non-preset amount so the custom amount is selected
      const el = await fixture<IADonationEditDonation>(html`
        <ia-donation-edit-donation
          defaultSelectedAmount="14"
        ></ia-donation-edit-donation>
      `);
      // Let the defaultSelectedAmount -> donationInfo -> customAmountSelected
      // cascade settle
      await elementUpdated(el);
      await elementUpdated(el);

      expect(customRadio(el).checked).to.be.true;
      expect(customInput(el).value).to.equal('14.00');

      el.donationInfo = new DonationPaymentInfo({
        amount: 50,
        donationType: DonationType.OneTime,
        coverFees: false,
      });
      await elementUpdated(el);
      await elementUpdated(el);

      expect(presetRadio(el, 50).checked).to.be.true;
      expect(customRadio(el).checked).to.be.false;
      expect(customInput(el).value).to.equal('');
    });

    test('selects the custom amount when donationInfo is set to a non-preset amount', async () => {
      const el = await fixture<IADonationEditDonation>(html`
        <ia-donation-edit-donation
          .donationInfo=${fiveDollars()}
        ></ia-donation-edit-donation>
      `);
      expect(customRadio(el).checked).to.be.false;

      el.donationInfo = new DonationPaymentInfo({
        amount: 37,
        donationType: DonationType.OneTime,
        coverFees: false,
      });
      await elementUpdated(el);
      await elementUpdated(el);

      expect(customRadio(el).checked).to.be.true;
      expect(customInput(el).value).to.equal('37.00');
      expect(presetRadio(el, 5).checked).to.be.false;
    });

    test('selects the matching preset on blur when the typed custom amount equals a preset', async () => {
      const el = await fixture<IADonationEditDonation>(html`
        <ia-donation-edit-donation
          .donationInfo=${fiveDollars()}
        ></ia-donation-edit-donation>
      `);

      // Type a preset-equal amount; custom stays selected while focused
      customInput(el).focus();
      typeCustomAmount(el, '10');
      await elementUpdated(el);
      await elementUpdated(el);
      expect(customRadio(el).checked).to.be.true;

      // Once focus leaves, the selection moves to the matching preset
      customInput(el).blur();
      await elementUpdated(el);
      await elementUpdated(el);

      expect(presetRadio(el, 10).checked).to.be.true;
      expect(customRadio(el).checked).to.be.false;
      expect(customInput(el).value).to.equal('');
    });

    test('keeps the custom amount selected while typing a preset-equal value', async () => {
      const el = await fixture<IADonationEditDonation>(html`
        <ia-donation-edit-donation
          .donationInfo=${fiveDollars()}
        ></ia-donation-edit-donation>
      `);

      // 5 is a preset, but the selection must not jump to it mid-keystroke
      customInput(el).focus();
      typeCustomAmount(el, '5');
      await elementUpdated(el);
      await elementUpdated(el);

      expect(customRadio(el).checked).to.be.true;
      expect(customInput(el).value).to.equal('5');
      expect(presetRadio(el, 5).checked).to.be.false;
    });
  });

  describe('configurable dollar amounts', () => {
    test('renders the given amounts, whole dollars without cents', async () => {
      const el = await fixture<IADonationEditDonation>(html`
        <ia-donation-edit-donation
          .donationInfo=${fiveDollars()}
          .amountOptions=${[2.5, 3.7, 5.45, 20]}
        ></ia-donation-edit-donation>
      `);

      const amounts = Array.from(
        el.shadowRoot!.querySelectorAll('.amount-selector li'),
      ).map((li) => li.textContent?.replace(/\s+/g, ' ').trim());
      // 4 amounts plus the custom field
      expect(amounts.length).to.equal(5);
      expect(amounts.slice(0, 4)).to.deep.equal([
        '$2.50',
        '$3.70',
        '$5.45',
        '$20',
      ]);
    });

    test('lays the grid out by the number of amounts', async () => {
      const el = await fixture<IADonationEditDonation>(html`
        <ia-donation-edit-donation
          .donationInfo=${fiveDollars()}
        ></ia-donation-edit-donation>
      `);

      const layouts = [
        { count: 3, columns: 2, customColSpan: 1 },
        { count: 4, columns: 3, customColSpan: 2 },
        { count: 5, columns: 4, customColSpan: 3 },
        { count: 6, columns: 4, customColSpan: 2 },
        { count: 7, columns: 5, customColSpan: 3 },
      ];

      for (const layout of layouts) {
        el.amountOptions = Array.from(Array(layout.count).keys());
        await el.updateComplete;
        expect(
          el.style.getPropertyValue('--ia-donation-edit-amount-column-count'),
        ).to.equal(`${layout.columns}`);
        expect(
          el.style.getPropertyValue(
            '--ia-donation-edit-custom-amount-col-span',
          ),
        ).to.equal(`${layout.customColSpan}`);
      }
    });

    test('puts every amount on one line in the single-line layout', async () => {
      const el = await fixture<IADonationEditDonation>(html`
        <ia-donation-edit-donation
          .donationInfo=${fiveDollars()}
          .amountOptions=${[5, 10, 25, 50]}
          amountSelectionLayout="single-line"
        ></ia-donation-edit-donation>
      `);

      expect(
        el.style.getPropertyValue('--ia-donation-edit-amount-column-count'),
      ).to.equal('7');
      expect(
        el.style.getPropertyValue('--ia-donation-edit-custom-amount-col-span'),
      ).to.equal('3');
    });

    test('uses a four-across grid for four amounts with nothing else showing', async () => {
      const el = await fixture<IADonationEditDonation>(html`
        <ia-donation-edit-donation
          .donationInfo=${fiveDollars()}
          .amountOptions=${[5, 10, 25, 50]}
          customAmountMode="hide"
          coverFeesCheckboxMode="hide"
          frequencySelectionMode="hide"
        ></ia-donation-edit-donation>
      `);

      expect(
        el.style.getPropertyValue('--ia-donation-edit-amount-column-count'),
      ).to.equal('4');
      expect(
        el.style.getPropertyValue('--ia-donation-edit-custom-amount-col-span'),
      ).to.equal('0');
    });
  });
});
