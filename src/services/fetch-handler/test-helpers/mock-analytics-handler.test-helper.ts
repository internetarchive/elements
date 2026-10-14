import type { AnalyticsEvent } from '../../analytics-manager/analytics-manager';
import type { AnalyticsHandlerInterface } from '../../analytics-manager/analytics-handler';

export type MockAnalyticsEvent = AnalyticsEvent & {
  bucketType: '1%' | '100%';
  additionalEventParams?: object;
};
export class MockAnalyticsHandler implements AnalyticsHandlerInterface {
  events: MockAnalyticsEvent[] = [];

  sendPing(_values: Record<string, any>): void {}
  sendEvent(event: MockAnalyticsEvent): void {
    const thisEvent = Object.assign({}, event, { bucketType: '1%' });
    this.events.push(thisEvent);
  }
  send_event(
    category: string,
    action: string,
    label?: string,
    additionalEventParams?: object,
  ): void {
    this.events.push({
      category,
      action,
      label,
      bucketType: '1%',
      additionalEventParams: { ...additionalEventParams },
    });
  }
  sendEventNoSampling(event: AnalyticsEvent): void {
    this.events.push({
      ...event,
      bucketType: '100%',
    } as unknown as MockAnalyticsEvent);
  }
  trackIaxParameter(_location: string): void {}
  trackPageView(_options?: {
    mediaType?: string;
    mediaLanguage?: string;
    primaryCollection?: string;
    page?: string;
  }): void {}
}
