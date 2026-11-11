import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/utils/custom-element';
import interfaceSource from './user-lists-service-interface.ts?raw';
import modelsSource from './models.ts?raw';
import errorSource from './user-lists-error.ts?raw';

import '@demo/service-template';
import { UserListsService } from './user-lists-service';
import type { UserList } from './models';
import { FetchHandler } from '../fetch-handler/fetch-handler';
import type { ApiFetchOptions } from '../fetch-handler/fetch-options';
import { SearchService } from '../search-service/search-service';
import { UserService } from '../user-service/user-service';

type Call =
  | 'fetchListsForUser'
  | 'fetchList'
  | 'fetchOwnListsContainingItem'
  | 'fetchListMembers';

const CALLS: Call[] = [
  'fetchListsForUser',
  'fetchList',
  'fetchOwnListsContainingItem',
  'fetchListMembers',
];

const DEFAULT_USER_ID = '@brewster';
const DEFAULT_LIST_ID = '1';
const DEFAULT_ITEM_ID = 'goody';

const USAGE = `import { UserListsService } from '@internetarchive/elements/services/user-lists-service/user-lists-service';
import { FetchHandler } from '@internetarchive/elements/services/fetch-handler/fetch-handler';
import { SearchService } from '@internetarchive/elements/services/search-service/search-service';
import { UserService } from '@internetarchive/elements/services/user-service/user-service';

const service = new UserListsService({
  fetchHandler: new FetchHandler(),
  searchService: SearchService.default,
  userService: new UserService(),
});

const { success: lists, error } = await service.fetchListsForUser('@brewster');
if (error) console.log(error.reason); // e.g. UserListsErrorReason.NETWORK
else console.log(lists.map(list => list.list_name));`;

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

const sampleList = (id: string): UserList => ({
  id,
  list_name: 'Sample list',
  description: 'A list answered from sample data',
  is_private: false,
  date_created: new Date('2025-01-01T00:00:00Z'),
  date_updated: new Date('2025-01-02T00:00:00Z'),
  count: 1,
  members: [
    {
      member_id: '1',
      identifier: DEFAULT_ITEM_ID,
      date_added: new Date('2025-01-02T00:00:00Z'),
    },
  ],
});

/**
 * Notes the request the service makes. With `sample` set it answers from
 * canned lists and never touches the network.
 */
class RecordingFetchHandler {
  last?: string;

  private readonly sample: boolean;

  private readonly live = new FetchHandler();

  constructor(sample: boolean) {
    this.sample = sample;
  }

  async fetchApiResponse<T>(url: string, options?: ApiFetchOptions) {
    this.last = `${options?.method ?? 'GET'} ${url}`;
    if (!this.sample) return this.live.fetchApiResponse<T>(url, options);

    const { pathname, searchParams } = new URL(url);
    const listId = pathname.match(/\/lists\/([^/]+)$/)?.[1];
    if (listId) return { success: true, value: sampleList(listId) } as T;
    const lists = [{ ...sampleList(DEFAULT_LIST_ID), members: undefined }];
    return {
      success: true,
      value: searchParams.has('item')
        ? lists.map((list) => ({ ...list, item_is_member: true }))
        : lists,
    } as T;
  }
}

@customElement('user-lists-service-story')
export class UserListsServiceStory extends LitElement {
  @state() private call: Call = 'fetchListsForUser';

  @state() private userId = '';

  @state() private listId = '';

  @state() private itemId = '';

  @state() private sample = true;

  @state() private running = false;

  @state() private result?: {
    call: string;
    request?: string;
    output: string;
  };

  render() {
    const needsUser =
      this.call === 'fetchListsForUser' ||
      this.call === 'fetchList' ||
      this.call === 'fetchListMembers';
    const needsList =
      this.call === 'fetchList' || this.call === 'fetchListMembers';
    const needsItem = this.call === 'fetchOwnListsContainingItem';

    return html`
      <service-template
        serviceName="user-lists-service"
        .usage=${USAGE}
        .apiSource=${API_SOURCE}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Method
            <select @change=${this.pickCall}>
              ${CALLS.map(
                (call) =>
                  html`<option value=${call} ?selected=${this.call === call}>
                    ${call}
                  </option>`,
              )}
            </select>
          </label>
          ${needsUser
            ? this.textField('User id', 'userId', DEFAULT_USER_ID)
            : nothing}
          ${needsList
            ? this.textField('List id', 'listId', DEFAULT_LIST_ID)
            : nothing}
          ${needsItem
            ? this.textField('Item identifier', 'itemId', DEFAULT_ITEM_ID)
            : nothing}
          <label class="check">
            <input
              type="checkbox"
              .checked=${this.sample}
              @change=${(e: Event) =>
                (this.sample = (e.target as HTMLInputElement).checked)}
            />
            Sample data (works offline)
          </label>
          <button type="submit" ?disabled=${this.running}>Run</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result
              ? html`<code class="call">${this.result.call}</code>
                  ${this.result.request
                    ? html`<code class="request">${this.result.request}</code>`
                    : nothing}
                  <pre class="output">${this.result.output}</pre>`
              : nothing}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Reads and edits a user's lists through
            <code>/services/users/…/lists</code>. Only the reads run here, so a
            live call can't change anyone's lists. The sample data answers from
            canned lists and sends nothing. A live call goes to archive.org with
            your credentials, which the browser only allows from archive.org
            itself, so from here it fails with a network error.
          </p>
        </div>
      </service-template>
    `;
  }

  private textField(
    label: string,
    field: 'userId' | 'listId' | 'itemId',
    placeholder: string,
  ) {
    return html`<label>
      ${label}
      <input
        type="text"
        name=${field}
        placeholder=${placeholder}
        autocomplete="off"
        spellcheck="false"
        .value=${this[field]}
        @input=${(e: Event) =>
          (this[field] = (e.target as HTMLInputElement).value)}
      />
    </label>`;
  }

  private pickCall(e: Event) {
    this.call = (e.target as HTMLSelectElement).value as Call;
    this.result = undefined;
  }

  private async run(e: Event) {
    e.preventDefault();
    const userId = this.userId.trim() || DEFAULT_USER_ID;
    const listId = this.listId.trim() || DEFAULT_LIST_ID;
    const itemId = this.itemId.trim() || DEFAULT_ITEM_ID;
    const fetchHandler = new RecordingFetchHandler(this.sample);
    const service = new UserListsService({
      fetchHandler,
      searchService: SearchService.default,
      userService: new UserService(),
    });

    const args = {
      fetchListsForUser: [userId],
      fetchList: [userId, listId],
      fetchOwnListsContainingItem: [itemId],
      fetchListMembers: [userId, listId],
    }[this.call];
    const call = `${this.call}(${args.map((a) => JSON.stringify(a)).join(', ')})`;

    this.running = true;
    let output: string;
    try {
      const { success, error } =
        this.call === 'fetchListsForUser'
          ? await service.fetchListsForUser(userId)
          : this.call === 'fetchList'
            ? await service.fetchList(userId, listId)
            : this.call === 'fetchOwnListsContainingItem'
              ? await service.fetchOwnListsContainingItem(itemId)
              : await service.fetchListMembers(userId, listId);
      output = error
        ? `error: ${error.reason}${error.message ? ` (${error.message})` : ''}`
        : JSON.stringify(success, null, 2);
    } finally {
      this.running = false;
    }
    this.result = { call, request: fetchHandler.last, output };
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

      .output {
        margin: 0;
        font-weight: 600;
        overflow-x: auto;
      }
    `;
  }
}
