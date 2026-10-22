import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test, vi } from 'vitest';
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

  test('renders a link styled as a button if href provided', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button href="https://archive.org/foo">Go</ia-button>`,
    );

    const link = el.shadowRoot?.querySelector('a');
    expect(link).to.exist;
    expect(link?.href).to.equal('https://archive.org/foo');
    expect(link?.getAttribute('part')).to.equal('button');
    // One focus stop: no button nested inside the link.
    expect(el.shadowRoot?.querySelector('button')).to.not.exist;
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
    expect(link?.rel).to.equal('noopener');
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
    expect(button?.getAttribute('aria-busy')).to.equal('true');
    expect(button?.getAttribute('aria-disabled')).to.equal('true');
    expect(button?.innerText).to.equal('');

    const loadingIndicator = button?.querySelector('.loading-indicator');
    expect(loadingIndicator).to.exist;
  });

  test('keeps its width while loading', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button>Save Changes</ia-button>`,
    );
    const button = el.shadowRoot?.querySelector('button') as HTMLElement;
    const before = button.getBoundingClientRect().width;

    el.loading = true;
    await el.updateComplete;

    expect(button.getBoundingClientRect().width).to.equal(before);
  });

  test('shows text next to the loading indicator if requested', async () => {
    const el = await fixture<IAButton>(html`
      <ia-button ?loading=${true} .loadingText=${'Loading...'}>
        Submit
      </ia-button>
    `);

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-disabled')).to.equal('true');
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

  test('disables the button if requested, keeping it in the tab order', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button ?disabled=${true}>Submit</ia-button>`,
    );

    const button = el.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-disabled')).to.equal('true');
    // aria-disabled rather than disabled, so a keyboard user can still reach
    // it and find out why it won't act (D-32).
    expect(button?.disabled).to.equal(false);
  });

  test('keeps the clicks of a disabled button from its listeners', async () => {
    const onClick = vi.fn();
    const el = await fixture<IAButton>(
      html`<ia-button ?disabled=${true} @click=${onClick}>Submit</ia-button>`,
    );

    el.shadowRoot?.querySelector('button')?.click();
    expect(onClick).not.toHaveBeenCalled();

    el.disabled = false;
    await el.updateComplete;
    el.shadowRoot?.querySelector('button')?.click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  test('does not submit its form while disabled or loading', async () => {
    const onSubmit = vi.fn((e: Event) => e.preventDefault());
    const form = await fixture<HTMLFormElement>(html`
      <form @submit=${onSubmit}>
        <ia-button type="submit" ?disabled=${true}>Submit</ia-button>
      </form>
    `);
    const el = form.querySelector('ia-button') as IAButton;
    await el.updateComplete;

    el.shadowRoot?.querySelector('button')?.click();
    el.disabled = false;
    el.loading = true;
    await el.updateComplete;
    el.shadowRoot?.querySelector('button')?.click();
    expect(onSubmit).not.toHaveBeenCalled();

    el.loading = false;
    await el.updateComplete;
    el.shadowRoot?.querySelector('button')?.click();
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  test('takes the disabled colors when disabled', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button ?disabled=${true}>Submit</ia-button>`,
    );
    const style = getComputedStyle(
      el.shadowRoot?.querySelector('button') as HTMLElement,
    );
    expect(style.backgroundColor).to.equal('rgb(102, 102, 102)');
    expect(style.color).to.equal('rgb(255, 255, 255)');
    expect(style.opacity).to.equal('1');
  });

  test.each([
    ['sm', 30],
    ['md', 36],
    ['lg', 44],
  ] as const)('is %s: %ipx tall', async (size, height) => {
    const el = await fixture<IAButton>(
      html`<ia-button .size=${size}>Go</ia-button>`,
    );
    const button = el.shadowRoot?.querySelector('button') as HTMLElement;
    expect(button.getBoundingClientRect().height).to.equal(height);
  });

  test('draws the donate mode in the donate colors', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button mode="donate">Donate</ia-button>`,
    );
    const style = getComputedStyle(
      el.shadowRoot?.querySelector('button') as HTMLElement,
    );
    expect(style.backgroundColor).to.equal('rgb(32, 112, 90)');
    expect(style.color).to.equal('rgb(255, 255, 255)');
  });

  test('treats transparent as the old name for ghost', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button mode="transparent">Share</ia-button>`,
    );
    const button = el.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('ghost')).to.be.true;
  });

  test('keeps the link mode at the small height', async () => {
    const el = await fixture<IAButton>(
      html`<ia-button mode="link">Display Reviews</ia-button>`,
    );
    const button = el.shadowRoot?.querySelector('button') as HTMLElement;
    expect(button.getBoundingClientRect().height).to.equal(30);
  });
});
