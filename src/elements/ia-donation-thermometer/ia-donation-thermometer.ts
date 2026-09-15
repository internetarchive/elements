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
    'We’ve reached our goal!',
  );

  /** The accessible name of the progress bar, for screen readers. */
  @property({ type: String }) label = msg('Donation progress');

  @property({ type: Number }) goalAmount = 7_500_000;

  @property({ type: String }) currentAmountMode: CurrentAmountMode = 'on';

  @property({ type: Number }) currentAmount = 0;

  @query('.thermometer-value') private thermometerValue?: HTMLDivElement;

  @query('.thermometer-fill') private thermometerFill?: HTMLDivElement;

  @state() private thermometerValueWidth = 0;

  @state() private thermometerFillWidth = 0;

  /**
   * Watches the fill and the value label so the label can move to whichever
   * side of the fill has room for it.
   */
  private resizeObserver?: ResizeObserver;

  /**
   * The observed nodes are tracked so each is observed exactly once. Calling
   * `observe` on an already-observed target re-reports its size, which costs a
   * notification on every render. Lit also discards the value label when
   * `currentAmountMode` turns it off, so a replacement has to be picked up.
   */
  private observedFillElement: Element | null = null;

  private observedValueElement: Element | null = null;

  render(): TemplateResult {
    return html`
      <div class="thermometer-message-container">
        <div class="thermometer-container">
          <div
            class="thermometer-background ${this.thermometerValuePosition}"
            style="--fill-end--: ${this.percentComplete}%"
            role="progressbar"
            aria-label="${this.label}"
            aria-valuemin="0"
            aria-valuemax="${this.progressMax}"
            aria-valuenow="${this.progressValue}"
            aria-valuetext="${this.currentAmountDisplayValue}"
          >
            <div class="thermometer-clip">
              <div class="thermometer-fill"></div>
            </div>
            ${this.thermometerValueTemplate}
          </div>
        </div>
        ${this.goalMessageMode !== 'off'
          ? html`<div class="donate-goal">${this.currentGoalMessage}</div>`
          : nothing}
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
   * Which side of the fill's end the value label sits on, as a class name for
   * the CSS that places it. The label sits over the fill when the fill is
   * wider than the label plus a little breathing room, and just past the
   * fill's right edge otherwise.
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
    this.observedFillElement = null;
    this.observedValueElement = null;
  }

  updated(): void {
    this.observeParts();
  }

  /** Observes the fill and the value label, picking up either if it is replaced. */
  private observeParts(): void {
    const observer = this.resizeObserver;
    if (!observer) return;

    this.observedFillElement = this.observeInPlaceOf(
      observer,
      this.observedFillElement,
      this.thermometerFill ?? null,
    );
    this.observedValueElement = this.observeInPlaceOf(
      observer,
      this.observedValueElement,
      this.thermometerValue ?? null,
    );
  }

  /**
   * Swaps `observed` for `current` on the observer and returns whichever is
   * now being watched. A target that hasn't changed is left alone.
   */
  private observeInPlaceOf(
    observer: ResizeObserver,
    observed: Element | null,
    current: Element | null,
  ): Element | null {
    if (current === observed) return observed;
    if (observed) observer.unobserve(observed);
    if (current) observer.observe(current);
    return current;
  }

  private handleResize(entries: ResizeObserverEntry[]): void {
    for (const entry of entries) {
      const width =
        entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
      if (entry.target === this.observedFillElement) {
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
    if (!Number.isFinite(number) || number === 0) return '$0';
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

  /**
   * The goal the bar measures against. A goal that isn't a positive, finite
   * number leaves the bar empty, since there is no range to report progress
   * against. Named clear of `ariaValueMax`, which `HTMLElement` declares as a
   * public string.
   */
  private get progressMax(): number {
    return Number.isFinite(this.goalAmount) && this.goalAmount > 0
      ? this.goalAmount
      : 0;
  }

  /**
   * The progress reported to screen readers, clamped into the
   * `aria-valuemin`/`aria-valuemax` range the spec requires.
   * `aria-valuetext` carries the amount as it is displayed.
   */
  private get progressValue(): number {
    if (!Number.isFinite(this.currentAmount)) return 0;
    return Math.min(Math.max(this.currentAmount, 0), this.progressMax);
  }

  /**
   * How much of the bar is filled, as a percentage, clamped to `0`-`100`. An
   * amount or goal that can't produce a usable percentage empties the bar.
   */
  private get percentComplete(): number {
    const goal = this.progressMax;
    if (goal === 0 || !Number.isFinite(this.currentAmount)) return 0;
    const percent = (this.currentAmount / goal) * 100;
    return Math.min(Math.max(percent, 0), 100);
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --donation-thermometer-height--: var(
            --ia-donation-thermometer-height,
            20px
          );
          --donation-thermometer-fill-color--: var(
            --ia-donation-thermometer-fill-color,
            #23765d
          );
          --donation-thermometer-track-color--: var(
            --ia-donation-thermometer-track-color,
            #b8f5e2
          );
          --donation-thermometer-border--: var(
            --ia-donation-thermometer-border,
            1px solid var(--donation-thermometer-fill-color--)
          );
          /* Large enough to round any height into a pill */
          --donation-thermometer-border-radius--: var(
            --ia-donation-thermometer-border-radius,
            9999px
          );
          --donation-thermometer-value-on-fill-color--: var(
            --ia-donation-thermometer-value-on-fill-color,
            var(--true-white)
          );
          --donation-thermometer-value-on-track-color--: var(
            --ia-donation-thermometer-value-on-track-color,
            var(--donation-thermometer-fill-color--)
          );
          --donation-thermometer-goal-color--: var(--primary-text-color);
          --donation-thermometer-goal-padding--: var(
            --ia-donation-thermometer-goal-padding,
            0 10px
          );

          display: block;
          height: var(--donation-thermometer-height--);
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
          box-sizing: border-box;
          position: relative;
          background-color: var(--donation-thermometer-track-color--);
          height: 100%;
          border-radius: var(--donation-thermometer-border-radius--);
          border: var(--donation-thermometer-border--);
        }

        /*
         * Clips the square-ended fill to the rounded track. It covers only the
         * fill, so the label is never cut off by it.
         */
        .thermometer-clip {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: var(--donation-thermometer-border-radius--);
        }

        .thermometer-fill {
          background-color: var(--donation-thermometer-fill-color--);
          height: 100%;
          /*
           * The fallback matters: without it a missing --fill-end-- makes the
           * declaration invalid, width resolves to auto, and the bar paints as
           * a fully funded fundraiser.
           */
          width: var(--fill-end--, 0%);
        }

        /*
         * The label is placed by offset from the end of the fill, so it is one
         * node in one position in the DOM whichever side it shows on, and it
         * never counts towards the width of the fill it is measured against.
         */
        .thermometer-value {
          position: absolute;
          top: 0;
          bottom: 0;
          left: var(--fill-end--, 0%);
          /*
           * Without this, the left offset caps the shrink-to-fit width of a
           * translated label and it collapses to its padding.
           */
          width: max-content;
          display: flex;
          align-items: center;
          font-weight: bold;
          white-space: nowrap;
        }

        /*
         * Both paddings total 1.5rem, so changing sides leaves the label the
         * same width and cannot feed back into the side it is placed on.
         */
        .value-left .thermometer-value {
          transform: translateX(-100%);
          color: var(--donation-thermometer-value-on-fill-color--);
          padding: 0 0.5rem 0 1rem;
        }

        .value-right .thermometer-value {
          color: var(--donation-thermometer-value-on-track-color--);
          padding: 0 1rem 0 0.5rem;
        }

        .donate-goal {
          text-align: left;
          padding: var(--donation-thermometer-goal-padding--);
          text-transform: uppercase;
          font-weight: bold;
          color: var(--donation-thermometer-goal-color--);
        }
      `,
    ];
  }
}
