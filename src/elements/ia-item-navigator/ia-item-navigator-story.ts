import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './ia-item-navigator';
import './menus/ia-viewable-files-panel';
import './menus/ia-sort-files-button';
import './menus/ia-share-panel';
import { viewableFilesIcon } from './menus/ia-viewable-files-panel';
import { shareIcon } from './menus/ia-share-panel';
import type {
  MenuProviderInterface,
  MenuShortcutInterface,
} from './interfaces/menu-interfaces';
import type { FileSortOption, ViewableFileInfo } from './menus/models';
import type {
  SharedResizeObserverConfig,
  SharedResizeObserverInterface,
} from './interfaces/service-interfaces';
import type { StyleInputData } from '@demo/story-components/story-styles-settings';
import '@demo/story-template';

/**
 * A tiny adapter that satisfies the navigator's `SharedResizeObserverInterface`
 * using a single native `ResizeObserver`, so the demo can show the responsive
 * overlay/shift behavior without depending on
 * `@internetarchive/shared-resize-observer`.
 */
class DemoResizeObserver implements SharedResizeObserverInterface {
  private handlers = new Map<Element, SharedResizeObserverConfig>();

  private observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      this.handlers.get(entry.target)?.handler.handleResize(entry);
    }
  });

  addObserver(config: SharedResizeObserverConfig): void {
    this.handlers.set(config.target, config);
    this.observer.observe(config.target);
  }

  removeObserver(config: SharedResizeObserverConfig): void {
    this.handlers.delete(config.target);
    this.observer.unobserve(config.target);
  }
}

/** A generic list-ish glyph for the "About" demo menu entry. */
const demoIcon = html`
  <svg class="ia-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path class="fill-color" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
  </svg>
`;

/**
 * A realistic multi-file item — the volumes of "The Master Book of American
 * Folk Song" — mirroring the example from the upstream item-navigator demo.
 * Includes a deliberately long title (to show wrapping) and PDF entries (to
 * show the PDF flag).
 */
const DEMO_ITEM_IDENTIFIER = 'masterbookofamericanfolksong00shep';

/** Builds a viewable-file entry whose link resolves against the real item. */
function demoFile(
  subprefix: string,
  title: string,
  orig_sort: number,
  { topLevel = false, pdf = false }: { topLevel?: boolean; pdf?: boolean } = {},
): ViewableFileInfo {
  const base = `/details/${DEMO_ITEM_IDENTIFIER}`;
  return {
    title,
    file_prefix: subprefix,
    file_subprefix: subprefix,
    // file_source only drives the PDF flag; the link comes from url_path.
    file_source: pdf ? `${subprefix}.pdf` : `/${subprefix}_jp2.zip`,
    url_path: topLevel ? base : `${base}/${encodeURIComponent(subprefix)}`,
    image: '',
    author: 'Riley Shepard',
    orig_sort,
  };
}

const DEMO_FILES: ViewableFileInfo[] = [
  demoFile(
    '01-The Master Book of American Folk Song',
    'The Master Book of American Folk Song',
    0,
    { topLevel: true },
  ),
  demoFile(
    '02-Encyclopedia of the Traditional Music and Folk Songs of the United States Index A through M',
    'Encyclopedia of the Traditional Music and Folk Songs of the United States, Index A through M',
    1,
  ),
  demoFile(
    '03-Encyclopedia of the Traditional Music and Folk Songs of the United States Index N through Z',
    'Encyclopedia of the Traditional Music and Folk Songs of the United States, Index N through Z',
    2,
  ),
  demoFile('04-Letters to Riley Shepard', 'Letters to Riley Shepard', 3),
  demoFile(
    'Master Book of American Folk Song Vol. 1',
    'Master Book of American Folk Song Vol. 1',
    4,
    { pdf: true },
  ),
  demoFile(
    'Master Book of American Folk Song Vol. 2',
    'Master Book of American Folk Song Vol. 2',
    5,
    { pdf: true },
  ),
  demoFile(
    'Master Book of American Folk Song Vol. 3',
    'Master Book of American Folk Song Vol. 3',
    6,
  ),
];

@customElement('ia-item-navigator-story')
export class IAItemNavigatorStory extends LitElement {
  @state() private loaded = true;

  @state() private viewAvailable = true;

  @state() private headerOn = true;

  @state() private fullscreen = false;

  @state() private animationsOn = true;

  @state() private sharedObserver = new DemoResizeObserver();

  @state() private sortOrderBy: FileSortOption = 'default';

  @state() private sortedFiles: ViewableFileInfo[] = [...DEMO_FILES];

  private handleFileListSorted(e: Event): void {
    const { sortType, sortedFiles } = (e as CustomEvent).detail;
    this.sortOrderBy = sortType;
    this.sortedFiles = sortedFiles;
  }

  private get demoItem() {
    // The navigator only reads `item?.metadata?.identifier`, so a plain object
    // stands in for a full MetadataResponse in the demo.
    return {
      metadata: {
        identifier: DEMO_ITEM_IDENTIFIER,
        title: 'The Master Book of American Folk Song',
      },
    } as never;
  }

  private get menuContents(): MenuProviderInterface[] {
    const shared = {
      item: this.demoItem,
      baseHost: 'archive.org',
      subPrefix: '',
    };
    return [
      {
        ...shared,
        id: 'viewable-files',
        label: `Viewable Files (${DEMO_FILES.length})`,
        icon: viewableFilesIcon,
        actionButton: html`
          <ia-sort-files-button
            .fileListRaw=${DEMO_FILES}
            .sortOrderBy=${this.sortOrderBy}
          ></ia-sort-files-button>
        `,
        component: html`
          <ia-viewable-files-panel
            baseHost="archive.org"
            subPrefix="01-The Master Book of American Folk Song"
            .fileList=${this.sortedFiles}
            .sortOrderBy=${this.sortOrderBy}
          ></ia-viewable-files-panel>
        `,
      },
      {
        ...shared,
        id: 'share',
        label: 'Share this item',
        icon: shareIcon,
        component: html`
          <ia-share-panel
            identifier=${DEMO_ITEM_IDENTIFIER}
            baseHost="archive.org"
            type="book"
            creator="Riley Shepard"
            description="The Master Book of American Folk Song"
          ></ia-share-panel>
        `,
      },
      {
        ...shared,
        id: 'about',
        label: 'About This Item',
        icon: demoIcon,
        component: html`
          <p>
            The item navigator is a shell: each menu entry here is a "provider"
            supplying its own panel body. The theater on the right is slotted in
            by the host.
          </p>
        `,
      },
    ];
  }

  /** Minimized-rail shortcuts, mirroring the upstream demo. */
  private get menuShortcuts(): MenuShortcutInterface[] {
    return [
      {
        id: 'viewable-files',
        label: 'Viewable Files',
        icon: viewableFilesIcon,
      },
      { id: 'share', label: 'Share this item', icon: shareIcon },
    ];
  }

  private get styleInputData(): StyleInputData {
    return {
      settings: [
        {
          label: 'Menu width',
          cssVariable: '--item-navigator-menu-width',
          defaultValue: 320,
          inputType: 'range',
          min: 200,
          max: 480,
          step: 10,
          unit: 'px',
        },
        {
          label: 'Animation timing',
          cssVariable: '--item-navigator-animation-timing',
          defaultValue: 200,
          inputType: 'range',
          min: 0,
          max: 800,
          step: 50,
          unit: 'ms',
        },
        {
          label: 'Theater background',
          cssVariable: '--item-navigator-theater-bg-color',
          defaultValue: '#000000',
          inputType: 'color',
        },
        {
          label: 'Text color',
          cssVariable: '--item-navigator-text-color',
          defaultValue: '#ffffff',
          inputType: 'color',
        },
        {
          label: 'Menu drawer background',
          cssVariable: '--item-navigator-menu-slider-bg',
          defaultValue: '#212121',
          inputType: 'color',
        },
        {
          label: 'Active panel background',
          cssVariable: '--item-navigator-active-button-bg',
          defaultValue: '#333333',
          inputType: 'color',
        },
      ],
    };
  }

  render() {
    return html`
      <story-template
        elementTag="ia-item-navigator"
        elementClassName="IAItemNavigator"
        .styleInputData=${this.styleInputData}
        .customExampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <div class="frame-wrapper ${this.fullscreen ? 'fullscreen' : ''}">
            <ia-item-navigator
              baseHost="archive.org"
              style=${this.animationsOn
                ? nothing
                : '--item-navigator-animation-timing: 0ms'}
              .item=${this.demoItem}
              .menuContents=${this.menuContents}
              .menuShortcuts=${this.menuShortcuts}
              .sharedObserver=${this.sharedObserver}
              .viewportInFullscreen=${this.fullscreen || null}
              ?loaded=${this.loaded}
              ?viewAvailable=${this.viewAvailable}
              @fileListSorted=${this.handleFileListSorted}
            >
              ${this.headerTemplate} ${this.theaterTemplate}
            </ia-item-navigator>
          </div>
        </div>

        <div slot="settings">
          <table>
            ${this.toggleRow('Loaded', 'loaded')}
            ${this.toggleRow('View available (theater)', 'viewAvailable')}
            ${this.toggleRow('Header', 'headerOn')}
            ${this.toggleRow('Fullscreen', 'fullscreen')}
            ${this.toggleRow('Animate', 'animationsOn')}
          </table>
          <p class="hint">
            Turn "View available" off to show the no-theater placeholder. Open
            "Viewable Files" and use the sort button in its header. Narrow the
            demo below 600px to see the drawer switch from shift to overlay.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            The navigator is a shell: project a theater into
            <code>slot="main"</code> and an optional bar into
            <code>slot="header"</code>, then drive the drawer with the
            <code>menuContents</code> provider array (and the minimized rail
            with <code>menuShortcuts</code>). It never renders a viewer itself.
          </p>
        </div>
      </story-template>
    `;
  }

  /** A row with a labelled checkbox bound to the given boolean state field. */
  private toggleRow(
    label: string,
    field:
      | 'loaded'
      | 'viewAvailable'
      | 'headerOn'
      | 'fullscreen'
      | 'animationsOn',
  ) {
    return html`
      <tr>
        <td>${label}</td>
        <td>
          <input
            type="checkbox"
            .checked=${this[field]}
            @change=${(e: Event) => {
              this[field] = (e.target as HTMLInputElement).checked;
            }}
          />
        </td>
      </tr>
    `;
  }

  private get headerTemplate() {
    if (!this.headerOn && !this.fullscreen) return nothing;
    return html`
      <div slot="header" class="demo-header">
        <span class="brand">Internet Archive</span>
        <a class="title" href="/details/${DEMO_ITEM_IDENTIFIER}"
          >The Master Book of American Folk Song</a
        >
        ${this.fullscreen
          ? html`<button
              class="exit-fs"
              @click=${() => {
                this.fullscreen = false;
              }}
            >
              Exit fullscreen
            </button>`
          : nothing}
      </div>
    `;
  }

  private get theaterTemplate() {
    return html`
      <div slot="main" class="demo-theater">
        <div class="viewer-mock">
          <div class="spine"></div>
          <div class="page">
            <p class="viewer-title">The Master Book of American Folk Song</p>
            <p class="viewer-note">
              Your theater (book reader, media player, image viewer, …) renders
              here.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  private get exampleUsage(): string {
    return `<ia-item-navigator
  baseHost="archive.org"
  .item=\${this.itemMetadata}
  .menuContents=\${this.menuProviders}
  .menuShortcuts=\${this.menuShortcuts}
  .sharedObserver=\${this.sharedObserver}
  ?loaded=\${this.loaded}
>
  <div slot="header">…your header…</div>
  <div slot="main">…your theater…</div>
</ia-item-navigator>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      .frame-wrapper {
        height: 460px;
        border: 1px solid #ccc;
      }

      /* Opt into menu-button labels (the component ships icon-only by
         default), matching the upstream demo. */
      ia-item-navigator {
        --item-navigator-menu-button-label-display: block;
      }

      .demo-header {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #1a1a1a;
        color: #fff;
        padding: 8px 12px;
        font-size: 0.9rem;
      }

      .demo-header .brand {
        font-weight: 600;
        white-space: nowrap;
      }

      .demo-header .title {
        color: #6cb2ff;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .demo-header .exit-fs {
        margin-left: auto;
        cursor: pointer;
      }

      .demo-theater {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
      }

      .viewer-mock {
        display: flex;
        max-width: 320px;
        width: 100%;
        min-height: 220px;
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
        background: #2b2b2b;
      }

      .viewer-mock .spine {
        width: 14px;
        background: linear-gradient(90deg, #111, #444);
      }

      .viewer-mock .page {
        flex: 1;
        padding: 1.5rem 1.25rem;
        color: #eee;
      }

      .viewer-title {
        margin: 0 0 0.75rem;
        font-weight: 700;
      }

      .viewer-note {
        margin: 0;
        font-size: 0.85rem;
        color: #aaa;
      }

      .hint {
        font-size: 0.78rem;
        color: #555;
      }

      table {
        margin-bottom: 0.5rem;
      }
    `;
  }
}
