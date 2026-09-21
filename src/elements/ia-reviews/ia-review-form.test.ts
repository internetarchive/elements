import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import axe from 'axe-core';
import { html } from 'lit';

import type { IAReviewForm } from './ia-review-form';
import { Review } from '@internetarchive/metadata-service';
import './ia-review-form';
import { MockFetchHandler } from './mocks/mock-fetch-handler';

const mockOldReview = new Review({
  stars: 5,
  reviewtitle: 'What a cool book!',
  reviewbody: 'I loved it.',
  reviewer: 'Foo Bar',
  reviewdate: new Date('03/20/2025'),
  createdate: new Date('02/07/2025'),
  reviewer_itemname: '@foo-bar',
});

const mockFetchHandler = new MockFetchHandler();

describe('IAReviewForm', () => {
  test('passes the a11y audit', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .oldReview=${mockOldReview}></ia-review-form>`,
    );

    const { violations } = await axe.run(el);
    expect(violations).toEqual([]);
  });

  test('passes the a11y audit in review mode', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .oldReview=${mockOldReview}
        .displayMode=${'review'}
      ></ia-review-form>`,
    );

    const { violations } = await axe.run(el);
    expect(violations).toEqual([]);
  });

  test('passes the a11y audit with a recoverable error', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .oldReview=${mockOldReview}
        .recoverableError=${'fail'}
      ></ia-review-form>`,
    );

    const { violations } = await axe.run(el);
    expect(violations).toEqual([]);
  });

  test('passes the a11y audit with an uncrecoverable error', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .oldReview=${mockOldReview}
        .unrecoverableError=${'fail'}
      ></ia-review-form>`,
    );

    const { violations } = await axe.run(el);
    expect(violations).toEqual([]);
  });

  test('renders a basic form', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form></ia-review-form>`,
    );

    const form = el.shadowRoot?.querySelector('form');
    expect(form).to.exist;
  });

  test('replaces the form inputs with an error if an unrecoverable error is passed in, and disables submission', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .unrecoverableError=${'You must be logged in to write reviews.'}
        .oldReview=${mockOldReview}
      ></ia-review-form>`,
    );

    const inputs = el.shadowRoot?.querySelector('.inputs');
    expect(inputs).to.be.null;

    const errorDiv = el.shadowRoot?.querySelector('.unrecoverable-error');
    expect(errorDiv).to.exist;
    expect(errorDiv?.textContent).to.include(
      'You must be logged in to write reviews.',
    );

    const submitBtn = el.shadowRoot?.querySelector(
      'ia-button.submit-btn',
    ) as HTMLElement & { disabled: boolean };
    expect(submitBtn.disabled).to.be.true;
  });

  test('does not replace the form inputs if no unrecoverable errors are passed in', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .oldReview=${mockOldReview}></ia-review-form>`,
    );

    const inputs = el.shadowRoot?.querySelector('.inputs');
    expect(inputs).to.exist;

    const errorDiv = el.shadowRoot?.querySelector('.unrecoverable-error');
    expect(errorDiv).not.to.exist;

    const submitBtn = el.shadowRoot?.querySelector('ia-button.submit-btn');
    expect((submitBtn as HTMLElement & { disabled: boolean }).disabled).to.be
      .false;
  });

  test('adds an error div if a recoverable error is passed in, and does not disable submission', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .recoverableError=${'Something went wrong on our end. Please try again.'}
        .oldReview=${mockOldReview}
      ></ia-review-form>`,
    );

    const inputs = el.shadowRoot?.querySelector('.inputs');
    expect(inputs).to.exist;

    const errorDiv = el.shadowRoot?.querySelector('.recoverable-error');
    expect(errorDiv).to.exist;
    expect(errorDiv?.textContent).to.include(
      'Something went wrong on our end. Please try again',
    );

    const submitBtn = el.shadowRoot?.querySelector('ia-button.submit-btn');
    expect((submitBtn as HTMLElement & { disabled: boolean }).disabled).to.be
      .false;
  });

  test('permits safe HTML in error messages', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .bypassRecaptcha=${true}
        .review=${mockOldReview}
        .recoverableError=${'<b>I am bold. <a href="archive.org">I am a link.</a></b>'}
      ></ia-review-form>`,
    );

    const errorDiv = el.shadowRoot?.querySelector('.recoverable-error');
    expect(errorDiv).to.exist;
    expect(errorDiv?.textContent).to.include('I am bold. I am a link');
    expect(errorDiv?.querySelector('a')).to.exist;
    expect(errorDiv?.querySelector('b')).to.exist;
  });

  test('sanitizes error message HTML prior to submit', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .bypassRecaptcha=${true}
        .review=${mockOldReview}
        .recoverableError=${'<b>I am bold. <button onclick="dostuff()">I am a button.</button><img src="archive.org" /></b>'}
      ></ia-review-form>`,
    );

    const errorDiv = el.shadowRoot?.querySelector('.recoverable-error');
    expect(errorDiv).to.exist;
    expect(errorDiv?.textContent).to.include('I am bold. I am a button.');
    expect(errorDiv?.querySelector('b')).to.exist;
    expect(errorDiv?.querySelector('button')).not.to.exist;
  });

  test('prefills the old review title if provided', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .oldReview=${mockOldReview}></ia-review-form>`,
    );

    const subjectInput = el.shadowRoot?.querySelector(
      'input[name="field_reviewtitle"]',
    ) as HTMLInputElement;
    expect(subjectInput).to.exist;
    expect(subjectInput.value).to.equal('What a cool book!');
  });

  test('prefills the old review body if provided', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .oldReview=${mockOldReview}></ia-review-form>`,
    );

    const bodyInput = el.shadowRoot?.querySelector(
      'textarea[name="field_reviewbody"]',
    ) as HTMLInputElement;
    expect(bodyInput).to.exist;
    expect(bodyInput.value).to.equal('I loved it.');
  });

  test('prefills the hidden star input if non-zero number provided', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .oldReview=${mockOldReview}></ia-review-form>`,
    );

    const starsInput = el.shadowRoot?.querySelector(
      'input[name="field_stars"]',
    ) as HTMLInputElement;
    expect(starsInput).to.exist;
    expect(starsInput.value).to.equal('5');
  });

  test('prefills with zero stars if no previous review provided', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form></ia-review-form>`,
    );

    const starsInput = el.shadowRoot?.querySelector(
      'input[name="field_stars"]',
    ) as HTMLInputElement;
    expect(starsInput).to.exist;
    expect(starsInput.value).to.equal('0');
  });

  test('shows the same number of selected stars as rating', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .oldReview=${mockOldReview}></ia-review-form>`,
    );

    const selectedStars = el.shadowRoot?.querySelectorAll('.star-selected');
    expect(selectedStars).to.exist;
    expect(selectedStars?.length).to.equal(5);
  });

  test('shows the same number of unselected stars as rating', async () => {
    const threeStarReview = new Review({ stars: 3 });

    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .oldReview=${threeStarReview}></ia-review-form>`,
    );

    const selectedStars = el.shadowRoot?.querySelectorAll('.star-selected');
    const unselectedStars = el.shadowRoot?.querySelectorAll('.star-unselected');
    expect(selectedStars).to.exist;
    expect(unselectedStars).to.exist;
    expect(selectedStars?.length).to.equal(3);
    expect(unselectedStars?.length).to.equal(2);
  });

  test('changes the stars on star click', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .oldReview=${mockOldReview}></ia-review-form>`,
    );

    const secondStar = el.shadowRoot?.querySelector(
      '.star-2',
    ) as HTMLImageElement;
    secondStar!.click();

    await el.updateComplete;

    const selectedStars = el.shadowRoot?.querySelectorAll('.star-selected');
    const unselectedStars = el.shadowRoot?.querySelectorAll('.star-unselected');
    expect(selectedStars?.length).to.equal(2);
    expect(unselectedStars?.length).to.equal(3);

    const starsInput = el.shadowRoot?.getElementById(
      'stars-input',
    ) as HTMLInputElement;
    expect(starsInput?.value).to.equal('2');
  });

  test('clears the stars if current star rating clicked', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .oldReview=${mockOldReview}></ia-review-form>`,
    );

    const currentStar = el.shadowRoot?.querySelector(
      '.star-5',
    ) as HTMLImageElement;
    currentStar!.click();

    await el.updateComplete;

    const selectedStars = el.shadowRoot?.querySelectorAll('.star-selected');
    const unselectedStars = el.shadowRoot?.querySelectorAll('.star-unselected');
    expect(selectedStars).to.be.empty;
    expect(unselectedStars?.length).to.equal(5);

    const starsInput = el.shadowRoot?.getElementById(
      'stars-input',
    ) as HTMLInputElement;
    expect(starsInput?.value).to.equal('0');
  });

  test('clears the stars if clear button clicked', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .oldReview=${mockOldReview}></ia-review-form>`,
    );

    const clearBtn = el.shadowRoot?.querySelector(
      '.clear-stars-btn',
    ) as HTMLButtonElement;
    clearBtn!.click();

    await el.updateComplete;

    const selectedStars = el.shadowRoot?.querySelectorAll('.star-selected');
    const unselectedStars = el.shadowRoot?.querySelectorAll('.star-unselected');
    expect(selectedStars).to.be.empty;
    expect(unselectedStars?.length).to.equal(5);

    const starsInput = el.shadowRoot?.getElementById(
      'stars-input',
    ) as HTMLInputElement;
    expect(starsInput?.value).to.equal('0');
  });

  test('prefills the identifier if provided', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .identifier=${'foo'}></ia-review-form>`,
    );

    const identifierInput = el.shadowRoot?.querySelector(
      'input[name="identifier"]',
    ) as HTMLInputElement;
    expect(identifierInput).to.exist;
    expect(identifierInput.value).to.equal('foo');
  });

  test('prefills the token if provided', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .token=${'12345a'}></ia-review-form>`,
    );

    const tokenInput = el.shadowRoot?.querySelector(
      'input[name="field_reviewtoken"]',
    ) as HTMLInputElement;
    expect(tokenInput).to.exist;
    expect(tokenInput.value).to.equal('12345a');
  });

  test('shows an error on submit if no recaptcha manager/widget is provided', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .oldReview=${mockOldReview}
        .fetchHandler=${mockFetchHandler}
      ></ia-review-form>`,
    );

    const submitBtn = el.shadowRoot?.querySelector(
      'ia-button.submit-btn',
    ) as HTMLElement;

    submitBtn?.click();

    await el.updateComplete;

    const recaptchaErrorDiv = el.shadowRoot?.querySelector(
      '.recoverable-error',
    ) as HTMLDivElement;
    expect(recaptchaErrorDiv).to.exist;
    expect(recaptchaErrorDiv?.innerText).to.equal(
      'Could not validate review. Please try again later.',
    );
  });

  test('skips recaptcha if the bypass switch is activated', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .oldReview=${mockOldReview}
        .fetchHandler=${mockFetchHandler}
        ?bypassRecaptcha=${true}
        .baseHost=${'#'}
        .endpointPath=${'#'}
      ></ia-review-form>`,
    );

    const submitBtn = el.shadowRoot?.querySelector(
      'ia-button.submit-btn',
    ) as HTMLElement;

    submitBtn?.click();

    await el.updateComplete;

    const recaptchaErrorDiv = el.shadowRoot?.querySelector(
      '.recoverable-error',
    ) as HTMLDivElement;
    expect(recaptchaErrorDiv).not.to.exist;
  });

  test('skips recaptcha if the bypass switch is activated, even with recaptcha manager', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .oldReview=${mockOldReview}
        .fetchHandler=${mockFetchHandler}
        ?bypassRecaptcha=${true}
        .baseHost=${'#'}
        .endpointPath=${'#'}
      ></ia-review-form>`,
    );

    const submitBtn = el.shadowRoot?.querySelector(
      'ia-button.submit-btn',
    ) as HTMLElement;

    submitBtn?.click();

    await el.updateComplete;

    const recaptchaErrorDiv = el.shadowRoot?.querySelector(
      '.recoverable-error',
    ) as HTMLDivElement;
    expect(recaptchaErrorDiv).not.to.exist;
  });

  test('displays a character counter for the subject if max length specified', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .maxSubjectLength=${100}
        .oldReview=${mockOldReview}
      ></ia-review-form>`,
    );

    const subjectCharCounter = el.shadowRoot?.querySelector(
      '.char-count.subject',
    ) as HTMLDivElement;
    expect(subjectCharCounter).to.exist;
    expect(subjectCharCounter?.innerText).to.equal('17/100');
  });

  test('does not display a subject char counter if no max specified', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .oldReview=${mockOldReview}></ia-review-form>`,
    );

    const subjectCharCounter = el.shadowRoot?.querySelector(
      '.char-count.subject',
    ) as HTMLDivElement;
    expect(subjectCharCounter).to.be.null;
  });

  test('shows the correct error states if the subject is too long', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .maxSubjectLength=${10}
        .oldReview=${mockOldReview}
      ></ia-review-form>`,
    );

    const subjectCharCounter = el.shadowRoot?.querySelector(
      '.char-count.subject',
    ) as HTMLDivElement;
    expect(subjectCharCounter?.innerText).to.equal('17/10');

    const subjectInputBox = el.shadowRoot?.getElementById('subject-input');
    expect(subjectInputBox?.className).to.contain('error');

    const submitBtn = el.shadowRoot?.querySelector('ia-button.submit-btn');
    expect((submitBtn as HTMLElement & { disabled: boolean }).disabled).to.be
      .true;
  });

  test('does not show the error states if the subject is not too long', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .maxSubjectLength=${100}
        .oldReview=${mockOldReview}
      ></ia-review-form>`,
    );

    const subjectInputBox = el.shadowRoot?.getElementById('subject-input');
    expect(subjectInputBox?.className).not.to.contain('error');

    const submitBtn = el.shadowRoot?.querySelector('ia-button.submit-btn');
    expect((submitBtn as HTMLElement & { disabled: boolean }).disabled).to.be
      .false;
  });

  test('displays a character counter for the body if max length specified', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .maxBodyLength=${100}
        .oldReview=${mockOldReview}
      ></ia-review-form>`,
    );

    const bodyCharCounter = el.shadowRoot?.querySelector(
      '.char-count.body',
    ) as HTMLDivElement;
    expect(bodyCharCounter).to.exist;
    expect(bodyCharCounter?.innerText).to.equal('11/100');
  });

  test('does not display a body char counter if no max specified', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form .oldReview=${mockOldReview}></ia-review-form>`,
    );

    const bodyCharCounter = el.shadowRoot?.querySelector(
      '.char-count.body',
    ) as HTMLDivElement;
    expect(bodyCharCounter).to.be.null;
  });

  test('shows the correct error states if the body is too long', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .maxBodyLength=${10}
        .oldReview=${mockOldReview}
      ></ia-review-form>`,
    );

    const bodyCharCounter = el.shadowRoot?.querySelector(
      '.char-count.body',
    ) as HTMLDivElement;
    expect(bodyCharCounter?.innerText).to.equal('11/10');

    const bodyInputBox = el.shadowRoot?.getElementById('body-input');
    expect(bodyInputBox?.className).to.contain('error');

    const errorMsg = bodyInputBox?.querySelector('.input-error');
    expect(errorMsg).to.exist;

    const submitBtn = el.shadowRoot?.querySelector(
      'ia-button.submit-btn',
    ) as HTMLElement & { disabled: boolean };
    expect(submitBtn.disabled).to.be.true;
  });

  test('does not show the error states if the body is not too long', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .maxBodyLength=${100}
        .oldReview=${mockOldReview}
      ></ia-review-form>`,
    );

    const bodyInputBox = el.shadowRoot?.getElementById('body-input');
    expect(bodyInputBox?.className).not.to.contain('error');

    const submitBtn = el.shadowRoot?.querySelector('ia-button.submit-btn');
    expect((submitBtn as HTMLElement & { disabled: boolean }).disabled).to.be
      .false;
  });

  test('shows a loading indicator and disables the button if submission is in progress', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .review=${mockOldReview}
        .submissionInProgress=${true}
      ></ia-review-form>`,
    );

    await el.updateComplete;

    const submitBtn = el.shadowRoot?.querySelector(
      'ia-button.submit-btn',
    ) as HTMLElement & { disabled: boolean; loading: boolean };
    expect(submitBtn).to.exist;

    // ia-button renders the spinner itself once loading is set.
    expect(submitBtn.loading).to.be.true;
    expect((submitBtn as HTMLElement & { disabled: boolean }).disabled).to.be
      .true;
  });

  test('does not show a loading indicator or disable submission by default', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .bypassRecaptcha=${true}
        .review=${mockOldReview}
      ></ia-review-form>`,
    );

    const submitBtn = el.shadowRoot?.querySelector('ia-button.submit-btn');
    const loadingIndicator = submitBtn?.querySelector('.loading-indicator');
    expect(loadingIndicator).not.to.exist;
  });
  test('star images fill their button rather than taking the svg default', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form></ia-review-form>`,
    );

    const star = el.shadowRoot?.querySelector(
      '.star-unselected',
    ) as HTMLImageElement;
    const { width, height } = star.getBoundingClientRect();
    expect(`${Math.round(width)}x${Math.round(height)}`).to.equal('30x30');
  });
});
