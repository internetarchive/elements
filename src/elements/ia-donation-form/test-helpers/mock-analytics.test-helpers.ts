import type {
  AnalyticsEvent,
  AnalyticsManagerInterface,
} from '@internetarchive/analytics-manager';

import type { DonationEventLoggerInterface } from '../analytics';

/** Keeps the last event of each kind so tests can read it back. */
export class MockAnalyticsManager implements AnalyticsManagerInterface {
  sendPingValues?: Record<string, unknown>;
  sendEventOptions?: AnalyticsEvent;
  sendEventNoSamplingOptions?: AnalyticsEvent;
  events: AnalyticsEvent[] = [];

  sendPing(values: Record<string, unknown>): void {
    this.sendPingValues = values;
  }

  sendEvent(options: AnalyticsEvent): void {
    this.sendEventOptions = options;
    this.events.push(options);
  }

  sendEventNoSampling(options: AnalyticsEvent): void {
    this.sendEventNoSamplingOptions = options;
    this.events.push(options);
  }
}

/** Records every logged event as `[action, label]`. */
export class MockDonationEventLogger implements DonationEventLoggerInterface {
  events: [string, string | undefined][] = [];
  flowEvents: [string, string | undefined][] = [];

  logEvent(action: string, label?: string): void {
    this.events.push([action, label]);
  }

  logDonationFlowEvent(action: string, label?: string): void {
    this.flowEvents.push([action, label]);
  }
}
