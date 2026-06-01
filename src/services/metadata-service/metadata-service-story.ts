import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@demo/story-template';
import { MetadataService } from './metadata-service';
import type { MetadataResponse } from './responses/metadata-response';
import type { MetadataServiceError } from './metadata-service-error';

/**
 * Interactive demo for the `MetadataService`. It performs a live `fetch`
 * against the archive.org metadata API and models the response — exercising
 * `Result`, the `MetadataResponse`, and the typed `Metadata` model together.
 */

const EXAMPLE_USAGE = `const result = await MetadataService.default.fetchMetadata('goody');

if (result.error) {
  console.error(result.error.type, result.error.message);
} else {
  const { metadata, files_count, server } = result.success;
  metadata.title?.value;      // 'The history of Little Goody Two-Shoes…'
  metadata.mediatype?.value;  // 'texts'
}

// …or fetch a single value by keypath:
const title = await MetadataService.default
  .fetchMetadataValue<string>('goody', 'metadata/title');
title.success;                // 'The history of Little Goody Two-Shoes…'`;

@customElement('metadata-service-story')
export class MetadataServiceStory extends LitElement {
  @state() private identifier = 'goody';
  @state() private metaLoading = false;
  @state() private response?: MetadataResponse;
  @state() private metaError?: MetadataServiceError;

  @state() private keypath = 'metadata/title';
  @state() private valueLoading = false;
  @state() private value?: unknown;
  @state() private valueFetched = false;
  @state() private valueError?: MetadataServiceError;

  render() {
    return html`
      <story-template
        elementTag="metadata-service"
        elementClassName="MetadataService"
        .customExampleUsage=${EXAMPLE_USAGE}
      >
        <div slot="demo">
          <p class="intro">
            Live <code>fetch</code> against
            <code>https://archive.org/metadata/&lt;identifier&gt;</code>. The
            service returns a <code>Result</code> wrapping a typed
            <code>MetadataResponse</code> (or a
            <code>MetadataServiceError</code>).
          </p>

          <div class="row">
            <label>
              Identifier
              <input
                .value=${this.identifier}
                @input=${(e: Event) =>
                  (this.identifier = (e.target as HTMLInputElement).value)}
                placeholder="e.g. goody"
              />
            </label>
            <button @click=${this.fetchMetadata} ?disabled=${this.metaLoading}>
              ${this.metaLoading ? 'Fetching…' : 'fetchMetadata()'}
            </button>
          </div>

          ${this.renderMetadataResult()}

          <div class="row">
            <label>
              Keypath
              <input
                .value=${this.keypath}
                @input=${(e: Event) =>
                  (this.keypath = (e.target as HTMLInputElement).value)}
                placeholder="e.g. metadata/title"
              />
            </label>
            <button @click=${this.fetchValue} ?disabled=${this.valueLoading}>
              ${this.valueLoading ? 'Fetching…' : 'fetchMetadataValue()'}
            </button>
          </div>

          ${this.renderValueResult()}
        </div>
      </story-template>
    `;
  }

  private renderMetadataResult() {
    if (this.metaError) {
      return html`<div class="result err">
        <strong>${this.metaError.type}</strong>
        ${this.metaError.message ? html`— ${this.metaError.message}` : ''}
      </div>`;
    }
    const r = this.response;
    if (!r) return html``;
    const { metadata } = r;
    const rows: [string, unknown][] = [
      ['metadata.title?.value', metadata.title?.value],
      ['metadata.mediatype?.value', metadata.mediatype?.value],
      ['metadata.date?.value', metadata.date?.value],
      ['files_count', r.files_count],
      ['item_size', r.item_size],
      ['server', r.server],
      ['files.length', r.files?.length],
    ];
    return html`<div class="result ok">
      <table>
        ${rows.map(
          ([k, v]) =>
            html`<tr>
              <td><code>${k}</code></td>
              <td>${this.format(v)}</td>
            </tr>`,
        )}
      </table>
    </div>`;
  }

  private renderValueResult() {
    if (this.valueError) {
      return html`<div class="result err">
        <strong>${this.valueError.type}</strong>
        ${this.valueError.message ? html`— ${this.valueError.message}` : ''}
      </div>`;
    }
    if (!this.valueFetched) return html``;
    return html`<div class="result ok">
      <code>${this.format(this.value)}</code>
    </div>`;
  }

  private async fetchMetadata() {
    this.metaLoading = true;
    this.metaError = undefined;
    this.response = undefined;
    const result = await MetadataService.default.fetchMetadata(this.identifier);
    if (result.error) this.metaError = result.error;
    else this.response = result.success;
    this.metaLoading = false;
  }

  private async fetchValue() {
    this.valueLoading = true;
    this.valueError = undefined;
    this.valueFetched = false;
    const result = await MetadataService.default.fetchMetadataValue(
      this.identifier,
      this.keypath,
    );
    if (result.error) {
      this.valueError = result.error;
    } else {
      this.value = result.success;
      this.valueFetched = true;
    }
    this.valueLoading = false;
  }

  private format(value: unknown): string {
    if (value === undefined || value === null) return '—';
    if (value instanceof Date) return value.toISOString();
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  static styles = css`
    .intro {
      margin-top: 0;
      max-width: 42rem;
    }

    .row {
      display: flex;
      align-items: flex-end;
      gap: 10px;
      margin: 10px 0;
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #666;
    }

    input {
      padding: 5px 7px;
      font-size: 0.9rem;
      min-width: 16rem;
    }

    button {
      padding: 6px 12px;
      font-size: 0.85rem;
      font-family: ui-monospace, monospace;
      cursor: pointer;
      border: 1px solid #194880;
      background: #194880;
      color: #fff;
      border-radius: 4px;
    }

    button[disabled] {
      opacity: 0.6;
      cursor: default;
    }

    .result {
      padding: 10px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 10px;
      background: #fff;
      font-size: 0.9rem;
    }

    .result.err {
      border-color: #a00;
      color: #a00;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    td {
      padding: 3px 6px;
      border-bottom: 1px solid #eee;
      vertical-align: top;
    }

    td:first-child {
      white-space: nowrap;
      color: #555;
    }
  `;
}
