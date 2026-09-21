import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { query, state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import { Review } from '@internetarchive/metadata-service';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type { FetchHandlerInterface } from '@internetarchive/fetch-handler';
import type { IAReviews } from './ia-reviews';

import './ia-reviews';
import '@demo/story-template';

const REVIEWS: Review[] = [
  new Review({
    stars: 5,
    reviewtitle: 'Better than I expected',
    reviewbody:
      'Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these.',
    reviewer: 'Ada Fielding',
    reviewer_itemname: '@ada-fielding',
    reviewdate: '2026-08-14',
    createdate: '2026-08-14',
  }),
  new Review({
    stars: 3,
    reviewtitle: 'Good, with caveats',
    reviewbody:
      'The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.',
    reviewer: 'Bo Ellery',
    reviewer_itemname: '@bo-ellery',
    reviewdate: '2026-07-02',
    createdate: '2026-07-02',
  }),
  new Review({
    stars: 1,
    reviewtitle: 'Wrong item',
    reviewbody: 'This is not what the description says it is.',
    reviewer: 'Cal Nwosu',
    reviewer_itemname: '@cal-nwosu',
    reviewdate: '2026-06-21',
    createdate: '2026-06-21',
  }),
];

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Text colour',
    cssVariable: '--ia-text-color',
    defaultValue: '#2c2c2c',
    inputType: 'color',
  },
];

const propInputSettings: PropInputSettings<IAReviews>[] = [
  {
    label: 'Reviews open by default',
    propertyName: 'displayReviewsByDefault',
    defaultValue: true,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Reviews disabled',
    propertyName: 'reviewsDisabled',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Reviews frozen',
    propertyName: 'reviewsFrozen',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Can delete',
    propertyName: 'canDelete',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
  {
    label: 'Submitter screenname',
    propertyName: 'submitterScreenname',
    defaultValue: 'Ada Fielding',
  },
  {
    label: 'Max subject length',
    propertyName: 'maxSubjectLength',
    defaultValue: 64,
    inputType: 'number',
  },
  {
    label: 'Max body length',
    propertyName: 'maxBodyLength',
    defaultValue: 1000,
    inputType: 'number',
  },
];

/**
 * Stands in for the real fetch handler so submitting in the demo doesn't post
 * to archive.org. Every call reports success without going near the network.
 */
const demoFetchHandler: FetchHandlerInterface = {
  async fetch() {
    return new Response('{}', { status: 200 });
  },
  async fetchApiResponse<T>() {
    return { success: true } as T;
  },
  async fetchApiPathResponse<T>() {
    return { success: true } as T;
  },
  async fetchIAApiResponse<T>() {
    return { success: true } as T;
  },
};

const MAX_LOG_ENTRIES = 6;

@customElement('ia-reviews-story')
export class IAReviewsStory extends LitElement {
  @state() private log: string[] = [];

  @query('ia-reviews') private reviews?: IAReviews;

  render() {
    return html`
      <story-template
        elementTag="ia-reviews"
        elementClassName="IAReviews"
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
        .defaultUsageProps=${'.reviews=${reviews} identifier="nasa"'}
      >
        <ia-reviews
          slot="demo"
          identifier="nasa"
          displayReviewsByDefault
          bypassRecaptcha
          submitterScreenname="Ada Fielding"
          .reviews=${REVIEWS}
          .fetchHandler=${demoFetchHandler}
          @newReviewAdded=${this.record}
        ></ia-reviews>

        <div slot="demo" class="panel">
          <button class="add-review" @click=${this.openReviewForm}>
            Add review
          </button>
        </div>

        <div slot="demo" class="panel">
          <div class="log-header">
            <strong>Events</strong>
            <button @click=${() => (this.log = [])}>Clear</button>
          </div>
          ${this.log.length === 0
            ? html`<p class="empty">
                Submit the review form to see events here.
              </p>`
            : html`<ol class="log">
                ${this.log.map((entry) => html`<li><code>${entry}</code></li>`)}
              </ol>`}
        </div>

        <div slot="usage-notes">
          <p>
            The reviews list for an item, plus the form for writing one. Pass
            the existing reviews in as <code>reviews</code> and the item's
            <code>identifier</code>; the component posts new ones itself through
            its <code>fetchHandler</code>.
          </p>
          <p>
            <code>bypassRecaptcha</code> is set here so the form can be
            submitted without a reCAPTCHA key, and the demo supplies a stub
            <code>fetchHandler</code> so nothing posts to archive.org. In real
            use, hand it a <code>recaptchaManager</code> and the real handler.
          </p>
          <p>
            The component only shows a "write a review" link when an item has no
            reviews yet. With reviews present, a host page supplies its own
            button and opens the form by setting <code>displayReviewForm</code>
            on the element, which is what the "Add review" button above does and
            what offshoot and the legacy Details page both do.
          </p>
          <p>
            <code>newReviewAdded</code> is the only event that leaves the
            component. The form's <code>reviewUpdated</code> and
            <code>reviewEditCanceled</code> are handled inside
            <code>ia-reviews</code> and don't cross its shadow boundary.
          </p>
          <p>
            <code>reviewsDisabled</code> hides the whole section, while
            <code>reviewsFrozen</code> keeps existing reviews visible but stops
            new ones. <code>canDelete</code> is what puts the delete control on
            a review the current user wrote.
          </p>
        </div>
      </story-template>
    `;
  }

  /**
   * Opens the review form the way a host page does, by setting
   * `displayReviewForm` on the element. The component only offers its own way
   * in when an item has no reviews yet.
   */
  private openReviewForm(): void {
    if (this.reviews) this.reviews.displayReviewForm = true;
  }

  private record(e: Event): void {
    const { detail } = e as CustomEvent;
    const suffix = detail ? ` ${JSON.stringify(detail)}` : '';
    this.log = [`${e.type}${suffix}`, ...this.log].slice(0, MAX_LOG_ENTRIES);
  }

  static get styles(): CSSResultGroup {
    return css`
      .panel {
        margin-top: 1em;
      }

      .add-review {
        font: inherit;
        padding: 0.3em 0.8em;
      }

      .log-header {
        display: flex;
        align-items: center;
        gap: 0.5em;
        margin-bottom: 0.5em;
      }

      .log {
        margin: 0;
        padding-left: 1.5em;
        font-size: 0.9em;
        word-break: break-all;
      }

      .empty {
        font-size: 0.9em;
        font-style: italic;
      }
    `;
  }
}
