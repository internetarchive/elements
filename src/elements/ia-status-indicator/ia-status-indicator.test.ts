import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IAStatusIndicator } from './ia-status-indicator';
import './ia-status-indicator';

describe('IA Status Indicator', () => {
  test('renders a loading indicator by default', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator></ia-status-indicator>`,
    );
    const loadingIndicator = el.shadowRoot?.querySelector('.loading-indicator');
    expect(loadingIndicator).to.exist;
  });

  test('uses a custom loading text for the indicator if desired', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator
        .loadingTitle=${'Download in progress...'}
      ></ia-status-indicator>`,
    );
    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Download in progress...');
  });

  test('uses a default title if no title provided', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator></ia-status-indicator>`,
    );

    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Loading...');
  });

  test('shows loading dots inside the ring by default', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator></ia-status-indicator>`,
    );

    const loadingRing = el.shadowRoot?.querySelector('.loading-ring');
    expect(loadingRing).to.exist;
    const loadingDots = el.shadowRoot?.querySelector('.loading-dots');
    expect(loadingDots).to.exist;
  });

  test('can hide the loading dots if requested', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .loadingStyle=${'ring'}></ia-status-indicator>`,
    );

    const loadingDots = el.shadowRoot?.querySelector(
      '.loading-dots',
    ) as HTMLElement;
    expect(loadingDots.computedStyleMap().get('display')?.toString()).to.equal(
      'none',
    );
  });

  test('can render a success indicator instead if requested', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mode=${'success'}></ia-status-indicator>`,
    );
    const successIndicator = el.shadowRoot?.querySelector('.success-indicator');
    expect(successIndicator).to.exist;
  });

  test('uses a custom success title for the indicator if desired', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator
        .mode=${'success'}
        .successTitle=${'Download successful'}
      ></ia-status-indicator>`,
    );
    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Download successful');
  });

  test('uses a default success title if no title provided', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mode=${'success'}></ia-status-indicator>`,
    );

    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Success');
  });

  test('can render an error indicator instead if requested', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mode=${'error'}></ia-status-indicator>`,
    );
    const errorIndicator = el.shadowRoot?.querySelector('.error-indicator');
    expect(errorIndicator).to.exist;
  });

  test('uses a custom error title for the indicator if desired', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator
        .mode=${'error'}
        .errorTitle=${'Download failed'}
      ></ia-status-indicator>`,
    );
    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Download failed');
  });

  test('uses a default error title if no title provided', async () => {
    const el = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator .mode=${'error'}></ia-status-indicator>`,
    );

    const indicatorTitle = el.shadowRoot?.querySelector('title');
    expect(indicatorTitle?.innerHTML).to.contain('Error');
  });
});
