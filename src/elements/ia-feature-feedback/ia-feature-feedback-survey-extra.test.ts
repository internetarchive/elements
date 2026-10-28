import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test } from 'vitest';

import './ia-feature-feedback-survey-extra';
import type { IAFeatureFeedbackSurveyExtra } from './ia-feature-feedback-survey-extra';

describe('IAFeatureFeedbackSurveyExtra', () => {
  test('renders basic component', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-extra></ia-feature-feedback-survey-extra>
    `)) as IAFeatureFeedbackSurveyExtra;

    // Component has no shadow root and no children
    expect(el.shadowRoot).not.to.exist;
    expect(el.children.length).to.equal(0);
  });

  test('returns its assigned name & value as its response', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-extra
        name="foo"
        value="bar"
      ></ia-feature-feedback-survey-extra>
    `)) as IAFeatureFeedbackSurveyExtra;

    expect(el.response).to.deep.equal({
      name: 'foo',
      comment: 'bar',
    });
  });

  test('is always excluded from numbering', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-extra
        name="foo"
      ></ia-feature-feedback-survey-extra>
    `)) as IAFeatureFeedbackSurveyExtra;

    expect(el.numbered).to.be.false;
  });

  test('always validates successfully', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-extra
        name="foo"
      ></ia-feature-feedback-survey-extra>
    `)) as IAFeatureFeedbackSurveyExtra;

    expect(el.validate()).to.be.true;
  });
});
