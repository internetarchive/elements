import { describe, expect, it, vi } from 'vitest';
import { UserListsService } from './userlist-service';
import { UserListsError, UserListsErrorReason } from './userlist-error';
import type { UserList, UserListMember } from './models';
import { SearchType } from '../search-service/search-type';
import type { SearchServiceInterface } from '../search-service/search-service-interface';
import type { UserServiceInterface } from '../user-service/user-service';

const member: UserListMember = {
  member_id: '1',
  identifier: 'goody',
  date_added: new Date('2025-01-01T00:00:00Z'),
};

const list: UserList = {
  id: 'abc',
  list_name: 'My list',
  description: 'Things I like',
  is_private: false,
  date_created: new Date('2025-01-01T00:00:00Z'),
  date_updated: new Date('2025-01-02T00:00:00Z'),
  count: 1,
  members: [member],
};

/**
 * A service wired to fakes. `answer` is what the fetch handler resolves with,
 * or, when it's an Error, what it rejects with.
 */
function setup(
  options: {
    answer?: unknown;
    loggedInAs?: string;
    searchResult?: Awaited<ReturnType<SearchServiceInterface['search']>>;
    baseUrl?: string;
  } = {},
) {
  const answer = 'answer' in options ? options.answer : { success: true };
  const fetchApiResponse = vi.fn(async () => {
    if (answer instanceof Error) throw answer;
    return answer;
  });
  const getLoggedInUser = vi.fn(async () =>
    options.loggedInAs
      ? { success: { itemname: options.loggedInAs } }
      : { error: new Error('not logged in') },
  );
  const search = vi.fn(
    async () =>
      options.searchResult ?? {
        success: { response: { results: [{ identifier: 'goody' }] } },
      },
  );
  const service = new UserListsService({
    fetchHandler: { fetchApiResponse } as unknown as ConstructorParameters<
      typeof UserListsService
    >[0]['fetchHandler'],
    userService: { getLoggedInUser } as unknown as UserServiceInterface,
    searchService: { search } as unknown as SearchServiceInterface,
    baseUrl: options.baseUrl,
  });
  /** The url and options of the one request the service made. */
  const request = () => {
    expect(fetchApiResponse).toHaveBeenCalledTimes(1);
    const [url, init] = fetchApiResponse.mock.calls[0] as unknown as [
      string,
      {
        method?: string;
        body?: string;
        headers?: Record<string, string>;
        includeCredentials?: boolean;
      },
    ];
    return { url, init };
  };
  return { service, fetchApiResponse, search, request };
}

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };

/** The es2021 lib doesn't type `Error.cause`, though browsers set it. */
const causeOf = (error?: Error) =>
  (error as { cause?: unknown } | undefined)?.cause;

describe('UserListsService', () => {
  describe('reading lists', () => {
    it('fetches the lists of another user by their id', async () => {
      const { service, request } = setup({
        answer: { success: true, value: [list] },
        loggedInAs: '@brewster',
      });

      const result = await service.fetchListsForUser('@someone');

      expect(result.success).to.deep.equal([list]);
      expect(request().url).to.equal(
        'https://archive.org/services/users/@someone/lists',
      );
    });

    it("uses 'me' in place of the logged-in user's own id", async () => {
      const { service, request } = setup({ loggedInAs: '@brewster' });

      await service.fetchListsForUser('@brewster');

      expect(request().url).to.equal(
        'https://archive.org/services/users/me/lists',
      );
    });

    it('uses the id as given when no one is logged in', async () => {
      const { service, request } = setup();

      await service.fetchListsForUser('@brewster');

      expect(request().url).to.equal(
        'https://archive.org/services/users/@brewster/lists',
      );
    });

    it('sends credentials and no method or body on a read', async () => {
      const { service, request } = setup();

      await service.fetchList('@brewster', 'abc');

      expect(request().init).to.deep.equal({
        method: undefined,
        body: undefined,
        headers: undefined,
        includeCredentials: true,
      });
    });

    it('fetches one list', async () => {
      const { service, request } = setup({
        answer: { success: true, value: list },
      });

      const result = await service.fetchList('@brewster', 'abc');

      expect(result.success).to.deep.equal(list);
      expect(request().url).to.equal(
        'https://archive.org/services/users/@brewster/lists/abc',
      );
    });

    it("fetches the current user's lists flagged for an item", async () => {
      const { service, request } = setup({
        answer: { success: true, value: [{ ...list, item_is_member: true }] },
      });

      const result = await service.fetchOwnListsContainingItem('goody');

      expect(result.success?.[0].item_is_member).to.equal(true);
      expect(request().url).to.equal(
        'https://archive.org/services/users/me/lists?item=goody',
      );
    });

    it('builds urls on a custom base url', async () => {
      const { service, request } = setup({ baseUrl: 'https://example.org' });

      await service.fetchList('@brewster', 'abc');

      expect(request().url).to.equal(
        'https://example.org/services/users/@brewster/lists/abc',
      );
    });
  });

  describe('fetchListMembers', () => {
    it("returns the list's members", async () => {
      const { service } = setup({ answer: { success: true, value: list } });

      const result = await service.fetchListMembers('@brewster', 'abc');

      expect(result.success).to.deep.equal([member]);
    });

    it('passes on the error when the list fetch fails', async () => {
      const { service } = setup({ answer: { success: false, error: 'nope' } });

      const result = await service.fetchListMembers('@brewster', 'abc');

      expect(result.error?.reason).to.equal(
        UserListsErrorReason.LIST_NOT_FOUND,
      );
    });

    it('throws a bad response error when the list has no members array', async () => {
      const { service } = setup({
        answer: { success: true, value: { ...list, members: undefined } },
      });

      const thrown = await service
        .fetchListMembers('@brewster', 'abc')
        .catch((err: unknown) => err);

      expect(thrown).to.be.instanceOf(UserListsError);
      expect((thrown as UserListsError).reason).to.equal(
        UserListsErrorReason.BAD_RESPONSE,
      );
    });
  });

  describe('fetchListMemberSearchResults', () => {
    it('searches metadata for every member identifier', async () => {
      const { service, search } = setup({
        answer: {
          success: true,
          value: {
            ...list,
            members: [member, { ...member, identifier: 'other' }],
          },
        },
      });

      const result = await service.fetchListMemberSearchResults(
        '@brewster',
        'abc',
      );

      expect(result.success).to.deep.equal([{ identifier: 'goody' }]);
      expect(search).toHaveBeenCalledWith(
        {
          query: 'identifier:(goody OR other)',
          rows: 2,
          aggregations: { omit: true },
        },
        SearchType.METADATA,
      );
    });

    it('returns no results without searching when the list is empty', async () => {
      const { service, search } = setup({
        answer: { success: true, value: { ...list, members: [] } },
      });

      const result = await service.fetchListMemberSearchResults(
        '@brewster',
        'abc',
      );

      expect(result.success).to.deep.equal([]);
      expect(search).not.toHaveBeenCalled();
    });

    it('passes on a search error', async () => {
      const searchError = new Error('search failed');
      const { service } = setup({
        answer: { success: true, value: list },
        searchResult: { error: searchError } as Awaited<
          ReturnType<SearchServiceInterface['search']>
        >,
      });

      const result = await service.fetchListMemberSearchResults(
        '@brewster',
        'abc',
      );

      expect(result.error).to.equal(searchError);
    });

    it('passes on the error when the members fetch fails', async () => {
      const { service, search } = setup({
        answer: { success: false, error: 'nope' },
      });

      const result = await service.fetchListMemberSearchResults(
        '@brewster',
        'abc',
      );

      expect(result.error).to.be.instanceOf(UserListsError);
      expect(search).not.toHaveBeenCalled();
    });
  });

  describe('writing lists', () => {
    const options = {
      list_name: 'My list',
      description: 'Things I like',
      is_private: true,
    };

    it('creates a list', async () => {
      const { service, request } = setup({
        answer: { success: true, value: list },
      });

      const result = await service.createList(options);

      expect(result.success).to.deep.equal(list);
      const { url, init } = request();
      expect(url).to.equal('https://archive.org/services/users/me/lists');
      expect(init.method).to.equal('POST');
      expect(JSON.parse(init.body!)).to.deep.equal(options);
      expect(init.headers).to.deep.equal(JSON_HEADERS);
      expect(init.includeCredentials).to.equal(true);
    });

    it('updates a list', async () => {
      const { service, request } = setup();

      await service.updateList('abc', { list_name: 'Renamed' });

      const { url, init } = request();
      expect(url).to.equal('https://archive.org/services/users/me/lists/abc');
      expect(init.method).to.equal('PATCH');
      expect(JSON.parse(init.body!)).to.deep.equal({ list_name: 'Renamed' });
      expect(init.headers).to.deep.equal(JSON_HEADERS);
    });

    it('deletes a list', async () => {
      const { service, request } = setup({
        answer: { success: true, value: true },
      });

      const result = await service.deleteList('abc');

      expect(result.success).to.equal(true);
      const { url, init } = request();
      expect(url).to.equal('https://archive.org/services/users/me/lists/abc');
      expect(init.method).to.equal('DELETE');
      expect(init.body).to.equal(undefined);
    });

    it('adds a member to a list', async () => {
      const { service, request } = setup({
        answer: { success: true, value: member },
      });

      const result = await service.addMemberToList('abc', {
        identifier: 'goody',
        file: 'goody.pdf',
      });

      expect(result.success).to.deep.equal(member);
      const { url, init } = request();
      expect(url).to.equal(
        'https://archive.org/services/users/me/lists/abc/members',
      );
      expect(init.method).to.equal('POST');
      expect(JSON.parse(init.body!)).to.deep.equal({
        identifier: 'goody',
        file: 'goody.pdf',
      });
      expect(init.headers).to.deep.equal(JSON_HEADERS);
    });

    it('removes a member from a list', async () => {
      const { service, request } = setup();

      await service.removeMemberFromList('abc', '1');

      const { url, init } = request();
      expect(url).to.equal(
        'https://archive.org/services/users/me/lists/abc/members/1',
      );
      expect(init.method).to.equal('DELETE');
    });

    it('removes several members from a list at once', async () => {
      const { service, request } = setup();

      await service.removeBulkMembersFromList('abc', ['1', '2']);

      const { url, init } = request();
      expect(url).to.equal(
        'https://archive.org/services/users/me/lists/abc/members',
      );
      expect(init.method).to.equal('PATCH');
      expect(JSON.parse(init.body!)).to.deep.equal({ remove: ['1', '2'] });
      expect(init.headers).to.deep.equal(JSON_HEADERS);
    });
  });

  describe('errors', () => {
    it("turns the backend's failure into a list not found error", async () => {
      const { service } = setup({
        answer: { success: false, error: 'List limit reached' },
      });

      const result = await service.createList({
        list_name: 'One too many',
        description: '',
        is_private: false,
      });

      expect(result.success).to.equal(undefined);
      expect(result.error).to.be.instanceOf(UserListsError);
      expect(result.error?.reason).to.equal(
        UserListsErrorReason.LIST_NOT_FOUND,
      );
      expect(result.error?.message).to.equal('List limit reached');
      expect(causeOf(result.error)).to.equal('List limit reached');
    });

    it('turns a failed request into a network error', async () => {
      const failure = new TypeError('Failed to fetch');
      const { service } = setup({ answer: failure });

      const result = await service.fetchList('@brewster', 'abc');

      expect(result.error?.reason).to.equal(UserListsErrorReason.NETWORK);
      expect(result.error?.message).to.equal('Failed to fetch');
      expect(causeOf(result.error)).to.equal(failure);
    });

    it('falls back to a generic message for a non-error failure', async () => {
      const { service } = setup({ answer: { success: false, error: 42 } });

      const result = await service.fetchList('@brewster', 'abc');

      expect(result.error?.message).to.equal('Unknown error');
    });
  });
});

describe('UserListsError', () => {
  it('is an Error carrying its reason, message and cause', () => {
    const cause = new Error('underlying');
    const error = new UserListsError(
      UserListsErrorReason.USER_NOT_FOUND,
      'no such user',
      { cause },
    );

    expect(error).to.be.instanceOf(Error);
    expect(error.reason).to.equal('user with the given id was not found');
    expect(error.message).to.equal('no such user');
    expect(causeOf(error)).to.equal(cause);
  });

  it('keeps the reason values consumers compare against', () => {
    expect(UserListsErrorReason).to.deep.equal({
      NETWORK: 'failed to connect to user lists backend service',
      BAD_RESPONSE: 'malformed response from backend',
      USER_NOT_FOUND: 'user with the given id was not found',
      LIST_NOT_FOUND: 'user list with the given id was not found',
      LIST_MEMBER_NOT_FOUND: 'user list member with the given id was not found',
      ITEM_NOT_TOUND: 'item with the given id was not found',
    });
  });
});
