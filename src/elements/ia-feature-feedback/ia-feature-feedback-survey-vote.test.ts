import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test, vi } from 'vitest';

import './ia-feature-feedback-survey-vote';
import type { IAFeatureFeedbackSurveyVote } from './ia-feature-feedback-survey-vote';
import type { IAFeatureFeedbackSurveyComment } from './ia-feature-feedback-survey-comment';

describe('IAFeatureFeedbackSurveyVote', () => {
  test('renders basic component', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const upvoteButton = el.shadowRoot!.querySelector(
      '#upvote',
    ) as HTMLLabelElement;
    expect(upvoteButton).to.exist;

    const downvoteButton = el.shadowRoot!.querySelector(
      '#downvote',
    ) as HTMLLabelElement;
    expect(downvoteButton).to.exist;
  });

  test('renders prompt text if provided', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const promptText = el.shadowRoot!.querySelector(
      '#prompt-text',
    ) as HTMLDivElement;
    expect(promptText.textContent?.trim()).to.equal('foo');
  });

  test('does not render prompt text if no prompt provided', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const promptText = el.shadowRoot!.querySelector(
      '#prompt-text',
    ) as HTMLDivElement;
    expect(promptText).not.to.exist;
  });

  test('can vote by clicking up/down buttons', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const upvoteButton = el.shadowRoot!.querySelector(
      '#upvote',
    ) as HTMLLabelElement;
    const downvoteButton = el.shadowRoot!.querySelector(
      '#downvote',
    ) as HTMLLabelElement;

    upvoteButton.click();
    await el.updateComplete;
    expect(el.vote).to.equal('up');
    expect(upvoteButton.classList.contains('selected')).to.be.true;
    expect(downvoteButton.classList.contains('unselected')).to.be.true;

    downvoteButton.click();
    await el.updateComplete;
    expect(el.vote).to.equal('down');
    expect(upvoteButton.classList.contains('unselected')).to.be.true;
    expect(downvoteButton.classList.contains('selected')).to.be.true;
  });

  test('cannot vote by clicking buttons when disabled', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        disabled
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const upvoteButton = el.shadowRoot!.querySelector(
      '#upvote',
    ) as HTMLLabelElement;
    const downvoteButton = el.shadowRoot!.querySelector(
      '#downvote',
    ) as HTMLLabelElement;

    upvoteButton.click();
    await el.updateComplete;
    expect(el.vote).to.equal(undefined);
    expect(upvoteButton.classList.contains('noselection')).to.be.true;
    expect(downvoteButton.classList.contains('noselection')).to.be.true;

    downvoteButton.click();
    await el.updateComplete;
    expect(el.vote).to.equal(undefined);
    expect(upvoteButton.classList.contains('noselection')).to.be.true;
    expect(downvoteButton.classList.contains('noselection')).to.be.true;
  });

  test('can vote with Enter key', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const upvoteButton = el.shadowRoot!.querySelector(
      '#upvote',
    ) as HTMLLabelElement;
    const downvoteButton = el.shadowRoot!.querySelector(
      '#downvote',
    ) as HTMLLabelElement;

    upvoteButton.control?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
      }),
    );
    await el.updateComplete;
    expect(el.vote).to.equal('up');
    expect(upvoteButton.classList.contains('selected')).to.be.true;
    expect(downvoteButton.classList.contains('unselected')).to.be.true;

    downvoteButton.control?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
      }),
    );
    await el.updateComplete;
    expect(el.vote).to.equal('down');
    expect(upvoteButton.classList.contains('unselected')).to.be.true;
    expect(downvoteButton.classList.contains('selected')).to.be.true;
  });

  test('cannot vote with Enter key when disabled', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        disabled
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const upvoteButton = el.shadowRoot!.querySelector(
      '#upvote',
    ) as HTMLLabelElement;
    const downvoteButton = el.shadowRoot!.querySelector(
      '#downvote',
    ) as HTMLLabelElement;

    upvoteButton.control?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
      }),
    );
    await el.updateComplete;
    expect(el.vote).to.equal(undefined);
    expect(upvoteButton.classList.contains('noselection')).to.be.true;
    expect(downvoteButton.classList.contains('noselection')).to.be.true;

    downvoteButton.control?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
      }),
    );
    await el.updateComplete;
    expect(el.vote).to.equal(undefined);
    expect(upvoteButton.classList.contains('noselection')).to.be.true;
    expect(downvoteButton.classList.contains('noselection')).to.be.true;
  });

  test('can vote with Space key', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const upvoteButton = el.shadowRoot!.querySelector(
      '#upvote',
    ) as HTMLLabelElement;
    const downvoteButton = el.shadowRoot!.querySelector(
      '#downvote',
    ) as HTMLLabelElement;

    upvoteButton.control?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: ' ',
      }),
    );
    await el.updateComplete;
    expect(el.vote).to.equal('up');
    expect(upvoteButton.classList.contains('selected')).to.be.true;
    expect(downvoteButton.classList.contains('unselected')).to.be.true;

    downvoteButton.control?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: ' ',
      }),
    );
    await el.updateComplete;
    expect(el.vote).to.equal('down');
    expect(upvoteButton.classList.contains('unselected')).to.be.true;
    expect(downvoteButton.classList.contains('selected')).to.be.true;
  });

  test('cannot vote with Space key when disabled', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        disabled
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const upvoteButton = el.shadowRoot!.querySelector(
      '#upvote',
    ) as HTMLLabelElement;
    const downvoteButton = el.shadowRoot!.querySelector(
      '#downvote',
    ) as HTMLLabelElement;

    upvoteButton.control?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: ' ',
      }),
    );
    await el.updateComplete;
    expect(el.vote).to.equal(undefined);
    expect(upvoteButton.classList.contains('noselection')).to.be.true;
    expect(downvoteButton.classList.contains('noselection')).to.be.true;

    downvoteButton.control?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: ' ',
      }),
    );
    await el.updateComplete;
    expect(el.vote).to.equal(undefined);
    expect(upvoteButton.classList.contains('noselection')).to.be.true;
    expect(downvoteButton.classList.contains('noselection')).to.be.true;
  });

  test('renders comment box when showComments is true', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        showComments
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const commentField = el.shadowRoot!.querySelector(
      '#comments',
    ) as IAFeatureFeedbackSurveyComment;
    expect(commentField).to.exist;
  });

  test('does not render comment box when showComments is not true', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const commentField = el.shadowRoot!.querySelector(
      '#comments',
    ) as IAFeatureFeedbackSurveyComment;
    expect(commentField).not.to.exist;
  });

  test('cannot change comment when disabled', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        showComments
        disabled
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const commentField = el.shadowRoot!.querySelector(
      '#comments',
    ) as IAFeatureFeedbackSurveyComment;
    commentField.value = 'bar';
    commentField.dispatchEvent(
      new CustomEvent('responseChanged', {
        detail: {
          name: '',
          comment: 'bar',
        },
      }),
    );
    await el.updateComplete;

    expect(el.comment).to.be.undefined;
  });

  test('applies placeholder to comment box', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        showComments
        commentPlaceholder="foobar"
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const commentField = el.shadowRoot!.querySelector(
      '#comments',
    ) as IAFeatureFeedbackSurveyComment;
    expect(commentField.placeholder).to.equal('foobar');
  });

  test('emits a responseChanged event when vote changes', async () => {
    const spy = vi.fn();
    const callableSpy = spy as unknown as EventListener; // Just to silence an overzealous lit-analyzer lint error
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        @responseChanged=${callableSpy}
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const upvoteButton = el.shadowRoot!.querySelector(
      '#upvote',
    ) as HTMLLabelElement;
    const downvoteButton = el.shadowRoot!.querySelector(
      '#downvote',
    ) as HTMLLabelElement;

    upvoteButton.click();
    await el.updateComplete;
    expect(spy.mock.calls.length).to.equal(1);
    expect(spy.mock.lastCall?.[0]?.detail).to.deep.equal({
      name: 'foo',
      rating: 'up',
    });

    downvoteButton.click();
    await el.updateComplete;
    expect(spy.mock.calls.length).to.equal(2);
    expect(spy.mock.lastCall?.[0]?.detail).to.deep.equal({
      name: 'foo',
      rating: 'down',
    });
  });

  test('emits a responseChanged event when comment changes', async () => {
    const spy = vi.fn();
    const callableSpy = spy as unknown as EventListener; // Just to silence an overzealous lit-analyzer lint error
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        showComments
        @responseChanged=${callableSpy}
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    const commentField = el.shadowRoot!.querySelector(
      '#comments',
    ) as IAFeatureFeedbackSurveyComment;
    commentField.value = 'bar';
    commentField.dispatchEvent(
      new CustomEvent('responseChanged', {
        detail: {
          name: '',
          comment: 'bar',
        },
      }),
    );
    await el.updateComplete;

    expect(spy.mock.calls.length).to.equal(1);
    expect(spy.mock.lastCall?.[0]?.detail).to.deep.equal({
      name: 'foo',
      rating: undefined,
      comment: 'bar',
    });
  });

  test('returns its vote value in its response', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        vote="up"
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    expect(el.response).to.deep.equal({
      name: 'foo',
      rating: 'up',
    });
  });

  test('returns both its vote & comment values in its response, if applicable', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        vote="down"
        comment="bar"
        showComments
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    expect(el.response).to.deep.equal({
      name: 'foo',
      rating: 'down',
      comment: 'bar',
    });
  });

  test('validates successfully if not required', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    expect(el.validate()).to.be.true;
  });

  test('validates successfully if required with vote selected', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        vote="up"
        required
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    expect(el.validate()).to.be.true;
  });

  test('does not validate successfully if required with no vote selected', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        required
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    expect(el.validate()).to.be.false;
  });

  test('shows error styling after failing validation', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey-vote
        prompt="foo"
        required
      ></ia-feature-feedback-survey-vote>
    `)) as IAFeatureFeedbackSurveyVote;

    el.validate();
    await el.updateComplete;

    const upvoteButton = el.shadowRoot!.querySelector(
      '#upvote',
    ) as HTMLLabelElement;
    const downvoteButton = el.shadowRoot!.querySelector(
      '#downvote',
    ) as HTMLLabelElement;
    expect(getComputedStyle(upvoteButton).boxShadow).not.to.equal('none');
    expect(getComputedStyle(downvoteButton).boxShadow).not.to.equal('none');
  });
});
