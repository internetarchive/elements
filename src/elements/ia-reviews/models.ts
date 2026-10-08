/** A review the patron is submitting, before it's mapped onto wire field names */
export type ReviewSubmission = {
  /** The IA item being reviewed */
  identifier: string;

  /** Review subject */
  title: string;

  /** Review body */
  body: string;

  /** Star rating, '0' for no rating */
  stars?: string;

  /** ReCaptcha response, when the form ran a challenge */
  recaptchaToken?: string;
};

/** The review to remove, identified by its reviewer */
export type ReviewDeletion = {
  /** The IA item the review belongs to */
  identifier: string;

  /** Reviewer screenname */
  reviewer: string;

  /** Reviewer itemname, used when the reviewer's account is gone */
  reviewerItemname?: string;
};

/** The outcome of a review write or delete */
export type ReviewServiceResult = {
  success: boolean;

  /** A message to show the patron, present when success is false */
  error?: string;
};

/**
 * Handles the network side of reviews, so the components only render state.
 */
export interface ReviewServiceInterface {
  /** Add or update the patron's own review of an item */
  submitReview(submission: ReviewSubmission): Promise<ReviewServiceResult>;

  /** Remove a review, which the backend allows only for review moderators */
  deleteReview(deletion: ReviewDeletion): Promise<ReviewServiceResult>;
}
