import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { IAButton } from './ia-button';
import './ia-button';

describe('IA button', () => {
  test('renders a basic button by default', async () => {
    const el = await fixture<IAButton>(html`<ia-button>Submit</ia-button>`);

    const button = el.shadowRoot?.querySelector('button');
    expect(button).to.exist;
    expect(button?.disabled).to.equal(false);
  });

  test('renders a link around the button if href provided', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button href="https://archive.org/foo">Go</ia-button>`,
    );

    const link = el.shadowRoot?.querySelector('a');
    expect(link).to.exist;
    expect(link?.href).to.equal('https://archive.org/foo');
  });

  test('includes a target="_blank" if requested', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button href="https://archive.org/foo" .openLinksNewTab=${true}>
        Go
      </ia-button>`,
    );

    const link = el.shadowRoot?.querySelector('a');
    expect(link).to.exist;
    expect(link?.target).to.equal('_blank');
  });

  test('uses target="_self" for links by default', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button href="https://archive.org/foo">Go</ia-button>`,
    );

    const link = el.shadowRoot?.querySelector('a');
    expect(link).to.exist;
    expect(link?.target).to.equal('_self');
  });

  test('displays slotted text within button', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button><span class="foo">Submit</span></ia-button>`,
    );

    const buttonText = el.shadowRoot
      ?.querySelector('slot')
      ?.assignedElements()[0];
    expect(buttonText).to.exist;
    expect(buttonText?.innerHTML).to.contain('Submit');
  });

  test('shows a loading state if requested', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button ?loading=${true}></ia-button>`,
    );

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.disabled).to.equal(true);
    expect(button?.innerText).to.equal('');

    const loadingIndicator = button?.querySelector('.loading-indicator');
    expect(loadingIndicator).to.exist;
  });

  test('shows text next to the loading indicator if requested', async () => {
    const el = await fixture<IAButton>(html`
      <ia-button ?loading=${true} .loadingText=${'Loading...'}>
        Submit
      </ia-button>
    `);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.disabled).to.equal(true);
    expect(button?.innerText).to.equal('Loading...');

    const loadingIndicator = button?.querySelector('.loading-indicator');
    expect(loadingIndicator).to.exist;
  });

  test('adds a hidden light DOM submit input if type set to submit', async () => {
    const el = await fixture<IAButton>(html`
      <ia-button type="submit"> Submit </ia-button>
    `);

    await el.updateComplete;

    const hiddenInput = el.querySelector('input[type="submit"]');
    expect(hiddenInput).to.exist;
  });

  test('does add a hidden light DOM reset input if type set to reset', async () => {
    const el = await fixture<IAButton>(html`
      <ia-button .type=${'reset'}>Clear</ia-button>
    `);

    await el.updateComplete;

    const hiddenInput = el.querySelector('input[type="reset"]');
    expect(hiddenInput).to.exist;
  });

  test('does not add a hidden light DOM input if type not set', async () => {
    const el = await fixture<IAButton>(html`<ia-button>Submit</ia-button>`);

    await el.updateComplete;

    const hiddenInput = el.querySelector('input[type="submit"]');
    expect(hiddenInput).not.to.exist;
  });

  test('does not add a hidden light DOM input if type set to button', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button .type=${'button'}>Submit</ia-button>`,
    );

    await el.updateComplete;

    const hiddenInput = el.querySelector('input[type="submit"]');
    expect(hiddenInput).not.to.exist;
  });

  test('disables the button if requested', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button ?disabled=${true}>Submit</ia-button>`,
    );

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.disabled).to.equal(true);
  });

  describe('shadow root text nodes', () => {
    // A text node at the top of the shadow root renders as a space when the
    // host is display:inline, so there must be none.
    const textNodes = (el: IAButton) =>
      Array.from(el.shadowRoot!.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE,
      );

    test('has none for a plain button', async () => {
      const el = await fixture<IAButton>(
        html`<ia-button style="display: inline">Write</ia-button>`,
      );
      expect(textNodes(el)).toHaveLength(0);
    });

    test('has none when wrapped in a link', async () => {
      const el = await fixture<IAButton>(
        html`<ia-button href="/foo">Write</ia-button>`,
      );
      expect(textNodes(el)).toHaveLength(0);
    });
  });
});
