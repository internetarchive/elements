import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import themeStyles from '@src/themes/theme-styles';
import { maskedIcon } from '../masked-icon';
import sortAscUrl from './icons/sort-asc.svg';
import sortDescUrl from './icons/sort-desc.svg';
import sortNeutralUrl from './icons/sort-neutral.svg';
import type { FileSortOption, ViewableFileInfo } from './models';

const sortAscIcon = maskedIcon(sortAscUrl);

const sortDescIcon = maskedIcon(sortDescUrl);

const sortNeutralIcon = maskedIcon(sortNeutralUrl);

/**
 * A tri-state sort toggle for the viewable-files panel header. Cycles
 * default → title ascending → title descending → default, sorting the supplied
 * file list and emitting `fileListSorted` on each change.
 */
@customElement('ia-sort-files-button')
export class IASortFilesButton extends LitElement {
  @property({ type: Array }) fileListRaw: ViewableFileInfo[] = [];

  @property({ type: Array }) fileListSorted: ViewableFileInfo[] = [];

  @property({ type: String, reflect: true }) sortOrderBy: FileSortOption =
    'default';

  render(): TemplateResult {
    return html`<div class="sort-multi-file-list">${this.sortButton}</div>`;
  }

  get sortButton(): TemplateResult {
    const sortIcons: Record<FileSortOption, TemplateResult> = {
      default: html`
        <button
          class="sort-by neutral-icon"
          aria-label="Sort volumes in initial order"
          @click=${() => this.sortVolumes('title_asc')}
        >
          ${sortNeutralIcon}
        </button>
      `,
      title_asc: html`
        <button
          class="sort-by asc-icon"
          aria-label="Sort volumes in ascending order"
          @click=${() => this.sortVolumes('title_desc')}
        >
          ${sortAscIcon}
        </button>
      `,
      title_desc: html`
        <button
          class="sort-by desc-icon"
          aria-label="Sort volumes in descending order"
          @click=${() => this.sortVolumes('default')}
        >
          ${sortDescIcon}
        </button>
      `,
    };

    return sortIcons[this.sortOrderBy];
  }

  sortVolumes(sortType: FileSortOption): void {
    this.sortOrderBy = sortType;

    const sortedFiles = [...this.fileListRaw].sort((a, b) => {
      if (sortType === 'title_asc') return a.title.localeCompare(b.title);
      if (sortType === 'title_desc') return b.title.localeCompare(a.title);
      return (a.orig_sort ?? 0) - (b.orig_sort ?? 0);
    });

    this.dispatchEvent(
      new CustomEvent('fileListSorted', {
        detail: {
          sortType,
          sortedFiles,
        },
        bubbles: true,
        composed: true,
      }),
    );
    this.fileListSorted = sortedFiles;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --item-navigator-header-icon-width--: var(
            --item-navigator-header-icon-width,
            18px
          );
          --item-navigator-header-icon-height--: var(
            --item-navigator-header-icon-height,
            18px
          );
          --item-navigator-icon-color--: var(
            --item-navigator-icon-color,
            var(--item-navigator-text-color, var(--true-white))
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
        }

        button.sort-by {
          padding: 0;
          background-color: transparent;
          border: 0;
          cursor: pointer;
          display: inline-flex;
        }

        /* The glyph is a masked span: the mask supplies the shape, this
           supplies the paint. */
        button.sort-by .ia-icon {
          width: var(--item-navigator-header-icon-width--);
          height: var(--item-navigator-header-icon-height--);
          background-color: var(--item-navigator-icon-color--);
        }
      `,
    ];
  }
}
