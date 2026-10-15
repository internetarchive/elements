import {
  html,
  css,
  LitElement,
  nothing,
  CSSResultGroup,
  PropertyValues,
  TemplateResult,
} from 'lit';
import {
  property,
  state,
  query,
  queryAssignedElements,
} from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { styleMap } from 'lit/directives/style-map.js';
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
import {
  canBeDisabled,
  canBeNumbered,
  canBeValidated,
  hasSurveyResponse,
  SurveyError,
  SurveySubmissionState,
} from './models';
import { timedPromise } from './utils/timed-promise';

import { thumbsUp } from './assets/img/thumb-up';
import { thumbsDown } from './assets/img/thumb-down';

import './ia-feature-feedback-survey-vote';
import './ia-feature-feedback-survey-comment';
import './ia-feature-feedback-survey-extra';

@customElement('ia-feature-feedback-survey')
@localized()
export class IAFeatureFeedbackSurvey
  extends LitElement
  implements SharedResizeObserverResizeHandlerInterface
{
  /**
   * Internal identifier of the survey.
   */
  @property({ type: String }) surveyIdentifier?: string;

  /**
   * What text to display on the button that opens the survey popup
   * (default 'Feedback', localized).
   */
  @property({ type: String }) buttonText?: string;

  /**
   * Whether to show the up/down thumbs beside the feedback button text (default `false`).
   */
  @property({ type: Boolean }) showButtonThumbs = false;

  /**
   * Whether to show question numbers beside each survey question (default `false`).
   */
  @property({ type: Boolean }) showQuestionNumbers = false;

  /**
   * Whether the widget is disabled, preventing it from opening (default `false`).
   */
  @property({ type: Boolean }) disabled = false;

  /**
   * Time-out threshold, in milliseconds for submit operations (default `8000`).
   */
  @property({ type: Number }) submitTimeout = 8000;

  /**
   * Feature Feedback Service instance to handle survey submissions.
   */
  @property({ type: Object })
  featureFeedbackService?: FeatureFeedbackServiceInterface;

  /**
   * Recaptcha Manager instance for generating the Recaptcha widget and tokens.
   */
  @property({ type: Object }) recaptchaManager?: RecaptchaManagerInterface;

  /**
   * Shared Resize Observer instance to reposition the popup when the page is resized.
   */
  @property({ type: Object }) resizeObserver?: SharedResizeObserverInterface;

  /**
   * Whether the popup is currently open.
   */
  @state() private isOpen = false;

  /**
   * The current state of the widget's survey submission.
   *  - `idle`: No submit has succeeded or been attempted since the popup was last toggled.
   *  - `processing`: The widget is currently submitting a response.
   *  - `submitted`: The widget has successfully submitted a response.
   *  - `error`: The widget encountered an error while submitting its last response,
   *    and the popup has not yet been closed.
   */
  @state() private submissionState: SurveySubmissionState = 'idle';

  /**
   * X-coordinate of the popup's top left corner.
   */
  @state() private popupTopX = 0;

  /**
   * Y-coordinate of the popup's top left corner.
   */
  @state() private popupTopY = 0;

  /**
   * Error message to display.
   */
  @state() private error?: SurveyError;

  /**
   * The feedback button's container element.
   */
  @query('#container') private container!: HTMLDivElement;

  /**
   * The outer container element of the popup.
   */
  @query('#popup') private popup!: HTMLDivElement;

  /**
   * The popup form's Cancel button
   */
  @query('#cancel-button') private cancelButton!: HTMLButtonElement;

  /**
   * The popup form's Submit button
   */
  @query('#submit-button') private submitButton!: HTMLButtonElement;

  /**
   * All elements assigned to the default slot
   */
  @queryAssignedElements() private assignedElements!: HTMLElement[];

  /**
   * Promise for any currently loading Recaptcha widget, resolving to the widget when
   * it is finished loading.
   */
  private recaptchaWidgetPromise?: Promise<RecaptchaWidgetInterface>;

  private resizingElement = document.body;

  /**
   * Text to show on the submit button when idle.
   */
  private static get SUBMIT_BUTTON_NORMAL_TEXT(): string {
    return msg('Submit feedback');
  }

  /**
   * Text to show on the submit button while submitting a response.
   */
  private static get SUBMIT_BUTTON_PROCESSING_TEXT(): string {
    return msg('Submitting...');
  }

  /**
   * Error message to show when some required questions do not have responses.
   */
  private static get ERROR_MESSAGE_MISSING_REQUIRED_INPUT(): string {
    return msg('Please respond to the indicated questions.');
  }

  /**
   * Error message to show when the survey submission encounters an error response.
   */
  private static get ERROR_MESSAGE_SUBMIT_REQUEST_FAILED(): string {
    return msg('There was an error submitting your feedback.');
  }

  //
  // METHODS
  //

  render() {
    return html`<div id="container">${this.feedbackButtonTemplate}</div>`;
  }

  willUpdate(changed: PropertyValues): void {
    if (changed.has('submissionState')) {
      if (this.isProcessing || this.isSubmitted) {
        this.disableSlottedChildren();
      } else {
        this.restoreSlottedChildrenDisabledStates();
      }
    }

    if (changed.has('resizeObserver')) {
      const oldObserver = changed.get(
        'resizeObserver',
      ) as SharedResizeObserverInterface;
      this.disconnectResizeObserver(oldObserver);
    }
  }

  updated(changed: PropertyValues): void {
    if (changed.has('showQuestionNumbers') || changed.has('assignedElements')) {
      this.applyQuestionNumbers();
    }

    const priorSubmissionState = changed.get('submissionState');
    if (priorSubmissionState) {
      if (
        this.submissionState === 'error' ||
        priorSubmissionState === 'error'
      ) {
        // Transitioning to or from the `error` state can change the height of the popup,
        // so we may need to reposition.
        this.positionPopup();
      }
    }

    if (changed.has('isOpen') && this.isOpen) {
      this.focusFirstFormElement();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEscapeListener();
    this.stopScrollObserver();
    this.disconnectResizeObserver(this.resizeObserver);
  }

  /**
   * Sets all disableable slotted children to be disabled, and sets their `originallyDisabled`
   * data property to `true` if they were already disabled.
   */
  private disableSlottedChildren(): void {
    this.assignedElements.filter(canBeDisabled).forEach((elmt) => {
      elmt.dataset.originallyDisabled = elmt.disabled ? 'true' : 'false';
      elmt.disabled = true;
    });
  }

  /**
   * Sets all disableable slotted children to their original disabled state if possible.
   * Will only mutate any children that have an `originallyDisabled` data property set,
   * and will subsequently remove it from the dataset if found.
   */
  private restoreSlottedChildrenDisabledStates(): void {
    this.assignedElements.filter(canBeDisabled).forEach((elmt) => {
      const { originallyDisabled } = elmt.dataset;
      if (originallyDisabled === undefined) return;

      const originalState = originallyDisabled === 'true';
      delete elmt.dataset.originallyDisabled;
      elmt.disabled = originalState;
    });
  }

  /**
   * Repositions any open popup when the window resizes.
   */
  handleResize() {
    if (this.isOpen) {
      this.positionPopup();
    }
  }

  /**
   * Repositions any open popup to account for the new scroll position.
   *
   * (Uses an arrow function to achieve lexical `this` binding, so that we don't
   * need to manually bind it)
   */
  private handleScroll = () => {
    if (this.isOpen) {
      this.positionPopup();
    }
  };

  /**
   * Handles Escape key events by closing the popup as though the Cancel button
   * were clicked.
   *
   * (Uses an arrow function to achieve lexical `this` binding, so that we don't
   * need to manually bind it)
   */
  private handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.cancel(e);
    }
  };

  private setupEscapeListener() {
    document.addEventListener('keyup', this.handleEscape);
  }

  private removeEscapeListener() {
    document.removeEventListener('keyup', this.handleEscape);
  }

  private setupScrollObserver() {
    document.addEventListener('scroll', this.handleScroll);
  }

  private stopScrollObserver() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  private setupResizeObserver() {
    if (!this.resizeObserver) return;
    this.resizeObserver.addObserver({
      handler: this,
      target: this.resizingElement,
    });
  }

  private disconnectResizeObserver(observer?: SharedResizeObserverInterface) {
    const observerToRemove = observer ?? this.resizeObserver;
    observerToRemove?.removeObserver({
      handler: this,
      target: this.resizingElement,
    });
  }

  /**
   * Requests the Recaptcha Manager generate the Recaptcha widget if possible.
   *
   * Returns `undefined` if no Recaptcha Manager is available.
   *
   * If this method has been called already, it will return the Promise generated
   * by the previous call.
   *
   * Otherwise, a new widget is requested, with the resulting Promise returned
   * and saved to `this.recaptchaWidgetPromise` for other consumers to await.
   */
  private getRecaptchaWidget(): Promise<RecaptchaWidgetInterface> | undefined {
    // If we've already started generating a widget, return the previous Promise.
    if (this.recaptchaWidgetPromise) return this.recaptchaWidgetPromise;

    if (!this.recaptchaManager) return undefined;
    this.recaptchaWidgetPromise = this.recaptchaManager.getRecaptchaWidget();

    return this.recaptchaWidgetPromise;
  }

  /**
   * Resets the widget submission/error state back to defaults.
   * Questions and responses are unaffected.
   */
  private resetSubmissionState(): void {
    this.setSubmissionState('idle');
    this.error = undefined;
  }

  /**
   * Sets the submission state to the given value, emitting a state change event
   * if it differs from the old state.
   */
  private setSubmissionState(newState: SurveySubmissionState): void {
    if (this.submissionState === newState) return;

    this.submissionState = newState;
    this.emitSubmissionStateChanged();
  }

  /**
   * Emits a `submissionStateChanged` event with the current submission state.
   */
  private emitSubmissionStateChanged(): void {
    this.dispatchEvent(
      new CustomEvent('submissionStateChanged', {
        detail: this.submissionState,
      }),
    );
  }

  /**
   * Whether the survey is currently submitting its responses.
   */
  get isProcessing(): boolean {
    return this.submissionState === 'processing';
  }

  /**
   * Whether the survey has been successfully submitted.
   */
  get isSubmitted(): boolean {
    return this.submissionState === 'submitted';
  }

  /**
   * Opens the popup pane, provided the survey has not already been submitted.
   *
   * This will also trigger the Recaptcha widget to begin loading, if it has not already.
   */
  showPopup(): void {
    if (this.isSubmitted) return;

    this.setupResizeObserver();
    this.setupScrollObserver();
    this.setupEscapeListener();
    this.positionPopup();
    this.isOpen = true;
    this.getRecaptchaWidget();
  }

  /**
   * Closes the popup pane and removes any attached listeners.
   */
  closePopup(): void {
    this.disconnectResizeObserver();
    this.stopScrollObserver();
    this.removeEscapeListener();
    this.isOpen = false;
  }

  /**
   * Positions the popup pane so that it resides entirely within the viewport, if possible.
   */
  private positionPopup(): void {
    const containerRect = this.container.getBoundingClientRect();
    const popupRect = this.popup.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowCenterX = windowWidth / 2;
    const windowCenterY = windowHeight / 2;
    const bufferX = 5;
    const bufferY = 5;

    if (containerRect.left < windowCenterX) {
      this.popupTopX = containerRect.right - 20;
    } else {
      this.popupTopX = containerRect.left + 20 - popupRect.width;
    }
    if (this.popupTopX + popupRect.width > windowWidth) {
      this.popupTopX = windowWidth - popupRect.width - bufferX;
    }

    if (containerRect.top < windowCenterY) {
      this.popupTopY = containerRect.bottom - 10;
    } else {
      this.popupTopY = containerRect.top + 10 - popupRect.height;
    }
    if (this.popupTopY + popupRect.height > windowHeight) {
      this.popupTopY = windowHeight - popupRect.height - bufferY;
    }

    this.popupTopX = Math.max(bufferX, this.popupTopX);
    this.popupTopY = Math.max(bufferY, this.popupTopY);
  }

  /**
   * Template for the feedback button's up/down thumb icons, if they are to be shown.
   */
  private get feedbackButtonThumbsTemplate(): TemplateResult | typeof nothing {
    if (!this.showButtonThumbs) return nothing;

    return html`
      <span class="beta-button-icon">${thumbsUp}</span>
      <span class="beta-button-icon">${thumbsDown}</span>
    `;
  }

  /**
   * Template for the feedback button's success checkmark.
   */
  private get feedbackButtonCheckTemplate(): TemplateResult {
    return html`<span class="beta-button-icon success">&check;</span>`;
  }

  /**
   * Template for the feedback button that opens the survey when clicked.
   */
  private get feedbackButtonTemplate(): TemplateResult {
    return html`
      <button
        id="beta-button"
        tabindex="0"
        aria-haspopup="dialog"
        ?disabled=${this.disabled}
        @click=${this.showPopup}
      >
        <span id="button-text">${this.buttonText ?? msg('Feedback')}</span>
        ${this.isSubmitted
          ? this.feedbackButtonCheckTemplate
          : this.feedbackButtonThumbsTemplate}
      </button>
      ${this.popupTemplate}
    `;
  }

  /**
   * Template for the current error message, if any.
   */
  private get errorTemplate(): TemplateResult | typeof nothing {
    const { error } = this;
    if (!error) return nothing;
    const message =
      error.kind === 'missingInput'
        ? IAFeatureFeedbackSurvey.ERROR_MESSAGE_MISSING_REQUIRED_INPUT
        : IAFeatureFeedbackSurvey.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED;
    const detail =
      error.kind === 'submitFailed' && error.detail !== undefined
        ? html`<br />${msg('Error: ')}${error.detail}`
        : nothing;
    return html`<div id="error">${message}${detail}</div>`;
  }

  /**
   * Template for the full popup survey that appears when the feedback
   * button is clicked.
   */
  private get popupTemplate(): TemplateResult {
    const shouldDisableControls = this.isProcessing || this.isSubmitted;
    const submitButtonText = this.isProcessing
      ? IAFeatureFeedbackSurvey.SUBMIT_BUTTON_PROCESSING_TEXT
      : IAFeatureFeedbackSurvey.SUBMIT_BUTTON_NORMAL_TEXT;

    const errorMessage = this.errorTemplate;

    const popupStyles = styleMap({
      left: `${this.popupTopX}px`,
      top: `${this.popupTopY}px`,
    });

    const stopPropagation = (e: Event) => e.stopPropagation();

    return html`
      <div
        id="popup-background"
        class=${this.isOpen ? 'open' : 'closed'}
        @click=${this.backgroundClicked}
        @keydown=${this.backgroundClicked}
      >
        <div
          class="focus-trap"
          tabindex="0"
          @focus=${this.focusSubmitButton}
        ></div>
        <div
          id="popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="survey-heading"
          style=${popupStyles}
        >
          <h2 id="survey-heading" class="sr-only">${msg('Feedback Survey')}</h2>
          <form
            id="form"
            ?disabled=${shouldDisableControls}
            @click=${stopPropagation}
            @keydown=${stopPropagation}
            @submit=${this.submit}
          >
            <slot id="questions-slot"></slot>
            ${errorMessage}
            <div id="actions">
              <button
                type="button"
                id="cancel-button"
                class="cta-button ia-button dark"
                tabindex="0"
                ?disabled=${shouldDisableControls}
                @click=${this.cancel}
              >
                ${msg('Cancel')}
              </button>
              <button
                type="submit"
                id="submit-button"
                class="cta-button ia-button primary"
                tabindex="0"
                ?disabled=${shouldDisableControls}
              >
                ${submitButtonText}
              </button>
            </div>
          </form>
        </div>
        <div
          class="focus-trap"
          tabindex="0"
          @focus=${this.focusFirstFormElement}
        ></div>
      </div>
    `;
  }

  /**
   * Assigns focus to the first focusable slotted element in the form.
   */
  private focusFirstFormElement(): void {
    // Blur any previously-focused element so that the active element is null
    const rootNode = this.getRootNode() as Document | ShadowRoot;

    // Iterate through the slotted form elements and try to focus each one until we succeed
    for (const elmt of this.assignedElements) {
      elmt.focus();
      if (rootNode.activeElement === elmt) return; // We found the first focusable element, we're done
    }

    // If there were no focusable slotted elements, just focus the Cancel button next in line
    this.focusCancelButton();
  }

  /**
   * Assigns focus to the Cancel button at the end of the form.
   */
  private focusCancelButton(): void {
    this.cancelButton.focus();
  }

  /**
   * Assigns focus to the Submit button at the end of the form.
   */
  private focusSubmitButton(): void {
    this.submitButton.focus();
  }

  /**
   * Assigns slotted question numbers to all slotted questions that have `numbered`
   * set to true (indicating that they intend to participate in question numbering).
   */
  private applyQuestionNumbers(): void {
    if (!this.showQuestionNumbers) {
      // Remove any previously-added question numbers
      this.assignedElements.forEach((elmt) => {
        elmt.querySelector('[slot=question-number]')?.remove();
      });
      return;
    }

    let questionNumber = 1;
    this.assignedElements
      .filter((elmt) => canBeNumbered(elmt) && elmt.numbered)
      .forEach((elmt) => {
        let numberingElmt = elmt.querySelector('[slot=question-number]');

        if (!numberingElmt) {
          numberingElmt = document.createElement('span');
          numberingElmt.setAttribute('slot', 'question-number');
        }

        numberingElmt.textContent = `${questionNumber}. `;
        elmt.append(numberingElmt);

        questionNumber += 1;
      });
  }

  /**
   * Handler for when the background layer outside the popup is clicked, treated
   * as though the Cancel button were clicked.
   */
  private backgroundClicked(e: MouseEvent) {
    if (!(e.target instanceof Node)) return;
    if (this.popup?.contains(e.target)) return;
    this.cancel(e);
  }

  /**
   * Closes the survey popup and resets any submission error state.
   */
  private cancel(e: Event) {
    e.preventDefault();
    this.closePopup();
    if (!this.isSubmitted) this.resetSubmissionState();
  }

  /**
   * Returns a boolean indicating whether all required survey questions have received a
   * valid response.
   *
   * Questions intended to participate in constraint validation must expose a `validate()`
   * method that performs whatever checks make sense for that question type. For instance,
   * required vote questions must have an up/down vote entered, while required comment-only
   * questions must have non-empty comment text.
   *
   * Any slotted children that do not have a `validate()` method will be ignored (i.e., they
   * are assumed to be valid).
   */
  private validate(): boolean {
    return this.assignedElements
      .filter(canBeValidated)
      .map((elmt) => elmt.validate())
      .every((v) => v);
  }

  /**
   * Handles survey form submit events by attempting to submit the responses
   * to the server, provided all required responses have been entered.
   */
  private async submit(e?: Event) {
    e?.preventDefault();

    if (!this.validate()) {
      this.error = { kind: 'missingInput' };
      this.setSubmissionState('error');
      return;
    }

    const { surveyIdentifier, submitTimeout, featureFeedbackService } = this;
    this.error = undefined;

    if (!surveyIdentifier) {
      throw new Error('surveyIdentifier is required');
    }

    if (!featureFeedbackService) {
      throw new Error('featureFeedbackService is required');
    }

    const recaptchaWidgetPromise = this.getRecaptchaWidget();
    let recaptchaWidget: RecaptchaWidgetInterface | undefined;
    try {
      recaptchaWidget = await timedPromise(
        recaptchaWidgetPromise,
        submitTimeout,
      );
    } catch (err) {
      throw new Error(`recaptchaWidget load failed: ${err}`);
    }

    if (!recaptchaWidget) {
      throw new Error('recaptchaWidget is required');
    }

    const popupWasOpen = this.isOpen;
    this.setSubmissionState('processing');

    try {
      const token = await timedPromise(
        recaptchaWidget.execute(),
        submitTimeout,
      );

      const response = await timedPromise(
        featureFeedbackService.submitSurvey({
          surveyIdentifier,
          responses: this.assignedElements
            .filter(hasSurveyResponse)
            .map((elmt) => elmt.response),
          recaptchaToken: token,
        }),
        submitTimeout,
      );

      if (response.success) {
        this.setSubmissionState('submitted');
        if (popupWasOpen) this.closePopup();
      } else {
        this.error = { kind: 'submitFailed' };
        this.setSubmissionState('error');
      }
    } catch (err) {
      this.error = {
        kind: 'submitFailed',
        detail: err instanceof Error ? err.message : String(err),
      };
      this.setSubmissionState('error');
    }
  }

  static get styles(): CSSResultGroup {
    const blueColor = css`var(--featureFeedbackBlueColor, #194880)`;
    const darkGrayColorSvgFilter = css`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`;

    const backdropZindex = css`var(--featureFeedbackBackdropZindex, 5)`;
    const modalZindex = css`var(--featureFeedbackModalZindex, 6)`;

    const popupMaxWidth = css`var(--featureFeedbackPopupMaxWidth, 300px)`;
    const popupVerticalPadding = css`var(--featureFeedbackPopupVerticalPadding, 10px)`;
    const popupHorizontalPadding = css`var(--featureFeedbackPopupHorizontalPadding, 10px)`;
    const popupPadding = css`
      ${popupVerticalPadding} ${popupHorizontalPadding}
    `;
    const popupBorderColor = css`var(--featureFeedbackPopupBorderColor, ${blueColor})`;
    const betaButtonBorderColor = css`var(--featureFeedbackBetaButtonBorderColor, ${blueColor})`;
    const betaButtonTextColor = css`var(--featureFeedbackBetaButtonTextColor, ${blueColor})`;
    const betaButtonBackground = css`var(--featureFeedbackBetaButtonBackground, none)`;
    const betaButtonSvgFilter = css`var(--featureFeedbackBetaButtonSvgFilter, ${darkGrayColorSvgFilter})`;

    const popupBlockerColor = css`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`;
    const popupBackgroundColor = css`var(--featureFeedbackPopupBackgroundColor, #FBFBFD)`;

    const upvoteColorSvgFilter = css`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%))`;

    const whiteColor = css`var(--white, #fff)`;

    const disabledButtonFillColor = css`var(--primaryDisableCTAFill, #767676)`;
    const disabledButtonBorderColor = css`var(--secondaryCTABorder, #999)`;

    const primaryButtonFillColor = css`var(--primaryCTAFill, #194880)`;
    const primaryButtonFillColorRGB = css`var(--primaryCTAFillRGB, 25, 72, 128)`;
    const primaryButtonBorderColor = css`var(--primaryCTABorder, #c5d1df)`;

    const darkButtonFillColor = css`var(--secondaryCTAFill, #333)`;
    const darkButtonFillColorRGB = css`var(--secondaryCTAFillRGB, 51, 51, 51)`;
    const darkButtonBorderColor = css`var(--primaryCTABorder, #979797)`;

    const buttonStyles = css`
      .ia-button {
        min-height: 3rem;
        cursor: pointer;
        color: ${whiteColor};
        line-height: normal;
        border-radius: 0.4rem;
        font-size: 1.4rem;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        border: 1px solid transparent;
        white-space: nowrap;
        appearance: auto;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        transition: all 0.1s ease 0s;
        vertical-align: middle;
        padding: 0 3rem;
        outline-color: ${whiteColor};
        outline-offset: -4px;
        user-select: none;
        text-decoration: none;
        width: fit-content;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
      }
      .ia-button:focus-visible {
        outline-style: double;
      }
      .ia-button:disabled {
        cursor: not-allowed;
        background-color: ${disabledButtonFillColor};
        border: 1px solid ${disabledButtonBorderColor};
      }

      .ia-button.primary:disabled,
      .ia-button.dark:disabled {
        opacity: 0.5;
      }

      .ia-button.primary {
        background-color: ${primaryButtonFillColor};
        border-color: ${primaryButtonBorderColor};
      }
      .ia-button.primary:hover {
        background-color: rgba(${primaryButtonFillColorRGB}, 0.9);
      }
      .ia-button.primary:focus-visible {
        background-color: rgba(${primaryButtonFillColorRGB}, 0.8);
      }
      .ia-button.primary:active {
        background-color: rgba(${primaryButtonFillColorRGB}, 0.7);
      }

      .ia-button.dark {
        background-color: ${darkButtonFillColor};
        border-color: ${darkButtonBorderColor};
      }
      .ia-button.dark:hover {
        background-color: rgba(${darkButtonFillColorRGB}, 0.9);
      }
      .ia-button.dark:focus-visible {
        background-color: rgba(${darkButtonFillColorRGB}, 0.8);
      }
      .ia-button.dark:active {
        background-color: rgba(${darkButtonFillColorRGB}, 0.7);
      }
    `;

    const surveyStyles = css`
      #container {
        display: inline-block;
      }

      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${betaButtonTextColor};
        border: 1px solid ${betaButtonBorderColor};
        border-radius: 4px;
        padding: 1px 5px;
        background: ${betaButtonBackground};
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        cursor: pointer;
      }

      .beta-button-icon {
        line-height: 100%;
      }

      .beta-button-icon svg {
        height: 10px;
        width: 10px;
        filter: ${betaButtonSvgFilter};
      }

      .beta-button-icon.success {
        filter: ${upvoteColorSvgFilter};
      }

      #error {
        margin-bottom: 10px;
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
        max-width: ${popupMaxWidth};
        max-height: calc(100vh - 2 * ${popupVerticalPadding} - 10px);
        padding: ${popupPadding};
        border: 1px ${popupBorderColor} solid;
        border-radius: 5px;
        background-color: ${popupBackgroundColor};
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${modalZindex};
        margin-left: 10px;
        margin-right: 10px;
        overflow-y: auto;
        scrollbar-width: thin;
      }

      button,
      input,
      a,
      textarea {
        font-family: inherit;
      }

      #form > div:last-child {
        margin-bottom: 0;
      }

      #actions {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 10px;
      }

      .cta-button {
        color: white;
        font-size: 14px;
        border-radius: 4px;
        height: 30px;
        margin: 0;
      }

      .sr-only,
      .focus-trap {
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

    return [buttonStyles, surveyStyles];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-feature-feedback-survey': IAFeatureFeedbackSurvey;
  }
}
