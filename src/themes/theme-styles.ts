import { css } from 'lit';
import { tokenStyles } from './tokens';

const themeStyles = css`
  ${tokenStyles}

  :host {
    /*
    BASE STYLES
    Default fallback values for theme styles, taken from the design tokens in
    tokens/tokens.json. Assumes a 10px root font size (html { font-size: 62.5% }).
    To adjust values, use theme styles below, or set the --ia-* tokens.
    */

    /* Typography */
    --default-font-family: var(--ia-font-family-base--);

    /* Sizing */
    --default-icon-width: var(--ia-size-icon-md--); /* 20px */
    --default-padding-sm: var(--ia-space-1--); /* 5px */
    --default-combo-box-width: auto;
    --default-search-bar-width: auto;
    --default-search-bar-height: var(--ia-size-control-sm--); /* 30px */
    --default-button-padding: 0 var(--ia-space-6--); /* 0 30px */
    --default-button-height: var(--ia-size-control-md--); /* 36px */
    --default-button-width: fit-content;
    --default-button-border-width: var(--ia-size-border-width--);
    --default-button-border-radius: var(--ia-radius-default--); /* 4px */
    --default-font-size-standard: var(--ia-font-size-md--); /* 14px */
    --default-font-size-lg: var(--ia-font-size-4xl--); /* 36px */

    /*
    Colors. Some components read these by name. New code uses the tokens.
    */
    --true-white: var(--ia-color-palette-white--);
    --off-white: var(--ia-color-palette-gray-50--);
    --dark-gray: var(--ia-color-palette-gray-850--);
    --mid-gray: var(--ia-color-palette-gray-800--);
    --light-gray: var(--ia-color-palette-gray-600--);
    --lighter-gray: var(--ia-color-palette-gray-500--);
    --lightest-gray: var(--ia-color-palette-navy-100--);
    --classic-red: var(--ia-color-palette-red-500--);
    --brick: var(--ia-color-legacy-brick--);
    --coral: var(--ia-color-legacy-coral--);
    --dark-cantaloupe: var(--ia-color-legacy-orange-500--);
    --cantaloupe: var(--ia-color-legacy-orange-400--);
    --mint-green: var(--ia-color-palette-green-700--); /* D-10 */
    --navy-blue: var(--ia-color-palette-navy-700--);
    --bright-blue: var(--ia-color-legacy-blue-500--);
    --default-icon-color: currentColor;
    --default-icon-filter: none;
    --default-icon-transition: none;

    /*
    ADJUSTABLE STYLES
    To be adjusted by setting i.e. --ia-theme-link-color at the :root or component level.
    */

    /* Text */
    --base-font-family: var(
      --ia-theme-base-font-family,
      var(--default-font-family)
    );
    --primary-text-color: var(
      --ia-theme-primary-text-color,
      var(--ia-color-text-primary--)
    );
    --secondary-text-color: var(
      --ia-theme-secondary-text-color,
      var(--ia-color-text-secondary--)
    );
    --link-color: var(--ia-theme-link-color, var(--ia-color-text-link--));

    /* Sizing */
    --icon-width: var(--ia-theme-icon-width, var(--default-icon-width));
    /* Icons are square unless a height is set on its own */
    --icon-height: var(--ia-theme-icon-height, var(--icon-width));
    --padding-sm: var(--ia-theme-padding-sm, var(--default-padding-sm));
    --search-bar-height: var(
      --ia-theme-search-bar-height,
      var(--default-search-bar-height)
    );
    --search-bar-width: var(
      --ia-theme-search-bar-width,
      var(--default-search-bar-width)
    );
    --combo-box-width: var(
      --ia-theme-combo-box-width,
      var(--default-combo-box-width)
    );
    --button-padding: var(
      --ia-theme-button-padding,
      var(--default-button-padding)
    );
    --button-height: var(
      --ia-theme-button-height,
      var(--default-button-height)
    );
    --button-width: var(--ia-theme-button-width, var(--default-button-width));
    --button-border-width: var(
      --ia-theme-button-border-width,
      var(--default-button-border-width)
    );
    --button-border-radius: var(
      --ia-theme-button-border-radius,
      var(--default-button-border-radius)
    );
    --font-size-standard: var(
      --ia-theme-font-size-standard,
      var(--default-font-size-standard)
    );
    --font-size-lg: var(--ia-theme-font-size-lg, var(--default-font-size-lg));

    /* Backgrounds and fills */
    --icon-color: var(--ia-theme-icon-color, var(--default-icon-color));
    --icon-filter: var(--ia-theme-icon-filter, var(--default-icon-filter));
    --icon-transition: var(
      --ia-theme-icon-transition,
      var(--default-icon-transition)
    );
    --primary-background-color: var(
      --ia-theme-primary-background-color,
      var(--ia-color-surface-page--)
    );
    --secondary-background-color: var(
      --ia-theme-secondary-background-color,
      var(--ia-color-surface-raised--)
    );

    /* State colors */
    /* Primary */
    --primary-cta-fill: var(
      --ia-theme-primary-cta-fill,
      var(--ia-color-action-primary-fill--)
    );
    --primary-cta-text-color: var(
      --ia-theme-primary-cta-text-color,
      var(--ia-color-action-primary-text--)
    );
    --primary-cta-border: var(
      --ia-theme-primary-cta-border,
      var(--ia-color-action-primary-border--)
    );

    /* Secondary */
    --secondary-cta-text-color: var(
      --ia-theme-secondary-cta-text-color,
      var(--ia-color-action-secondary-text--)
    );
    --secondary-cta-fill: var(
      --ia-theme-secondary-cta-fill,
      var(--ia-color-action-secondary-fill--)
    );
    --secondary-cta-border: var(
      --ia-theme-secondary-cta-border,
      var(--ia-color-action-secondary-border--)
    );

    /* Danger */
    --danger-cta-text-color: var(
      --ia-theme-danger-cta-text-color,
      var(--ia-color-action-danger-text--)
    );
    --danger-cta-fill: var(
      --ia-theme-danger-cta-fill,
      var(--ia-color-action-danger-fill--)
    );
    --danger-cta-border: var(
      --ia-theme-danger-cta-border,
      var(--ia-color-action-danger-border--)
    );

    /* Warning */
    --warning-cta-text-color: var(
      --ia-theme-warning-cta-text-color,
      var(--ia-color-action-warning-text--)
    );
    --warning-cta-fill: var(
      --ia-theme-warning-cta-fill,
      var(--ia-color-action-warning-fill--)
    );
    --warning-cta-border: var(
      --ia-theme-warning-cta-border,
      var(--ia-color-action-warning-border--)
    );

    /* Donate */
    --donate-cta-text-color: var(
      --ia-theme-donate-cta-text-color,
      var(--ia-color-action-donate-text--)
    );
    --donate-cta-fill: var(
      --ia-theme-donate-cta-fill,
      var(--ia-color-action-donate-fill--)
    );
    --donate-cta-border: var(
      --ia-theme-donate-cta-border,
      var(--ia-color-action-donate-border--)
    );

    /* Disabled */
    --disabled-cta-text-color: var(
      --ia-theme-disabled-cta-text-color,
      var(--ia-color-action-disabled-text--)
    );
    --disabled-cta-fill: var(
      --ia-theme-disabled-cta-fill,
      var(--ia-color-action-disabled-fill--)
    );
    --disabled-cta-border: var(
      --ia-theme-disabled-cta-border,
      var(--ia-color-action-disabled-border--)
    );

    /* Standalone colors */
    --color-success: var(
      --ia-theme-color-success,
      var(--ia-color-status-success--)
    );
    --color-danger: var(
      --ia-theme-color-danger,
      var(--ia-color-status-danger--)
    );
  }
`;

export default themeStyles;
