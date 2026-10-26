import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

@customElement('ia-book-actions-timer-countdown')
export class IABookActionsTimerCountdown extends LitElement {
  @property({ type: Number }) secondsLeftOnLoan = 0;

  @property({ type: Boolean }) displayTime = false;

  get minutesLeftOnLoan(): string {
    // convert time from second to minute
    const timeLeft = Math.ceil(Math.round(this.secondsLeftOnLoan) / 60);

    if (timeLeft < 10) {
      return `0:0${timeLeft}`;
    }
    if (timeLeft === 60) {
      return `1:00`;
    }
    return `0:${timeLeft}`;
  }

  /**
   * get remaining time with timeunit, always in the plural
   *
   * @return string - minutes left
   */
  get remainingTime(): string {
    const unitOfTime = 'minute';
    const timeLeft = this.minutesLeftOnLoan;

    return `${timeLeft} ${unitOfTime}s`;
  }

  render() {
    const viewClass = this.displayTime ? 'view' : 'hide';
    return html`
      <button
        id="timer-counter"
        class=${viewClass}
        @click=${() => {
          this.displayTime = !this.displayTime;
        }}
        role="timer"
      >
        <span>${this.minutesLeftOnLoan} - </span>
        <span class="second">${Number(this.secondsLeftOnLoan)}</span>
        <span class="sr-only">${this.remainingTime} left</span>
      </button>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        right: 0;
        margin-right: 10px;
        position: absolute;
      }

      .sr-only {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        margin: 0;
        padding: 0;
        border: none;
        overflow: hidden;
      }

      button#timer-counter {
        cursor: pointer;
      }

      .hide {
        opacity: 0;
      }

      .show {
        opacity: 1;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-book-actions-timer-countdown': IABookActionsTimerCountdown;
  }
}
