import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { IAZendeskWidget } from './ia-zendesk-widget';

import '@demo/story-template';
import './ia-zendesk-widget';
import '../ia-button/ia-button';

// Test-account key — the host app should supply its own key in production.
const TEST_WIDGET_KEY = '6fe87bd8-d4e3-4b42-8632-be6eb933d54d';

const propInputSettings: PropInputSettings<IAZendeskWidget>[] = [
  {
    label: 'Widget Key',
    propertyName: 'widgetKey',
    defaultValue: TEST_WIDGET_KEY,
  },
  {
    label: 'Breakpoint (px)',
    propertyName: 'breakpoint',
    defaultValue: '767',
  },
];

const styleInputSettings: StyleInputSettings[] = [
  // Colors
  {
    label: 'Background',
    cssVariable: '--button-background',
    defaultValue: '#194880',
    inputType: 'color',
  },
  {
    label: 'Text / Icon Color',
    cssVariable: '--button-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  {
    label: 'Icon Fill (independent)',
    cssVariable: '--icon-fill-color',
    defaultValue: '#ffffff',
    inputType: 'color',
  },
  // Size
  {
    label: 'Width',
    cssVariable: '--button-width',
    defaultValue: 'auto',
  },
  {
    label: 'Padding',
    cssVariable: '--button-padding',
    defaultValue: '14px',
  },
  // Position
  {
    label: 'Margin',
    cssVariable: '--button-margin',
    defaultValue: '14px 20px',
  },
  {
    label: 'Top',
    cssVariable: '--button-top',
    defaultValue: 'auto',
  },
  {
    label: 'Bottom',
    cssVariable: '--button-bottom',
    defaultValue: '0',
  },
  {
    label: 'Left',
    cssVariable: '--button-left',
    defaultValue: 'auto',
  },
  {
    label: 'Right',
    cssVariable: '--button-right',
    defaultValue: '0',
  },
  {
    label: 'Z-Index',
    cssVariable: '--button-z-index',
    defaultValue: '999998',
  },
  // Shape
  {
    label: 'Border Radius',
    cssVariable: '--button-border-radius',
    defaultValue: '3rem',
  },
  // Typography
  {
    label: 'Font Size',
    cssVariable: '--button-font-size',
    defaultValue: '14px',
  },
  {
    label: 'Font Weight',
    cssVariable: '--button-font-weight',
    defaultValue: '700',
  },
];

@customElement('ia-zendesk-widget-story')
export class IAZendeskWidgetStory extends LitElement {
  @state() private widgetMounted = false;

  private activateWidget(): void {
    this.widgetMounted = true;
  }

  private get usageExample(): string {
    return `<ia-zendesk-widget
        .widgetKey="${TEST_WIDGET_KEY}">
      </ia-zendesk-widget>,`;
  }

  render() {
    return html`
      <story-template
        elementTag="ia-zendesk-widget"
        elementClassName="IAZendeskWidget"
        .customExampleUsage=${this.usageExample}
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-zendesk-widget
          slot="demo"
          .widgetKey=${TEST_WIDGET_KEY}
          style="${this.widgetMounted ? '' : 'display:none'}"
        ></ia-zendesk-widget>

        <ia-button
          slot="demo"
          @click=${this.activateWidget}
          ?disabled=${this.widgetMounted}
        >
          ${this.widgetMounted ? 'Activated!' : 'Activate help widget'}
        </ia-button>
      </story-template>
    `;
  }
}
