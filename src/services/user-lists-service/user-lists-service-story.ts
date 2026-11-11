import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/utils/custom-element';
import interfaceSource from './user-lists-service-interface.ts?raw';
import modelsSource from './models.ts?raw';
import errorSource from './user-lists-error.ts?raw';

import '@demo/service-template';
import { UserListsService } from './user-lists-service';
import type { UserList, UserListMember } from './models';
import type { ApiFetchOptions } from '../fetch-handler/fetch-options';
import type { SearchServiceInterface } from '../search-service/search-service-interface';
import type { UserServiceInterface } from '../user-service/user-service';

type Field =
  | 'userId'
  | 'listId'
  | 'itemId'
  | 'memberId'
  | 'memberIds'
  | 'listName'
  | 'description'
  | 'isPrivate';

/** Each method the console can run, and the inputs it takes. */
const METHODS = {
  fetchListsForUser: ['userId'],
  fetchList: ['userId', 'listId'],
  fetchOwnListsContainingItem: ['itemId'],
  fetchListMembers: ['userId', 'listId'],
  fetchListMemberSearchResults: ['userId', 'listId'],
  createList: ['listName', 'description', 'isPrivate'],
  updateList: ['listId', 'listName', 'description', 'isPrivate'],
  deleteList: ['listId'],
  addMemberToList: ['listId', 'itemId'],
  removeMemberFromList: ['listId', 'memberId'],
  removeBulkMembersFromList: ['listId', 'memberIds'],
} as const satisfies Record<string, readonly Field[]>;

type Method = keyof typeof METHODS;

const TEXT_FIELDS: Record<
  Exclude<Field, 'isPrivate'>,
  { label: string; placeholder: string }
> = {
  userId: { label: 'User id', placeholder: '@brewster' },
  listId: { label: 'List id', placeholder: '1' },
  itemId: { label: 'Item identifier', placeholder: 'goody' },
  memberId: { label: 'Member id', placeholder: '1' },
  memberIds: { label: 'Member ids (comma separated)', placeholder: '1, 2' },
  listName: { label: 'List name', placeholder: 'My new list' },
  description: { label: 'Description', placeholder: 'Things I like' },
};

/** The user the sample data treats as signed in. */
const SIGNED_IN_USER = '@brewster';

const USAGE = `import { UserListsService } from '@internetarchive/elements/services/user-lists-service/user-lists-service';
import { FetchHandler } from '@internetarchive/elements/services/fetch-handler/fetch-handler';
import { SearchService } from '@internetarchive/elements/services/search-service/search-service';
import { UserService } from '@internetarchive/elements/services/user-service/user-service';

const service = new UserListsService({
  fetchHandler: new FetchHandler(),
  searchService: SearchService.default,
  userService: new UserService(),
});

const { success: list, error } = await service.createList({
  list_name: 'My list',
  description: 'Things I like',
  is_private: false,
});
if (error) console.log(error.reason); // e.g. UserListsErrorReason.NETWORK
else console.log(list.id);`;

/** Strips the import statements, which are noise in the API listing. */
const withoutImports = (source: string) =>
  source.replace(/^import[\s\S]*?from '[^']+';\n/gm, '').trim();

/** What a consumer calls, without the implementation behind it. */
const SERVICE_CLASS = `export declare class UserListsService implements UserListsServiceInterface {
  constructor(options: {
    fetchHandler: { fetchApiResponse<T>(url: string, options?: ApiFetchOptions): Promise<T> };
    searchService: SearchServiceInterface;
    userService: UserServiceInterface;
    baseUrl?: string; // defaults to https://archive.org
  });
}`;

const API_SOURCE = [interfaceSource, SERVICE_CLASS, modelsSource, errorSource]
  .map(withoutImports)
  .join('\n\n');

const NOW = '2025-01-02T00:00:00.000Z';

/** A member as the backend sends it, dates as strings. */
const sampleMember = (member_id: string, identifier: string) =>
  ({ member_id, identifier, date_added: NOW }) as unknown as UserListMember;

/**
 * Stands in for the archive.org lists endpoints, holding the signed-in user's
 * lists in memory so writes show up in later reads. Notes each request it
 * gets. It never touches the network.
 */
class SampleListsBackend {
  last?: string;

  private nextListId = 3;

  private nextMemberId = 3;

  private lists: UserList[] = [
    {
      id: '1',
      list_name: 'Favorite books',
      description: 'Books worth reading twice',
      is_private: false,
      date_created: NOW,
      date_updated: NOW,
      count: 2,
      members: [sampleMember('1', 'goody'), sampleMember('2', 'alice')],
    },
    {
      id: '2',
      list_name: 'To watch',
      description: '',
      is_private: true,
      date_created: NOW,
      date_updated: NOW,
      count: 0,
      members: [],
    },
  ] as unknown as UserList[];

  async fetchApiResponse<T>(url: string, options?: ApiFetchOptions) {
    const method = options?.method ?? 'GET';
    const body =
      typeof options?.body === 'string' ? JSON.parse(options.body) : undefined;
    this.last = `${method} ${url}${body ? `\n${JSON.stringify(body)}` : ''}`;
    return this.answer(method, new URL(url), body) as T;
  }

  private answer(method: string, url: URL, body: Record<string, unknown>) {
    const [, user, listId, onMembers, memberId] =
      url.pathname.match(
        /^\/services\/users\/([^/]+)\/lists(?:\/([^/]+))?(\/members)?(?:\/([^/]+))?$/,
      ) ?? [];
    if (user !== 'me' && user !== SIGNED_IN_USER) {
      return { success: false, error: `User ${user} not found` };
    }

    if (!listId) {
      if (method === 'POST') return this.ok(this.create(body));
      const item = url.searchParams.get('item');
      return this.ok(
        this.lists.map(({ members, ...list }) =>
          item
            ? {
                ...list,
                item_is_member: !!members?.some((m) => m.identifier === item),
              }
            : list,
        ),
      );
    }

    const list = this.lists.find((l) => l.id === listId);
    if (!list) return { success: false, error: `List ${listId} not found` };

    if (onMembers) {
      if (method === 'POST') {
        return this.ok(this.addMember(list, body as { identifier: string }));
      }
      const remove =
        method === 'DELETE' ? [memberId] : (body.remove as string[]);
      list.members = list.members?.filter((m) => !remove.includes(m.member_id));
      return this.ok(this.touch(list));
    }
    if (method === 'PATCH')
      return this.ok(this.touch(Object.assign(list, body)));
    if (method === 'DELETE') {
      this.lists = this.lists.filter((l) => l !== list);
      return this.ok(true);
    }
    return this.ok(list);
  }

  private create(options: Partial<UserList>) {
    const list = {
      id: String(this.nextListId++),
      list_name: '',
      description: '',
      is_private: false,
      ...options,
      date_created: NOW,
      date_updated: NOW,
      count: 0,
      members: [],
    } as unknown as UserList;
    this.lists.push(list);
    return list;
  }

  private addMember(list: UserList, options: { identifier: string }) {
    const member = sampleMember(
      String(this.nextMemberId++),
      options.identifier,
    );
    list.members = [...(list.members ?? []), member];
    this.touch(list);
    return member;
  }

  private touch(list: UserList) {
    list.count = list.members?.length ?? 0;
    return list;
  }

  private ok(value: unknown) {
    return { success: true, value };
  }
}

/** Answers the member search with a title per identifier. */
const sampleSearchService = {
  async search(params: { query: string }) {
    const identifiers = params.query
      .replace(/^identifier:\(|\)$/g, '')
      .split(' OR ');
    return {
      success: {
        response: {
          results: identifiers.map((identifier) => ({
            identifier,
            title: `Sample title for ${identifier}`,
          })),
        },
      },
    };
  },
} as unknown as SearchServiceInterface;

const sampleUserService = {
  async getLoggedInUser() {
    return { success: { itemname: SIGNED_IN_USER } };
  },
} as unknown as UserServiceInterface;

@customElement('user-lists-service-story')
export class UserListsServiceStory extends LitElement {
  @state() private method: Method = 'fetchListsForUser';

  @state() private values: Record<Exclude<Field, 'isPrivate'>, string> = {
    userId: '',
    listId: '',
    itemId: '',
    memberId: '',
    memberIds: '',
    listName: '',
    description: '',
  };

  @state() private isPrivate = false;

  @state() private running = false;

  @state() private result?: { call: string; request?: string; output: string };

  private backend = new SampleListsBackend();

  private service = new UserListsService({
    fetchHandler: this.backend,
    searchService: sampleSearchService,
    userService: sampleUserService,
  });

  render() {
    const fields: readonly Field[] = METHODS[this.method];
    return html`
      <service-template
        serviceName="user-lists-service"
        .usage=${USAGE}
        .apiSource=${API_SOURCE}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Method
            <select @change=${this.pickMethod}>
              ${Object.keys(METHODS).map(
                (method) =>
                  html`<option
                    value=${method}
                    ?selected=${this.method === method}
                  >
                    ${method}
                  </option>`,
              )}
            </select>
          </label>
          ${fields.map((field) =>
            field === 'isPrivate'
              ? html`<label class="check">
                  <input
                    type="checkbox"
                    name="isPrivate"
                    .checked=${this.isPrivate}
                    @change=${(e: Event) =>
                      (this.isPrivate = (e.target as HTMLInputElement).checked)}
                  />
                  Private
                </label>`
              : this.textField(field),
          )}
          <button type="submit" ?disabled=${this.running}>Run</button>
          <button type="button" @click=${this.reset}>Reset sample data</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result
              ? html`<code class="call">${this.result.call}</code>
                  ${this.result.request
                    ? html`<pre class="request">${this.result.request}</pre>`
                    : nothing}
                  <pre class="output">${this.result.output}</pre>`
              : nothing}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Reads and edits a user's lists through
            <code>/services/users/…/lists</code>. This console answers from
            sample data held in the page, signed in as
            <code>${SIGNED_IN_USER}</code>, so changes show up in later reads
            and nothing is sent anywhere. archive.org only accepts these
            credentialed requests from archive.org itself, so a live call from
            this page would fail anyway.
          </p>
        </div>
      </service-template>
    `;
  }

  private textField(field: Exclude<Field, 'isPrivate'>) {
    const { label, placeholder } = TEXT_FIELDS[field];
    return html`<label>
      ${label}
      <input
        type="text"
        name=${field}
        placeholder=${placeholder}
        autocomplete="off"
        spellcheck="false"
        .value=${this.values[field]}
        @input=${(e: Event) =>
          (this.values = {
            ...this.values,
            [field]: (e.target as HTMLInputElement).value,
          })}
      />
    </label>`;
  }

  private pickMethod(e: Event) {
    this.method = (e.target as HTMLSelectElement).value as Method;
    this.result = undefined;
  }

  private reset() {
    this.backend = new SampleListsBackend();
    this.service = new UserListsService({
      fetchHandler: this.backend,
      searchService: sampleSearchService,
      userService: sampleUserService,
    });
    this.result = undefined;
  }

  /** The typed value of a field, or its placeholder when left empty. */
  private value(field: Exclude<Field, 'isPrivate'>) {
    return this.values[field].trim() || TEXT_FIELDS[field].placeholder;
  }

  private async run(e: Event) {
    e.preventDefault();
    const userId = this.value('userId');
    const listId = this.value('listId');
    const options = {
      list_name: this.value('listName'),
      description: this.values.description.trim(),
      is_private: this.isPrivate,
    };
    const memberIds = this.value('memberIds')
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);

    const s = this.service;
    const calls: Record<
      Method,
      [
        unknown[],
        () => Promise<{
          success?: unknown;
          error?: Error & { reason?: string };
        }>,
      ]
    > = {
      fetchListsForUser: [[userId], () => s.fetchListsForUser(userId)],
      fetchList: [[userId, listId], () => s.fetchList(userId, listId)],
      fetchOwnListsContainingItem: [
        [this.value('itemId')],
        () => s.fetchOwnListsContainingItem(this.value('itemId')),
      ],
      fetchListMembers: [
        [userId, listId],
        () => s.fetchListMembers(userId, listId),
      ],
      fetchListMemberSearchResults: [
        [userId, listId],
        () => s.fetchListMemberSearchResults(userId, listId),
      ],
      createList: [[options], () => s.createList(options)],
      updateList: [[listId, options], () => s.updateList(listId, options)],
      deleteList: [[listId], () => s.deleteList(listId)],
      addMemberToList: [
        [listId, { identifier: this.value('itemId') }],
        () => s.addMemberToList(listId, { identifier: this.value('itemId') }),
      ],
      removeMemberFromList: [
        [listId, this.value('memberId')],
        () => s.removeMemberFromList(listId, this.value('memberId')),
      ],
      removeBulkMembersFromList: [
        [listId, memberIds],
        () => s.removeBulkMembersFromList(listId, memberIds),
      ],
    };
    const [args, invoke] = calls[this.method];
    const call = `${this.method}(${args.map((a) => JSON.stringify(a)).join(', ')})`;

    this.backend.last = undefined;
    this.running = true;
    let output: string;
    try {
      const { success, error } = await invoke();
      output = error
        ? `error: ${error.reason ?? error.name}${error.message ? ` (${error.message})` : ''}`
        : JSON.stringify(success, null, 2);
    } catch (err) {
      output = `threw: ${(err as Error).message || (err as Error).name}`;
    } finally {
      this.running = false;
    }
    this.result = { call, request: this.backend.last, output };
  }

  static get styles(): CSSResultGroup {
    return css`
      form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.5rem;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 0.8rem;
      }

      label.check {
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }

      input[type='text'] {
        min-width: 0;
        width: 12rem;
        max-width: 100%;
      }

      .result[hidden] {
        display: none;
      }

      .result {
        box-sizing: border-box;
        flex-basis: 100%;
        min-width: 0;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 0.5rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 0.85rem;
      }

      .request {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-all;
      }

      .output {
        margin: 0;
        font-weight: 600;
        overflow-x: auto;
      }
    `;
  }
}
