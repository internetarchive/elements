import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { StyleInputSettings } from '@demo/story-components/story-styles-settings';

import type { IADropdown, OptionInterface } from './ia-dropdown';

import '@demo/story-template';
import './ia-dropdown';
import './ia-icon-label';

// Styles

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Menu background',
    cssVariable: '--dropdownBgColor',
    defaultValue: '#333333',
    inputType: 'color',
  },
  {
    label: 'Text color',
    cssVariable: '--dropdownTextColor',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Caret color',
    cssVariable: '--dropdownCaretColor',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Border color',
    cssVariable: '--dropdownBorderColor',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Selected option background',
    cssVariable: '--dropdownSelectedBgColor',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Selected option text',
    cssVariable: '--dropdownSelectedTextColor',
    defaultValue: '#2c2c2c',
    inputType: 'color',
  },
  {
    label: 'Border radius',
    cssVariable: '--dropdownBorderRadius',
    defaultValue: 4,
    inputType: 'range',
    min: 0,
    max: 20,
    step: 1,
    unit: 'px',
  },
  {
    label: 'Menu offset from button',
    cssVariable: '--dropdownOffsetTop',
    defaultValue: 5,
    inputType: 'range',
    min: 0,
    max: 40,
    step: 1,
    unit: 'px',
  },
];

// Option sets

const MEDIA_OPTIONS: OptionInterface[] = [
  { id: 'all', label: 'All media types' },
  { id: 'texts', label: 'Books & Documents' },
  { id: 'movies', label: 'Video' },
  { id: 'audio', label: 'Audio' },
  { id: 'software', label: 'Software' },
];

// These use in-page fragment URLs so that trying them out doesn't navigate
// away from the demo. Any `url` renders the option as an anchor just the same.
const LINK_OPTIONS: OptionInterface[] = [
  {
    id: 'inlibrary',
    url: '#elem-ia-dropdown',
    label: 'Books to Borrow',
  },
  {
    id: 'texts',
    url: '#elem-ia-dropdown',
    label: 'Texts Collection',
  },
  {
    id: 'web',
    url: '#elem-ia-dropdown',
    label: 'Wayback Machine',
  },
];

@customElement('ia-dropdown-story')
export class IADropdownStory extends LitElement {
  // Story component state

  @state() private displayCaret = true;

  @state() private isDisabled = false;

  @state() private openViaButton = true;

  @state() private closeOnSelect = false;

  @state() private includeSelectedOption = false;

  @state() private closeOnEscape = true;

  @state() private closeOnBackdropClick = true;

  @state() private useLinkOptions = false;

  @state() private selectedOption = 'all';

  @state() private lastSelectedLabel = '(none yet)';

  // Shadow DOM queries

  @query('#custom-list-dropdown') private customDropdown?: IADropdown;

  private get options(): OptionInterface[] {
    return this.useLinkOptions ? LINK_OPTIONS : MEDIA_OPTIONS;
  }

  private get selectedLabel(): string {
    const match = this.options.find((o) => o.id === this.selectedOption);
    return (match?.label as string) ?? 'Select one';
  }

  render() {
    return html`
      <story-template
        elementTag="ia-dropdown"
        elementClassName="IADropdown"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{ settings: styleInputSettings }}
      >
        <div slot="demo">
          <div class="demo-row">
            <ia-dropdown
              id="basic-dropdown"
              ?displayCaret=${this.displayCaret}
              ?isDisabled=${this.isDisabled}
              ?openViaButton=${this.openViaButton}
              ?closeOnSelect=${this.closeOnSelect}
              ?includeSelectedOption=${this.includeSelectedOption}
              ?closeOnEscape=${this.closeOnEscape}
              ?closeOnBackdropClick=${this.closeOnBackdropClick}
              .selectedOption=${this.selectedOption}
              .options=${this.options}
              @optionSelected=${this.handleOptionSelected}
            >
              <span slot="dropdown-label">${this.selectedLabel}</span>
            </ia-dropdown>
          </div>

          <p class="demo-readout">
            Last selected: <strong>${this.lastSelectedLabel}</strong>
          </p>

          <hr />

          <p class="demo-caption">
            A custom list passed in via <code>slot="list"</code>, opened by an
            external handler. Uses <code>ia-icon-label</code> for the button
            content.
          </p>
          <div class="demo-row">
            <ia-dropdown
              id="custom-list-dropdown"
              isCustomList
              hasCustomClickHandler
              displayCaret
              closeOnBackdropClick
              @click=${this.toggleCustomDropdown}
            >
              <ia-icon-label slot="dropdown-label">
                <div slot="icon">${this.plusIcon}</div>
                My Lists
              </ia-icon-label>
              <ul slot="list" class="custom-list">
                <li>Listen Later</li>
                <li>Favorites</li>
                <li>Read in 2026</li>
              </ul>
            </ia-dropdown>
          </div>
        </div>

        <form slot="settings">
          <table>
            <tr>
              <td><label for="settings__options">Option set</label></td>
              <td>
                <select
                  id="settings__options"
                  @change=${this.handleOptionSetChanged}
                >
                  <option value="media" selected>Media types (buttons)</option>
                  <option value="links">Archive.org links (anchors)</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colspan="2"><hr /></td>
            </tr>
            ${this.checkboxRow(
              'display-caret',
              'Display caret',
              'displayCaret',
            )}
            ${this.checkboxRow('disabled', 'Disabled', 'isDisabled')}
            ${this.checkboxRow(
              'open-via-button',
              'Open via button',
              'openViaButton',
            )}
            ${this.checkboxRow(
              'close-on-select',
              'Close on select',
              'closeOnSelect',
            )}
            ${this.checkboxRow(
              'include-selected',
              'Include selected option in menu',
              'includeSelectedOption',
            )}
            ${this.checkboxRow(
              'close-on-escape',
              'Close on Escape',
              'closeOnEscape',
            )}
            ${this.checkboxRow(
              'close-on-backdrop',
              'Close on backdrop click',
              'closeOnBackdropClick',
            )}
          </table>
        </form>

        <div slot="usage-notes">
          <p>
            Options are supplied as an array of
            <code>OptionInterface</code> objects. An option with a
            <code>url</code> renders as an anchor; otherwise it renders as a
            button. Selecting one emits an <code>optionSelected</code> event and
            calls the option's own <code>selectedHandler</code>, if it has one.
          </p>
          <p>
            With <code>openViaButton</code> off, the main button no longer
            toggles the menu and the caret becomes a separate button, so
            <code>displayCaret</code> needs to be on for the menu to be
            reachable.
          </p>
          <p>
            Set <code>isCustomList</code> to replace the generated option list
            with your own markup in <code>slot="list"</code>. Pair it with
            <code>hasCustomClickHandler</code> when the host wants to own the
            open/close behavior, as in the second example above.
          </p>
        </div>
      </story-template>
    `;
  }

  // Templates

  private get plusIcon() {
    return html`<svg viewBox="0 0 100 100" style="width: 15px; height: 15px;">
      <path
        fill="currentColor"
        d="m56 23v22h22v11h-22v22h-11l-.001-22h-21.999v-11h21.999l.001-22z"
      />
    </svg>`;
  }

  private checkboxRow(
    id: string,
    label: string,
    prop:
      | 'displayCaret'
      | 'isDisabled'
      | 'openViaButton'
      | 'closeOnSelect'
      | 'includeSelectedOption'
      | 'closeOnEscape'
      | 'closeOnBackdropClick',
  ) {
    return html`
      <tr>
        <td><label for="settings__${id}">${label}</label></td>
        <td>
          <input
            type="checkbox"
            id="settings__${id}"
            .checked=${this[prop]}
            @change=${(e: Event) => {
              this[prop] = (e.target as HTMLInputElement).checked;
            }}
          />
        </td>
      </tr>
    `;
  }

  private get exampleUsage(): string {
    return `<ia-dropdown
  displayCaret
  closeOnSelect
  .selectedOption=\${this.selectedId}
  .options=\${[
    { id: 'all', label: 'All media types' },
    { id: 'texts', label: 'Books & Documents' },
  ]}
  @optionSelected=\${this.handleSelection}
>
  <span slot="dropdown-label">\${this.selectedLabel}</span>
</ia-dropdown>`;
  }

  // Event handlers

  private handleOptionSelected(e: CustomEvent<{ option: OptionInterface }>) {
    this.selectedOption = e.detail.option.id;
    this.lastSelectedLabel = e.detail.option.label as string;
  }

  private handleOptionSetChanged(e: Event) {
    this.useLinkOptions = (e.target as HTMLSelectElement).value === 'links';
    this.selectedOption = this.options[0].id;
    this.lastSelectedLabel = '(none yet)';
  }

  private toggleCustomDropdown() {
    if (this.customDropdown) {
      this.customDropdown.open = !this.customDropdown.open;
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      .demo-row {
        display: flex;
        align-items: center;
        gap: 20px;
        min-height: 40px;
        padding: 10px;
        background: #2c2c2c;
        border-radius: 4px;
      }

      .demo-readout {
        font-size: 1.4rem;
      }

      .demo-caption {
        font-size: 1.4rem;
      }

      .custom-list {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .custom-list li {
        padding: 5px 10px;
        white-space: nowrap;
        cursor: pointer;
      }

      .custom-list li:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    `;
  }
}
