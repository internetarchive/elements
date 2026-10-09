import { fixture, fixtureCleanup, oneEvent } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test } from 'vitest';
import { html } from 'lit';

import './ia-book-actions-title-bar';
import type { IABookActionsTitleBar } from './ia-book-actions-title-bar';

const container = ({
  identifier,
  bookTitle,
}: { identifier?: string; bookTitle?: string } = {}) =>
  html`<ia-book-actions-title-bar
    .identifier=${identifier}
    .bookTitle=${bookTitle}
  ></ia-book-actions-title-bar>`;

describe('<ia-book-actions-title-bar>', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test('check inner texts of title bar', async () => {
    const el = await fixture<IABookActionsTitleBar>(
      container({
        identifier: 'goody',
        bookTitle: 'this is test booktitle',
      }),
    );
    const link = el.shadowRoot!.querySelector('a')!;
    expect(link.innerText).to.equal('this is test booktitle');
    expect(link.getAttribute('href')).to.equal('/details/goody');
  });

  test('check if event if firing on valid analytics category action', async () => {
    const el = await fixture<IABookActionsTitleBar>(
      container({
        identifier: 'goody',
        bookTitle: 'this is test booktitle',
      }),
    );

    const clickButton = () =>
      el.shadowRoot!.querySelector('a')!.dispatchEvent(new Event('click'));
    setTimeout(clickButton);

    const { detail } = await oneEvent(el, 'bookTitleBar');
    expect(detail.event.category).to.equal('BookReader-Header');
    expect(detail.event.action).to.equal('Book-Title-Bar');
  });
});
