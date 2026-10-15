import { html, LitElement } from 'lit';
import { customElement } from '@src/util/custom-element';

import './ia-wayback-search-form';
import '@demo/story-template';

@customElement('ia-wayback-search-form-story')
export class IAWaybackSearchFormStory extends LitElement {
  render() {
    return html`
      <story-template
        elementTag="ia-wayback-search-form"
        elementClassName="IAWaybackSearchForm"
      >
        <div slot="demo">
          <ia-wayback-search-form
            .queryHandler=${{
              performQuery: (query: string) =>
                console.log(`Wayback search: ${query}`),
            }}
          ></ia-wayback-search-form>
        </div>
        <div slot="usage-notes">
          <p>
            Pass <code>queryHandler</code> to decide what a search does. By
            default it goes to the Wayback Machine's results for the query.
          </p>
          <p>
            <code>waybackPagesArchived</code> sets the page count in the intro.
            Left blank, it shows a localized default.
          </p>
        </div>
      </story-template>
    `;
  }
}
