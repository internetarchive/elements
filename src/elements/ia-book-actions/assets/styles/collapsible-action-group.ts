import { css } from 'lit';

const whiteColor = css`var(--white, #fff)`;
const blackColor = css`var(--primaryBGColor, #000)`;
const dropdownBGColor = css`var(--iaBookActionsDropdownBGColor, #2d2d2d)`;

export default css`
  :host {
    display: inline-flex;
    height: 3.5rem; /* 35px at a 10px root */
    padding: var(--ia-space-2--) 0;
  }
  .actiongroup {
    display: flex;
    margin-right: 10px;
  }
  .action-buttons {
    display: inline-flex;
    align-items: center;
  }
  .action-buttons .ia-button {
    margin: 0;
    height: 3.5rem; /* 35px at a 10px root */
    padding: 0 var(--ia-space-4--);
  }
  .action-buttons .desktop {
    background-color: ${whiteColor};
    border-radius: 10px;
  }
  .action-buttons .desktop.purchase {
    margin-left: 5px;
  }
  .action-buttons .mobile.purchase.dark {
    padding-left: 0;
  }
  .primary {
    background-color: ${whiteColor};
    margin-right: 4px;
  }
  .primary,
  .secondary {
    position: relative;
    border-radius: 5px;
  }
  .primary .initial {
    border-radius: 4px 0 0 4px;
    margin-right: 0;
  }
  .primary svg {
    vertical-align: middle;
  }

  .secondary .ia-button.purchase {
    padding: 2px 10px 2px 35px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .secondary .ia-button.exit-admin {
    background-color: ${blackColor};
    border: 1px solid ${whiteColor};
  }

  .dropdown-content {
    position: absolute;
    min-width: 14rem; /* 140px at a 10px root */
    margin: 0;
    padding: 0;
    background: ${dropdownBGColor};
    border-radius: 4px;
    border: 1px solid var(--primaryCTABorder);
    top: 3.4rem; /* 34px at a 10px root */
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .dropdown-content li {
    color: ${blackColor};
    list-style: none;
    height: var(--ia-size-control-sm--);
  }
  .dropdown-content .ia-button {
    background: none;
    color: ${whiteColor};
    border: none;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    height: var(--ia-size-control-sm--);
    position: relative;
    padding: 0.6rem 1.2rem; /* 6px 12px at a 10px root */
    margin: 0;
  }
  .dropdown-content .ia-button:is(:focus-visible, :hover) {
    background: unset;
  }
  .dropdown-content li .ia-button {
    border-radius: 0;
  }
  .dropdown-content li .ia-button:hover {
    background: ${whiteColor};
    color: rgb(45, 45, 45);
  }
  .dropdown-content li:first-child .ia-button {
    border-radius: 0.3rem 0.3rem 0 0; /* 3px at a 10px root */
  }
  .dropdown-content li:last-child .ia-button {
    border-radius: 0;
    border-radius: 0 0 0.3rem 0.3rem; /* 3px at a 10px root */
  }
  .dropdown-content .purchase:hover svg g {
    fill: black;
  }
  .dropdown-content .purchase {
    padding-left: 35px;
    margin: 0;
  }
  .dropdown-content .purchase small {
    display: initial;
    font-size: var(--ia-font-size-md--);
  }

  .ia-button.down-arrow {
    border-radius: 0 var(--ia-radius-default--) var(--ia-radius-default--) 0;
    padding: 0 0.6rem; /* 6px at a 10px root */
    margin-left: 0;
  }
  .actionloader {
    vertical-align: middle;
    visibility: hidden;
    padding: 0.9rem 0.2rem; /* 9px 2px at a 10px root */
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
    background-color: ${whiteColor};
  }
  a {
    text-decoration: none;
  }
  .purchase small {
    display: block;
    font-size: 1rem; /* 10px at a 10px root */
  }
  .purchase svg {
    position: absolute;
    left: 10px;
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
