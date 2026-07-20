import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test } from 'vitest';

import { IASharePanel } from './ia-share-panel';
import './ia-share-panel';

describe('IASharePanel', () => {
  test('auto-populates the social sharing options', async () => {
    const el = await fixture<IASharePanel>(
      html`<ia-share-panel identifier="my-item"></ia-share-panel>`,
    );
    await el.updateComplete;

    const links = el.shadowRoot?.querySelectorAll('a.share-option');
    expect(links).to.have.lengthOf(5);
    const names = [...(links ?? [])].map((a) => a.textContent?.trim());
    expect(names).to.deep.equal([
      'Twitter',
      'Facebook',
      'Tumblr',
      'Pinterest',
      'Email',
    ]);
  });

  test('builds share URLs from the identifier, host and sub-prefix', async () => {
    const el = await fixture<IASharePanel>(
      html`<ia-share-panel
        identifier="my-item"
        baseHost="example.org"
        fileSubPrefix="vol1"
      ></ia-share-panel>`,
    );
    await el.updateComplete;

    const twitter = el.sharingOptions.find((o) => o.name === 'Twitter');
    expect(twitter?.url).to.contain(
      encodeURIComponent('https://example.org/details/my-item/vol1'),
    );
  });

  test('exposes iframe and bbcode embed snippets and a help URL', async () => {
    const el = await fixture<IASharePanel>(
      html`<ia-share-panel
        identifier="my-item"
        baseHost="example.org"
      ></ia-share-panel>`,
    );
    expect(el.iframeEmbed).to.contain(
      'src="https://example.org/embed/my-item"',
    );
    expect(el.bbcodeEmbed).to.contain('[archiveorg my-item');
    expect(el.helpURL).to.contain('identifier=my-item');
  });

  test('renders a header only when renderHeader is set', async () => {
    const el = await fixture<IASharePanel>(
      html`<ia-share-panel type="book"></ia-share-panel>`,
    );
    expect(el.shadowRoot?.querySelector('header')).to.not.exist;

    el.renderHeader = true;
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('header h3')?.textContent).to.contain(
      'Share this book',
    );
  });

  test('flashes the "copied" note when an embed block is clicked', async () => {
    const el = await fixture<IASharePanel>(
      html`<ia-share-panel identifier="my-item"></ia-share-panel>`,
    );
    await el.updateComplete;

    const code = el.shadowRoot?.querySelector('.code') as HTMLElement;
    const note = code.querySelector('small') as HTMLElement;
    expect(note.classList.contains('visible')).to.equal(false);

    code.click();
    // copy handler is async (Clipboard API, then note toggle)
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(note.classList.contains('visible')).to.equal(true);
  });
});
