import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IAStatusIndicator } from './ia-status-indicator';
import './ia-status-indicator';

describe('IA Status Indicator', () => {
  test('renders a loading indicator by default', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator></ia-status-indicator>>`,
    );
    const loadingIndicator = el.shadowRoot?.querySelector('loading-indicator');
    expect(loadingIndicator).toBeDefined();
  });
});
