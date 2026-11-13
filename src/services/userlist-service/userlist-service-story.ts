import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/utils/custom-element';
import interfaceSource from './userlist-service-interface.ts?raw';
import modelsSource from './models.ts?raw';
import errorSource from './userlist-error.ts?raw';

import '@demo/service-template';
import { UserListService } from './userlist-service';
import { FetchHandler } from '../fetch-handler/fetch-handler';
import type { ApiFetchOptions } from '../fetch-handler/fetch-options';
import { SearchService } from '../search-service/search-service';
import { ItemHit } from '../search-service/models/hit-types/item-hit';
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

const USAGE = `import { UserListService } from '@internetarchive/elements/services/userlist-service/userlist-service';
import { FetchHandler } from '@internetarchive/elements/services/fetch-handler/fetch-handler';
import { SearchService } from '@internetarchive/elements/services/search-service/search-service';
import { UserService } from '@internetarchive/elements/services/user-service/user-service';

const service = new UserListService({
  fetchHandler: new FetchHandler(),
  searchService: SearchService.default,
  userService: new UserService(),
});

const { success: list, error } = await service.createList({
  list_name: 'My list',
  description: 'Things I like',
  is_private: false,
});
if (error) console.log(error.reason); // e.g. UserListErrorReason.NETWORK
else console.log(list.id);`;

/** Strips the import statements, which are noise in the API listing. */
const withoutImports = (source: string) =>
  source.replace(/^import[\s\S]*?from '[^']+';\n/gm, '').trim();

/** What a consumer calls, without the implementation behind it. */
const SERVICE_CLASS = `export declare class UserListService implements UserListServiceInterface {
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

/** A timestamp the way the backend writes one, to the second. */
const timestamp = (date = new Date()) =>
  date.toISOString().replace(/\.\d{3}Z$/, 'Z');

const CREATED = '2025-01-02T00:00:00Z';

/** A list member as the backend stores and sends it. */
type SampleMember = {
  identifier: string;
  member_id: number;
  date_added: string;
  file?: string;
  search_term?: string;
};

/** A list as the backend stores and sends it. */
type SampleList = {
  list_name: string;
  description: string | null;
  is_private: boolean | null;
  id: number;
  date_created: string;
  date_updated: string;
  members: SampleMember[];
};

// The backend's own messages and limits, from petabox's
// `Users\ListsService` and `Users\ListsMdApi`.
const INVALID_USER =
  'provided user does not exists or not authorized to execute request.';
const LIST_NOT_FOUND = 'List not found!';
const LIST_MEMBER_NOT_FOUND = 'List member not found!';
const LIST_LIMIT = 100;
const LIST_LIMIT_MSG = 'You have exceeded the maximum number of lists.';
const MEMBER_LIMIT = 1000;
const MEMBER_LIMIT_MSG =
  'You have exceeded the maximum number of members in this list.';

/**
 * Stands in for archive.org's `/services/users/…/lists` endpoints, holding the
 * signed-in user's lists in memory so writes show up in later reads. Each
 * answer has the shape the real backend sends: `{ success: true, value }`, or
 * `{ success: false, error: <HTTP status text>, value: <message> }`, with the
 * same messages, limits and quirks. Notes each request. It never touches the
 * network.
 */
class SampleListsBackend {
  last?: string;

  private latestListId = 2;

  private lists: SampleList[] = [
    {
      list_name: 'Favorite books',
      description: 'Books worth reading twice',
      is_private: false,
      id: 1,
      date_created: CREATED,
      date_updated: CREATED,
      members: [
        { identifier: 'goody', member_id: 1, date_added: CREATED },
        { identifier: 'alice', member_id: 2, date_added: CREATED },
      ],
    },
    {
      list_name: 'To watch',
      description: '',
      is_private: true,
      id: 2,
      date_created: CREATED,
      date_updated: CREATED,
      members: [],
    },
  ];

  async fetchApiResponse<T>(url: string, options?: ApiFetchOptions) {
    const method = options?.method ?? 'GET';
    const body =
      typeof options?.body === 'string' ? JSON.parse(options.body) : {};
    this.last = `${method} ${url}${
      typeof options?.body === 'string' ? `\n${options.body}` : ''
    }`;
    // A copy, so a later write can't change an answer already shown.
    return structuredClone(this.answer(method, new URL(url), body)) as T;
  }

  private answer(method: string, url: URL, body: Record<string, unknown>) {
    const [, user, listId, onMembers, memberId] =
      url.pathname.match(
        /^\/services\/users\/([^/]+)\/lists(?:\/([^/]+))?(\/members)?(?:\/([^/]+))?$/,
      ) ?? [];
    // `me` stands for whoever is signed in. Any other user only exists here
    // if it's the signed-in one, and only they may write to their lists.
    if (user !== 'me' && user !== SIGNED_IN_USER) {
      return this.notFound(INVALID_USER);
    }
    const list = listId
      ? this.lists.find((l) => String(l.id) === listId)
      : undefined;
    if (listId && !list) return this.notFound(LIST_NOT_FOUND);

    switch (method) {
      case 'GET': {
        const item = url.searchParams.get('item');
        if (list) return this.ok(list);
        if (item) return this.ok(this.listsContaining(item));
        return this.ok(this.lists);
      }
      case 'POST':
        return list
          ? this.addMember(list, body)
          : this.create(body as Partial<SampleList>);
      case 'PATCH':
        if (!list) return this.notFound(LIST_NOT_FOUND);
        return onMembers
          ? this.removeMembers(list, body.remove as (string | number)[])
          : this.edit(list, body);
      case 'DELETE':
        if (!list) return this.notFound(LIST_NOT_FOUND);
        if (memberId) return this.removeMembers(list, [memberId]);
        this.lists = this.lists.filter((l) => l !== list);
        // The backend answers with the lists that are left, not `true`.
        return this.ok(this.lists);
      default:
        return this.notFound('invalid set of arguments.');
    }
  }

  /** Every list, flagged with whether it holds the item, and as which member. */
  private listsContaining(identifier: string) {
    return this.lists.map((list) => {
      const member = list.members.find((m) => m.identifier === identifier);
      return member
        ? { ...list, item_is_member: true, member_id: member.member_id }
        : { ...list, item_is_member: false };
    });
  }

  private create(options: Partial<SampleList>) {
    if (this.lists.length >= LIST_LIMIT) return this.badRequest(LIST_LIMIT_MSG);
    const now = timestamp();
    const list: SampleList = {
      list_name: options.list_name ?? '',
      description: options.description ?? null,
      is_private: options.is_private ?? null,
      id: ++this.latestListId,
      date_created: now,
      date_updated: now,
      members: [],
    };
    this.lists.push(list);
    return this.ok(list);
  }

  private edit(list: SampleList, body: Record<string, unknown>) {
    const changes = Object.fromEntries(
      (['list_name', 'description', 'is_private'] as const)
        .filter((field) => body[field] !== undefined && body[field] !== null)
        .map((field) => [field, body[field]]),
    );
    // Like the backend, answer with the list as it was plus the changes: the
    // stored `date_updated` moves on, but the one in the answer doesn't.
    const answer = { ...list, ...changes };
    if (Object.keys(changes).length) {
      Object.assign(list, changes, { date_updated: timestamp() });
    }
    return this.ok(answer);
  }

  private addMember(list: SampleList, options: Record<string, unknown>) {
    if (list.members.length >= MEMBER_LIMIT) {
      return this.badRequest(MEMBER_LIMIT_MSG);
    }
    const member: SampleMember = {
      identifier: String(options.identifier),
      ...(options.file ? { file: String(options.file) } : {}),
      ...(options.search_term
        ? { search_term: String(options.search_term) }
        : {}),
      member_id: Math.max(0, ...list.members.map((m) => m.member_id)) + 1,
      date_added: timestamp(),
    };
    list.members.push(member);
    return this.ok(member);
  }

  /** Removes all of the given members, or none if any of them is missing. */
  private removeMembers(list: SampleList, ids: (string | number)[]) {
    const remove = new Set(ids.map(String));
    const found = list.members.filter((m) => remove.has(String(m.member_id)));
    if (found.length < remove.size) return this.notFound(LIST_MEMBER_NOT_FOUND);
    list.members = list.members.filter((m) => !found.includes(m));
    return this.ok(list);
  }

  private ok(value: unknown) {
    return { success: true, value };
  }

  private notFound(message: string) {
    return { success: false, error: 'Not Found', value: message };
  }

  private badRequest(message: string) {
    return { success: false, error: 'Bad Request', value: message };
  }
}

/**
 * Answers the member search the way the search service does: an `ItemHit` per
 * identifier, built from a hit shaped like the search API's.
 */
const sampleSearchService = {
  async search(params: { query: string }) {
    const identifiers = params.query
      .replace(/^identifier:\(|\)$/g, '')
      .split(' OR ');
    return {
      success: {
        response: {
          results: identifiers.map(
            (identifier) =>
              new ItemHit({
                hit_type: 'item',
                fields: {
                  identifier,
                  title: `Sample title for ${identifier}`,
                  mediatype: 'texts',
                },
              }),
          ),
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

type Source = 'sample' | 'live';

/**
 * Real data comes through the `/__archive__` proxy in `vite.config.ts`, which
 * only the dev server has. The GitHub Pages build is static, so it only offers
 * the sample data.
 */
const LIVE_AVAILABLE = import.meta.env.DEV;

/**
 * The proxy sends no cookies, so the live source is signed out: it offers the
 * reads that work on public lists, and nothing that needs `me` or writes.
 */
const LIVE_METHODS: readonly Method[] = [
  'fetchListsForUser',
  'fetchList',
  'fetchListMembers',
  'fetchListMemberSearchResults',
];

/** Notes the request the service makes, then sends it through the proxy. */
class LiveFetchHandler {
  last?: string;

  private readonly fetchHandler = new FetchHandler();

  async fetchApiResponse<T>(url: string, options?: ApiFetchOptions) {
    this.last = `${options?.method ?? 'GET'} ${url}`;
    return this.fetchHandler.fetchApiResponse<T>(url, options);
  }
}

const signedOutUserService = {
  async getLoggedInUser() {
    return { error: new Error('Not signed in through the dev proxy') };
  },
} as unknown as UserServiceInterface;

@customElement('userlist-service-story')
export class UserListServiceStory extends LitElement {
  @state() private source: Source = 'sample';

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

  private service = new UserListService({
    fetchHandler: this.backend,
    searchService: sampleSearchService,
    userService: sampleUserService,
  });

  private liveFetchHandler = new LiveFetchHandler();

  private liveService = new UserListService({
    fetchHandler: this.liveFetchHandler,
    searchService: SearchService.default,
    userService: signedOutUserService,
    baseUrl: `${window.location.origin}/__archive__`,
  });

  render() {
    const fields: readonly Field[] = METHODS[this.method];
    const methods =
      this.source === 'live' ? LIVE_METHODS : Object.keys(METHODS);
    return html`
      <service-template
        serviceName="userlist-service"
        .usage=${USAGE}
        .apiSource=${API_SOURCE}
      >
        <form slot="console" @submit=${this.run}>
          ${LIVE_AVAILABLE
            ? html`<label>
                Answer from
                <select name="source" @change=${this.pickSource}>
                  <option value="sample" ?selected=${this.source === 'sample'}>
                    Sample data
                  </option>
                  <option value="live" ?selected=${this.source === 'live'}>
                    archive.org via dev proxy (public, read only)
                  </option>
                </select>
              </label>`
            : nothing}
          <label>
            Method
            <select name="method" @change=${this.pickMethod}>
              ${methods.map(
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
          ${this.source === 'sample'
            ? html`<button type="button" @click=${this.reset}>
                Reset sample data
              </button>`
            : nothing}
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
            <code>/services/users/…/lists</code>. The sample data is held in the
            page, signed in as <code>${SIGNED_IN_USER}</code>, so changes show
            up in later reads and nothing is sent anywhere.
          </p>
          <p>
            archive.org only answers these endpoints for pages on archive.org,
            so the browser blocks a direct call from here (CORS). Run
            <code>pnpm run dev</code> to get real data: the dev server fetches
            <code>/__archive__/…</code> from archive.org on the page's behalf.
            It sends no cookies, so it's signed out and offers only the reads of
            public lists.
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

  private pickSource(e: Event) {
    this.source = (e.target as HTMLSelectElement).value as Source;
    if (this.source === 'live' && !LIVE_METHODS.includes(this.method)) {
      this.method = 'fetchListsForUser';
    }
    this.result = undefined;
  }

  private pickMethod(e: Event) {
    this.method = (e.target as HTMLSelectElement).value as Method;
    this.result = undefined;
  }

  private reset() {
    this.backend = new SampleListsBackend();
    this.service = new UserListService({
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

    const live = this.source === 'live';
    const s = live ? this.liveService : this.service;
    const recorder = live ? this.liveFetchHandler : this.backend;
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

    recorder.last = undefined;
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
    this.result = { call, request: recorder.last, output };
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
