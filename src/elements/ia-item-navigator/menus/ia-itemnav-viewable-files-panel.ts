import {
  css,
  html,
  LitElement,
  nothing,
  TemplateResult,
  type CSSResultGroup,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import themeStyles from '@src/themes/theme-styles';
import { maskedIcon } from '../masked-icon';
import viewableFilesUrl from './icons/viewable-files.svg';
import type { FileSortOption, ViewableFileInfo } from './models';

/** Icon for the viewable-files menu shortcut / menu entry. */
export const viewableFilesIcon = maskedIcon(viewableFilesUrl);

/**
 * The "viewable files" side panel: a scrollable list of the item's viewable
 * files/volumes, linking each to its page on the host and highlighting the one
 * matching the current `subPrefix`. Populated by the host via `fileList`
 * (typically re-ordered by an `ia-itemnav-sort-files-button`).
 */
@customElement('ia-itemnav-viewable-files-panel')
export class IAItemNavViewableFilesPanel extends LitElement {
  @property({ type: String }) baseHost: string = 'archive.org';

  @property({ type: String }) sortOrderBy: FileSortOption = 'default';

  @property({ type: String }) subPrefix: string = '';

  @property({ type: Array }) fileList: ViewableFileInfo[] = [];

  @property({ type: Boolean, reflect: true }) addSortToUrl = false;

  firstUpdated(): void {
    const activeFile =
      this.shadowRoot?.querySelector<HTMLElement>('.content.active');
    // allow for css animations to run before scrolling to active file
    setTimeout(() => {
      // `scrollIntoViewIfNeeded` only auto-scrolls when the element is out of
      // view (Chrome, Safari); `scrollIntoView` is the cross-browser fallback.
      const scrollable = activeFile as HTMLElement & {
        scrollIntoViewIfNeeded?: (center: boolean) => void;
      };
      if (scrollable?.scrollIntoViewIfNeeded) {
        scrollable.scrollIntoViewIfNeeded(true);
      } else {
        activeFile?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }, 350);
  }

  fileUrl(item: ViewableFileInfo): string {
    const baseUrl = `//${this.baseHost}${item.url_path}`;
    if (this.addSortToUrl && this.sortOrderBy !== 'default') {
      return `${baseUrl}?sort=${this.sortOrderBy}`;
    }
    return baseUrl;
  }

  get pdfLabel(): TemplateResult {
    return html`<span class="pdf-label"
      ><span class="sr-only">view this</span> PDF</span
    >`;
  }

  fileLi(item: ViewableFileInfo): TemplateResult {
    const activeClass = this.subPrefix === item.file_subprefix ? ' active' : '';
    const hrefUrl = this.fileUrl(item);
    const isPdf = (item.file_source ?? '').match(/^[^+]+\.pdf$/i);

    return html`
      <li>
        <div class="separator"></div>
        <div class="content${activeClass}">
          <a href=${hrefUrl}>
            <p class="item-title">
              ${item.title}${isPdf ? this.pdfLabel : nothing}
            </p>
          </a>
        </div>
      </li>
    `;
  }

  get fileListTemplate(): TemplateResult {
    const filesDisplay = repeat(
      this.fileList,
      (file) => file?.file_prefix,
      this.fileLi.bind(this),
    );
    return html`
      <ul>
        ${filesDisplay}
        <div class="separator"></div>
      </ul>
    `;
  }

  render(): TemplateResult | typeof nothing {
    return this.fileList.length ? this.fileListTemplate : nothing;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-border-color--: var(
            --item-navigator-border-color,
            #4b4b4b
          );
          --item-navigator-active-file-border-color--: var(
            --item-navigator-active-file-border-color,
            #538bc5
          );

          display: block;
          overflow-y: auto;
          box-sizing: border-box;
          color: var(--item-navigator-text-color--);
          margin-top: 14px;
          margin-bottom: 2em;
          --active-border-width--: 2px;
          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        a {
          color: var(--item-navigator-text-color--);
          text-decoration: none;
        }

        ul {
          padding: 0;
          list-style: none;
          margin: var(--active-border-width--) 0.5em 1em 0;
        }

        ul > li:first-child .separator {
          display: none;
        }

        li {
          cursor: pointer;
          position: relative;
        }

        li .content {
          border: var(--active-border-width--) solid transparent;
          padding: 0.2em 0 0.4em 0.2em;
        }

        li .content.active {
          border: var(--active-border-width--) solid
            var(--item-navigator-active-file-border-color--);
        }

        li.content a {
          display: flex;
        }

        .item-title {
          margin-block-start: 0em;
          margin-block-end: 0em;
          font-size: 14px;
          font-weight: bold;
          word-wrap: break-word;
          padding-left: 5px;
        }

        .separator {
          background-color: var(--item-navigator-border-color--);
          width: 98%;
          margin: 1px auto;
          height: 1px;
        }

        .pdf-label {
          border: 1px solid;
          padding: 2px 5px;
          border-radius: 20px;
          display: inline-block;
          margin-left: 5px;
          font-size: 0.9em;
        }

        .pdf-label .sr-only {
          position: absolute;
          clip: rect(1px, 1px, 1px, 1px);
          padding: 0;
          border: 0;
          height: 1px;
          width: 1px;
          overflow: hidden;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-itemnav-viewable-files-panel': IAItemNavViewableFilesPanel;
  }
}
