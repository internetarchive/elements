import { html, css } from 'lit';
import Icon from './assets/img/icon';
import closeIcon from '@src/icons/topnav-close';
import { customElement } from '@src/util/custom-element';
import { localized, msg } from '@lit/localize';

@customElement('ia-topnav-icon-hamburger')
@localized()
export class HamBurger extends Icon {
  render() {
    if (this.active) return closeIcon;

    return html`
      <svg
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-labelledby="hamburgerTitleID hamburgerDescID"
      >
        <title id="hamburgerTitleID">${msg('Hamburger icon')}</title>
        <desc id="hamburgerDescID">
          ${msg(
            'An icon used to represent a menu that can be toggled by interacting with this icon.',
          )}
        </desc>
        <path
          d="m30.5 26.5c.8284271 0 1.5.6715729 1.5 1.5s-.6715729 1.5-1.5 1.5h-21c-.82842712 0-1.5-.6715729-1.5-1.5s.67157288-1.5 1.5-1.5zm0-8c.8284271 0 1.5.6715729 1.5 1.5s-.6715729 1.5-1.5 1.5h-21c-.82842712 0-1.5-.6715729-1.5-1.5s.67157288-1.5 1.5-1.5zm0-8c.8284271 0 1.5.6715729 1.5 1.5s-.6715729 1.5-1.5 1.5h-21c-.82842712 0-1.5-.6715729-1.5-1.5s.67157288-1.5 1.5-1.5z"
          fill="#999"
          fill-rule="evenodd"
        />
      </svg>
    `;
  }

  static get styles() {
    return css`
      svg {
        display: block;
        height: 4rem;
        width: 4rem;
        color: var(--activeColor);
      }
    `;
  }
}
