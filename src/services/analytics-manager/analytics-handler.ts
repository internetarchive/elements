import {
  AnalyticsManager,
  AnalyticsManagerInterface,
  AnalyticsEvent,
} from './analytics-manager';
import {
  AnalyticsHelpers,
  AnalyticsHelperInterface,
} from './analytics-helpers';

export interface AnalyticsHandlerInterface {
  /**
   * A general purpose analytics ping that takes arbitrary key-value pairs
   * and pings the analytics endpoint
   *
   * @param {Record<string, any>} values
   */
  sendPing(values: Record<string, any>): void;

  /**
   * Send a sampled event
   *
   * @param {options} AnalyticsEvent
   */
  sendEvent(options: AnalyticsEvent): void;

  /** @deprecated use sendEvent instead */
  send_event(
    category: string,
    action: string,
    label?: string,
    additionalEventParams?: object,
  ): void;

  /**
   * Send an unsampled event.
   *
   * **NOTE** Use sparingly as it can generate a lot of events
   * and deplete our event budget.
   *
   * @param {options} AnalyticsEvent
   */
  sendEventNoSampling(options: AnalyticsEvent): void;

  /**
   * Handles tracking events passed in via `iax` query parameter.
   *
   * Format is `?iax=Category|Action|Label` // Label is optional
   * eg `?iax=EmailCampaign|RedButtonClicked`
   * NOTE: Uses the unsampled analytics property. Watch out for future high click links!
   *
   * @param {string}
   */
  trackIaxParameter(location: string): void;

  /**
   * Tracks a page view
   *
   * Appends several environmental values like
   * locale, timezone, referrer, and others.
   *
   * @param {{
   *     mediaType?: string;
   *     mediaLanguage?: string;
   *     primaryCollection?: string;
   *     page?: string;
   *   }} [options]
   * @memberof AnalyticsHelperInterface
   */

  trackPageView(options?: {
    mediaType?: string;
    mediaLanguage?: string;
    primaryCollection?: string;
    page?: string;
  }): void;
}

export class AnalyticsHandler implements AnalyticsHandlerInterface {
  private analyticsBackend?: AnalyticsManagerInterface;

  private analyticsHelpers?: AnalyticsHelperInterface;

  constructor(options: { enableAnalytics: boolean }) {
    if (!options.enableAnalytics) return;
    this.analyticsBackend = new AnalyticsManager();
    this.analyticsHelpers = new AnalyticsHelpers(this.analyticsBackend);
  }

  /** @inheritdoc */
  sendPing(values: Record<string, any>): void {
    this.analyticsBackend?.sendPing(values);
  }

  /** @inheritdoc */
  sendEvent(options: AnalyticsEvent): void {
    this.analyticsBackend?.sendEvent(options);
  }

  /** @inheritdoc */
  send_event(
    category: string,
    action: string,
    label?: string,
    additionalEventParams?: object,
  ): void {
    this.sendEvent({
      category,
      action,
      label,
      eventConfiguration: additionalEventParams,
    });
  }

  /** @inheritdoc */
  sendEventNoSampling(options: AnalyticsEvent): void {
    this.analyticsBackend?.sendEventNoSampling(options);
  }

  /** @inheritdoc */
  trackIaxParameter(location: string): void {
    this.analyticsHelpers?.trackIaxParameter(location);
  }

  /** @inheritdoc */
  trackPageView(options?: {
    mediaType?: string;
    mediaLanguage?: string;
    primaryCollection?: string;
    page?: string;
  }): void {
    this.analyticsHelpers?.trackPageView(options);
  }
}
