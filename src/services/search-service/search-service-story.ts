import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import serviceSource from './search-service.ts?raw';
import interfaceSource from './search-service-interface.ts?raw';
import paramsSource from './search-params.ts?raw';

import '@demo/service-template';
import { SearchService } from './search-service';
import { SearchResponse } from './responses/search-response';
import { SearchType } from './search-type';
import type { SearchParams } from './search-params';
import type { ItemHit } from './models/hit-types/item-hit';

const DEFAULT_QUERY = 'nasa';

/** A response in the shape the archive.org search service returns. */
const SAMPLE_RESPONSE: Record<string, unknown> = {
  request: {
    client_parameters: { user_query: 'sample', page: 1, hits_per_page: 3 },
  },
  response: {
    header: { succeeded: true, query_time: 12 },
    hit_schema: { hit_type: 'item', field_properties: {} },
    body: {
      hits: {
        total: 1234,
        returned: 3,
        hits: [
          {
            fields: {
              identifier: 'sample-moon-landing',
              title: 'Sample: the moon landing',
              mediatype: 'movies',
              creator: 'A sample creator',
            },
          },
          {
            fields: {
              identifier: 'sample-apollo-guide',
              title: 'Sample: an Apollo guide',
              mediatype: 'texts',
            },
          },
          {
            fields: {
              identifier: 'sample-mission-audio',
              title: 'Sample: mission audio',
              mediatype: 'etree',
            },
          },
        ],
      },
    },
  },
};

const USAGE = `import { SearchService } from '@internetarchive/elements/services/search-service/search-service';
import { SearchType } from '@internetarchive/elements/services/search-service/search-type';

const { success, error } = await new SearchService().search(
  { query: 'nasa', rows: 5, fields: ['identifier', 'title', 'mediatype'] },
  SearchType.METADATA,
);
success?.response.results.map((hit) => hit.identifier);`;

/** Strips the import statements, which are noise in the API listing. */
const withoutImports = (source: string) =>
  source.replace(/^import[\s\S]*?from '[^']+';\n/gm, '').trim();

const API_SOURCE = [interfaceSource, paramsSource, serviceSource]
  .map(withoutImports)
  .join('\n\n');

interface Row {
  identifier: string;
  title: string;
  mediatype: string;
}

@customElement('search-service-story')
export class SearchServiceStory extends LitElement {
  @state() private query = '';

  @state() private rows = 5;

  @state() private sample = false;

  @state() private running = false;

  @state() private result?: {
    call: string;
    summary?: string;
    rows: Row[];
    error?: string;
  };

  render() {
    return html`
      <service-template
        serviceName="search-service"
        .usage=${USAGE}
        .apiSource=${API_SOURCE}
      >
        <form slot="console" @submit=${this.run}>
          <label class="query">
            Query
            <input
              type="text"
              placeholder=${DEFAULT_QUERY}
              autocomplete="off"
              spellcheck="false"
              .value=${this.query}
              @input=${(e: Event) =>
                (this.query = (e.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            Results
            <input
              type="number"
              min="1"
              max="20"
              .value=${String(this.rows)}
              @input=${(e: Event) =>
                (this.rows = Number((e.target as HTMLInputElement).value))}
            />
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this.sample}
              @change=${(e: Event) =>
                (this.sample = (e.target as HTMLInputElement).checked)}
            />
            Sample data (works offline)
          </label>
          <button type="submit" ?disabled=${this.running}>Search</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result ? this.renderResult(this.result) : nothing}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Searches archive.org's metadata search and models the response. The
            sample data skips the request and runs a canned response through the
            same <code>SearchResponse</code> model.
          </p>
        </div>
      </service-template>
    `;
  }

  private renderResult(result: NonNullable<SearchServiceStory['result']>) {
    return html`<code class="call">${result.call}</code> ${result.error
        ? html`<code class="error">${result.error}</code>`
        : html`<p class="summary">${result.summary}</p>
            <table>
              <thead>
                <tr>
                  <th scope="col">Identifier</th>
                  <th scope="col">Title</th>
                  <th scope="col">Media type</th>
                </tr>
              </thead>
              <tbody>
                ${result.rows.map(
                  (row) =>
                    html`<tr>
                      <th scope="row">${row.identifier}</th>
                      <td>${row.title}</td>
                      <td>${row.mediatype}</td>
                    </tr>`,
                )}
              </tbody>
            </table>`}`;
  }

  private async run(e: Event) {
    e.preventDefault();
    const query = this.query.trim() || DEFAULT_QUERY;
    const rows = Math.min(Math.max(this.rows || 1, 1), 20);
    const params: SearchParams = {
      query,
      rows,
      fields: ['identifier', 'title', 'mediatype'],
    };
    const call = this.sample
      ? 'new SearchResponse(sampleResponse)'
      : `search(${JSON.stringify(params)}, SearchType.METADATA)`;
    this.running = true;
    try {
      let response: SearchResponse;
      if (this.sample) {
        response = new SearchResponse(SAMPLE_RESPONSE);
      } else {
        const { success, error } = await new SearchService().search(
          params,
          SearchType.METADATA,
        );
        if (error || !success) {
          throw new Error(
            error ? `${error.type}: ${error.message}` : 'No response',
          );
        }
        response = success;
      }
      const { totalResults, returnedCount, results } = response.response;
      this.result = {
        call,
        summary: `${returnedCount} of ${totalResults} results`,
        rows: (results as ItemHit[]).map((hit) => ({
          identifier: hit.identifier ?? '',
          title: hit.title?.value ?? '',
          mediatype: hit.mediatype?.value ?? '',
        })),
      };
    } catch (error) {
      this.result = {
        call,
        rows: [],
        error: `${error instanceof Error ? error.message : error}${
          this.sample ? '' : '. Try "Sample data".'
        }`,
      };
    } finally {
      this.running = false;
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.5rem;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 0.8rem;
      }

      label.check {
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }

      label.query input {
        min-width: 0;
        width: 14rem;
        max-width: 100%;
      }

      input[type='number'] {
        width: 5rem;
      }

      .result[hidden] {
        display: none;
      }

      .result {
        box-sizing: border-box;
        flex-basis: 100%;
        min-width: 0;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 0.5rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 0.85rem;
        overflow-x: auto;
      }

      .call,
      .error {
        overflow-wrap: anywhere;
      }

      .error {
        color: #b00020;
      }

      .summary {
        margin: 0;
        font-weight: 600;
      }

      table {
        border-collapse: collapse;
        font-size: 0.8rem;
      }

      th,
      td {
        text-align: left;
        padding: 2px 10px 2px 0;
        vertical-align: top;
        overflow-wrap: anywhere;
      }

      thead th {
        border-bottom: 1px solid #ccc;
      }
    `;
  }
}
