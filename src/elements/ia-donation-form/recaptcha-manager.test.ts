import { describe, expect, test } from 'vitest';

import {
  MockGrecaptcha,
  MockGrecaptchaMode,
} from './braintree/test-helpers/mock-clients.test-helpers';
import { RecaptchaManager } from './recaptcha-manager';

function setup(
  mode: MockGrecaptchaMode,
  addDelay = false,
): { manager: RecaptchaManager; grecaptcha: MockGrecaptcha } {
  const grecaptcha = new MockGrecaptcha(mode, addDelay);
  const manager = new RecaptchaManager({
    grecaptchaLibrary: grecaptcha.library,
    siteKey: '123',
  });
  manager.setup(document.createElement('div'), 1, 'dark', 'image');
  return { manager, grecaptcha };
}

describe('RecaptchaManager', () => {
  test('renders an invisible widget with the site key', () => {
    const { grecaptcha } = setup(MockGrecaptchaMode.Success);

    expect(grecaptcha.renderCalled).to.be.true;
    expect(grecaptcha.renderParameters).to.include({
      sitekey: '123',
      tabindex: 1,
      theme: 'dark',
      type: 'image',
      size: 'invisible',
    });
  });

  test('resolves with the token when the challenge succeeds', async () => {
    const { manager } = setup(MockGrecaptchaMode.Success);

    expect(await manager.execute()).to.equal('foo');
  });

  test('rejects with "error" when the challenge errors', async () => {
    const { manager } = setup(MockGrecaptchaMode.Error);

    await expect(manager.execute()).rejects.toBe('error');
  });

  test('rejects with "expired" when the challenge expires', async () => {
    const { manager } = setup(MockGrecaptchaMode.Expired);

    await expect(manager.execute()).rejects.toBe('expired');
  });

  test('resets the widget after each execution', async () => {
    const { manager, grecaptcha } = setup(MockGrecaptchaMode.Success);

    await manager.execute();

    expect(grecaptcha.resetCalled).to.be.true;
  });

  test('resets the widget if execute() is called again mid-challenge', () => {
    const { manager, grecaptcha } = setup(MockGrecaptchaMode.Success, true);

    manager.execute();
    expect(grecaptcha.resetCalled).to.be.false;

    manager.execute();
    expect(grecaptcha.resetCalled).to.be.true;
  });
});
