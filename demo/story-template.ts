import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { when } from 'lit/directives/when.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import './syntax-highlighter';
import themeStyles from '@src/themes/theme-styles';
import type { StyleInputData } from './story-components/story-styles-settings';
import type {
  AppliedProps,
  PropInputData,
} from './story-components/story-prop-settings';

import arrow from './arrow.svg';
import testTube from './test-tube.svg';

import './story-components/story-styles-settings';
import './story-components/story-prop-settings';

/**
 * A template for demoing the use of a custom element.
 */
@customElement('story-template')
export class StoryTemplate extends LitElement {
  @property({ type: String }) elementTag = '';

  @property({ type: String }) elementClassName = '';

  @property({ type: String }) customExampleUsage?: string;

  /* Optional stringified properties to always include in the example usage */
  @property({ type: String }) defaultUsageProps?: string;

  @property({ type: Object }) styleInputData?: StyleInputData;

  @property({ type: Object }) propInputData?: PropInputData;

  @property({ type: Boolean }) labs = false;

  @state() private visible = false;

  /* Stringified styles applied for the demo component */
  @state() private stringifiedStyles?: string;

  /* Stringified properties for the component in .myprop=${'foo'} format */
  @state() private stringifiedProps?: string;

  /* Whether settings inputs have been slotted in and should be displayed */
  @state() private shouldShowPropertySettings: boolean = false;

  /* Component that has been slotted into the demo, if applicable */
  @state() private slottedDemoComponent?: any;

  render() {
    return html`
      <h2>
        <a @click=${() => (this.visible = !this.visible)}>
          <img
            class="disclosure-arrow ${this.visible ? 'open' : ''}"
            src=${arrow}
          /><code> &lt;${this.elementTag}&gt;</code> ${when(
            this.labs,
            () =>
              html`<img
                src=${testTube}
                alt="Labs icon"
                title="Labs"
                class="labs-icon"
              />`,
          )}
        </a>
      </h2>
      ${when(this.visible, () => this.elementDemoTemplate)}
    `;
  }

  private get elementDemoTemplate() {
    return html`
      <div id="container">
        <h3>Demo</h3>
        <div class="slot-container" style=${ifDefined(this.stringifiedStyles)}>
          <slot
            name="demo"
            @slotchange=${this.handleDemoComponentSlotted}
          ></slot>
        </div>
        <h3>Import</h3>
        <syntax-highlighter
          language="typescript"
          .code=${this.importCode}
        ></syntax-highlighter>
        <h3>Usage</h3>
        <syntax-highlighter
          language="auto"
          .code=${this.customExampleUsage
            ? this.customExampleUsage
            : this.exampleUsage}
        ></syntax-highlighter>
        ${when(
          this.cssCode,
          () => html`
            <h3>Styling</h3>
            <syntax-highlighter
              language="css"
              .code=${this.cssCode}
            ></syntax-highlighter>
          `,
        )}
        <story-styles-settings
          .styleInputData=${this.styleInputData}
          @stylesApplied=${this.handleStylesApplied}
        ></story-styles-settings>
        <story-props-settings
          .propInputData=${this.propInputData}
          @propsApplied=${this.handlePropsApplied}
        ></story-props-settings>
        ${when(this.shouldShowPropertySettings, () => html` <h3>Settings</h3>`)}
        <div
          class="slot-container"
          style="${!this.shouldShowPropertySettings ? 'display: none' : ''}"
          @slotchange=${this.handleSettingsSlotChange}
        >
          <slot name="settings"></slot>
        </div>
      </div>
    `;
  }

  private get importCode(): string {
    if (this.elementClassName) {
      return `
import '${this.modulePath}';
import { ${this.elementClassName} } from '${this.modulePath}';
    `;
    } else {
      return `
import '${this.modulePath}';
  `;
    }
  }

  private get exampleUsage(): string {
    return `<${this.elementTag}${this.defaultUsageProps ? '\n ' + this.defaultUsageProps + '\n' : ''}${this.stringifiedProps ?? ''}></${this.elementTag}>`;
  }

  private get cssCode(): string {
    if (!this.stringifiedStyles) return '';
    return `

${this.elementTag} {
 ${this.stringifiedStyles}
}
    `;
  }

  private get modulePath(): string {
    return this.labs
      ? `@internetarchive/elements/labs/${this.elementTag}/${this.elementTag}`
      : `@internetarchive/elements/${this.elementTag}/${this.elementTag}`;
  }

  /* Toggles visibility of section depending on whether inputs have been slotted into it */
  private handleSettingsSlotChange(e: Event): void {
    const slottedChildren = (e.target as HTMLSlotElement).assignedElements();
    this.shouldShowPropertySettings = slottedChildren.length > 0;
  }

  /* Detects and stores a reference to slotted demo component */
  private handleDemoComponentSlotted(e: Event): void {
    const slottedComponent = (
      e.target as HTMLSlotElement
    ).assignedElements()[0];
    if (slottedComponent) this.slottedDemoComponent = slottedComponent;
  }

  /* Applies styles from the settings to the component and code demo */
  private handleStylesApplied(e: CustomEvent): void {
    const stringifiedStyles = e.detail.styles;
    if (!stringifiedStyles) return;

    this.stringifiedStyles = stringifiedStyles;
  }

  /* Applies props from the settings to the component and code demo */
  private handlePropsApplied(e: CustomEvent): void {
    const stringifiedProps = e.detail.stringifiedProps;
    const appliedProps: AppliedProps = e.detail.appliedProps;
    if (!stringifiedProps || !appliedProps) return;

    this.stringifiedProps = stringifiedProps;
    appliedProps.forEach((prop) =>
      this.slottedDemoComponent?.setAttribute(prop.propName, prop.value),
    );
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        #container {
          border: 1px solid #ccc;
          padding: 0 16px 16px 16px;
        }

        h2 {
          cursor: pointer;
          margin-top: 8px;
          margin-bottom: 8px;
        }

        h3 {
          margin-bottom: 8px;
        }

        .slot-container {
          background-color: var(--primary-background-color);
          padding: 1em;
        }

        .disclosure-arrow {
          width: 12px;
          height: 12px;
          transform: rotate(-90deg);
          transition: transform 0.2s ease-in-out;
        }

        .disclosure-arrow.open {
          transform: rotate(0deg);
        }

        .labs-icon {
          width: 20px;
          height: 20px;
          margin-left: 4px;
          filter: invert(1);
          vertical-align: middle;
        }
      `,
    ];
  }
}
