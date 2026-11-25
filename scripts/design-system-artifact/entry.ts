// The design-system artifact's bundle: React components over this package's
// Lit elements, as window.IADesignSystem. build.mts bundles it.
//
// Claude Design renders React only. Each export here is @lit/react's
// createComponent over the element class in src/, so a design built with them
// renders the real component, not a lookalike. Nothing is reimplemented: props
// set element properties, onX handlers listen for the element's events.

import * as React from 'react';
import { html } from 'lit';
import { createComponent } from '@lit/react';
import { IAButton as IAButtonElement } from '@src/elements/ia-button/ia-button';
import { IADropdownSearchBar as IADropdownSearchBarElement } from '@src/elements/ia-dropdown-search-bar/ia-dropdown-search-bar';
import { IAComboBox as IAComboBoxElement } from '@src/elements/ia-combo-box/ia-combo-box';
import { IAStatusIndicator as IAStatusIndicatorElement } from '@src/elements/ia-status-indicator/ia-status-indicator';
import { IAOTPForm as IAOTPFormElement } from '@src/elements/ia-otp-form/ia-otp-form';
import { IAHistogramDateRange as IAHistogramDateRangeElement } from '@src/elements/ia-histogram-date-range/ia-histogram-date-range';
import { IADropdown as IaDropdownElement } from '@src/elements/ia-dropdown/ia-dropdown';

/**
 * Button (`<ia-button>`) in primary, secondary, danger and other modes.
 * Has a loading state and renders a link when given `href`. Children are the label.
 * Size it through `style`: `--ia-theme-button-width` and `--ia-theme-button-height`, on
 * the button or any ancestor. `--ia-theme-button-width: 100%` is a full-width button.
 */
export const IAButton = createComponent({
  tagName: 'ia-button',
  elementClass: IAButtonElement,
  react: React,
});

/**
 * The site search bar (`<ia-dropdown-search-bar>`) with its search-type dropdown.
 * Then the query field and a submit button, as on archive.org.
 */
export const IADropdownSearchBar = createComponent({
  tagName: 'ia-dropdown-search-bar',
  elementClass: IADropdownSearchBarElement,
  react: React,
  events: {
    onCategoryChanged: 'categoryChanged',
    onSearchRequested: 'searchRequested',
  },
});

/**
 * Combo box (`<ia-combo-box>`): a text field over a filtered list of options.
 * The TV search's network and show filters use it.
 */
export const IAComboBox = createComponent({
  tagName: 'ia-combo-box',
  elementClass: IAComboBoxElement,
  react: React,
  events: {
    onChange: 'change',
    onToggle: 'toggle',
  },
});

/**
 * Status indicator (`<ia-status-indicator>`) for loading, success and error.
 * An animated ring, check or "!", with an accessible title per state.
 */
export const IAStatusIndicator = createComponent({
  tagName: 'ia-status-indicator',
  elementClass: IAStatusIndicatorElement,
  react: React,
});

/**
 * One-time-code form (`<ia-otp-form>`) for email sign-in codes.
 * Six code boxes with loading, success and error states and an "Email me another code" link.
 */
export const IAOtpForm = createComponent({
  tagName: 'ia-otp-form',
  elementClass: IAOTPFormElement,
  react: React,
  events: {
    onNewCodeRequested: 'newCodeRequested',
    onCodeSubmitted: 'codeSubmitted',
  },
});

/**
 * Date-range histogram (`<ia-histogram-date-range>`), the facets' year filter.
 * A histogram of results per period with two draggable handles and year inputs.
 */
export const IAHistogramDateRange = createComponent({
  tagName: 'ia-histogram-date-range',
  elementClass: IAHistogramDateRangeElement,
  react: React,
  events: {
    onHistogramDateRangeUpdated: 'histogramDateRangeUpdated',
  },
});

const IADropdownElementComponent = createComponent({
  tagName: 'ia-dropdown',
  elementClass: IaDropdownElement,
  react: React,
  events: {
    onOptionSelected: 'optionSelected',
  },
});

type IADropdownProps = React.ComponentProps<typeof IADropdownElementComponent>;

/**
 * Dropdown menu (`<ia-dropdown>`), as used for the sort field.
 * A trigger with a dark list of options.
 *
 * ia-dropdown pads each option's first child element, not the option itself,
 * so a plain-string label renders flush against the menu edge. Live consumers
 * wrap every label in a span (collection-browser's sort bar uses
 * `<span class="dropdown-option-label">`); this does the same for string
 * labels so React callers can pass plain text.
 */
export const IADropdown = React.forwardRef<IaDropdownElement, IADropdownProps>(
  function IADropdown({ options, ...rest }, ref) {
    const wrapped = React.useMemo(
      () =>
        options?.map((o) =>
          typeof o.label === 'string'
            ? {
                ...o,
                label: html`<span class="dropdown-option-label"
                  >${o.label}</span
                >`,
              }
            : o,
        ),
      [options],
    );
    return React.createElement(IADropdownElementComponent, {
      ...rest,
      options: wrapped,
      ref,
    });
  },
);

// ---- The other elements ----
import { IADonationThermometer as IADonationThermometerElement } from '@src/elements/ia-donation-thermometer/ia-donation-thermometer';
import { IaClearableTextInput as IAClearableTextInputElement } from '@src/elements/ia-clearable-text-input/ia-clearable-text-input';
import { IAOTPInput as IAOtpInputElement } from '@src/elements/ia-otp-input/ia-otp-input';
import { IAExpandableSearchBar as IAExpandableSearchBarElement } from '@src/elements/ia-expandable-search-bar/ia-expandable-search-bar';
import { IAWaybackSearchForm as IAWaybackSearchFormElement } from '@src/elements/ia-wayback-search-form/ia-wayback-search-form';
import { IAScrubberBar as IAScrubberBarElement } from '@src/elements/ia-scrubber-bar/ia-scrubber-bar';
import { IAPlaybackControls as IAPlaybackControlsElement } from '@src/elements/ia-playback-controls/ia-playback-controls';
import { IAWaveformProgress as IAWaveformProgressElement } from '@src/elements/ia-waveform-progress/ia-waveform-progress';
import { IAFeatureFeedback as IAFeatureFeedbackElement } from '@src/elements/ia-feature-feedback/ia-feature-feedback';
import { IATopNav as IATopnavElement } from '@src/elements/ia-topnav/ia-topnav';
import { IAReviews as IAReviewsElement } from '@src/elements/ia-reviews/ia-reviews';
import { IATranscriptView as IATranscriptViewElement } from '@src/elements/ia-transcript-view/ia-transcript-view';
import { IARadioPlayer as IARadioPlayerElement } from '@src/elements/ia-radio-player/ia-radio-player';
import { MockFeatureFeedbackService } from '@src/elements/ia-feature-feedback/mocks/mock-feature-feedback-service';
import { MockRecaptchaManager } from '@src/elements/ia-feature-feedback/mocks/mock-recaptcha-manager';
import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import * as previewMocks from './mocks';
export { iconNames, iconSvg, logoSvg } from './icons';
export { Review } from '@internetarchive/metadata-service';
export {
  TranscriptConfig,
  TranscriptEntryConfig,
} from '@src/elements/ia-transcript-view/models';
export { SearchHandler } from '@src/elements/ia-radio-player/search/search-handler';
export { TranscriptIndex } from '@src/elements/ia-radio-player/search/transcript-index';
export { LocalSearchBackend } from '@src/elements/ia-radio-player/search/backends/local-search-backend';

/** Stand-ins for the services a few components need, so a prototype works without a backend. Never in production. */
export const demo = {
  MockFeatureFeedbackService,
  MockRecaptchaManager,
  SharedResizeObserver,
  ...previewMocks,
};

/** The donation progress bar (`<ia-donation-thermometer>`) for fundraising banners. */
export const IADonationThermometer = createComponent({
  tagName: 'ia-donation-thermometer',
  elementClass: IADonationThermometerElement,
  react: React,
});

/** A text field (`<ia-clearable-text-input>`) with a clear button. */
export const IAClearableTextInput = createComponent({
  tagName: 'ia-clearable-text-input',
  elementClass: IAClearableTextInputElement,
  react: React,
  events: { onClear: 'clear', onSubmit: 'submit' },
});

/** The row of one-time-code boxes (`<ia-otp-input>`) inside IAOtpForm, on its own. */
export const IAOtpInput = createComponent({
  tagName: 'ia-otp-input',
  elementClass: IAOtpInputElement,
  react: React,
  events: { onCodeSubmitted: 'codeSubmitted' },
});

/** A search field (`<ia-expandable-search-bar>`) with suggested searches that drop out beneath it. */
export const IAExpandableSearchBar = createComponent({
  tagName: 'ia-expandable-search-bar',
  elementClass: IAExpandableSearchBarElement,
  react: React,
  events: {
    onInputChange: 'inputchange',
    onEnterKeyPressed: 'enterKeyPressed',
    onSearchCleared: 'searchCleared',
    onQuickSearchSelected: 'quickSearchSelected',
  },
});

/** The Wayback Machine search form (`<ia-wayback-search-form>`) from the topnav's Wayback menu. */
export const IAWaybackSearchForm = createComponent({
  tagName: 'ia-wayback-search-form',
  elementClass: IAWaybackSearchFormElement,
  react: React,
  events: { onWaybackSearchSubmitted: 'waybackSearchSubmitted' },
});

/** A media scrubber (`<ia-scrubber-bar>`): a range slider with optional section markers. */
export const IAScrubberBar = createComponent({
  tagName: 'ia-scrubber-bar',
  elementClass: IAScrubberBarElement,
  react: React,
  events: {
    onValueChange: 'valuechange',
    onUserInteractionStarted: 'userInteractionStarted',
    onUserInteractionEnded: 'userInteractionEnded',
  },
});

/** Transport controls (`<ia-playback-controls>`): play and pause, skips, speed and volume. */
export const IAPlaybackControls = createComponent({
  tagName: 'ia-playback-controls',
  elementClass: IAPlaybackControlsElement,
  react: React,
  events: {
    onPlayPauseButtonPressed: 'play-pause-button-pressed',
    onBackButtonPressed: 'back-button-pressed',
    onForwardButtonPressed: 'forward-button-pressed',
    onPrevSectionButtonPressed: 'prev-section-button-pressed',
    onNextSectionButtonPressed: 'next-section-button-pressed',
    onPlaybackRateChange: 'playbackRateChange',
    onVolumeChange: 'volumeChange',
  },
});

/** A waveform image (`<ia-waveform-progress>`) that fills in as audio plays. */
export const IAWaveformProgress = createComponent({
  tagName: 'ia-waveform-progress',
  elementClass: IAWaveformProgressElement,
  react: React,
  events: { onValueChange: 'valuechange' },
});

/** The "Beta Feedback" button and vote prompt (`<ia-feature-feedback>`). */
export const IAFeatureFeedback = createComponent({
  tagName: 'ia-feature-feedback',
  elementClass: IAFeatureFeedbackElement,
  react: React,
});

/** The archive.org masthead (`<ia-topnav>`): primary nav, media menu, search and account menu. */
export const IATopnav = createComponent({
  tagName: 'ia-topnav',
  elementClass: IATopnavElement,
  react: React,
  events: {
    onAnalyticsClick: 'analyticsClick',
    onAnalyticsSubmit: 'analyticsSubmit',
  },
});

/** An item's reviews (`<ia-reviews>`), with stars, and the form for writing one. */
export const IAReviews = createComponent({
  tagName: 'ia-reviews',
  elementClass: IAReviewsElement,
  react: React,
  events: { onNewReviewAdded: 'newReviewAdded' },
});

/** A scrolling transcript (`<ia-transcript-view>`) that follows playback. */
export const IATranscriptView = createComponent({
  tagName: 'ia-transcript-view',
  elementClass: IATranscriptViewElement,
  react: React,
  events: { onTranscriptEntrySelected: 'transcriptEntrySelected' },
});

/** The TV and radio archive's audio player (`<ia-radio-player>`): controls, waveform, search and transcript. */
export const IARadioPlayer = createComponent({
  tagName: 'ia-radio-player',
  elementClass: IARadioPlayerElement,
  react: React,
  events: {
    onPlayPauseButtonPressed: 'playPauseButtonPressed',
    onSearchExecuted: 'searchExecuted',
    onTranscriptEntrySelected: 'transcriptEntrySelected',
  },
});

// ---- The ones that need services, previewed over mocks (window.IADesignSystem.demo) ----
import { IADonationFormController as IADonationFormControllerElement } from '@src/elements/ia-donation-form/ia-donation-form-controller';
import { IADonationUpsellModalContent as IADonationUpsellModalContentElement } from '@src/elements/ia-donation-form/modals/ia-donation-upsell-modal-content';
import { IADonationErrorModalContent as IADonationErrorModalContentElement } from '@src/elements/ia-donation-form/modals/ia-donation-error-modal-content';
import { IADonationConfirmModal as IADonationConfirmModalElement } from '@src/elements/ia-donation-form/modals/ia-donation-confirm-modal';
import { IAModalManager as IAModalManagerElement } from '@src/elements/modal-manager/modal-manager';
import { IAModalManagerTemplate as IAModalTemplateElement } from '@src/elements/modal-manager/ia-modal-manager-template';
import { IAImageViewer as IAImageViewerElement } from '@src/elements/ia-image-viewer/ia-image-viewer';
import { IAItemNavigator as IAItemNavigatorElement } from '@src/elements/ia-item-navigator/ia-item-navigator';
import { IABookActions as IABookActionsElement } from '@src/elements/ia-book-actions/ia-book-actions';
import { IAInfiniteScroller as IAInfiniteScrollerElement } from '@src/elements/ia-infinite-scroller/ia-infinite-scroller';
export { ModalConfig } from '@src/elements/modal-manager/modal-config';
/** lit's `html` tag, for the props that take a lit template (ModalConfig text, infinite-scroller cells, item-navigator panels). */
export { html };

/** The donation form (`<ia-donation-form-controller>`): frequency, amount, payment method, contact details. */
export const IADonationForm = createComponent({
  tagName: 'ia-donation-form-controller',
  elementClass: IADonationFormControllerElement,
  react: React,
  events: {
    onDonationInfoChanged: 'donationInfoChanged',
    onPaymentFlowStarted: 'paymentFlowStarted',
    onPaymentFlowConfirmed: 'paymentFlowConfirmed',
    onPaymentFlowCancelled: 'paymentFlowCancelled',
    onPaymentFlowError: 'paymentFlowError',
  },
});
/** The monthly-upsell dialog body (`<ia-donation-upsell-modal-content>`) shown after a one-time gift. */
export const IADonationUpsellModalContent = createComponent({
  tagName: 'ia-donation-upsell-modal-content',
  elementClass: IADonationUpsellModalContentElement,
  react: React,
  events: {
    onAmountChanged: 'amountChanged',
    onYesSelected: 'yesSelected',
    onNoThanksSelected: 'noThanksSelected',
  },
});
/** The donation error dialog body (`<ia-donation-error-modal-content>`). */
export const IADonationErrorModalContent = createComponent({
  tagName: 'ia-donation-error-modal-content',
  elementClass: IADonationErrorModalContentElement,
  react: React,
});
/** The "confirm your donation" dialog body (`<ia-donation-confirm-modal>`). */
export const IADonationConfirmModal = createComponent({
  tagName: 'ia-donation-confirm-modal',
  elementClass: IADonationConfirmModalElement,
  react: React,
});
/** The page's one dialog host (`<modal-manager>`); open dialogs with its `showModal({ config })`. */
export const IAModalManager = createComponent({
  tagName: 'modal-manager',
  elementClass: IAModalManagerElement,
  react: React,
  events: { onModeChanged: 'modeChanged' },
});
/** The dialog itself (`<ia-modal-manager-template>`), drawn in place: header, logo, headline, message, children. */
export const IAModal = createComponent({
  tagName: 'ia-modal-manager-template',
  elementClass: IAModalTemplateElement,
  react: React,
  events: {
    onCloseButtonPressed: 'closeButtonPressed',
    onLeftNavButtonPressed: 'leftNavButtonPressed',
  },
});
/** A swipeable image carousel (`<ia-image-viewer>`) with arrows and a counter. */
export const IAImageViewer = createComponent({
  tagName: 'ia-image-viewer',
  elementClass: IAImageViewerElement,
  react: React,
  events: {
    onImageChanged: 'imageChanged',
    onImageActivated: 'imageActivated',
    onImageLoaded: 'imageLoaded',
    onImageLoadFailed: 'imageLoadFailed',
  },
});
/** The item page's theater frame (`<ia-item-navigator>`): a side menu of panels beside whatever viewer is slotted in. */
export const IAItemNavigator = createComponent({
  tagName: 'ia-item-navigator',
  elementClass: IAItemNavigatorElement,
  react: React,
  events: {
    onFullscreenToggled: 'fullscreenToggled',
    onSlotChange: 'slotChange',
  },
});
/** The book lending bar (`<ia-book-actions>`): borrow, return, waitlist and the loan timer. */
export const IABookActions = createComponent({
  tagName: 'ia-book-actions',
  elementClass: IABookActionsElement,
  react: React,
  events: { onLendingActionError: 'lendingActionError' },
});
/** A virtualized grid (`<ia-infinite-scroller>`): renders only the cells near the viewport. */
export const IAInfiniteScroller = createComponent({
  tagName: 'ia-infinite-scroller',
  elementClass: IAInfiniteScrollerElement,
  react: React,
  events: {
    onScrollThresholdReached: 'scrollThresholdReached',
    onVisibleCellsChanged: 'visibleCellsChanged',
  },
});
