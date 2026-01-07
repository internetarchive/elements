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
});
