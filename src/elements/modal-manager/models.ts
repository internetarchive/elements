import type { LitElement, TemplateResult } from 'lit';
import type { ModalConfig } from './modal-config';

/**
 * Various modes the modal can be in
 */
export const ModalManagerMode = {
  Open: 'open',
  Closed: 'closed',
} as const;

export type ModalManagerMode =
  (typeof ModalManagerMode)[keyof typeof ModalManagerMode];

export interface ModalManagerInterface extends LitElement {
  /**
   * Get the current modal mode.
   */
  getMode(): ModalManagerMode;

  /**
   * Show a modal from a given ModalConfig
   *
   * @param config ModalConfig
   * @param customModalContent TemplateResult | undefined
   * @param userClosedModalCallback () => void | undefined an optional callback when the modal is closed
   * @param userPressedLeftNavButtonCallback () => void | undefined an optional callback when the left nav button is pressed
   */
  showModal(options: {
    config: ModalConfig;
    customModalContent?: TemplateResult;
    userClosedModalCallback?: () => void;
    userPressedLeftNavButtonCallback?: () => void;
  }): Promise<void>;

  /**
   * Close the currently open modal
   */
  closeModal(): void;
}

/**
 * The ModalManagerHostBridgeInterface is a delegate interface for
 * the host to implement environment-specific changes when the modal
 * is open or closed.
 *
 * A default implementation is provided, but can be overridden if
 * it does not work for the environment.
 */
export interface ModalManagerHostBridgeInterface {
  handleModeChange(mode: ModalManagerMode): void;
}
