import { fixture, fixtureCleanup } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test } from 'vitest';
import { html } from 'lit';

import './ia-book-actions-text-group';
import type { IABookActionsTextGroup } from './ia-book-actions-text-group';

const container = ({
  textClass,
  texts,
}: { textClass?: string; texts?: string } = {}) =>
  html`<ia-book-actions-text-group
    .textClass=${textClass}
    .texts=${texts}
  ></ia-book-actions-text-group>`;

describe('<ia-book-actions-text-group>', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test('check class on the basis small screen resolution', async () => {
    const el = await fixture<IABookActionsTextGroup>(
      container({
        textClass: 'visible',
        texts: 'Join waitlist for 14 day borrow',
      }),
    );
    expect(el.textClass).to.be.equal('visible');
    const textSpan = el.shadowRoot!.querySelector('span')!;

    expect(textSpan.classList.contains('visible')).to.be.true;
    expect(textSpan.classList.contains('hidden')).to.be.false;
  });

  test('check class on the basis small large resolution', async () => {
    const el = await fixture<IABookActionsTextGroup>(
      container({
        textClass: 'hidden',
        texts: 'Join waitlist for 14 day borrow',
      }),
    );
    expect(el.textClass).to.be.equal('hidden');
    const textSpan = el.shadowRoot!.querySelector('span')!;

    expect(textSpan.classList.contains('hidden')).to.be.true;
    expect(textSpan.classList.contains('visible')).to.be.false;
  });

  test('check inner texts of text group', async () => {
    const el = await fixture<IABookActionsTextGroup>(
      container({
        texts: 'Join waitlist for 14 day borrow',
      }),
    );
    const textSpan = el.shadowRoot!.querySelector('span')!;
    expect(textSpan.innerText).to.equal('Join waitlist for 14 day borrow');
  });
});
