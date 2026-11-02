import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test, vi } from 'vitest';

import './ia-feature-feedback-survey-comment';
import type { IAFeatureFeedbackSurveyComment } from './ia-feature-feedback-survey-comment';

describe('IAFeatureFeedbackSurveyComment', () => {
  test('renders basic component', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-comment></ia-feature-feedback-survey-comment>
    `)) as IAFeatureFeedbackSurveyComment;

    const commentBox = el.shadowRoot!.querySelector(
      '#comments',
    ) as HTMLTextAreaElement;
    expect(commentBox).to.exist;
  });

  test('renders prompt text if provided', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-comment
        prompt="foo"
      ></ia-feature-feedback-survey-comment>
    `)) as IAFeatureFeedbackSurveyComment;

    const promptText = el.shadowRoot!.querySelector(
      '#prompt-text',
    ) as HTMLDivElement;
    expect(promptText.textContent?.trim()).to.equal('foo');

    const commentBox = el.shadowRoot!.querySelector(
      '#comments',
    ) as HTMLTextAreaElement;
    expect(commentBox).to.exist;
  });

  test('does not render prompt text if no prompt provided', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-comment></ia-feature-feedback-survey-comment>
    `)) as IAFeatureFeedbackSurveyComment;

    const promptText = el.shadowRoot!.querySelector(
      '#prompt-text',
    ) as HTMLDivElement;
    expect(promptText).not.to.exist;
  });

  test('updates its comment value when textarea changed', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-comment
        prompt="foo"
      ></ia-feature-feedback-survey-comment>
    `)) as IAFeatureFeedbackSurveyComment;

    const commentBox = el.shadowRoot!.querySelector(
      '#comments',
    ) as HTMLTextAreaElement;
    commentBox.value = 'bar';
    commentBox.dispatchEvent(new Event('change'));
    await el.updateComplete;
    expect(el.value).to.equal('bar');
  });

  test('cannot change comment value when disabled', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-comment
        prompt="foo"
        disabled
      ></ia-feature-feedback-survey-comment>
    `)) as IAFeatureFeedbackSurveyComment;

    const commentBox = el.shadowRoot!.querySelector(
      '#comments',
    ) as HTMLTextAreaElement;
    commentBox.value = 'bar';
    commentBox.dispatchEvent(new Event('change'));
    await el.updateComplete;
    expect(el.value).to.equal('');
  });

  test('emits a responseChanged event when textarea changed', async () => {
    const spy = vi.fn();
    const callableSpy = spy as unknown as EventListener; // Just to silence an overzealous lit-analyzer lint error
    const el = (await fixture(html`
      <ia-feature-feedback-survey-comment
        prompt="foo"
        @responseChanged=${callableSpy}
      ></ia-feature-feedback-survey-comment>
    `)) as IAFeatureFeedbackSurveyComment;

    const commentBox = el.shadowRoot!.querySelector(
      '#comments',
    ) as HTMLTextAreaElement;
    commentBox.value = 'bar';
    commentBox.dispatchEvent(new Event('change'));
    await el.updateComplete;
    expect(spy.mock.calls.length).to.equal(1);
    expect(spy.mock.lastCall?.[0]?.detail).to.deep.equal({
      name: 'foo',
      comment: 'bar',
    });
  });

  test('applies placeholder to comment box', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-comment
        prompt="foo"
        placeholder="bar"
      ></ia-feature-feedback-survey-comment>
    `)) as IAFeatureFeedbackSurveyComment;

    const commentField = el.shadowRoot!.querySelector(
      '#comments',
    ) as HTMLTextAreaElement;
    expect(commentField.placeholder).to.equal('bar');
  });

  test('returns its comment value in its response, if applicable', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-comment
        prompt="foo"
        value="bar"
      ></ia-feature-feedback-survey-comment>
    `)) as IAFeatureFeedbackSurveyComment;

    expect(el.response).to.deep.equal({
      name: 'foo',
      comment: 'bar',
    });
  });

  test('validates successfully if not required', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-comment
        prompt="foo"
      ></ia-feature-feedback-survey-comment>
    `)) as IAFeatureFeedbackSurveyComment;

    expect(el.validate()).to.be.true;
  });

  test('validates successfully if required with non-empty comment', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-comment
        prompt="foo"
        value="bar"
        required
      ></ia-feature-feedback-survey-comment>
    `)) as IAFeatureFeedbackSurveyComment;

    expect(el.validate()).to.be.true;
  });

  test('does not validate successfully if required with empty comment', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-comment
        prompt="foo"
        required
      ></ia-feature-feedback-survey-comment>
    `)) as IAFeatureFeedbackSurveyComment;

    expect(el.validate()).to.be.false;
  });

  test('shows error styling after failing validation', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-comment
        prompt="foo"
        required
      ></ia-feature-feedback-survey-comment>
    `)) as IAFeatureFeedbackSurveyComment;

    el.validate();

    const commentField = el.shadowRoot!.querySelector(
      '#comments',
    ) as HTMLTextAreaElement;
    expect(getComputedStyle(commentField).boxShadow).not.to.equal('none');
  });
});
