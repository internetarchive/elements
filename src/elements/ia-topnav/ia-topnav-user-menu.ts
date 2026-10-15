import { html } from 'lit';
import DropdownMenu from './dropdown-menu';
import { property } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

@customElement('ia-topnav-user-menu')
export default class UserMenu extends DropdownMenu {
  @property({ type: String }) username = '';
  @property({ type: String }) screenName = '';

  render() {
    return html`
      <div class="nav-container">
        <nav
          class="${this.menuClass}"
          aria-hidden=${!this.open}
          aria-expanded=${this.open}
        >
          <h3>${this.screenName}</h3>
          <ul>
            ${this.dropdownItems}
          </ul>
        </nav>
      </div>
    `;
  }
}
