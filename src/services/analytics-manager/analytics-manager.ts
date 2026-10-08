export type AnalyticsEventConfig = {
  service?: string;
};

export type AnalyticsEvent = {
  /**
   * The event category, ie. "DonatePage"
   *
   * @type {string}
   */
  category: string;

  /**
   * The event action, ie. "LinkClicked"
   *
   * @type {string}
   */
  action: string;

  /**
   * The event label, used to add specificity to the action, ie "MoreInfoLink"
   *
   * Defaults to window.location.pathname if not provided
   *
   * @type {string}
   */
  label?: string;

  /**
   * Configuration for the event, such as `service`
   *
   * This does not get passed to Google Analytics.
   *
   * @type {AnalyticsEventConfig}
   */
  eventConfiguration?: AnalyticsEventConfig;
};

export interface AnalyticsManagerInterface {
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

  /**
   * Send an unsampled event.
   *
   * **NOTE** Use sparingly as it can generate a lot of events
   * and deplete our event budget.
   *
   * @param {options} AnalyticsEvent
   */
  sendEventNoSampling(options: AnalyticsEvent): void;
}

export class AnalyticsManager implements AnalyticsManagerInterface {
  private readonly ARCHIVE_ANALYTICS_VERSION = 2;

  private readonly DEFAULT_SERVICE = 'ao_2';

  /**
   * The service for sending events without sampling
   *
   * @private
   * @memberof ArchiveAnalytics
   */
  private readonly NO_SAMPLING_SERVICE = 'ao_no_sampling';

  private readonly DEFAULT_IMAGE_URL = 'https://athena.archive.org/0.gif';

  private defaultService: string;

  private imageUrl: string;

  private imageContainer: Node;

  /**
   * Force an image ping inistead of using the sendBeacon API
   *
   * Useful to test older browser support.
   *
   * @private
   * @type {boolean}
   * @memberof ArchiveAnalytics
   */
  private requireImagePing: boolean;

  /**
   * Creates an instance of AnalyticsManager.
   * @param {{
   *   service?: string;
   *   imageUrl?: string;
   *   imageContainer?: Node;
   *   requireImagePing?: boolean;
   * }} [options]
   * @memberof AnalyticsManager
   */
  constructor(options?: {
    defaultService?: string;
    imageUrl?: string;
    imageContainer?: Node;
    requireImagePing?: boolean;
  }) {
    this.defaultService = options?.defaultService ?? this.DEFAULT_SERVICE;
    this.imageUrl = options?.imageUrl ?? this.DEFAULT_IMAGE_URL;
    this.imageContainer = options?.imageContainer ?? document.body;
    this.requireImagePing = options?.requireImagePing ?? false;
  }

  /** @inheritdoc */
  sendPing(values?: Record<string, any>) {
    const url = this.generateTrackingUrl(values).toString();
    if (this.requireImagePing) {
      this.sendPingViaImage(url);
      return;
    }

    // `navigator` has to be bound to ensure it does not error in some browsers
    // https://xgwang.me/posts/you-may-not-know-beacon/#it-may-throw-error%2C-be-sure-to-catch
    const send = navigator.sendBeacon && navigator.sendBeacon.bind(navigator);

    try {
      // if `send` is `undefined` it'll throw and fall back to the image ping
      send!(url);
    } catch (err) {
      this.sendPingViaImage(url);
    }
  }

  /** @inheritdoc */
  sendEvent(options: AnalyticsEvent) {
    const label =
      options.label && options.label.trim().length > 0
        ? options.label
        : window.location.pathname;
    const eventParams = {
      kind: 'event',
      ec: options.category,
      ea: options.action,
      el: label,
      cache_bust: Math.random(),
      ...options.eventConfiguration,
    };
    this.sendPing(eventParams);
  }

  /** @inheritdoc */
  sendEventNoSampling(options: AnalyticsEvent): void {
    const eventConfig = options.eventConfiguration || {};
    eventConfig.service = this.NO_SAMPLING_SERVICE;
    const newOptions = options;
    newOptions.eventConfiguration = eventConfig;
    this.sendEvent(newOptions);
  }

  /**
   * Sends a ping via Image object
   * @param {string} url Image url
   */
  private sendPingViaImage(url: string) {
    const pingImage = new Image(1, 1);
    pingImage.src = url;
    pingImage.alt = '';
    this.imageContainer.appendChild(pingImage);
  }

  /**
   * Construct complete tracking URL containing payload
   * @param {Object} params Tracking parameters to pass
   * @return {String} URL to use for tracking call
   */
  private generateTrackingUrl(params?: Record<string, any>): URL {
    const outputParams = params ?? {};
    outputParams.service = outputParams.service ?? this.defaultService;
    const url = new URL(this.imageUrl);

    // Build array of querystring parameters
    const keys = Object.keys(outputParams);
    keys.forEach((key: string) => {
      const value = outputParams[key];
      url.searchParams.append(key, value);
    });
    url.searchParams.append('version', `${this.ARCHIVE_ANALYTICS_VERSION}`);
    url.searchParams.append('count', `${keys.length + 2}`);
    return url;
  }
}
