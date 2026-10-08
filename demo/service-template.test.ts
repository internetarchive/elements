import { fixture } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { ServiceTemplate } from './service-template';
import './service-template';

function clearHash() {
  window.history.replaceState(
    null,
    '',
    window.location.pathname + window.location.search,
  );
}

function highlighters(el: ServiceTemplate): { code: string }[] {
  return Array.from(
    el.shadowRoot?.querySelectorAll('syntax-highlighter') ?? [],
  ) as unknown as { code: string }[];
}

describe('ServiceTemplate', () => {
  afterEach(clearHash);

  test('shows the service name and what was slotted into the console', async () => {
    const el = await fixture<ServiceTemplate>(html`
      <service-template serviceName="field-parsers">
        <p slot="console">the console</p>
      </service-template>
    `);

    expect(el.shadowRoot?.querySelector('h2 code')?.textContent).to.equal(
      'field-parsers',
    );
    const slot = el.shadowRoot?.querySelector(
      'slot[name="console"]',
    ) as HTMLSlotElement;
    expect(slot.assignedElements()[0].textContent).to.equal('the console');
  });

  test('defaults the import to the service under services/', async () => {
    const el = await fixture<ServiceTemplate>(html`
      <service-template serviceName="field-parsers"></service-template>
    `);

    expect(highlighters(el)[0].code).to.equal(
      "import '@internetarchive/elements/services/field-parsers/field-parsers';",
    );
  });

  test('shows the given usage and API source', async () => {
    const el = await fixture<ServiceTemplate>(html`
      <service-template
        serviceName="field-parsers"
        usage="parse('1')"
        apiSource="export type X = 1;"
      ></service-template>
    `);

    const [, usage, api] = highlighters(el);
    expect(usage.code).to.equal("parse('1')");
    expect(api.code).to.equal('export type X = 1;');
  });

  test('starts collapsed, and expands when its toggle is clicked', async () => {
    const el = await fixture<ServiceTemplate>(html`
      <service-template serviceName="field-parsers"></service-template>
    `);
    const toggle = el.shadowRoot?.querySelector(
      '.details-toggle',
    ) as HTMLButtonElement;
    expect(toggle.getAttribute('aria-expanded')).to.equal('false');

    toggle.click();
    await el.updateComplete;

    expect(toggle.getAttribute('aria-expanded')).to.equal('true');
  });

  test('starts expanded when the hash names it', async () => {
    window.history.replaceState(null, '', '#elem-field-parsers');
    const el = await fixture<ServiceTemplate>(html`
      <service-template serviceName="field-parsers"></service-template>
    `);

    const toggle = el.shadowRoot?.querySelector('.details-toggle');
    expect(toggle?.getAttribute('aria-expanded')).to.equal('true');
  });
});
