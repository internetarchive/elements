import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { RecaptchaManagerStory } from './recaptcha-manager-story';
import './recaptcha-manager-story';

async function execute(options: { mode?: string; siteKey?: string } = {}) {
  const el = await fixture<RecaptchaManagerStory>(
    html`<recaptcha-manager-story></recaptcha-manager-story>`,
  );
  const root = el.shadowRoot!;
  if (options.mode) {
    const select = root.querySelector('select') as HTMLSelectElement;
    select.value = options.mode;
    select.dispatchEvent(new Event('change'));
  }
  if (options.siteKey) {
    const input = root.querySelector('input[type="text"]') as HTMLInputElement;
    input.value = options.siteKey;
    input.dispatchEvent(new Event('input'));
  }
  (root.querySelector('form') as HTMLFormElement).requestSubmit();
  await vi.waitFor(() => {
    if (!root.querySelector('.output')) throw new Error('still running');
  });
  await el.updateComplete;
  return {
    call: root.querySelector('.call')?.textContent,
    output: root.querySelector('.output')?.textContent,
    details: Array.from(root.querySelectorAll('.details li')).map(
      (li) => li.textContent,
    ),
  };
}

describe('recaptcha-manager story', () => {
  test('shows nothing until Execute is clicked', async () => {
    const el = await fixture<RecaptchaManagerStory>(
      html`<recaptcha-manager-story></recaptcha-manager-story>`,
    );

    expect(el.shadowRoot!.querySelector('.output')).to.be.null;
  });

  test('returns the token when reCAPTCHA succeeds', async () => {
    const shown = await execute();

    expect(shown.call).to.equal(
      'getRecaptchaWidget({ siteKey: "demo-site-key" }).execute()',
    );
    expect(shown.output).to.equal('token: "foo"');
    expect(shown.details).to.deep.equal([
      'Same widget on a second request: true',
      'grecaptcha reset calls: 1',
    ]);
  });

  test('rejects when reCAPTCHA expires or errors', async () => {
    expect((await execute({ mode: 'expired' })).output).to.equal(
      'rejected: expired',
    );
    expect((await execute({ mode: 'error' })).output).to.equal(
      'rejected: error',
    );
  });

  test('uses the typed site key and leaves no container behind', async () => {
    const shown = await execute({ siteKey: 'abc' });

    expect(shown.call).to.contain('"abc"');
    expect(document.getElementById('recaptchaManager-abc')).to.be.null;
  });
});
