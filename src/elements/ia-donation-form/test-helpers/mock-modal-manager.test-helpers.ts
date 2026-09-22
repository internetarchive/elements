import type {
  ModalConfig,
  ModalManagerInterface,
} from '@internetarchive/modal-manager';
import { ModalManagerMode } from '@internetarchive/modal-manager';
import { html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

/** Records what it was asked to show instead of rendering a modal. */
@customElement('test-mock-modal-manager')
export class MockModalManager
  extends LitElement
  implements ModalManagerInterface
{
  closeCalled = false;

  showModalOptions?: {
    config: ModalConfig;
    customModalContent?: TemplateResult;
    userClosedModalCallback?: () => void;
  };

  closeModal(): void {
    this.closeCalled = true;
  }

  getMode(): ModalManagerMode {
    return ModalManagerMode.Closed;
  }

  async showModal(options: {
    config: ModalConfig;
    customModalContent?: TemplateResult;
    userClosedModalCallback?: () => void;
  }): Promise<void> {
    this.showModalOptions = options;
  }

  render(): TemplateResult {
    return html``;
  }
}
