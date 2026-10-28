import {
  html,
  css,
  nothing,
  CSSResultGroup,
  TemplateResult,
  LitElement,
  PropertyValues,
} from 'lit';
import { property, query } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { classMap } from 'lit/directives/class-map.js';
import { localized, msg } from '@lit/localize';
import {
  IASurveyQuestionInterface,
  IASurveyQuestionResponse,
  Vote,
} from './models';
import { IAFeatureFeedbackSurveyComment } from './ia-feature-feedback-survey-comment';

import { thumbsUp } from './assets/img/thumb-up';
import { thumbsDown } from './assets/img/thumb-down';

import './ia-feature-feedback-survey-comment';

@customElement('ia-feature-feedback-survey-vote')
@localized()
export class IAFeatureFeedbackSurveyVote
  extends LitElement
  implements IASurveyQuestionInterface
{
  /**
   * The prompt text to show for this question.
   * If empty, no prompt text element will be rendered.
   */
  @property({ type: String }) prompt: string = '';

  /**
   * The current vote value of this question.
   * May be undefined if no vote has been selected yet.
   */
  @property({ type: String }) vote?: Vote = undefined;

  /**
   * The current comment text for this question.
   * May be undefined if no comment has been written or if this question does not
   * support text comments.
   */
  @property({ type: String }) comment?: string;

  /**
   * Optional placeholder text to use for this question's comment field, if shown.
   */
  @property({ type: String }) commentPlaceholder?: string;

  /**
   * Whether this question must be answered in order to submit its parent survey.
   * Default false.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * @inheritdoc
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Whether to omit the question number before this question's prompt text.
   * If true, this question will be skipped entirely in the numbering order.
   * Default false.
   */
  @property({ type: Boolean, reflect: true }) skipNumber = false;

  /**
   * Whether to show a comment box as part of this question, allowing the user to
   * enter an optional text comment in addition to their vote.
   * Default false.
   */
  @property({ type: Boolean, reflect: true }) showComments = false;

  /**
   * The comment box sub-component for this question, if shown.
   */
  @query('#comments') private commentBox?: IAFeatureFeedbackSurveyComment;

  /**
   * Label exposed to screen-readers for the upvote button.
   */
  private static get UPVOTE_SR_LABEL(): string {
    return msg('Vote up');
  }

  /**
   * Label exposed to screen-readers for the downvote button.
   */
  private static get DOWNVOTE_SR_LABEL(): string {
    return msg('Vote down');
  }

  /**
   * @inheritdoc
   */
  readonly visible = true;

  private readonly internals; // ElementInternals

  static readonly formAssociated = true;

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  //
  // METHODS
  //

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  render() {
    return html`
      <div id="container">
        <div
          id="prompt-row"
          role="radiogroup"
          aria-labelledby="prompt-text"
          aria-required=${this.required}
          aria-disabled=${this.disabled}
        >
          ${this.promptTextTemplate}${this.voteButtonsTemplate}
        </div>
        ${this.commentFieldTemplate}
      </div>
    `;
  }

  willUpdate(changed: PropertyValues): void {
    if (changed.has('required')) {
      this.internals.ariaRequired = this.required.toString();
    }
    if (changed.has('disabled')) {
      this.internals.ariaDisabled = this.disabled.toString();
    }
  }

  /**
   * @inheritdoc
   */
  validate() {
    const isValid = !this.required || this.vote;
    if (isValid) {
      this.internals.setValidity({});
    } else {
      this.internals.setValidity({ valueMissing: true }, 'A vote is required.');
    }
    return this.internals.checkValidity();
  }

  /**
   * @inheritdoc
   */
  get numbered(): boolean {
    return !this.skipNumber;
  }

  /**
   * @inheritdoc
   */
  get response(): IASurveyQuestionResponse {
    return {
      ...this.commentBox?.response,
      name: this.prompt,
      rating: this.vote,
    };
  }

  /**
   * Template for this question's prompt text, if applicable.
   * Will be preceded by the question number, unless the `skipNumber` flag is set.
   */
  private get promptTextTemplate(): TemplateResult | typeof nothing {
    if (!this.prompt) return nothing;

    const numberSlot = this.numbered
      ? html`<slot name="question-number"></slot>`
      : nothing;

    return html`<div id="prompt-text">${numberSlot}${this.prompt}</div>`;
  }

  /**
   * Template for this question's up/down voting buttons.
   * The button selection is determined by the current vote state.
   */
  private get voteButtonsTemplate(): TemplateResult {
    const upvoteSelected = this.vote === 'up';
    const downvoteSelected = this.vote === 'down';
    const voteNotSelected = this.vote === undefined;

    const voteButtonBaseClasses = {
      'vote-button': true,
      noselection: voteNotSelected,
    };

    const upvoteButtonClassMap = classMap({
      ...voteButtonBaseClasses,
      selected: upvoteSelected,
      unselected: downvoteSelected,
    });

    const downvoteButtonClassMap = classMap({
      ...voteButtonBaseClasses,
      selected: downvoteSelected,
      unselected: upvoteSelected,
    });

    return html`
      <label
        id="upvote"
        class=${upvoteButtonClassMap}
        ?disabled=${this.disabled}
      >
        <input
          type="radio"
          name="vote"
          value="up"
          ?checked=${upvoteSelected}
          ?disabled=${this.disabled}
          @click=${this.upvoteButtonSelected}
          @keydown=${this.upvoteKeyPressed}
        />
        ${thumbsUp}
        <span class="sr-only"
          >${IAFeatureFeedbackSurveyVote.UPVOTE_SR_LABEL}</span
        >
      </label>

      <label
        id="downvote"
        class=${downvoteButtonClassMap}
        ?disabled=${this.disabled}
      >
        <input
          type="radio"
          name="vote"
          value="down"
          ?checked=${downvoteSelected}
          ?disabled=${this.disabled}
          @click=${this.downvoteButtonSelected}
          @keydown=${this.downvoteKeyPressed}
        />
        ${thumbsDown}
        <span class="sr-only"
          >${IAFeatureFeedbackSurveyVote.DOWNVOTE_SR_LABEL}</span
        >
      </label>
    `;
  }

  /**
   * Template for this question's comment field, which may be `nothing` if comments
   * are not allowed for this question.
   */
  private get commentFieldTemplate(): TemplateResult | typeof nothing {
    if (!this.showComments) return nothing;

    return html`
      <ia-feature-feedback-survey-comment
        id="comments"
        skipNumber
        .value=${this.comment ?? ''}
        .placeholder=${this.commentPlaceholder}
        ?disabled=${this.disabled}
        @responseChanged=${this.commentChanged}
      ></ia-feature-feedback-survey-comment>
    `;
  }

  /**
   * Handler for keydown events on the upvote button.
   */
  private upvoteKeyPressed(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      this.upvoteButtonSelected();
    }
  }

  /**
   * Handler for keydown events on the downvote button.
   */
  private downvoteKeyPressed(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      this.downvoteButtonSelected();
    }
  }

  /**
   * Handler for click events on the upvote button.
   */
  private upvoteButtonSelected(): void {
    this.handleVoteButtonSelection('up');
  }

  /**
   * Handler for click events on the downvote button.
   */
  private downvoteButtonSelected(): void {
    this.handleVoteButtonSelection('down');
  }

  /**
   * Handler for when either vote button is pressed, updating the vote state
   * for this question.
   */
  private handleVoteButtonSelection(vote: Vote): void {
    if (this.disabled) return;
    this.vote = vote;
    this.internals.setValidity({});
    this.emitResponseChangedEvent();
  }

  /**
   * Handler for when the value of the comment box changes (if applicable), updating
   * the comment state for this question.
   */
  private commentChanged(e: Event): void {
    e.stopPropagation();
    if (this.disabled) return;

    this.comment = this.commentBox?.value;
    this.emitResponseChangedEvent();
  }

  /**
   * Emits a `responseChanged` event to notify parents of a new response value.
   */
  private emitResponseChangedEvent(): void {
    this.dispatchEvent(
      new CustomEvent('responseChanged', {
        detail: this.response,
      }),
    );
  }

  static get styles(): CSSResultGroup {
    const questionMargin = css`var(--surveyQuestionMargin, 0 0 15px 0)`;

    const darkGrayColor = css`var(--featureFeedbackDarkGrayColor, #767676)`;
    const darkGrayColorSvgFilter = css`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`;

    const defaultColor = css`var(--defaultColor, ${darkGrayColor})`;
    const defaultColorSvgFilter = css`var(--defaultColorSvgFilter, ${darkGrayColorSvgFilter})`;

    const upvoteColor = css`var(--upvoteColor, #23765D)`;
    const upvoteColorSvgFilter = css`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%))`;

    const downvoteColor = css`var(--downvoteColor, #720D11)`;
    const downvoteColorSvgFilter = css`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%))`;

    const unselectedColor = css`var(--unselectedColor, #CCCCCC)`;
    const unselectedColorSvgFilter = css`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%))`;

    const promptFontWeight = css`var(--featureFeedbackPromptFontWeight, bold)`;
    const promptFontSize = css`var(--featureFeedbackPromptFontSize, 1.4rem)`;

    return css`
      #container {
        margin: ${questionMargin};
      }

      #prompt-row {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
      }

      #prompt-text {
        text-align: left;
        flex-grow: 1;
        font-size: ${promptFontSize};
        font-weight: ${promptFontWeight};
      }

      .vote-button {
        background-color: #ffffff;
        border: 1px solid #767676;
        border-radius: 2px;
        margin-left: 10px;
        padding: 0;
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: none;
        cursor: pointer;
      }

      .vote-button:focus-within {
        outline: 2px solid black;
        outline-offset: 1px;
      }

      .vote-button svg {
        width: 15px;
        height: 15px;
      }

      .vote-button input {
        margin: 0;
        padding: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      .vote-button.noselection {
        border-color: ${defaultColor};
      }

      .vote-button.noselection svg {
        filter: ${defaultColorSvgFilter};
      }

      .vote-button.unselected {
        border-color: ${unselectedColor};
      }

      .vote-button.unselected svg {
        filter: ${unselectedColorSvgFilter};
      }

      #upvote.selected {
        border-color: ${upvoteColor};
      }

      #upvote.selected svg {
        filter: ${upvoteColorSvgFilter};
      }

      #downvote.selected {
        border-color: ${downvoteColor};
      }

      #downvote.selected svg {
        filter: ${downvoteColorSvgFilter};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }

      .vote-button.noselection[disabled],
      .vote-button.unselected[disabled] {
        border-color: ${unselectedColor};
        cursor: not-allowed;
      }

      .vote-button.noselection[disabled] svg,
      .vote-button.unselected[disabled] svg {
        filter: ${unselectedColorSvgFilter};
      }

      :host(:invalid) #upvote,
      :host(:invalid) #downvote {
        box-shadow: 0 0 4px red;
      }

      #comments {
        --surveyQuestionMargin: 0;
      }

      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        margin: -1px !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: hidden !important;
        white-space: nowrap !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;
        user-select: none !important;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-feature-feedback-survey-vote': IAFeatureFeedbackSurveyVote;
  }
}
