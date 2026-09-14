import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html, type TemplateResult } from 'lit';

import type { IADonationThermometer } from './ia-donation-thermometer';
import './ia-donation-thermometer';

/**
 * ResizeObserver reports after layout, before the next paint. Two frames give
 * it time to fire and the element time to re-render on the new widths.
 */
async function settleLayout(el: IADonationThermometer): Promise<void> {
  await el.updateComplete;
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await el.updateComplete;
}

/** Renders the thermometer at a known width so the fill sizes are predictable. */
async function sizedFixture(
  template: TemplateResult,
): Promise<IADonationThermometer> {
  const wrapper = await fixture<HTMLDivElement>(
    html`<div style="width: 300px">${template}</div>`,
  );
  const el = wrapper.querySelector<IADonationThermometer>(
    'ia-donation-thermometer',
  )!;
  await settleLayout(el);
  return el;
}

function background(el: IADonationThermometer): HTMLDivElement {
  return el.shadowRoot!.querySelector('.thermometer-background')!;
}

function fill(el: IADonationThermometer): HTMLDivElement {
  return el.shadowRoot!.querySelector('.thermometer-fill')!;
}

function goalMessage(el: IADonationThermometer): HTMLDivElement | null {
  return el.shadowRoot!.querySelector('.donate-goal');
}

function currentValue(el: IADonationThermometer): HTMLDivElement | null {
  return el.shadowRoot!.querySelector('.thermometer-value');
}

describe('IADonationThermometer', () => {
  test('has a background track and fill layer', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer></ia-donation-thermometer>`,
    );

    expect(background(el)).to.exist;
    expect(fill(el)).to.exist;
  });

  test('exposes the amounts as a progressbar', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .currentAmount=${500_000}
        .goalAmount=${1_000_000}
      ></ia-donation-thermometer>`,
    );

    const bar = el.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(bar.getAttribute('aria-label')).to.equal('Donation progress');
    expect(bar.getAttribute('aria-valuemin')).to.equal('0');
    expect(bar.getAttribute('aria-valuemax')).to.equal('1000000');
    expect(bar.getAttribute('aria-valuenow')).to.equal('500000');
    expect(bar.getAttribute('aria-valuetext')).to.equal('$0.5MM');
  });

  test('lets a consumer name the progress bar', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .label=${'End of year goal'}
      ></ia-donation-thermometer>`,
    );

    const bar = el.shadowRoot!.querySelector('[role="progressbar"]')!;
    expect(bar.getAttribute('aria-label')).to.equal('End of year goal');
  });

  test('defaults to showing the goal value at the end of the thermometer and the current value', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .currentAmount=${500_000}
        .goalAmount=${1_000_000}
      ></ia-donation-thermometer>`,
    );

    expect(goalMessage(el)?.textContent?.trim()).to.equal('$1MM goal');
    expect(currentValue(el)?.textContent?.trim()).to.equal('$0.5MM');
  });

  test('sizes the fill to the fraction of the goal raised', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .currentAmount=${250_000}
        .goalAmount=${1_000_000}
      ></ia-donation-thermometer>`,
    );

    expect(fill(el).style.width).to.equal('25%');
  });

  test('caps the fill at 100% once the goal is passed', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .currentAmount=${1_500_000}
        .goalAmount=${1_000_000}
      ></ia-donation-thermometer>`,
    );

    expect(fill(el).style.width).to.equal('100%');
  });

  test('can hide the goal', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .goalMessageMode=${'off'}
        .goalAmount=${1_000}
        .currentAmount=${1_200}
      ></ia-donation-thermometer>`,
    );

    expect(goalMessage(el)).to.be.null;
  });

  test('can hide the current amount', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .currentAmountMode=${'off'}
        .goalAmount=${1_000}
        .currentAmount=${1_200}
      ></ia-donation-thermometer>`,
    );

    expect(currentValue(el)).to.be.null;
  });

  test('can display goal met message', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .goalReachedMessage=${'GOAL MET'}
        .goalMessageMode=${'message'}
        .goalAmount=${1_000}
        .currentAmount=${1_200}
      ></ia-donation-thermometer>`,
    );

    expect(goalMessage(el)?.textContent?.trim()).to.equal('GOAL MET');
  });

  test('can display goal near message', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .goalNearMessage=${'GOAL NEAR'}
        .goalMessageMode=${'message'}
        .goalAmount=${1_000}
        .currentAmount=${800}
      ></ia-donation-thermometer>`,
    );

    expect(goalMessage(el)?.textContent?.trim()).to.equal('GOAL NEAR');
  });

  test.each([
    [0, '$0'],
    [500_000, '$0.5MM'],
    [1_250_000, '$1.3MM'],
    [9_950_000, '$10MM'],
    [35_000_000, '$35MM'],
    [35_600_000, '$36MM'],
  ])('formats %i as %s', async (amount, display) => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .goalAmount=${50_000_000}
        .currentAmount=${amount}
      ></ia-donation-thermometer>`,
    );

    expect(currentValue(el)?.textContent?.trim()).to.equal(display);
  });

  test('shows the current value on the right if the fill is too skinny', async () => {
    const el = await sizedFixture(
      html`<ia-donation-thermometer
        .goalAmount=${1_000_000}
        .currentAmount=${1_000}
      ></ia-donation-thermometer>`,
    );

    expect(background(el).classList.contains('value-right')).to.be.true;
    expect(currentValue(el)?.parentElement).to.equal(background(el));
  });

  test('shows the current value on the left if there is room', async () => {
    const el = await sizedFixture(
      html`<ia-donation-thermometer
        .goalAmount=${1_000_000}
        .currentAmount=${750_000}
      ></ia-donation-thermometer>`,
    );

    expect(background(el).classList.contains('value-left')).to.be.true;
    expect(currentValue(el)?.parentElement).to.equal(fill(el));
  });

  test('moves the value across as the fill grows and shrinks', async () => {
    const el = await sizedFixture(
      html`<ia-donation-thermometer
        .goalAmount=${1_000_000}
        .currentAmount=${1_000}
      ></ia-donation-thermometer>`,
    );
    expect(background(el).classList.contains('value-right')).to.be.true;

    el.currentAmount = 750_000;
    await settleLayout(el);
    expect(background(el).classList.contains('value-left')).to.be.true;

    el.currentAmount = 1_000;
    await settleLayout(el);
    expect(background(el).classList.contains('value-right')).to.be.true;
  });

  test('keeps measuring the value label after it changes sides', async () => {
    const el = await sizedFixture(
      html`<ia-donation-thermometer
        .goalAmount=${1_000_000}
        .currentAmount=${1_000}
      ></ia-donation-thermometer>`,
    );
    expect(background(el).classList.contains('value-right')).to.be.true;

    // A fill wide enough to hold the label moves it inside
    el.currentAmount = 750_000;
    await settleLayout(el);
    expect(background(el).classList.contains('value-left')).to.be.true;

    // Once inside, a label that outgrows the fill has to move back out. The
    // fill stays put while a much larger font makes the label wider than it.
    el.style.fontSize = '80px';
    await settleLayout(el);
    expect(background(el).classList.contains('value-right')).to.be.true;
  });

  test('keeps tracking sizes after being moved in the page', async () => {
    const el = await sizedFixture(
      html`<ia-donation-thermometer
        .goalAmount=${1_000_000}
        .currentAmount=${1_000}
      ></ia-donation-thermometer>`,
    );
    const parent = el.parentElement!;

    el.remove();
    parent.append(el);
    el.currentAmount = 750_000;
    await settleLayout(el);

    expect(background(el).classList.contains('value-left')).to.be.true;
  });
});
