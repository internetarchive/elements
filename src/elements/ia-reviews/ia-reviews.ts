import {
  css,
  CSSResultGroup,
  html,
  HTMLTemplateResult,
  LitElement,
  nothing,
  PropertyValues,
} from 'lit';
import { property, queryAll, state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { localized, msg, str } from '@lit/localize';

import type { Review } from '@internetarchive/metadata-service';
import type { RecaptchaManagerInterface } from '@internetarchive/recaptcha-manager';

import '@src/elements/ia-button/ia-button';

import type { ReviewServiceInterface } from './models';
import type { IAReview } from './ia-review';
import { ReviewService } from './review-service';
import './ia-review';
import './ia-review-form';

/**
 * Renders the full IA reviews piece
 */
@customElement('ia-reviews')
@localized()
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

  /* Whether we should bypass the show-more and more/less toggles */
  @property({ type: Boolean }) displayReviewsByDefault = false;

  /* How many reviews to show before the rest go behind a "Show more" button */
  @property({ type: Number }) maxInitialReviews = 5;

  /* Maximum allowable length for subject */
  @property({ type: Number }) maxSubjectLength?: number;

  /* Maximum allowable length for body */
  @property({ type: Number }) maxBodyLength?: number;

  /* Base for URLs. Also used for the reviewer profile links. */
  @property({ type: String }) baseHost = 'https://archive.org';

  /** REVIEW FORM PROPERTIES */

  /** Form submitter's screenname, if applicable. Defaults to "Anonymous". */
  @property({ type: String }) submitterScreenname?: string;

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

  /**
   * Handles the review write and delete requests.
   *
   * Writing and deleting need one, since the service is what carries the CSRF token. Left unset,
   * reviews still render and the form still opens, but a submission reports a generic failure.
   */
  @property({ type: Object }) reviewService?: ReviewServiceInterface;

  /* The service the components actually call, whether injected or built here */
  @state()
  private activeReviewService?: ReviewServiceInterface;

  /* Whether to display the review form or the editable review */
  @state()
  displayReviewForm: boolean = false;

  /* Whether the patron has asked to see the reviews past the initial few */
  @state()
  private showAllReviews: boolean = false;

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

  /* The reviews in the list, not counting the patron's own */
  @queryAll('.reviews-list > ia-review')
  private listedReviews?: NodeListOf<IAReview>;

  render() {
    if (this.reviewsDisabled) return this.reviewsDisabledTemplate;
    if (this.reviewsCount === 0 && !this.displayReviewForm)
      return this.noReviewsMsgTemplate;

    return html`
      <div class="reviews-list">
        ${this.reviewsFrozen
          ? html`<div class="message">
              ${msg('Reviews can no longer be added to this item.')}
            </div>`
          : nothing}
        ${this.editableCurrentReviewTemplate}
        ${this.visibleReviews.map((review) => this.renderReview(review))}
        ${this.showMoreButtonTemplate}
      </div>
    `;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (
      !this.activeReviewService ||
      changed.has('reviewService') ||
      changed.has('baseHost')
    ) {
      // the fallback keeps rendering and the form working for a consumer that supplies no
      // service; it carries no CSRF token, so a submission through it fails
      this.activeReviewService =
        this.reviewService ?? new ReviewService({ baseHost: this.baseHost });
    }

    if (changed.has('reviews') || changed.has('submitterItemname')) {
      this.reviewsCount = this.reviews.length;
      this.sortFilterReviews();
    }

    if (changed.has('displayReviewForm') && this.displayReviewForm === true) {
      if (!this.bypassRecaptcha && !this.recaptchaActivated)
        this.recaptchaActivated = true;
    }
  }

  /* The reviews to render, capped at maxInitialReviews until the patron asks for more */
  private get visibleReviews(): Review[] {
    if (this.showAllReviews || this.displayReviewsByDefault)
      return this.filteredReviews;

    return this.filteredReviews.slice(0, this.maxInitialReviews);
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
          <ia-button
            mode="link"
            class="no-reviews-btn"
            @click=${this.addEditReview}
          >
            write a review</ia-button
          >.
        `)}
      </div>
    `;
  }

  /* Button that reveals the reviews past the initial few */
  private get showMoreButtonTemplate(): HTMLTemplateResult | typeof nothing {
    const hiddenCount =
      this.filteredReviews.length - this.visibleReviews.length;
    if (hiddenCount <= 0) return nothing;

    return html`
      <ia-button
        mode="link"
        class="show-more-btn"
        @click=${this.showMoreReviews}
      >
        ${hiddenCount === 1
          ? msg('Show 1 more review')
          : msg(str`Show ${hiddenCount} more reviews`)}
      </ia-button>
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
            .submitterItemname=${this.submitterItemname}
            .submitterScreenname=${this.submitterScreenname}
            .maxSubjectLength=${this.maxSubjectLength}
            .maxBodyLength=${this.maxBodyLength}
            .unrecoverableError=${this.reviewSubmissionError}
            .reviewService=${this.activeReviewService}
            .recaptchaManager=${this.recaptchaActivated
              ? this.recaptchaManager
              : undefined}
            ?bypassRecaptcha=${this.bypassRecaptcha}
            @reviewUpdated=${this.handleReviewUpdate}
            @reviewEditCanceled=${this.handleEditCanceled}
          ></ia-review-form>`}
    </div>`;
  }

  /**
   * Sorts the reviews and splits the patron's own review out of the reviews array.
   * Only their first review is kept; any others they have are dropped from the list.
   */
  private sortFilterReviews(): void {
    let patronsOwnReview: Review | undefined;
    const filteredReviews: Review[] = [];

    this.reviews.forEach((review) => {
      if (review.reviewer_itemname !== this.submitterItemname) {
        filteredReviews.push(review);
      } else if (!patronsOwnReview) {
        patronsOwnReview = review;
      }
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
      .reviewService=${this.activeReviewService}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`;
  }

  /** Reveals the rest of the reviews */
  private async showMoreReviews(): Promise<void> {
    const firstRevealedIndex = this.visibleReviews.length;
    this.showAllReviews = true;
    await this.updateComplete;

    // The button that was clicked is gone, so focus would otherwise fall back to the page.
    // ia-review moves focus inside itself rather than making its host focusable, since a shadow
    // host with a negative tabindex drops everything inside it from the tab order.
    const firstRevealed = this.listedReviews?.[firstRevealedIndex];
    await firstRevealed?.updateComplete;
    firstRevealed?.focus();
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
  }

  static get styles(): CSSResultGroup {
    return [
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

        .message ia-button {
          display: inline;
          vertical-align: baseline;
        }

        /* The button inside ia-button is a flex box, which would break these
           out of the sentence they sit in. */
        .message ia-button::part(button) {
          display: inline;
          min-height: 0;
          padding: 0;
          font-weight: 600;
        }

        /* Keeps the click target to the text, rather than the full width of the list */
        .show-more-btn {
          align-self: flex-start;
        }

        .show-more-btn::part(button) {
          font-weight: 600;
        }
      `,
    ];
  }
}
