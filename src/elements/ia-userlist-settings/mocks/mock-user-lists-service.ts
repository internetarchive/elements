import type { Result } from '@src/services/result-type/result-type';
import type { SearchResult } from '@src/services/search-service/models/hit-types/hit';
import type { UserListsServiceInterface } from '@src/services/user-lists-service/user-lists-service-interface';
import {
  UserListsError,
  UserListsErrorReason,
} from '@src/services/user-lists-service/user-lists-error';
import type {
  UserList,
  UserListMember,
  UserListOptions,
} from '@src/services/user-lists-service/models';

/**
 * A user lists service that saves lists in memory. Only `createList` and
 * `updateList` do anything; every other method answers with an error.
 */
export class MockUserListsService implements UserListsServiceInterface {
  /** Every createList() and updateList() call, in order */
  calls: {
    method: 'createList' | 'updateList';
    listId?: string;
    options: Partial<UserListOptions>;
  }[] = [];

  /** When set, saves fail with this error */
  saveError?: UserListsError;

  /** How long a save takes, in milliseconds */
  delay = 0;

  private nextId = 1;

  async createList(
    options: UserListOptions,
  ): Promise<Result<UserList, UserListsError>> {
    this.calls.push({ method: 'createList', options });
    return this.respond(this.buildList(String(this.nextId++), options));
  }

  async updateList(
    listId: string,
    options: Partial<UserListOptions>,
  ): Promise<Result<UserList, UserListsError>> {
    this.calls.push({ method: 'updateList', listId, options });
    return this.respond(this.buildList(listId, options));
  }

  async fetchListsForUser(): Promise<Result<UserList[], UserListsError>> {
    return { error: this.unsupported };
  }

  async fetchList(): Promise<Result<UserList, UserListsError>> {
    return { error: this.unsupported };
  }

  async fetchOwnListsContainingItem(): Promise<
    Result<UserList[], UserListsError>
  > {
    return { error: this.unsupported };
  }

  async fetchListMembers(): Promise<Result<UserListMember[], UserListsError>> {
    return { error: this.unsupported };
  }

  async fetchListMemberSearchResults(): Promise<
    Result<SearchResult[], UserListsError>
  > {
    return { error: this.unsupported };
  }

  async deleteList(): Promise<Result<boolean, UserListsError>> {
    return { error: this.unsupported };
  }

  async addMemberToList(): Promise<Result<UserListMember, UserListsError>> {
    return { error: this.unsupported };
  }

  async removeMemberFromList(): Promise<Result<UserList, UserListsError>> {
    return { error: this.unsupported };
  }

  async removeBulkMembersFromList(): Promise<Result<UserList, UserListsError>> {
    return { error: this.unsupported };
  }

  private async respond(
    list: UserList,
  ): Promise<Result<UserList, UserListsError>> {
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

  private get unsupported(): UserListsError {
    return new UserListsError(
      UserListsErrorReason.BAD_RESPONSE,
      'MockUserListsService only saves lists',
    );
  }
}
