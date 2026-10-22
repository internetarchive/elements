import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IATopNav } from './ia-topnav';
import './ia-topnav';

/** Every focusable, rendered element inside the topnav, through its shadow roots. */
function focusables(root: ShadowRoot | Element): HTMLElement[] {
  const found: HTMLElement[] = [];
  for (const el of root.querySelectorAll<HTMLElement>('*')) {
    if (
      el.matches('a[href], button, input, [tabindex]:not([tabindex="-1"])') &&
      !el.matches(':disabled') &&
      el.getClientRects().length > 0
    ) {
      found.push(el);
    }
    if (el.shadowRoot) found.push(...focusables(el.shadowRoot));
  }
  return found;
}

describe('ia-topnav focus', () => {
  test('shows the focus ring on every stop', async () => {
    const el = await fixture<IATopNav>(
      html`<ia-topnav username="brewster" screenName="Brewster"></ia-topnav>`,
    );
    await el.updateComplete;

    const stops = focusables(el.shadowRoot!);
    expect(stops.length, 'no focusable parts rendered').to.be.greaterThan(5);

    const missing: string[] = [];
    for (const stop of stops) {
      stop.focus();
      // A focus with no pointer before it counts as keyboard focus.
      if (!stop.matches(':focus-visible')) continue;
      const style = getComputedStyle(stop);
      if (style.outlineStyle === 'none' || style.outlineWidth === '0px') {
        const label = stop.getAttribute('aria-label') ?? stop.textContent;
        missing.push(`${stop.tagName.toLowerCase()} "${label?.trim()}"`);
      }
    }
    expect(missing, 'stops with no focus ring').to.deep.equal([]);
  });
});
