import { css } from 'lit';

const themeStyles = css`
  :host {
    /* 
    BASE STYLES 
    Default fallback values for theme styles. To adjust values, use theme styles below.
    */

    /* Colors */
    --true-white: #fff;
    --off-white: #fbfbfd;
    --dark-gray: #2c2c2c;
    --light-gray: #666;
    --navy-blue: #194880;
    --bright-blue: #4b64ff;

    /* Typography */
    --default-font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    /* 
    ADJUSTABLE STYLES 
    To be adjusted by setting i.e. --ia-theme-link-color at the :root or component level.
    */

    /* Text */
    --base-font-family: var(--ia-theme-base-font-family, --default-font-family);
    --primary-text-color: var(--ia-theme-primary-text-color, --dark-gray);
    --secondary-text-color: var(--ia-theme-secondary-text-color, --light-gray);
    --link-color: var(--ia-theme-link-color, --bright-blue);

    /* Backgrounds and fills */
    --primary-background-color: var(
      --ia-theme-primary-background-color,
      --off-white
    );
    --secondary-background-color: var(
      --ia-theme-secondary-background-color,
      --true-white
    );

    /* State colors */
    --primary-cta-fill: var(--ia-theme-primary-cta-fill, --navy-blue);
  }
`;

export default themeStyles;
