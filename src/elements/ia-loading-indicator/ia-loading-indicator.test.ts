import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IALoadingIndicator } from './ia-loading-indicator';
import './ia-loading-indicator';

describe('IA Loading Indicator', () => {
  test('renders a circular loading indicator by default', async () => {
    const el = await fixture<IALoadingIndicator>(
      html`<ia-loading-indicator></ia-loading-indicator>`,
    );
    const circularLoadingIndicator = el.shadowRoot?.querySelector(
      '.circular-loading-indicator',
    );
    expect(circularLoadingIndicator).toBeDefined();
  });

  test('uses a custom title for the indicator if desired', async () => {
    const el = await fixture<IALoadingIndicator>(
      html`<ia-loading-indicator
        .title=${'Download in progress...'}
      ></ia-loading-indicator>`,
    );
    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Download in progress...');
  });

  test('uses a default title if no title provided', async () => {
    const el = await fixture<IALoadingIndicator>(
      html`<ia-loading-indicator></ia-loading-indicator>`,
    );

    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Loading...');
  });
});
