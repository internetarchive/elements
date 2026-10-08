import {
  css,
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { customElement } from '@src/util/custom-element';

import themeStyles from '@src/themes/theme-styles';

/**
 * Every generated icon module, keyed by its path. Globbing the folder means a
 * new icon shows up here without any edit to this file.
 */
const iconModules = import.meta.glob<TemplateResult>('../../icons/*.ts', {
  eager: true,
  import: 'default',
});

export interface GalleryIcon {
  /** The icon's kebab-case name, e.g. `caret-open`. */
  name: string;
  /** The identifier used in the import line, e.g. `caretOpen`. */
  identifier: string;
  /** The import line a consumer would paste. */
  importLine: string;
  template: TemplateResult;
}

/** `caret-open` becomes `caretOpen`. A leading digit gets an `icon` prefix. */
export function toIdentifier(name: string): string {
  const camel = name.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
  return /^[0-9]/.test(camel) ? `icon${camel}` : camel;
}

export const galleryIcons: GalleryIcon[] = Object.entries(iconModules)
  .map(([path, template]) => {
    const name = path.slice(path.lastIndexOf('/') + 1).replace(/\.ts$/, '');
    const identifier = toIdentifier(name);
    return {
      name,
      identifier,
      importLine: `import ${identifier} from '@internetarchive/elements/icons/${name}';`,
      template,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const DEFAULT_SIZE = 32;
const MIN_SIZE = 8;
const MAX_SIZE = 128;

/** Turns a computed `rgb(...)` colour into the `#rrggbb` a colour input takes. */
function toHex(rgb: string): string {
  const channels = rgb.match(/\d+(\.\d+)?/g)?.slice(0, 3) ?? [];
  if (channels.length < 3) return '#000000';
  return `#${channels
    .map((c) => Math.round(Number(c)).toString(16).padStart(2, '0'))
    .join('')}`;
}

/**
 * A demo-only page showing every icon in `icons/`, with its import line.
 * It is discovered by the demo's `*-story.ts` glob and is not published.
 */
@customElement('ia-icon-gallery-story')
export class IAIconGalleryStory extends LitElement {
  @state() private query = '';

  /** The colour picked for every icon, or undefined to inherit the text colour. */
  @state() private color?: string;

  @state() private size = DEFAULT_SIZE;

  /** The name of the icon whose import line was last copied. */
  @state() private copiedName: string | null = null;

  private _copyTimeout?: ReturnType<typeof setTimeout>;

  private get filtered(): GalleryIcon[] {
    const query = this.query.trim().toLowerCase();
    return galleryIcons.filter((icon) => icon.name.includes(query));
  }

  /** What the colour input shows while nothing has been picked. */
  private get inheritedColor(): string {
    return toHex(getComputedStyle(this).color);
  }

  render() {
    const icons = this.filtered;
    const gridStyles = {
      color: this.color,
      fontSize: `${this.size}px`,
    };

    return html`
      <div id="container">
        <h2>Icons</h2>
        <div class="controls">
          <label class="field">
            <span>Search icons</span>
            <input
              id="search"
              type="search"
              autocomplete="off"
              autocapitalize="none"
              spellcheck="false"
              placeholder="Filter by name"
              .value=${this.query}
              @input=${this.onSearch}
            />
          </label>
          <div class="field">
            <label for="color">Color</label>
            <span class="inline">
              <input
                id="color"
                type="color"
                .value=${this.color ?? this.inheritedColor}
                @input=${this.onColor}
              />
              <button id="reset-color" type="button" @click=${this.resetColor}>
                Reset
              </button>
            </span>
          </div>
          <div class="field">
            <label for="size">Size: ${this.size}px</label>
            <input
              id="size"
              type="range"
              min=${MIN_SIZE}
              max=${MAX_SIZE}
              step="1"
              .value=${String(this.size)}
              @input=${this.onSize}
            />
          </div>
        </div>
        <p id="count" role="status">
          ${icons.length} of ${galleryIcons.length} icons
        </p>
        ${icons.length === 0
          ? html`<p id="empty">No icons match "${this.query.trim()}".</p>`
          : nothing}
        <ul class="grid" style=${styleMap(gridStyles)}>
          ${icons.map((icon) => this.renderCard(icon))}
        </ul>
      </div>
    `;
  }

  private renderCard(icon: GalleryIcon): TemplateResult {
    const copied = this.copiedName === icon.name;
    return html`
      <li class="card" data-name=${icon.name}>
        <div class="glyph">${icon.template}</div>
        <div class="name">${icon.name}</div>
        <code class="import">${icon.importLine}</code>
        <button
          class="copy-btn ${copied ? 'copied' : ''}"
          type="button"
          aria-label="${copied
            ? 'Copied'
            : 'Copy'} import line for ${icon.name}"
          @click=${() => this.copyImport(icon)}
        >
          ${copied ? 'Copied!' : 'Copy'}
        </button>
      </li>
    `;
  }

  private onSearch(e: Event) {
    this.query = (e.target as HTMLInputElement).value;
  }

  private onColor(e: Event) {
    this.color = (e.target as HTMLInputElement).value;
  }

  private resetColor() {
    this.color = undefined;
  }

  private onSize(e: Event) {
    this.size = Number((e.target as HTMLInputElement).value);
  }

  private async copyImport(icon: GalleryIcon): Promise<void> {
    try {
      await navigator.clipboard.writeText(icon.importLine);
      this.copiedName = icon.name;
      clearTimeout(this._copyTimeout);
      this._copyTimeout = setTimeout(() => (this.copiedName = null), 2000);
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._copyTimeout);
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          display: block;
        }

        #container {
          padding: 0 10px 10px;
          margin-bottom: 1rem;
          border: 1px solid rgba(128, 128, 128, 0.5);
        }

        h2 {
          font-size: 0.85rem;
          font-weight: 600;
          margin: 10px 0 8px;
        }

        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 24px;
          align-items: flex-end;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.8rem;
        }

        .inline {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        input[type='search'] {
          min-width: 14rem;
        }

        input,
        button {
          font: inherit;
          color: inherit;
          background: transparent;
          border: 1px solid rgba(128, 128, 128, 0.7);
          border-radius: 3px;
          padding: 3px 7px;
        }

        input[type='color'] {
          width: 3rem;
          height: 1.9rem;
          padding: 2px;
        }

        input[type='range'] {
          padding: 0;
        }

        button {
          cursor: pointer;
        }

        button:hover {
          background: rgba(128, 128, 128, 0.2);
        }

        input:focus-visible,
        button:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        #count,
        #empty {
          font-size: 0.8rem;
          margin: 10px 0;
        }

        .grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
          gap: 10px;
        }

        .card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          min-width: 0;
          padding: 10px;
          border: 1px solid rgba(128, 128, 128, 0.5);
          border-radius: 4px;
        }

        .glyph {
          display: flex;
          align-items: center;
          line-height: 1;
          min-height: 1em;
        }

        .name {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .import {
          font-size: 0.7rem;
          overflow-wrap: anywhere;
        }

        .copy-btn {
          font-size: 0.7rem;
          line-height: 1.4;
          padding: 1px 7px;
        }

        .copy-btn.copied {
          background: #2a7a2a;
          border-color: #2a7a2a;
          color: #fff;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-icon-gallery-story': IAIconGalleryStory;
  }
}
