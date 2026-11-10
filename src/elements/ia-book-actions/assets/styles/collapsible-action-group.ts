import { css } from 'lit';

const whiteFill = css`var(--white, var(--ia-color-surface-raised--))`;
const whiteText = css`var(--white, var(--ia-color-text-inverse--))`;
const whiteBorder = css`var(--white, var(--ia-color-border-strong--))`;
const blackFill = css`var(--primaryBGColor, var(--ia-color-surface-theater--))`;
const blackText = css`var(--primaryBGColor, var(--ia-color-text-primary--))`;
const dropdownBGColor = css`var(--iaBookActionsDropdownBGColor, var(--ia-color-surface-inverse--))`;

export default css`
  :host {
    display: inline-flex;
    height: var(--ia-size-control-md--);
    padding: var(--ia-space-2--) 0;
  }
  .actiongroup {
    display: flex;
    margin-right: var(--ia-space-2--);
  }
  .action-buttons {
    display: inline-flex;
    align-items: center;
  }
  .action-buttons .ia-button {
    margin: 0;
    height: var(--ia-size-control-md--);
    padding: 0 var(--ia-space-4--);
  }
  .action-buttons .desktop {
    background-color: ${whiteFill};
    border-radius: var(--ia-radius-lg--);
  }
  .action-buttons .desktop.purchase {
    margin-left: var(--ia-space-1--);
  }
  .action-buttons .mobile.purchase.dark {
    padding-left: 0;
  }
  .primary {
    background-color: ${whiteFill};
    margin-right: 4px;
  }
  .primary,
  .secondary {
    position: relative;
    border-radius: var(--ia-radius-default--);
  }
  .primary .initial {
    border-radius: var(--ia-radius-default--) 0 0 var(--ia-radius-default--);
    margin-right: 0;
  }
  .primary svg {
    vertical-align: middle;
  }

  .secondary .ia-button.purchase {
    padding: 2px var(--ia-space-2--) 2px var(--ia-space-6--);
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .secondary .ia-button.exit-admin {
    background-color: ${blackFill};
    border: var(--ia-size-border-width--) solid ${whiteBorder};
  }

  .dropdown-content {
    position: absolute;
    min-width: calc(140 * var(--ia-unit, 1px));
    margin: 0;
    padding: 0;
    background: ${dropdownBGColor};
    border-radius: var(--ia-radius-default--);
    border: var(--ia-size-border-width--) solid var(--primaryCTABorder);
    top: calc(34 * var(--ia-unit, 1px));
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .dropdown-content li {
    color: ${blackText};
    list-style: none;
    height: var(--ia-size-control-sm--);
  }
  .dropdown-content .ia-button {
    background: none;
    color: ${whiteText};
    border: none;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    height: var(--ia-size-control-sm--);
    position: relative;
    padding: var(--ia-space-1--) var(--ia-space-2--);
    margin: 0;
  }
  .dropdown-content .ia-button:is(:focus-visible, :hover) {
    background: unset;
  }
  .dropdown-content li .ia-button {
    border-radius: 0;
  }
  .dropdown-content li .ia-button:hover {
    background: ${whiteFill};
    color: var(--ia-color-text-primary--);
  }
  .dropdown-content li:first-child .ia-button {
    border-radius: var(--ia-radius-sm--) var(--ia-radius-sm--) 0 0;
  }
  .dropdown-content li:last-child .ia-button {
    border-radius: 0;
    border-radius: 0 0 var(--ia-radius-sm--) var(--ia-radius-sm--);
  }
  .dropdown-content .purchase:hover svg g {
    fill: var(--ia-color-text-primary--);
  }
  .dropdown-content .purchase {
    padding-left: var(--ia-space-6--);
    margin: 0;
  }
  .dropdown-content .purchase small {
    display: initial;
    font-size: var(--ia-font-size-md--);
  }

  .ia-button.down-arrow {
    border-radius: 0 var(--ia-radius-default--) var(--ia-radius-default--) 0;
    padding: 0 var(--ia-space-1--);
    margin-left: 0;
  }
  .actionloader {
    vertical-align: middle;
    visibility: hidden;
    padding: var(--ia-space-2--) 2px;
  }
  .close {
    display: none;
  }
  .open {
    display: block;
    z-index: 2;
  }
  .visible {
    display: inline-block;
  }
  .btn:hover,
  .dropdown:hover .btn {
    background-color: ${whiteFill};
  }
  a {
    text-decoration: none;
  }
  .purchase small {
    display: block;
    font-size: var(--ia-font-size-xs--);
  }
  .purchase svg {
    position: absolute;
    left: var(--ia-space-2--);
    top: 20%;
  }
  .unavailable {
    opacity: 0.7;
    pointer-events: none;
  }
  .disabled {
    opacity: 0.8;
    pointer-events: none;
    visibility: visible;
  }
`;
