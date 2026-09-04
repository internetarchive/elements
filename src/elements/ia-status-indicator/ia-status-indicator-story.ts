import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IAStatusIndicator } from './ia-status-indicator';

import './ia-status-indicator';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Width',
    cssVariable: '--ia-theme-icon-width',
    defaultValue: '1.25rem',
    /* The widths real consumers render the indicator at */
    presets: [
      { label: 'Default', value: '1.25rem', note: '--default-icon-width' },
      { label: 'OTP form', value: '3rem', note: 'font-size-lg x 1.33' },
      { label: 'Page', value: '4rem', note: 'home, details router' },
      { label: 'Theater', value: '5rem', note: 'theater, bookreader' },
      { label: 'Account settings', value: '6rem', note: 'account settings' },
    ],
  },
  {
    section: 'Color',
    label: 'Loading',
    cssVariable: '--ia-theme-primary-text-color',
    defaultValue: '#2c2c2c',
    inputType: 'color',
    presets: [
      { label: 'White', value: '#ffffff', note: 'theater, bookreader' },
    ],
    /* One swatch and one button read fine on a single line */
    presetsInline: true,
  },
  {
    section: 'Color',
    label: 'Success',
    cssVariable: '--ia-theme-color-success',
    defaultValue: '#31a481',
    inputType: 'color',
  },
  {
    section: 'Color',
    label: 'Error',
    cssVariable: '--ia-theme-color-danger',
    defaultValue: '#e51c23',
    inputType: 'color',
  },
];

const propInputSettings: PropInputSettings<IAStatusIndicator>[] = [
  {
    label: 'Mode',
    propertyName: 'mode',
    reflects: true,
    defaultValue: 'loading',
    inputType: 'radio',
    radioOptions: ['loading', 'success', 'error'],
  },
  {
    label: 'Mediatype icon',
    propertyName: 'mediatype',
    reflects: true,
    defaultValue: 'none',
    inputType: 'radio',
    // 'none' is a sentinel: the settings panel skips empty values, and the
    // component degrades any unmapped mediatype to the default dots.
    radioOptions: [
      'none',
      'audio',
      'collection',
      'etree',
      'images',
      'search',
      'software',
      'texts',
      'tv',
      'video',
      'web',
    ],
  },
  {
    label: 'Hide dots (bare ring)',
    propertyName: 'hideDots',
    reflects: true,
    // A boolean defaultValue makes the settings panel coerce 'true'/'false'
    // back into real booleans before assigning them.
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [false, true],
  },
  {
    section: 'Accessible titles',
    label: 'Loading',
    propertyName: 'loadingTitle',
    defaultValue: 'Loading...',
  },
  {
    section: 'Accessible titles',
    label: 'Success',
    propertyName: 'successTitle',
    defaultValue: 'Success',
  },
  {
    section: 'Accessible titles',
    label: 'Error',
    propertyName: 'errorTitle',
    defaultValue: 'Error',
  },
];

/* Perceived luminance above which the indicator needs a dark surface to show */
const LIGHT_THRESHOLD = 0.75;

/**
 * Perceived luminance of a #rgb or #rrggbb colour, 0 (black) to 1 (white).
 * Returns undefined for anything it can't parse, so callers can leave the
 * surface alone rather than guess.
 */
function luminance(color: string): number | undefined {
  const hex = color.trim().replace('#', '');
  const full =
    hex.length === 3
      ? hex
          .split('')
          .map((c) => c + c)
          .join('')
      : hex;
  if (!/^[0-9a-f]{6}$/i.test(full)) return undefined;

  const [r, g, b] = [0, 2, 4].map(
    (i) => parseInt(full.slice(i, i + 2), 16) / 255,
  );
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

@customElement('ia-status-indicator-story')
export class IAStatusIndicatorStory extends LitElement {
  /* Puts the indicator on black, as the theater and bookreader do */
  @state() private darkSurface = false;

  @query('ia-status-indicator') private demoComponent?: IAStatusIndicator;

  render() {
    return html`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{ settings: styleInputSettings, revertable: true }}
        .propInputData=${{ settings: propInputSettings }}
        @stylesApplied=${this.handleStylesApplied}
      >
        <ia-status-indicator
          slot="demo"
          style=${this.demoStyles}
        ></ia-status-indicator>

        <form slot="settings" @submit=${this.preventSubmit}>
          <button type="button" class="reset" @click=${this.reset}>
            Reset props
          </button>
        </form>
      </story-template>
    `;
  }

  /*
   * The background is the only thing set inline. Width and colour live in the
   * Styles panel, which applies to the demo's container -- setting either
   * inline too would override the panel and make its presets look broken.
   */
  private get demoStyles(): string {
    if (!this.darkSurface) return '';
    return 'background-color: #000000;padding: 1rem';
  }

  /*
   * A white indicator on the demo's white page is invisible, so a light
   * loading colour (the theater's treatment) gets a dark surface to sit on.
   */
  private handleStylesApplied(e: Event): void {
    const styles = (e as CustomEvent).detail?.styles;
    if (typeof styles !== 'string') return;

    // Revert sends an empty string, meaning "back to component defaults"
    if (!styles) {
      this.darkSurface = false;
      return;
    }

    const loadingColor = styles.match(
      /--ia-theme-primary-text-color:\s*([^;\n]+)/,
    )?.[1];
    if (!loadingColor) return;

    const light = luminance(loadingColor);
    if (light === undefined) return;
    this.darkSurface = light > LIGHT_THRESHOLD;
  }

  /*
   * Resets only the props the settings panel applies. The Styles panel has its
   * own Reset for the CSS variables, and the surface follows the colour. The
   * panel's radios don't follow this, so they can read stale until re-applied.
   */
  private reset(): void {
    const demo = this.demoComponent;
    if (!demo) return;
    demo.mode = 'loading';
    demo.mediatype = undefined;
    demo.hideDots = false;
  }

  private preventSubmit(e: Event): void {
    e.preventDefault();
  }

  static get styles(): CSSResultGroup {
    return css`
      fieldset {
        border: 1px solid var(--medium-gray, #999);
        margin-bottom: 1rem;
      }

      .row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.15rem;
        padding: 0.4rem 0.6rem;
        cursor: pointer;
      }

      button.selected {
        outline: 2px solid var(--link-color, dodgerblue);
        font-weight: 700;
      }

      button small {
        font-weight: 400;
        opacity: 0.7;
      }

      label {
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }

      .reset {
        flex-direction: row;
      }
    `;
  }
}
