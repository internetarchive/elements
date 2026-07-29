import { describe, expect, test } from 'vitest';
import { aTimeout, fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';

import type { IADropdown, OptionInterface } from './ia-dropdown';
import './ia-dropdown';

describe('IADropdown', () => {
  test('is closed at default', async () => {
    const el = await fixture<IADropdown>(html`<ia-dropdown></ia-dropdown>`);
    expect(el.open).to.be.false;
  });

  test('can display caret as option', async () => {
    const el = await fixture<IADropdown>(html`<ia-dropdown></ia-dropdown>`);
    expect(el.displayCaret).to.be.false;

    el.displayCaret = true;
    await el.updateComplete;

    expect(el.displayCaret).to.be.true;

    const caret = el.shadowRoot?.querySelector('span.caret');
    expect(caret).to.exist;
  });

  test('can be disabled', async () => {
    const el = await fixture<IADropdown>(html`<ia-dropdown></ia-dropdown>`);
    expect(el.isDisabled).to.be.false;

    el.isDisabled = true;
    await el.updateComplete;

    expect(el.isDisabled).to.be.true;

    const mainButton = el.shadowRoot?.querySelector(
      'button.click-main',
    ) as HTMLButtonElement;
    expect(mainButton.disabled).to.be.true;
  });

  test('does not set hasCustomClickHandler at default', async () => {
    const el = await fixture<IADropdown>(html`<ia-dropdown></ia-dropdown>`);
    expect(el.hasCustomClickHandler).to.be.false;
  });

  test('when `hasCustomClickHandler` true, default toggles disabled', async () => {
    const el = await fixture<IADropdown>(
      html`<ia-dropdown displaycaret hascustomclickhandler></ia-dropdown>`,
    );

    const mainButton = el.shadowRoot?.querySelector(
      'button.click-main',
    ) as HTMLButtonElement;
    mainButton?.click();
    await el.updateComplete;
    // Should remain closed from clicking main button
    expect(el.open).to.be.false;

    (el.shadowRoot?.querySelector('.caret') as HTMLElement)?.click();
    await el.updateComplete;
    // Should open from clicking caret
    expect(el.open).to.be.false;
  });

  describe('Slotted caret', () => {
    test('can display slotted caret', async () => {
      const svgCaret = html`<svg
        slot="caret-down"
        class="caret-down-svg slotted"
        style="height: 10px; width: 10px;"
        height="10"
        viewBox="0 0 10 10"
        width="10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m5 8 5-5h-10z" fill="" fill-rule="evenodd" />
      </svg>`;

      const el = await fixture<IADropdown>(
        html`<ia-dropdown displayCaret> ${svgCaret} </ia-dropdown>`,
      );

      expect(el.displayCaret).to.be.true;

      const caretDown = el.querySelector('.slotted') as HTMLElement;
      expect(caretDown).to.exist;
    });
  });

  describe('Toggling', () => {
    test('has `toggleOptions` function to toggle open dropdown options', async () => {
      const el = await fixture<IADropdown>(
        html`<ia-dropdown displayCaret></ia-dropdown>`,
      );

      expect(el.open).to.be.false;
      el.toggleOptions();
      await el.updateComplete;

      expect(el.open).to.be.true;
    });

    test('caret, when displayed, changes to point up when dropdown is opened', async () => {
      const el = await fixture<IADropdown>(
        html`<ia-dropdown displayCaret></ia-dropdown>`,
      );

      expect(el.displayCaret).to.be.true;
      const caret = el.shadowRoot?.querySelector('span.caret') as HTMLElement;
      const caretDown = caret?.querySelector('.caret-down') as HTMLElement;
      const caretUp = caret?.querySelector('.caret-up') as HTMLElement;

      expect(caretDown.hidden).to.be.false;
      expect(caretUp.hidden).to.be.true;

      const trigger = el.shadowRoot?.querySelector('button.click-main');
      expect(trigger).to.exist;

      (trigger as HTMLElement)?.click();

      await el.updateComplete;

      expect(caretDown.hidden).to.be.true;
      expect(caretUp.hidden).to.be.false;
      expect(el.open).to.be.true;
    });

    test('can optionally disable toggling via main button', async () => {
      const el = await fixture<IADropdown>(
        html`<ia-dropdown displayCaret .openViaButton=${false}></ia-dropdown>`,
      );

      expect(el.open).to.be.false;
      const mainButton = el.shadowRoot?.querySelector(
        'button.click-main',
      ) as HTMLButtonElement;
      mainButton?.click();
      await el.updateComplete;

      // Should remain closed from clicking main button
      expect(el.open).to.be.false;

      // But clicking on the caret should open it
      (el.shadowRoot?.querySelector('.caret') as HTMLElement)?.click();
      await el.updateComplete;
      expect(el.open).to.be.true;
    });

    test('can be toggled via keyboard interaction on the main button when active', async () => {
      const el = await fixture<IADropdown>(
        html`<ia-dropdown displayCaret></ia-dropdown>`,
      );

      const enterKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      const spaceKeyEvent = new KeyboardEvent('keydown', { key: ' ' });

      const mainButton = el.shadowRoot?.querySelector(
        '.click-main',
      ) as HTMLElement;
      expect(mainButton).to.exist;
      expect(el.open).to.be.false;

      mainButton?.dispatchEvent(spaceKeyEvent);
      await el.updateComplete;
      expect(el.open).to.be.true;

      mainButton?.dispatchEvent(enterKeyEvent);
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    test('can be toggled via keyboard interaction on the caret when main button is not active', async () => {
      const el = await fixture<IADropdown>(
        html`<ia-dropdown displayCaret .openViaButton=${false}></ia-dropdown>`,
      );

      const enterKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      const spaceKeyEvent = new KeyboardEvent('keydown', { key: ' ' });

      const caret = el.shadowRoot?.querySelector('.caret') as HTMLElement;
      expect(caret).to.exist;
      expect(el.open).to.be.false;

      caret?.dispatchEvent(enterKeyEvent);
      await el.updateComplete;
      expect(el.open).to.be.true;

      caret?.dispatchEvent(spaceKeyEvent);
      await el.updateComplete;
      expect(el.open).to.be.false;
    });
  });

  describe('Options', () => {
    test('receives a list of options', async () => {
      const options: OptionInterface[] = [
        {
          url: 'archive.org',
          label: html`<p class="foo">foo</p>`,
          id: 'link-example',
        },
      ];
      const el = await fixture<IADropdown>(
        html`<ia-dropdown .options=${options}></ia-dropdown>`,
      );

      expect(el.options.length).to.equal(1);
      const list = el.shadowRoot?.querySelector('ul');

      expect(list).to.exist;
      expect(list?.querySelectorAll('li').length).to.equal(1);
    });

    test('On Option Selected: fires custom event `optionSelected` & option callback `selectedHandler` if available', async () => {
      let optionCallbackReceived = false;
      const el = await fixture<IADropdown>(
        html`<ia-dropdown
          .options=${[
            {
              selectedHandler: () => {
                optionCallbackReceived = true;
              },
              label: 'beep',
              id: 'callback-example',
            },
          ] as OptionInterface[]}
        ></ia-dropdown>`,
      );

      let thisOptionSelected;

      const eventListener = (e: CustomEvent) => {
        thisOptionSelected = e.detail.option as OptionInterface;
      };
      el.addEventListener('optionSelected', eventListener as EventListener);

      expect(thisOptionSelected).to.be.undefined;
      expect(optionCallbackReceived).to.be.false;

      (
        el.shadowRoot?.querySelector('button.click-main') as HTMLButtonElement
      )?.click();
      await el.updateComplete;
      expect(el.open).to.be.true;

      const list = el.shadowRoot?.querySelector('ul');
      const firstOption = list?.querySelector('li');
      const firstOptionTarget = firstOption?.querySelector('button');
      expect(firstOptionTarget).to.exist;

      firstOptionTarget?.click();

      await el.updateComplete;
      expect(optionCallbackReceived).to.be.true;
      expect(el.selectedOption).to.equal('callback-example');
      expect(thisOptionSelected).to.exist;
      expect(thisOptionSelected && thisOptionSelected['selectedHandler']).to
        .exist;
      expect(thisOptionSelected && thisOptionSelected['id']).to.equal(
        'callback-example',
      );
      expect(thisOptionSelected && thisOptionSelected['label']).to.equal(
        'beep',
      );
    });

    test('Can optionally close dropdown when an option is selected', async () => {
      const options: OptionInterface[] = [
        {
          label: html`<p class="foo">foo</p>`,
          id: 'foo',
        },
      ];
      const el = await fixture<IADropdown>(
        html`<ia-dropdown closeOnSelect .options=${options}></ia-dropdown>`,
      );

      expect(el.open).to.be.false;

      const list = el.shadowRoot?.querySelector('ul');
      expect(list).to.exist;
      expect(list?.querySelectorAll('li').length).to.equal(1);

      const mainButton = el.shadowRoot?.querySelector(
        'button.click-main',
      ) as HTMLButtonElement;
      mainButton?.click();
      await el.updateComplete;
      expect(el.open).to.be.true;

      (list?.querySelector('li > button') as HTMLButtonElement)?.click();
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    test('can set `optionGroup` namespace', async () => {
      const el = await fixture<IADropdown>(
        html`<ia-dropdown .optionGroup=${'foobarz'}></ia-dropdown>`,
      );

      expect(el.optionGroup).to.equal('foobarz');

      const srOnly = el.shadowRoot?.querySelector(
        'button.click-main span.sr-only',
      );
      expect(srOnly?.innerHTML).to.contain('foobarz');
    });

    test('Only show available options in dropdown', async () => {
      const el = await fixture<IADropdown>(
        html`<ia-dropdown
          .options=${[
            {
              selectedHandler: () => {},
              label: 'beep',
              id: 'selected-example',
            },
            {
              selectedHandler: () => {},
              label: 'bloop',
              id: 'not-selected-example',
            },
          ] as OptionInterface[]}
          .selectedOption=${'selected-example'}
        ></ia-dropdown>`,
      );

      expect(el.availableOptions.length).to.equal(1);

      el.selectedOption = '';
      await el.updateComplete;
      expect(el.availableOptions.length).to.equal(2);
    });

    test('Can optionally show all options in dropdown, including selected', async () => {
      const el = await fixture<IADropdown>(
        html`<ia-dropdown
          includeSelectedOption
          .options=${[
            {
              selectedHandler: () => {},
              label: 'beep',
              id: 'selected-example',
            },
            {
              selectedHandler: () => {},
              label: 'bloop',
              id: 'not-selected-example',
            },
          ] as OptionInterface[]}
          .selectedOption=${'selected-example'}
        ></ia-dropdown>`,
      );

      expect(el.availableOptions.length).to.equal(2);

      el.selectedOption = '';
      await el.updateComplete;
      expect(el.availableOptions.length).to.equal(2);
    });
  });

  describe('Keyboard', () => {
    test('ignores Escape key by default', async () => {
      const el = await fixture<IADropdown>(
        html`<ia-dropdown .options=${[]}></ia-dropdown>`,
      );

      expect(el.open).to.be.false;

      const mainButton = el.shadowRoot?.querySelector(
        'button.click-main',
      ) as HTMLButtonElement;
      mainButton?.click();
      await el.updateComplete;
      expect(el.open).to.be.true;

      const escapeKeyEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeKeyEvent);
      await el.updateComplete;
      expect(el.open).to.be.true;
    });

    test('closes on Escape key', async () => {
      const el = await fixture<IADropdown>(
        html`<ia-dropdown .closeOnEscape=${true} .options=${[]}>
        </ia-dropdown>`,
      );

      expect(el.open).to.be.false;

      const mainButton = el.shadowRoot?.querySelector(
        'button.click-main',
      ) as HTMLButtonElement;
      mainButton?.click();
      await el.updateComplete;
      expect(el.open).to.be.true;

      const escapeKeyEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeKeyEvent);
      await aTimeout(50);
      expect(el.open).to.be.false;
    });
  });

  test('can display slotted options as custom list', async () => {
    const customList = html`<li slot="list">
      <div class="foo">foo</div>
    </li>`;
    const el = await fixture<IADropdown>(
      html`<ia-dropdown ?isCustomlist=${true}> ${customList} </ia-dropdown>`,
    );
    expect(el.isCustomList).to.be.true;

    const slot = el.shadowRoot?.querySelector('slot[name=list]');
    expect(slot).to.exist;
    const elements = (slot as HTMLSlotElement)?.assignedElements();
    expect(elements).to.exist;
    expect(elements?.length).to.equal(1);
    const li = elements?.[0] as HTMLLIElement;
    expect(li).to.exist;
    expect(li?.querySelector('.foo')).to.exist;
  });
});
