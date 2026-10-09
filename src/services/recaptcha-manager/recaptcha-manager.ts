import { LazyLoaderService } from '../lazy-loader-service/lazy-loader-service';
import type { LazyLoaderServiceInterface } from '../lazy-loader-service/lazy-loader-service-interface';
import { RecaptchaWidget, RecaptchaWidgetInterface } from './recaptcha-widget';

export interface RecaptchaManagerInterface {
  /**
   * Changes the manager's timeout delay to the given number of milliseconds.
   */
  setTimeoutDelay(delay: number): void;

  /**
   * Load a recaptcha widget for a given site key or the default site key.
   */
  getRecaptchaWidget(options?: {
    siteKey?: string;
    recaptchaParams?: ReCaptchaV2.Parameters;
  }): Promise<RecaptchaWidgetInterface>;
}

export class RecaptchaManager implements RecaptchaManagerInterface {
  private static readonly DEFAULT_TIMEOUT = 10000;

  private lazyLoader: LazyLoaderServiceInterface;

  private defaultSiteKey?: string;

  private recaptchaCache: Record<string, RecaptchaWidget> = {};

  /**
   * How long in milliseconds to wait for the recaptcha library to load before timing out.
   */
  private timeout = RecaptchaManager.DEFAULT_TIMEOUT;

  constructor(options?: {
    defaultSiteKey?: string;
    lazyLoader?: LazyLoaderServiceInterface;
    grecaptchaLibrary?: ReCaptchaV2.ReCaptcha; // allows dependency injection or will be lazy loaded
    timeout?: number;
  }) {
    this.defaultSiteKey = options?.defaultSiteKey;
    this.lazyLoader = options?.lazyLoader ?? new LazyLoaderService();
    this.grecaptchaLibraryCache = options?.grecaptchaLibrary;
    this.timeout = options?.timeout ?? RecaptchaManager.DEFAULT_TIMEOUT;
  }

  /** @inheritdoc */
  setTimeoutDelay(delay: number): void {
    this.timeout = delay;
  }

  /** @inheritdoc */
  async getRecaptchaWidget(options?: {
    siteKey?: string;
    recaptchaParams?: ReCaptchaV2.Parameters;
  }): Promise<RecaptchaWidgetInterface> {
    const key = options?.siteKey ?? this.defaultSiteKey;
    if (!key) {
      throw new Error('The reCaptcha widget requires a site key');
    }

    const cached = this.recaptchaCache[key];
    if (cached) return cached;

    const grecaptchaLibrary = await this.getRecaptchaLibrary();
    const recaptcha = new RecaptchaWidget(
      {
        siteKey: key,
        grecaptchaLibrary,
      },
      options?.recaptchaParams,
    );

    this.recaptchaCache[key] = recaptcha;
    return recaptcha;
  }

  /**
   * Load the Recaptcha library from Google's www.recaptcha.net mirror, which
   * is reachable in regions where www.google.com is blocked.
   *
   * @returns Promise<ReCaptchaV2.ReCaptcha>
   */
  private async getRecaptchaLibrary(): Promise<ReCaptchaV2.ReCaptcha> {
    if (this.grecaptchaLibraryCache) {
      return this.grecaptchaLibraryCache;
    }
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).grecaptchaLoadedCallback = (): void => {
        setTimeout(() => {
          // remove the callback when we're done with it
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delete (window as any).grecaptchaLoadedCallback;
        }, 10);
        this.grecaptchaLibraryCache = window.grecaptcha;
        resolve(window.grecaptcha);
      };

      setTimeout(
        () => reject(new Error('grecaptcha failed to execute callback')),
        this.timeout,
      );

      this.lazyLoader.loadScript({
        src: 'https://www.recaptcha.net/recaptcha/api.js?onload=grecaptchaLoadedCallback&render=explicit',
      });
    });
  }

  /** don't use directly, use `getRecaptchaLibrary()` */
  private grecaptchaLibraryCache?: ReCaptchaV2.ReCaptcha;
}
