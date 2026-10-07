import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import {
  DonationSectionBadgeMode,
  type IADonationSection,
} from './ia-donation-section';
import './ia-donation-section';

function container(el: IADonationSection): HTMLDivElement {
  return el.shadowRoot!.querySelector('.container')!;
}

describe('IADonationSection', () => {
  test('has a default badge 0, no headline, and shows the badge', async () => {
    const el = await fixture<IADonationSection>(
      html`<ia-donation-section></ia-donation-section>`,
    );

    expect(el.sectionBadge).to.equal('0');
    expect(el.headline).to.be.undefined;
    expect(
      el.shadowRoot?.querySelector('.badge')?.textContent?.trim(),
    ).to.equal('0');
    expect(el.shadowRoot?.querySelector('.title')).to.be.null;
    expect(container(el).classList.contains('showbadge')).to.be.true;
  });

  test('can be configured with a headline and badge', async () => {
    const el = await fixture<IADonationSection>(
      html`<ia-donation-section
        sectionBadge="3"
        headline="Foo Bar"
      ></ia-donation-section>`,
    );

    expect(
      el.shadowRoot?.querySelector('.badge')?.textContent?.trim(),
    ).to.equal('3');
    expect(
      el.shadowRoot?.querySelector('.title')?.textContent?.trim(),
    ).to.equal('Foo Bar');
  });

  test('slots its content under the headline', async () => {
    const el = await fixture<IADonationSection>(
      html`<ia-donation-section headline="Foo Bar">
        <p>Some content</p>
      </ia-donation-section>`,
    );

    const slot = el.shadowRoot?.querySelector<HTMLSlotElement>('.content slot');
    const assigned = slot?.assignedElements() ?? [];
    expect(assigned.length).to.equal(1);
    expect(assigned[0].textContent).to.equal('Some content');
  });

  test('can be configured to hide the badge', async () => {
    const el = await fixture<IADonationSection>(
      html`<ia-donation-section
        sectionBadge="3"
        headline="Foo Bar"
        badgeMode=${DonationSectionBadgeMode.HideBadge}
      ></ia-donation-section>`,
    );

    expect(container(el).classList.contains('hidebadge')).to.be.true;
    const badgeContainer =
      el.shadowRoot!.querySelector<HTMLDivElement>('.badge-container')!;
    expect(getComputedStyle(badgeContainer).display).to.equal('none');
  });

  test('can hide the badge but keep its column', async () => {
    const el = await fixture<IADonationSection>(
      html`<ia-donation-section
        badgeMode=${DonationSectionBadgeMode.HideBadgeLeaveSpacing}
      ></ia-donation-section>`,
    );

    expect(container(el).classList.contains('hidebadgeleavespacing')).to.be
      .true;
    const badge = el.shadowRoot!.querySelector<HTMLDivElement>('.badge')!;
    const badgeContainer =
      el.shadowRoot!.querySelector<HTMLDivElement>('.badge-container')!;
    expect(getComputedStyle(badge).display).to.equal('none');
    expect(getComputedStyle(badgeContainer).display).to.not.equal('none');
  });

  test('indents the content by the badge column only when the badge shows', async () => {
    // The indent animates, so turn the transition off to read the end value
    const el = await fixture<IADonationSection>(
      html`<ia-donation-section
        style="--ia-donation-section-badge-transition: none"
      ></ia-donation-section>`,
    );
    const content =
      el.shadowRoot!.querySelector<HTMLDivElement>('.content-container')!;

    // 10px base: a 24px badge plus a 10px margin
    expect(getComputedStyle(content).left).to.equal('34px');

    el.badgeMode = DonationSectionBadgeMode.HideBadge;
    await el.updateComplete;
    expect(getComputedStyle(content).left).to.equal('0px');
  });
});
