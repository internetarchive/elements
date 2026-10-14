import {
  html,
  css,
  LitElement,
  nothing,
  HTMLTemplateResult,
  PropertyValues,
  CSSResultGroup,
} from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { msg } from '@lit/localize';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import DOMPurify from 'dompurify';

import type {
  RecaptchaManagerInterface,
  RecaptchaWidgetInterface,
} from '@internetarchive/recaptcha-manager';
import '@src/elements/ia-button/ia-button';
import type { FetchHandlerInterface } from '@internetarchive/fetch-handler';
import { Review } from '@internetarchive/metadata-service';

import starSelected from './assets/star-selected.svg';
import starUnselected from './assets/star-unselected.svg';

import './ia-review';

/**
 * Renders a form to edit a given IA review.
 */
@customElement('ia-review-form')
export class IAReviewForm extends LitElement {
  /* The IA item being reviewed */
  @property({ type: String }) identifier?: string;

  /* The token for the review edit */
  @property({ type: String }) token: string = '';

  /* The host for archive endpoints and data */
  @property({ type: String }) baseHost: string = 'https://archive.org';

  /* The path for the endpoint we're submitting to */
  @property({ type: String }) endpointPath: string = '/write-review.php';

  /** Form submitter's screenname, if applicable */
  @property({ type: String }) submitterScreenname: string = 'Anonymous';

  /** Form submitter's itemname, if applicable */
  @property({ type: String }) submitterItemname?: string;

  /* The previous review to pre-fill, if any */
  @property({ type: Object }) oldReview?: Review;

  /* An optional unrecoverable error to pass in instead of rendering the form inputs */
  @property({ type: String }) unrecoverableError?: string;

  /* Optional max length for review subject */
  @property({ type: Number }) maxSubjectLength?: number;

  /* Optional max length for review body */
  @property({ type: Number }) maxBodyLength?: number;

  /* Handler for form submission */
  @property({ type: Object }) fetchHandler?: FetchHandlerInterface;

  /* Service for activating the recaptcha challenge */
  @property({ type: Object }) recaptchaManager?: RecaptchaManagerInterface;

  /* Optionally avoid using recaptcha for the form */
  @property({ type: Boolean }) bypassRecaptcha: boolean = false;

  /* Recaptcha widget for the form */
  private recaptchaWidget?: RecaptchaWidgetInterface;

  /* Number of stars currently selected */
  @state()
  private currentStars: number = 0;

  /* Length of review subject currently filled in */
  @state()
  private currentSubjectLength: number = 0;

  /* Length of review body currently filled in */
  @state()
  private currentBodyLength: number = 0;

  /* Any recoverable error to display for the form. Will still allow submission. */
  @state()
  recoverableError?: string;

  /* Whether to enable the submit button */
  @state()
  private formCanSubmit: boolean = false;

  /* Whether to show a loading indicator for the form */
  @state()
  submissionInProgress: boolean = false;

  /* The form to be submitted */
  @query('#review-form')
  private reviewForm!: HTMLFormElement;

  /* Error to show if recaptcha cannot be loaded */
  private RECAPTCHA_ERROR_MESSAGE =
    'Could not validate review. Please try again later.';

  private GENERIC_ERROR_MESSAGE =
    "There's been a temporary error. Please wait a moment and try again.";

  render() {
    return html`<form id="review-form" @submit=${this.handleSubmit}>
      ${this.unrecoverableError
        ? this.unrecoverableErrorTemplate
        : html`
            <span class="inputs">
              ${this.starsInputTemplate} ${this.subjectInputTemplate}
              ${this.bodyInputTemplate} ${this.hiddenInputsTemplate}
            </span>
          `}
      ${this.recaptchaMessageTemplate} ${this.recoverableErrorTemplate}
      ${this.actionButtonsTemplate}
    </form>`;
  }

  protected willUpdate(changed: PropertyValues): void {
    // Fill in previous review, if provided
    if (changed.has('oldReview')) {
      this.currentStars = this.oldReview?.stars ?? 0;
      this.currentSubjectLength = this.oldReview?.reviewtitle?.length ?? 0;
      this.currentBodyLength = this.oldReview?.reviewbody?.length ?? 0;
    }

    // Set up ReCaptcha, if possible
    if (
      changed.has('recaptchaManager') &&
      !this.bypassRecaptcha &&
      this.recaptchaManager
    ) {
      this.setupRecaptcha();
    }

    // Disable form if unrecoverable error added
    if (changed.has('unrecoverableError')) {
      this.formCanSubmit = this.checkSubmissionAllowed();
    }

    // Ensure new subject and body have correct length
    if (
      changed.has('currentSubjectLength') ||
      changed.has('currentBodyLength') ||
      changed.has('maxSubjectLength') ||
      changed.has('maxBodyLength')
    ) {
      this.formCanSubmit = this.checkSubmissionAllowed();
    }
  }

  /** Error to render instead of form inputs */
  private get unrecoverableErrorTemplate():
    | HTMLTemplateResult
    | typeof nothing {
    return this.unrecoverableError
      ? html`
          <div class="unrecoverable-error">
            <span class="error-msg">${msg(this.unrecoverableError)}</span>
          </div>
        `
      : nothing;
  }

  /** Error to render next to submit button */
  private get recoverableErrorTemplate(): HTMLTemplateResult | typeof nothing {
    return this.recoverableError
      ? html`
          <div class="recoverable-error">
            ${unsafeHTML(this.sanitizeErrorMsg(msg(this.recoverableError)))}
          </div>
        `
      : nothing;
  }

  private get recaptchaMessageTemplate(): HTMLTemplateResult | typeof nothing {
    if (this.bypassRecaptcha) return nothing;

    return html`
      <span class="recaptcha-disclaimer"
        >${msg(
          html`This site is protected by reCAPTCHA and the Google
            <a
              target="_blank"
              class="inline-link"
              href="https://policies.google.com/privacy"
              >Privacy Policy</a
            >
            and
            <a
              target="_blank"
              class="inline-link"
              href="https://policies.google.com/terms"
              >Terms of Service</a
            >
            apply.`,
        )}</span
      >
    `;
  }

  /** Clickable group of stars */
  private get starsInputTemplate(): HTMLTemplateResult {
    return html`
      <div class="form-heading rating">
        <label for="stars-field">${msg('Rating (optional)')}</label>
      </div>
      <input
        type="hidden"
        name="field_stars"
        id="stars-input"
        .value=${this.currentStars.toString()}
        required
      />
      <div class="stars">
        ${[1, 2, 3, 4, 5].map((num) => this.renderStar(num))}
        <button
          type="button"
          class="clear-stars-btn"
          @click=${this.handleClearBtnClicked}
        >
          ${msg('Clear')}
        </button>
      </div>
    `;
  }

  /** Subject input and character counter */
  private get subjectInputTemplate(): HTMLTemplateResult {
    return html`
      <span id="subject-input" class="input-box ${
        this.maxSubjectLength &&
        this.currentSubjectLength > this.maxSubjectLength
          ? 'error'
          : ''
      }"
      ><div class="form-heading">
        <label for="field_reviewtitle">${msg('Subject')}</label>
        ${
          this.maxSubjectLength
            ? html`<div class="char-count subject">
                ${this.currentSubjectLength}/${this.maxSubjectLength}
              </div>`
            : nothing
        }
      </div>
      <input
        type="text"
        name="field_reviewtitle"
        id="field_reviewtitle"
        .value=${this.oldReview?.reviewtitle ?? ''}
        @input=${this.handleSubjectChanged}
        required
    />${
      this.maxSubjectLength
        ? html`
            <div class="input-error">
              ${msg(
                `Subject may only have ${this.maxSubjectLength} characters`,
              )}
            </div>
          `
        : nothing
    }</div></span>
    `;
  }

  /** Body input and character counter */
  private get bodyInputTemplate(): HTMLTemplateResult {
    return html`
      <span
        id="body-input"
        class="input-box ${this.maxBodyLength &&
        this.currentBodyLength > this.maxBodyLength
          ? 'error'
          : ''}"
        ><div class="form-heading">
          <label for="field_reviewbody">${msg('Review')}</label>
          ${this.maxBodyLength
            ? html`<div class="char-count body">
                ${this.currentBodyLength}/${this.maxBodyLength}
              </div>`
            : nothing}
        </div>
        <textarea
          name="field_reviewbody"
          id="field_reviewbody"
          .value=${this.oldReview?.reviewbody ?? ''}
          rows="10"
          cols="50"
          required
          @input=${this.handleBodyChanged}
        ></textarea>
        ${this.maxBodyLength
          ? html`
              <div class="input-error">
                ${msg(`Review may only have ${this.maxBodyLength} characters`)}
              </div>
            `
          : nothing}
      </span>
    `;
  }

  /** Hidden inputs we use to store other information for form submission */
  private get hiddenInputsTemplate(): HTMLTemplateResult {
    return html`
      <input type="hidden" name="field_reviewtoken" .value=${this.token} />
      ${this.identifier
        ? html`<input
            type="hidden"
            name="identifier"
            .value=${this.identifier}
          />`
        : nothing}
    `;
  }

  /** Buttons to render at bottom of form */
  private get actionButtonsTemplate(): HTMLTemplateResult {
    return html`<div class="action-btns">
      <ia-button
        mode="secondary"
        class="cancel-btn"
        data-testid="cancel-btn"
        @click=${this.cancelReviewEdit}
      >
        ${msg('Cancel')}
      </ia-button>
      <ia-button
        mode="primary"
        type="submit"
        class="submit-btn"
        .disabled=${!this.formCanSubmit}
        .loading=${this.submissionInProgress}
      >
        ${msg('Submit review')}
      </ia-button>
    </div>`;
  }

  /**
   * Renders a star icon, using its number and the current star rating
   * to determine whether it should appear selected or not
   *
   * @param {number} num The number of the current star
   * @returns {HTMLTemplateResult} The correct icon, rendered within a button
   */
  private renderStar(num: number): HTMLTemplateResult {
    const isSelected = num === this.currentStars;
    const ratingLabel = msg(`Rate ${num > 1 ? `${num} stars` : '1 star'}`);

    return html`
      <button
        class="star star-${num}"
        title=${isSelected ? msg('Clear rating') : ratingLabel}
        @click=${(e: Event) => this.handleStarClicked(e, num)}
      >
        ${num <= this.currentStars
          ? html`<img
              class="star-selected"
              src=${starSelected}
              alt=""
              aria-hidden="true"
            />`
          : html`<img
              class="star-unselected"
              src=${starUnselected}
              alt=""
              aria-hidden="true"
            />`}
      </button>
    `;
  }

  /**
   * Sets up ReCaptcha for the form, if possible.
   *
   * On failure, replaces form inputs with the ReCaptcha error message.
   */
  private async setupRecaptcha(): Promise<void> {
    try {
      this.recaptchaWidget = await this.recaptchaManager?.getRecaptchaWidget();
    } catch {
      this.unrecoverableError = this.RECAPTCHA_ERROR_MESSAGE;
    }
  }

  /**
   * Uses DOMpurify to sanitize any error message before render.
   *
   * @param {string} errorMsg The error message to be sanitized
   * @returns {string} The sanitized error message
   */
  private sanitizeErrorMsg(errorMsg: string): string {
    return DOMPurify.sanitize(errorMsg, { ALLOWED_TAGS: ['a', 'b', 'br'] });
  }

  /** Handles validation and recaptcha execution on form submission */
  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    // Prevent disallowed or double submission
    if (!this.formCanSubmit || this.submissionInProgress) return;

    // Set loading behavior
    this.submissionInProgress = true;
    this.recoverableError = '';

    // Check for HTML errors
    if (!this.reviewForm.reportValidity()) {
      return this.stopSubmission();
    }

    if (!this.fetchHandler) {
      this.recoverableError = this.GENERIC_ERROR_MESSAGE;
      return this.stopSubmission();
    }

    try {
      const formData = new URLSearchParams();

      if (!this.bypassRecaptcha) {
        const recaptchaToken = await this.getRecaptchaToken();
        if (!recaptchaToken) return this.handleRecaptchaError();

        formData.append('g-recaptcha-response', recaptchaToken ?? '');
      }

      for (const entry of new FormData(this.reviewForm)) {
        formData.append(entry[0], entry[1] as string);
      }

      // Indicates to the backend that submission is intended
      formData.append('submitter', 'review-form');

      const result: { success: boolean; error?: string } =
        await this.fetchHandler.fetchApiResponse(
          `${this.baseHost}${this.endpointPath}`,
          {
            method: 'POST',
            includeCredentials: true,
            body: formData,
          },
        );

      if (result?.success === true) {
        this.submissionInProgress = false;
        const newReview = this.generateSubmittedReview();

        // Emit a reviewUpdated event
        const event = new CustomEvent<Review>('reviewUpdated', {
          detail: newReview,
        });
        this.dispatchEvent(event);
      } else {
        this.recoverableError = result.error ?? this.GENERIC_ERROR_MESSAGE;
        this.stopSubmission();
      }
    } catch (e) {
      console.error(e);
      this.recoverableError = this.GENERIC_ERROR_MESSAGE;
      this.stopSubmission();
    }
  }

  /**
   * Generates a review object from the submitted review,
   * for optimistic display on success.
   *
   * @returns {Review} The review to display
   */
  private generateSubmittedReview(): Review {
    const today = new Date().toDateString();

    const newReview = new Review({
      reviewtitle: this.reviewForm.field_reviewtitle.value,
      reviewbody: this.reviewForm.field_reviewbody.value,
      stars: this.reviewForm.field_stars.value,
      reviewdate: today,
      reviewer: this.oldReview?.reviewer ?? this.submitterScreenname,
      reviewer_itemname:
        this.oldReview?.reviewer_itemname ?? this.submitterItemname,
      createdate: this.dateToString(this.oldReview?.createdate) ?? today,
    });

    return newReview;
  }

  /**
   * Converts date to string if it is a Date, otherwise
   * leaves unchanged.
   */
  private dateToString(date: string | Date | undefined) {
    if (date instanceof Date) return date.toDateString();
    return date;
  }

  /**
   * Executes the ReCaptcha challenge for the form.
   * Attempts form submission on success.
   * */
  private async getRecaptchaToken(): Promise<string | undefined> {
    if (!this.recaptchaWidget) {
      this.handleRecaptchaError();
      return;
    }

    try {
      const recaptchaToken = await this.recaptchaWidget.execute();
      return recaptchaToken;
    } catch {
      this.handleRecaptchaError();
      return;
    }
  }

  /* Handles a recaptcha error during submission */
  private handleRecaptchaError(): void {
    this.recoverableError = this.RECAPTCHA_ERROR_MESSAGE;
    this.stopSubmission();
  }

  /* Handles canceled form submission */
  private stopSubmission(): void {
    if (this.submissionInProgress) {
      this.submissionInProgress = false;
    }
  }

  /* Emits an event to close the form */
  private cancelReviewEdit(): void {
    const event = new CustomEvent('reviewEditCanceled');
    this.dispatchEvent(event);
  }

  /* Prevents form submission and sets stars based on number clicked */
  private handleStarClicked(e: Event, num: number): void {
    e.preventDefault();
    this.setStars(num);
  }

  /* Clear stars if requested */
  private handleClearBtnClicked(e: Event): void {
    e.preventDefault();
    this.currentStars = 0;
  }

  /* Updates star count, resetting to 0 if the currently selected star is clicked */
  private setStars(num: number): void {
    this.currentStars = num === this.currentStars ? 0 : num;
  }

  /* Updates subject input length */
  private handleSubjectChanged(e: Event): void {
    const subjectInput = e.target as HTMLInputElement;
    this.currentSubjectLength = subjectInput.value.length;
  }

  /* Updates body input length */
  private handleBodyChanged(e: Event): void {
    const bodyInput = e.target as HTMLInputElement;
    this.currentBodyLength = bodyInput.value.length;
  }

  /* Checks if submission should be allowed */
  private checkSubmissionAllowed(): boolean {
    // Form must not have an unrecoverable error
    if (this.unrecoverableError) {
      return false;
    }

    // Subject and body must not be empty
    if (!this.currentBodyLength || !this.currentSubjectLength) {
      return false;
    }

    // Subject must be correct length
    if (
      !!this.maxSubjectLength &&
      this.currentSubjectLength > this.maxSubjectLength
    ) {
      return false;
    }

    // Body must be correct length
    if (!!this.maxBodyLength && this.currentBodyLength > this.maxBodyLength) {
      return false;
    }

    return true;
  }

  static get styles(): CSSResultGroup {
    return [
      css`
        .form-heading {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-top: 15px;
        }

        .form-heading.rating {
          padding-top: 0;
        }

        .form-heading label {
          font-size: 1.6rem;
          font-weight: bold;
        }

        label {
          display: inline-block;
          margin-bottom: 5px;
        }

        textarea,
        input[type='text'],
        .unrecoverable-error {
          padding: 5px;
          width: calc(100% - 10px);
          font-family: inherit;
          border-radius: 5px;
          border: 1px solid var(--container-border-color, #999999);
        }

        .input-box.error input,
        .input-box.error textarea {
          border: 2px solid var(--container-error-color, #ea0202);
        }

        .input-box.error .char-count,
        .input-error,
        .unrecoverable-error,
        .recoverable-error {
          color: var(--container-error-color, #ea0202);
        }

        .input-error {
          display: none;
        }

        .input-box.error .input-error {
          display: block;
          text-align: right;
          padding-top: 5px;
        }

        .inline-link {
          color: var(--container-link-color, #4f65f5);
          text-decoration: none;
        }

        .inline-link:hover {
          text-decoration: underline;
        }

        .stars {
          display: flex;
          flex-direction: row;
          gap: 2px;
          align-items: center;
        }

        .star {
          all: unset;
          height: 30px;
          width: 30px;
        }

        .star-selected,
        .star-unselected {
          display: block;
          width: 100%;
          height: 100%;
        }

        .star:hover {
          cursor: pointer;
        }

        .clear-stars-btn,
        .recoverable-error a {
          padding: 0 5px;
          color: var(--container-link-color, #4f65f5);
          font-family: inherit;
          border: none;
          background: transparent;
          display: inline-block;
          padding-top: 5px;
        }

        .clear-stars-btn:hover,
        .recoverable-error a:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        .action-btns {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 15px;
        }

        .ia-button:disabled {
          opacity: 0.75;
        }

        .ia-button:disabled:hover {
          cursor: not-allowed;
        }

        .unrecoverable-error {
          min-height: 50px;
          padding: 5px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: var(--container-bg-color, #fbfbfd);
        }

        .recaptcha-disclaimer {
          font-size: 1.2rem;
        }

        @media only screen and (max-width: 350px) {
          .action-btns {
            flex-direction: column-reverse;
            align-items: center;
          }
        }
      `,
    ];
  }
}
