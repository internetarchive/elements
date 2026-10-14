import { describe, expect, test } from 'vitest';
import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';

import type { IAIconLabel } from './ia-icon-label';
import './ia-icon-label';

describe('IAIconLabel', () => {
  test('displays the provided icon in the `slot[name="icon"`', async () => {
    const fooLabel = html`<p id="bunnyhop" slot="icon">foo</p>`;
    const el = await fixture<IAIconLabel>(
      html`<ia-icon-label> ${fooLabel} </ia-icon-label>`,
    );

    const iconSlot = el?.shadowRoot?.querySelector('slot[name="icon"]');
    const iconSlotEls = (iconSlot as HTMLSlotElement)?.assignedElements();
    expect(iconSlotEls.length).to.equal(1);
    expect(iconSlotEls[0].getAttribute('id')).to.equal('bunnyhop');
  });

  test('displays generic slot', async () => {
    const barLabel = html`<p id="carrotcake">bar</p>`;
    const el = await fixture<IAIconLabel>(
      html`<ia-icon-label> ${barLabel} </ia-icon-label>`,
    );

    const allSlots = el?.shadowRoot?.querySelectorAll('slot') || [];
    const iconSlotEls = allSlots[0]?.assignedElements();
    const labelSlotEls = allSlots[1]?.assignedElements();

    expect(allSlots?.length).to.equal(2);
    expect(iconSlotEls?.length).to.equal(0);
    expect(labelSlotEls?.length).to.equal(1);
    expect(labelSlotEls[0].getAttribute('id')).to.equal('carrotcake');
  });
});
