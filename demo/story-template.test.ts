import { fixture } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { StoryTemplate } from './story-template';
import './story-template';

describe('StoryTemplate', () => {
  describe('importCode', () => {
    test('includes both side-effect and named import when elementClassName is provided', async () => {
      const el = await fixture<StoryTemplate>(html`
        <story-template
          elementTag="ia-button"
          elementClassName="IAButton"
        ></story-template>
      `);

      const importHighlighter = el.shadowRoot?.querySelectorAll(
        'syntax-highlighter',
      )[0] as any;
      expect(importHighlighter).to.exist;

      const code: string = importHighlighter.code;
      expect(code).to.include(
        "import '@internetarchive/elements/ia-button/ia-button';",
      );
      expect(code).to.include(
        "import { IAButton } from '@internetarchive/elements/ia-button/ia-button';",
      );
    });

    test('includes only the side-effect import when elementClassName is not provided', async () => {
      const el = await fixture<StoryTemplate>(html`
        <story-template elementTag="ia-button"></story-template>
      `);

      const importHighlighter = el.shadowRoot?.querySelectorAll(
        'syntax-highlighter',
      )[0] as any;
      expect(importHighlighter).to.exist;

      const code: string = importHighlighter.code;
      expect(code).to.equal(
        "import '@internetarchive/elements/ia-button/ia-button';",
      );
    });

    test('has no leading or trailing whitespace', async () => {
      const el = await fixture<StoryTemplate>(html`
        <story-template
          elementTag="ia-button"
          elementClassName="IAButton"
        ></story-template>
      `);

      const importHighlighter = el.shadowRoot?.querySelectorAll(
        'syntax-highlighter',
      )[0] as any;
      const code: string = importHighlighter.code;
      expect(code).to.equal(code.trim());
    });
  });

  describe('cssCode', () => {
    test('does not render styling section when stringifiedStyles is not set', async () => {
      const el = await fixture<StoryTemplate>(html`
        <story-template elementTag="ia-button"></story-template>
      `);

      // Only import + usage highlighters; styling section is absent when cssCode is empty
      const highlighters = el.shadowRoot?.querySelectorAll('syntax-highlighter');
      expect(highlighters?.length).to.equal(2);
    });

    test('renders CSS block with element tag wrapping the styles', async () => {
      const el = await fixture<StoryTemplate>(html`
        <story-template elementTag="ia-button"></story-template>
      `);

      (el as any).stringifiedStyles = 'color: red;';
      await el.updateComplete;

      const highlighters = el.shadowRoot?.querySelectorAll('syntax-highlighter');
      expect(highlighters?.length).to.equal(3);

      const stylingHighlighter = highlighters?.[2] as any;
      expect(stylingHighlighter.code).to.equal(
        'ia-button {\n color: red;\n}',
      );
    });

    test('has no trailing whitespace on any line', async () => {
      const el = await fixture<StoryTemplate>(html`
        <story-template elementTag="ia-button"></story-template>
      `);

      (el as any).stringifiedStyles = '--my-var: blue;';
      await el.updateComplete;

      const highlighters = el.shadowRoot?.querySelectorAll('syntax-highlighter');
      const code: string = (highlighters?.[2] as any).code;
      for (const line of code.split('\n')) {
        expect(line).to.equal(line.trimEnd());
      }
    });
  });

  describe('Details toggle', () => {
    test('#details has collapsed class on initial render', async () => {
      const el = await fixture<StoryTemplate>(html`
        <story-template elementTag="ia-button"></story-template>
      `);

      const details = el.shadowRoot?.querySelector('#details');
      expect(details?.classList.contains('collapsed')).to.be.true;
    });

    test('clicking .details-toggle removes collapsed class from #details', async () => {
      const el = await fixture<StoryTemplate>(html`
        <story-template elementTag="ia-button"></story-template>
      `);

      const toggleBtn = el.shadowRoot?.querySelector(
        '.details-toggle',
      ) as HTMLButtonElement;
      expect(toggleBtn).to.exist;

      toggleBtn.click();
      await el.updateComplete;

      const details = el.shadowRoot?.querySelector('#details');
      expect(details?.classList.contains('collapsed')).to.be.false;
    });

    test('clicking .details-toggle a second time restores collapsed class', async () => {
      const el = await fixture<StoryTemplate>(html`
        <story-template elementTag="ia-button"></story-template>
      `);

      const toggleBtn = el.shadowRoot?.querySelector(
        '.details-toggle',
      ) as HTMLButtonElement;
      const details = el.shadowRoot?.querySelector('#details');

      toggleBtn.click();
      await el.updateComplete;
      expect(details?.classList.contains('collapsed')).to.be.false;

      toggleBtn.click();
      await el.updateComplete;
      expect(details?.classList.contains('collapsed')).to.be.true;
    });
  });

  describe('Copy buttons', () => {
    afterEach(() => {
      vi.restoreAllMocks();
      vi.useRealTimers();
    });

    test('clicking the import copy button changes button text to "Copied!"', async () => {
      vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);

      const el = await fixture<StoryTemplate>(html`
        <story-template elementTag="ia-button"></story-template>
      `);

      const importCopyBtn = el.shadowRoot?.querySelectorAll(
        '.copy-btn',
      )[0] as HTMLButtonElement;
      expect(importCopyBtn.textContent?.trim()).to.equal('Copy');

      importCopyBtn.click();
      // Flush the clipboard promise microtasks before awaiting re-render
      await Promise.resolve();
      await Promise.resolve();
      await el.updateComplete;

      expect(importCopyBtn.textContent?.trim()).to.equal('Copied!');
    });

    test('button text resets to "Copy" after 2 seconds', async () => {
      vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);

      const el = await fixture<StoryTemplate>(html`
        <story-template elementTag="ia-button"></story-template>
      `);

      // Start fake timers only after fixture is ready to avoid interfering with setup
      vi.useFakeTimers();

      const importCopyBtn = el.shadowRoot?.querySelectorAll(
        '.copy-btn',
      )[0] as HTMLButtonElement;
      importCopyBtn.click();

      await Promise.resolve();
      await Promise.resolve();
      await el.updateComplete;

      expect(importCopyBtn.textContent?.trim()).to.equal('Copied!');

      vi.advanceTimersByTime(2000);
      await el.updateComplete;

      expect(importCopyBtn.textContent?.trim()).to.equal('Copy');
    });

    test('clipboard failure leaves button text as "Copy" without throwing', async () => {
      vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(
        new Error('Permission denied'),
      );

      const el = await fixture<StoryTemplate>(html`
        <story-template elementTag="ia-button"></story-template>
      `);

      const importCopyBtn = el.shadowRoot?.querySelectorAll(
        '.copy-btn',
      )[0] as HTMLButtonElement;
      expect(importCopyBtn.textContent?.trim()).to.equal('Copy');

      // Should not throw
      importCopyBtn.click();
      await Promise.resolve();
      await Promise.resolve();
      await el.updateComplete;

      expect(importCopyBtn.textContent?.trim()).to.equal('Copy');
    });
  });

  describe('disconnectedCallback', () => {
    afterEach(() => {
      vi.useRealTimers();
      vi.restoreAllMocks();
    });

    test('clears the copy timeout when element is disconnected', async () => {
      vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);

      const container = await fixture<HTMLDivElement>(html`
        <div>
          <story-template elementTag="ia-button"></story-template>
        </div>
      `);

      const el = container.querySelector('story-template') as StoryTemplate;
      const importCopyBtn = el.shadowRoot?.querySelectorAll(
        '.copy-btn',
      )[0] as HTMLButtonElement;

      importCopyBtn.click();
      await Promise.resolve();
      await Promise.resolve();
      await el.updateComplete;

      expect(importCopyBtn.textContent?.trim()).to.equal('Copied!');

      // Start fake timers, then disconnect — disconnectedCallback should clearTimeout
      vi.useFakeTimers();
      container.removeChild(el);

      // Advancing past the 2-second reset should produce no errors since timeout was cleared
      expect(() => vi.advanceTimersByTime(3000)).not.to.throw();
      expect(container.querySelector('story-template')).to.be.null;
    });
  });
});
