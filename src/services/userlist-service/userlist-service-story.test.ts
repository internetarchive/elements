import { fixture } from '@open-wc/testing-helpers';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { UserListServiceStory } from './userlist-service-story';
import './userlist-service-story';

let story: UserListServiceStory;

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
    const input = root.querySelector(`[name="${name}"]`) as
      | HTMLInputElement
      | HTMLSelectElement;
    if (input instanceof HTMLSelectElement) {
      input.value = value as string;
      input.dispatchEvent(new Event('change'));
    } else if (typeof value === 'boolean') {
      input.checked = value;
      input.dispatchEvent(new Event('change'));
    } else {
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }
  }
  await story.updateComplete;
  (root.querySelector('form') as HTMLFormElement).requestSubmit();
  // Running clears the last answer, so wait for that before waiting for the
  // new one.
  await story.updateComplete;
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

describe('userlist-service story', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  /** Set by the live tests, which answer fetch themselves. */
  let usesNetwork = false;

  beforeEach(async () => {
    fetchSpy = vi.spyOn(window, 'fetch');
    story = await fixture<UserListServiceStory>(
      html`<userlist-service-story></userlist-service-story>`,
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

    expect(apiSource).to.contain('export interface UserListServiceInterface');
    expect(apiSource).to.contain('export declare class UserListService');
    expect(apiSource).to.contain('export interface UserList ');
    expect(apiSource).to.contain('class UserListError');
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
      [
        ...story.shadowRoot!.querySelectorAll<
          HTMLInputElement | HTMLSelectElement
        >('input, select:not([name="method"], [name="source"])'),
      ].map((i) => i.name);

    expect(names()).to.deep.equal(['userId']);
    await run('createList');
    expect(names()).to.deep.equal(['listName', 'description', 'isPrivate']);
    await run('updateList');
    expect(names()).to.deep.equal([
      'listId',
      'listName',
      'description',
      'privacy',
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

  test('answers in the shape archive.org sends', async () => {
    const shown = await run('fetchList');

    const list = shown.json();
    expect(Object.keys(list)).to.deep.equal([
      'list_name',
      'description',
      'is_private',
      'id',
      'date_created',
      'date_updated',
      'members',
    ]);
    expect(list.id).to.equal(1);
    expect(list.date_created).to.match(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/);
    expect(Object.keys(list.members[0])).to.deep.equal([
      'identifier',
      'member_id',
      'date_added',
    ]);
    expect(list.members[0].member_id).to.equal(1);
  });

  test("includes each list's members in the lists, as the backend does", async () => {
    const shown = await run('fetchListsForUser');

    expect(shown.json()[0].members).to.have.length(2);
  });

  test("reports the backend's error for a user it doesn't know", async () => {
    const shown = await run('fetchListsForUser', { userId: '@someone' });

    // The service passes on the response's `error`, the HTTP status text. The
    // backend's own message, in `value`, isn't part of the result.
    expect(shown.output).to.equal(
      'error: user list with the given id was not found (Not Found)',
    );
  });

  test('fetches one list with its members', async () => {
    const shown = await run('fetchList');

    expect(shown.request).to.equal(
      'GET https://archive.org/services/users/@brewster/lists/1',
    );
    expect(shown.json().members).to.have.length(2);
  });

  test('flags the lists containing an item, with its member id', async () => {
    const shown = await run('fetchOwnListsContainingItem', { itemId: 'alice' });

    expect(shown.request).to.equal(
      'GET https://archive.org/services/users/me/lists?item=alice',
    );
    const [inList, notInList] = shown.json();
    expect(inList).to.include({ item_is_member: true, member_id: 2 });
    expect(notInList.item_is_member).to.equal(false);
    expect(notInList).not.to.have.property('member_id');
  });

  test("searches the list's members, answering with item hits", async () => {
    const shown = await run('fetchListMemberSearchResults');

    expect(
      shown
        .json()
        .map(
          (hit: { rawMetadata: { fields: { title: string } } }) =>
            hit.rawMetadata.fields.title,
        ),
    ).to.deep.equal(['Sample title for goody', 'Sample title for alice']);
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
    expect(created.json()).to.include({
      list_name: 'Road trip',
      description: 'Audiobooks',
      is_private: true,
      id: 3,
    });
    expect(created.json().members).to.deep.equal([]);

    const lists = await run('fetchListsForUser');
    expect(lists.json()).to.have.length(3);
  });

  test('updates a list, answering with the old date_updated as the backend does', async () => {
    const shown = await run('updateList', {
      listId: '2',
      listName: 'Watched',
    });

    expect(shown.request).to.equal(
      'PATCH https://archive.org/services/users/me/lists/2\n' +
        '{"list_name":"Watched"}',
    );
    expect(shown.json().list_name).to.equal('Watched');
    expect(shown.json().date_updated).to.equal('2025-01-02T00:00:00Z');

    const fetched = await run('fetchList', { listId: '2' });
    expect(fetched.json().list_name).to.equal('Watched');
    expect(fetched.json().date_updated).not.to.equal('2025-01-02T00:00:00Z');
  });

  test("keeps date_updated when an update doesn't change anything", async () => {
    await run('updateList', { listId: '2', listName: 'To watch' });

    const fetched = await run('fetchList', { listId: '2' });
    expect(fetched.json().date_updated).to.equal('2025-01-02T00:00:00Z');
  });

  test('shows the new answer when the same method runs again', async () => {
    await run('fetchList', { listId: '1' });
    const second = await run('fetchList', { listId: '2' });

    expect(second.json().list_name).to.equal('To watch');
  });

  test('updates only the fields that are filled in', async () => {
    const shown = await run('updateList', {
      listId: '2',
      description: 'Weekend films',
    });

    expect(shown.call).to.equal(
      'updateList("2", {"description":"Weekend films"})',
    );
    expect(shown.json()).to.include({
      list_name: 'To watch',
      description: 'Weekend films',
      is_private: true,
    });
  });

  test('changes privacy only when one is picked', async () => {
    const shown = await run('updateList', { listId: '2', privacy: 'public' });

    expect(shown.request).to.equal(
      'PATCH https://archive.org/services/users/me/lists/2\n' +
        '{"is_private":false}',
    );
    expect(shown.json()).to.include({
      list_name: 'To watch',
      is_private: false,
    });
  });

  test('deletes a list, answering with the lists that are left', async () => {
    const deleted = await run('deleteList', { listId: '2' });
    expect(deleted.request).to.equal(
      'DELETE https://archive.org/services/users/me/lists/2',
    );
    expect(deleted.json().map((l: { id: number }) => l.id)).to.deep.equal([1]);

    const fetched = await run('fetchList', { listId: '2' });
    expect(fetched.output).to.equal(
      'error: user list with the given id was not found (Not Found)',
    );
  });

  test('adds and removes members', async () => {
    const added = await run('addMemberToList', { listId: '2', itemId: 'nasa' });
    expect(Object.keys(added.json())).to.deep.equal([
      'identifier',
      'member_id',
      'date_added',
    ]);
    expect(added.json()).to.include({ member_id: 1, identifier: 'nasa' });

    const removed = await run('removeMemberFromList', {
      listId: '1',
      memberId: '1',
    });
    expect(removed.request).to.equal(
      'DELETE https://archive.org/services/users/me/lists/1/members/1',
    );
    expect(removed.json().members).to.have.length(1);

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

  test('removes no members when any of them is missing', async () => {
    const shown = await run('removeBulkMembersFromList', {
      listId: '1',
      memberIds: '1, 99',
    });
    expect(shown.output).to.equal(
      'error: user list with the given id was not found (Not Found)',
    );

    const fetched = await run('fetchList');
    expect(fetched.json().members).to.have.length(2);
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
