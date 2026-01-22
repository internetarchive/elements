import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { StyleInputSettings } from '@demo/story-template';
import {
  IAComboBoxBehavior,
  IAComboBoxFilterOption,
  IAComboBoxFilterPreset,
  IAComboBoxOption,
} from './models';

import countries from './200-countries.json';

import '@demo/story-template';
import './ia-combo-box';

// Styles

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Width',
    cssVariable: '--combo-box-width',
    defaultValue: '250px',
    inputType: 'text',
  },
  {
    label: 'Padding',
    cssVariable: '--combo-box-padding',
    defaultValue: '5px',
    inputType: 'text',
  },
];

// Option sets

const COLOR_OPTIONS: IAComboBoxOption[] = [
  { id: 'red', text: 'Red' },
  { id: 'orange', text: 'Orange' },
  { id: 'yellow', text: 'Yellow' },
  { id: 'green', text: 'Green' },
  { id: 'blue', text: 'Blue' },
  { id: 'indigo', text: 'Indigo' },
  { id: 'violet', text: 'Violet' },
];

const COLOR_OPTIONS_WITH_SWATCHES: IAComboBoxOption[] = COLOR_OPTIONS.map(
  (opt) => ({
    ...opt,
    content: html` <span style="display: flex; align-items: center">
      <span style="flex: 1">${opt.text}</span>
      <div style="width: 15px; height: 15px; background:${opt.id}"></div>
    </span>`,
  }),
);

const COUNTRY_OPTIONS: IAComboBoxOption[] = countries.map((c) => ({
  id: c.name,
  text: c.name,
}));

const COUNTRY_OPTIONS_WITH_CODES: IAComboBoxOption[] = countries.map((c) => ({
  id: c.name,
  text: c.name,
  // To demonstrate custom option content
  content: html`<span>${c.flag}</span>&nbsp;<span>${c.name}</span>`,
}));

// Component defaults

const DEFAULT_BEHAVIOR = 'list';
const DEFAULT_LABEL = 'Choices';
const DEFAULT_PLACEHOLDER = 'Select an option...';
const DEFAULT_MAX_AUTOCOMPLETE_ENTRIES = 50;
const DEFAULT_FILTERING_TYPE = 'substring';

@customElement('ia-combo-box-story')
export class IAComboBoxStory extends LitElement {
  // Story component state

  @state()
  private options = COUNTRY_OPTIONS;

  @state()
  private behavior: IAComboBoxBehavior = DEFAULT_BEHAVIOR;

  @state()
  private label = DEFAULT_LABEL;

  @state()
  private placeholder = DEFAULT_PLACEHOLDER;

  @state()
  private maxAutocompleteEntries = DEFAULT_MAX_AUTOCOMPLETE_ENTRIES;

  @state()
  private filterFn: IAComboBoxFilterOption = DEFAULT_FILTERING_TYPE;

  @state()
  private caseSensitive = false;

  @state()
  private shouldSort = false;

  @state()
  private wrapArrowKeys = true;

  @state()
  private clearable = true;

  @state()
  private disabled = false;

  @state()
  private announcerText = '';

  // Shadow DOM queries

  @query('#settings__options')
  private optionSetSelect!: HTMLInputElement;

  @query('#settings__behavior')
  private behaviorSelect!: HTMLSelectElement;

  @query('#settings__label')
  private labelInput!: HTMLInputElement;

  @query('#settings__placeholder')
  private placeholderInput!: HTMLInputElement;

  @query('#settings__max-entries')
  private maxAutocompleteInput!: HTMLInputElement;

  @query('#settings__filter-fn')
  private filterFnSelect!: HTMLSelectElement;

  @query('#settings__case-sensitive')
  private caseSensitiveCheck!: HTMLInputElement;

  @query('#settings__sort')
  private sortCheck!: HTMLInputElement;

  @query('#settings__wrap')
  private wrapArrowKeysCheck!: HTMLInputElement;

  @query('#settings__clearable')
  private clearableCheck!: HTMLInputElement;

  @query('#settings__disabled')
  private disabledCheck!: HTMLInputElement;

  @query('#settings__custom-content')
  private customContentCheck!: HTMLInputElement;

  render() {
    return html`
      <story-template
        elementTag="ia-combo-box"
        .exampleUsage=${this.exampleUsage}
        .styleInputData=${{ settings: styleInputSettings }}
        labs
      >
        <div slot="demo">
          <ia-combo-box
            .options=${this.options}
            .behavior=${this.behavior}
            .placeholder=${this.placeholder}
            .maxAutocompleteEntries=${this.maxAutocompleteEntries}
            .filter=${this.filterFn}
            ?case-sensitive=${this.caseSensitive}
            ?sort=${this.shouldSort}
            ?wrap-arrow-keys=${this.wrapArrowKeys}
            ?clearable=${this.clearable}
            ?disabled=${this.disabled}
            @change=${this.handleComboBoxChange}
          >
            ${this.label}
          </ia-combo-box>
          <div id="announcer">${this.announcerText}</div>
        </div>

        <form slot="settings">
          <table>
            <tr>
              <td><label for="settings__options">Option set</label></td>
              <td>
                <select id="settings__options">
                  <option value="colors">Colors</option>
                  <option value="countries" selected>Countries</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label for="settings__behavior">Behavior</label></td>
              <td>
                <select id="settings__behavior">
                  <option value="select-only">Select Only</option>
                  <option value="list" selected>List</option>
                  <option value="freeform">Freeform</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label for="settings__label">Label</label></td>
              <td>
                <input type="text" .value=${this.label} id="settings__label" />
              </td>
            </tr>
            <tr>
              <td><label for="settings__placeholder">Placeholder</label></td>
              <td>
                <input
                  type="text"
                  value=${DEFAULT_PLACEHOLDER}
                  id="settings__placeholder"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__max-entries">
                  Max autocomplete entries
                </label>
              </td>
              <td>
                <input
                  type="number"
                  value=${DEFAULT_MAX_AUTOCOMPLETE_ENTRIES}
                  min="0"
                  id="settings__max-entries"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__filter-fn">Filtering function</label>
              </td>
              <td>
                <select
                  id="settings__filter-fn"
                  ?disabled=${this.behavior === 'select-only'}
                >
                  <option value="all">All</option>
                  <option value="prefix">Prefix</option>
                  <option value="suffix">Suffix</option>
                  <option value="substring" selected>Substring</option>
                  <option value="subsequence">Subsequence</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__case-sensitive">
                  Case sensitive filtering?
                </label>
              </td>
              <td><input type="checkbox" id="settings__case-sensitive" /></td>
            </tr>
            <tr>
              <td><label for="settings__sort">Sort items?</label></td>
              <td><input type="checkbox" id="settings__sort" /></td>
            </tr>
            <tr>
              <td>
                <label for="settings__wrap">Wrap arrow-key navigation?</label>
              </td>
              <td><input type="checkbox" checked id="settings__wrap" /></td>
            </tr>
            <tr>
              <td><label for="settings__clearable">Show clear button?</label></td>
              <td><input type="checkbox" checked id="settings__clearable" /></td>
            </tr>
            <tr>
              <td><label for="settings__disabled">Disabled?</label></td>
              <td><input type="checkbox" id="settings__disabled" /></td>
            </tr>
            <tr>
              <td>
                <label for="settings__custom-content">
                  Show custom option content?
                </label>
              </td>
              <td><input type="checkbox" id="settings__custom-content" /></td>
            </tr>
          </table>
          <button type="submit" @click=${this.applySettings}>Apply</button>
        </form>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    const { placeholder, behavior, maxAutocompleteEntries, filterFn } = this;

    const bindings: Record<string, string | boolean> = {
      behavior: behavior ? `"${behavior}"` : '',
      placeholder: placeholder ? `"${placeholder}"` : '',
      'max-autocomplete-entries': maxAutocompleteEntries
        ? `"${maxAutocompleteEntries}"`
        : '',
      filter: filterFn && filterFn !== 'substring' ? `"${filterFn}"` : '',
      'case-sensitive': this.caseSensitive,
      sort: this.shouldSort,
      'wrap-arrow-keys': this.wrapArrowKeys,
      clearable: this.clearable,
      disabled: this.disabled,
    };

    const bindingsStr = Object.entries(bindings)
      .map(([key, val]) => {
        if (!val) return '';
        if (val === true) return key;
        return val ? `${key}=${val}` : '';
      })
      .join('\n  ');

    return `
      <ia-combo-box
        .options=\${[
          { id: 'foo', text: 'Foo Option' },
          { id: 'bar', text: 'Bar Option' },
          ...
        ]}
        ${bindingsStr}
      >${this.label}</ia-combo-box>
    `
      .replace(/\n\s*\n/g, '\n')
      .replace(/\n {6}/g, '\n');
  }

  /**
   * Updates the story properties based on the new setting selections
   */
  private applySettings(e: Event): void {
    e.preventDefault();

    this.updateOptions();
    this.behavior = this.behaviorSelect.value as IAComboBoxBehavior;
    this.label = this.labelInput.value;
    this.placeholder = this.placeholderInput.value;
    this.maxAutocompleteEntries = Number(this.maxAutocompleteInput.value);
    this.filterFn = this.filterFnSelect.value as IAComboBoxFilterPreset;
    this.caseSensitive = this.caseSensitiveCheck.checked;
    this.shouldSort = this.sortCheck.checked;
    this.wrapArrowKeys = this.wrapArrowKeysCheck.checked;
    this.clearable = this.clearableCheck.checked;
    this.disabled = this.disabledCheck.checked;
  }

  /**
   * Updates which options are shown, depending on the option set chosen and
   * whether custom content should be included.
   */
  private updateOptions(): void {
    switch (this.optionSetSelect.value) {
      case 'colors':
        this.options = this.customContentCheck.checked
          ? COLOR_OPTIONS_WITH_SWATCHES
          : COLOR_OPTIONS;
        break;
      case 'countries':
        this.options = this.customContentCheck.checked
          ? COUNTRY_OPTIONS_WITH_CODES
          : COUNTRY_OPTIONS;
        break;
      default:
        this.options = [];
    }
  }

  /**
   * Handler for the combo box `change` event, showing the updated value below it.
   */
  private handleComboBoxChange(e: CustomEvent<string | null>): void {
    this.announcerText = `New value is: ${e.detail}`;
  }

  static get styles(): CSSResultGroup {
    return css`
      #announcer {
        margin-top: 10px;
      }
    `;
  }
}
