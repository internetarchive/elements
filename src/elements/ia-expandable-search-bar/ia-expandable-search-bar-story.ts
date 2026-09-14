import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { QuickSearchEntry } from './models';
import type { IAExpandableSearchBar } from './ia-expandable-search-bar';

import './ia-expandable-search-bar';
import '@demo/story-template';

const QUICK_SEARCHES: QuickSearchEntry[] = [
  { displayText: 'grateful dead', data: { collection: 'etree' } },
  { displayText: 'apollo 11', data: { collection: 'nasa' } },
  { displayText: 'old time radio', data: { collection: 'oldtimeradio' } },
  { displayText: 'prelinger archives', data: { collection: 'prelinger' } },
  { displayText: 'internet arcade', data: { collection: 'internetarcade' } },
];

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Background',
    cssVariable: '--ia-theme-search-bar-background-color',
    defaultValue: '#000000',
    inputType: 'color',
  },
  {
    label: 'Text colour',
    cssVariable: '--ia-theme-search-bar-text-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Quick search link colour',
    cssVariable: '--ia-theme-quick-search-link-color',
    defaultValue: '#4484ca',
    inputType: 'color',
  },
  {
    label: 'Font size',
    cssVariable: '--ia-theme-search-bar-font-size',
    defaultValue: 1,
    inputType: 'range',
    min: 0.75,
    max: 2,
    step: 0.05,
    unit: 'em',
  },
  {
    label: 'Quick search max height',
    cssVariable: '--ia-theme-search-bar-max-expansion-height',
    defaultValue: 150,
    inputType: 'range',
    min: 40,
    max: 300,
    step: 10,
    unit: 'px',
  },
];

const propInputSettings: PropInputSettings<IAExpandableSearchBar>[] = [
  {
    label: 'Shows disclosure',
    propertyName: 'showsDisclosure',
    defaultValue: true,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Placeholder',
    propertyName: 'placeholder',
    defaultValue: 'Search',
  },
];

const MAX_LOG_ENTRIES = 6;

@customElement('ia-expandable-search-bar-story')
export class IAExpandableSearchBarStory extends LitElement {
  @state() private log: string[] = [];

  render() {
    return html`
      <story-template
        elementTag="ia-expandable-search-bar"
        elementClassName="IAExpandableSearchBar"
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
        .defaultUsageProps=${'.quickSearches=${[{ displayText: "grateful dead" }]}'}
      >
        <ia-expandable-search-bar
          slot="demo"
          class="search-bar"
          showsDisclosure
          .quickSearches=${QUICK_SEARCHES}
          @inputchange=${this.record}
          @enterKeyPressed=${this.record}
          @searchCleared=${this.record}
          @quickSearchSelected=${this.record}
        ></ia-expandable-search-bar>

        <div slot="demo" class="panel">
          <div class="log-header">
            <strong>Events</strong>
            <button @click=${() => (this.log = [])}>Clear</button>
          </div>
          ${this.log.length === 0
            ? html`<p class="empty">
                Type in the bar, press Enter, or open the chevron and pick a
                suggestion.
              </p>`
            : html`<ol class="log">
                ${this.log.map((entry) => html`<li><code>${entry}</code></li>`)}
              </ol>`}
        </div>

        <div slot="usage-notes">
          <p>
            A search input with a list of suggested searches that drops out
            underneath it. The chevron only appears when
            <code>showsDisclosure</code> is set, and the list only opens when
            both that and <code>isOpen</code> are true.
          </p>
          <p>
            <code>inputchange</code> fires on every change to the field,
            including pastes and autofill, not just keystrokes.
            <code>enterKeyPressed</code> is separate, for running the search.
            Picking a suggestion emits <code>quickSearchSelected</code> with the
            whole entry, so the <code>data</code> you attached comes back to you
            and you don't need a lookup table.
          </p>
          <p>
            The clear button is only visible once there's something to clear.
          </p>
        </div>
      </story-template>
    `;
  }

  private record(e: Event): void {
    const { detail } = e as CustomEvent;
    const suffix = detail ? ` ${JSON.stringify(detail)}` : '';
    this.log = [`${e.type}${suffix}`, ...this.log].slice(0, MAX_LOG_ENTRIES);
  }

  static get styles(): CSSResultGroup {
    return css`
      .search-bar {
        display: block;
        background-color: #151515;
        padding: 1rem;
        border-radius: 4px;
        /* Room for the quick search list to drop into. */
        padding-bottom: 4rem;
      }

      .panel {
        margin-top: 1em;
      }

      .log-header {
        display: flex;
        align-items: center;
        gap: 0.5em;
        margin-bottom: 0.5em;
      }

      .log {
        margin: 0;
        padding-left: 1.5em;
        font-size: 0.9em;
        word-break: break-all;
      }

      .empty {
        font-size: 0.9em;
        font-style: italic;
      }
    `;
  }
}
