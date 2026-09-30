import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { emailIcon } from '../icons';
import {
  SpacerOption,
  type IADonationBadgedInput,
} from './ia-donation-badged-input';
import './ia-donation-badged-input';

function wrapper(el: IADonationBadgedInput): HTMLDivElement {
  return el.shadowRoot!.querySelector('.input-wrapper')!;
}

describe('IADonationBadgedInput', () => {
  test('slots the field and shows the icon', async () => {
    const el = await fixture<IADonationBadgedInput>(
      html`<ia-donation-badged-input .icon=${emailIcon}>
        <input id="field" />
      </ia-donation-badged-input>`,
    );

    const slot = el.shadowRoot!.querySelector('slot')!;
    expect(slot.assignedElements()[0].id).to.equal('field');
    expect(el.shadowRoot!.querySelector('.icon-container .ia-icon')).to.exist;
  });

  test('marks a required field with an asterisk', async () => {
    const el = await fixture<IADonationBadgedInput>(
      html`<ia-donation-badged-input required></ia-donation-badged-input>`,
    );
    const indicator = el.shadowRoot!.querySelector('.required-indicator')!;
    expect(indicator.textContent?.trim()).to.equal('*');

    el.required = false;
    await el.updateComplete;
    expect(indicator.textContent?.trim()).to.equal('');
  });

  test('toggles the error class', async () => {
    const el = await fixture<IADonationBadgedInput>(
      html`<ia-donation-badged-input></ia-donation-badged-input>`,
    );
    expect(wrapper(el).classList.contains('error')).to.be.false;

    el.error = true;
    await el.updateComplete;
    expect(wrapper(el).classList.contains('error')).to.be.true;
  });

  test('can collapse the icon column when there is no icon', async () => {
    const el = await fixture<IADonationBadgedInput>(
      html`<ia-donation-badged-input
        .iconSpaceOption=${SpacerOption.CompressSpace}
      ></ia-donation-badged-input>`,
    );
    expect(wrapper(el).classList.contains('compress-space')).to.be.true;

    const iconContainer =
      el.shadowRoot!.querySelector<HTMLDivElement>('.icon-container')!;
    // 10px base: the collapsed column is one base unit, the full one is three
    expect(getComputedStyle(iconContainer).width).to.equal('10px');

    el.iconSpaceOption = SpacerOption.LeaveSpace;
    await el.updateComplete;
    expect(getComputedStyle(iconContainer).width).to.equal('30px');
  });
});
