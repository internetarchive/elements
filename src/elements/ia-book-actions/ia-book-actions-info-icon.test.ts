import { fixture, fixtureCleanup } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test } from 'vitest';
import { html } from 'lit';

import './ia-book-actions-info-icon';
import type { IABookActionsInfoIcon } from './ia-book-actions-info-icon';

const container = ({ iconClass = 'mobile' } = {}) =>
  html`<ia-book-actions-info-icon
    .iconClass=${iconClass}
  ></ia-book-actions-info-icon>`;

describe('<ia-book-actions-info-icon>', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test('check class on the basis screen resolution', async () => {
    const el = await fixture<IABookActionsInfoIcon>(container());
    expect(el.iconClass).to.be.equal('mobile');
    expect(el.shadowRoot!.querySelector('a')!.classList.contains('mobile')).to
      .be.true;
    expect(el.shadowRoot!.querySelector('a')!.classList.contains('desktop')).to
      .be.false;
  });
});
