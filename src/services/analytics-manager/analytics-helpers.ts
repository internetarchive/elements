import type { AnalyticsManagerInterface } from './analytics-manager';

export interface AnalyticsHelperInterface {
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

export class AnalyticsHelpers implements AnalyticsHelperInterface {
  private analyticsManager: AnalyticsManagerInterface;

  constructor(analyticsManager: AnalyticsManagerInterface) {
    this.analyticsManager = analyticsManager;
  }

  /** @inheritdoc */
  trackIaxParameter(location: string) {
    const url = new URL(location);
    const iaxParam = url.searchParams.get('iax');
    if (!iaxParam) return;
    const eventValues = iaxParam.split('|');
    const actionValue = eventValues.length >= 1 ? eventValues[1] : '';
    const labelValue = eventValues.length >= 2 ? eventValues[2] : '';

    this.analyticsManager.sendEventNoSampling({
      category: eventValues[0],
      action: actionValue,
      label: labelValue,
    });
  }

  /** @inheritdoc */
  trackPageView(options?: {
    mediaType?: string;
    mediaLanguage?: string;
    primaryCollection?: string;
    page?: string;
  }) {
    const event: Record<string, any> = {};

    event.kind = 'pageview';
    event.timediff = (new Date().getTimezoneOffset() / 60) * -1; // *timezone* diff from UTC
    event.locale = navigator.language;
    event.referrer = document.referrer === '' ? '-' : document.referrer;

    const { domInteractive, defaultFontSize } = this;
    if (domInteractive) {
      event.loadtime = domInteractive; // loadtime is the historical name for this event
    }
    if (defaultFontSize) {
      event.iaprop_fontSize = defaultFontSize;
    }

    if ('devicePixelRatio' in window) {
      event.iaprop_devicePixelRatio = window.devicePixelRatio;
    }

    if (options?.mediaType) {
      event.iaprop_mediaType = options.mediaType;
    }

    if (options?.mediaLanguage) {
      event.iaprop_mediaLanguage = options.mediaLanguage;
    }

    if (options?.primaryCollection) {
      event.iaprop_primaryCollection = options.primaryCollection;
    }

    if (options?.page) {
      event.page = options.page;
    }

    this.analyticsManager.sendPing(event);
  }

  /**
   * Computes the default font size of the browser.
   *
   * @returns {String|null} computed font-size with units (typically pixels)
   */
  private get defaultFontSize(): string | null {
    const style = window.getComputedStyle(document.documentElement);
    if (!style) return null;

    const fontSizeString = style.fontSize;
    // the 1.6 multiplier offsets the 10px base font size (62.5% in bootstrap)
    const fontSizeNumber = parseFloat(fontSizeString) * 1.6;
    const unit = fontSizeString.replace(/(\d*\.\d+)|\d+/, '');
    return `${fontSizeNumber}${unit}`;
  }

  /**
   * Gets the time until DOM Interactive from the performance API
   *
   * Not supported in Safari or IE
   *
   * @readonly
   * @private
   * @type {(number | undefined)}
   * @memberof AnalyticsHelpers
   */
  private get domInteractive(): number | undefined {
    if (!window.performance || !window.performance.getEntriesByType)
      return undefined;
    const performanceEntries = window.performance.getEntriesByType(
      'navigation',
    ) as PerformanceNavigationTiming[];
    if (performanceEntries.length === 0) return undefined;
    const entry = performanceEntries[0];
    return entry.domInteractive;
  }
}
