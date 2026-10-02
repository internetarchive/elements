export interface RecaptchaManagerInterface {
  execute(): Promise<string>;
  setup(
    container: HTMLElement,
    tabIndex: number,
    theme: ReCaptchaV2.Theme,
    type: ReCaptchaV2.Type,
  ): void;
}

/**
 * Wraps an invisible reCAPTCHA so it can be run like a promise.
 *
 * `execute()` kicks off the challenge, but the result arrives through the
 * response and expiration handlers bound during `setup()`. So `execute()`
 * stashes resolve and reject callbacks and the handlers call them.
 *
 *     try {
 *       const token = await recaptchaManager.execute();
 *     } catch {
 *       // 'expired' or 'error'
 *     }
 */
export class RecaptchaManager implements RecaptchaManagerInterface {
  private grecaptchaLibrary: ReCaptchaV2.ReCaptcha;

  private siteKey: string;

  constructor(options: {
    grecaptchaLibrary: ReCaptchaV2.ReCaptcha;
    siteKey: string;
  }) {
    this.grecaptchaLibrary = options.grecaptchaLibrary;
    this.siteKey = options.siteKey;
  }

  private executionSuccessBlock?: (token: string) => void;

  private executionExpiredBlock?: () => void;

  private executionErrorBlock?: () => void;

  private isExecuting = false;

  execute(): Promise<string> {
    if (this.isExecuting) {
      this.finishExecution();
    }
    this.isExecuting = true;
    return new Promise((resolve, reject) => {
      this.executionSuccessBlock = (token: string): void => {
        this.finishExecution();
        resolve(token);
      };

      this.executionExpiredBlock = (): void => {
        this.finishExecution();
        reject('expired');
      };

      this.executionErrorBlock = (): void => {
        this.finishExecution();
        reject('error');
      };

      this.grecaptchaLibrary.execute();
    });
  }

  private finishExecution(): void {
    this.isExecuting = false;
    this.grecaptchaLibrary.reset();
  }

  setup(
    container: HTMLElement,
    tabIndex: number,
    theme: ReCaptchaV2.Theme,
    type: ReCaptchaV2.Type,
  ): void {
    this.grecaptchaLibrary.render(container, {
      callback: this.responseHandler.bind(this),
      'expired-callback': this.expiredHandler.bind(this),
      'error-callback': this.errorHandler.bind(this),
      sitekey: this.siteKey,
      tabindex: tabIndex,
      theme,
      type,
      size: 'invisible',
    });
  }

  private responseHandler(response: string): void {
    if (this.executionSuccessBlock) {
      this.executionSuccessBlock(response);
      this.executionSuccessBlock = undefined;
    }
  }

  private expiredHandler(): void {
    if (this.executionExpiredBlock) {
      this.executionExpiredBlock();
      this.executionExpiredBlock = undefined;
    }
  }

  private errorHandler(): void {
    if (this.executionErrorBlock) {
      this.executionErrorBlock();
      this.executionErrorBlock = undefined;
    }
  }
}
