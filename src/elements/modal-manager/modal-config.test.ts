import { describe, test, expect } from 'vitest';
import { html } from 'lit';

import { ModalConfig } from './modal-config';

describe('Modal Config', () => {
  test('can be instantiated properly', async () => {
    const config = new ModalConfig();
    const title = html`Foo`;
    config.title = title;
    config.headerColor = 'green';

    expect(config.title).to.equal(title);
    expect(config.headerColor).to.equal('green');
  });

  test('can be instantiated properly with constructor', async () => {
    const title = html`Foo`;
    const subtitle = html`Bar`;
    const headline = html`Baz`;
    const message = html`Boop`;

    const headerColor = 'blue';
    const showProcessingIndicator = true;
    const processingImageMode = 'processing';
    const showCloseButton = false;
    const showLeftNavButton = false;
    const leftNavButtonText = 'Previous';
    const showHeaderLogo = false;
    const closeOnBackdropClick = false;

    const config = new ModalConfig({
      title: title,
      subtitle: subtitle,
      headline: headline,
      message: message,
      headerColor: headerColor,
      showProcessingIndicator: showProcessingIndicator,
      processingImageMode: processingImageMode,
      showCloseButton: showCloseButton,
      showLeftNavButton: showLeftNavButton,
      leftNavButtonText: leftNavButtonText,
      showHeaderLogo: showHeaderLogo,
      closeOnBackdropClick: closeOnBackdropClick,
    });

    expect(config.title).to.equal(title);
    expect(config.subtitle).to.equal(subtitle);
    expect(config.headline).to.equal(headline);
    expect(config.message).to.equal(message);

    expect(config.headerColor).to.equal(headerColor);
    expect(config.showProcessingIndicator).to.equal(showProcessingIndicator);
    expect(config.processingImageMode).to.equal(processingImageMode);
    expect(config.showCloseButton).to.equal(showCloseButton);
    expect(config.showLeftNavButton).to.equal(showLeftNavButton);
    expect(config.leftNavButtonText).to.equal(leftNavButtonText);
    expect(config.showHeaderLogo).to.equal(showHeaderLogo);
    expect(config.closeOnBackdropClick).to.equal(closeOnBackdropClick);
  });

  test('instantiates properly with defaults', async () => {
    const config = new ModalConfig();
    expect(config.title).to.equal(undefined);
    expect(config.subtitle).to.equal(undefined);
    expect(config.headline).to.equal(undefined);
    expect(config.message).to.equal(undefined);
    expect(config.headerColor).to.equal('#55A183');
    expect(config.showProcessingIndicator).to.equal(false);
    expect(config.processingImageMode).to.equal('complete');
    expect(config.showCloseButton).to.equal(true);
    expect(config.showLeftNavButton).to.equal(false);
    expect(config.leftNavButtonText).to.equal('');
    expect(config.showHeaderLogo).to.equal(true);
    expect(config.closeOnBackdropClick).to.equal(true);
  });
});
