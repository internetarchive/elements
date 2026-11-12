import { fixture, oneEvent, waitUntil } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { IAButton } from '@src/elements/ia-button/ia-button';
import type { IAModalManager } from '@src/elements/modal-manager/modal-manager';
import { ModalConfig } from '@src/elements/modal-manager/modal-config';
import type { SearchServiceInterface } from '@src/services/search-service/search-service-interface';
import type { UserServiceInterface } from '@src/services/user-service/user-service';
import type { UserList } from '@src/services/userlist-service/models';
import { UserListsService } from '@src/services/userlist-service/userlist-service';
import {
  UserListsError,
  UserListsErrorReason,
} from '@src/services/userlist-service/userlist-error';
import type { IAUserListSettings, UserListModel } from './ia-userlist-settings';
import { MockUserListsService } from './mocks/mock-user-lists-service';

import './ia-userlist-settings';
import '@src/elements/modal-manager/modal-manager';

const userList: UserListModel = {
  id: 'initial-list-id',
  list_name: 'my first list',
  description: 'my first list description',
  is_private: true,
};

const fields = (el: IAUserListSettings) => {
  const root = el.shadowRoot!;
  return {
    id: root.querySelector('#id') as HTMLInputElement,
    name: root.querySelector('#name') as HTMLInputElement,
    description: root.querySelector('#description') as HTMLTextAreaElement,
    isPrivate: root.querySelector('#private') as HTMLInputElement,
    cancel: root.querySelector('#cancel') as IAButton,
    save: root.querySelector('#save-list-settings') as IAButton,
  };
};

/** Fills the form and clicks Save, the way a user would */
const fillAndSave = (
  el: IAUserListSettings,
  values: { name: string; description: string; isPrivate: boolean },
) => {
  const { name, description, isPrivate, save } = fields(el);
  name.value = values.name;
  description.value = values.description;
  isPrivate.checked = values.isPrivate;
  save.click();
};

describe('ia-userlist-settings', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders the list fields', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );

    const { id, name, description, isPrivate } = fields(el);
    expect(el.shadowRoot?.querySelector('.new-list')).to.exist;
    expect(id).to.exist;
    expect(name).to.exist;
    expect(description).to.exist;
    expect(isPrivate).to.exist;
  });

  test('renders Cancel and Save buttons', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );

    const { cancel, save } = fields(el);
    expect(cancel.mode).to.equal('secondary');
    expect(cancel.textContent?.trim()).to.equal('Cancel');
    expect(save.mode).to.equal('primary');
    expect(save.type).to.equal('submit');
    expect(save.textContent?.trim()).to.equal('Save');
  });

  test('labels each field', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );

    const labels = [...el.shadowRoot!.querySelectorAll('label')].map((l) => [
      l.htmlFor,
      l.textContent?.trim(),
    ]);
    expect(labels).to.deep.equal([
      ['name', 'List name*'],
      ['description', 'Description'],
      ['private', 'Private list'],
    ]);
  });

  test('starts with empty fields', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );

    const { id, name, description, isPrivate } = fields(el);
    expect(id.value).to.equal('');
    expect(name.value).to.equal('');
    expect(description.value).to.equal('');
    expect(isPrivate.checked).to.be.false;
  });

  test('fills the fields from the list being edited', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );

    el.userList = userList;
    await el.updateComplete;

    const { id, name, description, isPrivate } = fields(el);
    expect(id.value).to.equal(userList.id);
    expect(name.value).to.equal(userList.list_name);
    expect(description.value).to.equal(userList.description);
    expect(isPrivate.checked).to.be.true;
  });

  test('empties the fields when switched from editing to a new list', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings .userList=${userList}></ia-userlist-settings>`,
    );

    el.userList = undefined;
    await el.updateComplete;

    const { id, name, description, isPrivate } = fields(el);
    expect(id.value).to.equal('');
    expect(name.value).to.equal('');
    expect(description.value).to.equal('');
    expect(isPrivate.checked).to.be.false;
  });

  test('replaces typed text when switched to a list to edit', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );
    fields(el).name.value = 'typed but not saved';

    el.userList = { ...userList };
    await el.updateComplete;
    expect(fields(el).name.value).to.equal(userList.list_name);

    fields(el).name.value = 'typed again';
    el.userList = { ...userList };
    await el.updateComplete;
    expect(fields(el).name.value).to.equal(userList.list_name);
  });

  test('emits listModalClosed when Cancel is clicked', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );

    const closed = oneEvent(el, 'listModalClosed');
    fields(el).cancel.click();

    const event = await closed;
    expect(event.target).to.equal(el);
  });

  test('creates a new list on Save', async () => {
    const service = new MockUserListsService();
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings
        .userListsService=${service}
      ></ia-userlist-settings>`,
    );

    const saving = oneEvent(el, 'userListSaving');
    const saved = oneEvent(el, 'userListSaved');
    fillAndSave(el, {
      name: 'New list',
      description: 'Some things',
      isPrivate: true,
    });

    await saving;
    const event = (await saved) as CustomEvent<UserList>;
    expect(service.calls).to.deep.equal([
      {
        method: 'createList',
        options: {
          list_name: 'New list',
          description: 'Some things',
          is_private: true,
        },
      },
    ]);
    expect(event.detail.id).to.equal('1');
    expect(event.detail.list_name).to.equal('New list');
  });

  test('updates the list being edited on Save', async () => {
    const service = new MockUserListsService();
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings
        .userList=${userList}
        .userListsService=${service}
      ></ia-userlist-settings>`,
    );

    const saved = oneEvent(el, 'userListSaved');
    fillAndSave(el, {
      name: 'Renamed list',
      description: 'New description',
      isPrivate: false,
    });

    const event = (await saved) as CustomEvent<UserList>;
    expect(service.calls).to.deep.equal([
      {
        method: 'updateList',
        listId: 'initial-list-id',
        options: {
          list_name: 'Renamed list',
          description: 'New description',
          is_private: false,
        },
      },
    ]);
    expect(event.detail.id).to.equal('initial-list-id');
  });

  test('does not save without a list name', async () => {
    const service = new MockUserListsService();
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings
        .userListsService=${service}
      ></ia-userlist-settings>`,
    );

    const onSaving = vi.fn();
    el.addEventListener('userListSaving', onSaving);
    fillAndSave(el, { name: '', description: '', isPrivate: false });
    await el.updateComplete;

    expect(onSaving).not.toHaveBeenCalled();
    expect(service.calls).to.be.empty;
  });

  test('disables Save while saving, and enables it again once saved', async () => {
    const service = new MockUserListsService();
    service.delay = 50;
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings
        .userListsService=${service}
      ></ia-userlist-settings>`,
    );

    const saved = oneEvent(el, 'userListSaved');
    fillAndSave(el, { name: 'New list', description: '', isPrivate: false });
    await el.updateComplete;
    expect(fields(el).save.disabled).to.be.true;

    await saved;
    await el.updateComplete;
    expect(fields(el).save.disabled).to.be.false;
  });

  test('shows a white saving indicator in Save while saving', async () => {
    const service = new MockUserListsService();
    service.delay = 200;
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings
        .userListsService=${service}
      ></ia-userlist-settings>`,
    );

    const saved = oneEvent(el, 'userListSaved');
    fillAndSave(el, { name: 'New list', description: '', isPrivate: false });
    await el.updateComplete;

    const indicator = fields(el).save.querySelector('ia-status-indicator')!;
    await indicator.updateComplete;
    const ring = indicator.shadowRoot!.querySelector('.loading-ring')!;
    const dots = indicator.shadowRoot!.querySelector('.loading-dots')!;
    expect(getComputedStyle(ring).fill).to.equal('rgb(255, 255, 255)');
    expect(getComputedStyle(dots).fill).to.equal('rgb(255, 255, 255)');

    await saved;
  });

  test('clears the form once a new list is saved', async () => {
    const service = new MockUserListsService();
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings
        .userListsService=${service}
      ></ia-userlist-settings>`,
    );

    const saved = oneEvent(el, 'userListSaved');
    fillAndSave(el, {
      name: 'New list',
      description: 'Some things',
      isPrivate: true,
    });
    await saved;

    const { name, description, isPrivate } = fields(el);
    expect(name.value).to.equal('');
    expect(description.value).to.equal('');
    expect(isPrivate.checked).to.be.false;
  });

  test('keeps the saved values in the form once an edited list is saved', async () => {
    const service = new MockUserListsService();
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings
        .userList=${userList}
        .userListsService=${service}
      ></ia-userlist-settings>`,
    );

    const saved = oneEvent(el, 'userListSaved');
    fillAndSave(el, {
      name: 'Renamed list',
      description: 'New description',
      isPrivate: false,
    });
    await saved;

    const { id, name, description, isPrivate } = fields(el);
    expect(id.value).to.equal('initial-list-id');
    expect(name.value).to.equal('Renamed list');
    expect(description.value).to.equal('New description');
    expect(isPrivate.checked).to.be.false;
  });

  test('focuses the List name field when it first renders', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );

    await waitUntil(() => el.shadowRoot?.activeElement === fields(el).name);
  });

  test('focuses the List name field when shown in a modal-manager modal', async () => {
    const manager = await fixture<IAModalManager>(
      html`<modal-manager></modal-manager>`,
    );

    await manager.showModal({
      config: new ModalConfig({ title: html`List settings` }),
      customModalContent: html`<ia-userlist-settings></ia-userlist-settings>`,
    });

    const el = manager.shadowRoot!.querySelector<IAUserListSettings>(
      'ia-userlist-settings',
    )!;
    await waitUntil(() => el.shadowRoot?.activeElement === fields(el).name);
  });

  test('leaves focus alone when autoFocusListName is false', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings
        .autoFocusListName=${false}
      ></ia-userlist-settings>`,
    );

    await new Promise((resolve) => setTimeout(resolve));
    expect(el.shadowRoot?.activeElement).to.be.null;
  });

  test('emits userListError and re-enables Save when the save fails', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    const service = new MockUserListsService();
    service.saveError = new UserListsError(
      UserListsErrorReason.BAD_RESPONSE,
      'Bad Request',
    );
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings
        .userListsService=${service}
      ></ia-userlist-settings>`,
    );

    const onSaved = vi.fn();
    el.addEventListener('userListSaved', onSaved);
    const failed = oneEvent(el, 'userListError');
    fillAndSave(el, { name: 'New list', description: '', isPrivate: false });

    const event = (await failed) as CustomEvent<{ error: unknown }>;
    expect(event.detail.error).to.equal(service.saveError);
    expect(onSaved).not.toHaveBeenCalled();
    await waitUntil(() => !fields(el).save.disabled);
    expect(fields(el).name.value).to.equal('New list');

    const error = el.shadowRoot!.querySelector('.error')!;
    expect(error.getAttribute('role')).to.equal('alert');
    expect(error.textContent?.trim()).to.equal(
      'The list could not be saved. Please try again.',
    );
  });

  test('shows no error message before a save fails', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );

    const error = el.shadowRoot!.querySelector('.error') as HTMLElement;
    expect(error.textContent?.trim()).to.equal('');
    expect(error.offsetHeight).to.equal(0);
  });

  test('clears the error message when saving again succeeds', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    const service = new MockUserListsService();
    service.saveError = new UserListsError(
      UserListsErrorReason.BAD_RESPONSE,
      'Bad Request',
    );
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings
        .userListsService=${service}
      ></ia-userlist-settings>`,
    );

    const failed = oneEvent(el, 'userListError');
    fillAndSave(el, { name: 'New list', description: '', isPrivate: false });
    await failed;
    await el.updateComplete;

    service.saveError = undefined;
    const saved = oneEvent(el, 'userListSaved');
    fillAndSave(el, { name: 'New list', description: '', isPrivate: false });
    await saved;
    await el.updateComplete;

    expect(
      el.shadowRoot!.querySelector('.error')?.textContent?.trim(),
    ).to.equal('');
  });

  test('clears the error message when switched to another list', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );

    const failed = oneEvent(el, 'userListError');
    fillAndSave(el, { name: 'New list', description: '', isPrivate: false });
    await failed;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.error')?.textContent?.trim()).not.to
      .be.empty;

    el.userList = { ...userList };
    await el.updateComplete;
    expect(
      el.shadowRoot!.querySelector('.error')?.textContent?.trim(),
    ).to.equal('');
  });

  test('emits userListError when it has no service', async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );

    const failed = oneEvent(el, 'userListError');
    fillAndSave(el, { name: 'New list', description: '', isPrivate: false });

    const event = (await failed) as CustomEvent<{ error: Error }>;
    expect(event.detail.error.message).to.equal(
      'ia-userlist-settings has no userListsService',
    );
  });

  describe('with UserListsService', () => {
    /** The real service, on a fetch handler that answers with `answer` */
    const setupService = (answer: unknown) => {
      const fetchApiResponse = vi.fn(async () => {
        if (answer instanceof Error) throw answer;
        return answer;
      });
      const service = new UserListsService({
        fetchHandler: { fetchApiResponse } as unknown as ConstructorParameters<
          typeof UserListsService
        >[0]['fetchHandler'],
        // Saving never searches or looks up the user
        searchService: {} as SearchServiceInterface,
        userService: {} as UserServiceInterface,
      });
      return { service, fetchApiResponse };
    };

    const savedList = {
      id: 3,
      list_name: 'New list',
      description: 'Some things',
      is_private: true,
      date_created: '2025-01-02T00:00:00Z',
      date_updated: '2025-01-02T00:00:00Z',
      members: [],
    };

    test('creates a list with a POST to the lists endpoint', async () => {
      const { service, fetchApiResponse } = setupService({
        success: true,
        value: savedList,
      });
      const el = await fixture<IAUserListSettings>(
        html`<ia-userlist-settings
          .userListsService=${service}
        ></ia-userlist-settings>`,
      );

      const saved = oneEvent(el, 'userListSaved');
      fillAndSave(el, {
        name: 'New list',
        description: 'Some things',
        isPrivate: true,
      });

      const event = (await saved) as CustomEvent<UserList>;
      expect(fetchApiResponse).toHaveBeenCalledOnce();
      expect(fetchApiResponse).toHaveBeenCalledWith(
        'https://archive.org/services/users/me/lists',
        {
          method: 'POST',
          body: JSON.stringify({
            list_name: 'New list',
            description: 'Some things',
            is_private: true,
          }),
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          includeCredentials: true,
        },
      );
      expect(event.detail).to.deep.equal(savedList);
    });

    test('updates the list being edited with a PATCH to its endpoint', async () => {
      const { service, fetchApiResponse } = setupService({
        success: true,
        value: { ...savedList, id: 'initial-list-id' },
      });
      const el = await fixture<IAUserListSettings>(
        html`<ia-userlist-settings
          .userList=${userList}
          .userListsService=${service}
        ></ia-userlist-settings>`,
      );

      const saved = oneEvent(el, 'userListSaved');
      fillAndSave(el, {
        name: 'Renamed list',
        description: '',
        isPrivate: false,
      });
      await saved;

      expect(fetchApiResponse).toHaveBeenCalledWith(
        'https://archive.org/services/users/me/lists/initial-list-id',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({
            list_name: 'Renamed list',
            description: '',
            is_private: false,
          }),
        }),
      );
    });

    test('shows the error when the backend refuses the save', async () => {
      vi.spyOn(console, 'log').mockImplementation(() => {});
      const { service } = setupService({
        success: false,
        error: 'Bad Request',
        value: 'You have exceeded the maximum number of lists.',
      });
      const el = await fixture<IAUserListSettings>(
        html`<ia-userlist-settings
          .userListsService=${service}
        ></ia-userlist-settings>`,
      );

      const failed = oneEvent(el, 'userListError');
      fillAndSave(el, { name: 'New list', description: '', isPrivate: false });

      const event = (await failed) as CustomEvent<{ error: unknown }>;
      expect(event.detail.error).to.be.instanceOf(UserListsError);
      await el.updateComplete;
      expect(
        el.shadowRoot!.querySelector('.error')?.textContent?.trim(),
      ).to.equal('The list could not be saved. Please try again.');
    });

    test('reports a network failure as a NETWORK error', async () => {
      vi.spyOn(console, 'log').mockImplementation(() => {});
      const { service } = setupService(new TypeError('Failed to fetch'));
      const el = await fixture<IAUserListSettings>(
        html`<ia-userlist-settings
          .userListsService=${service}
        ></ia-userlist-settings>`,
      );

      const failed = oneEvent(el, 'userListError');
      fillAndSave(el, { name: 'New list', description: '', isPrivate: false });

      const event = (await failed) as CustomEvent<{ error: UserListsError }>;
      expect(event.detail.error.reason).to.equal(UserListsErrorReason.NETWORK);
    });
  });

  describe('Sentry', () => {
    const originalSentry = window.Sentry;

    afterEach(() => {
      window.Sentry = originalSentry;
    });

    /** Saves the form against a service whose saves fail, and waits for it */
    const failSave = async (list?: UserListModel) => {
      vi.spyOn(console, 'log').mockImplementation(() => {});
      const service = new MockUserListsService();
      service.saveError = new UserListsError(
        UserListsErrorReason.BAD_RESPONSE,
        'Bad Request',
      );
      const el = await fixture<IAUserListSettings>(
        html`<ia-userlist-settings
          .userList=${list}
          .userListsService=${service}
        ></ia-userlist-settings>`,
      );

      const failed = oneEvent(el, 'userListError');
      fillAndSave(el, { name: 'A list', description: '', isPrivate: false });
      await failed;
      await el.updateComplete;
      return { el, error: service.saveError };
    };

    test('reports a failed create with its operation and reason', async () => {
      window.Sentry = { captureMessage: vi.fn(), captureException: vi.fn() };

      const { error } = await failSave();

      expect(window.Sentry.captureException).toHaveBeenCalledOnce();
      expect(window.Sentry.captureException).toHaveBeenCalledWith(error, {
        tags: { component: 'ia-userlist-settings', operation: 'create' },
        extra: {
          listId: undefined,
          reason: UserListsErrorReason.BAD_RESPONSE,
        },
      });
    });

    test('reports a failed update with the list id', async () => {
      window.Sentry = { captureMessage: vi.fn(), captureException: vi.fn() };

      const { error } = await failSave(userList);

      expect(window.Sentry.captureException).toHaveBeenCalledWith(error, {
        tags: { component: 'ia-userlist-settings', operation: 'update' },
        extra: {
          listId: 'initial-list-id',
          reason: UserListsErrorReason.BAD_RESPONSE,
        },
      });
    });

    test('does not report a failure while offline', async () => {
      window.Sentry = { captureMessage: vi.fn(), captureException: vi.fn() };
      vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);

      await failSave();

      expect(window.Sentry.captureException).not.toHaveBeenCalled();
    });

    test('does not report a successful save', async () => {
      window.Sentry = { captureMessage: vi.fn(), captureException: vi.fn() };
      const el = await fixture<IAUserListSettings>(
        html`<ia-userlist-settings
          .userListsService=${new MockUserListsService()}
        ></ia-userlist-settings>`,
      );

      const saved = oneEvent(el, 'userListSaved');
      fillAndSave(el, { name: 'A list', description: '', isPrivate: false });
      await saved;

      expect(window.Sentry.captureException).not.toHaveBeenCalled();
    });

    test('still shows the error on a page without Sentry', async () => {
      window.Sentry = undefined;

      const { el } = await failSave();

      expect(
        el.shadowRoot!.querySelector('.error')?.textContent?.trim(),
      ).to.equal('The list could not be saved. Please try again.');
    });
  });

  test.each(['200px', '400px', '700px'])(
    'keeps the fields and buttons inside a %s wide form',
    async (width) => {
      // Wider than the test viewport, so only the form's own width applies
      const container = await fixture<HTMLDivElement>(
        html`<div style="width: 800px">
          <ia-userlist-settings
            style="--ia-userlist-settings-width: ${width}"
          ></ia-userlist-settings>
        </div>`,
      );
      const el = container.querySelector<IAUserListSettings>(
        'ia-userlist-settings',
      )!;
      await el.updateComplete;
      const { name, description, cancel, save } = fields(el);
      await cancel.updateComplete;
      await save.updateComplete;

      const host = el.getBoundingClientRect();
      expect(host.width).to.equal(parseInt(width));
      for (const part of [name, description, cancel, save]) {
        const box = part.getBoundingClientRect();
        expect(box.width).to.be.greaterThan(0);
        expect(box.left).to.be.at.least(host.left);
        expect(box.right).to.be.at.most(host.right);
      }
    },
  );

  test.each([
    { width: '400px', labelsAbove: false },
    { width: '250px', labelsAbove: true },
  ])(
    'lines the buttons up with the fields in a $width wide form',
    async ({ width, labelsAbove }) => {
      const el = await fixture<IAUserListSettings>(
        html`<ia-userlist-settings
          style="--ia-userlist-settings-width: ${width}"
        ></ia-userlist-settings>`,
      );
      const { name, description, cancel, save } = fields(el);
      await save.updateComplete;

      const fieldsLeft = name.getBoundingClientRect().left;
      expect(description.getBoundingClientRect().left).to.equal(fieldsLeft);
      expect(cancel.getBoundingClientRect().left).to.equal(fieldsLeft);
      expect(save.getBoundingClientRect().left).to.be.greaterThan(
        cancel.getBoundingClientRect().right,
      );

      const label = el.shadowRoot!.querySelector('label[for="name"]')!;
      const labelBottom = label.getBoundingClientRect().bottom;
      if (labelsAbove) {
        expect(fieldsLeft).to.equal(el.getBoundingClientRect().left);
        expect(name.getBoundingClientRect().top).to.be.at.least(labelBottom);
      } else {
        expect(name.getBoundingClientRect().top).to.be.lessThan(labelBottom);
      }
    },
  );

  test('renders the labels and fields at 14px', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<div style="font-size: 20px">
        <ia-userlist-settings></ia-userlist-settings>
      </div>`,
    ).then(
      (div) => div.querySelector<IAUserListSettings>('ia-userlist-settings')!,
    );

    const { name, description } = fields(el);
    for (const node of [
      ...el.shadowRoot!.querySelectorAll('label'),
      name,
      description,
    ]) {
      expect(getComputedStyle(node).fontSize).to.equal('14px');
    }
  });

  test('draws the focus ring inside the text fields', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );

    const focusRules = el
      .shadowRoot!.adoptedStyleSheets.flatMap((sheet) => [...sheet.cssRules])
      .filter(
        (rule): rule is CSSStyleRule =>
          rule instanceof CSSStyleRule && rule.selectorText.includes(':focus'),
      );
    const selectors = focusRules.map((rule) => rule.selectorText).join(', ');
    expect(selectors).to.include('input[type="text"]:focus');
    expect(selectors).to.include('textarea:focus');

    for (const { style } of focusRules) {
      const width = parseFloat(style.outlineWidth);
      expect(style.outlineStyle).to.equal('solid');
      expect(width).to.be.greaterThan(0);
      // A negative offset at least the outline's width keeps it inside
      expect(parseFloat(style.outlineOffset)).to.be.at.most(-width);
    }
  });

  test('is no wider than its container', async () => {
    const container = await fixture<HTMLDivElement>(
      html`<div style="width: 250px">
        <ia-userlist-settings></ia-userlist-settings>
      </div>`,
    );
    const el = container.querySelector<IAUserListSettings>(
      'ia-userlist-settings',
    )!;

    expect(el.getBoundingClientRect().width).to.equal(250);
  });

  test('exposes parts for styling', async () => {
    const el = await fixture<IAUserListSettings>(
      html`<ia-userlist-settings></ia-userlist-settings>`,
    );

    const parts = [...el.shadowRoot!.querySelectorAll('[part]')].map((p) =>
      p.getAttribute('part'),
    );
    expect(parts).to.deep.equal([
      'form',
      'error',
      'cancel-button',
      'save-button',
    ]);
  });

  test('is registered under its tag', () => {
    expect(customElements.get('ia-userlist-settings')).to.equal(
      document.createElement('ia-userlist-settings').constructor,
    );
  });
});
