import { aTimeout, fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test } from 'vitest';

import './ia-feature-feedback';
import type { IAFeatureFeedback } from './ia-feature-feedback';
import type { FeatureFeedbackServiceInterface } from './feature-feedback-service';
import { MockFeatureFeedbackService } from './mocks/mock-feature-feedback-service';
import { MockRecaptchaManager } from './mocks/mock-recaptcha-manager';

describe('IAFeatureFeedback', () => {
  test('shows a button that defaults to text Beta', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback></ia-feature-feedback>
    `)) as IAFeatureFeedback;
    const textContainer = el.shadowRoot!.querySelector(
      '#button-text',
    ) as HTMLSpanElement;
    expect(textContainer.innerText).to.equal('Beta');
  });

  test('can customize the button text', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback .buttonText=${'Boop'}></ia-feature-feedback>
    `)) as IAFeatureFeedback;
    const textContainer = el.shadowRoot!.querySelector(
      '#button-text',
    ) as HTMLSpanElement;
    expect(textContainer.innerText).to.equal('Boop');
  });

  test('shows the popup when button is clicked', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback></ia-feature-feedback>
    `)) as IAFeatureFeedback;
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
      <ia-feature-feedback></ia-feature-feedback>
    `)) as IAFeatureFeedback;
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
      <ia-feature-feedback></ia-feature-feedback>
    `)) as IAFeatureFeedback;
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

  test('submits the response to the service', async () => {
    const service = new MockFeatureFeedbackService();
    const recaptchaManager = new MockRecaptchaManager();

    const el = (await fixture(html`
      <ia-feature-feedback
        featureIdentifier="foo-feature"
        .featureFeedbackService=${service}
        .recaptchaManager=${recaptchaManager}
      ></ia-feature-feedback>
    `)) as IAFeatureFeedback;
    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;
    const upvoteButton = el.shadowRoot!.querySelector(
      'label.vote-button.upvote-button',
    ) as HTMLLabelElement;
    upvoteButton.click();
    await el.updateComplete;
    const submitButton = el.shadowRoot!.querySelector(
      '#submit-button',
    ) as HTMLInputElement;
    submitButton.click();
    await el.updateComplete;
    expect(service.submissionOptions).to.deep.equal({
      featureIdentifier: 'foo-feature',
      vote: 'up',
      comments: '',
      recaptchaToken: 'boop',
    });
  });

  test('shows an error if user tries to submit without selecting a vote', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback
        featureIdentifier="foo-feature"
      ></ia-feature-feedback>
    `)) as IAFeatureFeedback;
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
    const upvoteButton = el.shadowRoot!.querySelector(
      'label.vote-button.upvote-button',
    ) as HTMLLabelElement;
    expect(upvoteButton.classList.contains('error')).to.be.true;
  });

  test('in vote-prompt mode, shows the prompt with vote/comment buttons', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback
        displayMode="vote-prompt"
        prompt="foobar"
      ></ia-feature-feedback>
    `)) as IAFeatureFeedback;

    const promptContainer = el.shadowRoot!.querySelector('.prompt');
    const promptText = promptContainer!.querySelector(
      '.prompt-text',
    ) as HTMLSpanElement;
    expect(promptText.innerText).to.equal('foobar');

    const voteButtons = promptContainer!.querySelectorAll('.vote-button');
    expect(voteButtons.length).to.equal(2);

    const commentButton = promptContainer!.querySelector(
      '#comment-button',
    ) as HTMLButtonElement;
    expect(commentButton).to.exist;
  });

  test('in vote-prompt mode, submits feedback when clicking a vote button outside the popup', async () => {
    const service = new MockFeatureFeedbackService();
    const recaptchaManager = new MockRecaptchaManager();

    const el = (await fixture(html`
      <ia-feature-feedback
        displayMode="vote-prompt"
        featureIdentifier="foo-feature"
        .featureFeedbackService=${service}
        .recaptchaManager=${recaptchaManager}
      ></ia-feature-feedback>
    `)) as IAFeatureFeedback;

    const upvoteButton = el.shadowRoot!.querySelector(
      ':not(#popup) .upvote-button',
    ) as HTMLLabelElement;
    upvoteButton.click();

    await el.updateComplete;
    await aTimeout(0); // Next tick
    expect(service.submissionOptions).to.deep.equal({
      featureIdentifier: 'foo-feature',
      vote: 'up',
      comments: '',
      recaptchaToken: 'boop',
    });
  });

  test('shows a generic error message if the service reports failure', async () => {
    const service = new MockFeatureFeedbackService({
      returnValue: { success: false },
    });
    const recaptchaManager = new MockRecaptchaManager();

    const el = (await fixture(html`
      <ia-feature-feedback
        featureIdentifier="foo-feature"
        .featureFeedbackService=${service}
        .recaptchaManager=${recaptchaManager}
      ></ia-feature-feedback>
    `)) as IAFeatureFeedback;
    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;
    const upvoteButton = el.shadowRoot!.querySelector(
      'label.vote-button.upvote-button',
    ) as HTMLLabelElement;
    upvoteButton.click();
    await el.updateComplete;
    const submitButton = el.shadowRoot!.querySelector(
      '#submit-button',
    ) as HTMLInputElement;
    submitButton.click();
    await el.updateComplete;
    await aTimeout(0);
    await el.updateComplete;

    const errorMessage = el.shadowRoot!.querySelector(
      '#error',
    ) as HTMLDivElement;
    expect(errorMessage.textContent).to.equal(
      'There was an error submitting your feedback.',
    );
  });

  test('shows the error detail if submission throws', async () => {
    const service: FeatureFeedbackServiceInterface = {
      submitFeedback: async () => {
        throw new Error('boom');
      },
      submitSurvey: async () => ({ success: true }),
    };
    const recaptchaManager = new MockRecaptchaManager();

    const el = (await fixture(html`
      <ia-feature-feedback
        featureIdentifier="foo-feature"
        .featureFeedbackService=${service}
        .recaptchaManager=${recaptchaManager}
      ></ia-feature-feedback>
    `)) as IAFeatureFeedback;
    const button = el.shadowRoot!.querySelector(
      '#beta-button',
    ) as HTMLButtonElement;
    button.click();
    await el.updateComplete;
    const upvoteButton = el.shadowRoot!.querySelector(
      'label.vote-button.upvote-button',
    ) as HTMLLabelElement;
    upvoteButton.click();
    await el.updateComplete;
    const submitButton = el.shadowRoot!.querySelector(
      '#submit-button',
    ) as HTMLInputElement;
    submitButton.click();
    await el.updateComplete;
    await aTimeout(0);
    await el.updateComplete;

    const errorMessage = el.shadowRoot!.querySelector(
      '#error',
    ) as HTMLDivElement;
    expect(errorMessage.textContent).to.contain('Error: ');
    expect(errorMessage.textContent).to.contain('boom');
  });

  test('in vote-prompt mode, shows the popup when "Leave a comment" is clicked', async () => {
    const el = (await fixture(html`
      <ia-feature-feedback displayMode="vote-prompt"></ia-feature-feedback>
    `)) as IAFeatureFeedback;

    const commentButton = el.shadowRoot!.querySelector(
      '#comment-button',
    ) as HTMLButtonElement;
    const background = el.shadowRoot!.querySelector(
      '#popup-background',
    ) as HTMLDivElement;

    const classes = background.classList;
    expect(classes.contains('closed')).to.be.true;
    expect(classes.contains('open')).to.be.false;

    commentButton.click();
    await el.updateComplete;
    expect(classes.contains('open')).to.be.true;
    expect(classes.contains('closed')).to.be.false;
  });
});
