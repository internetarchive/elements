import { describe, expect, test } from 'vitest';

import './ia-feature-feedback';
import './ia-feature-feedback-survey';

/**
 * Custom elements share one global registry, so the feature feedback parts are
 * namespaced under the component's own prefix.
 */
const NAMESPACED_ELEMENTS = [
  'ia-feature-feedback',
  'ia-feature-feedback-survey',
  'ia-feature-feedback-survey-vote',
  'ia-feature-feedback-survey-comment',
  'ia-feature-feedback-survey-extra',
];

/**
 * Names this component must not claim. Each is registered verbatim by the
 * `@internetarchive/feature-feedback` package, so a page that loads both
 * would have two elements fighting over one name.
 */
const NAMES_TO_AVOID = [
  'feature-feedback',
  'ia-feedback-survey',
  'ia-survey-vote',
  'ia-survey-comment',
  'ia-survey-extra',
];

describe('feature feedback element names', () => {
  test.each(NAMESPACED_ELEMENTS)('registers %s', (tag) => {
    expect(customElements.get(tag), `${tag} should be registered`).to.exist;
  });

  test.each(NAMES_TO_AVOID)('leaves %s free for other components', (tag) => {
    expect(customElements.get(tag), `${tag} should not be claimed`).to.not
      .exist;
  });
});
