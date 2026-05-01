import { fixture, oneEvent } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IAOTPInput } from '@src/elements/ia-otp-input/ia-otp-input';
import type { IAStatusIndicator } from '@src/elements/ia-status-indicator/ia-status-indicator';
import type { IAOTPForm } from './ia-otp-form';

import './ia-otp-form';

describe('IA OTP form', () => {
  test('renders an OTP input by default', async () => {
    const el = await fixture<IAOTPForm>(html`<ia-otp-form></ia-otp-form>`);

    const OTPInput = el.shadowRoot?.querySelector('ia-otp-input');
    expect(OTPInput).to.exist;
  });

  test('requests new code on "send me another code" button click', async () => {
    const el = await fixture<IAOTPForm>(html`<ia-otp-form></ia-otp-form>`);

    const eventPromise = oneEvent(el, 'newCodeRequested');

    const newCodeBtn = el.shadowRoot?.querySelector(
      '.new-code-btn',
    ) as HTMLButtonElement;
    newCodeBtn?.click();

    const codeRequestEvent = await eventPromise;
    expect(codeRequestEvent).to.exist;
  });

  test('clears current input on "send me another code" button click', async () => {
    const el = await fixture<IAOTPForm>(html`<ia-otp-form></ia-otp-form>`);

    const input = el.shadowRoot?.querySelector('ia-otp-input') as IAOTPInput;
    input.prefillValue = '12345';

    const newCodeBtn = el.shadowRoot?.querySelector(
      '.new-code-btn',
    ) as HTMLButtonElement;
    newCodeBtn?.click();
    expect(input.prefillValue).to.equal('');
  });

  test('can switch out button for loading message if new code sending', async () => {
    const el = await fixture<IAOTPForm>(
      html`<ia-otp-form .newCodeSending=${true}></ia-otp-form>`,
    );

    const newCodeBtn = el.shadowRoot?.querySelector(
      '.new-code-btn',
    ) as HTMLButtonElement;
    const newCodeMsg = el.shadowRoot?.querySelector('.new-code-msg');
    expect(newCodeBtn).not.to.exist;
    expect(newCodeMsg).to.exist;
  });

  test('does not include email by default in "send me another code" request', async () => {
    const el = await fixture<IAOTPForm>(html`<ia-otp-form></ia-otp-form>`);

    const eventPromise = oneEvent(el, 'newCodeRequested');

    const newCodeBtn = el.shadowRoot?.querySelector(
      '.new-code-btn',
    ) as HTMLButtonElement;
    newCodeBtn?.click();

    const codeRequestEvent = await eventPromise;
    expect(codeRequestEvent).to.exist;
    expect(codeRequestEvent.detail).to.be.null;
  });

  test('disables OTP input if validation in progress', async () => {
    const el = await fixture<IAOTPForm>(
      html`<ia-otp-form .validationStatus=${'loading'}></ia-otp-form>`,
    );

    const input = el.shadowRoot?.querySelector('ia-otp-input') as IAOTPInput;
    expect(input.disabled).to.be.true;
  });

  test('disables new code button if validation in progress', async () => {
    const el = await fixture<IAOTPForm>(
      html`<ia-otp-form .validationStatus=${'loading'}></ia-otp-form>`,
    );

    const newCodeBtn = el.shadowRoot?.querySelector(
      '.new-code-btn',
    ) as HTMLButtonElement;
    expect(newCodeBtn.disabled).to.be.true;
  });

  test('displays a loading indicator next to the input if validation in progress', async () => {
    const el = await fixture<IAOTPForm>(
      html`<ia-otp-form .validationStatus=${'loading'}></ia-otp-form>`,
    );

    const statusIndicator = el.shadowRoot?.querySelector(
      'ia-status-indicator',
    ) as IAStatusIndicator;
    expect(statusIndicator.mode).to.equal('loading');
  });

  test('disables OTP input if validation successful', async () => {
    const el = await fixture<IAOTPForm>(
      html`<ia-otp-form .validationStatus=${'success'}></ia-otp-form>`,
    );

    const input = el.shadowRoot?.querySelector('ia-otp-input') as IAOTPInput;
    expect(input.disabled).to.be.true;
  });

  test('displays a success icon next to the input if validation successful', async () => {
    const el = await fixture<IAOTPForm>(
      html`<ia-otp-form .validationStatus=${'success'}></ia-otp-form>`,
    );

    const statusIndicator = el.shadowRoot?.querySelector(
      'ia-status-indicator',
    ) as IAStatusIndicator;
    expect(statusIndicator.mode).to.equal('success');
  });

  test('does not disable OTP input if validation not successful', async () => {
    const el = await fixture<IAOTPForm>(
      html`<ia-otp-form .validationStatus=${'error'}></ia-otp-form>`,
    );

    const input = el.shadowRoot?.querySelector('ia-otp-input') as IAOTPInput;
    expect(input.disabled).to.be.false;
  });

  test('clears OTP input if validation not successful', async () => {
    const el = await fixture<IAOTPForm>(html`<ia-otp-form></ia-otp-form>`);
    const input = el.shadowRoot?.querySelector('ia-otp-input') as IAOTPInput;
    input.prefillValue = '12345';
    el.validationStatus = 'error';

    await el.updateComplete;

    expect(input.prefillValue).to.equal(undefined);
  });

  test('displays an error icon next to the input if validation not successful', async () => {
    const el = await fixture<IAOTPForm>(
      html`<ia-otp-form .validationStatus=${'error'}></ia-otp-form>`,
    );

    const statusIndicator = el.shadowRoot?.querySelector(
      'ia-status-indicator',
    ) as IAStatusIndicator;
    expect(statusIndicator.mode).to.equal('error');
  });

  test('displays an error message after the input if validation not successful', async () => {
    const el = await fixture<IAOTPForm>(
      html`<ia-otp-form .validationStatus=${'error'}></ia-otp-form>`,
    );

    const errorMessage = el.shadowRoot?.querySelector('.error-msg');
    expect(errorMessage).to.exist;
  });
});
