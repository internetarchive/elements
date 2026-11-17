import type { Result } from '../result-type/result-type';
import { SearchType } from '../search-service/search-type';
import type { SearchResult } from '../search-service/models/hit-types/hit';
import type { SearchServiceInterface } from '../search-service/search-service-interface';
import type { UserServiceInterface } from '../user-service/user-service';
import type { UserListServiceInterface } from './userlist-service-interface';
import type {
  UserList,
  UserListMember,
  UserListMemberOptions,
  UserListOptions,
} from './models';
import { UserListErrorReason, UserListError } from './userlist-error';

/** Required shape of the fetch handler provided to the service */
interface FetchHandlerInterface {
  fetchApiResponse<T>(
    url: string,
    options?: {
      includeCredentials?: boolean;
      method?: string;
      body?: BodyInit;
      headers?: HeadersInit;
    },
  ): Promise<T>;
}

/** Possible well-formed results from the backend service */
type BackendServiceResponse<T> =
  | { success: true; value: T }
  | { success: false; error: string };

/** Options accepted by the userlist service constructor */
type UserListServiceConstructorOptions = {
  fetchHandler: FetchHandlerInterface;
  searchService: SearchServiceInterface;
  userService: UserServiceInterface;
  baseUrl?: string;
};

const JSON_CONTENT_TYPE = 'application/json; charset=utf-8';

/** Service for reading and editing users' lists */
export class UserListService implements UserListServiceInterface {
  private static readonly DEFAULT_BASE_URL = 'https://archive.org';

  private fetchHandler: FetchHandlerInterface;

  private searchService: SearchServiceInterface;

  private userService: UserServiceInterface;

  private baseUrl: string;

  constructor({
    fetchHandler,
    searchService,
    userService,
    baseUrl = UserListService.DEFAULT_BASE_URL,
  }: UserListServiceConstructorOptions) {
    this.fetchHandler = fetchHandler;
    this.searchService = searchService;
    this.userService = userService;
    this.baseUrl = baseUrl;
  }

  private async fetchEndpoint<T>(
    url: string,
    method?: string,
    body?: BodyInit,
    headers?: HeadersInit,
  ): Promise<Result<T, UserListError>> {
    try {
      const fetchResult: BackendServiceResponse<T> =
        await this.fetchHandler.fetchApiResponse(url, {
          method,
          body,
          headers,
          includeCredentials: true,
        });

      if (fetchResult.success) {
        return { success: fetchResult.value };
      }
      return {
        error: UserListService.getErrorResult(
          UserListErrorReason.LIST_NOT_FOUND, // TODO determine the real reason
          fetchResult.error,
        ),
      };
    } catch (err) {
      return {
        error: UserListService.getErrorResult(UserListErrorReason.NETWORK, err),
      };
    }
  }

  /** @inheritdoc */
  async fetchListsForUser(
    userId: string,
  ): Promise<Result<UserList[], UserListError>> {
    // If we are fetching lists for the currently logged-in user, we use 'me' in place of
    // their userid, to better preserve privacy.
    const loggedInUser = (await this.userService.getLoggedInUser())?.success;
    const deidentifiedUserId =
      loggedInUser?.itemname === userId ? 'me' : userId;

    return this.fetchEndpoint<UserList[]>(
      `${this.baseUrl}/services/users/${deidentifiedUserId}/lists`,
    );
  }

  /** @inheritdoc */
  async fetchList(
    userId: string,
    listId: string,
  ): Promise<Result<UserList, UserListError>> {
    return this.fetchEndpoint<UserList>(
      `${this.baseUrl}/services/users/${userId}/lists/${listId}`,
    );
  }

  /** @inheritdoc */
  async fetchOwnListsContainingItem(
    itemId: string,
  ): Promise<Result<UserList[], UserListError>> {
    return this.fetchEndpoint<UserList[]>(
      `${this.baseUrl}/services/users/me/lists?item=${itemId}`,
    );
  }

  async fetchListMembers(
    userId: string,
    listId: string,
  ): Promise<Result<UserListMember[], UserListError>> {
    const listResult = await this.fetchList(userId, listId);
    if (!listResult.success) return listResult as Result<never, UserListError>;

    const { members } = listResult.success;
    if (!members) {
      // The response must contain a members array -- otherwise the response is malformed.
      throw UserListService.getErrorResult(UserListErrorReason.BAD_RESPONSE);
    }

    return { success: members };
  }

  /** @inheritdoc */
  async fetchListMemberSearchResults(
    userId: string,
    listId: string,
  ): Promise<Result<SearchResult[], Error>> {
    const membersResult = await this.fetchListMembers(userId, listId);
    if (!membersResult.success)
      return membersResult as Result<never, UserListError>;

    const members = membersResult.success;
    if (members.length === 0) return { success: [] };

    const identifiersQuery = `identifier:(${members
      .map((m) => m.identifier)
      .join(' OR ')})`;

    const searchResponse = await this.searchService.search(
      {
        query: identifiersQuery,
        rows: members.length,
        aggregations: { omit: true },
      },
      SearchType.METADATA,
    );

    if (searchResponse.success) {
      return { success: searchResponse.success.response.results };
    }
    return { error: searchResponse.error };
  }

  /** @inheritdoc */
  async createList(
    options: UserListOptions,
  ): Promise<Result<UserList, UserListError>> {
    return this.fetchEndpoint<UserList>(
      `${this.baseUrl}/services/users/me/lists`,
      'POST',
      JSON.stringify(options),
      { 'Content-Type': JSON_CONTENT_TYPE },
    );
  }

  /** @inheritdoc */
  async updateList(
    listId: string,
    options: Partial<UserListOptions>,
  ): Promise<Result<UserList, UserListError>> {
    return this.fetchEndpoint<UserList>(
      `${this.baseUrl}/services/users/me/lists/${listId}`,
      'PATCH',
      JSON.stringify(options),
      { 'Content-Type': JSON_CONTENT_TYPE },
    );
  }

  /** @inheritdoc */
  async deleteList(listId: string): Promise<Result<boolean, UserListError>> {
    return this.fetchEndpoint<boolean>(
      `${this.baseUrl}/services/users/me/lists/${listId}`,
      'DELETE',
    );
  }

  /** @inheritdoc */
  async addMemberToList(
    listId: string,
    options: UserListMemberOptions,
  ): Promise<Result<UserListMember, UserListError>> {
    return this.fetchEndpoint<UserListMember>(
      `${this.baseUrl}/services/users/me/lists/${listId}/members`,
      'POST',
      JSON.stringify(options),
      { 'Content-Type': JSON_CONTENT_TYPE },
    );
  }

  /** @inheritdoc */
  async removeMemberFromList(
    listId: string,
    memberId: string,
  ): Promise<Result<UserList, UserListError>> {
    return this.fetchEndpoint<UserList>(
      `${this.baseUrl}/services/users/me/lists/${listId}/members/${memberId}`,
      'DELETE',
    );
  }

  /** @inheritdoc */
  async removeBulkMembersFromList(
    listId: string,
    memberIds: string[],
  ): Promise<Result<UserList, UserListError>> {
    return this.fetchEndpoint<UserList>(
      `${this.baseUrl}/services/users/me/lists/${listId}/members`,
      'PATCH',
      JSON.stringify({ remove: memberIds }),
      { 'Content-Type': JSON_CONTENT_TYPE },
    );
  }

  /** Construct a UserListError with the given reason and underlying error cause */
  private static getErrorResult(reason: UserListErrorReason, err?: unknown) {
    return new UserListError(reason, UserListService.getErrorMessage(err), {
      cause: err,
    });
  }

  /** Extracts a suitable error message from the given input, if possible */
  private static getErrorMessage(err: unknown): string {
    if (err instanceof Error) return err.message;
    if (typeof err === 'string') return err;
    return 'Unknown error';
  }
}
