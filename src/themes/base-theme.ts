import { css } from 'lit';

const baseTheme = {
  baseFontFamily: css`var(--ia-theme-base-font-family, "Helvetica Neue", Helvetica, Arial, sans-serif)`,
  primaryBackgroundColor: css`var(--ia-theme-primary-background-color, #fbfbfd)`,
  secondaryBackgroundColor: css`var(--ia-theme-secondary-background-color, #fff)`,
  primaryTextColor: css`var(--ia-theme-primary-text-color, #2c2c2c)`,
  secondaryTextColor: css`var(--ia-theme-secondary-text-color, #666)`,
  linkColor: css`var(--ia-theme-link-color, #4b64ff)`,
  primaryCTAFill: css`var(--ia-theme-primary-cta-fill, #194880)`,
};

export default baseTheme;
