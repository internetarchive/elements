import type { Result } from '@src/services/result-type/result-type';
import type { SearchResult } from '@src/services/search-service/models/hit-types/hit';
import type { UserListServiceInterface } from '@src/services/userlist-service/userlist-service-interface';
import {
  UserListError,
  UserListErrorReason,
} from '@src/services/userlist-service/userlist-error';
import type {
  UserList,
  UserListMember,
  UserListOptions,
} from '@src/services/userlist-service/models';

/**
 * A user lists service that saves lists in memory. Only `createList` and
 * `updateList` do anything; every other method answers with an error.
 */
export class MockUserListService implements UserListServiceInterface {
  /** Every createList() and updateList() call, in order */
  calls: {
    method: 'createList' | 'updateList';
    listId?: string;
    options: Partial<UserListOptions>;
  }[] = [];

  /** When set, saves fail with this error */
  saveError?: UserListError;

  /** How long a save takes, in milliseconds */
  delay = 0;

  private nextId = 1;

  async createList(
    options: UserListOptions,
  ): Promise<Result<UserList, UserListError>> {
    this.calls.push({ method: 'createList', options });
    return this.respond(this.buildList(String(this.nextId++), options));
  }

  async updateList(
    listId: string,
    options: Partial<UserListOptions>,
  ): Promise<Result<UserList, UserListError>> {
    this.calls.push({ method: 'updateList', listId, options });
    return this.respond(this.buildList(listId, options));
  }

  async fetchListsForUser(): Promise<Result<UserList[], UserListError>> {
    return { error: this.unsupported };
  }

  async fetchList(): Promise<Result<UserList, UserListError>> {
    return { error: this.unsupported };
  }

  async fetchOwnListsContainingItem(): Promise<
    Result<UserList[], UserListError>
  > {
    return { error: this.unsupported };
  }

  async fetchListMembers(): Promise<Result<UserListMember[], UserListError>> {
    return { error: this.unsupported };
  }

  async fetchListMemberSearchResults(): Promise<
    Result<SearchResult[], UserListError>
  > {
    return { error: this.unsupported };
  }

  async deleteList(): Promise<Result<boolean, UserListError>> {
    return { error: this.unsupported };
  }

  async addMemberToList(): Promise<Result<UserListMember, UserListError>> {
    return { error: this.unsupported };
  }

  async removeMemberFromList(): Promise<Result<UserList, UserListError>> {
    return { error: this.unsupported };
  }

  async removeBulkMembersFromList(): Promise<Result<UserList, UserListError>> {
    return { error: this.unsupported };
  }

  private async respond(
    list: UserList,
  ): Promise<Result<UserList, UserListError>> {
    if (this.delay) {
      await new Promise((resolve) => setTimeout(resolve, this.delay));
    }
    return this.saveError ? { error: this.saveError } : { success: list };
  }

  private buildList(id: string, options: Partial<UserListOptions>): UserList {
    const now = new Date();
    return {
      id,
      list_name: options.list_name ?? '',
      description: options.description ?? '',
      is_private: options.is_private ?? false,
      date_created: now,
      date_updated: now,
      count: 0,
    };
  }

  private get unsupported(): UserListError {
    return new UserListError(
      UserListErrorReason.BAD_RESPONSE,
      'MockUserListService only saves lists',
    );
  }
}
