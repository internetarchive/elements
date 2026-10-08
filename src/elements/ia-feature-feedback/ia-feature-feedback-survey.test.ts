import { aTimeout, fixture, waitUntil } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import { describe, expect, test } from 'vitest';

import './ia-feature-feedback-survey';
import type { IAFeatureFeedbackSurvey } from './ia-feature-feedback-survey';
import type { IAFeatureFeedbackSurveyVote } from './ia-feature-feedback-survey-vote';
import type { IAFeatureFeedbackSurveyComment } from './ia-feature-feedback-survey-comment';
import type { FeatureFeedbackServiceInterface } from './feature-feedback-service';
import type { SurveySubmissionState } from './models';
import { MockFeatureFeedbackService } from './mocks/mock-feature-feedback-service';
import { MockRecaptchaManager } from './mocks/mock-recaptcha-manager';

/**
 * Runs the survey's submit handler directly, so a missing-input rejection
 * reaches the test instead of surfacing as an unhandled rejection from a click.
 */
function submitSurvey(el: IAFeatureFeedbackSurvey): Promise<void> {
  return (el as unknown as { submit(): Promise<void> }).submit();
}

describe('IAFeatureFeedbackSurvey', () => {
  test('shows a button that defaults to text Feedback', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey></ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const textContainer = el.shadowRoot!.querySelector(
      '#button-text',
    ) as HTMLSpanElement;
    expect(textContainer.innerText).to.equal('Feedback');
  });

  test('shows up/down thumbs on the button if specified', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey showButtonThumbs></ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const thumbIcons = el.shadowRoot!.querySelectorAll('.beta-button-icon');
    expect(thumbIcons.length).to.equal(2);
  });

  test('can customize the button text', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey
        .buttonText=${'Boop'}
      ></ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const textContainer = el.shadowRoot!.querySelector(
      '#button-text',
    ) as HTMLSpanElement;
    expect(textContainer.innerText).to.equal('Boop');
  });

  test('shows the popup when button is clicked', async () => {
    const resizeObserver = new SharedResizeObserver();
    const el = (await fixture(html`
      <ia-feature-feedback-survey
        .resizeObserver=${resizeObserver}
      ></ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    const background = el.shadowRoot!.querySelector(
      '#popup-background',
    ) as HTMLDivElement;

    const classes = background.classList;
    expect(classes.contains('closed')).to.be.true;
    expect(classes.contains('open')).to.be.false;

    button.click();
    await el.updateComplete;
    expect(classes.contains('open')).to.be.true;
    expect(classes.contains('closed')).to.be.false;
  });

  test('closes the popup when the cancel button is clicked', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey></ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    const background = el.shadowRoot!.querySelector(
      '#popup-background',
    ) as HTMLDivElement;

    const classes = background.classList;
    button.click();
    await el.updateComplete;
    expect(classes.contains('open')).to.be.true;

    const cancelButton = el.shadowRoot!.querySelector(
      '#cancel-button',
    ) as HTMLButtonElement;
    cancelButton.click();
    await el.updateComplete;
    expect(classes.contains('closed')).to.be.true;
    expect(classes.contains('open')).to.be.false;
  });

  test('closes the popup when the background is clicked', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey></ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    const background = el.shadowRoot!.querySelector(
      '#popup-background',
    ) as HTMLDivElement;

    const classes = background.classList;
    button.click();
    await el.updateComplete;
    expect(classes.contains('open')).to.be.true;

    background.click();
    await el.updateComplete;
    expect(classes.contains('closed')).to.be.true;
    expect(classes.contains('open')).to.be.false;
  });

  test('closes the popup when the Escape key is pressed', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey></ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    const background = el.shadowRoot!.querySelector(
      '#popup-background',
    ) as HTMLDivElement;

    const classes = background.classList;
    button.click();
    await el.updateComplete;
    expect(classes.contains('open')).to.be.true;

    document.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: 'Escape',
      }),
    );
    await el.updateComplete;
    expect(classes.contains('closed')).to.be.true;
    expect(classes.contains('open')).to.be.false;
  });

  test('renders child questions in its default slot', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey surveyIdentifier="foo-survey">
        <ia-feature-feedback-survey-vote
          prompt="foo"
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-comment
          prompt="bar"
        ></ia-feature-feedback-survey-comment>
        <ia-feature-feedback-survey-extra
          name="baz"
          value="boop"
        ></ia-feature-feedback-survey-extra>
      </ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;

    const questionsSlot = el.shadowRoot!.querySelector(
      '#questions-slot',
    ) as HTMLSlotElement;
    expect(questionsSlot).to.exist;
    expect(questionsSlot.assignedElements().length).to.equal(3);
  });

  test('applies :invalid styling to required questions with invalid responses upon submit', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback-survey surveyIdentifier="foo-survey">
        <ia-feature-feedback-survey-vote
          prompt="foo"
          required
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-comment
          prompt="bar"
          required
        ></ia-feature-feedback-survey-comment>
        <ia-feature-feedback-survey-vote
          prompt="baz"
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-comment
          prompt="boop"
        ></ia-feature-feedback-survey-comment>
      </ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;

    const submitButton = el.shadowRoot!.querySelector(
      '#submit-button',
    ) as HTMLInputElement;
    submitButton.click();
    await el.updateComplete;
    await aTimeout(0);

    const invalidVotes = el.querySelectorAll(
      'ia-feature-feedback-survey-vote:invalid',
    ) as ArrayLike<IAFeatureFeedbackSurveyVote>;
    expect(invalidVotes.length, 'invalid votes').to.equal(1);
    expect(invalidVotes[0].prompt).to.equal('foo');

    const invalidComments = el.querySelectorAll(
      'ia-feature-feedback-survey-comment:invalid',
    ) as ArrayLike<IAFeatureFeedbackSurveyComment>;
    expect(invalidComments.length, 'invalid comments').to.equal(1);
    expect(invalidComments[0].prompt).to.equal('bar');

    const validVotes = el.querySelectorAll(
      'ia-feature-feedback-survey-vote:not(:invalid)',
    ) as ArrayLike<IAFeatureFeedbackSurveyVote>;
    expect(validVotes.length, 'valid votes').to.equal(1);
    expect(validVotes[0].prompt).to.equal('baz');

    const validComments = el.querySelectorAll(
      'ia-feature-feedback-survey-comment:not(:invalid)',
    ) as ArrayLike<IAFeatureFeedbackSurveyComment>;
    expect(validComments.length, 'valid comments').to.equal(1);
    expect(validComments[0].prompt).to.equal('boop');

    const errorMessage = el.shadowRoot!.querySelector(
      '#error',
    ) as HTMLDivElement;
    expect(errorMessage.textContent).to.equal(
      'Please respond to the indicated questions.',
    );
  });

  test('disables questions while submitting', async () => {
    const service = new MockFeatureFeedbackService({ delay: 100 });
    const recaptchaManager = new MockRecaptchaManager();

    let submissionState: SurveySubmissionState;
    const el = (await fixture(html`
      <ia-feature-feedback-survey
        surveyIdentifier="foo-survey"
        .featureFeedbackService=${service}
        .recaptchaManager=${recaptchaManager}
        @submissionStateChanged=${(e: CustomEvent<SurveySubmissionState>) => {
          submissionState = e.detail;
        }}
      >
        <ia-feature-feedback-survey-vote
          prompt="foo"
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-comment
          prompt="bar"
        ></ia-feature-feedback-survey-comment>
      </ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;

    const submitButton = el.shadowRoot!.querySelector(
      '#submit-button',
    ) as HTMLInputElement;
    submitButton.click();
    await waitUntil(() => submissionState === 'processing');

    const voteQuestion = el.querySelector(
      'ia-feature-feedback-survey-vote',
    ) as IAFeatureFeedbackSurveyVote;
    const commentQuestion = el.querySelector(
      'ia-feature-feedback-survey-comment',
    ) as IAFeatureFeedbackSurveyComment;

    expect(voteQuestion.disabled).to.be.true;
    expect(commentQuestion.disabled).to.be.true;
  });

  test('re-enables questions if submission errors out', async () => {
    const service = new MockFeatureFeedbackService({
      delay: 100,
      returnValue: { error: new Error() },
    });
    const recaptchaManager = new MockRecaptchaManager();

    let submissionState: SurveySubmissionState;
    const el = (await fixture(html`
      <ia-feature-feedback-survey
        surveyIdentifier="foo-survey"
        .featureFeedbackService=${service}
        .recaptchaManager=${recaptchaManager}
        @submissionStateChanged=${(e: CustomEvent<SurveySubmissionState>) => {
          submissionState = e.detail;
        }}
      >
        <ia-feature-feedback-survey-vote
          prompt="foo"
          disabled
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-comment
          prompt="bar"
        ></ia-feature-feedback-survey-comment>
      </ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;

    const submitButton = el.shadowRoot!.querySelector(
      '#submit-button',
    ) as HTMLInputElement;
    submitButton.click();
    await waitUntil(() => submissionState === 'processing');

    const voteQuestion = el.querySelector(
      'ia-feature-feedback-survey-vote',
    ) as IAFeatureFeedbackSurveyVote;
    const commentQuestion = el.querySelector(
      'ia-feature-feedback-survey-comment',
    ) as IAFeatureFeedbackSurveyComment;

    // Both questions are disabled while processing
    expect(voteQuestion.disabled).to.be.true;
    expect(commentQuestion.disabled).to.be.true;

    // Wait for the submission to fail
    await waitUntil(() => submissionState === 'error');

    // First question was disabled originally, so it stays disabled
    expect(voteQuestion.disabled).to.be.true;
    // Second question was temporarily disabled while processing, but gets re-enabled after
    expect(commentQuestion.disabled).to.be.false;
  });

  test('shows the error detail if submission throws', async () => {
    const service: FeatureFeedbackServiceInterface = {
      submitFeedback: async () => ({ success: true }),
      submitSurvey: async () => {
        throw new Error('network down');
      },
    };
    const recaptchaManager = new MockRecaptchaManager();

    let submissionState: SurveySubmissionState;
    const el = (await fixture(html`
      <ia-feature-feedback-survey
        surveyIdentifier="foo-survey"
        .featureFeedbackService=${service}
        .recaptchaManager=${recaptchaManager}
        @submissionStateChanged=${(e: CustomEvent<SurveySubmissionState>) => {
          submissionState = e.detail;
        }}
      >
        <ia-feature-feedback-survey-vote
          prompt="foo"
          vote="up"
        ></ia-feature-feedback-survey-vote>
      </ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;

    const submitButton = el.shadowRoot!.querySelector(
      '#submit-button',
    ) as HTMLInputElement;
    submitButton.click();
    await waitUntil(() => submissionState === 'error');

    const errorMessage = el.shadowRoot!.querySelector(
      '#error',
    ) as HTMLDivElement;
    expect(errorMessage.textContent).to.contain('Error: ');
    expect(errorMessage.textContent).to.contain('network down');
  });

  test('submits responses to the service when submit button is clicked', async () => {
    const service = new MockFeatureFeedbackService();
    const recaptchaManager = new MockRecaptchaManager();

    const el = (await fixture(html`
      <ia-feature-feedback-survey
        surveyIdentifier="foo-survey"
        .featureFeedbackService=${service}
        .recaptchaManager=${recaptchaManager}
      >
        <ia-feature-feedback-survey-vote
          prompt="foo"
          vote="up"
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-comment
          prompt="bar"
          value="baz"
        ></ia-feature-feedback-survey-comment>
        <ia-feature-feedback-survey-extra
          name="extra"
          value="quux"
        ></ia-feature-feedback-survey-extra>
      </ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;

    const submitButton = el.shadowRoot!.querySelector(
      '#submit-button',
    ) as HTMLInputElement;
    submitButton.click();
    await el.updateComplete;
    await aTimeout(0);

    expect(service.surveySubmissionOptions).to.deep.equal({
      surveyIdentifier: 'foo-survey',
      responses: [
        {
          name: 'foo',
          rating: 'up',
        },
        {
          name: 'bar',
          comment: 'baz',
        },
        {
          name: 'extra',
          comment: 'quux',
        },
      ],
      recaptchaToken: 'boop',
    });
  });

  test('does not submit if no survey ID specified', async () => {
    const service = new MockFeatureFeedbackService();
    const recaptchaManager = new MockRecaptchaManager();

    const el = (await fixture(html`
      <ia-feature-feedback-survey
        .featureFeedbackService=${service}
        .recaptchaManager=${recaptchaManager}
      >
        <ia-feature-feedback-survey-vote
          prompt="foo"
          vote="up"
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-comment
          prompt="bar"
          comment="baz"
        ></ia-feature-feedback-survey-comment>
        <ia-feature-feedback-survey-extra
          name="extra"
          value="quux"
        ></ia-feature-feedback-survey-extra>
      </ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;

    await expect(submitSurvey(el)).rejects.toThrow(
      'surveyIdentifier is required',
    );

    expect(service.surveySubmissionOptions).not.to.exist;
  });

  test('does not submit if no recaptcha manager provided', async () => {
    const service = new MockFeatureFeedbackService();

    const el = (await fixture(html`
      <ia-feature-feedback-survey
        surveyIdentifier="foo-survey"
        .featureFeedbackService=${service}
      >
        <ia-feature-feedback-survey-vote
          prompt="foo"
          vote="up"
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-comment
          prompt="bar"
          comment="baz"
        ></ia-feature-feedback-survey-comment>
        <ia-feature-feedback-survey-extra
          name="extra"
          value="quux"
        ></ia-feature-feedback-survey-extra>
      </ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;

    await expect(submitSurvey(el)).rejects.toThrow(
      'recaptchaWidget is required',
    );

    expect(service.surveySubmissionOptions).not.to.exist;
  });

  test('correctly handles many different questions & questions types simultaneously', async () => {
    const service = new MockFeatureFeedbackService();
    const recaptchaManager = new MockRecaptchaManager();

    const el = (await fixture(html`
      <ia-feature-feedback-survey
        surveyIdentifier="foo-survey"
        showQuestionNumbers
        .featureFeedbackService=${service}
        .recaptchaManager=${recaptchaManager}
      >
        <ia-feature-feedback-survey-extra
          name="extra info"
          value="foo-extra-1"
        ></ia-feature-feedback-survey-extra>
        <ia-feature-feedback-survey-vote
          prompt="required vote, no comment"
          required
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-vote
          prompt="required vote with comment"
          showComments
          required
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-comment
          prompt="required comment"
          required
        ></ia-feature-feedback-survey-comment>
        <ia-feature-feedback-survey-extra
          name="more extra info"
          value="foo-extra-2"
        ></ia-feature-feedback-survey-extra>
        <ia-feature-feedback-survey-vote
          prompt="optional vote, no comment"
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-vote
          prompt="optional vote with comment"
          showComments
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-comment
          prompt="optional comment"
        ></ia-feature-feedback-survey-comment>
        <ia-feature-feedback-survey-extra
          name="yet more extra info"
          value="foo-extra-3"
        ></ia-feature-feedback-survey-extra>
      </ia-feature-feedback-survey>
    `)) as IAFeatureFeedbackSurvey;

    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;

    // Ensure it has all the questions in its form slot
    const questionsSlot = el.shadowRoot!.querySelector(
      '#questions-slot',
    ) as HTMLSlotElement;
    expect(questionsSlot.assignedElements().length).to.equal(9);

    // Helper to get the visible survey questions at a given index
    // (so, excluding the extras which do not render anything visually or accept user input)
    const getVisibleSurveyQuestion = <T extends HTMLElement>(
      index: number,
    ): T =>
      questionsSlot
        .assignedElements()
        .filter((elmt) => 'visible' in elmt && elmt.visible)[index] as T;

    const [q1, q2, q3, q4, q5, q6] = [
      getVisibleSurveyQuestion<IAFeatureFeedbackSurveyVote>(0),
      getVisibleSurveyQuestion<IAFeatureFeedbackSurveyVote>(1),
      getVisibleSurveyQuestion<IAFeatureFeedbackSurveyComment>(2),
      getVisibleSurveyQuestion<IAFeatureFeedbackSurveyVote>(3),
      getVisibleSurveyQuestion<IAFeatureFeedbackSurveyVote>(4),
      getVisibleSurveyQuestion<IAFeatureFeedbackSurveyComment>(5),
    ];

    // Answer some but not all of the required questions
    q1.vote = 'up';
    q2.comment = 'foo-comment';

    // Try to submit and check what gets the error styling
    await el.updateComplete;
    const submitButton = el.shadowRoot!.querySelector(
      '#submit-button',
    ) as HTMLInputElement;
    submitButton.click();
    await el.updateComplete;

    // Q1 had all required responses
    expect(q1.matches(':invalid'), 'q1').to.be.false;

    // Q2 was missing a required vote
    expect(q2.matches(':invalid'), 'q2').to.be.true;

    // Q3 was missing a required comment
    expect(q3.matches(':invalid'), 'q3').to.be.true;

    // Q4-Q6 are not required
    expect(q4.matches(':invalid'), 'q4').to.be.false;
    expect(q5.matches(':invalid'), 'q5').to.be.false;
    expect(q6.matches(':invalid'), 'q6').to.be.false;

    // Fill in the remaining required responses + some optional ones, and resubmit
    q2.vote = 'down';

    q3.value = 'bar-comment';

    q5.vote = 'up';
    q5.comment = 'baz-comment';

    await el.updateComplete;
    submitButton.click();
    await el.updateComplete;
    await aTimeout(0);

    // Verify that the responses sent to the service are correct
    expect(service.surveySubmissionOptions).to.deep.equal({
      surveyIdentifier: 'foo-survey',
      responses: [
        {
          name: 'extra info',
          comment: 'foo-extra-1',
        },
        {
          name: 'required vote, no comment',
          rating: 'up',
        },
        {
          name: 'required vote with comment',
          rating: 'down',
          comment: 'foo-comment',
        },
        {
          name: 'required comment',
          comment: 'bar-comment',
        },
        {
          name: 'more extra info',
          comment: 'foo-extra-2',
        },
        {
          name: 'optional vote, no comment',
          rating: undefined,
        },
        {
          name: 'optional vote with comment',
          rating: 'up',
          comment: 'baz-comment',
        },
        {
          name: 'optional comment',
          comment: '',
        },
        {
          name: 'yet more extra info',
          comment: 'foo-extra-3',
        },
      ],
      recaptchaToken: 'boop',
    });
  });
});
