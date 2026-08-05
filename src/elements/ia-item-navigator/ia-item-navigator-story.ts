import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './ia-item-navigator';
import './menus/ia-viewable-files-panel';
import './menus/ia-sort-files-button';
import './menus/ia-share-panel';
import { viewableFilesIcon } from './menus/ia-viewable-files-panel';
import { shareIcon } from './menus/ia-share-panel';
import { maskedIcon } from './masked-icon';
import listIconUrl from './menus/icons/list.svg';
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
const demoIcon = maskedIcon(listIconUrl);

/** archive.org bases for embeddable item viewers and direct file downloads. */
const EMBED_BASE = 'https://archive.org/embed';
const DOWNLOAD_BASE = 'https://archive.org/download';

type DemoMediaType = 'image' | 'pdf' | 'video';

/** A viewable file backed by a real, iframe-embeddable archive.org item. */
interface DemoFile extends ViewableFileInfo {
  identifier: string;
  mediatype: DemoMediaType;
  /** For PDFs, the direct file to load in the browser's native PDF viewer. */
  pdfFile?: string;
}

function demoFile(
  identifier: string,
  title: string,
  mediatype: DemoMediaType,
  orig_sort: number,
  pdfFile?: string,
): DemoFile {
  return {
    identifier,
    mediatype,
    pdfFile,
    title,
    file_prefix: identifier,
    file_subprefix: identifier,
    // file_source only drives the PDF flag in the panel.
    file_source: mediatype === 'pdf' ? `${identifier}.pdf` : identifier,
    url_path: `/details/${identifier}`,
    image: '',
    author: '',
    orig_sort,
  };
}

/**
 * A small gallery of real, public "cats" items from archive.org — three
 * images, three PDFs and a video. Images and video embed the item viewer;
 * PDFs load the file directly in the browser's native PDF viewer. Selecting
 * one swaps the navigator's slotted theater.
 */
const DEMO_FILES: DemoFile[] = [
  demoFile('0FK9vj7MBL', 'Monmon Japanese Cats Tattoo Designs', 'image', 0),
  demoFile('Catsintherain', 'Cats in the Rain', 'image', 1),
  demoFile(
    'WithPriscillaTheCat1987',
    'With Priscilla the Cat, 1987',
    'image',
    2,
  ),
  demoFile(
    'TheBlackCat_339',
    'The Black Cat',
    'pdf',
    3,
    'TheBlackCatByEdgarAllanPoe.pdf',
  ),
  demoFile(
    'catofbubastestal00hentiala',
    'The Cat of Bubastes: A Tale of Ancient Egypt',
    'pdf',
    4,
    'catofbubastestal00hentiala.pdf',
  ),
  demoFile(
    'lettersfromcatpu00jackiala',
    'Letters from a Cat',
    'pdf',
    5,
    'lettersfromcatpu00jackiala.pdf',
  ),
  demoFile('PrivateL1947', 'Private Life of a Cat (1947)', 'video', 6),
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

  @state() private selectedSubPrefix = DEMO_FILES[0].file_subprefix;

  private handleFileListSorted(e: Event): void {
    const { sortType, sortedFiles } = (e as CustomEvent).detail;
    this.sortOrderBy = sortType;
    this.sortedFiles = sortedFiles;
  }

  private get selectedFile(): DemoFile {
    return (
      DEMO_FILES.find((f) => f.file_subprefix === this.selectedSubPrefix) ??
      DEMO_FILES[0]
    );
  }

  /** PDFs load the file directly; everything else uses the item embed viewer. */
  private get theaterSrc(): string {
    const file = this.selectedFile;
    return file.mediatype === 'pdf' && file.pdfFile
      ? `${DOWNLOAD_BASE}/${file.identifier}/${encodeURIComponent(file.pdfFile)}`
      : `${EMBED_BASE}/${file.identifier}`;
  }

  /**
   * Intercepts clicks on the viewable-files links so, instead of navigating
   * away, the demo swaps the slotted theater to the chosen file — showing how
   * a host drives the navigator's `main` slot dynamically.
   */
  private handleFileClick(e: Event): void {
    const link = e
      .composedPath()
      .find((n): n is HTMLAnchorElement => n instanceof HTMLAnchorElement);
    if (!link) return;
    e.preventDefault();
    const href = link.getAttribute('href');
    const file = DEMO_FILES.find((f) => `//archive.org${f.url_path}` === href);
    if (file) this.selectedSubPrefix = file.file_subprefix;
  }

  private get demoItem() {
    // The navigator only reads `item?.metadata?.identifier`, so a plain object
    // stands in for a full MetadataResponse — reflecting the selected item.
    return {
      metadata: {
        identifier: this.selectedFile.identifier,
        title: this.selectedFile.title,
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
            subPrefix=${this.selectedSubPrefix}
            .fileList=${this.sortedFiles}
            .sortOrderBy=${this.sortOrderBy}
            @click=${(e: Event) => this.handleFileClick(e)}
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
            identifier=${this.selectedFile.identifier}
            baseHost="archive.org"
            type="item"
            .description=${this.selectedFile.title}
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
        // Sizing / motion
        {
          label: 'Base font size',
          cssVariable: '--item-navigator-base-font-size',
          defaultValue: 10,
          inputType: 'range',
          min: 8,
          max: 16,
          step: 1,
          unit: 'px',
        },
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
          label: 'Shortcut rail width',
          cssVariable: '--item-navigator-menu-margin',
          defaultValue: 42,
          inputType: 'range',
          min: 30,
          max: 64,
          step: 2,
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
        // Text + icons
        {
          label: 'Text color',
          cssVariable: '--item-navigator-text-color',
          defaultValue: '#ffffff',
          inputType: 'color',
        },
        {
          label: 'Icon color',
          cssVariable: '--item-navigator-icon-color',
          defaultValue: '#ffffff',
          inputType: 'color',
        },
        {
          label: 'Icon color · active',
          cssVariable: '--item-navigator-icon-active-color',
          defaultValue: '#ffffff',
          inputType: 'color',
        },
        {
          label: 'Icon color · inactive',
          cssVariable: '--item-navigator-icon-inactive-color',
          defaultValue: '#999999',
          inputType: 'color',
        },
        // Borders / accents
        {
          label: 'Border color',
          cssVariable: '--item-navigator-border-color',
          defaultValue: '#4b4b4b',
          inputType: 'color',
        },
        {
          label: 'Active file border',
          cssVariable: '--item-navigator-active-file-border-color',
          defaultValue: '#538bc5',
          inputType: 'color',
        },
        // Backgrounds
        {
          label: 'Theater background',
          cssVariable: '--item-navigator-theater-bg-color',
          defaultValue: '#000000',
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
        {
          label: 'Embed field background',
          cssVariable: '--item-navigator-share-embed-bg',
          defaultValue: '#151515',
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
        <a
          class="title"
          href="https://archive.org/details/${this.selectedFile.identifier}"
          target="_blank"
          >${this.selectedFile.title}</a
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
    const file = this.selectedFile;
    return html`
      <div slot="main" class="demo-theater">
        <iframe
          class="theater-embed"
          src=${this.theaterSrc}
          title=${file.title}
          allow="fullscreen"
          allowfullscreen
        ></iframe>
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
        height: 100%;
        width: 100%;
      }

      .theater-embed {
        width: 100%;
        height: 100%;
        border: 0;
        display: block;
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
