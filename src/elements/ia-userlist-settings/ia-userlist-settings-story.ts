import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { query, state } from 'lit/decorators.js';
import { customElement } from '@src/utils/custom-element';

import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IAModalManager } from '@src/elements/modal-manager/modal-manager';
import { ModalConfig } from '@src/elements/modal-manager/modal-config';
import type { ApiFetchOptions } from '@src/services/fetch-handler/fetch-options';
import type { SearchServiceInterface } from '@src/services/search-service/search-service-interface';
import type { UserServiceInterface } from '@src/services/user-service/user-service';
import type { UserList } from '@src/services/user-lists-service/models';
import { UserListsService } from '@src/services/user-lists-service/user-lists-service';
import { SampleListsBackend } from '@src/services/user-lists-service/mocks/sample-lists-backend';
import type { UserListModel } from './models';

import './ia-userlist-settings';
import '@src/elements/modal-manager/modal-manager';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Form width',
    cssVariable: '--ia-userlist-settings-width',
    defaultValue: '400px',
    inputType: 'text',
  },
  {
    label: 'Text color',
    cssVariable: '--ia-theme-primary-text-color',
    defaultValue: '#2c2c2c',
    inputType: 'color',
  },
  {
    label: 'Font family',
    cssVariable: '--ia-theme-base-font-family',
    defaultValue: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    inputType: 'text',
  },
  {
    label: 'Input border color',
    cssVariable: '--ia-theme-secondary-cta-border',
    defaultValue: '#999999',
    inputType: 'color',
  },
  {
    label: 'Error message color',
    cssVariable: '--ia-theme-color-danger',
    defaultValue: '#e51c23',
    inputType: 'color',
  },
  {
    label: 'Save button fill',
    cssVariable: '--ia-theme-primary-cta-fill',
    defaultValue: '#194880',
    inputType: 'color',
  },
  {
    label: 'Save button text color',
    cssVariable: '--ia-theme-primary-cta-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Cancel button fill',
    cssVariable: '--ia-theme-secondary-cta-fill',
    defaultValue: '#333333',
    inputType: 'color',
  },
  {
    label: 'Cancel button text color',
    cssVariable: '--ia-theme-secondary-cta-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
];

const MAX_LOG_ENTRIES = 6;

/**
 * The user lists service's sample backend, slowed down so a save in progress
 * shows, and able to refuse saves the way archive.org refuses one over the
 * list limit.
 */
class StoryBackend {
  failSaves = false;

  private backend = new SampleListsBackend();

  async fetchApiResponse<T>(
    url: string,
    options?: ApiFetchOptions,
  ): Promise<T> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (this.failSaves && options?.method && options.method !== 'GET') {
      return {
        success: false,
        error: 'Bad Request',
        value: 'You have exceeded the maximum number of lists.',
      } as T;
    }
    return this.backend.fetchApiResponse<T>(url, options);
  }
}

@customElement('ia-userlist-settings-story')
export class IAUserListSettingsStory extends LitElement {
  /** The list "Edit a list" fills the form with; saving an edit updates it */
  @state() private existingList: UserListModel = {
    id: '1',
    list_name: 'Favorite books',
    description: 'Books worth reading twice',
    is_private: false,
  };

  @state() private editing = false;

  @state() private failSaves = false;

  @state() private log: string[] = [];

  @query('modal-manager') private modalManager!: IAModalManager;

  private backend = new StoryBackend();

  /** The real service, on the sample backend. Saving never uses search or the user service. */
  private service = new UserListsService({
    fetchHandler: this.backend,
    searchService: {} as SearchServiceInterface,
    userService: {} as UserServiceInterface,
  });

  render() {
    return html`
      <story-template
        elementTag="ia-userlist-settings"
        elementClassName="IAUserListSettings"
        .styleInputData=${{ settings: styleInputSettings }}
        .customExampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <modal-manager></modal-manager>
          <ia-userlist-settings
            .userList=${this.editing ? this.existingList : undefined}
            .userListsService=${this.service}
            @listModalClosed=${() => this.record('listModalClosed')}
            @userListSaving=${() => this.record('userListSaving')}
            @userListSaved=${this.listSaved}
            @userListError=${(e: CustomEvent) =>
              this.record(`userListError ${e.detail.error}`)}
          ></ia-userlist-settings>
        </div>

        <div slot="demo" class="panel">
          <div class="log-header">
            <strong>Events</strong>
            <button @click=${() => (this.log = [])}>Clear</button>
          </div>
          ${this.log.length === 0
            ? html`<p class="empty">Save or cancel to see events here.</p>`
            : html`<ol class="log">
                ${this.log.map((entry) => html`<li><code>${entry}</code></li>`)}
              </ol>`}
        </div>

        <div slot="settings">
          <fieldset>
            <legend>Form</legend>
            <label>
              <input
                type="radio"
                name="list"
                .checked=${!this.editing}
                @change=${() => (this.editing = false)}
              />
              New list (empty form)
            </label>
            <label>
              <input
                type="radio"
                name="list"
                .checked=${this.editing}
                @change=${() => (this.editing = true)}
              />
              Edit "${this.existingList.list_name}" (filled form)
            </label>
          </fieldset>
          <label>
            <input
              type="checkbox"
              .checked=${this.failSaves}
              @change=${(e: Event) =>
                this.setFailSaves((e.target as HTMLInputElement).checked)}
            />
            Make saves fail
          </label>
          <button class="open-modal" @click=${this.openModal}>
            Open in a modal
          </button>
        </div>

        <div slot="usage-notes">
          <p>
            The form for creating or editing a user list. The details page's
            Lists button and the profile page's lists tab show it inside a
            <code>modal-manager</code> modal, which supplies the "List settings"
            header and the close button. This demo shows the form on its own;
            "Open in a modal" in the settings shows it the way those pages do.
          </p>
          <p>
            Pass the list to edit as <code>userList</code> to fill the form, or
            leave it unset for an empty one to create a list. Save calls
            <code>updateList</code> when the list has an <code>id</code> and
            <code>createList</code> otherwise, on the
            <code>userListsService</code> it's handed: a
            <code>UserListsService</code> from
            <code>@internetarchive/elements/services/user-lists-service</code>,
            or anything implementing <code>UserListsServiceInterface</code>.
            This demo hands it a real <code>UserListsService</code> on the
            service's sample backend, which answers in archive.org's shape and
            keeps lists in memory, so nothing is saved to archive.org. "Make
            saves fail" makes the backend refuse saves the way it refuses one
            over the list limit.
          </p>
          <p>
            Events: <code>userListSaving</code> when a save starts,
            <code>userListSaved</code> with the saved list as
            <code>detail</code>, <code>userListError</code> with the error in
            <code>detail.error</code>, and <code>listModalClosed</code> on
            Cancel. Save is disabled while a save is in progress. Saving a new
            list clears the form. A failed save shows an error message in the
            form, which clears on the next save or when
            <code>userList</code> changes; tick "Make saves fail" to see it.
            Failed saves are also reported to Sentry through
            <code>window.Sentry</code>, when the page has it, unless the browser
            is offline.
          </p>
          <p>
            Parts for styling: <code>form</code>, <code>error</code>,
            <code>cancel-button</code> and <code>save-button</code>.
          </p>
          <p>
            The List name field takes focus when the form renders. Set
            <code>.autoFocusListName=\${false}</code> to leave focus where it
            is.
          </p>
        </div>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    const userList = this.editing
      ? `\n  .userList=\${${JSON.stringify(this.existingList)}}`
      : '';
    return `<ia-userlist-settings${userList}
  .userListsService=\${userListsService}
  @listModalClosed=\${closeModal}
  @userListSaved=\${(e) => listSaved(e.detail)}
  @userListError=\${(e) => showError(e.detail.error)}
></ia-userlist-settings>`;
  }

  /** Shows the form in a modal, the way offshoot's lists pages open it */
  private openModal = () => {
    const config = new ModalConfig({
      title: html`List settings`,
      headerColor: '#194880',
      showCloseButton: true,
      showHeaderLogo: false,
      closeOnBackdropClick: true,
    });

    const customModalContent = html`
      <ia-userlist-settings
        .userList=${this.editing ? this.existingList : undefined}
        .userListsService=${this.service}
        @listModalClosed=${() => {
          this.record('listModalClosed');
          this.modalManager.closeModal();
        }}
        @userListSaving=${() => this.record('userListSaving')}
        @userListSaved=${(e: CustomEvent<UserList>) => {
          this.listSaved(e);
          this.modalManager.closeModal();
        }}
        @userListError=${(e: CustomEvent) =>
          this.record(`userListError ${e.detail.error}`)}
      ></ia-userlist-settings>
    `;

    this.modalManager.showModal({ config, customModalContent });
  };

  private listSaved = (e: CustomEvent<UserList>) => {
    this.record(`userListSaved ${JSON.stringify(e.detail)}`);
    if (this.editing) {
      const { id, list_name, description, is_private } = e.detail;
      this.existingList = {
        id: String(id),
        list_name,
        description,
        is_private,
      };
    }
  };

  private setFailSaves(fail: boolean) {
    this.failSaves = fail;
    this.backend.failSaves = fail;
  }

  private record(entry: string) {
    this.log = [entry, ...this.log].slice(0, MAX_LOG_ENTRIES);
  }

  static get styles(): CSSResultGroup {
    return css`
      /* offshoot's create-user-list modal, in px as archive.org's 10px root
         renders it */
      modal-manager {
        display: none;
        --modalTitleLineHeight: 45px;
        --modalTitleFontSize: 18px;
        --modalCloseButtonSize: 20px;
        --modalCloseButtonOffset: 12px;
        --modalHeaderBottomPadding: 0;
        --modalBottomPadding: 20px;
        --modalTopMargin: 50px;
        --modalBottomMargin: 25px;
        --modalWidth: 400px;
      }

      modal-manager[mode='open'] {
        display: block;
      }

      .open-modal {
        margin-top: 8px;
      }

      .panel {
        margin-top: 16px;
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      .log-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .log {
        margin: 8px 0 0;
        padding-left: 20px;
      }

      .log code {
        word-break: break-all;
      }

      .empty {
        margin: 8px 0 0;
        color: #666;
      }

      fieldset {
        margin-bottom: 8px;
      }

      label {
        display: block;
      }
    `;
  }
}
