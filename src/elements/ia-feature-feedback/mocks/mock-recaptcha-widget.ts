import type { RecaptchaWidgetInterface } from '@internetarchive/recaptcha-manager';

export class MockRecaptchaWidget implements RecaptchaWidgetInterface {
  async execute(): Promise<string> {
    return 'boop';
  }
}
