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
import { localized, msg } from '@lit/localize';
import { IASurveyQuestionInterface, IASurveyQuestionResponse } from './models';

@customElement('ia-feature-feedback-survey-comment')
@localized()
export class IAFeatureFeedbackSurveyComment
  extends LitElement
  implements IASurveyQuestionInterface
{
  /**
   * The prompt text to show for this question.
   * If empty, no prompt text element will be rendered.
   */
  @property({ type: String }) prompt = '';

  /**
   * The current comment text for this question.
   */
  @property({ type: String }) value = '';

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
   * Optional placeholder text to use for the comment field.
   */
  @property({ type: String }) placeholder?: string;

  /**
   * The textarea holding this question's comment text.
   */
  @query('#comments') private commentBox!: HTMLTextAreaElement;

  /**
   * Default placeholder text for required respones.
   */
  private static get DEFAULT_PLACEHOLDER_REQUIRED(): string {
    return msg('Comments');
  }

  /**
   * Default placeholder text for optional responses.
   */
  private static get DEFAULT_PLACEHOLDER_OPTIONAL(): string {
    return msg('Comments (optional)');
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
        ${this.promptTextTemplate}${this.commentBoxTemplate}
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
    const isValid = !this.required || !!this.commentBox.value;
    if (isValid) {
      this.internals.setValidity({});
    } else {
      this.internals.setValidity(
        { valueMissing: true },
        'A comment is required.',
      );
    }
    return this.internals.reportValidity();
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
      name: this.prompt,
      comment: this.value,
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
   * Template for the comment <textarea> for this question.
   */
  private get commentBoxTemplate(): TemplateResult {
    const defaultPlaceholder = this.required
      ? IAFeatureFeedbackSurveyComment.DEFAULT_PLACEHOLDER_REQUIRED
      : IAFeatureFeedbackSurveyComment.DEFAULT_PLACEHOLDER_OPTIONAL;

    const placeholder = this.placeholder ?? defaultPlaceholder;

    return html`
      <textarea
        id="comments"
        tabindex="0"
        placeholder=${placeholder}
        aria-labelledby="prompt-text"
        aria-required=${this.required}
        .value=${this.value}
        ?disabled=${this.disabled}
        @change=${this.commentChanged}
      ></textarea>
    `;
  }

  /**
   * Handler for when the value of the comments textarea changes.
   */
  private commentChanged(): void {
    if (this.disabled) return;

    this.value = this.commentBox.value;
    if (this.value) this.internals.setValidity({});

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
    const height = css`var(--commentHeight, 50px)`;
    const resize = css`var(--commentResize, none)`;

    const questionMargin = css`var(--surveyQuestionMargin, 0 0 15px 0)`;

    const promptFontWeight = css`var(--featureFeedbackPromptFontWeight, bold)`;
    const promptFontSize = css`var(--featureFeedbackPromptFontSize, 1.4rem)`;

    return css`
      #container {
        margin: ${questionMargin};
      }

      #prompt-text {
        text-align: left;
        margin-bottom: 5px;
        flex-grow: 1;
        font-size: ${promptFontSize};
        font-weight: ${promptFontWeight};
      }

      #comments {
        width: 100%;
        height: ${height};
        background-color: #ffffff;
        border: 1px #2c2c2c solid;
        border-radius: 4px;
        padding: 7px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-family: inherit;
        resize: ${resize};
      }

      #comments::placeholder {
        color: #767676;
      }

      :host(:invalid) #comments {
        box-shadow: 0 0 4px red;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-feature-feedback-survey-comment': IAFeatureFeedbackSurveyComment;
  }
}
