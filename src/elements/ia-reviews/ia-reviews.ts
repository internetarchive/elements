import {
  css,
  CSSResult,
  CSSResultGroup,
  html,
  HTMLTemplateResult,
  LitElement,
  nothing,
  PropertyValues,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { msg } from '@lit/localize';

import type { Review } from '@internetarchive/metadata-service';
import type { RecaptchaManagerInterface } from '@internetarchive/recaptcha-manager';
import {
  FetchHandlerInterface,
  IaFetchHandler,
} from '@internetarchive/fetch-handler';
import { iaButtonStyles } from '@internetarchive/ia-styles';

import './ia-review';
import './ia-review-form';

/**
 * Renders the full IA reviews piece
 */
@customElement('ia-reviews')
export class IAReviews extends LitElement {
  /** GLOBAL/REVIEW-RENDERING PROPERTIES */
  /* The identifier for the item being reviewed */
  @property({ type: String }) identifier?: string;

  /* The list of reviews to be rendered */
  @property({ type: Array }) reviews: Review[] = [];

  /* Whether reviews are disabled for the item */
  @property({ type: Boolean }) reviewsDisabled = false;

  /* Whether reviews are frozen for the item */
  @property({ type: Boolean }) reviewsFrozen = false;

  /* Whether the person viewing the reviews section has the power to delete reviews */
  @property({ type: Boolean }) canDelete = false;

  /* Whether we should bypass the show/hide and more/less toggles */
  @property({ type: Boolean }) displayReviewsByDefault = false;

  /* Maximum allowable length for subject */
  @property({ type: Number }) maxSubjectLength?: number;

  /* Maximum allowable length for body */
  @property({ type: Number }) maxBodyLength?: number;

  /* Base for URLs */
  @property({ type: String }) baseHost = 'https://archive.org';

  /** REVIEW FORM PROPERTIES */
  /* The token for the review edit */
  @property({ type: String }) token: string = '';

  /* The path for the endpoint we're submitting to */
  @property({ type: String }) endpointPath: string = '/write-review.php';

  /** Form submitter's screenname, if applicable */
  @property({ type: String }) submitterScreenname: string = 'Anonymous';

  /** Form submitter's itemname, if applicable */
  @property({ type: String }) submitterItemname?: string;

  /* Service for activating the recaptcha challenge */
  @property({ type: Object }) recaptchaManager?: RecaptchaManagerInterface;

  /* Optionally avoid using recaptcha for the form */
  @property({ type: Boolean }) bypassRecaptcha: boolean = false;

  /* An optional error message to be displayed instead of the review form */
  @property({ type: String }) reviewSubmissionError?: string;

  /* Whether the add/edit button has been clicked */
  @property({ type: Boolean }) reviewAddEditRequested: boolean = false;

  /* An optional handler for form submission to pass along to the form */
  @property({ type: Object }) fetchHandler: FetchHandlerInterface =
    new IaFetchHandler();

  /* Whether to display the review form or the editable review */
  @state()
  displayReviewForm: boolean = false;

  /* Whether to display the existing reviews */
  @state()
  private displayReviews: boolean = false;

  /* The sorted and filtered reviews to render */
  @state()
  private filteredReviews: Review[] = [];

  /* The current version of the review */
  @state()
  private currentReview?: Review;

  /* The number of reviews */
  @state()
  private reviewsCount: number = 0;

  /* Whether recaptcha has been activated (by clicking the add/edit button) */
  @state()
  private recaptchaActivated: boolean = false;

  render() {
    if (this.reviewsDisabled) return this.reviewsDisabledTemplate;
    if (this.reviewsCount === 0 && !this.displayReviewForm)
      return this.noReviewsMsgTemplate;
    if (!this.displayReviews) return this.displayReviewsMsgTemplate;

    return html`
      <div class="reviews-list">
        ${this.reviewsFrozen
          ? html`<div class="message">
              ${msg('Reviews can no longer be added to this item.')}
            </div>`
          : nothing}
        ${this.editableCurrentReviewTemplate}
        ${this.filteredReviews.map((review) =>
          review.reviewer_itemname !== this.submitterItemname
            ? this.renderReview(review)
            : nothing,
        )}
      </div>
    `;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('reviews') || changed.has('submitterItemname')) {
      this.reviewsCount = this.reviews.length;
      this.sortFilterReviews();
    }

    if (changed.has('displayReviewForm') && this.displayReviewForm === true) {
      if (!this.bypassRecaptcha && !this.recaptchaActivated)
        this.recaptchaActivated = true;
      this.displayReviews = true;
    }

    if (
      changed.has('displayReviewsByDefault') &&
      this.displayReviewsByDefault
    ) {
      this.displayReviews = true;
    }
  }

  /* Message to display if reviews are disabled */
  private get reviewsDisabledTemplate(): HTMLTemplateResult {
    return html`<div class="message">
      ${msg('Reviews have been disabled for this item.')}
    </div>`;
  }

  /* Message to display instead of the reviews list if there are no reviews yet */
  private get noReviewsMsgTemplate(): HTMLTemplateResult {
    if (this.reviewsFrozen)
      return html`
        <div class="message">
          ${msg('Reviews cannot be added to this item.')}
        </div>
      `;

    return html`
      <div class="message">
        ${msg('There are no reviews yet.')}
        ${msg(html`
          Be the first one to
          <button
            class="ia-button link no-reviews-btn"
            @click=${this.addEditReview}
          >
            write a review</button
          >.
        `)}
      </div>
    `;
  }

  /* Message to display instead of the reviews list if reviews are hidden */
  private get displayReviewsMsgTemplate(): HTMLTemplateResult {
    return html`
      <div class="message">
        ${this.reviewsCount === 1
          ? msg('There is 1 review for this item.')
          : msg(`There are ${this.reviewsCount} reviews for this item.`)}
        <button
          class="ia-button link display-reviews-btn"
          @click=${() => (this.displayReviews = true)}
        >
          ${msg(`Display ${this.reviewsCount === 1 ? 'review' : 'reviews'}`)}</button
        >.
      </div>
    `;
  }

  /**
   * Renders the review form, passing along all necessary properties; this will also render
   * the patron's own review if applicable and/or following submission.
   */
  private get editableCurrentReviewTemplate():
    | HTMLTemplateResult
    | typeof nothing {
    if (!this.displayReviewForm && !this.currentReview) return nothing;

    return html`<div class="own-review-container">
      ${!this.displayReviewForm
        ? this.renderReview(this.currentReview)
        : html`<ia-review-form
            .identifier=${this.identifier}
            .oldReview=${this.currentReview}
            .baseHost=${this.baseHost}
            .endpointPath=${this.endpointPath}
            .submitterItemname=${this.submitterItemname}
            .submitterScreenname=${this.submitterScreenname}
            .maxSubjectLength=${this.maxSubjectLength}
            .maxBodyLength=${this.maxBodyLength}
            .token=${this.token}
            .unrecoverableError=${this.reviewSubmissionError}
            .fetchHandler=${this.fetchHandler}
            .recaptchaManager=${this.recaptchaActivated
              ? this.recaptchaManager
              : undefined}
            ?bypassRecaptcha=${this.bypassRecaptcha}
            @reviewUpdated=${this.handleReviewUpdate}
            @reviewEditCanceled=${this.handleEditCanceled}
          ></ia-review-form>`}
    </div>`;
  }

  /** Sorts the reviews and splits the patron's own review out of the reviews array */
  private sortFilterReviews(): void {
    let patronsOwnReview: Review | undefined;
    const filteredReviews: Review[] = [];

    this.reviews.forEach((review) => {
      if (
        !patronsOwnReview &&
        review.reviewer_itemname === this.submitterItemname
      ) {
        patronsOwnReview = review;
      } else filteredReviews.push(review);
    });

    this.currentReview = patronsOwnReview;
    this.filteredReviews = this.sortReviews(filteredReviews);
  }

  /** Sorts reviews by create date for render */
  private sortReviews(reviews: Review[]): Review[] {
    const sortedReviews = [...reviews].sort((a, b) =>
      a.createdate && b.createdate
        ? new Date(b.createdate).getTime() - new Date(a.createdate).getTime()
        : 0,
    );

    return sortedReviews;
  }

  /* Renders the given review, using the ia-review component */
  private renderReview(review?: Review): HTMLTemplateResult | typeof nothing {
    if (!review) return nothing;

    return html`<ia-review
      .review=${review}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .csrfToken=${this.token}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`;
  }

  /** Prepare the review form for adding or editing */
  private addEditReview(): void {
    if (!this.bypassRecaptcha) this.recaptchaActivated = true;
    this.displayReviewForm = true;
  }

  /** Handles successful review submission */
  private handleReviewUpdate(e: CustomEvent<Review>): void {
    if (!this.currentReview && e.detail) {
      this.dispatchEvent(new CustomEvent<void>('newReviewAdded'));
      this.reviewsCount += 1;
    }
    this.currentReview = e.detail;
    this.displayReviewForm = false;
  }

  /** Closes the review form if requested */
  private handleEditCanceled(): void {
    this.displayReviewForm = false;

    // Display no-reviews message again if no new review was added
    if (this.reviewsCount === 0) {
      this.displayReviews = false;
    }
  }

  static get styles(): CSSResultGroup {
    return [
      // ia-styles is built against lit 2, so its CSSResult is a nominally
      // different type from lit 3's. They differ only by a private field and
      // are the same object at runtime.
      iaButtonStyles as unknown as CSSResult,
      css`
        :host {
          font-family: var(
            --ia-font-stack,
            'Helvetica Neue',
            Helvetica,
            Arial,
            sans-serif
          );

          color: var(--ia-text-color, #2c2c2c);
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
        }

        .own-review-container {
          --error-color: var(--container-error-color, #ea0202);
          --link-color: var(--container-link-color, #4f65f5);
          --container-error-color: #ea0202;
          --container-link-color: #4f65f5;
          --container-bg-color: #fbfbfd;
          --container-border-color: #999999;

          border: 2px solid var(--container-border-color, #999999);
          border-radius: 5px;
          background-color: var(--container-bg-color, #fbfbfd);
          padding: 10px;
        }

        .message {
          font-weight: 200;
        }

        .message .ia-button {
          display: inline;
          vertical-align: baseline;
          padding: 0;
          font-weight: 600;
        }
      `,
    ];
  }
}
