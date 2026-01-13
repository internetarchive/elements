import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IAStatusIndicator } from './ia-status-indicator';
import './ia-status-indicator';

describe('IA Status Indicator', () => {
  test('renders a circular loading indicator by default', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator></ia-status-indicator>`,
    );
    const circularLoadingIndicator = el.shadowRoot?.querySelector(
      '.circular-loading-indicator',
    );
    expect(circularLoadingIndicator).toBeDefined();
  });

  test('uses a custom loading text for the indicator if desired', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator
        .loadingTitle=${'Download in progress...'}
      ></ia-status-indicator>`,
    );
    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Download in progress...');
  });

  test('uses a default title if no title provided', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator></ia-status-indicator>`,
    );

    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Loading...');
  });
});
