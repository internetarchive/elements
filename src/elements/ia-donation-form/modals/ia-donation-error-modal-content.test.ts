import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IADonationErrorModalContent } from './ia-donation-error-modal-content';
import './ia-donation-error-modal-content';

describe('IADonationErrorModalContent', () => {
  test('renders a "Questions?" link to the help article in a new tab', async () => {
    const el = await fixture<IADonationErrorModalContent>(
      html`<ia-donation-error-modal-content></ia-donation-error-modal-content>`,
    );

    const link =
      el.shadowRoot!.querySelector<HTMLAnchorElement>('.container a')!;
    expect(link.textContent?.trim()).to.equal('Questions?');
    expect(link.href).to.equal(
      'https://help.archive.org/help/why-is-there-a-problem-processing-my-donation/',
    );
    expect(link.target).to.equal('_blank');
    expect(link.rel).to.equal('noopener');
  });
});
