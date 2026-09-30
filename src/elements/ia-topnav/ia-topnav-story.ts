import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import './ia-topnav';
import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import '@demo/story-template';
import { tagFromHash } from '@demo/element-hash';

import type { IATopNav } from './ia-topnav';

/**
 * Enough of an item to exercise the admin sections of the user menu. Biblio
 * has to arrive with a query string already on it, since the identifier is
 * appended to it.
 */
const DEMO_ITEM_IDENTIFIER = 'goody';
const DEMO_UPLOADER = 'uploader@archive.org';
const DEMO_BIBLIO = 'https://openlibrary.org/search/inside?q=';

/**
 * The topnav sizes everything in rem against the 10px root font size that
 * archive.org and offshoot both set, so at the demo's 16px root it renders
 * 1.6x too big and its menus get cut off.
 */
const ARCHIVE_ROOT_FONT_SIZE = '10px';

@customElement('ia-topnav-story')
export class IATopNavStory extends LitElement {
  @state() private signedIn = false;

  @state() private onAnItem = false;

  @state() private admin = false;

  @state() private canManageFlags = false;

  @state() private hideSearch = false;

  @state() private lastEvent = '';

  /**
   * Matches archive.org's root font size. On by default only when the topnav
   * is the element being viewed, since the root size applies to the whole
   * demo page and would shrink every other story in the all-elements view.
   */
  @state() private archiveFontSize =
    tagFromHash(window.location.hash) === 'ia-topnav';

  private rootFontSizeBefore?: string;

  updated() {
    const root = document.documentElement.style;
    if (this.archiveFontSize && this.rootFontSizeBefore === undefined) {
      this.rootFontSizeBefore = root.fontSize;
      root.fontSize = ARCHIVE_ROOT_FONT_SIZE;
    } else if (!this.archiveFontSize) {
      this.restoreRootFontSize();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.restoreRootFontSize();
  }

  private get propInputData() {
    const settings: PropInputSettings<IATopNav>[] = [
      {
        label: 'Wayback pages archived',
        propertyName: 'waybackPagesArchived',
        defaultValue: '916 billion',
      },
    ];
    return { settings };
  }

  private onAnalyticsClick(e: CustomEvent): void {
    this.lastEvent = `analyticsClick → ${e.detail?.event ?? ''}`;
  }

  private onAnalyticsSubmit(e: CustomEvent): void {
    this.lastEvent = `analyticsSubmit → ${e.detail?.event ?? ''}`;
  }

  private restoreRootFontSize() {
    if (this.rootFontSizeBefore === undefined) return;
    document.documentElement.style.fontSize = this.rootFontSizeBefore;
    this.rootFontSizeBefore = undefined;
  }

  private toggleRow(
    label: string,
    key:
      | 'signedIn'
      | 'onAnItem'
      | 'admin'
      | 'canManageFlags'
      | 'hideSearch'
      | 'archiveFontSize',
  ) {
    return html`
      <tr>
        <td>${label}</td>
        <td>
          <input
            type="checkbox"
            .checked=${this[key]}
            @change=${() => {
              this[key] = !this[key];
            }}
          />
        </td>
      </tr>
    `;
  }

  render() {
    const username = this.signedIn ? 'brewster' : '';
    const screenName = this.signedIn ? 'Brewster' : '';
    const itemIdentifier = this.onAnItem ? DEMO_ITEM_IDENTIFIER : '';
    const uploader = this.onAnItem && this.admin ? DEMO_UPLOADER : '';
    const biblio = this.onAnItem && this.admin ? DEMO_BIBLIO : '';

    return html`
      <story-template
        elementTag="ia-topnav"
        elementClassName="IATopNav"
        .propInputData=${this.propInputData}
      >
        <div slot="demo">
          <ia-topnav
            username=${username}
            screenName=${screenName}
            itemIdentifier=${itemIdentifier}
            uploader=${uploader}
            biblio=${biblio}
            ?admin=${this.admin}
            ?canManageFlags=${this.canManageFlags}
            ?hideSearch=${this.hideSearch}
            @analyticsClick=${this.onAnalyticsClick}
            @analyticsSubmit=${this.onAnalyticsSubmit}
          ></ia-topnav>
          <p class="event-log">${this.lastEvent || 'No events yet.'}</p>
        </div>

        <div slot="settings">
          <table>
            ${this.toggleRow('Signed in', 'signedIn')}
            ${this.toggleRow('Viewing an item', 'onAnItem')}
            ${this.toggleRow('Admin on the item', 'admin')}
            ${this.toggleRow('Can manage flags', 'canManageFlags')}
            ${this.toggleRow('Hide search', 'hideSearch')}
            ${this.toggleRow('archive.org font size', 'archiveFontSize')}
          </table>
          <p class="hint">
            The admin sections of the user menu need all three of Signed in,
            Viewing an item and Admin on the item. Narrow the window below 890px
            for the mobile layout.
          </p>
          <p class="hint">
            archive.org font size sets the page's root font size to 10px, which
            the topnav is built for. It applies to the whole demo page, so it's
            on by default only when the topnav is the element being viewed.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            The topnav renders the whole archive.org masthead: the primary nav,
            the media menu and its slider, the wayback search, and the account
            dropdown. It reports clicks and form submits through
            <code>analyticsClick</code> and <code>analyticsSubmit</code> rather
            than talking to an analytics service itself.
          </p>
          <p>
            The user menu grows an admin section when
            <code>itemIdentifier</code> and <code>admin</code> are both set.
            Setting <code>uploader</code> adds the uploader's account links, and
            <code>biblio</code> adds the book-scanning links for a texts item.
          </p>
          <p>
            Sizes are in rem and assume the host page sets
            <code>html { font-size: 10px }</code>, as archive.org and offshoot
            both do.
          </p>
          <p>
            A search bar goes in the <code>search</code> slot. Offshoot slots an
            <code>ia-dropdown-search-bar</code> in there.
          </p>
        </div>
      </story-template>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .event-log {
        margin: 0.8rem 0 0;
        font-family: monospace;
        font-size: 1.2rem;
      }

      .hint {
        font-size: 1.2rem;
      }

      td {
        padding-right: 1rem;
      }
    `;
  }
}
