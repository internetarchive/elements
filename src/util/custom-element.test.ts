import { LitElement } from 'lit';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { customElement } from './custom-element';

/** A fresh tag per test, so the shared registry can't leak between them. */
let tagSeq = 0;
const nextTag = (): string => `ia-define-fixture-${(tagSeq += 1)}`;

describe('customElement', () => {
  test('registers the decorated class under the tag', () => {
    const tag = nextTag();

    @customElement(tag)
    class First extends LitElement {}

    expect(customElements.get(tag)).to.equal(First);
  });

  test('upgrades an instance of the registered tag', async () => {
    const tag = nextTag();

    @customElement(tag)
    class Upgradable extends LitElement {}

    const el = document.createElement(tag);
    document.body.append(el);
    await (el as LitElement).updateComplete;

    expect(el).to.be.instanceOf(Upgradable);
    expect(el.shadowRoot).to.exist;
    el.remove();
  });

  /**
   * The case this decorator exists for. Two bundles of the package each carry
   * their own copy of a shared element and both register it, which
   * `customElements.define` rejects. The duplicate has to be dropped rather
   * than thrown, because the throw happens mid-evaluation and takes the rest
   * of the importing bundle with it.
   */
  test('skips a tag another copy already claimed, without throwing', () => {
    const tag = nextTag();

    @customElement(tag)
    class FirstCopy extends LitElement {}

    expect(() => {
      @customElement(tag)
      class SecondCopy extends LitElement {}
      return SecondCopy;
    }).to.not.throw();

    expect(customElements.get(tag)).to.equal(FirstCopy);
  });

  test('leaves a tag claimed by an unrelated element alone', () => {
    const tag = nextTag();
    class Unrelated extends HTMLElement {}
    customElements.define(tag, Unrelated);

    @customElement(tag)
    class Ours extends LitElement {}

    expect(customElements.get(tag)).to.equal(Unrelated);
    expect(customElements.get(tag)).to.not.equal(Ours);
  });

  test('keeps registering later tags after a duplicate is skipped', () => {
    const claimed = nextTag();
    const fresh = nextTag();

    @customElement(claimed)
    class Winner extends LitElement {}

    @customElement(claimed)
    class Loser extends LitElement {}

    @customElement(fresh)
    class AfterTheSkip extends LitElement {}

    expect(customElements.get(claimed)).to.equal(Winner);
    expect(customElements.get(claimed)).to.not.equal(Loser);
    // The real failure mode: a throw here would abort the rest of the module.
    expect(customElements.get(fresh)).to.equal(AfterTheSkip);
  });

  describe('when it skips a tag', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    test('names the tag in a warning, so an older copy winning is visible', () => {
      const tag = nextTag();

      @customElement(tag)
      class FirstCopy extends LitElement {}
      expect(FirstCopy).to.exist;

      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      @customElement(tag)
      class SecondCopy extends LitElement {}
      expect(SecondCopy).to.exist;

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).to.contain(tag);
    });

    test('warns when an unrelated element holds the tag, not just a copy', () => {
      const tag = nextTag();
      class Unrelated extends HTMLElement {}
      customElements.define(tag, Unrelated);

      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      @customElement(tag)
      class Ours extends LitElement {}
      expect(Ours).to.exist;

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).to.contain(tag);
    });

    test('stays quiet when the tag is free', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

      @customElement(nextTag())
      class OnlyCopy extends LitElement {}
      expect(OnlyCopy).to.exist;

      expect(warn).to.not.toHaveBeenCalled();
    });
  });
});
