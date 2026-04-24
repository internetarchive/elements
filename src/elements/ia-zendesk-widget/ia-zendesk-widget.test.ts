import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test, vi, afterEach } from 'vitest';
import { html } from 'lit';

import type { IAZendeskWidget } from './ia-zendesk-widget';
import './ia-zendesk-widget';

const WIDGET_SRC = 'https://static.zdassets.com/ekr/snippet.js?key=test-key';

describe('IAZendeskWidget', () => {
  afterEach(() => {
    // Remove any injected ze-snippet between tests
    document.getElementById('ze-snippet')?.remove();
    delete (window as any).zE;
    vi.restoreAllMocks();
  });

  describe('rendering', () => {
    test('renders the Help button', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );
      const btn = el.shadowRoot?.querySelector('.help-widget');
      expect(btn).toBeTruthy();
    });

    test('button is visible by default', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );
      const btn = el.shadowRoot?.querySelector('.help-widget');
      expect(btn?.classList.contains('hidden')).toBe(false);
    });

    test('button shows "Help" label text', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );
      const label = el.shadowRoot?.querySelector('.hidden-sm');
      expect(label?.textContent?.trim()).toBe('Help');
    });

    test('renders question icon when idle', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );
      expect(el.shadowRoot?.querySelector('.icon-question')).toBeTruthy();
      expect(el.shadowRoot?.querySelector('.icon-loader')).toBeFalsy();
    });

    test('renders loader icon when isLoading is true', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );
      (el as any).isLoading = true;
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector('.icon-loader')).toBeTruthy();
      expect(el.shadowRoot?.querySelector('.icon-question')).toBeFalsy();
    });

    test('button gets hidden class when buttonVisible is false', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );
      (el as any).buttonVisible = false;
      await el.updateComplete;
      const btn = el.shadowRoot?.querySelector('.help-widget');
      expect(btn?.classList.contains('hidden')).toBe(true);
    });
  });

  describe('zendeskHelpButtonClicked event', () => {
    test('fires when the Help button is clicked', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );

      // Prevent the real async initiateZenDesk from running past the event
      (el as any).initiateZenDesk = vi.fn(async () => {
        el.dispatchEvent(new Event('zendeskHelpButtonClicked'));
      });

      let fired = false;
      el.addEventListener('zendeskHelpButtonClicked', () => { fired = true; });

      el.shadowRoot?.querySelector<HTMLButtonElement>('.help-widget')?.click();
      await el.updateComplete;

      expect(fired).toBe(true);
    });
  });

  describe('script loading', () => {
    test('injects ze-snippet script on first click', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );

      // Stub waitForZendesk so the test doesn't hang
      (el as any).waitForZendesk = vi.fn().mockResolvedValue(undefined);
      (window as any).zE = vi.fn();

      await (el as any).loadZendeskScript();

      const script = document.getElementById('ze-snippet') as HTMLScriptElement | null;
      expect(script).toBeTruthy();
      expect(script?.src).toContain('test-key');
    });

    test('does not add a second script if ze-snippet already exists', async () => {
      // Pre-inject the script
      const existing = document.createElement('script');
      existing.id = 'ze-snippet';
      document.head.appendChild(existing);

      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );

      await (el as any).loadZendeskScript();

      const scripts = document.querySelectorAll('#ze-snippet');
      expect(scripts.length).toBe(1);
    });
  });

  describe('Zendesk readiness', () => {
    test('waitForZendesk resolves once window.zE is set', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );

      // Set window.zE after a short delay
      setTimeout(() => { (window as any).zE = vi.fn(); }, 50);

      await expect((el as any).waitForZendesk()).resolves.toBeUndefined();
    });

    test('messenger:on listeners are registered only once across multiple clicks', async () => {
      const zeStub = vi.fn();
      (window as any).zE = zeStub;

      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );

      // Skip script loading — zE already present
      (el as any).loadZendeskScript = vi.fn().mockResolvedValue(undefined);
      (el as any).waitForZendesk = vi.fn().mockResolvedValue(undefined);

      await (el as any).initiateZenDesk();
      await (el as any).initiateZenDesk();

      // messenger:on open + close registered once each = 2 calls
      // messenger open called twice = 2 more calls → total 4
      const onCalls = zeStub.mock.calls.filter(c => c[0] === 'messenger:on');
      expect(onCalls.length).toBe(2);
    });
  });

  describe('open / close lifecycle', () => {
    test('hides button and clears loader when open event fires', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );

      let openCallback: (() => void) | undefined;
      (window as any).zE = (target: string, event: string, cb?: () => void) => {
        if (target === 'messenger:on' && event === 'open') openCallback = cb;
      };

      (el as any).loadZendeskScript = vi.fn().mockResolvedValue(undefined);
      (el as any).waitForZendesk = vi.fn().mockResolvedValue(undefined);

      await (el as any).initiateZenDesk();

      expect((el as any).isLoading).toBe(true);

      openCallback?.();
      await el.updateComplete;

      expect((el as any).buttonVisible).toBe(false);
      expect((el as any).isLoading).toBe(false);
    });

    test('restores button visibility when close event fires', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-src=${WIDGET_SRC}></ia-zendesk-widget>`,
      );

      let closeCallback: (() => void) | undefined;
      (window as any).zE = (target: string, event: string, cb?: () => void) => {
        if (target === 'messenger:on' && event === 'close') closeCallback = cb;
      };

      (el as any).loadZendeskScript = vi.fn().mockResolvedValue(undefined);
      (el as any).waitForZendesk = vi.fn().mockResolvedValue(undefined);
      (el as any).buttonVisible = false;

      await (el as any).initiateZenDesk();
      closeCallback?.();

      // Wait for the 1000ms setTimeout inside the close handler
      await new Promise(r => setTimeout(r, 1100));
      await el.updateComplete;

      expect((el as any).buttonVisible).toBe(true);
    });
  });
});
