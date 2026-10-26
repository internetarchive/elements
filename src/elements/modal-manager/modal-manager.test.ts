import {
  fixture,
  oneEvent,
  elementUpdated,
  nextFrame,
  fixtureCleanup,
} from '@open-wc/testing-helpers';
import { describe, test, expect, afterEach } from 'vitest';
import { TemplateResult, html } from 'lit';

import { ModalConfig } from './modal-config';
import type { IAModalManager } from './modal-manager';
import { ModalManagerMode } from './models';
import type { ModalManagerInterface } from './models';
import './modal-manager';

import { getTabbableElements } from './shoelace/tabbable';

describe('Modal Manager', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test('defaults to closed', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    expect(el.mode).to.equal('closed');
  });

  test('can be closed by calling closeModal', async () => {
    const el = (await fixture(html`
      <modal-manager .mode=${ModalManagerMode.Open}></modal-manager>
    `)) as IAModalManager;

    el.customModalContent = 'foo' as unknown as TemplateResult;
    await elementUpdated(el);

    expect(el.customModalContent).to.equal('foo');
    el.closeModal();
    await elementUpdated(el);

    expect(el.mode).to.equal('closed');
    expect(el.customModalContent).to.equal(undefined);
  });

  test('can be closed by clicking on the backdrop', async () => {
    const el = (await fixture(html`
      <modal-manager .mode=${ModalManagerMode.Open}></modal-manager>
    `)) as IAModalManager;

    const backdrop = el.shadowRoot?.querySelector('.backdrop');
    const clickEvent = new MouseEvent('click');

    backdrop?.dispatchEvent(clickEvent);
    await elementUpdated(el);

    expect(el.mode).to.equal('closed');
  });

  test('emits a modeChanged event when opening', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    const config = new ModalConfig();

    setTimeout(() => {
      el.showModal({ config });
    });
    const response = await oneEvent(el, 'modeChanged');
    expect(response.detail.mode).to.equal(ModalManagerMode.Open);
  });

  test('emits a modeChanged event when closing', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    const config = new ModalConfig();
    await el.showModal({ config });
    await elementUpdated(el);
    await nextFrame();

    setTimeout(() => {
      el.closeModal();
    });
    const response = await oneEvent(el, 'modeChanged');
    expect(response.detail.mode).to.equal(ModalManagerMode.Closed);
  });

  test('can show a modal', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    const config = new ModalConfig();
    el.showModal({ config });
    await elementUpdated(el);
    expect(el.mode).to.equal(ModalManagerMode.Open);
  });

  test('sets the --containerHeight CSS property when the window resizes', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    const config = new ModalConfig();
    el.showModal({ config });
    await elementUpdated(el);
    const event = new Event('resize');
    const propBefore = el.style.getPropertyValue('--containerHeight');
    expect(propBefore).to.equal('');
    window.dispatchEvent(event);
    await elementUpdated(el);
    const propAfter = el.style.getPropertyValue('--containerHeight');
    expect(propAfter).to.not.equal('');
  });

  test('calls the userClosedModalCallback when the user taps the backdrop', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    const config = new ModalConfig();
    let callbackCalled = false;
    const callback = (): void => {
      callbackCalled = true;
    };
    el.showModal({
      config,
      userClosedModalCallback: callback,
    });
    await elementUpdated(el);

    const backdrop = el.shadowRoot?.querySelector('.backdrop');
    const clickEvent = new MouseEvent('click');
    backdrop?.dispatchEvent(clickEvent);

    await elementUpdated(el);

    expect(callbackCalled).to.equal(true);
  });

  test('does not call the userClosedModalCallback when the modal just closes', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    const config = new ModalConfig();
    let callbackCalled = false;
    const callback = (): void => {
      callbackCalled = true;
    };
    el.showModal({
      config,
      userClosedModalCallback: callback,
    });
    await elementUpdated(el);
    el.closeModal();
    await elementUpdated(el);
    expect(callbackCalled).to.equal(false);
  });

  test('calls the userPressedLeftNavButtonCallback when the user clicks the left nav button', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    const config = new ModalConfig();
    config.showLeftNavButton = true;

    let callbackCalled = false;
    const callback = (): void => {
      callbackCalled = true;
    };
    el.showModal({
      config,
      userPressedLeftNavButtonCallback: callback,
    });
    await elementUpdated(el);

    const modalTemplate = el.shadowRoot?.querySelector(
      'ia-modal-manager-template',
    );
    expect(modalTemplate).to.exist;

    modalTemplate?.dispatchEvent(new Event('leftNavButtonPressed'));

    await elementUpdated(el);

    expect(callbackCalled).to.equal(true);
  });

  test('mode is set to closed when close button is pressed', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    const config = new ModalConfig();
    el.showModal({ config });
    await elementUpdated(el);

    expect(el.mode).to.equal('open');

    const modal = el.shadowRoot?.querySelector('ia-modal-manager-template');
    const closeButton = modal?.shadowRoot?.querySelector('.close-button');
    const clickEvent = new MouseEvent('click');
    closeButton?.dispatchEvent(clickEvent);

    await elementUpdated(el);

    expect(el.mode).to.equal('closed');
  });

  test('mode is set to closed when close button gets spacebar pressed', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    const config = new ModalConfig();
    el.showModal({ config });
    await elementUpdated(el);

    expect(el.mode).to.equal('open');

    const modal = el.shadowRoot?.querySelector('ia-modal-manager-template');
    const closeButton = modal?.shadowRoot?.querySelector('.close-button');

    // Close with keyboard
    const spacebarEvent = new KeyboardEvent('keydown', { key: ' ' });
    closeButton?.dispatchEvent(spacebarEvent);

    await elementUpdated(el);

    expect(el.mode).to.equal('closed');
  });

  test('mode remains open when close button gets non-button keypress', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    const config = new ModalConfig();
    el.showModal({ config });
    await elementUpdated(el);

    expect(el.mode).to.equal('open');

    const modal = el.shadowRoot?.querySelector('ia-modal-manager-template');
    const closeButton = modal?.shadowRoot?.querySelector('.close-button');

    // Close with keyboard
    const keyboardEvent = new KeyboardEvent('keydown', { key: '.' });
    closeButton?.dispatchEvent(keyboardEvent);

    await elementUpdated(el);

    expect(el.mode).to.equal('open');
  });

  test('allows the user to close by clicking on the backdrop if configured to', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    const config = new ModalConfig();
    config.closeOnBackdropClick = true;
    el.showModal({ config });
    await elementUpdated(el);

    const backdrop = el.shadowRoot?.querySelector('.backdrop');
    const clickEvent = new MouseEvent('click');
    backdrop?.dispatchEvent(clickEvent);

    await elementUpdated(el);

    expect(el.mode).to.equal('closed');
  });

  test("doesn't allow the user to close by clicking on the backdrop if configured to", async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as ModalManagerInterface;

    const config = new ModalConfig();
    config.closeOnBackdropClick = false;
    el.showModal({ config });
    await elementUpdated(el);

    const backdrop = el.shadowRoot?.querySelector('.backdrop');
    const clickEvent = new MouseEvent('click');
    backdrop?.dispatchEvent(clickEvent);

    await elementUpdated(el);

    expect(el.getMode()).to.equal('open');
  });

  test('ia logo should not visible on modal', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as ModalManagerInterface;

    const config = new ModalConfig();
    config.showHeaderLogo = false;
    el.showModal({ config });
    await elementUpdated(el);

    const logoIcon = el.shadowRoot?.querySelector('.logo-icon');
    expect(logoIcon).to.not.exist;
  });

  test('should trap Tab key', async () => {
    const el = (await fixture(html`
      <modal-manager></modal-manager>
    `)) as IAModalManager;

    const config = new ModalConfig();
    el.showModal({ config });
    await elementUpdated(el);

    expect(el.mode).to.equal('open');

    // Tab once to focus
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
    document.dispatchEvent(tabEvent);
    await elementUpdated(el);
    await nextFrame();

    // Should be only one tabbable element
    const modal = el.shadowRoot?.querySelector(
      'ia-modal-manager-template',
    ) as HTMLElement;
    const tabbableElements = getTabbableElements(modal);
    expect(tabbableElements?.length).to.equal(1);

    const closeButton = modal?.shadowRoot?.querySelector(
      '.close-button',
    ) as HTMLElement;
    expect(modal?.shadowRoot?.activeElement).to.equal(closeButton);

    // Tab again
    el.dispatchEvent(tabEvent);
    await elementUpdated(el);
    await nextFrame();

    // Should be only one tabbable element
    expect(modal?.shadowRoot?.activeElement).to.equal(closeButton);

    // Shift + Tab
    const shiftTabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
    });
    document.dispatchEvent(shiftTabEvent);
    await elementUpdated(el);
    await nextFrame();

    // Should be only one tabbable element
    expect(modal?.shadowRoot?.activeElement).to.equal(closeButton);
  });

  test('returns keyboard focus to the triggering element on close', async () => {
    const config = new ModalConfig();
    const el = (await fixture(html`
      <div>
        <button>Another button</button>
        <button
          id="open-modal-btn"
          @click=${() => {
            const modal = el.querySelector('modal-manager') as IAModalManager;
            modal.showModal({ config });
          }}
        >
          Open modal
        </button>
        <modal-manager></modal-manager>
      </div>
    `)) as HTMLDivElement;

    const openBtn = el.querySelector('#open-modal-btn') as HTMLButtonElement;
    const modal = el.querySelector('modal-manager') as IAModalManager;

    // Focus is initially on the Open button
    openBtn.focus();
    expect(document.activeElement).to.equal(openBtn);

    // Focus enters the modal when it is opened
    openBtn.click();
    await nextFrame();
    expect(document.activeElement).to.equal(modal);

    // With the modal already open, simulate showing different content.
    // This step is to ensure that even if showModal is called multiple times, we still
    // maintain the originally-focused element (subsequent calls do not overwrite it).
    modal.showModal({ config: new ModalConfig() });
    await nextFrame();

    // Focus returns to the Open button when the modal closes
    modal.closeModal();
    await modal.updateComplete;
    expect(document.activeElement).to.equal(openBtn);
  });
});
