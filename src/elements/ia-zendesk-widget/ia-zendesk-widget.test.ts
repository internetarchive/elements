import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { html } from 'lit';

import type { IAZendeskWidget } from './ia-zendesk-widget';
import './ia-zendesk-widget';

describe('IAZendeskWidget', () => {
  describe('rendering', () => {
    test('renders the widget title', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget widget-title="Get Help"></ia-zendesk-widget>`,
      );
      const title = el.shadowRoot?.querySelector('.widget-title');
      expect(title?.textContent?.trim()).toBe('Get Help');
    });

    test('renders with default title when none is provided', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget></ia-zendesk-widget>`,
      );
      const title = el.shadowRoot?.querySelector('.widget-title');
      expect(title?.textContent?.trim()).toBe('Contact Support');
    });

    test('renders name, email, subject, and description fields', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget></ia-zendesk-widget>`,
      );
      expect(el.shadowRoot?.querySelector('#name')).toBeDefined();
      expect(el.shadowRoot?.querySelector('#email')).toBeDefined();
      expect(el.shadowRoot?.querySelector('#subject')).toBeDefined();
      expect(el.shadowRoot?.querySelector('#description')).toBeDefined();
    });

    test('renders a submit button with the default label', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget></ia-zendesk-widget>`,
      );
      const btn = el.shadowRoot?.querySelector('.submit-btn');
      expect(btn?.textContent?.trim()).toBe('Submit');
    });

    test('respects a custom submit-label attribute', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget submit-label="Send Ticket"></ia-zendesk-widget>`,
      );
      const btn = el.shadowRoot?.querySelector('.submit-btn');
      expect(btn?.textContent?.trim()).toBe('Send Ticket');
    });
  });

  describe('validation', () => {
    test('shows required errors when form is submitted empty', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget></ia-zendesk-widget>`,
      );
      const form = el.shadowRoot?.querySelector<HTMLFormElement>('.ticket-form');
      form?.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
      await el.updateComplete;

      const errors = el.shadowRoot?.querySelectorAll('.field-error');
      expect(errors?.length).toBeGreaterThan(0);
    });

    test('shows an email validation error for an invalid email', async () => {
      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget></ia-zendesk-widget>`,
      );

      const nameInput = el.shadowRoot?.querySelector<HTMLInputElement>('#name');
      const emailInput = el.shadowRoot?.querySelector<HTMLInputElement>('#email');
      const descInput = el.shadowRoot?.querySelector<HTMLTextAreaElement>('#description');
      if (nameInput) nameInput.value = 'Jane Doe';
      if (emailInput) emailInput.value = 'not-an-email';
      if (descInput) descInput.value = 'Some issue';

      const form = el.shadowRoot?.querySelector<HTMLFormElement>('.ticket-form');
      form?.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
      await el.updateComplete;

      const emailError = el.shadowRoot?.querySelector('#email-error');
      expect(emailError?.textContent).toContain('valid email');
    });
  });

  describe('submission', () => {
    const mockFetch = vi.fn();

    beforeEach(() => {
      vi.stubGlobal('fetch', mockFetch);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    test('calls the Zendesk API with correct payload', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ request: { id: 42 } }),
      });

      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget zendesk-subdomain="testco"></ia-zendesk-widget>`,
      );

      const nameInput = el.shadowRoot?.querySelector<HTMLInputElement>('#name');
      const emailInput = el.shadowRoot?.querySelector<HTMLInputElement>('#email');
      const descInput = el.shadowRoot?.querySelector<HTMLTextAreaElement>('#description');
      if (nameInput) nameInput.value = 'Jane Doe';
      if (emailInput) emailInput.value = 'jane@example.com';
      if (descInput) descInput.value = 'My issue details';

      const form = el.shadowRoot?.querySelector<HTMLFormElement>('.ticket-form');
      form?.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
      await el.updateComplete;

      expect(mockFetch).toHaveBeenCalledWith(
        'https://testco.zendesk.com/api/v2/requests.json',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    });

    test('shows success banner after successful submission', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ request: { id: 99 } }),
      });

      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget zendesk-subdomain="testco"></ia-zendesk-widget>`,
      );

      const nameInput = el.shadowRoot?.querySelector<HTMLInputElement>('#name');
      const emailInput = el.shadowRoot?.querySelector<HTMLInputElement>('#email');
      const descInput = el.shadowRoot?.querySelector<HTMLTextAreaElement>('#description');
      if (nameInput) nameInput.value = 'Jane Doe';
      if (emailInput) emailInput.value = 'jane@example.com';
      if (descInput) descInput.value = 'My issue details';

      const form = el.shadowRoot?.querySelector<HTMLFormElement>('.ticket-form');
      form?.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
      await el.updateComplete;
      // allow async fetch to resolve
      await new Promise(r => setTimeout(r, 0));
      await el.updateComplete;

      const banner = el.shadowRoot?.querySelector('.banner--success');
      expect(banner).toBeTruthy();
      expect(el.shadowRoot?.querySelector('.ticket-form')).toBeNull();
    });

    test('shows error banner when API call fails', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 422 });

      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget zendesk-subdomain="testco"></ia-zendesk-widget>`,
      );

      const nameInput = el.shadowRoot?.querySelector<HTMLInputElement>('#name');
      const emailInput = el.shadowRoot?.querySelector<HTMLInputElement>('#email');
      const descInput = el.shadowRoot?.querySelector<HTMLTextAreaElement>('#description');
      if (nameInput) nameInput.value = 'Jane Doe';
      if (emailInput) emailInput.value = 'jane@example.com';
      if (descInput) descInput.value = 'My issue details';

      const form = el.shadowRoot?.querySelector<HTMLFormElement>('.ticket-form');
      form?.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
      await el.updateComplete;
      await new Promise(r => setTimeout(r, 0));
      await el.updateComplete;

      const banner = el.shadowRoot?.querySelector('.banner--error');
      expect(banner).toBeTruthy();
    });

    test('fires ticketSubmitted event with ticket id and form values', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ request: { id: 77 } }),
      });

      const el = await fixture<IAZendeskWidget>(
        html`<ia-zendesk-widget zendesk-subdomain="testco"></ia-zendesk-widget>`,
      );

      let eventDetail: CustomEvent | undefined;
      el.addEventListener('ticketSubmitted', (e) => {
        eventDetail = e as CustomEvent;
      });

      const nameInput = el.shadowRoot?.querySelector<HTMLInputElement>('#name');
      const emailInput = el.shadowRoot?.querySelector<HTMLInputElement>('#email');
      const descInput = el.shadowRoot?.querySelector<HTMLTextAreaElement>('#description');
      if (nameInput) nameInput.value = 'Jane Doe';
      if (emailInput) emailInput.value = 'jane@example.com';
      if (descInput) descInput.value = 'My issue details';

      const form = el.shadowRoot?.querySelector<HTMLFormElement>('.ticket-form');
      form?.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
      await el.updateComplete;
      await new Promise(r => setTimeout(r, 0));
      await el.updateComplete;

      expect(eventDetail).toBeDefined();
      expect(eventDetail?.detail.ticketId).toBe(77);
      expect(eventDetail?.detail.formValues.name).toBe('Jane Doe');
    });
  });
});
