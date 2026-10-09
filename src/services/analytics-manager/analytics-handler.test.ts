import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MockInstance } from 'vitest';

import { AnalyticsHandler } from './analytics-handler';

describe('AnalyticsHandler', () => {
  let handler: AnalyticsHandler;
  let sendPingSpy: MockInstance;
  let sendEventSpy: MockInstance;
  let sendEventNoSamplingSpy: MockInstance;

  beforeEach(() => {
    handler = new AnalyticsHandler({ enableAnalytics: true });
    sendPingSpy = vi.spyOn(handler, 'sendPing');
    sendEventSpy = vi.spyOn(handler, 'sendEvent');
    sendEventNoSamplingSpy = vi.spyOn(handler, 'sendEventNoSampling');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with analytics enabled', () => {
    expect(handler).to.be.instanceOf(AnalyticsHandler);
  });

  it('should call sendPing', () => {
    const values = { key: 'value' };
    handler.sendPing(values);
    expect(sendPingSpy).toHaveBeenCalledOnce();
    expect(sendPingSpy).toHaveBeenCalledWith(values);
  });

  it('should call sendEvent', () => {
    const event = {
      category: 'search',
      action: 'sort by category',
      label: 'sorted asc order by category',
    };
    handler.sendEvent(event);
    expect(sendEventSpy).toHaveBeenCalledOnce();
    expect(sendEventSpy).toHaveBeenCalledWith(event);
  });

  it('should call sendEventNoSampling on analyticsHandler', () => {
    const event = { category: 'test', action: 'no-sampling' };
    handler.sendEventNoSampling(event);

    expect(sendEventNoSamplingSpy).toHaveBeenCalledOnce();
    expect(sendEventNoSamplingSpy).toHaveBeenCalledWith(event);
  });
});
