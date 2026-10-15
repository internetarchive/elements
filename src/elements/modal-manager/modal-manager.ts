import {
  LitElement,
  html,
  css,
  CSSResult,
  TemplateResult,
  PropertyValues,
} from 'lit';
import { property, query } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import Modal from './shoelace/modal';
import { getDeepestActiveElement } from './shoelace/active-elements';

import './ia-modal-manager-template';
import type { IAModalManagerTemplate } from './ia-modal-manager-template';
import { ModalConfig } from './modal-config';
import { ModalManagerHostBridge } from './modal-manager-host-bridge';
import { ModalManagerMode } from './models';
import type {
  ModalManagerHostBridgeInterface,
  ModalManagerInterface,
} from './models';

/**
 * A page-level singleton that shows one modal at a time.
 *
 * The public tag is `modal-manager` because hosts find the manager by looking
 * it up by tag name.
 */
@customElement('modal-manager')
export class IAModalManager
  extends LitElement
  implements ModalManagerInterface
{
  /**
   * The current mode of the IAModalManager
   *
   * Current options are `open` or `closed`
   *
   * @type {ModalManagerMode}
   * @memberof IAModalManager
   */
  @property({ type: String, reflect: true }) mode: ModalManagerMode =
    ModalManagerMode.Closed;

  /**
   * Custom content to display in the modal's content slot
   *
   * @type {(TemplateResult | undefined)}
   * @memberof IAModalManager
   */
  @property({ type: Object }) customModalContent?: TemplateResult;

  /**
   * This hostBridge handles environmental-specific interactions such as adding classes
   * to the body tag or event listeners needed to support the modal manager in the host environment.
   *
   * There is a default `ModalManagerHostBridge`, but consumers can override it with a custom
   * `ModalManagerHostBridgeInterface`
   *
   * @type {ModalManagerHostBridgeInterface}
   * @memberof IAModalManager
   */
  @property({ type: Object })
  hostBridge: ModalManagerHostBridgeInterface = new ModalManagerHostBridge(
    this,
  );

  /**
   * Reference to the IAModalManagerTemplate DOM element
   *
   * @private
   * @type {IAModalManagerTemplate}
   * @memberof IAModalManager
   */
  @query('ia-modal-manager-template')
  private modalTemplate?: IAModalManagerTemplate;

  // Imported tab handling from shoelace
  public modal = new Modal(this);

  async firstUpdated(): Promise<void> {
    // Give the browser a chance to paint
    await new Promise((r) => setTimeout(r, 0));

    if (this.closeOnBackdropClick) {
      this.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          this.backdropClicked();
        }
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.modal.deactivate();
  }

  /** @inheritdoc */
  render(): TemplateResult {
    return html`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <ia-modal-manager-template
          @closeButtonPressed=${this.closeButtonPressed}
          @leftNavButtonPressed=${this.callUserPressedLeftNavButtonCallback}
          tabindex="-1"
        >
          ${this.customModalContent}
        </ia-modal-manager-template>
      </div>
    `;
  }

  /** @inheritdoc */
  getMode(): ModalManagerMode {
    return this.mode;
  }

  /** @inheritdoc */
  closeModal(): void {
    this.mode = ModalManagerMode.Closed;
    this.customModalContent = undefined;
    if (this.modalTemplate) this.modalTemplate.config = new ModalConfig();
    this.modal.deactivate();

    // Return focus to the triggering element, if possible
    (this.triggeringElement as HTMLElement)?.focus?.();
    this.triggeringElement = undefined;
  }

  /**
   * Whether the modal should close if the user taps on the backdrop
   *
   * @private
   * @memberof IAModalManager
   */
  private closeOnBackdropClick = true;

  /**
   * The element that had focus when the modal was opened, so that we can return focus
   * to it after the modal closes.
   */
  private triggeringElement?: Element;

  /**
   * A callback if the user closes the modal
   *
   * @private
   * @memberof IAModalManager
   */
  private userClosedModalCallback?: () => void;

  /**
   * A callback if the user presses the left nav button
   *
   * @private
   * @memberof IAModalManager
   */
  private userPressedLeftNavButtonCallback?: () => void;

  /**
   * Call the userClosedModalCallback and reset it if it exists
   *
   * @private
   * @memberof IAModalManager
   */
  private callUserClosedModalCallback(): void {
    // we assign the callback to a temp var and undefine it before calling it
    // otherwise, we run into the potential for an infinite loop if the
    // callback triggers another `showModal()`, which would execute `userClosedModalCallback`
    const callback = this.userClosedModalCallback;
    this.userClosedModalCallback = undefined;
    if (callback) callback();
  }

  /**
   * Call the user pressed left nav button callback and reset it if it exists
   *
   * @private
   * @memberof IAModalManager
   */
  private callUserPressedLeftNavButtonCallback(): void {
    // avoids an infinite showModal() loop, as above
    const callback = this.userPressedLeftNavButtonCallback;
    this.userPressedLeftNavButtonCallback = undefined;
    if (callback) callback();
  }

  /** @inheritdoc */
  async showModal(options: {
    config: ModalConfig;
    customModalContent?: TemplateResult;
    userClosedModalCallback?: () => void;
    userPressedLeftNavButtonCallback?: () => void;
  }): Promise<void> {
    // If the dialog is being opened, make note of what element was focused beforehand
    if (this.mode === ModalManagerMode.Closed) this.captureFocusedElement();

    this.closeOnBackdropClick = options.config.closeOnBackdropClick;
    this.userClosedModalCallback = options.userClosedModalCallback;
    this.userPressedLeftNavButtonCallback =
      options.userPressedLeftNavButtonCallback;
    this.customModalContent = options.customModalContent;
    this.mode = ModalManagerMode.Open;
    if (this.modalTemplate) {
      this.modalTemplate.config = options.config;
      await this.modalTemplate.updateComplete;
      this.modalTemplate.focus();
    }
    this.modal.activate();
  }

  /**
   * Sets the triggering element to the one that is currently focused, as deep
   * within Shadow DOM as possible.
   */
  private captureFocusedElement(): void {
    this.triggeringElement = getDeepestActiveElement();
  }

  /** @inheritdoc */
  updated(changed: PropertyValues): void {
    /* istanbul ignore else */
    if (changed.has('mode')) {
      this.handleModeChange();
    }
  }

  /**
   * Called when the backdrop is clicked
   *
   * @private
   * @memberof IAModalManager
   */
  private backdropClicked(): void {
    if (this.closeOnBackdropClick) {
      this.closeModal();
      this.callUserClosedModalCallback();
    }
  }

  /**
   * Handle the mode change
   *
   * @private
   * @memberof IAModalManager
   */
  private handleModeChange(): void {
    this.hostBridge.handleModeChange(this.mode);
    this.emitModeChangeEvent();
  }

  /**
   * Emit a modeChange event
   *
   * @private
   * @memberof IAModalManager
   */
  private emitModeChangeEvent(): void {
    const event = new CustomEvent('modeChanged', {
      detail: { mode: this.mode },
    });
    this.dispatchEvent(event);
  }

  /**
   * Called when the modal close button is pressed. Closes the modal.
   *
   * @private
   * @memberof IAModalManager
   */
  private closeButtonPressed(): void {
    this.closeModal();
    this.callUserClosedModalCallback();
  }

  /** @inheritdoc */
  static get styles(): CSSResult {
    const modalBackdropColor = css`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`;
    const modalBackdropZindex = css`var(--modalBackdropZindex, 1000)`;

    const modalWidth = css`var(--modalWidth, 32rem)`;
    const modalMaxWidth = css`var(--modalMaxWidth, 95%)`;
    const modalZindex = css`var(--modalZindex, 2000)`;

    return css`
      .container {
        width: 100%;
        height: 100%;
      }

      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        background-color: ${modalBackdropColor};
        width: 100%;
        height: 100%;
        z-index: ${modalBackdropZindex};
      }

      ia-modal-manager-template {
        outline: 0;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: ${modalZindex};
        width: ${modalWidth};
        max-width: ${modalMaxWidth};
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'modal-manager': IAModalManager;
  }
}
