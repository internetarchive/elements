import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import { AdvancedSearchStyle, SearchRequestedDetail } from './models';

import '@demo/story-template';
import './ia-dropdown-search-bar';

// Styles

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Bar height',
    cssVariable: '--ia-theme-search-bar-height',
    defaultValue: '30px',
    inputType: 'text',
  },
  {
    label: 'Bar width',
    cssVariable: '--ia-theme-search-bar-width',
    defaultValue: '300px',
    inputType: 'text',
  },
  {
    label: 'Padding',
    cssVariable: '--ia-theme-padding-sm',
    defaultValue: '5px',
    inputType: 'text',
  },
];

// Component defaults

const DEFAULT_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'texts', label: 'Books/Documents' },
  { id: 'fulltext', label: 'Text Contents' },
  { id: 'radio', label: 'Radio' },
  { id: 'tv', label: 'TV' },
  { id: 'movies', label: 'Video' },
  { id: 'audio', label: 'Audio' },
  { id: 'software', label: 'Software' },
  { id: 'image', label: 'Images' },
  { id: 'etree', label: 'Live Music' },
  { id: 'collection', label: 'Collections' },
  { id: 'data', label: 'Data' },
  { id: 'web', label: 'Web Sites' },
];

const DEFAULT_PLACEHOLDER = 'Search';
const DEFAULT_ADVANCED_SEARCH_STYLE = 'link' as AdvancedSearchStyle;

@customElement('ia-dropdown-search-bar-story')
export class IADropdownSearchBarStory extends LitElement {
  // Story component state

  @state()
  private placeholder = DEFAULT_PLACEHOLDER;

  @state()
  private advancedSearchStyle = DEFAULT_ADVANCED_SEARCH_STYLE;

  @state()
  private hideDropdown = false;

  @state()
  private loading = false;

  @state()
  private announcerText = '';

  // Shadow DOM queries

  @query('#settings__placeholder')
  private placeholderInput!: HTMLInputElement;

  @query('#settings__advanced-search-style')
  private advancedSearchStyleSelect!: HTMLSelectElement;

  @query('#settings__hide-dropdown')
  private hideDropdownCheck!: HTMLInputElement;

  @query('#settings__loading')
  private loadingCheck!: HTMLInputElement;

  render() {
    return html`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{ settings: styleInputSettings }}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            navBaseUrl=${''}
            .categories=${DEFAULT_CATEGORIES}
            .placeholder=${this.placeholder}
            .advancedSearchStyle=${this.advancedSearchStyle}
            ?hideDropdown=${this.hideDropdown}
            ?loading=${this.loading}
            @searchRequested=${this.handleSearchRequested}
          ></ia-dropdown-search-bar>
          <span id="announcer">${this.announcerText}</span>
        </div>

        <form slot="settings">
          <table>
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
              <td><label for="settings__advanced-search-style">Advanced Search style</label></td>
              <td>
                <select id="settings__advanced-search-style">
                  <option value="link" selected>Link</option>
                  <option value="dropdown">Dropdown option</option>
                  <option value="none">None</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label for="settings__hide-dropdown">Hide dropdown</label></td>
              <td><input type="checkbox" id="settings__hide-dropdown" /></td>
            </tr>
            <tr>
              <td><label for="settings__loading">Loading</label></td>
              <td><input type="checkbox" id="settings__loading" /></td>
            </tr>
          </table>
          <button type="submit" @click=${this.applySettings}>Apply</button>
        </form>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    const { placeholder, advancedSearchStyle } = this;
    const bindings: Record<string, string | boolean> = {
      placeholder: placeholder ? `"${placeholder}"` : '',
      advancedSearchStyle: advancedSearchStyle ? `"${advancedSearchStyle}"` : '',
      hideDropdown: this.hideDropdown,
      loading: this.loading,
    };

    const bindingsStr = Object.entries(bindings)
      .map(([key, val]) => {
        if (!val) return '';
        if (val === true) return key;
        return `${key}=${val}`;
      })
      .join('\n  ');

    return `
      <ia-dropdown-search-bar
        .categories=\${[
          { id: 'foo', label: 'Foo Option' },
          { id: 'bar', label: 'Bar Option' },
          // ...
        ]}
        ${bindingsStr}
      >
      </ia-dropdown-search-bar>
    `
      .replace(/\n\s*\n/g, '\n')
      .replace(/\n {6}/g, '\n');
  }

  /**
   * Updates the story properties based on the new setting selections
   */
  private applySettings(e: Event): void {
    e.preventDefault();

    this.placeholder = this.placeholderInput.value;
    this.advancedSearchStyle = this.advancedSearchStyleSelect.value as AdvancedSearchStyle;
    this.hideDropdown = this.hideDropdownCheck.checked;
    this.loading = this.loadingCheck.checked;
  }

  /**
   * Handler for the bar's `searchRequested` event, showing the emitted category & query
   */
  private handleSearchRequested(e: CustomEvent<SearchRequestedDetail>): void {
    this.announcerText =
      `Category ID "${e.detail.category}" / Query "${e.detail.query}"`;
  }

  static get styles(): CSSResultGroup {
    return css`
      #announcer {
        margin-left: 20px;
      }

      table {
        margin-bottom: 5px;
      }

      tr:nth-child(even) {
        background-color: rgba(0, 0, 0, 0.02);
      }

      label {
        display: block;
      }

      select {
        width: calc(100% - 5px);
        padding: 2px 0;
      }

      input[type='checkbox'] {
        width: 18px;
        height: 18px;
      }

      input[type='text'],
      input[type='number'] {
        box-sizing: border-box;
        width: calc(100% - 5px);
        padding: 2px 3px;
      }

      select,
      input[type='text'],
      input[type='number'],
      input[type='checkbox'] {
        margin-left: 5px;
      }

      button[type='submit'] {
        padding: 6px 8px;
      }
    `;
  }
}
