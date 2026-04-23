import { html, LitElement, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import type { IAZendeskWidget } from './ia-zendesk-widget';

import './ia-zendesk-widget';
import '@demo/story-template';

const WIDGET_SRC_TEST =
  'https://static.zdassets.com/ekr/snippet.js?key=6fe87bd8-d4e3-4b42-8632-be6eb933d54d';

const WIDGET_SRC_PROD =
  'https://static.zdassets.com/ekr/snippet.js?key=685f6dc4-48c5-411f-8463-cc6dd50abe2d';

const SOURCES = [
  { label: 'Test', src: WIDGET_SRC_TEST },
  { label: 'Production', src: WIDGET_SRC_PROD },
];

@customElement('ia-zendesk-widget-story')
export class IAZendeskWidgetStory extends LitElement {
  @state() private appliedSrc = WIDGET_SRC_TEST;

  @state() private pendingSrc = WIDGET_SRC_TEST;

  @state() private widgetMounted = false;

  private get usageExample(): string {
    return `<ia-zendesk-widget\n  widget-src="${this.appliedSrc}"\n></ia-zendesk-widget>`;
  }

  private applySelection(): void {
    this.appliedSrc = this.pendingSrc;
    this.widgetMounted = true;
    const demo = this.shadowRoot?.querySelector<IAZendeskWidget>('ia-zendesk-widget');
    if (demo) demo.widgetSrc = this.appliedSrc;
  }

  render() {
    return html`
      <story-template
        elementTag="ia-zendesk-widget"
        elementClassName="IAZendeskWidget"
        .customExampleUsage=${this.usageExample}
      >
        ${this.widgetMounted
          ? html`<ia-zendesk-widget
              slot="demo"
              widget-src=${this.appliedSrc}
            ></ia-zendesk-widget>`
          : nothing}

        <div slot="settings">
          <fieldset>
            <legend>Widget Key</legend>
            ${SOURCES.map(
              ({ label, src }) => html`
                <label>
                  <input
                    type="radio"
                    name="widget-src"
                    value=${src}
                    ?checked=${this.pendingSrc === src}
                    @change=${() => (this.pendingSrc = src)}
                  />
                  ${label}
                </label>
              `,
            )}
          </fieldset>
          <button @click=${this.applySelection}>Apply</button>
        </div>
      </story-template>
    `;
  }
}
