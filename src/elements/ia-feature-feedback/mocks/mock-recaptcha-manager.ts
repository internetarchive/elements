import type {
  RecaptchaManagerInterface,
  RecaptchaWidgetInterface,
} from '@internetarchive/recaptcha-manager';
import { MockRecaptchaWidget } from './mock-recaptcha-widget';

type GetWidgetOptions = Parameters<
  RecaptchaManagerInterface['getRecaptchaWidget']
>[0];

export class MockRecaptchaManager implements RecaptchaManagerInterface {
  getWidgetOptions?: GetWidgetOptions;

  timeoutDelay?: number;

  setTimeoutDelay(delay: number): void {
    this.timeoutDelay = delay;
  }

  async getRecaptchaWidget(
    options?: GetWidgetOptions,
  ): Promise<RecaptchaWidgetInterface> {
    this.getWidgetOptions = options;
    return new MockRecaptchaWidget();
  }
}
