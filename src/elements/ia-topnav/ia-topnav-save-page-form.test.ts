import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test } from 'vitest';

import './ia-topnav-save-page-form';
import type { SavePageForm } from './ia-topnav-save-page-form';

const component = html`<ia-topnav-save-page-form></ia-topnav-save-page-form>`;

/**
 * Submits the form for real rather than calling the private handler. The
 * submit is cancelable and the handler calls `preventDefault()` on an invalid
 * URL, so nothing navigates either way.
 */
async function submitWith(el: SavePageForm, url: string): Promise<void> {
  const form = el.shadowRoot?.querySelector('form') as HTMLFormElement;
  const urlInput = form.querySelector(
    '[name="url_preload"]',
  ) as HTMLInputElement;
  urlInput.value = url;
  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  await el.updateComplete;
}

describe('<ia-topnav-save-page-form>', () => {
  test('rejects a URL with no domain suffix and shows the error', async () => {
    const el = await fixture<SavePageForm>(component);

    await submitWith(el, 'archive');

    expect(el.inputValid).to.be.false;
    expect(el.shadowRoot?.querySelector('.error')?.className).to.contain(
      'visible',
    );
  });

  test('accepts a URL with a domain suffix and hides the error', async () => {
    const el = await fixture<SavePageForm>(component);

    await submitWith(el, 'archive.org');

    expect(el.inputValid).to.be.true;
    expect(el.shadowRoot?.querySelector('.error')?.className).to.not.contain(
      'visible',
    );
  });
});
