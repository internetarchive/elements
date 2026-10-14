import { describe, expect, test } from 'vitest';
import { truncateScreenname } from './truncate-screenname';
import { html } from 'lit';
import { fixture } from '@open-wc/testing-helpers';

describe('truncateScreenname', () => {
  test('leaves a screenname with fewer than 40 chars unchanged', () => {
    expect(truncateScreenname('test')).to.equal('test');
  });

  test('correctly truncates a longer screenname', async () => {
    const truncatedHTML = truncateScreenname(
      'test567891123456789212345678931234567894123456789',
    );
    expect(truncatedHTML).to.exist;

    const el = (await fixture(html`${truncatedHTML}`)) as HTMLSpanElement;
    expect(el).to.exist;
    expect(el.nodeName.toLowerCase()).to.equal('span');
    expect(el.title).to.equal(
      'test567891123456789212345678931234567894123456789',
    );
    expect(el.textContent).to.equal(
      'test567891123456789212345678931234567894...',
    );
  });

  test('can handle a falsey input', () => {
    expect(truncateScreenname('')).to.equal('');
  });
});
