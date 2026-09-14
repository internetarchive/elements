import {
  css,
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { msg, str } from '@lit/localize';

import themeStyles from '@src/themes/theme-styles';

/** What the text beside the bar says: the goal amount, a message, or nothing. */
export type GoalMessageMode = 'off' | 'amount' | 'message';

/** Whether the current amount is printed on the bar. */
export type CurrentAmountMode = 'on' | 'off';

/**
 * A horizontal progress bar for a fundraising goal, as shown in the
 * archive.org donation banner. The fill grows with `currentAmount`, the amount
 * raised is printed on the fill when it fits and beside it when it doesn't,
 * and the goal (or a goal message) sits to the right of the bar.
 */
@customElement('ia-donation-thermometer')
export class IADonationThermometer extends LitElement {
  @property({ type: String }) goalMessageMode: GoalMessageMode = 'amount';

  @property({ type: String }) goalNearMessage = msg(
    'We’ve almost reached our goal!',
  );

  @property({ type: String }) goalReachedMessage = msg(
    "We've reached our goal!",
  );

  /** The accessible name of the progress bar, for screen readers. */
  @property({ type: String }) label = msg('Donation progress');

  @property({ type: Number }) goalAmount = 7_500_000;

  @property({ type: String }) currentAmountMode: CurrentAmountMode = 'on';

  @property({ type: Number }) currentAmount = 0;

  @query('.thermometer-value') private thermometerValue?: HTMLDivElement;

  @query('.thermometer-fill') private thermometerFill!: HTMLDivElement;

  @state() private thermometerValueWidth = 0;

  @state() private thermometerFillWidth = 0;

  /**
   * Watches the fill and the value label so the label can move to whichever
   * side of the fill has room for it.
   */
  private resizeObserver?: ResizeObserver;

  /**
   * The value label renders in a different spot on each side of the fill, so
   * the observed element is tracked to re-observe the replacement.
   */
  private observedValueElement: Element | null = null;

  render(): TemplateResult {
    return html`
      <div
        class="container"
        role="progressbar"
        aria-label=${this.label}
        aria-valuemin="0"
        aria-valuemax="${this.goalAmount}"
        aria-valuenow="${this.currentAmount}"
        aria-valuetext="${this.currentAmountDisplayValue}"
      >
        <div class="thermometer-message-container">
          <div class="thermometer-container">
            <div
              class="thermometer-background ${this.thermometerValuePosition}"
            >
              <div
                class="thermometer-fill"
                style="width: ${this.percentComplete}%"
              >
                ${this.thermometerValuePosition === 'value-left'
                  ? this.thermometerValueTemplate
                  : nothing}
              </div>
              ${this.thermometerValuePosition === 'value-right'
                ? this.thermometerValueTemplate
                : nothing}
            </div>
          </div>
          ${this.goalMessageMode !== 'off'
            ? html`<div class="donate-goal">${this.currentGoalMessage}</div>`
            : nothing}
        </div>
      </div>
    `;
  }

  private get thermometerValueTemplate(): TemplateResult | typeof nothing {
    return this.currentAmountMode === 'off'
      ? nothing
      : html`
          <div class="thermometer-value">${this.currentAmountDisplayValue}</div>
        `;
  }

  /**
   * Which side of the fill the value label sits on. It goes inside the fill
   * when the fill is wider than the label plus a little breathing room, and
   * outside to the right otherwise.
   */
  private get thermometerValuePosition(): 'value-left' | 'value-right' {
    const buffer = 10;
    return this.thermometerValueWidth + buffer < this.thermometerFillWidth
      ? 'value-left'
      : 'value-right';
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver((entries) =>
      this.handleResize(entries),
    );
    // On a re-connect the fill already exists; on first connect it doesn't
    // until the first render, and `updated` picks it up then.
    this.observeParts();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.observedValueElement = null;
  }

  updated(): void {
    this.observeParts();
  }

  /** Observes the fill once and follows the value label as it moves. */
  private observeParts(): void {
    const observer = this.resizeObserver;
    if (!observer) return;

    if (this.thermometerFill) observer.observe(this.thermometerFill);

    const valueElement = this.thermometerValue ?? null;
    if (valueElement === this.observedValueElement) return;

    if (this.observedValueElement)
      observer.unobserve(this.observedValueElement);
    if (valueElement) observer.observe(valueElement);
    this.observedValueElement = valueElement;
  }

  private handleResize(entries: ResizeObserverEntry[]): void {
    for (const entry of entries) {
      const width =
        entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
      if (entry.target === this.thermometerFill) {
        this.thermometerFillWidth = width;
      } else if (entry.target === this.observedValueElement) {
        this.thermometerValueWidth = width;
      }
    }
  }

  private get goalMessage(): string {
    return this.currentAmount >= this.goalAmount
      ? this.goalReachedMessage
      : this.goalNearMessage;
  }

  private get currentAmountDisplayValue(): string {
    return this.formatNumber(this.currentAmount);
  }

  private get goalAmountDisplayValue(): string {
    return this.formatNumber(this.goalAmount);
  }

  /**
   * Formats a dollar amount in millions, e.g. `$0.5MM` or `$35MM`. Amounts
   * under ten million keep one decimal place, larger ones round to a whole
   * number.
   */
  private formatNumber(number: number): string {
    if (number === 0) return '$0';
    const suffix = 'MM';
    const divisor = 1_000_000;
    const result = number / divisor;
    const roundToOne = result < 10;
    const rounded = roundToOne
      ? Math.round((result + Number.EPSILON) * 10) / 10
      : Math.round(result);
    return `$${rounded}${suffix}`;
  }

  private get currentGoalMessage(): string {
    switch (this.goalMessageMode) {
      case 'amount':
        return msg(str`${this.goalAmountDisplayValue} goal`);
      case 'message':
        return this.goalMessage;
      case 'off':
        return '';
    }
  }

  private get percentComplete(): number {
    return Math.min((this.currentAmount / this.goalAmount) * 100, 100);
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --thermometer-height--: var(--ia-donation-thermometer-height, 20px);
          --fill-color--: var(--ia-donation-thermometer-fill-color, #23765d);
          --track-color--: var(--ia-donation-thermometer-track-color, #b8f5e2);
          --border--: var(
            --ia-donation-thermometer-border,
            1px solid var(--fill-color--)
          );
          /* Large enough to round any height into a pill */
          --border-radius--: var(
            --ia-donation-thermometer-border-radius,
            9999px
          );
          --value-on-fill-color--: var(
            --ia-donation-thermometer-value-on-fill-color,
            var(--true-white)
          );
          --value-on-track-color--: var(
            --ia-donation-thermometer-value-on-track-color,
            var(--fill-color--)
          );
          --goal-color--: var(--primary-text-color);
          --goal-padding--: var(--ia-donation-thermometer-goal-padding, 0 10px);

          display: block;
          height: var(--thermometer-height--);
        }

        .container {
          height: 100%;
        }

        .thermometer-message-container {
          height: 100%;
          display: flex;
          align-items: center;
        }

        .thermometer-container {
          height: 100%;
          flex: 1;
        }

        .thermometer-background {
          background-color: var(--track-color--);
          padding: 0;
          height: 100%;
          border-radius: var(--border-radius--);
          border: var(--border--);
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .thermometer-fill {
          background-color: var(--fill-color--);
          text-align: right;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .thermometer-value {
          font-weight: bold;
          white-space: nowrap;
        }

        .value-left .thermometer-value {
          color: var(--value-on-fill-color--);
          padding: 0 0.5rem 0 1rem;
        }

        .value-right .thermometer-value {
          color: var(--value-on-track-color--);
          padding: 0 1rem 0 0.5rem;
        }

        .donate-goal {
          text-align: left;
          padding: var(--goal-padding--);
          text-transform: uppercase;
          font-weight: bold;
          color: var(--goal-color--);
        }
      `,
    ];
  }
}
