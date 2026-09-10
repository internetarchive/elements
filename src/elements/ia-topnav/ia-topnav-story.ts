import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './ia-topnav';
import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import '@demo/story-template';

import type { IATopNav } from './ia-topnav';

/**
 * Enough of an item to exercise the admin sections of the user menu. Biblio
 * has to arrive with a query string already on it, since the identifier is
 * appended to it.
 */
const DEMO_ITEM_IDENTIFIER = 'goody';
const DEMO_UPLOADER = 'uploader@archive.org';
const DEMO_BIBLIO = 'https://openlibrary.org/search/inside?q=';

@customElement('ia-topnav-story')
export class IATopNavStory extends LitElement {
  @state() private signedIn = false;

  @state() private onAnItem = false;

  @state() private admin = false;

  @state() private canManageFlags = false;

  @state() private hideSearch = false;

  @state() private lastEvent = '';

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

  private toggleRow(
    label: string,
    key: 'signedIn' | 'onAnItem' | 'admin' | 'canManageFlags' | 'hideSearch',
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
          </table>
          <p class="hint">
            The admin sections of the user menu need all three of Signed in,
            Viewing an item and Admin on the item. Narrow the window below 890px
            for the mobile layout.
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
