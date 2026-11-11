import { fixture } from '@open-wc/testing-helpers';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { UserListsServiceStory } from './user-lists-service-story';
import './user-lists-service-story';

let story: UserListsServiceStory;

/** Picks a method, fills its inputs, runs it and returns what's shown. */
async function run(
  method: string,
  fields: Record<string, string | boolean> = {},
) {
  const root = story.shadowRoot!;
  const select = root.querySelector(
    'select[name="method"]',
  ) as HTMLSelectElement;
  if (select.value !== method) {
    select.value = method;
    select.dispatchEvent(new Event('change'));
    await story.updateComplete;
  }
  for (const [name, value] of Object.entries(fields)) {
    const input = root.querySelector(
      `input[name="${name}"]`,
    ) as HTMLInputElement;
    if (typeof value === 'boolean') {
      input.checked = value;
      input.dispatchEvent(new Event('change'));
    } else {
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }
  }
  await story.updateComplete;
  (root.querySelector('form') as HTMLFormElement).requestSubmit();
  await vi.waitFor(() => {
    if (!root.querySelector('.output')) throw new Error('still running');
  });
  await story.updateComplete;
  const output = root.querySelector('.output')?.textContent ?? '';
  return {
    call: root.querySelector('.call')?.textContent,
    request: root.querySelector('.request')?.textContent,
    output,
    json: () => JSON.parse(output),
  };
}

describe('user-lists-service story', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  /** Set by the live tests, which answer fetch themselves. */
  let usesNetwork = false;

  beforeEach(async () => {
    fetchSpy = vi.spyOn(window, 'fetch');
    story = await fixture<UserListsServiceStory>(
      html`<user-lists-service-story></user-lists-service-story>`,
    );
  });

  afterEach(() => {
    if (!usesNetwork) expect(fetchSpy).not.toHaveBeenCalled();
    usesNetwork = false;
    vi.restoreAllMocks();
  });

  test('lists the public interface, not the implementation', () => {
    const { apiSource } = story.shadowRoot!.querySelector(
      'service-template',
    ) as unknown as { apiSource: string };

    expect(apiSource).to.contain('export interface UserListsServiceInterface');
    expect(apiSource).to.contain('export declare class UserListsService');
    expect(apiSource).to.contain('export interface UserList ');
    expect(apiSource).to.contain('class UserListsError');
    expect(apiSource).not.to.contain('fetchEndpoint');
    expect(apiSource).not.to.match(/^\s*private /m);
  });

  test('shows nothing until it is run', () => {
    expect(story.shadowRoot!.querySelector('.output')).to.be.null;
  });

  test('offers every method of the service', () => {
    const options = [
      ...story.shadowRoot!.querySelectorAll<HTMLOptionElement>(
        'select[name="method"] option',
      ),
    ].map((o) => o.value);

    expect(options).to.deep.equal([
      'fetchListsForUser',
      'fetchList',
      'fetchOwnListsContainingItem',
      'fetchListMembers',
      'fetchListMemberSearchResults',
      'createList',
      'updateList',
      'deleteList',
      'addMemberToList',
      'removeMemberFromList',
      'removeBulkMembersFromList',
    ]);
  });

  test('shows only the inputs the picked method takes', async () => {
    const names = () =>
      [...story.shadowRoot!.querySelectorAll('input')].map((i) => i.name);

    expect(names()).to.deep.equal(['userId']);
    await run('updateList');
    expect(names()).to.deep.equal([
      'listId',
      'listName',
      'description',
      'isPrivate',
    ]);
  });

  test("fetches the signed-in user's lists as 'me'", async () => {
    const shown = await run('fetchListsForUser');

    expect(shown.call).to.equal('fetchListsForUser("@brewster")');
    expect(shown.request).to.equal(
      'GET https://archive.org/services/users/me/lists',
    );
    expect(
      shown.json().map((l: { list_name: string }) => l.list_name),
    ).to.deep.equal(['Favorite books', 'To watch']);
  });

  test('reports an error for a user with no sample lists', async () => {
    const shown = await run('fetchListsForUser', { userId: '@someone' });

    expect(shown.output).to.equal(
      'error: user list with the given id was not found (User @someone not found)',
    );
  });

  test('fetches one list with its members', async () => {
    const shown = await run('fetchList');

    expect(shown.request).to.equal(
      'GET https://archive.org/services/users/@brewster/lists/1',
    );
    expect(shown.json().members).to.have.length(2);
  });

  test('flags the lists containing an item', async () => {
    const shown = await run('fetchOwnListsContainingItem', { itemId: 'goody' });

    expect(shown.request).to.equal(
      'GET https://archive.org/services/users/me/lists?item=goody',
    );
    expect(
      shown.json().map((l: { item_is_member: boolean }) => l.item_is_member),
    ).to.deep.equal([true, false]);
  });

  test("searches the list's members for their titles", async () => {
    const shown = await run('fetchListMemberSearchResults');

    expect(shown.json()).to.deep.equal([
      { identifier: 'goody', title: 'Sample title for goody' },
      { identifier: 'alice', title: 'Sample title for alice' },
    ]);
  });

  test('creates a list that later reads include', async () => {
    const created = await run('createList', {
      listName: 'Road trip',
      description: 'Audiobooks',
      isPrivate: true,
    });

    expect(created.request).to.equal(
      'POST https://archive.org/services/users/me/lists\n' +
        '{"list_name":"Road trip","description":"Audiobooks","is_private":true}',
    );
    expect(created.json().id).to.equal('3');

    const lists = await run('fetchListsForUser');
    expect(lists.json()).to.have.length(3);
  });

  test('updates a list', async () => {
    const shown = await run('updateList', {
      listId: '2',
      listName: 'Watched',
    });

    expect(shown.request).to.match(
      /^PATCH https:\/\/archive.org\/services\/users\/me\/lists\/2\n/,
    );
    expect(shown.json().list_name).to.equal('Watched');
  });

  test('deletes a list, after which it is not found', async () => {
    const deleted = await run('deleteList', { listId: '2' });
    expect(deleted.request).to.equal(
      'DELETE https://archive.org/services/users/me/lists/2',
    );
    expect(deleted.output).to.equal('true');

    const fetched = await run('fetchList', { listId: '2' });
    expect(fetched.output).to.match(/^error: .*\(List 2 not found\)$/);
  });

  test('adds and removes members', async () => {
    const added = await run('addMemberToList', { listId: '2', itemId: 'nasa' });
    expect(added.json()).to.include({ member_id: '3', identifier: 'nasa' });

    const removed = await run('removeMemberFromList', {
      listId: '1',
      memberId: '1',
    });
    expect(removed.request).to.equal(
      'DELETE https://archive.org/services/users/me/lists/1/members/1',
    );
    expect(removed.json().count).to.equal(1);

    const bulk = await run('removeBulkMembersFromList', {
      listId: '1',
      memberIds: '2',
    });
    expect(bulk.request).to.equal(
      'PATCH https://archive.org/services/users/me/lists/1/members\n' +
        '{"remove":["2"]}',
    );
    expect(bulk.json().members).to.deep.equal([]);
  });

  test('puts the sample data back on reset', async () => {
    await run('deleteList', { listId: '1' });
    (
      story.shadowRoot!.querySelector(
        'button[type="button"]',
      ) as HTMLButtonElement
    ).click();
    await story.updateComplete;

    expect(story.shadowRoot!.querySelector('.output')).to.be.null;
    const lists = await run('fetchListsForUser');
    expect(lists.json()).to.have.length(2);
  });

  describe('real data through the dev proxy', () => {
    async function useLive(answer: unknown) {
      usesNetwork = true;
      fetchSpy.mockImplementation(
        async () =>
          new Response(JSON.stringify(answer), {
            headers: { 'Content-Type': 'application/json' },
          }),
      );
      const source = story.shadowRoot!.querySelector(
        'select[name="source"]',
      ) as HTMLSelectElement;
      source.value = 'live';
      source.dispatchEvent(new Event('change'));
      await story.updateComplete;
    }

    test('offers only the signed-out reads, and no reset', async () => {
      await useLive({ success: true, value: [] });

      const options = [
        ...story.shadowRoot!.querySelectorAll('select[name="method"] option'),
      ].map((o) => (o as HTMLOptionElement).value);
      expect(options).to.deep.equal([
        'fetchListsForUser',
        'fetchList',
        'fetchListMembers',
        'fetchListMemberSearchResults',
      ]);
      expect(story.shadowRoot!.querySelector('button[type="button"]')).to.be
        .null;
    });

    test('falls back to fetchListsForUser when the picked method is not offered', async () => {
      await run('createList');
      await useLive({ success: true, value: [] });

      const method = story.shadowRoot!.querySelector(
        'select[name="method"]',
      ) as HTMLSelectElement;
      expect(method.value).to.equal('fetchListsForUser');
    });

    test('sends the request through /__archive__ and shows the real answer', async () => {
      await useLive({
        success: true,
        value: [{ id: 1, list_name: 'test list' }],
      });

      const shown = await run('fetchListsForUser');

      expect(shown.request).to.equal(
        `GET ${window.location.origin}/__archive__/services/users/@brewster/lists`,
      );
      expect(String(fetchSpy.mock.calls[0][0])).to.contain(
        '/__archive__/services/users/@brewster/lists',
      );
      expect(shown.json()).to.deep.equal([{ id: 1, list_name: 'test list' }]);
    });
  });
});
