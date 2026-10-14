import { fixture, fixtureCleanup, oneEvent } from '@open-wc/testing-helpers';
import { describe, test, expect, afterEach } from 'vitest';
import { html } from 'lit';
import type { IAStatusIndicator } from '@src/elements/ia-status-indicator/ia-status-indicator';
import { ModalConfig } from './modal-config';
import type { IAModalManagerTemplate } from './ia-modal-manager-template';
import './ia-modal-manager-template';

describe('Modal Manager Template', () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test('has correct default configuration', async () => {
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template></ia-modal-manager-template>
    `);

    const processingLogo = el.shadowRoot?.querySelector('.processing-logo');
    const headline = el.shadowRoot?.querySelector('.headline');
    const message = el.shadowRoot?.querySelector('.message');
    const title = el.shadowRoot?.querySelector('h1.title') as HTMLElement;

    expect(headline).to.not.exist;
    expect(message).to.not.exist;
    expect(title).to.not.exist;

    expect(processingLogo?.classList.contains('hidden')).to.equal(true);
  });

  test('does not show the title if one not provided', async () => {
    const config = new ModalConfig();
    config.title = undefined;

    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const title = el.shadowRoot?.querySelector('h1.title');
    expect(title).to.not.exist;
  });

  test('emits closeButtonPressed event when close button is pressed', async () => {
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template></ia-modal-manager-template>
    `);
    const closeButton = el.shadowRoot?.querySelector('.close-button');
    const clickEvent = new MouseEvent('click');

    setTimeout(() => {
      closeButton?.dispatchEvent(clickEvent);
    });
    const response = await oneEvent(el, 'closeButtonPressed');
    expect(response).to.exist;
  });

  test('emits closeButtonPressed event when close button gets spacebar pressed', async () => {
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template></ia-modal-manager-template>
    `);

    const closeButton = el.shadowRoot?.querySelector('.close-button');
    const clickEvent = new KeyboardEvent('keydown', { key: ' ' });

    setTimeout(() => {
      closeButton?.dispatchEvent(clickEvent);
    });
    const response = await oneEvent(el, 'closeButtonPressed');
    expect(response).to.exist;
  });

  test('emits leftNavButtonPressed event when left nav button is pressed', async () => {
    const config = new ModalConfig();
    config.showLeftNavButton = true;
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const leftNavButton = el.shadowRoot?.querySelector('.back-button');
    const clickEvent = new MouseEvent('click');

    setTimeout(() => {
      leftNavButton?.dispatchEvent(clickEvent);
    });
    const response = await oneEvent(el, 'leftNavButtonPressed');
    expect(response).to.exist;
  });

  test('emits leftNavButtonPressed event when left nav button gets spacebar pressed', async () => {
    const config = new ModalConfig();
    config.showLeftNavButton = true;
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const leftNavButton = el.shadowRoot?.querySelector('.back-button');
    const clickEvent = new KeyboardEvent('keydown', { key: ' ' });

    setTimeout(() => {
      leftNavButton?.dispatchEvent(clickEvent);
    });
    const response = await oneEvent(el, 'leftNavButtonPressed');
    expect(response).to.exist;
  });

  test('shows the processing indicator if configured to', async () => {
    const config = new ModalConfig();
    config.showProcessingIndicator = true;

    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const processingLogo = el.shadowRoot?.querySelector('.processing-logo');
    expect(processingLogo?.classList.contains('hidden')).to.equal(false);
  });

  test('shows the left nav button if configured to', async () => {
    const config = new ModalConfig();
    config.showLeftNavButton = true;
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const leftNavButton = el.shadowRoot?.querySelector('.back-button');
    expect(leftNavButton).to.exist;
  });

  test('hides the close button when showCloseButton is false', async () => {
    const config = new ModalConfig();
    config.showCloseButton = false;
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const closeButton = el.shadowRoot?.querySelector('.close-button');
    expect(closeButton).to.not.exist;
  });

  test('uses custom text for the left nav button if configured to', async () => {
    const config = new ModalConfig();
    config.showLeftNavButton = true;
    config.leftNavButtonText = 'Previous';
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const leftNavButton = el.shadowRoot?.querySelector('.back-button');

    expect(leftNavButton).to.exist;
    expect(leftNavButton?.innerHTML).to.contain('Previous');
  });

  test('does not use any text for the left nav button if not configured to', async () => {
    const config = new ModalConfig();
    config.showLeftNavButton = true;

    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const leftNavButton = el.shadowRoot?.querySelector('.back-button');
    expect(leftNavButton?.innerHTML).not.to.contain('Previous');
  });

  test('shows the close button if configured to', async () => {
    const config = new ModalConfig();
    config.showCloseButton = true;
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const closeButton = el.shadowRoot?.querySelector('.close-button');
    expect(closeButton).to.exist;
  });

  test('hides the close button if configured to', async () => {
    const config = new ModalConfig();
    config.showCloseButton = false;
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const closeButton = el.shadowRoot?.querySelector('.close-button');
    expect(closeButton).to.not.exist;
  });

  test('shows the properties from the config', async () => {
    const config = new ModalConfig();
    config.title = html`Boop`;
    config.subtitle = html`Bop`;
    config.headline = html`Foo`;
    config.message = html`Bar`;

    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const title = el.shadowRoot?.querySelector('h1');
    const subtitle = el.shadowRoot?.querySelector('h2');

    const headline = el.shadowRoot?.querySelector('.headline');
    const message = el.shadowRoot?.querySelector('.message');

    expect(title).to.exist;
    expect(title?.innerText).to.equal('Boop');

    expect(subtitle).to.exist;
    expect(subtitle?.innerText).to.equal('Bop');

    expect(headline).to.exist;
    expect(headline?.textContent).to.equal('Foo');

    expect(message).to.exist;
    expect(message?.textContent).to.equal('Bar');
  });

  test('labels the close button for assistive technology', async () => {
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template></ia-modal-manager-template>
    `);

    const closeButton = el.shadowRoot?.querySelector('.close-button');
    expect(closeButton?.getAttribute('aria-label')).to.equal('Close');
  });

  test('shows the Internet Archive logo by default and hides it when configured to', async () => {
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template></ia-modal-manager-template>
    `);
    expect(
      el.shadowRoot?.querySelector('.logo-icon svg title')?.textContent,
    ).to.equal('Internet Archive logo');

    el.config = new ModalConfig({ showHeaderLogo: false });
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.logo-icon')).to.not.exist;
  });

  test('renders a loading status indicator in processing mode', async () => {
    const config = new ModalConfig({
      showProcessingIndicator: true,
      processingImageMode: 'processing',
    });
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const indicator = el.shadowRoot?.querySelector(
      'ia-status-indicator',
    ) as IAStatusIndicator;
    expect(indicator.mode).to.equal('loading');
  });

  test('renders a success status indicator in complete mode', async () => {
    const config = new ModalConfig({
      showProcessingIndicator: true,
      processingImageMode: 'complete',
    });
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template .config=${config}></ia-modal-manager-template>
    `);

    const indicator = el.shadowRoot?.querySelector(
      'ia-status-indicator',
    ) as IAStatusIndicator;
    expect(indicator.mode).to.equal('success');
  });

  test('keeps the status indicator out of the layout when not configured to show it', async () => {
    const el = await fixture<IAModalManagerTemplate>(html`
      <ia-modal-manager-template></ia-modal-manager-template>
    `);

    const indicator = el.shadowRoot?.querySelector(
      'ia-status-indicator',
    ) as HTMLElement;
    expect(getComputedStyle(indicator).display).to.equal('none');
  });
});
