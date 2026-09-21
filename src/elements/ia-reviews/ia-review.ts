import {
  html,
  css,
  LitElement,
  nothing,
  HTMLTemplateResult,
  CSSResultGroup,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { msg } from '@lit/localize';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { Review } from '@internetarchive/metadata-service';

import starBasic from './assets/star-basic';
import { truncateScreenname } from './utils/truncate-screenname';
import sanitizeReviewBody from './utils/sanitize-review-body';
import friendlyTruncate from './utils/friendly-truncate';
import linkUrlsInText from './utils/link-urls-in-text';
import collapseSpace from './utils/collapse-space';

import deleteIcon from './assets/delete-icon';

/**
 * Renders a single IA review
 */
@customElement('ia-review')
export class IAReview extends LitElement {
  /* The review to be rendered */
  @property({ type: Object }) review?: Review;

  /* The identifier for the item being reviewed */
  @property({ type: String }) identifier?: string;

  /* Maximum renderable length for subject */
  @property({ type: Number }) maxSubjectLength = 100;

  /* Maximum renderable length for body */
  @property({ type: Number }) maxBodyLength = 150;

  /* Base for URLs */
  @property({ type: String }) baseHost = 'https://archive.org';

  /* CSRF token to use for delete request submission */
  @property({ type: String }) csrfToken: string = '';

  /* Whether the person viewing this review has the power to delete it */
  @property({ type: Boolean }) canDelete = false;

  /* Whether we should skip the truncation step for the subject/body */
  @property({ type: Boolean }) bypassTruncation = false;

  /* Whether to show truncated review title / body */
  @state()
  private showTruncatedContent: boolean = false;

  /* An optional message created following attempted review deletion */
  @state()
  private deleteMsg: string = '';

  render() {
    return !this.review
      ? html`
          <div class="error">
            ${msg('This review cannot be displayed at this time.')}
          </div>
        `
      : html`
          <article class="review" id=${this.generateDomId()}>
            ${this.canDelete
              ? html`
                  <button
                    class="delete-btn"
                    title="Delete this review"
                    @click=${this.deleteReview}
                  >
                    ${deleteIcon}
                  </button>
                `
              : nothing}
            <div class="top-line">
              <b>${msg('Reviewer:')}</b> ${this.reviewerTemplate} -
              ${this.starsTemplate}${this.createDateTemplate}
            </div>
            <div class="subject">
              <b>${msg('Subject: ')}</b>${this.subjectTemplate}
            </div>
            <div class="body">
              ${!this.deleteMsg
                ? this.bodyTemplate
                : html`<i>${msg(this.deleteMsg)}</i>`}
            </div>
            ${this.truncationButtonsTemplate}
          </article>
        `;
  }

  /* Renders the review subject, truncating if necessary */
  private get subjectTemplate(): string {
    const subject = this.review?.reviewtitle;

    return this.truncateContent(subject ?? '', this.maxSubjectLength);
  }

  /* Renders the review body, truncating if necessary */
  private get bodyTemplate(): HTMLTemplateResult | typeof nothing {
    const body = this.review?.reviewbody;
    if (!body) return nothing;

    const sanitizedReview = sanitizeReviewBody(body);
    const truncatedReview = this.truncateContent(
      sanitizedReview,
      this.maxBodyLength,
    );

    return html`${unsafeHTML(this.prepReview(truncatedReview))}`;
  }

  /* Renders the More/Less button if review is truncated */
  private get truncationButtonsTemplate(): HTMLTemplateResult | typeof nothing {
    if (this.bypassTruncation) return nothing;

    const noTruncationNeeded =
      (this.review?.reviewtitle?.length ?? 0) <= this.maxSubjectLength &&
      (this.review?.reviewbody?.length ?? 0) <= this.maxBodyLength;

    if (noTruncationNeeded) return nothing;

    return this.showTruncatedContent
      ? this.lessButtonTemplate
      : this.moreButtonTemplate;
  }

  /* More button for truncation */
  private get moreButtonTemplate(): HTMLTemplateResult {
    return html`
      <button
        class="simple-link more-btn"
        @click=${() => (this.showTruncatedContent = true)}
      >
        ${msg('More...')}
      </button>
    `;
  }

  /* Less button for truncation */
  private get lessButtonTemplate(): HTMLTemplateResult {
    return html`<button
      class="simple-link less-btn"
      @click=${() => (this.showTruncatedContent = false)}
    >
      ${msg('...Less')}
    </button>`;
  }

  /* Reviewer name, with hyperlink and truncation if needed */
  private get reviewerTemplate(): HTMLTemplateResult | typeof nothing {
    return !this.review
      ? nothing
      : this.review.reviewer_itemname
        ? html`
            <a
              href="${this.baseHost}/details/${this.review.reviewer_itemname}"
              class="reviewer-link simple-link"
              data-event-click-tracking="ItemReviews|ReviewerLink"
            >
              ${truncateScreenname(this.review.reviewer)}
            </a>
          `
        : html`${truncateScreenname(this.review.reviewer)}`;
  }

  /* Number of stars that corresponds to patron's rating */
  private get starsTemplate(): HTMLTemplateResult | typeof nothing {
    if (!this.review || !this.review.stars) return nothing;
    return html`
      <div
        class="review-stars"
        title="${msg(`${this.review.stars} out of 5 stars`)}"
      >
        ${new Array(Number(this.review.stars))
          .fill(null)
          .map(() => html`<div class="review-star">${starBasic}</div>`)}
      </div>
      -
    `;
  }

  /* Formats the review's date for render, adding (edited) if needed */
  private get createDateTemplate(): string | typeof nothing {
    if (!this.review?.createdate || !this.review?.reviewdate) return nothing;

    const reviewDate = new Date(this.review.reviewdate);
    const createDate = new Date(this.review.createdate);

    const prettyDate = createDate.toLocaleString('en-us', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const editedMsg =
      reviewDate.getTime() !== createDate.getTime() ? '(edited)' : '';

    return msg(`${prettyDate} ${editedMsg}`);
  }

  /**
   * Generates a unique ID for the review, using its createdate.
   *
   * @returns {string} The ID to render
   */
  private generateDomId(): string {
    if (!this.review?.createdate) return '';

    return `review-${Date.parse(this.review.createdate.toString())}`;
  }

  /** Truncates the review subject/body if needed */
  private truncateContent(original: string, maxLength: number): string {
    if (this.showTruncatedContent || this.bypassTruncation) return original;

    return friendlyTruncate(original, maxLength);
  }

  /**
   * Uses a set of utils in sequence to prepare a review for render,
   * including transforming inline links into anchor links
   * and collapsing internal spaces.
   *
   * @param {string} review The review to be prepped
   * @returns {string} The review prepped for render
   */
  private prepReview(review: string): string {
    return collapseSpace(linkUrlsInText(review));
  }

  /**
   * Deletes the review, following an extra confirmation.
   */
  private async deleteReview(): Promise<void> {
    if (!this.review || !this.identifier) return;
    if (!confirm(msg('Are you sure you want to delete this review?'))) return;

    // Screennames can contain spaces and ampersands, so the parameters are
    // encoded rather than interpolated straight into the query string.
    const params = new URLSearchParams({
      identifier: this.identifier,
      deleteReviewer: this.review.reviewer ?? '',
      deleteReviewerItemname: this.review.reviewer_itemname ?? '',
      csrf_token: this.csrfToken,
    });
    const deleteUrl = `${this.baseHost}/edit-reviews.php?${params}`;
    try {
      const response = await fetch(deleteUrl, {
        method: 'POST',
      });
      // fetch only rejects on a network error, so a 4xx or 5xx arrives here as
      // a resolved response and has to be checked before reporting success.
      if (!response.ok) throw new Error(`Delete failed: ${response.status}`);

      this.deleteMsg = 'This review has been queued for deletion.';
    } catch {
      this.deleteMsg = 'Sorry, we were unable to delete this review.';
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        font-family: var(
          --ia-font-stack,
          'Helvetica Neue',
          Helvetica,
          Arial,
          sans-serif
        );

        font-size: inherit;
        --container-bg-color: #fbfbfd;
        --container-border-color: #999999;
      }

      .review {
        position: relative;
        padding-right: 30px;
      }

      .error {
        color: var(--error-color, #cc0000);
      }

      .top-line {
        margin-bottom: 0.5rem;
      }

      .top-line > * {
        display: inline-block;
      }

      .review-star {
        width: 1rem;
        display: inline-block;
      }

      .simple-link,
      .body a {
        color: var(--link-color, #4b64ff);
        text-decoration: none;
        background: transparent;
        border: none;
        padding: 0px;
      }

      .simple-link:hover,
      .body a:hover {
        cursor: pointer;
        text-decoration: underline;
      }

      .subject {
        margin-bottom: 0.5rem;
      }

      .delete-btn {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        background: none;
        border: 0;
      }

      .delete-btn:hover {
        cursor: pointer;
      }

      .delete-icon {
        width: 20px;
        mix-blend-mode: multiply;
      }
    `;
  }
}
