import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test, vi } from 'vitest';

import { IANoTheaterAvailable } from './ia-no-theater-available';
import './ia-no-theater-available';

describe('IANoTheaterAvailable', () => {
  test('renders the placeholder message', async () => {
    const el = await fixture<IANoTheaterAvailable>(
      html`<ia-no-theater-available></ia-no-theater-available>`,
    );
    expect(el.shadowRoot?.querySelector('h2')?.textContent).to.contain(
      'NO PREVIEW AVAILABLE',
    );
  });

  test('links to the item download page', async () => {
    const el = await fixture<IANoTheaterAvailable>(
      html`<ia-no-theater-available
        identifier="my-item"
      ></ia-no-theater-available>`,
    );
    expect(el.downloadUrl).to.equal('/download/my-item');
    expect(el.shadowRoot?.querySelector('a')?.getAttribute('href')).to.equal(
      '/download/my-item',
    );
  });

  test('emits loadingStateUpdated once the identifier is set', async () => {
    const el = await fixture<IANoTheaterAvailable>(
      html`<ia-no-theater-available></ia-no-theater-available>`,
    );
    const listener = vi.fn();
    el.addEventListener('loadingStateUpdated', listener);

    el.identifier = 'abc';
    await el.updateComplete;

    expect(listener).toHaveBeenCalledOnce();
    expect((listener.mock.calls[0][0] as CustomEvent).detail.loaded).to.equal(
      true,
    );
  });

  test('does not re-emit loadingStateUpdated on updates that leave the identifier unchanged', async () => {
    const el = await fixture<IANoTheaterAvailable>(
      html`<ia-no-theater-available
        identifier="abc"
      ></ia-no-theater-available>`,
    );
    const listener = vi.fn();
    el.addEventListener('loadingStateUpdated', listener);

    // An update with no identifier change must skip emitLoaded().
    el.requestUpdate();
    await el.updateComplete;

    expect(listener).not.toHaveBeenCalled();
  });
});
