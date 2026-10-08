import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { query } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IAModalManager } from './modal-manager';

import { ModalConfig } from './modal-config';
import './modal-manager';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Backdrop color',
    cssVariable: '--modalBackdropColor',
    defaultValue: 'rgba(10, 10, 10, 0.9)',
    inputType: 'text',
  },
  {
    label: 'Backdrop z-index',
    cssVariable: '--modalBackdropZindex',
    defaultValue: 1000,
    inputType: 'number',
    min: 0,
    step: 1,
  },
  {
    label: 'Modal z-index',
    cssVariable: '--modalZindex',
    defaultValue: 2000,
    inputType: 'number',
    min: 0,
    step: 1,
  },
  {
    label: 'Modal width',
    cssVariable: '--modalWidth',
    defaultValue: '32rem',
    inputType: 'text',
  },
  {
    label: 'Modal max width',
    cssVariable: '--modalMaxWidth',
    defaultValue: '95%',
    inputType: 'text',
  },
  {
    label: 'Corner radius',
    cssVariable: '--modalCornerRadius',
    defaultValue: '1rem',
    inputType: 'text',
  },
  {
    label: 'Border',
    cssVariable: '--modalBorder',
    defaultValue: '2px solid black',
    inputType: 'text',
  },
  {
    label: 'Top margin',
    cssVariable: '--modalTopMargin',
    defaultValue: '5rem',
    inputType: 'text',
  },
  {
    label: 'Header logo size',
    cssVariable: '--modalLogoSize',
    defaultValue: '6.5rem',
    inputType: 'text',
  },
  {
    label: 'Processing indicator size',
    cssVariable: '--processingImageSize',
    defaultValue: '7.5rem',
    inputType: 'text',
  },
  {
    label: 'Title font size',
    cssVariable: '--modalTitleFontSize',
    defaultValue: '1.8rem',
    inputType: 'text',
  },
  {
    label: 'Subtitle font size',
    cssVariable: '--modalSubtitleFontSize',
    defaultValue: '1.4rem',
    inputType: 'text',
  },
  {
    label: 'Headline font size',
    cssVariable: '--modalHeadlineFontSize',
    defaultValue: '1.6rem',
    inputType: 'text',
  },
  {
    label: 'Message font size',
    cssVariable: '--modalMessageFontSize',
    defaultValue: '1.4rem',
    inputType: 'text',
  },
];

const EXAMPLE_USAGE = `<modal-manager></modal-manager>

<script type="module">
  import { ModalConfig } from '@internetarchive/elements/modal-manager/modal-config';

  const manager = document.querySelector('modal-manager');
  const config = new ModalConfig();
  config.headline = html\`Success\`;
  config.message = html\`Thank you for your support!\`;

  await manager.showModal({
    config,
    customModalContent: html\`<button>Optional content</button>\`,
    userClosedModalCallback: () => console.log('closed by the user'),
  });
  manager.closeModal();
</script>`;

@customElement('modal-manager-story')
export class ModalManagerStory extends LitElement {
  @query('modal-manager')
  private modalManager!: IAModalManager;

  @query('#settings__title') private titleInput!: HTMLInputElement;

  @query('#settings__subtitle') private subtitleInput!: HTMLInputElement;

  @query('#settings__headline') private headlineInput!: HTMLInputElement;

  @query('#settings__message') private messageInput!: HTMLInputElement;

  @query('#settings__header-color') private headerColorInput!: HTMLInputElement;

  @query('#settings__body-color') private bodyColorInput!: HTMLInputElement;

  @query('#settings__show-header-logo')
  private showHeaderLogoCheck!: HTMLInputElement;

  @query('#settings__show-close-button')
  private showCloseButtonCheck!: HTMLInputElement;

  @query('#settings__close-on-backdrop')
  private closeOnBackdropCheck!: HTMLInputElement;

  @query('#settings__show-left-nav')
  private showLeftNavCheck!: HTMLInputElement;

  @query('#settings__left-nav-text')
  private leftNavTextInput!: HTMLInputElement;

  @query('#settings__show-processing')
  private showProcessingCheck!: HTMLInputElement;

  @query('#settings__processing-mode')
  private processingModeSelect!: HTMLSelectElement;

  @query('#settings__custom-content')
  private customContentCheck!: HTMLInputElement;

  render() {
    return html`
      <story-template
        elementTag="modal-manager"
        elementClassName="IAModalManager"
        .customExampleUsage=${EXAMPLE_USAGE}
        .styleInputData=${{ settings: styleInputSettings }}
      >
        <div slot="demo">
          <modal-manager></modal-manager>
          <div class="actions">
            <button @click=${this.showConfiguredModal}>Show modal</button>
            <button @click=${this.showProcessingModal}>
              Processing, then complete
            </button>
            <button @click=${this.showUnclosableModal}>
              Unclosable (closes itself)
            </button>
            <button @click=${this.showCallbackModal}>
              Closed callback opens another
            </button>
          </div>
        </div>

        <form slot="settings" @submit=${(e: Event) => e.preventDefault()}>
          <table>
            ${this.textRow('title', 'Title', 'Donation Received')}
            ${this.textRow('subtitle', 'Subtitle', 'Thanks a bunch!')}
            ${this.textRow('headline', 'Headline', 'Success')}
            ${this.textRow('message', 'Message', 'Thank you for your support!')}
            ${this.textRow('header-color', 'Header color', '#55a183')}
            ${this.textRow('body-color', 'Body color', '#fbfbfd')}
            ${this.checkRow('show-header-logo', 'Show header logo', true)}
            ${this.checkRow('show-close-button', 'Show close button', true)}
            ${this.checkRow(
              'close-on-backdrop',
              'Close on backdrop click',
              true,
            )}
            ${this.checkRow('show-left-nav', 'Show left nav button', false)}
            ${this.textRow('left-nav-text', 'Left nav button text', 'Back')}
            ${this.checkRow(
              'show-processing',
              'Show processing indicator',
              false,
            )}
            <tr>
              <td>
                <label for="settings__processing-mode">Indicator mode</label>
              </td>
              <td>
                <select id="settings__processing-mode">
                  <option value="complete">complete</option>
                  <option value="processing">processing</option>
                </select>
              </td>
            </tr>
            ${this.checkRow('custom-content', 'Custom modal content', false)}
          </table>
          <p>Applied when you press "Show modal".</p>
        </form>

        <div slot="usage-notes">
          <code>modal-manager</code> is meant to be a single instance on the
          page, found by tag name. Open a modal with
          <code>showModal({ config })</code> and close it with
          <code>closeModal()</code>. It sets the <code>mode</code> attribute to
          <code>open</code> or <code>closed</code>, emits
          <code>modeChanged</code>, and adds the
          <code>modal-manager-open</code> class to the body while a modal is
          showing. The manager draws its backdrop even when closed, so hide it
          while <code>mode="closed"</code>, as this demo does.
        </div>
      </story-template>
    `;
  }

  private textRow(id: string, label: string, value: string) {
    return html`<tr>
      <td><label for="settings__${id}">${label}</label></td>
      <td><input type="text" id="settings__${id}" value=${value} /></td>
    </tr>`;
  }

  private checkRow(id: string, label: string, checked: boolean) {
    return html`<tr>
      <td><label for="settings__${id}">${label}</label></td>
      <td>
        <input type="checkbox" id="settings__${id}" ?checked=${checked} />
      </td>
    </tr>`;
  }

  private showConfiguredModal() {
    const text = (value: string) => (value ? html`${value}` : undefined);
    const config = new ModalConfig({
      title: text(this.titleInput.value),
      subtitle: text(this.subtitleInput.value),
      headline: text(this.headlineInput.value),
      message: text(this.messageInput.value),
      headerColor: this.headerColorInput.value,
      bodyColor: this.bodyColorInput.value,
      showHeaderLogo: this.showHeaderLogoCheck.checked,
      showCloseButton: this.showCloseButtonCheck.checked,
      closeOnBackdropClick: this.closeOnBackdropCheck.checked,
      showLeftNavButton: this.showLeftNavCheck.checked,
      leftNavButtonText: this.leftNavTextInput.value,
      showProcessingIndicator: this.showProcessingCheck.checked,
      processingImageMode: this.processingModeSelect.value as
        | 'processing'
        | 'complete',
    });

    const customModalContent = this.customContentCheck.checked
      ? html`<div style="text-align: center; margin-top: 10px;">
          <button @click=${() => alert('You pressed a button.')}>
            I'm a button to press
          </button>
        </div>`
      : undefined;

    this.modalManager.showModal({
      config,
      customModalContent,
      userPressedLeftNavButtonCallback: () => this.modalManager.closeModal(),
    });
  }

  private showProcessingModal() {
    const config = new ModalConfig({
      headerColor: '#497fbf',
      headline: html`Processing`,
      showProcessingIndicator: true,
      processingImageMode: 'processing',
      showCloseButton: false,
      closeOnBackdropClick: false,
    });
    this.modalManager.showModal({ config });

    setTimeout(() => {
      this.modalManager.showModal({
        config: new ModalConfig({
          headline: html`Complete`,
          showProcessingIndicator: true,
          processingImageMode: 'complete',
        }),
      });
    }, 1500);
  }

  private showUnclosableModal() {
    const config = new ModalConfig({
      message: html`The user can't close this. It closes itself in 2 seconds.`,
      showCloseButton: false,
      closeOnBackdropClick: false,
    });
    this.modalManager.showModal({ config });

    setTimeout(() => this.modalManager.closeModal(), 2000);
  }

  private showCallbackModal() {
    this.modalManager.showModal({
      config: new ModalConfig({
        message: html`When you close this modal another will open.`,
      }),
      userClosedModalCallback: () => {
        this.modalManager.showModal({
          config: new ModalConfig({
            message: html`I'm another modal.`,
            headerColor: '#497fbf',
          }),
        });
      },
    });
  }

  static get styles(): CSSResultGroup {
    return css`
      modal-manager {
        display: none;
      }

      modal-manager[mode='open'] {
        display: block;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      td {
        padding: 0.15rem 0.5rem 0.15rem 0;
      }
    `;
  }
}
