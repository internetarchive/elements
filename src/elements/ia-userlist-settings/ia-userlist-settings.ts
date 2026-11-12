import {
  html,
  css,
  LitElement,
  CSSResultGroup,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { customElement } from '@src/utils/custom-element';
import themeStyles from '@src/themes/theme-styles';

import type { Result } from '@src/services/result-type/result-type';
import type { UserListsServiceInterface } from '@src/services/user-lists-service/user-lists-service-interface';
import { UserListsError } from '@src/services/user-lists-service/user-lists-error';
import type {
  UserList,
  UserListOptions,
} from '@src/services/user-lists-service/models';
import type { UserListModel } from './models';

import '@src/elements/ia-button/ia-button';
import '@src/utils/sentry-global';
import '@src/elements/ia-status-indicator/ia-status-indicator';

export type { UserListModel } from './models';

/**
 * The form for creating or editing a user list: its name, description and
 * privacy. Saving goes through the given `userListsService`.
 *
 * @fires listModalClosed - Cancel was clicked
 * @fires userListSaving - A save has started
 * @fires userListSaved - The list was saved; `detail` is the saved `UserList`
 * @fires userListError - The save failed; `detail.error` holds the error
 *
 * A failed save shows an error message in the form and is reported to Sentry
 * through `window.Sentry`, when the page has it.
 */
@customElement('ia-userlist-settings')
@localized()
export class IAUserListSettings extends LitElement {
  /**
   * The list to edit. Leave unset, or without an `id`, to create a new list.
   */
  @property({ type: Object }) userList?: UserListModel;

  /**
   * User lists service to use for creating/updating lists
   */
  @property({ type: Object }) userListsService?: UserListsServiceInterface;

  /**
   * Whether to focus the List name field when the form first renders.
   * Set `.autoFocusListName=${false}` to leave focus where it is.
   */
  @property({ type: Boolean }) autoFocusListName = true;

  /** Whether a save is in progress, which disables the Save button */
  @state() private saving = false;

  /** Whether the last save failed, which shows an error message */
  @state() private saveFailed = false;

  @query('#user-list-form') private form!: HTMLFormElement;

  @query('#id') private listId!: HTMLInputElement;

  @query('#name') private listName!: HTMLInputElement;

  @query('#description') private listDescription!: HTMLTextAreaElement;

  @query('#private') private listPrivate!: HTMLInputElement;

  protected willUpdate(changed: PropertyValues<this>): void {
    // A failed save's message belongs to the list it was for
    if (changed.has('userList')) this.saveFailed = false;
  }

  protected firstUpdated(): void {
    if (!this.autoFocusListName) return;
    // modal-manager focuses its own template once the content has rendered,
    // so wait a task to land after it.
    setTimeout(() => this.listName.focus());
  }

  protected updated(changed: PropertyValues<this>): void {
    if (changed.has('userList')) this.fillForm();
  }

  /** Saves the form through the service, on submit */
  private async saveListDetails(event: Event): Promise<void> {
    event.preventDefault();
    this.saving = true;
    this.saveFailed = false;
    this.dispatchEvent(new Event('userListSaving'));

    const listId = this.userList?.id;
    try {
      const response = await this.saveList(listId, this.readFormValues());
      if (!response.success) throw response.error;
      this.handleSaveSuccess(response.success, listId);
    } catch (error) {
      this.handleSaveError(error, listId);
    }
  }

  private emitCloseModalEvent(e: Event): void {
    e.preventDefault();
    this.dispatchEvent(new Event('listModalClosed'));
  }

  /** Updates the list being edited, or creates a new one when there's no id */
  private saveList(
    listId: string | undefined,
    options: UserListOptions,
  ): Promise<Result<UserList, UserListsError>> {
    if (!this.userListsService) {
      throw new Error('ia-userlist-settings has no userListsService');
    }

    return listId
      ? this.userListsService.updateList(listId, options)
      : this.userListsService.createList(options);
  }

  private handleSaveSuccess(list: UserList, listId?: string): void {
    // A new list's form is cleared for the next one. An edited list's
    // form already shows what was saved.
    if (!listId) this.form.reset();
    this.saving = false;

    this.dispatchEvent(
      new CustomEvent<UserList>('userListSaved', { detail: list }),
    );
  }

  private handleSaveError(error: unknown, listId?: string): void {
    this.dispatchEvent(
      new CustomEvent('userListError', {
        detail: { error },
      }),
    );

    console.log('error', error);
    this.saving = false;
    this.saveFailed = true;
    this.reportError(error, listId);
  }

  /** Reports a failed save to Sentry, unless the user is offline */
  private reportError(error: unknown, listId?: string): void {
    // Offline isn't something we can fix
    if (!navigator.onLine) return;

    window.Sentry?.captureException(error, {
      tags: {
        component: 'ia-userlist-settings',
        operation: listId ? 'update' : 'create',
      },
      extra: {
        listId,
        // The service's failure reason isn't in the message, so Sentry
        // wouldn't otherwise see it
        reason: error instanceof UserListsError ? error.reason : undefined,
      },
    });
  }

  /** The list details as typed into the form */
  private readFormValues(): UserListOptions {
    return {
      list_name: this.listName.value,
      description: this.listDescription.value,
      is_private: this.listPrivate.checked,
    };
  }

  /**
   * Fills the fields from `userList`, or empties them for a new list. Only runs
   * when `userList` changes, so other renders leave what's been typed alone.
   */
  private fillForm(): void {
    this.listId.value = this.userList?.id ?? '';
    this.listName.value = this.userList?.list_name ?? '';
    this.listDescription.value = this.userList?.description ?? '';
    this.listPrivate.checked = this.userList?.is_private ?? false;
  }

  render(): TemplateResult {
    return html`
      <section class="new-list">
        <form id="user-list-form" part="form" @submit=${this.saveListDetails}>
          ${this.nameFieldTemplate} ${this.descriptionFieldTemplate}
          ${this.privateFieldTemplate} ${this.errorTemplate}
          ${this.footerTemplate}
        </form>
      </section>
    `;
  }

  private get nameFieldTemplate(): TemplateResult {
    return html`<div class="field">
      <input type="hidden" id="id" />
      <label for="name">${msg('List name*')}</label>
      <input type="text" id="name" required />
    </div>`;
  }

  private get descriptionFieldTemplate(): TemplateResult {
    return html`<div class="field">
      <label for="description">${msg('Description')}</label>
      <textarea id="description"></textarea>
    </div>`;
  }

  private get privateFieldTemplate(): TemplateResult {
    return html`<div class="field">
      <label for="private">${msg('Private list')}</label>
      <input type="checkbox" id="private" />
    </div>`;
  }

  private get errorTemplate(): TemplateResult {
    return html`<p class="error" part="error" role="alert">
      ${this.saveFailed
        ? msg('The list could not be saved. Please try again.')
        : nothing}
    </p>`;
  }

  private get footerTemplate(): TemplateResult {
    return html`<div class="footer field">
      <ia-button
        mode="secondary"
        id="cancel"
        part="cancel-button"
        @click=${this.emitCloseModalEvent}
      >
        ${msg('Cancel')}
      </ia-button>
      <ia-button
        mode="primary"
        type="submit"
        id="save-list-settings"
        part="save-button"
        .disabled=${this.saving}
      >
        ${this.saving
          ? html`<ia-status-indicator></ia-status-indicator>`
          : msg('Save')}
      </ia-button>
    </div>`;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --secondary-cta-border--: var(--secondary-cta-border);
          --color-danger--: var(--color-danger);
          --primary-cta-fill--: var(--primary-cta-fill);
          --ia-userlist-settings-width--: var(
            --ia-userlist-settings-width,
            400px
          );

          width: var(--ia-userlist-settings-width--);
          max-width: 100%;
          box-sizing: border-box;
          display: block;
          container-type: inline-size;
          padding: 15px 0 0 0;
          position: relative;
          font-size: 14px;
        }

        .field {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }

        label {
          flex: 0 0 90px;
          text-align: left;
          margin-right: 10px;
          font-weight: 700;
        }

        input[type='text'],
        textarea {
          line-height: 20px;
          padding: 5px;
          /* Fill the row beside the label, at any form width */
          flex: 1 1 auto;
          min-width: 0;
          box-sizing: border-box;
          font-family: inherit;
          font-size: inherit;
          resize: none;
          border-style: solid;
          border-radius: 4px;
          border-width: 1px;
          border-color: var(--secondary-cta-border--);
        }

        /* Inside the border, so the form's edges can't cut it off */
        input[type='text']:focus,
        textarea:focus {
          outline-width: 2px;
          outline-style: solid;
          outline-color: var(--primary-cta-fill--);
          outline-offset: -2px;
        }

        input[type='checkbox'] {
          cursor: pointer;
          margin: 0;
        }

        label[for='private'] {
          cursor: pointer;
        }

        .error {
          margin: 0;
          color: var(--color-danger--);
        }

        /* The saving indicator takes the Save button's text color */
        #save-list-settings ia-status-indicator {
          --ia-theme-primary-text-color: currentColor;
        }

        .footer {
          flex-wrap: wrap;
          gap: 10px;
          margin: 10px 0 0 0;
          /* Line up with the fields, past the label column */
          padding-left: 100px;
        }

        /* Too narrow for a label column: labels go above their fields */
        @container (max-width: 320px) {
          .field:not(.footer) {
            flex-wrap: wrap;
            gap: 5px;
          }

          label {
            flex-basis: 100%;
            margin-right: 0;
          }

          .footer {
            padding-left: 0;
          }
        }
      `,
    ];
  }
}
