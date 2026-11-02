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

  describe('trackPageView visitor', () => {
    beforeEach(() => {
      window.localStorage.removeItem('ia-first-visit');
    });

    it('sends visitor=new on the first pageview', () => {
      const manager = new MockAnalyticsManager();
      new AnalyticsHelpers(manager).trackPageView();
      expect(manager.sendPingValues?.visitor).to.equal('new');
    });

    it('sends visitor=returning when the first visit was an earlier day', () => {
      window.localStorage.setItem('ia-first-visit', '2000-01-01');
      const manager = new MockAnalyticsManager();
      new AnalyticsHelpers(manager).trackPageView();
      expect(manager.sendPingValues?.visitor).to.equal('returning');
    });

    it('sends no visitor field when storage throws', () => {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new DOMException('blocked', 'SecurityError');
      });
      const manager = new MockAnalyticsManager();
      new AnalyticsHelpers(manager).trackPageView();
      expect(manager.sendPingValues).to.not.have.property('visitor');
      expect(manager.sendPingValues?.locale).to.equal(navigator.language);
    });
  });
});
