import { describe, expect, test } from 'vitest';

import './form-elements/ia-donation-section';
import './form-elements/ia-donation-edit-donation';
import './form-elements/ia-donation-badged-input';
import './form-elements/ia-donation-header';
import './form-elements/ia-donation-payment-selector';
import './form-elements/ia-donation-summary';
import './form-elements/ia-donation-total-amount';
import './form-elements/contact-form/ia-donation-contact-form';
import './modals/ia-donation-confirm-modal';
import './modals/ia-donation-error-modal-content';
import './modals/ia-donation-upsell-modal-content';
import './ia-donation-form';
import './ia-donation-form-controller';

/**
 * Custom elements share one global registry, so the donation form's parts are
 * namespaced under `ia-donation-`. The old iaux-donation-form packages
 * register their tags verbatim, and consumers keep loading them during the
 * migration, so none of those names can be claimed here.
 */
const NAMESPACED_ELEMENTS = [
  'ia-donation-form',
  'ia-donation-form-controller',
  'ia-donation-section',
  'ia-donation-edit-donation',
  'ia-donation-badged-input',
  'ia-donation-header',
  'ia-donation-payment-selector',
  'ia-donation-summary',
  'ia-donation-total-amount',
  'ia-donation-contact-form',
  'ia-donation-confirm-modal',
  'ia-donation-error-modal-content',
  'ia-donation-upsell-modal-content',
];

const NAMES_TO_AVOID = [
  'donation-form',
  'donation-form-controller',
  'donation-form-section',
  'donation-form-edit-donation',
  'badged-input',
  'donation-form-header',
  'payment-selector',
  'donation-summary',
  'donation-form-total-amount',
  'contact-form',
  'confirm-donation-modal',
  'donation-form-error-modal-content',
  'upsell-modal-content',
];

describe('donation form element names', () => {
  test.each(NAMESPACED_ELEMENTS)('registers %s', (tag) => {
    expect(customElements.get(tag), `${tag} should be registered`).to.exist;
  });

  test.each(NAMES_TO_AVOID)('leaves %s free for the old packages', (tag) => {
    expect(customElements.get(tag), `${tag} should not be claimed`).to.not
      .exist;
  });
});
