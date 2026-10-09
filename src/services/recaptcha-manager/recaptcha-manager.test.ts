import { describe, expect, it } from 'vitest';
import { MockGrecaptcha } from './mock-grecaptcha.test-helper';
import { RecaptchaManager } from './recaptcha-manager';
import { MockLazyLoaderService } from './mock-lazy-loader.test-helper';

const mockLazyLoader = new MockLazyLoaderService();

describe('ReCaptcha Management', () => {
  describe('ReCaptcha Manager', () => {
    it('can return recaptchas', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'success',
      });
      mockGrecaptcha.response = 'foo';
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
        defaultSiteKey: '123',
      });
      const recaptcha = await recaptchaManager.getRecaptchaWidget();
      const result = await recaptcha.execute();
      expect(result).to.equal('foo');
    });

    it('throws an error if no site key found', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'success',
      });
      mockGrecaptcha.response = 'foo';
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
      });
      try {
        await recaptchaManager.getRecaptchaWidget();
        expect.fail('should not get here');
      } catch (e) {
        expect((e as Error).message).to.equal(
          'The reCaptcha widget requires a site key',
        );
      }
    });

    it('returns a cached version if one already exists for a given site key', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'success',
      });
      mockGrecaptcha.response = 'foo';
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
        defaultSiteKey: '123',
      });
      const recaptcha1 = await recaptchaManager.getRecaptchaWidget();
      const recaptcha2 = await recaptchaManager.getRecaptchaWidget();
      expect(recaptcha1).to.equal(recaptcha2);
    });

    it('loads the recaptcha library if needed', async () => {
      // Mock lazy loader that mimics the grecaptcha script calling the callback on load
      const mockLazyLoaderWithCallback = new MockLazyLoaderService(() => {
        window.grecaptcha = new MockGrecaptcha({
          mode: 'success',
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).grecaptchaLoadedCallback();
      });

      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoaderWithCallback,
        defaultSiteKey: '123',
        timeout: 100,
      });

      await recaptchaManager.getRecaptchaWidget();
      const loadUrl = mockLazyLoaderWithCallback.loadScriptSrc;
      expect(
        loadUrl?.includes(
          'https://www.recaptcha.net/recaptcha/api.js?onload=grecaptchaLoadedCallback',
        ),
      ).to.be.true;
    });

    it('rejects after specified timeout if grecaptcha fails to execute callback', async () => {
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        defaultSiteKey: '123',
        timeout: 100,
      });

      try {
        await recaptchaManager.getRecaptchaWidget();
        expect.fail('recaptcha load did not time out as expected');
      } catch (err) {
        expect(err).to.be.instanceOf(Error);
        expect((err as Error).message).to.equal(
          'grecaptcha failed to execute callback',
        );
      }
    });

    it('can set the timeout delay', async () => {
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        defaultSiteKey: '123',
      });

      recaptchaManager.setTimeoutDelay(1);

      try {
        await recaptchaManager.getRecaptchaWidget();
        expect.fail('recaptcha load did not time out as expected');
      } catch (err) {
        expect(err).to.be.instanceOf(Error);
        expect((err as Error).message).to.equal(
          'grecaptcha failed to execute callback',
        );
      }
    });
  });

  describe('ReCaptcha Widget', () => {
    it('can error properly like a Promise', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'error',
      });
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
        defaultSiteKey: '123',
      });
      const recaptcha = await recaptchaManager.getRecaptchaWidget();

      try {
        await recaptcha.execute();
        expect.fail('should not get here');
      } catch (error) {
        expect((error as Error).message).to.equal('error');
      }
    });

    it('can expire properly like a Promise', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'expired',
      });
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
        defaultSiteKey: '123',
      });
      const recaptcha = await recaptchaManager.getRecaptchaWidget();

      try {
        await recaptcha.execute();
        expect.fail('should not get here');
      } catch (error) {
        expect((error as Error).message).to.equal('expired');
      }
    });

    it('resets the captcha after execution', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'success',
        addDelay: true,
      });
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
        defaultSiteKey: '123',
      });
      const recaptcha = await recaptchaManager.getRecaptchaWidget();

      expect(mockGrecaptcha.resetCallCount).to.equal(0);
      await recaptcha.execute();
      expect(mockGrecaptcha.resetCallCount).to.equal(1);
      await recaptcha.execute();
      expect(mockGrecaptcha.resetCallCount).to.equal(2);
    });

    // there's no way to know if the user has dismissed the captcha so if another execution
    // comes through while the captcha is still active, it will be reset
    it('resets the captcha if another execution gets called', async () => {
      const mockGrecaptcha = new MockGrecaptcha({
        mode: 'success',
        addDelay: true,
      });
      const recaptchaManager = new RecaptchaManager({
        lazyLoader: mockLazyLoader,
        grecaptchaLibrary: mockGrecaptcha,
        defaultSiteKey: '123',
      });
      const recaptcha = await recaptchaManager.getRecaptchaWidget();

      expect(mockGrecaptcha.resetCallCount).to.equal(0);
      recaptcha.execute();
      expect(mockGrecaptcha.resetCallCount).to.equal(0);
      await recaptcha.execute();
      expect(mockGrecaptcha.resetCallCount).to.equal(2);
    });
  });
});
