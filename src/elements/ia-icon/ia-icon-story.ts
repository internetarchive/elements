import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IAIcon } from './ia-icon';

import './ia-icon';
import '@demo/story-template';

import favoriteIcon from './favorite.svg';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Width',
    cssVariable: '--ia-theme-icon-width',
    defaultValue: 1.25,
    inputType: 'range',
    min: 0.5,
    max: 5,
    step: 0.25,
    unit: 'rem',
  },
  {
    label: 'Height',
    cssVariable: '--ia-theme-icon-height',
    defaultValue: 1.25,
    inputType: 'range',
    min: 0.5,
    max: 5,
    step: 0.25,
    unit: 'rem',
  },
  {
    label: 'Color',
    cssVariable: '--ia-theme-icon-color',
    defaultValue: 'currentColor',
  },
  {
    label: 'Transition',
    cssVariable: '--ia-icon-transition',
    defaultValue: 'none',
  },
];

const propInputSettings: PropInputSettings<IAIcon>[] = [
  {
    label: 'Icon source',
    propertyName: 'src',
    defaultValue: favoriteIcon,
  },
];

@customElement('ia-icon-story')
export class IAIconStory extends LitElement {
  render() {
    return html`
      <story-template
        elementTag="ia-icon"
        elementClassName="IAIcon"
        defaultUsageProps="src=\${favoriteIcon}"
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-icon slot="demo" src=${favoriteIcon}></ia-icon>
      </story-template>
    `;
  }
}
