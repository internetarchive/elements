import { fixture } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { UserListsServiceStory } from './user-lists-service-story';
import './user-lists-service-story';

async function run(
  options: {
    call?: string;
    live?: boolean;
    fields?: Record<string, string>;
  } = {},
) {
  const el = await fixture<UserListsServiceStory>(
    html`<user-lists-service-story></user-lists-service-story>`,
  );
  const root = el.shadowRoot!;
  if (options.call) {
    const select = root.querySelector('select') as HTMLSelectElement;
    select.value = options.call;
    select.dispatchEvent(new Event('change'));
    await el.updateComplete;
  }
  for (const [name, value] of Object.entries(options.fields ?? {})) {
    const input = root.querySelector(
      `input[name="${name}"]`,
    ) as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
  if (options.live) {
    const check = root.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    check.checked = false;
    check.dispatchEvent(new Event('change'));
  }
  (root.querySelector('form') as HTMLFormElement).requestSubmit();
  await vi.waitFor(() => {
    if (!root.querySelector('.output')) throw new Error('still running');
  });
  await el.updateComplete;
  return {
    call: root.querySelector('.call')?.textContent,
    request: root.querySelector('.request')?.textContent,
    output: root.querySelector('.output')?.textContent ?? '',
  };
}

describe('user-lists-service story', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('lists the public interface, not the implementation', async () => {
    const el = await fixture<UserListsServiceStory>(
      html`<user-lists-service-story></user-lists-service-story>`,
    );
    const { apiSource } = el.shadowRoot!.querySelector(
      'service-template',
    ) as unknown as { apiSource: string };

    expect(apiSource).to.contain('export interface UserListsServiceInterface');
    expect(apiSource).to.contain('export declare class UserListsService');
    expect(apiSource).to.contain('export interface UserList ');
    expect(apiSource).to.contain('class UserListsError');
    expect(apiSource).not.to.contain('fetchEndpoint');
    expect(apiSource).not.to.match(/^\s*private /m);
  });

  test('shows nothing until it is run', async () => {
    const el = await fixture<UserListsServiceStory>(
      html`<user-lists-service-story></user-lists-service-story>`,
    );

    expect(el.shadowRoot!.querySelector('.output')).to.be.null;
  });

  test("fetches the typed user's lists from the sample data", async () => {
    const shown = await run({ fields: { userId: '@someone' } });

    expect(shown.call).to.equal('fetchListsForUser("@someone")');
    expect(shown.request).to.equal(
      'GET https://archive.org/services/users/@someone/lists',
    );
    expect(JSON.parse(shown.output)[0].list_name).to.equal('Sample list');
  });

  test('fetches one list with its members', async () => {
    const shown = await run({
      call: 'fetchList',
      fields: { userId: '@someone', listId: 'xyz' },
    });

    expect(shown.call).to.equal('fetchList("@someone", "xyz")');
    expect(shown.request).to.equal(
      'GET https://archive.org/services/users/@someone/lists/xyz',
    );
    const list = JSON.parse(shown.output);
    expect(list.id).to.equal('xyz');
    expect(list.members).to.have.length(1);
  });

  test('flags the lists containing an item', async () => {
    const shown = await run({
      call: 'fetchOwnListsContainingItem',
      fields: { itemId: 'nasa' },
    });

    expect(shown.request).to.equal(
      'GET https://archive.org/services/users/me/lists?item=nasa',
    );
    expect(JSON.parse(shown.output)[0].item_is_member).to.equal(true);
  });

  test('fetches just the members of a list', async () => {
    const shown = await run({ call: 'fetchListMembers' });

    expect(shown.call).to.equal('fetchListMembers("@brewster", "1")');
    expect(JSON.parse(shown.output)[0].identifier).to.equal('goody');
  });

  test('reports a network error for the live call when the request fails', async () => {
    vi.spyOn(window, 'fetch').mockRejectedValue(new TypeError('offline'));

    const shown = await run({ live: true });

    expect(shown.output).to.match(
      /^error: failed to connect to user lists backend service/,
    );
  });
});
