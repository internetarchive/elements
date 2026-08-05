import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test } from 'vitest';

import { IAItemNavLoadingView } from './ia-itemnav-loading-view';
import './ia-itemnav-loading-view';

describe('IAItemNavLoadingView', () => {
  test('renders the loading spinner', async () => {
    const el = await fixture<IAItemNavLoadingView>(
      html`<ia-itemnav-loading-view></ia-itemnav-loading-view>`,
    );
    expect(el.shadowRoot?.querySelector('svg .ring')).to.exist;
    expect(el.shadowRoot?.querySelector('h3')?.textContent).to.contain(
      'Loading viewer',
    );
  });

  test('shows the loader message when provided', async () => {
    const el = await fixture<IAItemNavLoadingView>(
      html`<ia-itemnav-loading-view
        loaderMessage="Internet Archive"
      ></ia-itemnav-loading-view>`,
    );
    expect(el.shadowRoot?.querySelector('h2')?.textContent).to.contain(
      'Internet Archive',
    );
  });

  test('omits the message heading when there is no message', async () => {
    const el = await fixture<IAItemNavLoadingView>(
      html`<ia-itemnav-loading-view></ia-itemnav-loading-view>`,
    );
    expect(el.shadowRoot?.querySelector('h2')).to.not.exist;
  });
});
