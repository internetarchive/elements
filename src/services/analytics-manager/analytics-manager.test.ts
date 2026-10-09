import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import { AnalyticsManager } from './analytics-manager';

let sendBeaconSpy: MockInstance<typeof navigator.sendBeacon>;

describe('ArchiveAnalytics', () => {
  beforeEach(() => {
    sendBeaconSpy = vi
      .spyOn(window.navigator, 'sendBeacon')
      .mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Service setting', () => {
    it('defaults to the ao_2 service', () => {
      const archiveAnalytics = new AnalyticsManager();
      archiveAnalytics.sendPing();
      expect(sendBeaconSpy).toHaveBeenCalledOnce();
      const callArgs = sendBeaconSpy.mock.calls[0][0] as string;
      expect(callArgs).to.contain('service=ao_2');
    });

    it('can customize the service', () => {
      const archiveAnalytics = new AnalyticsManager({
        defaultService: 'foo_service',
      });
      archiveAnalytics.sendPing();
      expect(sendBeaconSpy).toHaveBeenCalledOnce();
      const callArgs = sendBeaconSpy.mock.calls[0][0] as string;
      expect(callArgs).to.contain('service=foo_service');
    });
  });

  describe('Image url setting', () => {
    it('defaults to https://athena.archive.org/0.gif', () => {
      const archiveAnalytics = new AnalyticsManager();
      archiveAnalytics.sendPing();
      expect(sendBeaconSpy).toHaveBeenCalledOnce();
      const callArgs = sendBeaconSpy.mock.calls[0][0] as string;
      expect(callArgs).to.contain('https://athena.archive.org/0.gif?');
    });

    it('can customize the image url', () => {
      const archiveAnalytics = new AnalyticsManager({
        imageUrl: 'https://foo.org/1.gif?',
      });
      archiveAnalytics.sendPing();
      expect(sendBeaconSpy).toHaveBeenCalledOnce();
      const callArgs = sendBeaconSpy.mock.calls[0][0] as string;
      expect(callArgs).to.contain('https://foo.org/1.gif?');
    });
  });

  describe('sendPing', () => {
    it('can send a ping via sendBeacon', () => {
      const archiveAnalytics = new AnalyticsManager();
      archiveAnalytics.sendPing();
      expect(sendBeaconSpy).toHaveBeenCalledOnce();
    });

    it('can send arbitrary parameters', () => {
      const archiveAnalytics = new AnalyticsManager();
      archiveAnalytics.sendPing({
        foo: 'bar',
        snip: 'snap',
      });
      const callArgs = sendBeaconSpy.mock.calls[0][0] as string;
      expect(callArgs).to.contain('foo=bar');
      expect(callArgs).to.contain('snip=snap');
      expect(callArgs).to.contain('count=5');
      expect(callArgs).to.contain('version=2');
    });

    it('can ping via a pixel image', () => {
      const container = document.createElement('div');
      const archiveAnalytics = new AnalyticsManager({
        imageContainer: container,
        requireImagePing: true,
      });
      archiveAnalytics.sendPing({
        foo: 'bar',
      });
      const imagePing = container.querySelector('img');
      expect(imagePing).to.exist;
      const url = imagePing?.src;
      expect(url).to.contain('foo=bar');
    });

    it('document.body is the default image container', () => {
      const archiveAnalytics = new AnalyticsManager({
        requireImagePing: true,
      });
      archiveAnalytics.sendPing({
        foo: 'bar',
      });
      const imagePing = document.body.querySelector('img');
      expect(imagePing).to.exist;
      const url = imagePing?.src;
      expect(url).to.contain('foo=bar');
      imagePing?.remove();
    });
  });

  describe('sendEvent', () => {
    it('sends an event properly', () => {
      const archiveAnalytics = new AnalyticsManager();
      archiveAnalytics.sendEvent({
        category: 'foo',
        action: 'bar',
        label: 'baz',
      });
      const callArgs = sendBeaconSpy.mock.calls[0][0] as string;
      expect(callArgs).to.contain('ec=foo');
      expect(callArgs).to.contain('ea=bar');
      expect(callArgs).to.contain('el=baz');
    });

    it('uses window.location.pathname if no label provided', () => {
      const archiveAnalytics = new AnalyticsManager();
      archiveAnalytics.sendEvent({
        category: 'foo',
        action: 'bar',
      });
      const callArgs = sendBeaconSpy.mock.calls[0][0] as string;
      expect(callArgs).to.contain('ec=foo');
      expect(callArgs).to.contain('ea=bar');
      expect(callArgs).to.contain('el=%2F'); // forward slash (root pathname) `/`
    });
  });

  describe('sendEventNoSampling', () => {
    it('sets the service to ao_no_sampling', () => {
      const archiveAnalytics = new AnalyticsManager();
      archiveAnalytics.sendEventNoSampling({
        category: 'foo',
        action: 'bar',
        label: 'baz',
      });
      const callArgs = sendBeaconSpy.mock.calls[0][0] as string;
      expect(callArgs).to.contain('service=ao_no_sampling');
      expect(callArgs).to.contain('ec=foo');
      expect(callArgs).to.contain('ea=bar');
      expect(callArgs).to.contain('el=baz');
    });
  });

  // describe('send_pageview', () => {
  //   test('is defined', () => {
  //     expect(archive_analytics.send_pageview).toBeInstanceOf(Function);
  //   });

  //   describe('without options', () => {
  //     test('sends correct params', () => {
  //       archive_analytics.send_pageview();

  //       expect(lastImage).toBeDefined();
  //       expect(lastImage.getParam('kind')).toBe('pageview');
  //       expect(lastImage.hasParam('service')).toBeTruthy();
  //       expect(lastImage.hasParam('ga_cd1')).toBeTruthy();
  //       expect(lastImage.hasParam('ga_cd2')).toBeTruthy();
  //       expect(lastImage.hasParam('version')).toBeTruthy();
  //       expect(lastImage.hasParam('count')).toBeTruthy();
  //     });
  //   });

  //   describe('with options', () => {
  //     test('sends mediaType param', () => {
  //       archive_analytics.send_pageview({
  //         mediaType: 'texts',
  //       });

  //       expect(lastImage).toBeDefined();
  //       expect(lastImage.getParam('kind')).toBe('pageview');
  //       expect(lastImage.hasParam('service')).toBeTruthy();
  //       expect(lastImage.hasParam('ga_cd1')).toBeTruthy();
  //       expect(lastImage.hasParam('ga_cd2')).toBeTruthy();
  //       expect(lastImage.getParam('ga_cd3')).toBe('texts');
  //       expect(lastImage.hasParam('version')).toBeTruthy();
  //       expect(lastImage.hasParam('count')).toBeTruthy();
  //     });
  //     test('sends primaryCollection param', () => {
  //       archive_analytics.send_pageview({
  //         primaryCollection: 'primary collection',
  //       });

  //       expect(lastImage).toBeDefined();
  //       expect(lastImage.getParam('kind')).toBe('pageview');
  //       expect(lastImage.hasParam('service')).toBeTruthy();
  //       expect(lastImage.hasParam('ga_cd1')).toBeTruthy();
  //       expect(lastImage.hasParam('ga_cd2')).toBeTruthy();
  //       expect(lastImage.getParam('ga_cd5')).toBe('primary collection');
  //       expect(lastImage.hasParam('version')).toBeTruthy();
  //       expect(lastImage.hasParam('count')).toBeTruthy();
  //     });
  //   });

  //   describe('with service property set', () => {
  //     test('sends service param', () => {
  //       archive_analytics.service = 'ol';
  //       archive_analytics.send_pageview();

  //       expect(lastImage).toBeDefined();
  //       expect(lastImage.getParam('kind')).toBe('pageview');
  //       expect(lastImage.getParam('service')).toBe('ol');
  //       expect(lastImage.hasParam('ga_cd1')).toBeDefined();
  //       expect(lastImage.hasParam('ga_cd2')).toBeDefined();
  //       expect(!lastImage.hasParam('ga_cd3')).toBeDefined();
  //       expect(lastImage.hasParam('version')).toBeDefined();
  //       expect(lastImage.hasParam('count')).toBeDefined();
  //     });
  //   });
  // });
});
