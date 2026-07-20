import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './ia-item-navigator';
import './menus/ia-viewable-files-panel';
import './menus/ia-sort-files-button';
import './menus/ia-share-panel';
import { viewableFilesIcon } from './menus/ia-viewable-files-panel';
import { shareIcon } from './menus/ia-share-panel';
import type { MenuProviderInterface } from './interfaces/menu-interfaces';
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

/** A generic list-ish glyph for demo menu entries. */
const demoIcon = html`
  <svg viewBox="0 0 24 24" aria-hidden="true" style="width:100%;height:100%">
    <path class="fill-color" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
  </svg>
`;

@customElement('ia-item-navigator-story')
export class IAItemNavigatorStory extends LitElement {
  @state() private loaded = true;

  @state() private viewAvailable = true;

  @state() private sharedObserver = new DemoResizeObserver();

  @state() private sortOrderBy: FileSortOption = 'default';

  private readonly demoFiles: ViewableFileInfo[] = [
    {
      title: 'Volume 1',
      file_prefix: 'v1',
      file_subprefix: 'v1',
      url_path: '/details/demo-item/v1',
      file_source: 'v1.pdf',
      image: '',
      author: '',
      orig_sort: 0,
    },
    {
      title: 'Volume 3',
      file_prefix: 'v3',
      file_subprefix: 'v3',
      url_path: '/details/demo-item/v3',
      file_source: 'v3.txt',
      image: '',
      author: '',
      orig_sort: 2,
    },
    {
      title: 'Volume 2',
      file_prefix: 'v2',
      file_subprefix: 'v2',
      url_path: '/details/demo-item/v2',
      file_source: 'v2.pdf',
      image: '',
      author: '',
      orig_sort: 1,
    },
  ];

  @state() private sortedFiles: ViewableFileInfo[] = [...this.demoFiles];

  private handleFileListSorted(e: Event): void {
    const { sortType, sortedFiles } = (e as CustomEvent).detail;
    this.sortOrderBy = sortType;
    this.sortedFiles = sortedFiles;
  }

  private get demoItem() {
    // The navigator only reads `item?.metadata?.identifier`, so a plain object
    // stands in for a full MetadataResponse in the demo.
    return {
      metadata: { identifier: 'demo-item', title: 'A Demonstration Item' },
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
        id: 'contents',
        label: 'Table of Contents',
        icon: demoIcon,
        component: html`
          <ul>
            <li>Chapter 1 — Introduction</li>
            <li>Chapter 2 — Getting Started</li>
            <li>Chapter 3 — In Practice</li>
          </ul>
        `,
      },
      {
        ...shared,
        id: 'viewable-files',
        label: 'Viewable Files',
        icon: viewableFilesIcon,
        actionButton: html`
          <ia-sort-files-button
            .fileListRaw=${this.demoFiles}
            .sortOrderBy=${this.sortOrderBy}
          ></ia-sort-files-button>
        `,
        component: html`
          <ia-viewable-files-panel
            baseHost="archive.org"
            subPrefix="v1"
            .fileList=${this.sortedFiles}
            .sortOrderBy=${this.sortOrderBy}
          ></ia-viewable-files-panel>
        `,
      },
      {
        ...shared,
        id: 'share',
        label: 'Share',
        icon: shareIcon,
        component: html`
          <ia-share-panel
            identifier="demo-item"
            baseHost="archive.org"
            type="item"
            description="A Demonstration Item"
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
            A demonstration of the item navigator shell. Each menu entry above
            is a "provider" supplying its own panel body.
          </p>
        `,
      },
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
          <div class="frame-wrapper">
            <ia-item-navigator
              baseHost="archive.org"
              .item=${this.demoItem}
              .menuContents=${this.menuContents}
              .sharedObserver=${this.sharedObserver}
              ?loaded=${this.loaded}
              ?viewAvailable=${this.viewAvailable}
              @fileListSorted=${this.handleFileListSorted}
            >
              <div slot="header" class="demo-header">Demo item header</div>
              <div slot="main" class="demo-theater">
                <p>
                  Your theater (book reader, media player, …) slots in here.
                </p>
              </div>
            </ia-item-navigator>
          </div>
        </div>

        <div slot="settings">
          <table>
            <tr>
              <td>Loaded</td>
              <td>
                <input
                  type="checkbox"
                  id="loaded"
                  ?checked=${this.loaded}
                  @change=${(e: Event) =>
                    (this.loaded = (e.target as HTMLInputElement).checked)}
                />
              </td>
            </tr>
            <tr>
              <td>View available</td>
              <td>
                <input
                  type="checkbox"
                  id="view-available"
                  ?checked=${this.viewAvailable}
                  @change=${(e: Event) =>
                    (this.viewAvailable = (
                      e.target as HTMLInputElement
                    ).checked)}
                />
              </td>
            </tr>
          </table>
          <p class="hint">
            Toggle "View available" off to show the no-theater placeholder.
            Narrow the demo below 600px wide to see the drawer switch from shift
            to overlay mode.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            The navigator is a shell: project a theater into
            <code>slot="main"</code> and drive the drawer with the
            <code>menuContents</code> provider array. It never renders a viewer
            itself.
          </p>
        </div>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    return `<ia-item-navigator
  baseHost="archive.org"
  .item=\${this.itemMetadata}
  .menuContents=\${this.menuProviders}
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
        height: 420px;
        border: 1px solid #ccc;
      }

      .demo-header {
        background: #1a1a1a;
        color: #fff;
        padding: 8px 12px;
        font-size: 0.9rem;
      }

      .demo-theater {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #fff;
        text-align: center;
        padding: 1rem;
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
