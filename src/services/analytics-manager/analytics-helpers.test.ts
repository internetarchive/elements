import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type {
  AnalyticsEvent,
  AnalyticsManagerInterface,
} from './analytics-manager';
import { AnalyticsHelpers } from './analytics-helpers';

export class MockAnalyticsManager implements AnalyticsManagerInterface {
  sendPingValues?: Record<string, any>;

  sendEventOptions?: AnalyticsEvent;

  sendEventNoSamplingOptions?: AnalyticsEvent;

  sendPing(values: Record<string, any>): void {
    this.sendPingValues = values;
  }

  sendEvent(options: AnalyticsEvent): void {
    this.sendEventOptions = options;
  }

  sendEventNoSampling(options: AnalyticsEvent): void {
    this.sendEventNoSamplingOptions = options;
  }
}

describe('AnalyticsHelper', () => {
  beforeEach(() => {
    vi.spyOn(window.navigator, 'sendBeacon').mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('tracks the iax parameter', () => {
    const manager = new MockAnalyticsManager();
    const helper = new AnalyticsHelpers(manager);
    helper.trackIaxParameter('http://foo.org/?iax=foo|bar');
    expect(manager.sendEventNoSamplingOptions).to.deep.equal({
      category: 'foo',
      action: 'bar',
      label: undefined,
    });
  });
});
