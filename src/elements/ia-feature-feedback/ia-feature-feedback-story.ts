import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';

import './ia-feature-feedback';
import './ia-feature-feedback-survey';
import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import '@demo/story-template';
import { tagFromHash } from '@demo/element-hash';

import type { IAFeatureFeedback } from './ia-feature-feedback';
import type { FeatureFeedbackServiceInterface } from './feature-feedback-service';
import { MockFeatureFeedbackService } from './mocks/mock-feature-feedback-service';
import { MockRecaptchaManager } from './mocks/mock-recaptcha-manager';

const DEMO_FEATURE_IDENTIFIER = 'demo-feature';
const DEMO_SURVEY_IDENTIFIER = 'demo-survey';

/** How long the mock service takes to answer, so the processing state shows. */
const SUBMISSION_DELAY_MS = 800;

/**
 * The widgets size some text in rem against the 10px root font size that
 * archive.org and offshoot both set, so at the demo's 16px root it renders
 * 1.6x too big.
 */
const ARCHIVE_ROOT_FONT_SIZE = '10px';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Accent color',
    cssVariable: '--featureFeedbackBlueColor',
    defaultValue: '#194880',
    inputType: 'color',
  },
  {
    label: 'Popup background',
    cssVariable: '--featureFeedbackPopupBackgroundColor',
    defaultValue: '#F5F5F7',
    inputType: 'color',
  },
  {
    label: 'Upvote color',
    cssVariable: '--upvoteColor',
    defaultValue: '#23765D',
    inputType: 'color',
  },
  {
    label: 'Downvote color',
    cssVariable: '--downvoteColor',
    defaultValue: '#720D11',
    inputType: 'color',
  },
];

const propInputSettings: PropInputSettings<IAFeatureFeedback>[] = [
  {
    label: 'Display mode',
    propertyName: 'displayMode',
    defaultValue: 'button',
    inputType: 'radio',
    radioOptions: ['button', 'vote-prompt'],
  },
  {
    label: 'Button text',
    propertyName: 'buttonText',
    defaultValue: 'Beta',
  },
  {
    label: 'Prompt',
    propertyName: 'prompt',
    defaultValue: 'Do you find this feature useful?',
  },
  {
    label: 'Disabled',
    propertyName: 'disabled',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [false, true],
  },
];

@customElement('ia-feature-feedback-story')
export class IAFeatureFeedbackStory extends LitElement {
  @state() private failSubmissions = false;

  @state() private submissionLog: string[] = [];

  /**
   * Matches archive.org's root font size. On by default only when feature
   * feedback is the element being viewed, since the root size applies to the
   * whole demo page and would shrink every other story in the all-elements view.
   */
  @state() private archiveFontSize =
    tagFromHash(window.location.hash) === 'ia-feature-feedback';

  private rootFontSizeBefore?: string;

  private readonly recaptchaManager = new MockRecaptchaManager();

  private readonly resizeObserver = new SharedResizeObserver();

  private readonly succeedingService = this.loggedService(
    new MockFeatureFeedbackService({ delay: SUBMISSION_DELAY_MS }),
  );

  private readonly failingService = this.loggedService(
    new MockFeatureFeedbackService({
      delay: SUBMISSION_DELAY_MS,
      returnValue: { success: false },
    }),
  );

  updated() {
    const root = document.documentElement.style;
    if (this.archiveFontSize && this.rootFontSizeBefore === undefined) {
      this.rootFontSizeBefore = root.fontSize;
      root.fontSize = ARCHIVE_ROOT_FONT_SIZE;
    } else if (!this.archiveFontSize) {
      this.restoreRootFontSize();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.restoreRootFontSize();
  }

  private restoreRootFontSize() {
    if (this.rootFontSizeBefore === undefined) return;
    document.documentElement.style.fontSize = this.rootFontSizeBefore;
    this.rootFontSizeBefore = undefined;
  }

  private get service(): FeatureFeedbackServiceInterface {
    return this.failSubmissions ? this.failingService : this.succeedingService;
  }

  private record(entry: string) {
    this.submissionLog = [entry, ...this.submissionLog].slice(0, 5);
  }

  /** Wraps a service so each submission lands in the on-page log. */
  private loggedService(
    inner: FeatureFeedbackServiceInterface,
  ): FeatureFeedbackServiceInterface {
    return {
      submitFeedback: async (options) => {
        this.record(
          `Feedback: ${options.vote} on ${options.featureIdentifier}` +
            (options.comments ? `, "${options.comments}"` : ''),
        );
        return inner.submitFeedback(options);
      },
      submitSurvey: async (options) => {
        this.record(
          `Survey ${options.surveyIdentifier}: ${options.responses.length} responses`,
        );
        return inner.submitSurvey(options);
      },
    };
  }

  private toggleRow(
    label: string,
    checked: boolean,
    onChange: (checked: boolean) => void,
  ) {
    return html`
      <tr>
        <td>${label}</td>
        <td>
          <input
            type="checkbox"
            .checked=${checked}
            @change=${(e: Event) =>
              onChange((e.target as HTMLInputElement).checked)}
          />
        </td>
      </tr>
    `;
  }

  render() {
    return html`
      <story-template
        elementTag="ia-feature-feedback"
        elementClassName="IAFeatureFeedback"
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-feature-feedback
          slot="demo"
          .featureIdentifier=${DEMO_FEATURE_IDENTIFIER}
          .featureFeedbackService=${this.service}
          .recaptchaManager=${this.recaptchaManager}
          .resizeObserver=${this.resizeObserver}
        ></ia-feature-feedback>

        <ia-feature-feedback
          slot="demo"
          displayMode="vote-prompt"
          .featureIdentifier=${DEMO_FEATURE_IDENTIFIER}
          .featureFeedbackService=${this.service}
          .recaptchaManager=${this.recaptchaManager}
          .resizeObserver=${this.resizeObserver}
        ></ia-feature-feedback>

        <ia-feature-feedback-survey
          slot="demo"
          showButtonThumbs
          showQuestionNumbers
          .surveyIdentifier=${DEMO_SURVEY_IDENTIFIER}
          .featureFeedbackService=${this.service}
          .recaptchaManager=${this.recaptchaManager}
          .resizeObserver=${this.resizeObserver}
        >
          <ia-feature-feedback-survey-vote
            prompt="How do you feel about foo?"
            required
          ></ia-feature-feedback-survey-vote>
          <ia-feature-feedback-survey-extra
            name="foo"
            value="bar"
          ></ia-feature-feedback-survey-extra>
          <ia-feature-feedback-survey-vote
            prompt="How do you feel about bar?"
            showComments
            commentPlaceholder="You may enter an optional comment as well..."
          ></ia-feature-feedback-survey-vote>
          <ia-feature-feedback-survey-comment
            prompt="What does foobar mean to you?"
            placeholder="You must answer this question."
            required
          ></ia-feature-feedback-survey-comment>
        </ia-feature-feedback-survey>

        <div slot="demo" class="submissions">
          <label>
            <input
              type="checkbox"
              .checked=${this.failSubmissions}
              @change=${(e: Event) => {
                this.failSubmissions = (e.target as HTMLInputElement).checked;
              }}
            />
            Fail submissions
          </label>
          <p class="log-title">Submissions</p>
          <ul class="log">
            ${this.submissionLog.length
              ? this.submissionLog.map((entry) => html`<li>${entry}</li>`)
              : html`<li>None yet.</li>`}
          </ul>
        </div>

        <div slot="settings">
          <table>
            ${this.toggleRow(
              'archive.org root font size',
              this.archiveFontSize,
              (checked) => {
                this.archiveFontSize = checked;
              },
            )}
          </table>
          <p class="hint">
            archive.org root font size sets the page's root font size to 10px,
            which the widgets are built for. It applies to the whole demo page,
            so it's on by default only when feature feedback is the element
            being viewed.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            Nothing here talks to a server. The demo uses a mock Recaptcha
            manager and a mock feedback service that answers after a short
            delay, and each submission is added to the log.
          </p>
          <p>
            <code>displayMode</code> picks between a single button that opens a
            popup and an inline prompt with vote buttons. In
            <code>vote-prompt</code> mode a click on a vote submits right away.
          </p>
          <p>
            <code>ia-feature-feedback-survey</code> takes
            <code>ia-feature-feedback-survey-vote</code>,
            <code>ia-feature-feedback-survey-comment</code> and
            <code>ia-feature-feedback-survey-extra</code> as children. Extras
            send a fixed name and value with the responses and render nothing.
          </p>
          <p>
            Pass a <code>featureFeedbackService</code>, a
            <code>recaptchaManager</code> and a shared
            <code>resizeObserver</code> to each widget. Submissions fail without
            the first two.
          </p>
        </div>
      </story-template>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .submissions {
        margin-top: 1rem;
        font-size: 1.4rem;
      }

      .log-title {
        margin: 0.8rem 0 0.2rem;
        font-weight: bold;
      }

      .log {
        margin: 0;
        padding-left: 2rem;
        font-family: monospace;
        font-size: 1.2rem;
      }

      .hint {
        font-size: 1.2rem;
      }

      td {
        padding-right: 1rem;
      }
    `;
  }
}
