import type {
  ReviewDeletion,
  ReviewServiceInterface,
  ReviewServiceResult,
  ReviewSubmission,
} from '../models';

export class MockReviewService implements ReviewServiceInterface {
  /** Submissions the form handed over, in order */
  submissions: ReviewSubmission[] = [];

  /** Deletions the review handed over, in order */
  deletions: ReviewDeletion[] = [];

  /** What both operations report back */
  result: ReviewServiceResult = { success: true };

  async submitReview(
    submission: ReviewSubmission,
  ): Promise<ReviewServiceResult> {
    this.submissions.push(submission);
    return this.result;
  }

  async deleteReview(deletion: ReviewDeletion): Promise<ReviewServiceResult> {
    this.deletions.push(deletion);
    return this.result;
  }
}
