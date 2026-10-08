import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { ServiceTemplate } from '@demo/service-template';
import type { FieldParsersStory } from './field-parsers-story';
import './field-parsers-story';

function parts(el: FieldParsersStory) {
  const root = el.shadowRoot!;
  return {
    select: root.querySelector('select') as HTMLSelectElement,
    input: root.querySelector('input[type="text"]') as HTMLInputElement,
    form: root.querySelector('form') as HTMLFormElement,
    call: () => root.querySelector('.call')?.textContent,
    output: () => root.querySelector('.output')?.textContent,
  };
}

describe('field-parsers story', () => {
  test('shows no result until something is parsed', async () => {
    const el = await fixture<FieldParsersStory>(
      html`<field-parsers-story></field-parsers-story>`,
    );

    expect(parts(el).output()).to.be.undefined;
  });

  test('parses the typed value with the chosen parser', async () => {
    const el = await fixture<FieldParsersStory>(
      html`<field-parsers-story></field-parsers-story>`,
    );
    const { input, form, call, output } = parts(el);

    input.value = '1:02:03.5';
    input.dispatchEvent(new Event('input'));
    form.requestSubmit();
    await el.updateComplete;

    expect(call()).to.equal('DurationParser.shared.parseValue("1:02:03.5")');
    expect(output()).to.equal('3723.5');
  });

  test('reports a value the parser cannot read as undefined', async () => {
    const el = await fixture<FieldParsersStory>(
      html`<field-parsers-story></field-parsers-story>`,
    );
    const { input, form, output } = parts(el);

    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    form.requestSubmit();
    await el.updateComplete;

    expect(output()).to.equal('undefined');
  });

  test('switching parser loads that parser’s sample and clears the result', async () => {
    const el = await fixture<FieldParsersStory>(
      html`<field-parsers-story></field-parsers-story>`,
    );
    const { select, input, form, output } = parts(el);
    form.requestSubmit();
    await el.updateComplete;
    expect(output()).to.exist;

    select.value = 'BooleanParser';
    select.dispatchEvent(new Event('change'));
    await el.updateComplete;

    expect(input.value).to.equal('true');
    expect(output()).to.be.undefined;
  });

  test('a sample button fills the input and parses it', async () => {
    const el = await fixture<FieldParsersStory>(
      html`<field-parsers-story></field-parsers-story>`,
    );

    (el.shadowRoot!.querySelector('.sample') as HTMLButtonElement).click();
    await el.updateComplete;

    expect(parts(el).output()).to.equal('3723.5');
  });

  test('shows the parsers’ typed API', async () => {
    const el = await fixture<FieldParsersStory>(
      html`<field-parsers-story></field-parsers-story>`,
    );

    const template = el.shadowRoot!.querySelector(
      'service-template',
    ) as ServiceTemplate;

    expect(template.apiSource).to.include('interface FieldParserInterface');
    expect(template.apiSource).to.include('class DurationParser');
  });
});
