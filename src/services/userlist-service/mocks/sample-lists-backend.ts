import type { ApiFetchOptions } from '../../fetch-handler/fetch-options';

/** The user the sample data treats as signed in. */
export const SIGNED_IN_USER = '@brewster';

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
export class SampleListsBackend {
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
