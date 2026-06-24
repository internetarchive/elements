import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IASrOnlyText } from './ia-sr-only-text';
import './ia-sr-only-text';

describe('IA SR-only text', () => {
  test('renders a span with the sr-only class by default', async () => {
    const el = await fixture<IASrOnlyText>(
      html`<ia-sr-only-text></ia-sr-only-text>`,
    );
    const span = el.shadowRoot?.querySelector('span');
    expect(span).to.exist;
    expect(span?.classList.contains('sr-only')).to.be.true;
  });

  test('slots any provided text into the span', async () => {
    const el = await fixture<IASrOnlyText>(
      html`<ia-sr-only-text>Foo bar</ia-sr-only-text>`,
    );
    const slottedElements = el.shadowRoot
      ?.querySelector('slot')
      ?.assignedNodes();
    expect(slottedElements).to.exist;
    expect(slottedElements?.[0].textContent).to.equal('Foo bar');
  });
});
