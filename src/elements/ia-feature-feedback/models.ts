export type Vote = 'up' | 'down';

export type FeatureFeedbackDisplayMode = 'button' | 'vote-prompt';

/**
 * An error to show in the feedback popup. The message text comes from this at
 * render time, so it follows the current locale.
 */
export type FeatureFeedbackError =
  | { kind: 'noVote' }
  | { kind: 'submitFailed'; detail?: string };

/**
 * An error to show in the survey popup. The message text comes from this at
 * render time, so it follows the current locale.
 */
export type SurveyError =
  | { kind: 'missingInput' }
  | { kind: 'submitFailed'; detail?: string };

/**
 * The current state of a survey submission:
 *  - `idle`: No submit has succeeded or been attempted since the popup was last toggled.
 *  - `processing`: The widget is currently submitting a response.
 *  - `submitted`: The widget has successfully submitted a response.
 *  - `error`: The widget encountered an error while submitting its last response,
 *    and the popup has not yet been closed.
 */
export type SurveySubmissionState =
  | 'idle'
  | 'processing'
  | 'submitted'
  | 'error';

/**
 * The user's response to a survey question
 */
export type IASurveyQuestionResponse = {
  /**
   * A string identifying the survey question (e.g., the prompt that was responded to).
   */
  name: string;

  /**
   * (Optiona) A rating response to a survey question, which may be a binary up/down or
   * some other variety of quantifiable feedback.
   */
  rating?: string;

  /**
   * (Optional) A freeform text comment response to a survey question.
   */
  comment?: string;
};

/**
 * Defines the shape that question components must conform to in order to
 * successfully take part in the ia-feature-feedback-survey flow.
 *
 * Additionally, if `numbered` is true, the component must contain a `<slot>`
 * named `question-number` in order to receive the appropriate number for its
 * position in the survey. If no such slot is found, the question's number
 * will not be displayed (but will still count in the overall number order).
 */
export interface IASurveyQuestionInterface {
  /**
   * Whether this question should be disabled and not accept user input.
   */
  disabled: boolean;

  /**
   * Whether this question is visible to the user.
   */
  readonly visible: boolean;

  /**
   * Whether this question should participate in question numbering.
   * If false, it will be skipped entirely in the number order.
   */
  readonly numbered: boolean;

  /**
   * The user's current survey response for this question.
   */
  readonly response: IASurveyQuestionResponse;

  /**
   * Validates the response value of this question, returning a boolean indicating
   * whether it is valid to submit. Depending on the component, this may also set
   * the component's form validity state and update its styling accordingly.
   */
  validate(): boolean;
}

/**
 * Type guard to check whether an HTML element has a boolean `disabled` property.
 */
export function canBeDisabled(
  elmt: HTMLElement,
): elmt is HTMLElement & { disabled: boolean } {
  return 'disabled' in elmt && typeof elmt.disabled === 'boolean';
}

/**
 * Type guard to check whether an HTML element has a boolean `numbered` property.
 */
export function canBeNumbered(
  elmt: HTMLElement,
): elmt is HTMLElement & { numbered: boolean } {
  return 'numbered' in elmt && typeof elmt.numbered === 'boolean';
}

/**
 * Type guard to check whether an HTML element has a `validate` function.
 */
export function canBeValidated(
  elmt: HTMLElement,
): elmt is HTMLElement & { validate: () => boolean } {
  return 'validate' in elmt && typeof elmt.validate === 'function';
}

/**
 * Type guard to check whether an HTML element has a `response` property that
 * conforms to the `IASurveyQuestionResponse` interface.
 */
export function hasSurveyResponse(
  elmt: HTMLElement,
): elmt is HTMLElement & { response: IASurveyQuestionResponse } {
  const hasValidResponseProp =
    'response' in elmt &&
    typeof elmt.response === 'object' &&
    elmt.response !== null &&
    'name' in elmt.response &&
    typeof elmt.response.name === 'string';

  return hasValidResponseProp;
}

/**
 * The outcome of an operation: `success` holds the result when it worked and
 * `error` holds the failure when it didn't.
 */
export interface Result<T, E extends Error> {
  success?: T;
  error?: E;
}
