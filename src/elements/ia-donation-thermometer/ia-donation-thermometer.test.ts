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
  width = 300,
): Promise<IADonationThermometer> {
  const wrapper = await fixture<HTMLDivElement>(
    html`<div style="width: ${width}px">${template}</div>`,
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

function progressbar(el: IADonationThermometer): HTMLDivElement {
  return el.shadowRoot!.querySelector('[role="progressbar"]')!;
}

/** The painted fill as a fraction of the track it is clipped to. */
function fillFraction(el: IADonationThermometer): number {
  const clip = el.shadowRoot!.querySelector('.thermometer-clip')!;
  const width = clip.getBoundingClientRect().width;
  return width === 0 ? 0 : fill(el).getBoundingClientRect().width / width;
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

    const bar = progressbar(el);
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

    const bar = progressbar(el);
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

    expect(fillFraction(el)).to.be.closeTo(0.25, 0.01);
  });

  test('caps the fill at 100% once the goal is passed', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .currentAmount=${1_500_000}
        .goalAmount=${1_000_000}
      ></ia-donation-thermometer>`,
    );

    expect(fillFraction(el)).to.be.closeTo(1, 0.01);
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
    expect(currentValue(el)?.getBoundingClientRect().left).to.equal(
      fill(el).getBoundingClientRect().right,
    );
  });

  test('shows the current value on the left if there is room', async () => {
    const el = await sizedFixture(
      html`<ia-donation-thermometer
        .goalAmount=${1_000_000}
        .currentAmount=${750_000}
      ></ia-donation-thermometer>`,
    );

    expect(background(el).classList.contains('value-left')).to.be.true;
    expect(currentValue(el)?.getBoundingClientRect().right).to.equal(
      fill(el).getBoundingClientRect().right,
    );
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

  test('keeps the value label as a single node as it changes sides', async () => {
    const el = await sizedFixture(
      html`<ia-donation-thermometer
        .goalAmount=${1_000_000}
        .currentAmount=${1_000}
      ></ia-donation-thermometer>`,
    );
    const label = currentValue(el);
    expect(background(el).classList.contains('value-right')).to.be.true;

    el.currentAmount = 750_000;
    await settleLayout(el);

    expect(background(el).classList.contains('value-left')).to.be.true;
    expect(currentValue(el)).to.equal(label);
  });

  test('keeps the label out of the fill width', async () => {
    const el = await sizedFixture(
      html`<ia-donation-thermometer
        .goalAmount=${1_000_000}
        .currentAmount=${1_000}
      ></ia-donation-thermometer>`,
    );

    expect(fillFraction(el)).to.be.closeTo(0.001, 0.002);
    expect(currentValue(el)?.getBoundingClientRect().width).to.be.above(
      fill(el).getBoundingClientRect().width,
    );
  });

  test('keeps the value label unclipped on a narrow track', async () => {
    const el = await sizedFixture(
      html`<ia-donation-thermometer
        .goalAmount=${1_000_000}
        .currentAmount=${500_000}
      ></ia-donation-thermometer>`,
      200,
    );
    expect(background(el).classList.contains('value-right')).to.be.true;

    // The label runs past the end of the track at this width, so it has to sit
    // outside the layer that clips the fill.
    const label = currentValue(el);
    const clip = el.shadowRoot!.querySelector('.thermometer-clip')!;

    expect(label?.getBoundingClientRect().right).to.be.above(
      background(el).getBoundingClientRect().right,
    );
    expect(clip.contains(label)).to.be.false;
    expect(getComputedStyle(background(el)).overflow).to.equal('visible');
  });

  test('paints the bar at its declared height', async () => {
    const el = await sizedFixture(
      html`<ia-donation-thermometer
        style="--ia-donation-thermometer-height: 40px"
      ></ia-donation-thermometer>`,
    );

    expect(background(el).getBoundingClientRect().height).to.be.closeTo(
      40,
      0.5,
    );
  });

  test('keeps the goal text out of the progressbar', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .goalMessageMode=${'message'}
      ></ia-donation-thermometer>`,
    );

    const bar = progressbar(el);
    expect(goalMessage(el)).to.exist;
    expect(bar).to.equal(background(el));
    expect(bar.contains(goalMessage(el))).to.be.false;
  });

  test('clamps the reported progress to the goal', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .currentAmount=${1_500_000}
        .goalAmount=${1_000_000}
      ></ia-donation-thermometer>`,
    );

    const bar = progressbar(el);
    expect(bar.getAttribute('aria-valuenow')).to.equal('1000000');
    expect(bar.getAttribute('aria-valuetext')).to.equal('$1.5MM');
  });

  test('reports no progress against a zero goal', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .currentAmount=${0}
        .goalAmount=${0}
      ></ia-donation-thermometer>`,
    );

    const bar = progressbar(el);
    expect(fillFraction(el)).to.equal(0);
    expect(bar.getAttribute('aria-valuenow')).to.equal('0');
  });

  test('empties the fill for a negative amount', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .currentAmount=${-500_000}
        .goalAmount=${1_000_000}
      ></ia-donation-thermometer>`,
    );

    const bar = progressbar(el);
    expect(fillFraction(el)).to.equal(0);
    expect(bar.getAttribute('aria-valuenow')).to.equal('0');
  });

  test('empties the fill for an amount that is not a number', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .currentAmount=${NaN}
        .goalAmount=${1_000_000}
      ></ia-donation-thermometer>`,
    );

    const bar = progressbar(el);
    expect(fillFraction(el)).to.equal(0);
    expect(bar.getAttribute('aria-valuenow')).to.equal('0');
    expect(bar.getAttribute('aria-valuetext')).to.equal('$0');
    expect(currentValue(el)?.textContent?.trim()).to.equal('$0');
  });

  test('reports a goal that is not a number as no range', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .currentAmount=${500_000}
        .goalAmount=${NaN}
      ></ia-donation-thermometer>`,
    );

    const bar = progressbar(el);
    expect(fillFraction(el)).to.equal(0);
    expect(bar.getAttribute('aria-valuemax')).to.equal('0');
    expect(bar.getAttribute('aria-valuenow')).to.equal('0');
  });

  test('reports a negative goal as no range', async () => {
    const el = await fixture<IADonationThermometer>(
      html`<ia-donation-thermometer
        .currentAmount=${500_000}
        .goalAmount=${-1_000}
      ></ia-donation-thermometer>`,
    );

    const bar = progressbar(el);
    expect(fillFraction(el)).to.equal(0);
    expect(bar.getAttribute('aria-valuemax')).to.equal('0');
    expect(bar.getAttribute('aria-valuenow')).to.equal('0');
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
