import {
  html,
  css,
  LitElement,
  nothing,
  CSSResultGroup,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { localized, msg } from '@lit/localize';

import type {
  SharedResizeObserverInterface,
  SharedResizeObserverResizeHandlerInterface,
} from '@internetarchive/shared-resize-observer';
import type {
  RecaptchaManagerInterface,
  RecaptchaWidgetInterface,
} from '@internetarchive/recaptcha-manager';
import type { FeatureFeedbackServiceInterface } from './feature-feedback-service';
import type {
  FeatureFeedbackDisplayMode,
  FeatureFeedbackError,
  Vote,
} from './models';

import { thumbsUp } from './assets/img/thumb-up';
import { thumbsDown } from './assets/img/thumb-down';

@customElement('ia-feature-feedback')
@localized()
export class IAFeatureFeedback
  extends LitElement
  implements SharedResizeObserverResizeHandlerInterface
{
  @property({ type: String }) featureIdentifier?: string;

  /**
   * The prompt text shown beside the vote buttons
   * (default 'Do you find this feature useful?', localized).
   */
  @property({ type: String }) prompt?: string;

  /**
   * The text on the button in `button` display mode (default 'Beta', localized).
   */
  @property({ type: String }) buttonText?: string;

  /**
   * - `button` renders a single button with the provided button text (or default 'Beta').
   * Clicking the button opens the popup.
   * - `vote-prompt` renders the provided prompt text alongside two up/down vote buttons and
   * a "Leave a comment" button.
   * Clicking either vote button immediately submits feedback without a comment.
   * Clicking the comment button instead opens the popup.
   */
  @property({ type: String }) displayMode: FeatureFeedbackDisplayMode =
    'button';

  @property({ type: Object }) recaptchaManager?: RecaptchaManagerInterface;

  @property({ type: Object }) resizeObserver?: SharedResizeObserverInterface;

  @property({ type: Boolean }) disabled?: boolean;

  @property({ type: Object })
  featureFeedbackService?: FeatureFeedbackServiceInterface;

  @state() private isOpen = false;

  @state() private processing = false;

  @state() private popupTopX = 0;

  @state() private popupTopY = 0;

  @state() private vote?: Vote;

  @state() private voteSubmitted = false;

  @state() private error?: FeatureFeedbackError;

  @state() private voteNeedsChoosing = false;

  @state() private recaptchaWidget?: RecaptchaWidgetInterface;

  @query('#container') private container!: HTMLDivElement;

  @query('#popup') private popup!: HTMLDivElement;

  @query('#comments') private comments!: HTMLTextAreaElement;

  private boundEscapeListener!: (this: Document, ev: KeyboardEvent) => void;

  private boundScrollListener!: (this: Document, ev: Event) => void;

  render() {
    return html`
      <div id="container">
        ${this.displayMode === 'vote-prompt'
          ? this.votePromptDisplay
          : this.singleButtonDisplay}
      </div>
    `;
  }

  firstUpdated(): void {
    this.boundEscapeListener = this.handleEscape.bind(this);
    this.boundScrollListener = this.handleScroll.bind(this);
  }

  updated(changed: PropertyValues): void {
    if (changed.has('vote') && this.vote) {
      this.error = undefined;
      this.voteNeedsChoosing = false;
    }
    if (changed.has('resizeObserver')) {
      const oldObserver = changed.get(
        'resizeObserver',
      ) as SharedResizeObserverInterface;
      this.disconnectResizeObserver(oldObserver);
    }
  }

  handleResize() {
    if (!this.isOpen) return;
    this.positionPopup();
  }

  handleScroll() {
    if (!this.isOpen) return;
    this.positionPopup();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEscapeListener();
    this.disconnectResizeObserver(this.resizeObserver);
  }

  private resizingElement = document.body;

  private disconnectResizeObserver(observer?: SharedResizeObserverInterface) {
    const observerToRemove = observer ?? this.resizeObserver;
    observerToRemove?.removeObserver({
      handler: this,
      target: this.resizingElement,
    });
  }

  private setupResizeObserver() {
    if (!this.resizeObserver) return;
    this.resizeObserver.addObserver({
      handler: this,
      target: this.resizingElement,
    });
  }

  private async setupRecaptcha() {
    if (!this.recaptchaManager) return;
    this.recaptchaWidget = await this.recaptchaManager.getRecaptchaWidget();
  }

  private resetState() {
    this.vote = undefined;
    this.voteSubmitted = false;
    this.error = undefined;
    this.voteNeedsChoosing = false;
    this.comments.value = '';
  }

  private async showPopup() {
    if (this.voteSubmitted && this.displayMode === 'button') return;

    this.setupResizeObserver();
    this.setupScrollObserver();
    this.setupEscapeListener();
    this.positionPopup();
    this.isOpen = true;
    await this.setupRecaptcha();
  }

  private closePopup() {
    this.disconnectResizeObserver();
    this.stopScrollObserver();
    this.removeEscapeListener();
    this.isOpen = false;
  }

  private positionPopup() {
    const containerRect = this.container.getBoundingClientRect();
    const popupRect = this.popup.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowCenterX = windowWidth / 2;
    const windowCenterY = windowHeight / 2;
    if (containerRect.left < windowCenterX) {
      this.popupTopX = containerRect.right - 20;
    } else {
      this.popupTopX = containerRect.left + 20 - popupRect.width;
    }
    this.popupTopX = Math.max(0, this.popupTopX);
    if (this.popupTopX + popupRect.width > windowWidth) {
      this.popupTopX = windowWidth - popupRect.width;
    }

    if (containerRect.top < windowCenterY) {
      this.popupTopY = containerRect.bottom - 10;
    } else {
      this.popupTopY = containerRect.top + 10 - popupRect.height;
    }
  }

  private handleEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.cancel(e);
    }
  }

  private setupEscapeListener() {
    document.addEventListener('keyup', this.boundEscapeListener);
  }

  private removeEscapeListener() {
    document.removeEventListener('keyup', this.boundEscapeListener);
  }

  private setupScrollObserver() {
    document.addEventListener('scroll', this.boundScrollListener);
  }

  private stopScrollObserver() {
    document.removeEventListener('scroll', this.boundScrollListener);
  }

  /**
   * Template for the feedback widget in the `button` display mode.
   */
  private get singleButtonDisplay(): TemplateResult {
    return html`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText ?? msg('Beta')}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted
            ? this.upvoteButtonClass
            : ''}"
          >${thumbsUp}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted
            ? this.downvoteButtonClass
            : ''}"
          id="beta-button-thumb-down"
          >${thumbsDown}</span
        >
      </button>
      ${this.popupTemplate}
    `;
  }

  /**
   * Template for the feedback widget in the `vote-prompt` display mode.
   */
  private get votePromptDisplay(): TemplateResult {
    return html`
      <form
        @submit=${this.submit}
        ?disabled=${this.processing || this.voteSubmitted}
      >
        <div class="prompt">
          <span class="prompt-text">${this.promptText}</span>
          <label
            tabindex="0"
            role="button"
            aria-pressed=${this.upvoteSelected}
            @keyup=${this.upvoteKeypressed}
            class="vote-button upvote-button ${this.upvoteButtonClass}"
          >
            <input
              type="radio"
              name="vote"
              value="up"
              @click=${this.upvoteButtonSelected}
              ?checked=${this.upvoteSelected}
            />
            ${thumbsUp}
          </label>

          <label
            tabindex="0"
            role="button"
            aria-pressed=${this.downvoteSelected}
            @keyup=${this.downvoteKeypressed}
            class="vote-button downvote-button ${this.downvoteButtonClass}"
          >
            <input
              type="radio"
              name="vote"
              value="down"
              @click=${this.downvoteButtonSelected}
              ?checked=${this.downvoteSelected}
            />
            ${thumbsDown}
          </label>
          <button id="comment-button" type="button" @click=${this.showPopup}>
            ${msg('Leave a comment')}
          </button>
        </div>
      </form>
      ${this.popupTemplate}
    `;
  }

  /**
   * Template for the popup menu that appears when the feedback button(s) are clicked.
   */
  private get popupTemplate() {
    return html`
      <div
        id="popup-background"
        class=${this.isOpen ? 'open' : 'closed'}
        @click=${this.backgroundClicked}
        @keyup=${this.backgroundClicked}
      >
        <div
          id="popup"
          style="left: ${this.popupTopX}px; top: ${this.popupTopY}px"
        >
          <form
            @submit=${this.submit}
            id="form"
            ?disabled=${this.processing || this.voteSubmitted}
          >
            <div class="prompt">
              <div class="prompt-text">${this.promptText}</div>
              <label
                tabindex="0"
                role="button"
                aria-pressed=${this.upvoteSelected}
                @click=${this.upvoteButtonSelected}
                @keyup=${this.upvoteKeypressed}
                class="vote-button upvote-button ${this
                  .upvoteButtonClass} ${this.chooseVoteErrorClass}"
              >
                <input
                  type="radio"
                  name="vote"
                  value="up"
                  @click=${this.upvoteButtonSelected}
                  ?checked=${this.upvoteSelected}
                />
                ${thumbsUp}
              </label>

              <label
                tabindex="0"
                role="button"
                aria-pressed=${this.downvoteSelected}
                @click=${this.downvoteButtonSelected}
                @keyup=${this.downvoteKeypressed}
                class="vote-button downvote-button ${this
                  .downvoteButtonClass} ${this.chooseVoteErrorClass}"
              >
                <input
                  type="radio"
                  name="vote"
                  value="down"
                  @click=${this.downvoteButtonSelected}
                  ?checked=${this.downvoteSelected}
                />
                ${thumbsDown}
              </label>
            </div>
            <div>
              <textarea
                placeholder=${msg('Comments (optional)')}
                id="comments"
                tabindex="0"
                ?disabled=${this.processing}
              ></textarea>
            </div>
            ${this.errorTemplate}
            <div id="actions">
              <button
                @click=${this.cancel}
                id="cancel-button"
                class="cta-button"
                tabindex="0"
                ?disabled=${this.processing}
              >
                ${msg('Cancel')}
              </button>
              <input
                type="submit"
                id="submit-button"
                class="cta-button"
                .value=${this.processing
                  ? msg('Submitting...')
                  : msg('Submit feedback')}
                tabindex="0"
                ?disabled=${this.processing}
              />
            </div>
          </form>
        </div>
      </div>
    `;
  }

  /**
   * Template for the current error message, if any.
   */
  private get errorTemplate(): TemplateResult | typeof nothing {
    const { error } = this;
    if (!error) return nothing;
    const message =
      error.kind === 'noVote'
        ? msg('Please select a vote.')
        : msg('There was an error submitting your feedback.');
    const detail =
      error.kind === 'submitFailed' && error.detail !== undefined
        ? html`<br />${msg('Error: ')}${error.detail}`
        : nothing;
    return html`<div id="error">${message}${detail}</div>`;
  }

  private get promptText(): string {
    return this.prompt ?? msg('Do you find this feature useful?');
  }

  private get upvoteSelected() {
    return this.vote === 'up';
  }

  private get downvoteSelected() {
    return this.vote === 'down';
  }

  private upvoteKeypressed(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.upvoteButtonSelected();
    }
  }

  private downvoteKeypressed(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.downvoteButtonSelected();
    }
  }

  private upvoteButtonSelected() {
    if (this.processing || this.voteSubmitted) return;
    this.vote = this.vote === 'up' ? undefined : 'up';
    this.handleButtonSelection();
  }

  private downvoteButtonSelected() {
    if (this.processing || this.voteSubmitted) return;
    this.vote = this.vote === 'down' ? undefined : 'down';
    this.handleButtonSelection();
  }

  private async handleButtonSelection() {
    // If a button is pressed _outside_ the popup, it should take effect immediately
    if (!this.isOpen) {
      await this.setupRecaptcha();
      this.submit();
    }
  }

  private get chooseVoteErrorClass(): string {
    return this.voteNeedsChoosing ? 'error' : '';
  }

  private get upvoteButtonClass(): string {
    switch (this.vote) {
      case 'up':
        return 'selected';
      case 'down':
        return 'unselected';
      default:
        return 'noselection';
    }
  }

  private get downvoteButtonClass(): string {
    switch (this.vote) {
      case 'up':
        return 'unselected';
      case 'down':
        return 'selected';
      default:
        return 'noselection';
    }
  }

  private backgroundClicked(e: MouseEvent) {
    if (!(e.target instanceof Node)) return;
    if (this.popup?.contains(e.target)) return;
    this.cancel(e);
  }

  private cancel(e: Event) {
    e.preventDefault();
    this.closePopup();
    if (!this.voteSubmitted) this.resetState();
  }

  private async submit(e?: Event) {
    e?.preventDefault();

    if (!this.vote) {
      this.voteNeedsChoosing = true;
      this.error = { kind: 'noVote' };
      return;
    }

    if (!this.featureIdentifier) {
      throw new Error('featureIdentifier is required');
    }

    if (!this.featureFeedbackService) {
      throw new Error('featureFeedbackService is required');
    }

    if (!this.recaptchaWidget) {
      throw new Error('recaptchaWidget is required');
    }

    const popupWasOpen = this.isOpen;
    this.processing = true;

    try {
      const token = await this.recaptchaWidget.execute();
      const response = await this.featureFeedbackService.submitFeedback({
        featureIdentifier: this.featureIdentifier,
        vote: this.vote,
        comments: this.comments.value,
        recaptchaToken: token,
      });

      if (response.success) {
        this.voteSubmitted = true;
        if (popupWasOpen) this.closePopup();
      } else {
        this.error = { kind: 'submitFailed' };
      }
    } catch (err) {
      this.error = {
        kind: 'submitFailed',
        detail: err instanceof Error ? err.message : String(err),
      };
    }

    this.processing = false;
  }

  static get styles(): CSSResultGroup {
    const blueColor = css`var(--featureFeedbackBlueColor, #194880)`;
    const darkGrayColor = css`var(--featureFeedbackDarkGrayColor, #767676)`;
    const darkGrayColorSvgFilter = css`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`;

    const backdropZindex = css`var(--featureFeedbackBackdropZindex, 5)`;
    const modalZindex = css`var(--featureFeedbackModalZindex, 6)`;

    const popupBorderColor = css`var(--featureFeedbackPopupBorderColor, ${blueColor})`;
    const submitButtonColor = css`var(--featureFeedbackSubmitButtonColor, ${blueColor})`;
    const betaButtonBorderColor = css`var(--featureFeedbackBetaButtonBorderColor, ${blueColor})`;
    const betaButtonTextColor = css`var(--featureFeedbackBetaButtonTextColor, ${blueColor})`;
    const betaButtonBackground = css`var(--featureFeedbackBetaButtonBackground, none)`;
    const betaButtonSvgFilter = css`var(--featureFeedbackBetaButtonSvgFilter, ${darkGrayColorSvgFilter})`;

    const cancelButtonColor = css`var(--featureFeedbackCancelButtonColor, #515151)`;
    const popupBlockerColor = css`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`;

    const popupBackgroundColor = css`var(--featureFeedbackPopupBackgroundColor, #F5F5F7)`;

    const promptFontWeight = css`var(--featureFeedbackPromptFontWeight, bold)`;
    const promptFontSize = css`var(--featureFeedbackPromptFontSize, 1.4rem)`;

    const commentButtonFontWeight = css`var(--featureFeedbackCommentButtonFontWeight, normal)`;
    const commentButtonFontSize = css`var(--featureFeedbackCommentButtonFontWeight, 1.4rem)`;

    const defaultColor = css`var(--defaultColor, ${darkGrayColor});`;
    const defaultColorSvgFilter = css`var(--defaultColorSvgFilter, ${darkGrayColorSvgFilter});`;

    const upvoteColor = css`var(--upvoteColor, #23765D);`;
    const upvoteColorSvgFilter = css`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%));`;

    const downvoteColor = css`var(--downvoteColor, #720D11);`;
    const downvoteColorSvgFilter = css`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%));`;

    const unselectedColor = css`var(--unselectedColor, #CCCCCC);`;
    const unselectedColorSvgFilter = css`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;

    return css`
      #container {
        display: inline-block;
      }

      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${betaButtonTextColor};
        background: ${betaButtonBackground};
        border: 1px solid ${betaButtonBorderColor};
        border-radius: 4px;
        padding: 1px 5px;
      }

      .beta-button-thumb svg {
        height: 10px;
        width: 10px;
        filter: ${betaButtonSvgFilter};
      }

      .beta-button-thumb.unselected svg {
        filter: ${unselectedColorSvgFilter};
      }

      #error {
        color: red;
        font-size: 14px;
        text-align: center;
        font-weight: bold;
      }

      #popup-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: ${backdropZindex};
        background-color: ${popupBlockerColor};
        overflow: hidden;
      }

      #popup-background.closed {
        visibility: hidden;
        top: -100%;
        left: -100%;
      }

      #popup {
        position: absolute;
        padding: 10px;
        background-color: ${popupBackgroundColor};
        border: 1px ${popupBorderColor} solid;
        border-radius: 5px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${modalZindex};
        max-width: 300px;
        margin-left: 10px;
        margin-right: 10px;
      }

      button,
      input,
      a,
      textarea {
        font-family: inherit;
      }

      button,
      input[type='submit'] {
        background: none;
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
      }

      button:disabled,
      input[type='submit']:disabled {
        cursor: default;
        opacity: 0.5;
      }

      #form > div {
        margin-bottom: 10px;
      }

      #form > div:last-child {
        margin-bottom: 0;
      }

      .prompt {
        display: flex;
        align-items: center;
        font-size: ${promptFontSize};
        font-weight: ${promptFontWeight};
      }

      .prompt > label {
        flex: none;
        cursor: pointer;
      }

      .prompt-text {
        text-align: left;
      }

      #comments {
        width: 100%;
        height: 50px;
        background-color: #ffffff;
        border: 1px #2c2c2c solid;
        border-radius: 4px;
        padding: 7px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        resize: none;
      }

      #comments::placeholder {
        color: #767676;
      }

      #actions {
        display: flex;
        justify-content: center;
      }

      .cta-button {
        color: white;
        font-size: 14px;
        border-radius: 4px;
        height: 30px;
        margin: 0;
      }

      #cancel-button {
        background-color: ${cancelButtonColor};
      }

      #submit-button {
        background-color: ${submitButtonColor};
        margin-left: 10px;
      }

      .vote-button {
        background-color: #ffffff;
        border: 1px solid #767676;
        border-radius: 2px;
        padding: 0;
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
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

      .upvote-button.selected {
        border-color: ${upvoteColor};
      }

      .upvote-button.selected svg {
        filter: ${upvoteColorSvgFilter};
      }

      .downvote-button.selected {
        border-color: ${downvoteColor};
      }

      .downvote-button.selected svg {
        filter: ${downvoteColorSvgFilter};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }

      form[disabled] .vote-button.unselected {
        cursor: not-allowed;
      }

      #comment-button {
        color: var(--ia-theme-link-color, #4b64ff);
        font-weight: ${commentButtonFontWeight};
        font-size: ${commentButtonFontSize};
      }
      #comment-button:not([disabled]):hover,
      #comment-button:not([disabled]):active {
        text-decoration: underline;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-feature-feedback': IAFeatureFeedback;
  }
}
