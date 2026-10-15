import { IaFetchHandler } from '@internetarchive/fetch-handler';
import type { FetchHandlerInterface } from '@internetarchive/fetch-handler';

import type {
  ReviewDeletion,
  ReviewServiceInterface,
  ReviewServiceResult,
  ReviewSubmission,
} from './models';

/** The deprecated `token`, `endpointPath` and `fetchHandler` props, plus `baseHost` */
export type LegacyReviewProps = {
  token?: string;
  endpointPath?: string;
  fetchHandler?: FetchHandlerInterface;
  baseHost: string;
};

/** Whether any of the deprecated props were given */
export function hasLegacyProps(props: LegacyReviewProps): boolean {
  return !!(props.token || props.endpointPath || props.fetchHandler);
}

/**
 * Review writes and deletes for a host that passes `token`, `endpointPath` and `fetchHandler`.
 *
 * The requests carry the CSRF token the way the backend's review endpoints read it today: a
 * `field_reviewtoken` form field on a submission and a `csrf_token` query parameter on a
 * delete. No `X-CSRF-Token` header is sent, since a cross-origin `baseHost` would need to
 * allow-list it.
 */
class LegacyReviewService implements ReviewServiceInterface {
  private token: string;

  private submitUrl: string;

  private deleteUrl: string;

  private fetchHandler: FetchHandlerInterface;

  constructor(props: LegacyReviewProps) {
    this.token = props.token ?? '';
    this.submitUrl = `${props.baseHost}${props.endpointPath ?? '/write-review.php'}`;
    this.deleteUrl = `${props.baseHost}/edit-reviews.php`;
    this.fetchHandler = props.fetchHandler ?? new IaFetchHandler();
  }

  /** @inheritdoc */
  async submitReview(
    submission: ReviewSubmission,
  ): Promise<ReviewServiceResult> {
    const body = new URLSearchParams();
    if (submission.recaptchaToken) {
      body.append('g-recaptcha-response', submission.recaptchaToken);
    }
    body.append('field_stars', submission.stars ?? '0');
    body.append('field_reviewtitle', submission.title);
    body.append('field_reviewbody', submission.body);
    body.append('field_reviewtoken', this.token);
    if (submission.identifier) body.append('identifier', submission.identifier);
    body.append('submitter', 'review-form');

    try {
      const result = await this.fetchHandler.fetchApiResponse<{
        success?: boolean;
        error?: string;
      }>(this.submitUrl, {
        method: 'POST',
        includeCredentials: true,
        body,
      });

      if (result?.success === true) return { success: true };
      return { success: false, error: result?.error };
    } catch (e) {
      console.error('Review request failed', e);
      return { success: false };
    }
  }

  /** @inheritdoc */
  async deleteReview(deletion: ReviewDeletion): Promise<ReviewServiceResult> {
    const params = new URLSearchParams({
      identifier: deletion.identifier,
      deleteReviewer: deletion.reviewer,
      deleteReviewerItemname: deletion.reviewerItemname ?? '',
      csrf_token: this.token,
    });

    try {
      const response = await fetch(`${this.deleteUrl}?${params}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error(`Delete failed: ${response.status}`);
      return { success: true };
    } catch (e) {
      console.error('Review request failed', e);
      return { success: false };
    }
  }
}

/** Builds the service for a host still passing the deprecated props */
export function createLegacyReviewService(
  props: LegacyReviewProps,
): ReviewServiceInterface {
  return new LegacyReviewService(props);
}
