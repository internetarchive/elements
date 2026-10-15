import type { FeatureFeedbackServiceInterface } from '../feature-feedback-service';
import type { IASurveyQuestionResponse, Result, Vote } from '../models';

export class MockFeatureFeedbackService
  implements FeatureFeedbackServiceInterface
{
  submissionOptions?: {
    featureIdentifier: string;
    vote: Vote;
    comments?: string | undefined;
    recaptchaToken: string;
  };

  surveySubmissionOptions?: {
    surveyIdentifier: string;
    responses: IASurveyQuestionResponse[];
    recaptchaToken: string;
  };

  private options?: {
    delay?: number;
    returnValue?: Result<boolean, Error>;
  };

  constructor(options?: {
    delay?: number;
    returnValue?: Result<boolean, Error>;
  }) {
    this.options = options;
  }

  async submitFeedback(options: {
    featureIdentifier: string;
    vote: Vote;
    comments?: string | undefined;
    recaptchaToken: string;
  }): Promise<Result<boolean, Error>> {
    this.submissionOptions = options;
    if (this.options?.delay) await this.wait(this.options.delay);
    return this.options?.returnValue ?? { success: true };
  }

  async submitSurvey(options: {
    surveyIdentifier: string;
    responses: IASurveyQuestionResponse[];
    recaptchaToken: string;
  }): Promise<Result<boolean, Error>> {
    this.surveySubmissionOptions = options;
    if (this.options?.delay) await this.wait(this.options.delay);
    return this.options?.returnValue ?? { success: true };
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
