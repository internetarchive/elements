import type { RecaptchaWidgetInterface } from '@src/services/recaptcha-manager/recaptcha-widget';

export class MockRecaptchaWidget implements RecaptchaWidgetInterface {
  async execute(): Promise<string> {
    return 'boop';
  }
}
