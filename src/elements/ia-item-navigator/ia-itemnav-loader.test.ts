import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test } from 'vitest';

import { IAItemNavLoader } from './ia-itemnav-loader';
import './ia-itemnav-loader';

describe('IAItemNavLoader', () => {
  test('renders the loading spinner', async () => {
    const el = await fixture<IAItemNavLoader>(
      html`<ia-itemnav-loader></ia-itemnav-loader>`,
    );
    expect(el.shadowRoot?.querySelector('svg .ring')).to.exist;
    expect(el.shadowRoot?.querySelector('h3')?.textContent).to.contain(
      'Loading viewer',
    );
  });

  test('shows the loader message when provided', async () => {
    const el = await fixture<IAItemNavLoader>(
      html`<ia-itemnav-loader
        loaderMessage="Internet Archive"
      ></ia-itemnav-loader>`,
    );
    expect(el.shadowRoot?.querySelector('h2')?.textContent).to.contain(
      'Internet Archive',
    );
  });

  test('omits the message heading when there is no message', async () => {
    const el = await fixture<IAItemNavLoader>(
      html`<ia-itemnav-loader></ia-itemnav-loader>`,
    );
    expect(el.shadowRoot?.querySelector('h2')).to.not.exist;
  });
});
