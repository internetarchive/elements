import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import themeStyles from '@src/themes/theme-styles';
import type { FileSortOption, ViewableFileInfo } from './models';

const sortAscIcon = html`
  <svg name="sort-asc" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <path
        d="m2.32514544 8.30769231.7756949-2.08468003h2.92824822l.75630252 2.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976 6.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z"
        fill="currentColor"
        fill-rule="nonzero"
      />
      <path
        d="m7.1689722 16.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666 5.3716871v.7756949z"
        fill="currentColor"
        fill-rule="nonzero"
      />
      <path
        d="m10.3846154 11.0769231 2.7692308 5.5384615 2.7692307-5.5384615m-2.7692307 4.1538461v-13.15384612"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.661538"
        transform="matrix(1 0 0 -1 0 18.692308)"
      />
    </g>
  </svg>
`;

const sortDescIcon = html`
  <svg name="sort-desc" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <path
        d="m2.32514544 8.30769231.7756949-2.08468003h2.92824822l.75630252 2.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976 6.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z"
        fill="currentColor"
        fill-rule="nonzero"
      />
      <path
        d="m7.1689722 16.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666 5.3716871v.7756949z"
        fill="currentColor"
        fill-rule="nonzero"
      />
      <path
        d="m10.3846154 11.0769231 2.7692308 5.5384615 2.7692307-5.5384615m-2.7692307 4.1538461v-13.15384612"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.661538"
      />
    </g>
  </svg>
`;

const sortNeutralIcon = html`
  <svg
    name="sort-neutral"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="currentColor" fill-rule="evenodd">
      <path
        d="m2.32514544 8.30769231.7756949-2.08468003h2.92824822l.75630252 2.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976 6.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z"
        fill-rule="nonzero"
      />
      <path
        d="m7.1689722 16.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666 5.3716871v.7756949z"
        fill-rule="nonzero"
      />
      <circle cx="13" cy="9" r="2" />
    </g>
  </svg>
`;

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
          color: var(--item-navigator-icon-color--);
          display: inline-flex;
        }

        button.sort-by svg {
          width: var(--item-navigator-header-icon-width--);
          height: var(--item-navigator-header-icon-height--);
        }
      `,
    ];
  }
}
