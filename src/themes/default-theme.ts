import { css } from 'lit';

const defaultTypography = {
  fontFamily: css`"Helvetica Neue", Helvetica, Arial, sans-serif`,
};

const defaultColors = {
  /* Whites */
  trueWhite: css`#ffffff`,
  offWhite: css`#fbfbfd`,

  /* Grays */
  darkGray: css`#2c2c2c`,
  lightGray: css`#666666`,

  /* Blues */
  navyBlue: css`#194880`,
  brightBlue: css`#4b64ff`,
};

const defaultTheme = css`
  :host {
    /* Text */
    --ia-theme-base-font-family: ${defaultTypography.fontFamily};
    --ia-theme-primary-text-color: ${defaultColors.darkGray};
    --ia-theme-secondary-text-color: ${defaultColors.lightGray};
    --ia-theme-link-color: ${defaultColors.brightBlue};

    /* Backgrounds and fills */
    --ia-theme-primary-background-color: ${defaultColors.offWhite};
    --ia-theme-secondary-background-color: ${defaultColors.trueWhite};

    /* State colors */
    --ia-theme-primary-cta-fill: ${defaultColors.navyBlue};
  }
`;

export default defaultTheme;
