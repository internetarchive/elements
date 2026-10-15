import { msg } from '@lit/localize';
import { IaFetchHandler } from '@internetarchive/fetch-handler';
import type { FetchHandlerInterface } from '@internetarchive/fetch-handler';

import type {
  ReviewDeletion,
  ReviewServiceInterface,
  ReviewServiceResult,
  ReviewSubmission,
} from './models';

export type ReviewServiceOptions = {
  /**
   * Handles retries and the CSRF token.
   *
   * Writing and deleting need a handler built with a `getCsrfToken` source, since that is what
   * supplies the `X-CSRF-Token` header these endpoints require. The token resolves per request,
   * so it doesn't have to be known when the service is constructed.
   */
  fetchHandler?: FetchHandlerInterface;

  /** Origin for the endpoints. Empty string keeps requests same-origin. */
  baseHost?: string;

  /** Path a review submission POSTs to */
  submitPath?: string;

  /** Path a review deletion goes to */
  deletePath?: string;

  /** Verb the delete endpoint expects */
  deleteMethod?: 'POST' | 'DELETE';
};

/** The endpoints the legacy details page serves */
const LEGACY_SUBMIT_PATH = '/write-review.php';
const LEGACY_DELETE_PATH = '/edit-reviews.php';

/**
 * Talks to the archive.org review endpoints.
 *
 * The CSRF token is left to the fetch handler: both operations opt into its automatic
 * `X-CSRF-Token` header, which resolves the token per request.
 */
export class ReviewService implements ReviewServiceInterface {
  private fetchHandler: FetchHandlerInterface;

  private baseHost: string;

  private submitPath: string;

  private deletePath: string;

  private deleteMethod: 'POST' | 'DELETE';

  constructor(options?: ReviewServiceOptions) {
    this.fetchHandler = options?.fetchHandler ?? new IaFetchHandler();
    this.baseHost = options?.baseHost ?? 'https://archive.org';
    this.submitPath = options?.submitPath ?? LEGACY_SUBMIT_PATH;
    this.deletePath = options?.deletePath ?? LEGACY_DELETE_PATH;
    this.deleteMethod = options?.deleteMethod ?? 'POST';
  }

  /** @inheritdoc */
  async submitReview(
    submission: ReviewSubmission,
  ): Promise<ReviewServiceResult> {
    const body = new URLSearchParams();
    body.append('identifier', submission.identifier);
    body.append('field_reviewtitle', submission.title);
    body.append('field_reviewbody', submission.body);
    body.append('field_stars', submission.stars ?? '0');

    if (submission.recaptchaToken) {
      body.append('g-recaptcha-response', submission.recaptchaToken);
    }

    // tells write-review.php the post came from the form rather than a direct visit
    body.append('submitter', 'review-form');

    return this.request(`${this.baseHost}${this.submitPath}`, {
      method: 'POST',
      body,
    });
  }

  /** @inheritdoc */
  async deleteReview(deletion: ReviewDeletion): Promise<ReviewServiceResult> {
    // Screennames can contain spaces and ampersands, so the parameters are
    // encoded rather than interpolated straight into the query string.
    const params = new URLSearchParams();
    params.append('identifier', deletion.identifier);
    params.append('deleteReviewer', deletion.reviewer);
    if (deletion.reviewerItemname) {
      params.append('deleteReviewerItemname', deletion.reviewerItemname);
    }

    const url = `${this.baseHost}${this.deletePath}?${params.toString()}`;

    return this.request(url, { method: this.deleteMethod });
  }

  /**
   * Sends a credentialed request and reads the `{ success, error }` result out of it.
   */
  private async request(
    url: string,
    init: { method: string; body?: BodyInit },
  ): Promise<ReviewServiceResult> {
    try {
      const response = await this.fetchHandler.fetch(url, {
        requestInit: {
          method: init.method,
          body: init.body,
          credentials: 'include',
        },
        includeCsrfToken: true,
      });

      return await this.parseResult(response);
    } catch (e) {
      console.error('Review request failed', e);
      return { success: false, error: this.genericError };
    }
  }

  /**
   * Reads a result out of a response.
   *
   * The status decides the outcome, so a rejected request can't read as a success. fetch
   * resolves on a 4xx or 5xx, so that check can't be left to the catch. A JSON body supplies
   * the patron-facing message; the legacy delete endpoint answers with an HTML page instead,
   * and there the status is all there is to go on.
   */
  private async parseResult(response: Response): Promise<ReviewServiceResult> {
    let payload: ReviewServiceResult | undefined;
    try {
      payload = (await response.json()) as ReviewServiceResult;
    } catch {
      payload = undefined;
    }

    if (!response.ok) {
      return { success: false, error: payload?.error ?? this.genericError };
    }

    if (!payload || payload.success) return { success: true };

    return { success: false, error: payload.error ?? this.genericError };
  }

  private get genericError(): string {
    return msg('Sorry, something went wrong. Please try again later.');
  }
}
