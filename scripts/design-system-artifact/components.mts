// The previews, READMEs and type files for the components the bundle wraps,
// beyond the first seven (static/components/). build.mts writes each entry to
// components/<name>/: a preview.html of its stories, a README.md and a .d.ts.
//
// Each story is a JS expression run in the preview, where `h` is
// React.createElement and `DS` is window.IADesignSystem; `setup` runs first.
// `jsx` is the same story as a reader would write it, for the README.

export interface ComponentSpec {
  /** The export on window.IADesignSystem. */
  name: string;
  /** The element it wraps. */
  tag: string;
  /** First line is the summary; the rest follows it in the README. */
  summary: string;
  /** The body of the `<name>Props` interface. */
  props: string;
  /** [story name, JS expression, JSX for the README]. */
  stories: [string, string, string][];
  setup?: string;
  /** The card's row height in px. */
  height?: number;
  /** The card's layout width in px. */
  width?: number;
  /** Stories stacked full width instead of in a grid. */
  column?: boolean;
  /** A paragraph for the README after the summary. */
  notes?: string;
}

/** Draws a made-up waveform as an SVG data URL. */
const WAVE = `
  function waveform(n) { n = n || 240; var b = ''; for (var i = 0; i < n; i++) { var w = Math.sin(i/4)*0.3 + Math.sin(i/13)*0.4 + Math.sin(i/31)*0.3; var ht = Math.max(0.06, Math.abs(w)) * 100; b += '<rect x="' + i*2 + '" y="' + ((100-ht)/2).toFixed(2) + '" width="1" height="' + ht.toFixed(2) + '"/>'; }
    return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + n*2 + ' 100" preserveAspectRatio="none"><g fill="#2b2b2b">' + b + '</g></svg>'); }
`;

/** A short made-up transcript. */
const LINES = `
  var LINES = [['Good evening, and welcome to the programme.', false], ['Tonight we look back at the early days of radio.', false], ['', true], ['The first broadcast went out in nineteen twenty two.', false], ['It reached perhaps a few hundred listeners.', false], ['The transmitter sat in a shed behind the post office.', false], ['', true], ['By the end of the decade the audience was in the millions.', false], ['Whole families gathered around a single radio set.', false], ['And now, the news.', false]];
  function transcript() { return new DS.TranscriptConfig(LINES.map(function (l, i) { return new DS.TranscriptEntryConfig(i, i*6, i*6+5, l[0], l[1]); })); }
`;

export const COMPONENTS: ComponentSpec[] = [
  {
    name: 'IADonationThermometer',
    tag: 'ia-donation-thermometer',
    summary:
      'The donation progress bar (`<ia-donation-thermometer>`) for fundraising banners.\nThe fill grows with `currentAmount` toward `goalAmount`; the goal is printed at the end of the bar.',
    props:
      "className?: string; id?: string; style?: React.CSSProperties; /** Raised so far, in dollars. */ currentAmount?: number; /** The goal, in dollars. Default 7500000. */ goalAmount?: number; /** What the end of the bar says: the goal amount, a message, or nothing. Default 'amount'. */ goalMessageMode?: 'off' | 'amount' | 'message'; /** Shown in 'message' mode while the goal is near. */ goalNearMessage?: string; /** Shown in 'message' mode once the goal is reached. */ goalReachedMessage?: string; /** Whether the current amount is printed on the bar. Default 'on'. */ currentAmountMode?: 'on' | 'off'; /** The bar's accessible label. */ label?: string;",
    stories: [
      [
        'Progress',
        'h(T, { currentAmount: 2350000, goalAmount: 6500000 })',
        '<IADonationThermometer currentAmount={2350000} goalAmount={6500000} />',
      ],
      [
        'NearlyThere',
        'h(T, { currentAmount: 6100000, goalAmount: 6500000 })',
        '<IADonationThermometer currentAmount={6100000} goalAmount={6500000} />',
      ],
      [
        'GoalReached',
        "h(T, { currentAmount: 6600000, goalAmount: 6500000, goalMessageMode: 'message', goalReachedMessage: 'Goal reached. Thank you!' })",
        '<IADonationThermometer currentAmount={6600000} goalAmount={6500000} goalMessageMode="message" goalReachedMessage="Goal reached. Thank you!" />',
      ],
      [
        'AmountHidden',
        "h(T, { currentAmount: 2350000, goalAmount: 6500000, currentAmountMode: 'off' })",
        '<IADonationThermometer currentAmount={2350000} goalAmount={6500000} currentAmountMode="off" />',
      ],
    ],
    setup: `var T = DS.IADonationThermometer;`,
    height: 260,
  },
  {
    name: 'IAClearableTextInput',
    tag: 'ia-clearable-text-input',
    summary:
      'A text field (`<ia-clearable-text-input>`) with a clear button.\nThe button appears once there is text; Enter fires `onSubmit` with the value.',
    props:
      "className?: string; id?: string; style?: React.CSSProperties; value?: string; placeholder?: string; /** The field's accessible name when it has no visible label. */ screenReaderLabel?: string; /** Default 'Clear'. */ clearButtonScreenReaderLabel?: string; /** Moves focus back to the field after clearing. Default true. */ focusOnClear?: boolean; /** Shows the clear button even when empty. */ forceClearButton?: boolean; onClear?: (e: CustomEvent<string>) => void; onSubmit?: (e: CustomEvent<string>) => void;",
    stories: [
      [
        'Empty',
        "h(F, { placeholder: 'Search this collection', screenReaderLabel: 'Search this collection' })",
        '<IAClearableTextInput placeholder="Search this collection" screenReaderLabel="Search this collection" />',
      ],
      [
        'WithText',
        "h(F, { value: 'grateful dead', screenReaderLabel: 'Search this collection' })",
        '<IAClearableTextInput value="grateful dead" screenReaderLabel="Search this collection" />',
      ],
    ],
    setup: `var F = DS.IAClearableTextInput;`,
    height: 160,
  },
  {
    name: 'IAOtpInput',
    tag: 'ia-otp-input',
    summary:
      "The row of one-time-code boxes (`<ia-otp-input>`) on its own, without IAOtpForm's status and resend link.\nTyping or pasting the last character fires `onCodeSubmitted` with the code.",
    props:
      'className?: string; id?: string; style?: React.CSSProperties; /** Number of boxes. Default 6. */ numChars?: number; /** Digits only. Default true. */ numericOnly?: boolean; /** Fills the boxes. Set it after the element has rendered: set on the first render, it throws. */ prefillValue?: string; disabled?: boolean; onCodeSubmitted?: (e: CustomEvent<string>) => void;',
    stories: [
      ['Empty', 'h(O)', '<IAOtpInput />'],
      ['Disabled', 'h(O, { disabled: true })', '<IAOtpInput disabled />'],
    ],
    setup: `var O = DS.IAOtpInput;`,
    height: 180,
  },
  {
    name: 'IAExpandableSearchBar',
    tag: 'ia-expandable-search-bar',
    summary:
      "A search field (`<ia-expandable-search-bar>`) with suggested searches that drop out beneath it.\nThe radio player's transcript search uses it. It is drawn for the player's black theater surface (`--ia-color-surface-theater`); `--ia-theme-search-bar-*` recolors it.",
    props:
      "className?: string; id?: string; style?: React.CSSProperties; searchTerm?: string; placeholder?: string; /** The field's accessible name. */ label?: string; /** Suggested searches, e.g. [{ displayText: 'apollo 11' }]. */ quickSearches?: { displayText: string; data?: unknown }[]; /** Shows the chevron that opens the suggestions. */ showsDisclosure?: boolean; /** The suggestions are open. */ isOpen?: boolean; onInputChange?: (e: CustomEvent) => void; onEnterKeyPressed?: (e: CustomEvent) => void; onSearchCleared?: (e: CustomEvent) => void; onQuickSearchSelected?: (e: CustomEvent) => void;",
    stories: [
      [
        'Closed',
        "stage(h(X, { showsDisclosure: true, quickSearches: Q, placeholder: 'Search the transcript' }))",
        '<IAExpandableSearchBar showsDisclosure quickSearches={quickSearches} placeholder="Search the transcript" />',
      ],
      [
        'Open',
        'stage(h(X, { showsDisclosure: true, isOpen: true, quickSearches: Q }), true)',
        '<IAExpandableSearchBar showsDisclosure isOpen quickSearches={quickSearches} />',
      ],
      [
        'WithTerm',
        "stage(h(X, { searchTerm: 'radio', quickSearches: Q, showsDisclosure: true }))",
        '<IAExpandableSearchBar searchTerm="radio" showsDisclosure quickSearches={quickSearches} />',
      ],
    ],
    setup: `var X = DS.IAExpandableSearchBar; function stage(el, tall) { return h('div', { className: 'ia-inverse', style: { background: 'var(--ia-color-surface-theater)', padding: 'var(--ia-space-3)', minBlockSize: tall ? '220px' : undefined } }, el); } var Q = ['grateful dead', 'apollo 11', 'old time radio', 'prelinger archives'].map(function (t) { return { displayText: t }; });`,
    height: 320,
  },
  {
    name: 'IAWaybackSearchForm',
    tag: 'ia-wayback-search-form',
    summary:
      "The Wayback Machine search form (`<ia-wayback-search-form>`) from the topnav's Wayback menu.\nIt hands the typed URL to `queryHandler.performQuery`.",
    props:
      "className?: string; id?: string; style?: React.CSSProperties; /** Called with the URL or search typed. */ queryHandler?: { performQuery: (query: string) => void }; /** The archived-pages count shown under the form, e.g. '1 trillion'. */ waybackPagesArchived?: string; onWaybackSearchSubmitted?: (e: CustomEvent) => void;",
    stories: [
      [
        'OnDark',
        "h('div', { className: 'ia-inverse', style: { background: 'var(--ia-color-surface-chrome)', padding: 'var(--ia-space-4)' } }, h(W, { waybackPagesArchived: '1 trillion', queryHandler: { performQuery: function (q) { console.log(q); } } }))",
        '<div className="ia-inverse" style={{ background: \'var(--ia-color-surface-chrome)\', padding: \'var(--ia-space-4)\' }}>\n  <IAWaybackSearchForm waybackPagesArchived="1 trillion" queryHandler={{ performQuery: q => console.log(q) }} />\n</div>',
      ],
    ],
    setup: `var W = DS.IAWaybackSearchForm;`,
    height: 260,
    notes:
      'It is drawn for the dark topnav menu, so it sits on a dark surface.',
  },
  {
    name: 'IAScrubberBar',
    tag: 'ia-scrubber-bar',
    summary:
      'A media scrubber (`<ia-scrubber-bar>`): a range slider with optional section markers.\nIt reports drags through `onValueChange`; whatever owns the media decides what to seek.',
    props:
      "className?: string; id?: string; style?: React.CSSProperties; value?: number; /** Default 0. */ min?: number; /** Default 100. */ max?: number; /** Default 0.1. */ step?: number; /** Section boundaries, as percentages of the track. */ sectionMarkerPercentages?: number[]; /** Draws the markers taller. */ expandSectionMarkers?: boolean; /** The slider's accessible name. */ label?: string; onValueChange?: (e: CustomEvent<{ value: number }>) => void; onUserInteractionStarted?: (e: Event) => void; onUserInteractionEnded?: (e: Event) => void;",
    stories: [
      [
        'Playing',
        "h(SB, { value: 35, label: 'Seek' })",
        '<IAScrubberBar value={35} label="Seek" />',
      ],
      [
        'WithSections',
        "h(SB, { value: 60, label: 'Seek', expandSectionMarkers: true, sectionMarkerPercentages: [8, 22, 37, 55, 78, 91] })",
        '<IAScrubberBar value={60} label="Seek" expandSectionMarkers sectionMarkerPercentages={[8, 22, 37, 55, 78, 91]} />',
      ],
    ],
    setup: `var SB = DS.IAScrubberBar;`,
    height: 140,
  },
  {
    name: 'IAPlaybackControls',
    tag: 'ia-playback-controls',
    summary:
      "Transport controls (`<ia-playback-controls>`): play and pause, skips, speed and volume.\nIt plays nothing itself: it reports presses, and the owner of the audio sets `playbackMode`, `playbackRate` and `volume` back. It is drawn for the player's black theater surface; `--ia-theme-playback-controls-*` recolors it.",
    props:
      "className?: string; id?: string; style?: React.CSSProperties; /** Default 'paused'. */ playbackMode?: 'playing' | 'paused'; /** Default 1. */ playbackRate?: number; /** 0 to 1. Default 1. */ volume?: number; onPlayPauseButtonPressed?: (e: Event) => void; onBackButtonPressed?: (e: Event) => void; onForwardButtonPressed?: (e: Event) => void; onPrevSectionButtonPressed?: (e: Event) => void; onNextSectionButtonPressed?: (e: Event) => void; onPlaybackRateChange?: (e: CustomEvent<{ playbackRate: number }>) => void; onVolumeChange?: (e: CustomEvent<{ volume: number }>) => void;",
    stories: [
      ['Paused', 'stage(h(P))', '<IAPlaybackControls />'],
      [
        'Playing',
        "stage(h(P, { playbackMode: 'playing', playbackRate: 1.5, volume: 0.5 }))",
        '<IAPlaybackControls playbackMode="playing" playbackRate={1.5} volume={0.5} />',
      ],
    ],
    setup: `var P = DS.IAPlaybackControls; function stage(el) { return h('div', { className: 'ia-inverse', style: { background: 'var(--ia-color-surface-theater)', padding: 'var(--ia-space-3)' } }, el); }`,
    height: 150,
  },
  {
    name: 'IAWaveformProgress',
    tag: 'ia-waveform-progress',
    summary:
      "A waveform image (`<ia-waveform-progress>`) that fills in as audio plays.\nWith `interactive`, a click or drag reports a new position through `onValueChange`. It is drawn for the player's black theater surface; `--ia-theme-waveform-*` recolors it.",
    props:
      'className?: string; id?: string; style?: React.CSSProperties; /** 0 to 100. */ percentComplete?: number; /** The waveform image. */ waveformUrl?: string; /** Clicks and drags seek. */ interactive?: boolean; /** Silent stretches, shaded, as percentages of the track. */ zonesOfSilence?: { startPercent: number; endPercent: number }[]; onValueChange?: (e: CustomEvent<{ value: number }>) => void;',
    stories: [
      [
        'Progress',
        "stage(h(WP, { style: { display: 'block', inlineSize: '100%', blockSize: '80px' }, waveformUrl: WURL, percentComplete: 40, interactive: true }))",
        "<IAWaveformProgress style={{ display: 'block', inlineSize: '100%', blockSize: '80px' }} waveformUrl={url} percentComplete={40} interactive />",
      ],
      [
        'ZonesOfSilence',
        "stage(h(WP, { style: { display: 'block', inlineSize: '100%', blockSize: '80px' }, waveformUrl: WURL, percentComplete: 65, zonesOfSilence: [{ startPercent: 12, endPercent: 18 }, { startPercent: 44, endPercent: 47 }, { startPercent: 71, endPercent: 79 }] }))",
        "<IAWaveformProgress style={{ display: 'block', inlineSize: '100%', blockSize: '80px' }} waveformUrl={url} percentComplete={65} zonesOfSilence={[{ startPercent: 12, endPercent: 18 }]} />",
      ],
    ],
    setup: `var WP = DS.IAWaveformProgress; function stage(el) { return h('div', { className: 'ia-inverse', style: { background: 'var(--ia-color-surface-theater)', padding: 'var(--ia-space-3)' } }, el); }${WAVE}var WURL = waveform();`,
    height: 200,
    notes:
      "The preview draws its waveform as an SVG data URL; a real page passes the item's waveform image.",
  },
  {
    name: 'IAFeatureFeedback',
    tag: 'ia-feature-feedback',
    summary:
      'The "Beta Feedback" button and vote prompt (`<ia-feature-feedback>`) for a feature in testing.\nIt needs a `featureFeedbackService`, a `recaptchaManager` and a shared `resizeObserver` to submit.',
    props:
      "className?: string; id?: string; style?: React.CSSProperties; /** Which feature the votes are for. */ featureIdentifier?: string; /** The question in the popup. */ prompt?: string; /** The button's label. Default 'Beta Feedback'. */ buttonText?: string; /** 'button' opens a popup; 'vote-prompt' shows the thumbs inline. Default 'button'. */ displayMode?: 'button' | 'vote-prompt'; disabled?: boolean; featureFeedbackService?: object; recaptchaManager?: object; resizeObserver?: object;",
    stories: [
      [
        'Button',
        "h(FB, Object.assign({ featureIdentifier: 'demo-feature' }, deps))",
        '<IAFeatureFeedback featureIdentifier="demo-feature" featureFeedbackService={service} recaptchaManager={recaptcha} resizeObserver={resizeObserver} />',
      ],
      [
        'VotePrompt',
        "h(FB, Object.assign({ featureIdentifier: 'demo-feature', displayMode: 'vote-prompt', prompt: 'Is the new search helpful?' }, deps))",
        '<IAFeatureFeedback displayMode="vote-prompt" prompt="Is the new search helpful?" featureIdentifier="demo-feature" featureFeedbackService={service} recaptchaManager={recaptcha} resizeObserver={resizeObserver} />',
      ],
    ],
    setup: `var FB = DS.IAFeatureFeedback; var deps = { featureFeedbackService: new DS.demo.MockFeatureFeedbackService({ delay: 600 }), recaptchaManager: new DS.demo.MockRecaptchaManager(), resizeObserver: new DS.demo.SharedResizeObserver() };`,
    height: 200,
    notes:
      "The preview uses `window.IADesignSystem.demo`'s mock service and reCAPTCHA manager, so submitting works without a backend. A real page passes the real ones.",
  },
  {
    name: 'IATopnav',
    tag: 'ia-topnav',
    summary:
      'The archive.org masthead (`<ia-topnav>`): primary nav, media menu, search and account menu.\nIt reports clicks and submits through `onAnalyticsClick` and `onAnalyticsSubmit`; below 890px wide it switches to the narrow layout.',
    props:
      "className?: string; id?: string; style?: React.CSSProperties; /** Signed in when set. */ username?: string; screenName?: string; /** The item being viewed, for the account menu's item actions. */ itemIdentifier?: string; uploader?: string; /** Admin actions on the item; needs username and itemIdentifier too. */ admin?: boolean; canManageFlags?: boolean; /** Drops the search field (the search page and homepage have their own). */ hideSearch?: boolean; /** Default 'https://archive.org'. */ baseHost?: string; mediaBaseHost?: string; /** Default '/upload'. */ uploadUrl?: string; waybackPagesArchived?: string; /** Content for the language-picker slot. */ children?: React.ReactNode; onAnalyticsClick?: (e: CustomEvent) => void; onAnalyticsSubmit?: (e: CustomEvent) => void;",
    stories: [
      ['SignedOut', 'h(TN)', '<IATopnav />'],
      [
        'SignedIn',
        "h(TN, { username: 'demo-user', screenName: 'Demo User' })",
        '<IATopnav username="demo-user" screenName="Demo User" />',
      ],
      ['NoSearch', 'h(TN, { hideSearch: true })', '<IATopnav hideSearch />'],
    ],
    setup: `var TN = DS.IATopnav;`,
    height: 560,
    width: 1280,
    column: true,
    notes:
      'Images it loads from `baseHost` (the account picture) do not load in a preview.',
  },
  {
    name: 'IAReviews',
    tag: 'ia-reviews',
    summary:
      "An item's reviews (`<ia-reviews>`), with star ratings, and the form for writing one.\nPass the item's `identifier` and its reviews; writing and deleting go through the `reviewService` it is handed.",
    props:
      "className?: string; id?: string; style?: React.CSSProperties; identifier?: string; /** The reviews, as metadata-service Review objects (window.IADesignSystem.Review). */ reviews?: object[]; /** Shows the list without a toggle. */ displayReviewsByDefault?: boolean; /** Default 5. */ maxInitialReviews?: number; reviewsDisabled?: boolean; reviewsFrozen?: boolean; canDelete?: boolean; submitterScreenname?: string; bypassRecaptcha?: boolean; reviewService?: object; recaptchaManager?: object; /** Default 'https://archive.org'. */ baseHost?: string; onNewReviewAdded?: (e: CustomEvent) => void;",
    stories: [
      [
        'List',
        "h(RV, { identifier: 'demo-item', displayReviewsByDefault: true, reviews: REVIEWS })",
        '<IAReviews identifier="demo-item" displayReviewsByDefault reviews={reviews} />',
      ],
      [
        'Frozen',
        "h(RV, { identifier: 'demo-item', displayReviewsByDefault: true, reviewsFrozen: true, reviews: REVIEWS.slice(0, 2) })",
        '<IAReviews identifier="demo-item" displayReviewsByDefault reviewsFrozen reviews={reviews} />',
      ],
    ],
    setup: `var RV = DS.IAReviews; var REVIEWS = [[5, 'Better than I expected', 'Came for one track and stayed for the whole set. The recording is clean all the way through.', 'Ada Fielding', '2026-08-14'], [3, 'Good, with caveats', 'The first half is excellent. The second half has a hum running under it.', 'Bo Ellery', '2026-07-02'], [4, 'Solid transfer', 'Clean audio, good notes. Would listen again.', 'Dee Okafor', '2026-05-30']].map(function (r) { return new DS.Review({ stars: r[0], reviewtitle: r[1], reviewbody: r[2], reviewer: r[3], reviewer_itemname: '@' + r[3].toLowerCase().replace(' ', '-'), reviewdate: r[4], createdate: r[4] }); });`,
    height: 700,
    column: true,
    notes:
      'The preview has no `reviewService`, so it shows reviews but cannot save one.',
  },
  {
    name: 'IATranscriptView',
    tag: 'ia-transcript-view',
    summary:
      "A scrolling transcript (`<ia-transcript-view>`) that follows playback.\nThe entry at `currentTime` is highlighted; clicking an entry fires `onTranscriptEntrySelected`. It is drawn for the player's black theater surface.",
    props:
      'className?: string; id?: string; style?: React.CSSProperties; /** The transcript, a TranscriptConfig of TranscriptEntryConfig (window.IADesignSystem). */ config?: object; /** Seconds into the track. */ currentTime?: number; /** Scrolls to follow currentTime. Default true. */ autoScroll?: boolean; selectedSearchResultIndex?: number; onTranscriptEntrySelected?: (e: CustomEvent<{ entry: object }>) => void;',
    stories: [
      [
        'Playing',
        "stage(h(TV, { style: { display: 'block', '--ia-theme-transcript-height': '200px' }, config: transcript(), currentTime: 26 }))",
        "<IATranscriptView style={{ display: 'block', '--ia-theme-transcript-height': '200px' }} config={transcript} currentTime={26} />",
      ],
    ],
    setup: `var TV = DS.IATranscriptView; function stage(el) { return h('div', { className: 'ia-inverse', style: { background: 'var(--ia-color-surface-theater)', padding: 'var(--ia-space-3)' } }, el); }${LINES}`,
    height: 300,
  },
  {
    name: 'IARadioPlayer',
    tag: 'ia-radio-player',
    summary:
      "The TV and radio archive's audio player (`<ia-radio-player>`): controls, waveform, scrubber, search and transcript together.\nIt coordinates the pieces; the audio comes from `config.audioSources` and search from a `searchHandler`. It is drawn for a black theater surface.",
    props:
      'className?: string; id?: string; style?: React.CSSProperties; /** { title, date, logoUrl, waveformUrl?, audioSources: [{ url, mimetype }], quickSearches? }. */ config?: object; /** A TranscriptConfig (window.IADesignSystem). */ transcriptConfig?: object; /** Search over the transcript, e.g. new SearchHandler(new LocalSearchBackend(new TranscriptIndex(t)), new TranscriptIndex(t)). */ searchHandler?: object; currentTime?: number; searchTerm?: string; skipMusicSections?: boolean; showMusicZones?: boolean; onPlayPauseButtonPressed?: (e: Event) => void; onSearchExecuted?: (e: CustomEvent) => void; onTranscriptEntrySelected?: (e: CustomEvent) => void;',
    stories: [
      [
        'Player',
        "stage(h(RP, { style: { display: 'block' }, config: CONFIG, transcriptConfig: TR, searchHandler: SH }))",
        '<IARadioPlayer config={config} transcriptConfig={transcript} searchHandler={searchHandler} />',
      ],
    ],
    setup: `var RP = DS.IARadioPlayer; function stage(el) { return h('div', { className: 'ia-inverse', style: { background: 'var(--ia-color-surface-theater)', padding: 'var(--ia-space-3)' } }, el); } ${WAVE}${LINES}
  function tone(seconds) { var rate = 8000, n = rate * seconds, buf = new ArrayBuffer(44 + n), v = new DataView(buf);
    function a(o, t) { for (var i = 0; i < t.length; i++) v.setUint8(o + i, t.charCodeAt(i)); }
    a(0, 'RIFF'); v.setUint32(4, 36 + n, true); a(8, 'WAVE'); a(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, rate, true); v.setUint32(28, rate, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true); a(36, 'data'); v.setUint32(40, n, true);
    for (var i = 0; i < n; i++) { var t = i / rate, f = 330 * Math.pow(2, -Math.floor(t / 1.5) % 5 / 12), env = Math.exp(-(t % 1.5) * 4); v.setUint8(44 + i, 128 + Math.round(Math.sin(2 * Math.PI * f * t) * env * 14)); }
    return URL.createObjectURL(new Blob([buf], { type: 'audio/wav' })); }
  var LOGO = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><rect width="160" height="160" rx="12" fill="#2c2c2c"/><circle cx="80" cy="80" r="46" fill="none" stroke="#fff" stroke-width="6"/><circle cx="80" cy="80" r="12" fill="#fff"/></svg>');
  var TR = transcript();
  var CONFIG = { title: 'The Early Days of Radio', date: 'Broadcast 14 March 1958', logoUrl: LOGO, waveformUrl: waveform(), audioSources: [{ url: tone(60), mimetype: 'audio/wav' }], quickSearches: ['radio', 'listeners', 'broadcast'] };
  var SH = new DS.SearchHandler(new DS.LocalSearchBackend(new DS.TranscriptIndex(TR)), new DS.TranscriptIndex(TR));`,
    height: 620,
    width: 1000,
    column: true,
    notes:
      'The preview generates a quiet one-minute tone track and draws its waveform and logo, so it plays without fetching anything.',
  },
  {
    name: 'IADonationForm',
    tag: 'ia-donation-form-controller',
    summary:
      'The donation form (`<ia-donation-form-controller>`): frequency, amount, cover-fees, payment method, then contact details.\nChoosing Credit Card or Venmo opens the contact step. On a real page the controller is given Braintree, reCAPTCHA and a `<modal-manager>`, and charges the card.',
    props:
      "className?: string; id?: string; style?: React.CSSProperties; /** Preset amounts, in dollars. Default [5, 10, 25, 50, 100, 250]. */ amountOptions?: number[]; /** Default 'multi-line'. */ amountSelectionLayout?: 'single-line' | 'multi-line'; /** One-time and monthly as buttons, a monthly checkbox, or hidden. Default 'button'. */ frequencySelectionMode?: 'button' | 'checkbox' | 'hide'; donorEmail?: string; /** Services. The preview passes window.IADesignSystem.demo.donationFormServices(). */ braintreeManager?: object; recaptchaManager?: object; modalManager?: HTMLElement; recaptchaElement?: HTMLElement; /** Real pages set these instead of braintreeManager. */ environment?: 'dev' | 'prod'; braintreeAuthToken?: string; recaptchaSiteKey?: string; onDonationInfoChanged?: (e: CustomEvent) => void; onPaymentFlowStarted?: (e: Event) => void; onPaymentFlowConfirmed?: (e: Event) => void; onPaymentFlowCancelled?: (e: Event) => void; onPaymentFlowError?: (e: Event) => void;",
    stories: [
      [
        'Default',
        'h(DF, DS.demo.donationFormServices())',
        '<IADonationForm {...window.IADesignSystem.demo.donationFormServices()} />',
      ],
      [
        'SingleLineMonthlyCheckbox',
        "h(DF, Object.assign({ amountSelectionLayout: 'single-line', frequencySelectionMode: 'checkbox' }, DS.demo.donationFormServices()))",
        '<IADonationForm amountSelectionLayout="single-line" frequencySelectionMode="checkbox" {...services} />',
      ],
    ],
    setup: `var DF = DS.IADonationForm;`,
    height: 980,
    width: 520,
    column: true,
    notes:
      "The preview runs the real form over `window.IADesignSystem.demo.donationFormServices()`: a mock Braintree manager that reports every payment method as available, a local reCAPTCHA, and a hidden `<modal-manager>`. Nothing is charged. The card number, expiry and CVV boxes are empty, because on a real page Braintree draws them as iframes. The PayPal button is the form's own stand-in, not PayPal's.\n\nThe dialogs the form opens are `IADonationUpsellModalContent`, `IADonationConfirmModal` and `IADonationErrorModalContent`, shown inside an `IAModal` in that component's previews.",
  },
  {
    name: 'IAModal',
    tag: 'ia-modal-manager-template',
    summary:
      'The archive.org dialog (`<ia-modal-manager-template>`): colored header with the logo and a title, then a headline, message, and any children.\nOn a page, dialogs open through the one `<modal-manager>` (`IAModalManager`) with `showModal({ config })`; this draws the same dialog in place, for designs.',
    props:
      "className?: string; id?: string; style?: React.CSSProperties; /** new window.IADesignSystem.ModalConfig({ title, subtitle, headline, message, headerColor, bodyColor, showProcessingIndicator, processingImageMode, showCloseButton, showLeftNavButton, leftNavButtonText, showHeaderLogo, closeOnBackdropClick }). Text fields take a string or a lit template (window.IADesignSystem.html). headerColor defaults to '#55A183'. */ config?: object; /** Extra content under the message. */ children?: React.ReactNode; onCloseButtonPressed?: (e: Event) => void; onLeftNavButtonPressed?: (e: Event) => void;",
    stories: [
      [
        'Message',
        "box(h(M, { config: new DS.ModalConfig({ title: 'Thank you', headline: 'Your request was received', message: 'We will email you when your files are ready to download.' }) }))",
        "<IAModal config={new ModalConfig({ title: 'Thank you', headline: 'Your request was received', message: 'We will email you when your files are ready to download.' })} />",
      ],
      [
        'Processing',
        "box(h(M, { config: new DS.ModalConfig({ headline: 'Processing', message: 'This can take a minute.', showProcessingIndicator: true, processingImageMode: 'processing', showCloseButton: false }) }))",
        "<IAModal config={new ModalConfig({ headline: 'Processing', message: 'This can take a minute.', showProcessingIndicator: true, processingImageMode: 'processing', showCloseButton: false })} />",
      ],
      [
        'Complete',
        "box(h(M, { config: new DS.ModalConfig({ headline: 'Complete', showProcessingIndicator: true, processingImageMode: 'complete' }) }))",
        "<IAModal config={new ModalConfig({ headline: 'Complete', showProcessingIndicator: true, processingImageMode: 'complete' })} />",
      ],
      [
        'DonationUpsell',
        "box(h(M, { config: new DS.ModalConfig({ title: 'Thank you for your gift!', headerColor: '#194880' }) }, h(DS.IADonationUpsellModalContent, { amount: 10 })))",
        "<IAModal config={new ModalConfig({ title: 'Thank you for your gift!', headerColor: '#194880' })}>\n  <IADonationUpsellModalContent amount={10} />\n</IAModal>",
      ],
      [
        'DonationConfirm',
        "box(h(M, { config: new DS.ModalConfig({ title: 'Complete donation', headerColor: '#194880' }) }, h(DS.IADonationConfirmModal, { amount: 25, donationType: 'monthly' })))",
        "<IAModal config={new ModalConfig({ title: 'Complete donation', headerColor: '#194880' })}>\n  <IADonationConfirmModal amount={25} donationType=\"monthly\" />\n</IAModal>",
      ],
      [
        'DonationError',
        "box(h(M, { config: new DS.ModalConfig({ title: 'Processing error', headerColor: '#691916', headline: 'There was an error processing your payment.' }) }, h(DS.IADonationErrorModalContent)))",
        "<IAModal config={new ModalConfig({ title: 'Processing error', headerColor: '#691916', headline: 'There was an error processing your payment.' })}>\n  <IADonationErrorModalContent />\n</IAModal>",
      ],
      [
        'OpenOnPage',
        "h(DS.IAButton, { onClick: function () { MM.showModal({ config: new DS.ModalConfig({ title: 'Hello', headline: 'Opened by modal-manager', message: 'Click outside, press Escape or use the close button.', closeOnBackdropClick: true }) }); } }, 'Open a dialog')",
        "<IAButton onClick={() => document.querySelector('modal-manager').showModal({ config: new ModalConfig({ title: 'Hello', headline: 'Opened by modal-manager' }) })}>Open a dialog</IAButton>",
      ],
    ],
    setup: `var M = DS.IAModal; var MM = DS.demo.modalManager(); function box(el) { return h('div', { style: { position: 'relative', maxInlineSize: '420px' } }, el); }`,
    height: 520,
    notes:
      '`IAModalManager` (`<modal-manager>`) is the page-level host: put one in `document.body` and call its `showModal({ config, customModalContent })`; it adds the backdrop, focus trap and Escape handling. `window.IADesignSystem.demo.modalManager()` adds a hidden one for prototypes, as the OpenOnPage example does.',
  },
  {
    name: 'IAImageViewer',
    tag: 'ia-image-viewer',
    summary:
      'A swipeable image carousel (`<ia-image-viewer>`) with previous and next arrows and a counter.\nPass `images` as `{ name, title, url }`; it fires `onImageChanged` as the viewer moves.',
    props:
      'className?: string; id?: string; style?: React.CSSProperties; /** The images, e.g. window.IADesignSystem.demo.demoImages(). */ images?: { name: string; title?: string; url: string }[]; /** Jumps to this image without animating. */ currentImageName?: string; onImageChanged?: (e: CustomEvent) => void; onImageActivated?: (e: CustomEvent) => void; onImageLoaded?: (e: CustomEvent) => void; onImageLoadFailed?: (e: CustomEvent) => void;',
    stories: [
      [
        'Gallery',
        'stage(h(IV, { style: SIZE, images: IMAGES }))',
        "<IAImageViewer style={{ display: 'block', blockSize: '360px', background: 'var(--ia-color-surface-theater)' }} images={images} />",
      ],
      [
        'Single',
        'stage(h(IV, { style: SIZE, images: IMAGES.slice(0, 1) }))',
        "<IAImageViewer style={{ display: 'block', blockSize: '360px', background: 'var(--ia-color-surface-theater)' }} images={[image]} />",
      ],
      [
        'BrokenImage',
        "stage(h(IV, { style: SIZE, images: [{ name: 'missing.jpg', title: 'Missing image', url: 'data:image/png;base64,AAAA' }].concat(IMAGES.slice(1)) }))",
        "<IAImageViewer style={{ display: 'block', blockSize: '360px', background: 'var(--ia-color-surface-theater)' }} images={[missingImage, ...images]} />",
      ],
    ],
    setup: `var IV = DS.IAImageViewer; var IMAGES = DS.demo.demoImages(); var SIZE = { display: 'block', blockSize: '100%' }; function stage(el) { return h('div', { style: { background: 'var(--ia-color-surface-theater)', blockSize: '360px' } }, el); }`,
    height: 460,
    width: 760,
    column: true,
    notes:
      "It fills the box it is given, so size it with ordinary CSS. It is drawn for a dark backdrop, like the item page's theater. The preview images are SVG placeholders from `window.IADesignSystem.demo.demoImages()`; a real page passes the item's image files.",
  },
  {
    name: 'IAItemNavigator',
    tag: 'ia-item-navigator',
    summary:
      'The item page\'s theater frame (`<ia-item-navigator>`): a drawer of menu panels beside whatever viewer the page slots in.\nIt never draws a viewer itself. Slot the viewer into `slot="main"` and an optional bar into `slot="header"`; `menuContents` supplies the panels.',
    props:
      "className?: string; id?: string; style?: React.CSSProperties; identifier?: string; /** Default 'archive.org'. */ baseHost?: string; /** Shows the viewer; until then a loading indicator stands in. */ loaded?: boolean; /** False shows the 'no preview available' placeholder. Default true. */ viewAvailable?: boolean; /** The glyph in the loading indicator, e.g. 'texts', 'video', 'audio', 'images'. */ mediatype?: string; signedIn?: boolean; /** The drawer is open. */ menuOpened?: boolean; /** Which panel is open, by its id. */ openMenu?: string; /** [{ id, label, icon, component, actionButton? }] (lit templates), e.g. window.IADesignSystem.demo.itemNavigatorMenus().menuContents. */ menuContents?: object[]; /** Icons on the closed rail. */ menuShortcuts?: object[]; /** Children with slot=\"main\", \"header\" or \"loading\". */ children?: React.ReactNode; onFullscreenToggled?: (e: CustomEvent) => void;",
    stories: [
      [
        'Theater',
        'nav({ loaded: true })',
        '<IAItemNavigator loaded identifier="demo-item" menuContents={menus.menuContents} menuShortcuts={menus.menuShortcuts}>\n  <div slot="header">…</div>\n  <div slot="main"><IAImageViewer images={images} /></div>\n</IAItemNavigator>',
      ],
      [
        'MenuOpen',
        "nav({ loaded: true, menuOpened: true, openMenu: 'viewable-files' })",
        '<IAItemNavigator loaded menuOpened openMenu="viewable-files" menuContents={menus.menuContents} menuShortcuts={menus.menuShortcuts}>…</IAItemNavigator>',
      ],
      [
        'SharePanel',
        "nav({ loaded: true, menuOpened: true, openMenu: 'share' })",
        '<IAItemNavigator loaded menuOpened openMenu="share" menuContents={menus.menuContents} menuShortcuts={menus.menuShortcuts}>…</IAItemNavigator>',
      ],
      [
        'Loading',
        "nav({ loaded: false, mediatype: 'texts' })",
        '<IAItemNavigator mediatype="texts" menuContents={menus.menuContents} menuShortcuts={menus.menuShortcuts}>…</IAItemNavigator>',
      ],
      [
        'NoTheater',
        'nav({ loaded: true, viewAvailable: false })',
        '<IAItemNavigator loaded viewAvailable={false} menuContents={menus.menuContents} menuShortcuts={menus.menuShortcuts}>…</IAItemNavigator>',
      ],
    ],
    setup: `var NAV = DS.IAItemNavigator; var MENUS = DS.demo.itemNavigatorMenus('demo-item'); var IMAGES = DS.demo.demoImages();
  function nav(p) { return h(NAV, Object.assign({ identifier: 'demo-item', style: { display: 'block', blockSize: '460px' }, menuContents: MENUS.menuContents, menuShortcuts: MENUS.menuShortcuts }, p),
    h('div', { slot: 'header', style: { display: 'flex', gap: 'var(--ia-space-3)', alignItems: 'center', padding: 'var(--ia-space-2) var(--ia-space-3)', background: 'var(--ia-color-surface-chrome)', color: 'var(--ia-color-text-inverse)', font: 'var(--ia-font-size-sm)/1.4 var(--ia-font-family-base)' } }, h('strong', null, 'Internet Archive'), h('span', null, 'A demo item')),
    h('div', { slot: 'main', style: { blockSize: '100%' } }, h(DS.IAImageViewer, { style: { display: 'block', blockSize: '100%' }, images: IMAGES }))); }`,
    height: 560,
    width: 1000,
    column: true,
    notes:
      "The preview slots an `IAImageViewer` of placeholder images where a real page puts the item's book reader, player or embed, and its menu panels list made-up files from `window.IADesignSystem.demo.itemNavigatorMenus()`. Links in the panels point at archive.org.",
  },
  {
    name: 'IABookActions',
    tag: 'ia-book-actions',
    summary:
      "The book lending bar (`<ia-book-actions>`) over the book reader: borrow for an hour or 14 days, return, the waitlist, and the loan countdown.\nWhat it offers follows `lendingStatus` and whether `userid` is set. Its dialogs open through the page's `<modal-manager>`.",
    props:
      "className?: string; id?: string; style?: React.CSSProperties; /** The signed-in user; empty shows the logged-out options. */ userid?: string; identifier?: string; bookTitle?: string; /** The lending service's status for this book, e.g. { available_to_browse, available_to_borrow, user_has_browsed, secondsLeftOnLoan, user_has_borrowed, daysLeftOnLoan, available_to_waitlist, user_on_waitlist, user_can_claim_waitlist, isPrintDisabledOnly }. */ lendingStatus?: object; /** 'action' is the lending bar; 'title' only shows the title. Default 'action'. */ barType?: 'action' | 'title'; returnUrl?: string; bwbPurchaseUrl?: string; /** The loading spinner image. */ loaderIcon?: string; /** Answers the lending posts; the preview uses window.IADesignSystem.demo.mockLendingFetchHandler. */ fetchHandler?: object; disableActionGroup?: boolean; onLendingActionError?: (e: CustomEvent) => void;",
    stories: [
      [
        'Borrowable',
        'bar({ available_to_browse: true, available_to_borrow: true })',
        '<IABookActions {...base} lendingStatus={{ available_to_browse: true, available_to_borrow: true }} />',
      ],
      [
        'ReadingOneHourLoan',
        'bar({ available_to_browse: true, user_has_browsed: true, browsingExpired: false, secondsLeftOnLoan: 3600 })',
        '<IABookActions {...base} lendingStatus={{ available_to_browse: true, user_has_browsed: true, secondsLeftOnLoan: 3600 }} />',
      ],
      [
        'ReadingFourteenDayLoan',
        'bar({ available_to_borrow: true, user_has_borrowed: true, daysLeftOnLoan: 10 })',
        '<IABookActions {...base} lendingStatus={{ available_to_borrow: true, user_has_borrowed: true, daysLeftOnLoan: 10 }} />',
      ],
      [
        'Waitlist',
        'bar({ available_to_browse: true, available_to_waitlist: true, available_lendable_copies: 0 })',
        '<IABookActions {...base} lendingStatus={{ available_to_browse: true, available_to_waitlist: true, available_lendable_copies: 0 }} />',
      ],
      [
        'OnWaitlist',
        'bar({ user_on_waitlist: true })',
        '<IABookActions {...base} lendingStatus={{ user_on_waitlist: true }} />',
      ],
      [
        'Unavailable',
        'bar({})',
        '<IABookActions {...base} lendingStatus={{}} />',
      ],
      [
        'LoggedOut',
        "bar({ available_to_browse: true, available_to_borrow: true }, { userid: '' })",
        '<IABookActions {...base} userid="" lendingStatus={{ available_to_browse: true, available_to_borrow: true }} />',
      ],
      [
        'TitleBar',
        "bar({}, { barType: 'title' })",
        '<IABookActions {...base} barType="title" />',
      ],
    ],
    setup: `var BA = DS.IABookActions; DS.demo.modalManager(); DS.demo.guardNavigation();
  var BASE = { identifier: 'demo-book', bookTitle: 'Goody Two-Shoes', userid: '@demo-reader', fetchHandler: DS.demo.mockLendingFetchHandler, loaderIcon: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' };
  function bar(status, extra) { return h(BA, Object.assign({}, BASE, { lendingStatus: status }, extra || {})); }`,
    height: 760,
    width: 1000,
    column: true,
    notes:
      "The preview answers the lending service with `window.IADesignSystem.demo.mockLendingFetchHandler`, which says yes to everything, and `demo.guardNavigation()` stops the page loads a borrow or return would start. A real page passes the book's status from the lending service and lets the element reload the reader.",
  },
  {
    name: 'IAInfiniteScroller',
    tag: 'ia-infinite-scroller',
    summary:
      'A virtualized grid (`<ia-infinite-scroller>`): it renders only the cells near the viewport, so a result list can run to thousands.\nIt has no look of its own; the cells are whatever `cellProvider.cellForIndex(i)` returns (a lit template), and collection-browser fills it with item tiles. `--infiniteScrollerCellMinWidth`, `--infiniteScrollerRowGap` and `--infiniteScrollerColGap` set the grid.',
    props:
      'className?: string; id?: string; style?: React.CSSProperties; itemCount?: number; /** { cellForIndex(index) => lit template | undefined }; undefined shows the placeholder. */ cellProvider?: object; /** A lit template shown while a cell loads. */ placeholderCellTemplate?: object; estimatedCellHeight?: number; /** Labels the grid as a landmark. */ ariaLandmarkLabel?: string; onScrollThresholdReached?: (e: Event) => void; onVisibleCellsChanged?: (e: CustomEvent) => void;',
    stories: [
      [
        'Grid',
        'scroller(0)',
        "<IAInfiniteScroller style={{ '--infiniteScrollerCellMinHeight': '200px' }} itemCount={60} estimatedCellHeight={200} cellProvider={provider} />",
      ],
      [
        'LoadingCells',
        'scroller(1500)',
        "<IAInfiniteScroller style={{ '--infiniteScrollerCellMinHeight': '200px' }} itemCount={60} estimatedCellHeight={200} cellProvider={provider} placeholderCellTemplate={placeholder} />",
      ],
    ],
    setup: `var IS = DS.IAInfiniteScroller;
  function scroller(delay) { var p = DS.demo.demoCellProvider(delay); return h('div', { style: { blockSize: '440px', overflow: 'auto' } }, h(IS, { style: { '--infiniteScrollerCellMinHeight': '200px', '--infiniteScrollerCellMinWidth': '160px' }, itemCount: 60, estimatedCellHeight: 200, cellProvider: p, placeholderCellTemplate: DS.demo.demoPlaceholderCell, ref: function (el) { if (el) p.scroller = el; } })); }`,
    height: 560,
    width: 900,
    column: true,
    notes:
      'The preview fills it with numbered item tiles from `window.IADesignSystem.demo.demoCellProvider()`. LoadingCells holds each cell back 1.5 seconds to show the placeholder.',
  },
];
