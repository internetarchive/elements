import { fixture, fixtureCleanup } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test } from 'vitest';
import { html } from 'lit';

import './ia-book-actions-collapsible-action-group';
import type { IABookActionsCollapsibleActionGroup } from './ia-book-actions-collapsible-action-group';
import type { ActionConfig } from './models';
import { OFFLINE_LOADER_ICON } from './loan-fetch-stub.test-helper';

const container = ({
  primaryActions = [
    {
      analyticsEvent: { action: 'Browse', category: 'Lending' },
      className: 'ia-button primary',
      text: 'Borrow',
      id: 'browseBook',
    },
    {
      analyticsEvent: { action: 'Borrow', category: 'Lending' },
      className: 'ia-button primary',
      text: 'Borrow for 14 days',
      id: 'borrowBook',
    },
  ],
  secondaryActions = [
    {
      analyticsEvent: { action: '', category: '' },
      className: 'ia-button dark',
      text: 'Purchase',
      id: 'purchaseBook',
    },
  ],
  borrowType = '',
}: {
  primaryActions?: ActionConfig[];
  secondaryActions?: ActionConfig[];
  borrowType?: string;
} = {}) =>
  html`<ia-book-actions-collapsible-action-group
    .primaryActions=${primaryActions}
    .secondaryActions=${secondaryActions}
    .borrowType=${borrowType}
    .returnUrl=${'https://openlibrary.org'}
    .loaderIcon=${OFFLINE_LOADER_ICON}
  ></ia-book-actions-collapsible-action-group>`;

describe('<ia-book-actions-collapsible-action-group>', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test('check primary action button section is rendered', async () => {
    const el = await fixture<IABookActionsCollapsibleActionGroup>(container());
    const primaryActionContainer = el.shadowRoot!.querySelector('.primary')!;
    expect(primaryActionContainer.classList.contains('action-buttons')).to.be
      .true;

    const primaryButton =
      primaryActionContainer.querySelector<HTMLElement>('.ia-button')!;
    expect(primaryButton.innerText).to.equal('Borrow');
  });

  test('check if loader is active and action-group is disabled', async () => {
    const el = await fixture<IABookActionsCollapsibleActionGroup>(container());

    const primaryActionContainer = el.shadowRoot!.querySelector('.primary')!;
    primaryActionContainer
      .querySelector('.ia-button')!
      .dispatchEvent(new CustomEvent('toggle-loader'));
    el.disabled = true;
    await el.updateComplete;

    expect(el.disabled).to.be.true;
    expect(el.shadowRoot!.querySelector('div')!.classList.contains('disabled'))
      .to.be.true;
  });

  test('fires analytics events', async () => {
    const el = await fixture<IABookActionsCollapsibleActionGroup>(container());
    const primaryActionContainer = el.shadowRoot!.querySelector('.primary')!;
    expect(primaryActionContainer.classList.contains('action-buttons')).to.be
      .true;

    let eName: string | undefined;
    let eAnalytics: { category: string; action: string } | undefined;
    const manualClickStub = (
      eventName: string,
      gaEvent?: { category: string; action: string },
    ) => {
      eName = eventName;
      eAnalytics = gaEvent;
    };

    el.clickHandler = manualClickStub;
    await el.updateComplete;

    const primaryButton = primaryActionContainer.querySelector('.ia-button')!;
    primaryButton.dispatchEvent(new Event('click'));
    await el.updateComplete;

    expect(eName).to.equal('browseBook');
    expect(eAnalytics?.category).to.equal('Lending');
    expect(eAnalytics?.action).to.equal('Browse');
  });

  test('receives `loanUrl`', async () => {
    const el = await fixture<IABookActionsCollapsibleActionGroup>(container());
    expect(el.returnUrl).to.equal('https://openlibrary.org');
  });

  test('uses the loader icon it is given', async () => {
    const el = await fixture<IABookActionsCollapsibleActionGroup>(html`
      <ia-book-actions-collapsible-action-group
        .loaderIcon=${'data:image/gif;base64,R0lGODlhAQABAAAAACw='}
      ></ia-book-actions-collapsible-action-group>
    `);

    expect(
      el.shadowRoot!.querySelector('img.actionloader')!.getAttribute('src'),
    ).to.equal('data:image/gif;base64,R0lGODlhAQABAAAAACw=');
  });
});
