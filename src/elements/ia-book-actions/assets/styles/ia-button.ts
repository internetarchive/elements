import { css } from 'lit';

const whiteText = css`var(--white, var(--ia-color-action-primary-text--))`;
const whiteFocusRing = css`var(--white, var(--ia-color-border-focus-band--))`;
const disabledButtonFillColor = css`var(--primaryDisableCTAFill, var(--ia-color-action-disabled-fill--))`;
const disabledButtonBorderColor = css`var(--secondaryCTABorder, var(--ia-color-action-disabled-border--))`;

const primaryButtonFillColor = css`var(--primaryCTAFill, var(--ia-color-action-primary-fill--))`;
const primaryButtonFillColorRGB = css`var(--primaryCTAFillRGB, 25, 72, 128)`; // RBG format of --primaryCTAFill
const primaryButtonBorderColor = css`var(--primaryCTABorder, var(--ia-color-action-primary-border--))`;

const dangerButtonFillColor = css`var(--primaryErrorCTAFill, var(--ia-color-action-danger-fill--))`;
const dangerButtonFillColorRGB = css`var(--primaryErrorCTAFillRGB, 229, 28, 38)`; // RBG format of --primaryErrorCTAFill
const dangerButtonBorderColor = css`var(--primaryErrorCTABorder, var(--ia-color-action-danger-border--))`;

const darkButtonFillColor = css`var(--secondaryCTAFill, var(--ia-color-surface-chrome-secondary--))`;
const darkButtonFillColorRGB = css`var(--secondaryCTAFillRGB, 51, 51, 51)`; // RBG format of --secondaryCTAFill
const darkButtonBorderColor = css`var(--primaryCTABorder, var(--ia-color-border-strong--))`;

const warningButtonBGColor = css`#ee8950`;
const warningButtonBorderColor = css`#ec7939`;

export default css`
  .ia-button {
    min-height: var(--ia-size-control-sm--);
    cursor: pointer;
    color: ${whiteText};
    line-height: normal;
    border-radius: var(--ia-radius-default--);
    font-size: var(--ia-font-size-md--);
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: var(--ia-size-border-width--) solid transparent;
    white-space: nowrap;
    appearance: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: all 0.1s ease 0s;
    vertical-align: middle;
    padding: 0 var(--ia-space-2--);
    outline-color: ${whiteFocusRing};
    outline-offset: calc(-1 * var(--ia-size-focus-ring-offset--));
    user-select: none;
    text-decoration: none;
    width: fit-content;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
  }
  .ia-button:focus-visible {
    outline-style: double;
  }
  .ia-button:disabled {
    cursor: not-allowed;
    background-color: ${disabledButtonFillColor};
    border: var(--ia-size-border-width--) solid ${disabledButtonBorderColor};
  }
  .ia-button.transparent {
    background-color: transparent;
  }
  .ia-button.warning {
    background-color: ${warningButtonBGColor}
    border-color: ${warningButtonBorderColor};
  }

  .ia-button.primary {
    background-color: ${primaryButtonFillColor};
    border-color: ${primaryButtonBorderColor};
  }
  .ia-button.primary:hover {
    background-color: rgba(${primaryButtonFillColorRGB}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${primaryButtonFillColorRGB}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${primaryButtonFillColorRGB}, 0.7);
  }

  .ia-button.danger {
    background-color: ${dangerButtonFillColor};
    border-color: ${dangerButtonBorderColor};
  }
  .ia-button.danger:hover {
    background-color: rgba(${dangerButtonFillColorRGB}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${dangerButtonFillColorRGB}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${dangerButtonFillColorRGB}, 0.7);
  }

  .ia-button.dark {
    background-color: ${darkButtonFillColor};
    border-color: ${darkButtonBorderColor};
  }
  .ia-button.dark:hover {
    background-color: rgba(${darkButtonFillColorRGB}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${darkButtonFillColorRGB}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${darkButtonFillColorRGB}, 0.7);
  }
`;
