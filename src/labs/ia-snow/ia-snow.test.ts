import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IASnow } from './ia-snow';
import './ia-snow';

describe('IA Snow', () => {
  test('renders a basic snow', async () => {
    const el = await fixture<IASnow>(html`<ia-snow></ia-snow>`);
    const button = el.shadowRoot?.querySelector('ia-button');
    expect(button).toBeDefined();
  });
});
