import { fixture, oneEvent } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import { IAOTPInput } from './ia-otp-input';
import './ia-otp-input';

describe('IA OTP Input', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders 6 inputs by default', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');
    expect(inputs?.length).to.equal(6);
  });

  test('renders more inputs if requested', async () => {
    const el = await fixture<IAOTPInput>(
      html`<ia-otp-input .numChars=${10}></ia-otp-input>`,
    );

    const inputs = el.shadowRoot?.querySelectorAll('input');
    expect(inputs?.length).to.equal(10);
  });

  test('adds the one-time-passcode autocomplete attribute to only the first input', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');
    expect(inputs?.[0].autocomplete).to.equal('one-time-code');
    expect(inputs?.[1].autocomplete).to.equal('off');
  });

  test('uses numeric keyboard by default', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');
    expect(inputs?.[0].inputMode).to.equal('numeric');
  });

  test('uses regular keyboard if other characters allowed', async () => {
    const el = await fixture<IAOTPInput>(
      html`<ia-otp-input .numericOnly=${false}></ia-otp-input>`,
    );

    const inputs = el.shadowRoot?.querySelectorAll('input');
    expect(inputs?.[0].inputMode).to.equal('text');
  });

  test('shifts focus to next input if character entered', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;
    const focusSpy = vi
      .spyOn(secondInput, 'focus')
      .mockResolvedValue(undefined)
      .mockResolvedValue(undefined);

    firstInput.dispatchEvent(new InputEvent('beforeinput', { data: '1' }));

    expect(firstInput.value).to.equal('1');
    expect(focusSpy).toHaveBeenCalledOnce();
  });

  test('shifts focus as usual if falsey number like 0 entered', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;
    const focusSpy = vi
      .spyOn(secondInput, 'focus')
      .mockResolvedValue(undefined);

    firstInput.dispatchEvent(new InputEvent('beforeinput', { data: '0' }));

    expect(firstInput.value).to.equal('0');
    expect(focusSpy).toHaveBeenCalledOnce();
  });

  test('does not allow non-alphanumeric entry', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;
    const focusSpy = vi
      .spyOn(secondInput, 'focus')
      .mockResolvedValue(undefined);

    firstInput.dispatchEvent(new InputEvent('beforeinput', { data: ' ' }));

    expect(firstInput.value).to.equal('');
    expect(focusSpy).toHaveBeenCalledTimes(0);
  });

  test('does not allow non-numeric entry by default', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;
    const focusSpy = vi
      .spyOn(secondInput, 'focus')
      .mockResolvedValue(undefined);

    firstInput.dispatchEvent(new InputEvent('beforeinput', { data: 'A' }));

    expect(firstInput.value).to.equal('');
    expect(focusSpy).toHaveBeenCalledTimes(0);
  });

  test('does allow letter input if numericOnly is false', async () => {
    const el = await fixture<IAOTPInput>(
      html`<ia-otp-input .numericOnly=${false}></ia-otp-input>`,
    );

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;
    const focusSpy = vi
      .spyOn(secondInput, 'focus')
      .mockResolvedValue(undefined);

    firstInput.dispatchEvent(new InputEvent('beforeinput', { data: 'A' }));

    expect(firstInput.value).to.equal('A');
    expect(focusSpy).toHaveBeenCalledOnce();
  });

  test('replaces existing character with new character on input', async () => {
    const el = await fixture<IAOTPInput>(
      html`<ia-otp-input .numericOnly=${false}></ia-otp-input>`,
    );

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;
    const focusSpy = vi
      .spyOn(secondInput, 'focus')
      .mockResolvedValue(undefined);

    firstInput.value = 'A';
    firstInput.dispatchEvent(new InputEvent('beforeinput', { data: 'B' }));

    expect(firstInput.value).to.equal('B');
    expect(focusSpy).toHaveBeenCalledOnce();
  });

  test('does not replace existing character with new character if invalid second char entered', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;
    const focusSpy = vi
      .spyOn(secondInput, 'focus')
      .mockResolvedValue(undefined);

    firstInput.value = '1';
    firstInput.dispatchEvent(new InputEvent('beforeinput', { data: 'B' }));

    expect(firstInput.value).to.equal('1');
    expect(focusSpy).toHaveBeenCalledTimes(0);
  });

  test('does not shift focus if value is empty', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;
    const focusSpy = vi
      .spyOn(secondInput, 'focus')
      .mockResolvedValue(undefined);

    firstInput.dispatchEvent(new InputEvent('beforeinput', { data: '' }));

    expect(focusSpy).toHaveBeenCalledTimes(0);
  });

  test('shifts focus backwards if backspace entered', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;
    const focusSpy = vi.spyOn(firstInput, 'focus').mockResolvedValue(undefined);

    const backspaceEvent = new KeyboardEvent('keydown', {
      code: 'Backspace',
      key: 'Backspace',
      charCode: 8,
      keyCode: 8,
      view: window,
      bubbles: true,
    });
    secondInput.dispatchEvent(backspaceEvent);

    expect(focusSpy).toHaveBeenCalledOnce();
  });

  test('shifts focus backwards if delete entered', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;
    const focusSpy = vi.spyOn(firstInput, 'focus').mockResolvedValue(undefined);

    const backspaceEvent = new KeyboardEvent('keydown', {
      code: 'Delete',
      key: 'Delete',
      charCode: 46,
      keyCode: 46,
      view: window,
      bubbles: true,
    });
    secondInput.dispatchEvent(backspaceEvent);

    expect(focusSpy).toHaveBeenCalledOnce();
  });

  test('deletes only focused char if input filled and delete entered', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;

    firstInput.value = '1';
    secondInput.value = '2';
    const backspaceEvent = new KeyboardEvent('keydown', {
      code: 'Delete',
      key: 'Delete',
      charCode: 46,
      keyCode: 46,
      view: window,
      bubbles: true,
    });
    secondInput.dispatchEvent(backspaceEvent);

    expect(secondInput.value).to.equal('');
    expect(firstInput.value).to.equal('1');
  });

  test('deletes previous char if input not filled and delete entered', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;

    firstInput.value = '1';
    secondInput.value = '';
    const backspaceEvent = new KeyboardEvent('keydown', {
      code: 'Delete',
      key: 'Delete',
      charCode: 46,
      keyCode: 46,
      view: window,
      bubbles: true,
    });
    secondInput.dispatchEvent(backspaceEvent);

    expect(secondInput.value).to.equal('');
    expect(firstInput.value).to.equal('');
  });

  test('shifts focus forwards and selects existing value if tab entered', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const selectSpy = vi
      .spyOn(firstInput, 'select')
      .mockResolvedValue(undefined);

    const tabEvent = new KeyboardEvent('keydown', {
      code: 'Tab',
      key: 'Tab',
      charCode: 9,
      keyCode: 9,
      view: window,
      bubbles: true,
    });
    firstInput.dispatchEvent(tabEvent);

    expect(selectSpy).toHaveBeenCalledOnce();
  });

  test('shifts focus forwards if right arrow entered', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0];
    const secondInput = inputs?.[1] as HTMLInputElement;
    const focusSpy = vi
      .spyOn(secondInput, 'focus')
      .mockResolvedValue(undefined);

    const arrowEvent = new KeyboardEvent('keydown', {
      code: 'ArrowRight',
      key: 'ArrowRight',
      charCode: 39,
      keyCode: 39,
      view: window,
      bubbles: true,
    });
    firstInput?.dispatchEvent(arrowEvent);

    expect(focusSpy).toHaveBeenCalledOnce();
  });

  test('shifts focus backwards if left arrow entered', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');

    const firstInput = inputs?.[0] as HTMLInputElement;
    const secondInput = inputs?.[1] as HTMLInputElement;
    const focusSpy = vi.spyOn(firstInput, 'focus').mockResolvedValue(undefined);

    const arrowEvent = new KeyboardEvent('keydown', {
      code: 'ArrowLeft',
      key: 'ArrowLeft',
      charCode: 37,
      keyCode: 37,
      view: window,
      bubbles: true,
    });
    secondInput?.dispatchEvent(arrowEvent);

    expect(focusSpy).toHaveBeenCalledOnce();
  });

  test('fills as many inputs as possible if content is pasted', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');
    const firstInput = inputs?.[0] as HTMLInputElement;

    const pastedData = new DataTransfer();
    pastedData.setData('text/plain', '12345');

    firstInput.dispatchEvent(
      new ClipboardEvent('paste', { clipboardData: pastedData }),
    );

    expect(firstInput.value).to.equal('1');
    expect(inputs?.[1].value).to.equal('2');
    expect(inputs?.[2].value).to.equal('3');
    expect(inputs?.[3].value).to.equal('4');
    expect(inputs?.[4].value).to.equal('5');
    expect(inputs?.[5].value).to.equal('');
  });

  test('fills as many inputs as possible if multiple characters are inputted (i.e. autofilled) into first input', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');
    const firstInput = inputs?.[0] as HTMLInputElement;

    firstInput.dispatchEvent(new InputEvent('beforeinput', { data: '12345' }));

    expect(firstInput.value).to.equal('1');
    expect(inputs?.[1].value).to.equal('2');
    expect(inputs?.[2].value).to.equal('3');
    expect(inputs?.[3].value).to.equal('4');
    expect(inputs?.[4].value).to.equal('5');
    expect(inputs?.[5].value).to.equal('');
  });

  test('shifts focus as usual following paste', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');
    const firstInput = inputs?.[0] as HTMLInputElement;
    const focusSpy = vi
      .spyOn(inputs?.[5] as HTMLInputElement, 'focus')
      .mockResolvedValue(undefined);

    const pastedData = new DataTransfer();
    pastedData.setData('text/plain', '12345');

    firstInput.dispatchEvent(
      new ClipboardEvent('paste', { clipboardData: pastedData }),
    );

    expect(inputs?.[5].value).to.equal('');
    expect(focusSpy).toHaveBeenCalledOnce();
  });

  test('overrides existing values on paste', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');
    const secondInput = inputs?.[1] as HTMLInputElement;

    (inputs?.[4] as HTMLInputElement).value = '8';

    const pastedData = new DataTransfer();
    pastedData.setData('text/plain', '12345');

    secondInput.dispatchEvent(
      new ClipboardEvent('paste', { clipboardData: pastedData }),
    );

    expect(inputs?.[4].value).to.equal('5');
  });

  test('ignores any non-alphanumeric characters on paste', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');
    const firstInput = inputs?.[0] as HTMLInputElement;

    const pastedData = new DataTransfer();
    pastedData.setData('text/plain', '123*&4(( _5');

    firstInput.dispatchEvent(
      new ClipboardEvent('paste', { clipboardData: pastedData }),
    );

    expect(firstInput.value).to.equal('1');
    expect(inputs?.[1].value).to.equal('2');
    expect(inputs?.[2].value).to.equal('3');
    expect(inputs?.[3].value).to.equal('4');
    expect(inputs?.[4].value).to.equal('5');
    expect(inputs?.[5].value).to.equal('');
  });

  test('triggers submission if all inputs filled by paste', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');
    const firstInput = inputs?.[0] as HTMLInputElement;

    const pastedData = new DataTransfer();
    pastedData.setData('text/plain', '123456');

    const eventPromise = oneEvent(el, 'codeSubmitted');

    firstInput.dispatchEvent(
      new ClipboardEvent('paste', { clipboardData: pastedData }),
    );

    const { detail } = await eventPromise;
    expect(detail).to.equal('123456');
  });

  test('triggers submission if all inputs filled by paste, plus extra digits', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const inputs = el.shadowRoot?.querySelectorAll('input');
    const firstInput = inputs?.[0] as HTMLInputElement;

    const pastedData = new DataTransfer();
    pastedData.setData('text/plain', '1234569273192756123');

    const eventPromise = oneEvent(el, 'codeSubmitted');

    firstInput.dispatchEvent(
      new ClipboardEvent('paste', { clipboardData: pastedData }),
    );

    const { detail } = await eventPromise;
    expect(detail).to.equal('123456');
  });

  test('capitalizes all characters on submit if alphanumeric allowed', async () => {
    const el = await fixture<IAOTPInput>(
      html`<ia-otp-input .numericOnly=${false}></ia-otp-input>`,
    );

    const inputs = el.shadowRoot?.querySelectorAll('input');
    const firstInput = inputs?.[0] as HTMLInputElement;

    const pastedData = new DataTransfer();
    pastedData.setData('text/plain', '1a3B56');

    const eventPromise = oneEvent(el, 'codeSubmitted');

    firstInput.dispatchEvent(
      new ClipboardEvent('paste', { clipboardData: pastedData }),
    );

    const { detail } = await eventPromise;
    expect(detail).to.equal('1A3B56');
  });

  test('triggers submission if all inputs filled manually', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const submitFn = vi.fn(() => undefined);
    el.addEventListener('codeSubmitted', submitFn);
    const eventPromise = oneEvent(el, 'codeSubmitted');

    const inputs = el.shadowRoot?.querySelectorAll('input');
    inputs?.forEach((input) => {
      input.dispatchEvent(new InputEvent('beforeinput', { data: '0' }));
    });

    const { detail } = await eventPromise;
    expect(detail).to.equal('000000');
    expect(submitFn).toHaveBeenCalledOnce();
  });

  test('does not trigger submission if not all inputs filled', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);

    const submitFn = vi.fn(() => undefined);
    el.addEventListener('codeSubmitted', submitFn);

    const inputs = el.shadowRoot?.querySelectorAll('input');
    inputs?.forEach((input) => {
      if (!input.id.includes('3')) {
        input.value = '0';
        input.dispatchEvent(new InputEvent('beforeinput', { data: '0' }));
      }
    });

    expect(submitFn).toHaveBeenCalledTimes(0);
  });

  test('supports clearing all inputs via prefill value property', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);
    const inputs = el.shadowRoot?.querySelectorAll('input');
    inputs?.forEach((input) => {
      input.value = '1';
    });

    el.prefillValue = '';
    await el.updateComplete;

    expect(inputs?.[0].value).to.equal('');
    expect(inputs?.[1].value).to.equal('');
    expect(inputs?.[2].value).to.equal('');
    expect(inputs?.[3].value).to.equal('');
    expect(inputs?.[4].value).to.equal('');
    expect(inputs?.[5].value).to.equal('');
  });

  test('supports filling multiple inputs via prefill value property', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);
    const inputs = el.shadowRoot?.querySelectorAll('input');

    el.prefillValue = '23456';
    await el.updateComplete;

    expect(inputs?.[0].value).to.equal('2');
    expect(inputs?.[1].value).to.equal('3');
    expect(inputs?.[2].value).to.equal('4');
    expect(inputs?.[3].value).to.equal('5');
    expect(inputs?.[4].value).to.equal('6');
    expect(inputs?.[5].value).to.equal('');
  });

  test('returns focus to first character if inputs cleared', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);
    const inputs = el.shadowRoot?.querySelectorAll('input');
    inputs?.forEach((input) => {
      input.value = '1';
    });

    const firstInput = inputs?.[0] as HTMLInputElement;
    const focusSpy = vi.spyOn(firstInput, 'focus').mockResolvedValue(undefined);

    el.prefillValue = '';
    await el.updateComplete;

    expect(focusSpy).toHaveBeenCalledOnce();
  });

  test('supports disabling of inputs via disabled property', async () => {
    const el = await fixture<IAOTPInput>(html`<ia-otp-input></ia-otp-input>`);
    const inputs = el.shadowRoot?.querySelectorAll('input');

    el.disabled = true;
    await el.updateComplete;

    expect(inputs?.[0].disabled).to.be.true;
    expect(inputs?.[1].disabled).to.be.true;
    expect(inputs?.[2].disabled).to.be.true;
    expect(inputs?.[3].disabled).to.be.true;
    expect(inputs?.[4].disabled).to.be.true;
    expect(inputs?.[5].disabled).to.be.true;
  });
});
