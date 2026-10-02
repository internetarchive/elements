import { describe, expect, test } from 'vitest';

import {
  HostedFieldContainer,
  HostedFieldName,
} from './hosted-field-container';

/** A stand-in for the badged input that wraps each hosted field. */
class ErrorMarkableDiv extends HTMLElement {
  error = false;
}
customElements.define('test-error-markable', ErrorMarkableDiv);

function setup(): {
  container: HostedFieldContainer;
  wrappers: Record<HostedFieldName, ErrorMarkableDiv>;
  errorContainer: HTMLDivElement;
} {
  const make = (): [ErrorMarkableDiv, HTMLDivElement] => {
    const wrapper = document.createElement(
      'test-error-markable',
    ) as ErrorMarkableDiv;
    const field = document.createElement('div');
    field.append(document.createElement('iframe'));
    wrapper.append(field);
    return [wrapper, field];
  };
  const [numberWrapper, number] = make();
  const [cvvWrapper, cvv] = make();
  const [expirationWrapper, expirationDate] = make();
  const errorContainer = document.createElement('div');

  return {
    container: new HostedFieldContainer({
      number,
      cvv,
      expirationDate,
      errorContainer,
    }),
    wrappers: {
      number: numberWrapper,
      cvv: cvvWrapper,
      expirationDate: expirationWrapper,
    },
    errorContainer,
  };
}

describe('HostedFieldContainer', () => {
  test('returns the container for each field', () => {
    const { container, wrappers } = setup();

    expect(container.fieldFor(HostedFieldName.Number).parentElement).to.equal(
      wrappers.number,
    );
    expect(container.fieldFor(HostedFieldName.CVV).parentElement).to.equal(
      wrappers.cvv,
    );
    expect(
      container.fieldFor(HostedFieldName.ExpirationDate).parentElement,
    ).to.equal(wrappers.expirationDate);
  });

  test('marks and clears errors on the fields it is given', () => {
    const { container, wrappers } = setup();

    container.markFieldErrors([HostedFieldName.Number, HostedFieldName.CVV]);
    expect(wrappers.number.error).to.be.true;
    expect(wrappers.cvv.error).to.be.true;
    expect(wrappers.expirationDate.error).to.be.false;

    container.removeFieldErrors([HostedFieldName.Number]);
    expect(wrappers.number.error).to.be.false;
    expect(wrappers.cvv.error).to.be.true;
  });

  test('shows a default or custom error message and hides it again', () => {
    const { container, errorContainer } = setup();

    container.showErrorMessage();
    expect(errorContainer.textContent).to.equal(
      'Some payment information below is missing or incorrect.',
    );
    expect(errorContainer.style.display).to.equal('block');

    container.showErrorMessage('Card declined');
    expect(errorContainer.textContent).to.equal('Card declined');

    container.hideErrorMessage();
    expect(errorContainer.style.display).to.equal('none');
  });

  test('empties the field containers on reset', () => {
    const { container } = setup();

    container.resetHostedFields();

    expect(
      container.fieldFor(HostedFieldName.Number).childNodes,
    ).to.have.length(0);
    expect(container.fieldFor(HostedFieldName.CVV).childNodes).to.have.length(
      0,
    );
    expect(
      container.fieldFor(HostedFieldName.ExpirationDate).childNodes,
    ).to.have.length(0);
  });
});
