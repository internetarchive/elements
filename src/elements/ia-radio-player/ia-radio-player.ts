import {
  css,
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { msg, str } from '@lit/localize';

import type { AudioSource } from '@src/elements/ia-audio-element/models';
import type { QuickSearchEntry } from '@src/elements/ia-expandable-search-bar/models';
import { PlaybackMode } from '@src/elements/ia-playback-controls/models';
import type {
  TranscriptConfig,
  TranscriptEntryConfig,
} from '@src/elements/ia-transcript-view/models';
import type { IAAudioElement } from '@src/elements/ia-audio-element/ia-audio-element';
import type { IATranscriptView } from '@src/elements/ia-transcript-view/ia-transcript-view';
import type { ZoneOfSilence } from '@src/elements/ia-waveform-progress/models';

import type { MusicZone, RadioPlayerConfig } from './models';
import type { SearchHandlerInterface } from './search/search-handler';
import type { IASearchResultsSwitcher } from './ia-search-results-switcher';

import '@src/elements/ia-audio-element/ia-audio-element';
import '@src/elements/ia-expandable-search-bar/ia-expandable-search-bar';
import '@src/elements/ia-playback-controls/ia-playback-controls';
import '@src/elements/ia-scrubber-bar/ia-scrubber-bar';
import '@src/elements/ia-status-indicator/ia-status-indicator';
import '@src/elements/ia-transcript-view/ia-transcript-view';
import '@src/elements/ia-waveform-progress/ia-waveform-progress';
import './ia-search-results-switcher';

/**
 * Event names emitted by this component
 */
const Events = {
  CanPlay: 'canplay',
  CurrentTimeChanged: 'currentTimeChanged',
  HighlightedSearchResultChanged: 'highlightedSearchResultChanged',
  JumpBackButtonPressed: 'jumpBackButtonPressed',
  JumpForwardButtonPressed: 'jumpForwardButtonPressed',
  NextSectionButtonPressed: 'nextSectionButtonPressed',
  PlaybackPaused: 'playbackPaused',
  PlaybackRateChanged: 'playbackRateChanged',
  PlaybackStarted: 'playbackStarted',
  PlayPauseButtonPressed: 'playPauseButtonPressed',
  PrevSectionButtonPressed: 'prevSectionButtonPressed',
  SearchCleared: 'searchCleared',
  SearchExecuted: 'searchExecuted',
  SearchFailed: 'searchFailed',
  SearchTermChanged: 'searchTermChanged',
  TimeChangedFromScrub: 'timeChangedFromScrub',
  TranscriptEntrySelected: 'transcriptEntrySelected',
};

/** How far the skip buttons move, in seconds */
const SKIP_SECONDS = 10;

/** Shortest term worth searching for */
const MIN_SEARCH_LENGTH = 2;

/**
 * Nudge past a section boundary when jumping to it, so playback lands inside
 * the next section rather than exactly on its edge.
 */
const SECTION_SEEK_NUDGE = 0.1;

/**
 * A player for transcribed radio broadcasts.
 *
 * It owns no playback or search logic of its own. It wires the audio element,
 * transport controls, waveform, scrubber, search bar and transcript together,
 * and hands searching off to whatever `searchHandler` it is given.
 */
@customElement('ia-radio-player')
export class IARadioPlayer extends LitElement {
  /** What is being played, and what to show about it */
  @property({ type: Object }) config?: RadioPlayerConfig;

  /** Where searches go. Without one, the search bar does nothing. */
  @property({ type: Object }) searchHandler?: SearchHandlerInterface;

  /** The transcript to show when no search is running */
  @property({ type: Object }) transcriptConfig?: TranscriptConfig;

  /** The transcript marked up with search results, shown while searching */
  @property({ type: Object }) searchResultsTranscript?: TranscriptConfig;

  /** Playback position, in seconds */
  @property({ type: Number }) currentTime = 0;

  /** What is currently in the search bar */
  @property({ type: String }) searchTerm = '';

  /** Whether to skip past the music sections rather than play them */
  @property({ type: Boolean }) skipMusicSections = false;

  @state() private percentComplete = 0;

  @state() private isPlaying = false;

  @state() private duration = 0;

  @state() private playbackRate = 1;

  @state() private volume = 1;

  @state() private isSearching = false;

  /** Numbers each search so a stale one can be told from the current one. */
  private latestSearchId = 0;

  @query('ia-audio-element') private audioElement?: IAAudioElement | null;

  @query('ia-transcript-view') private transcriptView?: IATranscriptView | null;

  @query('ia-search-results-switcher')
  private searchResultsSwitcher?: IASearchResultsSwitcher | null;

  render(): TemplateResult {
    return html`
      ${this.audioElementTemplate}
      <section role="main">
        ${this.titleDateTemplate} ${this.collectionLogoTemplate}
        ${this.playbackControlsTemplate}
        <div class="waveform-scrubber-container">
          ${this.waveformProgressTemplate} ${this.scrubberBarTemplate}
        </div>
        ${this.searchSectionTemplate} ${this.transcriptViewTemplate}
      </section>
    `;
  }

  /** Starts playback */
  play(): void {
    this.audioElement?.play();
  }

  /** Pauses playback */
  pause(): void {
    this.audioElement?.pause();
  }

  /** Jumps to a position in the track, in seconds */
  seekTo(seconds: number): void {
    this.audioElement?.seekTo(seconds);
  }

  private get audioElementTemplate(): TemplateResult {
    return html`
      <ia-audio-element
        .sources=${this.audioSources}
        .playbackRate=${this.playbackRate}
        .volume=${this.volume}
        @timeupdate=${this.handleTimeChange}
        @durationchange=${this.handleDurationChange}
        @playbackStarted=${this.playbackStarted}
        @playbackPaused=${this.playbackPaused}
        @canplay=${this.canPlay}
      ></ia-audio-element>
    `;
  }

  private get titleDateTemplate(): TemplateResult {
    return html`
      <div class="title-date">
        <div class="title">${this.config?.title ?? ''}</div>
        <div class="date">${this.config?.date ?? ''}</div>
      </div>
    `;
  }

  private get collectionLogoTemplate(): TemplateResult | typeof nothing {
    const logoUrl = this.config?.logoUrl;
    if (!logoUrl) return nothing;

    return html`
      <img
        class="collection-logo"
        src=${logoUrl}
        alt=${msg('Collection logo')}
      />
    `;
  }

  private get playbackControlsTemplate(): TemplateResult {
    return html`
      <ia-playback-controls
        .playbackMode=${this.isPlaying
          ? PlaybackMode.playing
          : PlaybackMode.paused}
        .playbackRate=${this.playbackRate}
        .volume=${this.volume}
        @back-button-pressed=${this.handleBackButton}
        @play-pause-button-pressed=${this.handlePlayPauseButton}
        @forward-button-pressed=${this.handleForwardButton}
        @volumeChange=${this.handleVolumeChange}
        @playbackRateChange=${this.handlePlaybackRateChange}
        @next-section-button-pressed=${this.handleNextSectionButton}
        @prev-section-button-pressed=${this.handlePrevSectionButton}
      ></ia-playback-controls>
    `;
  }

  private get waveformProgressTemplate(): TemplateResult | typeof nothing {
    const waveformUrl = this.config?.waveformUrl;
    if (!waveformUrl) return nothing;

    return html`
      <ia-waveform-progress
        interactive
        .waveformUrl=${waveformUrl}
        .percentComplete=${this.percentComplete}
        .zonesOfSilence=${this.zonesOfSilence}
        @valuechange=${this.handleScrub}
      ></ia-waveform-progress>
    `;
  }

  private get scrubberBarTemplate(): TemplateResult {
    return html`
      <ia-scrubber-bar
        .sectionMarkerPercentages=${this.sectionMarkerPercentages}
        .value=${this.percentComplete}
        @valuechange=${this.handleScrub}
      ></ia-scrubber-bar>
    `;
  }

  private get transcriptViewTemplate(): TemplateResult {
    return html`
      <div class="transcript-container">
        <ia-transcript-view
          .config=${this.currentTranscript}
          .currentTime=${this.currentTime}
          @transcriptEntrySelected=${this.handleTranscriptEntrySelected}
        ></ia-transcript-view>
      </div>
    `;
  }

  private get searchSectionTemplate(): TemplateResult {
    return html`
      <div class="search-section">
        <ia-expandable-search-bar
          .searchTerm=${this.searchTerm}
          .quickSearches=${this.quickSearches}
          ?showsDisclosure=${this.quickSearches.length > 0}
          @inputchange=${this.handleSearchInput}
          @enterKeyPressed=${this.handleSearchSubmitted}
          @quickSearchSelected=${this.handleQuickSearchSelected}
          @searchCleared=${this.handleSearchCleared}
        ></ia-expandable-search-bar>

        <div class="search-results-info">
          <!--
            Always rendered, so a screen reader is already watching it by the
            time the text changes. A live region added to the page with its
            text already in place is not announced.
          -->
          <div class="sr-only" role="status">${this.searchStatusMessage}</div>

          ${this.isSearching
            ? html`<ia-status-indicator
                mode="loading"
                loadingTitle=${msg('Searching the transcript')}
              ></ia-status-indicator>`
            : this.searchOutcomeTemplate}
        </div>
      </div>
    `;
  }

  /** What to show once a search has come back: a counter, or nothing found. */
  private get searchOutcomeTemplate(): TemplateResult | typeof nothing {
    if (this.searchTerm.length === 0 || !this.searchResultsTranscript) {
      return nothing;
    }

    const resultCount = this.searchResults.length;
    if (resultCount === 0) {
      return html`
        <div class="no-search-results-message" aria-hidden="true">
          ${msg('No search results.')}
        </div>
      `;
    }

    return html`
      <ia-search-results-switcher
        .numberOfResults=${resultCount}
        @searchResultIndexChanged=${this.handleSearchResultIndexChanged}
      ></ia-search-results-switcher>
    `;
  }

  /** What the live region announces as a search runs and comes back. */
  private get searchStatusMessage(): string {
    if (this.isSearching) return msg('Searching the transcript');
    if (this.searchTerm.length === 0 || !this.searchResultsTranscript)
      return '';

    const count = this.searchResults.length;
    if (count === 0) return msg('No search results.');

    return msg(str`${count} search results`);
  }

  private get currentTranscript(): TranscriptConfig | undefined {
    return this.searchResultsTranscript ?? this.transcriptConfig;
  }

  private get transcriptEntries(): TranscriptEntryConfig[] {
    return this.currentTranscript?.entries ?? [];
  }

  private get searchResults(): TranscriptEntryConfig[] {
    return this.searchResultsTranscript?.searchResults ?? [];
  }

  private get audioSources(): AudioSource[] {
    return this.config?.audioSources ?? [];
  }

  private get quickSearches(): QuickSearchEntry[] {
    return (this.config?.quickSearches ?? []).map((displayText) => ({
      displayText,
    }));
  }

  private get musicEntries(): TranscriptEntryConfig[] {
    return this.transcriptEntries.filter((entry) => entry.isMusic);
  }

  /** The music stretches, as percentages, for marking on the waveform. */
  private get zonesOfSilence(): ZoneOfSilence[] {
    if (this.duration === 0) return [];

    return this.musicEntries.map((entry) => ({
      startPercent: (entry.start / this.duration) * 100,
      endPercent: (entry.end / this.duration) * 100,
    }));
  }

  /** The music stretches in seconds, for skipping past them. */
  private get musicZones(): MusicZone[] {
    return this.musicEntries.map((entry) => ({
      start: entry.start,
      end: entry.end,
    }));
  }

  /**
   * Every section boundary as a percentage, including the two ends.
   *
   * The section skip buttons step between these, and the scrubber draws a
   * marker at each.
   */
  private get sectionMarkerPercentages(): number[] {
    const percentages = [0];

    this.zonesOfSilence.forEach((zone) => {
      percentages.push(zone.startPercent, zone.endPercent);
    });
    percentages.push(100);

    return percentages;
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('searchResultsTranscript')) {
      this.resetSearchResultPosition();
    }

    if (changedProperties.has('searchHandler') && this.searchTerm) {
      this.executeSearch(this.searchTerm);
    }

    if (changedProperties.has('currentTime')) {
      this.dispatchEvent(
        new CustomEvent<{ currentTime: number }>(Events.CurrentTimeChanged, {
          detail: { currentTime: this.currentTime },
        }),
      );

      if (this.skipMusicSections) this.skipMusicZone();
    }
  }

  private handleTimeChange(e: CustomEvent<{ currentTime: number }>): void {
    const { currentTime } = e.detail;
    if (currentTime === undefined) return;

    this.currentTime = currentTime;
    // A duration of 0 means nothing has loaded yet, and dividing by it would
    // put NaN into the scrubber and the waveform.
    this.percentComplete =
      this.duration > 0 ? (currentTime / this.duration) * 100 : 0;
  }

  private handleDurationChange(e: CustomEvent<{ duration: number }>): void {
    const { duration } = e.detail;
    // A stream reports Infinity, and metadata that hasn't loaded reports NaN.
    if (!Number.isFinite(duration)) return;

    this.duration = duration;
  }

  private handlePlaybackRateChange(
    e: CustomEvent<{ playbackRate: number }>,
  ): void {
    const { playbackRate } = e.detail;
    if (playbackRate === undefined) return;

    this.playbackRate = playbackRate;
    this.dispatchEvent(
      new CustomEvent<{ playbackRate: number }>(Events.PlaybackRateChanged, {
        detail: { playbackRate },
      }),
    );
  }

  private handleVolumeChange(e: CustomEvent<{ volume: number }>): void {
    const { volume } = e.detail;
    if (volume === undefined) return;

    this.volume = volume;
    this.dispatchEvent(
      new CustomEvent<{ volume: number }>('volumeChanged', {
        detail: { volume },
      }),
    );
  }

  private handleBackButton(): void {
    this.audioElement?.seekBy(-SKIP_SECONDS);
    this.dispatchEvent(new Event(Events.JumpBackButtonPressed));
  }

  private handleForwardButton(): void {
    this.audioElement?.seekBy(SKIP_SECONDS);
    this.dispatchEvent(new Event(Events.JumpForwardButtonPressed));
  }

  private handlePlayPauseButton(): void {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) this.audioElement?.play();
    else this.audioElement?.pause();

    this.dispatchEvent(
      new CustomEvent<{ isPlaying: boolean }>(Events.PlayPauseButtonPressed, {
        detail: { isPlaying: this.isPlaying },
      }),
    );
  }

  private handleNextSectionButton(): void {
    const ahead = this.sectionMarkerPercentages.filter(
      (percent) => percent > this.percentComplete + SECTION_SEEK_NUDGE,
    );
    this.seekToSectionBoundary(ahead, Math.min, SECTION_SEEK_NUDGE);

    this.dispatchEvent(new Event(Events.NextSectionButtonPressed));
  }

  private handlePrevSectionButton(): void {
    const behind = this.sectionMarkerPercentages.filter(
      (percent) => percent < this.percentComplete - SECTION_SEEK_NUDGE,
    );
    this.seekToSectionBoundary(behind, Math.max, -SECTION_SEEK_NUDGE);

    this.dispatchEvent(new Event(Events.PrevSectionButtonPressed));
  }

  /**
   * Seeks to the nearest of a set of boundaries.
   *
   * Does nothing when the set is empty, since `Math.min` of nothing is
   * `Infinity` and `Math.max` of nothing is `-Infinity`, either of which would
   * be handed straight to the audio element as a position.
   */
  private seekToSectionBoundary(
    percentages: number[],
    pick: (...values: number[]) => number,
    nudge: number,
  ): void {
    if (percentages.length === 0) return;

    const boundary = pick(...percentages);
    this.audioElement?.seekTo(this.duration * (boundary / 100) + nudge);
  }

  private handleScrub(e: CustomEvent<{ value: number }>): void {
    const percentage = e.detail.value;
    if (percentage === undefined) return;

    const newTime = this.duration * (percentage / 100);
    this.currentTime = newTime;
    this.percentComplete = percentage;
    this.audioElement?.seekTo(newTime);

    this.dispatchEvent(
      new CustomEvent<{ newTime: number }>(Events.TimeChangedFromScrub, {
        detail: { newTime },
      }),
    );
  }

  private handleTranscriptEntrySelected(
    e: CustomEvent<{ entry: TranscriptEntryConfig }>,
  ): void {
    const { entry } = e.detail;
    if (!entry) return;

    this.currentTime = entry.start;
    this.audioElement?.seekTo(entry.start);
    this.audioElement?.play();

    this.dispatchEvent(
      new CustomEvent<{ newTime: number }>(Events.TranscriptEntrySelected, {
        detail: { newTime: entry.start },
      }),
    );
  }

  private handleSearchInput(e: CustomEvent<{ value: string }>): void {
    const { value } = e.detail;
    if (value === undefined) return;

    this.searchTerm = value;

    // An empty box has nothing to show results for. The counter already hides
    // itself on an empty term, so without dropping the results too the
    // transcript keeps its outlines and offers no way to step between them.
    if (value.length === 0) {
      this.searchResultsTranscript = undefined;
      // Abandons whatever is in flight, so its results can't land afterwards.
      this.latestSearchId += 1;
      this.isSearching = false;
      this.resetSearchResultPosition();
    }

    this.emitSearchTermChanged(value);
  }

  private handleSearchSubmitted(e: CustomEvent<{ value: string }>): void {
    const { value } = e.detail;
    if (!value) return;

    this.executeSearch(value);
  }

  private handleQuickSearchSelected(
    e: CustomEvent<{ quickSearchEntry: QuickSearchEntry }>,
  ): void {
    const term = e.detail.quickSearchEntry?.displayText;
    if (!term) return;

    this.emitSearchTermChanged(term);
    this.executeSearch(term);
  }

  private handleSearchCleared(): void {
    this.searchTerm = '';
    this.searchResultsTranscript = undefined;
    // Abandons whatever is in flight, so its results can't arrive after this.
    this.latestSearchId += 1;
    this.isSearching = false;

    this.dispatchEvent(new Event(Events.SearchCleared));
    this.emitSearchTermChanged('');
    this.resetSearchResultPosition();
  }

  /**
   * Runs a search and shows its results.
   *
   * Each run is numbered, and only the newest one is allowed to report back.
   * Searches go over the network, so a slow one started earlier can land after
   * a fast one started later, and without this the older results would end up
   * on screen under the newer term.
   *
   * A failed search has to put the spinner away as surely as a successful one,
   * hence the `finally`. Leaving it up would hide the search UI for as long as
   * the page lives.
   */
  private async executeSearch(term: string): Promise<void> {
    if (!this.searchHandler || term.length < MIN_SEARCH_LENGTH) {
      this.searchResultsTranscript = undefined;
      return;
    }

    this.searchTerm = term;
    this.isSearching = true;
    this.dispatchEvent(new Event(Events.SearchExecuted));

    this.latestSearchId += 1;
    const searchId = this.latestSearchId;

    try {
      const results = await this.searchHandler.search(term);
      if (searchId !== this.latestSearchId) return;

      this.searchResultsTranscript = results;
    } catch {
      if (searchId !== this.latestSearchId) return;

      this.searchResultsTranscript = undefined;
      this.dispatchEvent(new Event(Events.SearchFailed));
    } finally {
      if (searchId === this.latestSearchId) this.isSearching = false;
    }
  }

  private handleSearchResultIndexChanged(
    e: CustomEvent<{ searchResultIndex: number }>,
  ): void {
    const { searchResultIndex } = e.detail;
    if (searchResultIndex === undefined || !this.transcriptView) return;

    this.transcriptView.selectedSearchResultIndex = searchResultIndex;
    this.transcriptView.scrollToSelectedSearchResult();

    this.dispatchEvent(
      new CustomEvent<{ searchResultIndex: number }>(
        Events.HighlightedSearchResultChanged,
        { detail: { searchResultIndex } },
      ),
    );
  }

  /** Puts both the transcript and the switcher back to the first result. */
  private resetSearchResultPosition(): void {
    if (this.transcriptView) this.transcriptView.selectedSearchResultIndex = 0;
    if (this.searchResultsSwitcher) {
      this.searchResultsSwitcher.currentResultIndex = 0;
    }
  }

  private emitSearchTermChanged(searchTerm: string): void {
    this.dispatchEvent(
      new CustomEvent<{ searchTerm: string }>(Events.SearchTermChanged, {
        detail: { searchTerm },
      }),
    );
  }

  private playbackPaused(): void {
    this.isPlaying = false;
    this.dispatchEvent(new Event(Events.PlaybackPaused));
  }

  private playbackStarted(): void {
    this.isPlaying = true;
    this.dispatchEvent(new Event(Events.PlaybackStarted));
  }

  private canPlay(): void {
    this.dispatchEvent(new Event(Events.CanPlay));
  }

  /** Jumps past a music stretch if playback has wandered into one. */
  private skipMusicZone(): void {
    const activeZone = this.musicZones.find(
      (zone) => this.currentTime > zone.start && this.currentTime < zone.end,
    );
    if (!activeZone) return;

    this.audioElement?.seekTo(activeZone.end + SECTION_SEEK_NUDGE);
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --radio-player-title-color--: var(
          --ia-theme-radio-player-title-color,
          #fff
        );
        --radio-player-title-font--: var(
          --ia-theme-radio-player-title-font,
          1.5em sans-serif
        );
        --radio-player-date-color--: var(
          --ia-theme-radio-player-date-color,
          #fff
        );
        --radio-player-date-font--: var(
          --ia-theme-radio-player-date-font,
          1em sans-serif
        );
        --radio-player-logo-max-height--: var(
          --ia-theme-radio-player-logo-max-height,
          8rem
        );
        --radio-player-waveform-height--: var(
          --ia-theme-radio-player-waveform-height,
          5rem
        );
      }

      section[role='main'] {
        display: grid;
        grid-gap: 0.5rem;
      }

      ia-status-indicator {
        --ia-theme-icon-width: 1.5em;
        --ia-theme-primary-text-color: #999;

        display: block;
        margin: auto;
      }

      /* mobile view */
      @media (max-width: 770px) {
        section[role='main'] {
          grid-template-columns: 25% 1fr;
          grid-template-areas:
            'collection-logo title-date'
            'waveform-scrubber waveform-scrubber'
            'playback-controls playback-controls'
            'search-section search-section'
            'transcript-container transcript-container';
        }

        .date {
          text-align: left;
        }

        ia-transcript-view {
          --ia-theme-transcript-time-display: none;
        }

        ia-playback-controls {
          width: 75%;
          margin: auto;
        }

        .search-section {
          width: 75%;
          margin: auto;
        }
      }

      /* wide view */
      @media (min-width: 770px) {
        section[role='main'] {
          grid-template-columns: 192px 0 250px 1fr;
          grid-template-areas:
            'title-date title-date title-date title-date'
            'collection-logo . playback-controls waveform-scrubber'
            'search-section transcript-container transcript-container transcript-container';
        }

        .title-date {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        ia-transcript-view {
          --ia-theme-transcript-time-display: block;
        }
      }

      .title-date {
        grid-area: title-date;
      }

      .title {
        color: var(--radio-player-title-color--);
        font: var(--radio-player-title-font--);
      }

      .date {
        color: var(--radio-player-date-color--);
        font: var(--radio-player-date-font--);
      }

      ia-waveform-progress {
        width: 100%;
        height: var(--radio-player-waveform-height--);
      }

      ia-playback-controls {
        grid-area: playback-controls;
      }

      .transcript-container {
        grid-area: transcript-container;
      }

      ia-transcript-view {
        max-width: 600px;
        display: block;
      }

      .collection-logo {
        width: 100%;
        max-height: var(--radio-player-logo-max-height--);
        object-fit: contain;
        grid-area: collection-logo;
        align-self: center;
      }

      .waveform-scrubber-container {
        width: 100%;
        height: 100%;
        grid-area: waveform-scrubber;
      }

      .search-section {
        grid-area: search-section;
      }

      .search-results-info {
        margin-top: 0.5em;
      }

      ia-expandable-search-bar {
        display: block;
        margin: auto;
      }

      .no-search-results-message {
        text-align: center;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;
  }
}
