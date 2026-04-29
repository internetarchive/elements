import { html, LitElement, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './ia-zendesk-widget';
import '@demo/story-template';
import '../ia-button/ia-button';

// Test-account key — the host app should supply its own key in production.
const TEST_WIDGET_KEY = '6fe87bd8-d4e3-4b42-8632-be6eb933d54d';

@customElement('ia-zendesk-widget-story')
export class IAZendeskWidgetStory extends LitElement {
  @state() private widgetMounted = false;

  private activateWidget(): void {
    this.widgetMounted = true;
  }

  private get usageExample(): string {
    return [
      '<ia-zendesk-widget',
      '  .widgetKey="YOUR_KEY"',
      '></ia-zendesk-widget>',
    ].join('\n');
  }

  render() {
    return html`
      <story-template
        elementTag="ia-zendesk-widget"
        elementClassName="IAZendeskWidget"
        .customExampleUsage=${this.usageExample}
      >
        <div slot="demo">
          <ia-button
            @click=${this.activateWidget}
            ?disabled=${this.widgetMounted}
          >
            ${this.widgetMounted ? 'Activated!' : 'Activate help widget'}
          </ia-button>

          ${this.widgetMounted
            ? html`<ia-zendesk-widget
                .widgetKey=${TEST_WIDGET_KEY}
              ></ia-zendesk-widget>`
            : nothing}
        </div>
      </story-template>
    `;
  }
}
