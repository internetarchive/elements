import { fixture, fixtureCleanup } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test } from 'vitest';
import { html } from 'lit';

import './ia-book-actions-timer-countdown';
import type { IABookActionsTimerCountdown } from './ia-book-actions-timer-countdown';

const container = ({
  secondsLeftOnLoan,
}: { secondsLeftOnLoan?: number } = {}) =>
  html`<ia-book-actions-timer-countdown
    .secondsLeftOnLoan=${secondsLeftOnLoan}
  ></ia-book-actions-timer-countdown>`;

describe('<ia-book-actions-timer-countdown>', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test('timer interval is undefined when loan is expired', async () => {
    const el = await fixture<IABookActionsTimerCountdown>(
      container({
        secondsLeftOnLoan: 0, // in seconds
      }),
    );

    await el.updateComplete;
    expect(el.secondsLeftOnLoan).to.equal(0);
  });

  test('timer interval is not undefined when loan is active', async () => {
    const el = await fixture<IABookActionsTimerCountdown>(
      container({
        secondsLeftOnLoan: 2, // in seconds
      }),
    );

    await el.updateComplete;

    expect(el.secondsLeftOnLoan).to.equal(2);
  });
});
