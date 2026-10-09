import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { customElement } from '@src/util/custom-element';
import '@internetarchive/icon-info/icon-info.js';

@customElement('ia-book-actions-info-icon')
@localized()
export class IABookActionsInfoIcon extends LitElement {
  @property({ type: String }) iconClass = '';

  helpURL = 'https://help.archive.org/help/borrowing-from-the-lending-library';

  render() {
    return html`
      <a
        class="more-info-icon ${this.iconClass}"
        href=${this.helpURL}
        target="_blank"
        title=${msg('Get more info on borrowing from The Lending Library')}
        data-event-click-tracking="BookReader|BrowsableMoreInfo"
      >
        <ia-icon-info></ia-icon-info>
      </a>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      ia-icon-info {
        display: inline-block;
        width: 18px;
        height: 20px;
        vertical-align: middle;
        --iconFillColor: white;
      }
      .more-info-icon img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        background: white;
      }
      .hidden {
        display: none;
      }
      .visible {
        display: inline-block;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-book-actions-info-icon': IABookActionsInfoIcon;
  }
}
