import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IAButton } from './ia-button';
import './ia-button';

describe('IA button', () => {
  test('renders a basic button', async () => {
    const el = await fixture<IAButton>(html`<ia-button>Click me</ia-button>`);
    const button = el.shadowRoot?.querySelector('button');
    expect(button).toBeDefined();
  });
});
