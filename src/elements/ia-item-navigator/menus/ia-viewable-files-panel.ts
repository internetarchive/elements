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
import type { FileSortOption, ViewableFileInfo } from './models';

/** Icon for the viewable-files menu shortcut / menu entry. */
export const viewableFilesIcon = html`
  <svg
    class="ia-icon"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="viewableFilesTitleID"
  >
    <title id="viewableFilesTitleID">Viewable Files</title>
    <g class="fill-color">
      <path
        d="m9.83536396 0h10.07241114c.1725502.47117517.3378411.76385809.4958725.87804878.1295523.11419069.3199719.1998337.5712586.25692905.2512868.05709534.4704647.08564301.6575337.08564301h.2806036v15.24362526h-4.3355343v3.8106985h-4.44275v3.7250554h-12.01318261c-.27306495 0-.50313194-.085643-.69020098-.256929-.18706903-.1712861-.30936193-.3425721-.36687867-.5138581l-.06449694-.2785477v-14.2159091c0-.32815965.08627512-.5922949.25882537-.79240577.17255024-.20011086.34510049-.32150776.51765073-.36419068l.25882537-.0640244h3.36472977v-2.54767184c0-.31374722.08627513-.57067627.25882537-.77078714.17255025-.20011086.34510049-.32150776.51765074-.36419068l.25882536-.06402439h3.36472978v-2.56929047c0-.32815964.08627512-.5922949.25882537-.79240576.17255024-.20011087.34510049-.31430156.51765073-.34257207zm10.78355264 15.6294346v-13.53076498c-.2730649-.08536585-.4456152-.16380266-.5176507-.23531042-.1725502-.1424612-.2730649-.27078714-.3015441-.38497783v13.36031043h-9.87808272c0 .0144124-.02149898.0144124-.06449694 0-.04299795-.0144124-.08962561.006929-.13988296.0640244-.05025735.0570953-.07538603.1427383-.07538603.256929s.02149898.210643.06449694.289357c.04299795.078714.08599591.1322062.12899387.1604767l.06449693.0216187h10.71905571zm-10.2449613-2.4412417h7.98003v-11.60421286h-7.98003zm1.6827837-9.41990022h4.6153002c.1725502 0 .3199718.05349224.4422647.16047672s.1834393.23891353.1834393.39578714c0 .15687362-.0611464.28519956-.1834393.38497783s-.2697145.1496674-.4422647.1496674h-4.6153002c-.1725503 0-.3199719-.04988913-.4422647-.1496674-.1222929-.09977827-.1834394-.22810421-.1834394-.38497783 0-.15687361.0611465-.28880266.1834394-.39578714.1222928-.10698448.2697144-.16047672.4422647-.16047672zm-6.08197737 13.50997782h7.72120467v-.8131929h-3.79610541c-.27306495 0-.49950224-.085643-.67931188-.256929-.17980964-.1712861-.29847284-.3425721-.35598958-.5138581l-.06449694-.2785477v-10.02023282h-2.82530086zm6.77217827-11.36890243h3.2139578c.1295522 0 .240956.05709534.3342113.17128603.0932554.11419069.139883.24972284.139883.40659645 0 .15687362-.0466276.28880267-.139883.39578714-.0932553.10698448-.2046591.16047672-.3342113.16047672h-3.2139578c-.1295523 0-.2373264-.05349224-.3233223-.16047672-.0859959-.10698447-.1289938-.23891352-.1289938-.39578714 0-.15687361.0429979-.29240576.1289938-.40659645s.19377-.17128603.3233223-.17128603zm-11.15043132 15.11557653h7.69942646v-.7491685h-3.79610539c-.25854616 0-.48135376-.0892462-.66842279-.2677384-.18706904-.1784922-.30936193-.3605876-.36687868-.546286l-.06449694-.2569291v-10.04101994h-2.80352266zm14.62237682-4.5606985h-.8191949v2.1410754h-9.89986085s-.04299796.0285477-.12899387.085643c-.08599592.0570954-.12201369.1427384-.10805331.2569291 0 .1141907.01786928.210643.05360784.289357.03573856.0787139.07538603.125.1189424.138858l.06449694.0432373h10.71905575v-2.9542683zm-4.3991936 3.8106985h-.8191949v2.077051h-9.8563045c0 .0144124-.02149898.0144124-.06449694 0-.04299795-.0144125-.08962561.0105321-.13988296.0748337-.05025735.0643015-.07538603.1607538-.07538603.289357 0 .1141906.02149898.2070399.06449694.2785476.04299795.0715078.08599591.1141907.12899387.1280488l.06449693.0216186h10.69811519v-2.8686252z"
      />
    </g>
  </svg>
`;

/**
 * The "viewable files" side panel: a scrollable list of the item's viewable
 * files/volumes, linking each to its page on the host and highlighting the one
 * matching the current `subPrefix`. Populated by the host via `fileList`
 * (typically re-ordered by an `ia-sort-files-button`).
 */
@customElement('ia-viewable-files-panel')
export class IAViewableFilesPanel extends LitElement {
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

  render(): TemplateResult {
    return html`${this.fileList.length ? this.fileListTemplate : nothing}`;
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
          --item-navigator-separator-color--: var(
            --item-navigator-separator-color,
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
          background-color: var(--item-navigator-separator-color--);
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
