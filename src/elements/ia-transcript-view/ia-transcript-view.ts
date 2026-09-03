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
import { ifDefined } from 'lit/directives/if-defined.js';
import { msg } from '@lit/localize';

import { formatDuration } from './duration-formatter';
import type { TranscriptConfig, TranscriptEntryConfig } from './models';
import type { IATranscriptEntry } from './ia-transcript-entry';

import './ia-transcript-entry';

/**
 * Event names emitted by this component
 */
const Events = {
  TranscriptEntrySelected: 'transcriptEntrySelected',
  CurrentEntriesUpdated: 'currentEntriesUpdated',
  AutoScrollChanged: 'autoScrollChanged',
};

/** How long a scroll animation runs, in seconds */
const SCROLL_DURATION_SECONDS = 1;

/**
 * A scrolling transcript that follows playback.
 *
 * It keeps itself scrolled to whatever is being spoken, steps aside when the
 * listener scrolls by hand, and picks the job back up once they've stopped.
 */
@customElement('ia-transcript-view')
export class IATranscriptView extends LitElement {
  /** The transcript to render */
  @property({ type: Object }) config?: TranscriptConfig;

  /** Playback position, in seconds into the track */
  @property({ type: Number }) currentTime = 0;

  /** How much room to leave above the entry being spoken, in pixels */
  @property({ type: Number }) topContextHeight = 50;

  /** How much room to leave below the entry being spoken, in pixels */
  @property({ type: Number }) bottomContextHeight = 50;

  /** Whether the transcript follows playback */
  @property({ type: Boolean }) autoScroll = true;

  /** Which search result is currently being looked at */
  @property({ type: Number }) selectedSearchResultIndex = 0;

  /** Whether to outline the context zones, for working on the scrolling */
  @property({ type: Boolean }) showContextZones = false;

  /** How long to wait after a manual scroll before following playback again */
  @property({ type: Number }) scrollTimerDelay = 15000;

  @state() private timeScrollTop = 0;

  @state() private currentEntries: TranscriptEntryConfig[] = [];

  @query('#scroll-container') private scrollView?: HTMLElement | null;

  private scrollResumeTimerId?: ReturnType<typeof setTimeout>;

  private scrollAnimationId?: number;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.scrollResumeTimerId);
    this.cancelScrollAnimation();
  }

  render(): TemplateResult {
    return html`
      <div class="container">
        ${this.showContextZones ? this.contextZoneTemplates : nothing}

        <div
          class="scroll-container"
          id="scroll-container"
          @wheel=${this.didScroll}
          @touchmove=${this.didScroll}
        >
          <div class="col time">${this.timeDisplayTemplate}</div>

          <div class="col">
            ${this.autoScrollButtonTemplate}
            ${this.transcriptEntries.map((entry) =>
              this.transcriptEntryTemplate(entry),
            )}
          </div>
        </div>
      </div>
    `;
  }

  /** Scrolls the selected search result into view. */
  scrollToSelectedSearchResult(): void {
    const { selectedSearchResult } = this;
    if (!selectedSearchResult) return;

    this.autoScroll = false;
    this.scrollToElement(selectedSearchResult);
  }

  /** The id of the entry starting closest to a given time, if there is one. */
  entryIdentifierClosestToTime(time: number): number | null {
    const entries = this.transcriptEntries;
    if (entries.length === 0) return null;

    let closest = entries[0];
    let smallestDelta = Math.abs(time - closest.start);

    for (const entry of entries) {
      const delta = Math.abs(time - entry.start);
      if (delta < smallestDelta) {
        smallestDelta = delta;
        closest = entry;
      }
    }

    return closest.id;
  }

  private get autoScrollButtonTemplate(): TemplateResult {
    return html`
      <button
        class="auto-scroll-button ${this.autoScroll ? 'hidden' : ''}"
        @click=${this.enableAutoScroll}
      >
        ${msg('Scroll text with audio')}
      </button>
    `;
  }

  private get timeDisplayTemplate(): TemplateResult {
    return html`
      <div class="time-display" style="top: ${this.timeScrollTop}px">
        ${formatDuration(this.currentTime)}
      </div>
    `;
  }

  private transcriptEntryTemplate(
    entry: TranscriptEntryConfig,
  ): TemplateResult {
    const isActive = this.currentEntries.some(
      (currentEntry) => currentEntry.id === entry.id,
    );

    return html`
      <ia-transcript-entry
        .entry=${entry}
        ?isActive=${isActive}
        ?isSelected=${entry.searchMatchIndex === this.selectedSearchResultIndex}
        ?isSearchResult=${entry.searchMatchIndex !== undefined}
        ?isMusicEntry=${entry.isMusic}
        isClickable
        data-search-result-index=${ifDefined(entry.searchMatchIndex)}
        data-identifier=${entry.id}
        @click=${this.transcriptEntrySelected}
      ></ia-transcript-entry>
    `;
  }

  private get contextZoneTemplates(): TemplateResult {
    return html`
      <div
        class="top context-overlay"
        style="height: ${this.topContextHeight}px"
      ></div>
      <div
        class="bottom context-overlay"
        style="height: ${this.bottomContextHeight}px"
      ></div>
    `;
  }

  private get transcriptEntries(): TranscriptEntryConfig[] {
    return this.config?.entries ?? [];
  }

  updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('currentTime')) this.handleCurrentTimeChange();
    if (changedProperties.has('selectedSearchResultIndex')) {
      this.scrollToSelectedSearchResult();
    }
    if (changedProperties.has('currentEntries')) {
      this.scrollToClosestEntry();
      this.updateTimePosition();
    }
    if (changedProperties.has('autoScroll')) {
      this.dispatchEvent(
        new CustomEvent<{ autoScroll: boolean }>(Events.AutoScrollChanged, {
          detail: { autoScroll: this.autoScroll },
        }),
      );
    }
    if (changedProperties.has('config')) {
      this.selectedSearchResultIndex = 0;
      this.scrollToSelectedSearchResult();
    }
  }

  private transcriptEntrySelected(e: Event): void {
    const { entry } = e.currentTarget as IATranscriptEntry;
    if (!entry) return;

    this.dispatchEvent(
      new CustomEvent<{ entry: TranscriptEntryConfig }>(
        Events.TranscriptEntrySelected,
        { detail: { entry } },
      ),
    );

    if (entry.searchMatchIndex !== undefined) {
      this.selectedSearchResultIndex = entry.searchMatchIndex;
    }
    this.autoScroll = false;
  }

  /**
   * Works out which entries are being spoken now.
   *
   * Runs on every time update, several times a second, so it only touches the
   * rendered state when the set of entries has actually changed.
   */
  private handleCurrentTimeChange(): void {
    const entries = this.transcriptEntries;
    if (entries.length === 0) return;

    const activeEntries = entries.filter(
      (entry) =>
        this.currentTime >= entry.start && this.currentTime <= entry.end,
    );

    if (IATranscriptView.entryArraysMatch(activeEntries, this.currentEntries)) {
      return;
    }

    this.dispatchEvent(new Event(Events.CurrentEntriesUpdated));
    this.currentEntries = activeEntries;
  }

  private static entryArraysMatch(
    a: TranscriptEntryConfig[],
    b: TranscriptEntryConfig[],
  ): boolean {
    if (a.length !== b.length) return false;

    const aIds = a.map((entry) => entry.id).sort((x, y) => x - y);
    const bIds = b.map((entry) => entry.id).sort((x, y) => x - y);

    return aIds.every((id, index) => bIds[index] === id);
  }

  private elementClosestToTime(time: number): HTMLElement | null {
    const closestIdentifier = this.entryIdentifierClosestToTime(time);
    // Compared against null rather than tested for truthiness, so an entry
    // whose id is 0 is still found.
    if (closestIdentifier === null) return null;

    return this.elementForIdentifier(closestIdentifier);
  }

  private elementForIdentifier(identifier: number): HTMLElement | null {
    return (
      this.shadowRoot?.querySelector(
        `ia-transcript-entry[data-identifier="${identifier}"]`,
      ) ?? null
    );
  }

  /**
   * Steps auto-scroll aside when the listener scrolls by hand, and arranges to
   * pick it back up once they've left it alone for a while.
   */
  private didScroll(): void {
    this.autoScroll = false;

    clearTimeout(this.scrollResumeTimerId);
    this.scrollResumeTimerId = setTimeout(() => {
      this.autoScroll = true;
    }, this.scrollTimerDelay);
  }

  private enableAutoScroll(): void {
    this.autoScroll = true;
    this.scrollToClosestEntry();
  }

  private get activeTranscriptEntry(): HTMLElement | null {
    return (
      this.shadowRoot?.querySelector('ia-transcript-entry[isActive]') ?? null
    );
  }

  private get selectedSearchResult(): HTMLElement | null {
    return (
      this.shadowRoot?.querySelector(
        `ia-transcript-entry[data-search-result-index="${this.selectedSearchResultIndex}"]`,
      ) ?? null
    );
  }

  private get closestEntryToCurrentTime(): HTMLElement | null {
    return (
      this.activeTranscriptEntry ?? this.elementClosestToTime(this.currentTime)
    );
  }

  private scrollToClosestEntry(): void {
    if (!this.autoScroll) return;

    const closestEntry = this.closestEntryToCurrentTime;
    if (closestEntry) this.scrollToElement(closestEntry);
  }

  /**
   * Scrolls an entry to the top of the focus area, if it isn't in there
   * already.
   */
  private scrollToElement(element: HTMLElement): void {
    const { scrollView } = this;
    if (!scrollView) return;

    const containerRect = scrollView.getBoundingClientRect();
    const entryRect = element.getBoundingClientRect();
    const focusBottom = containerRect.height - this.bottomContextHeight;

    const isBelowFocusArea = entryRect.bottom > containerRect.top + focusBottom;
    const isAboveFocusArea = entryRect.top < containerRect.top;
    if (!isBelowFocusArea && !isAboveFocusArea) return;

    this.scrollToOffset(
      entryRect.top -
        containerRect.top +
        scrollView.scrollTop -
        this.topContextHeight,
    );
  }

  private updateTimePosition(): void {
    const scrollToEntry = this.closestEntryToCurrentTime;
    if (!scrollToEntry) return;

    const parent = scrollToEntry.parentNode as HTMLElement | null;
    if (!parent) return;

    this.timeScrollTop =
      scrollToEntry.getBoundingClientRect().top -
      parent.getBoundingClientRect().top;
  }

  /**
   * Eases the scroll container to an offset.
   *
   * Only one animation runs at a time: playback ticks arrive faster than an
   * animation finishes, and two loops writing `scrollTop` fight each other.
   */
  private scrollToOffset(offset: number): void {
    const { scrollView } = this;
    if (!scrollView) return;

    this.cancelScrollAnimation();

    const start = scrollView.scrollTop;
    const change = offset - start;
    const startTime = performance.now();

    const easeInOutQuad = (time: number): number =>
      time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;

    const animate = (): void => {
      const elapsed = (performance.now() - startTime) / 1000;
      // Clamped so the last frame lands exactly on the target rather than
      // overshooting past it.
      const progress = Math.min(elapsed / SCROLL_DURATION_SECONDS, 1);

      scrollView.scrollTop = start + change * easeInOutQuad(progress);

      if (progress < 1) {
        this.scrollAnimationId = requestAnimationFrame(animate);
      } else {
        this.scrollAnimationId = undefined;
      }
    };

    animate();
  }

  private cancelScrollAnimation(): void {
    if (this.scrollAnimationId === undefined) return;

    cancelAnimationFrame(this.scrollAnimationId);
    this.scrollAnimationId = undefined;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --transcript-height--: var(--ia-theme-transcript-height, 200px);

        --transcript-normal-text-color--: var(
          --ia-theme-transcript-normal-text-color,
          gray
        );
        --transcript-active-text-color--: var(
          --ia-theme-transcript-active-text-color,
          white
        );
        --transcript-hover-text-color--: var(
          --ia-theme-transcript-hover-text-color,
          silver
        );

        --transcript-music-normal-text-color--: var(
          --ia-theme-transcript-music-normal-text-color,
          gray
        );
        --transcript-music-active-text-color--: var(
          --ia-theme-transcript-music-active-text-color,
          white
        );
        --transcript-music-hover-text-color--: var(
          --ia-theme-transcript-music-hover-text-color,
          silver
        );

        --transcript-search-result-inactive-border-color--: var(
          --ia-theme-transcript-search-result-inactive-border-color,
          gray
        );
        --transcript-search-result-active-border-color--: var(
          --ia-theme-transcript-search-result-active-border-color,
          green
        );

        --transcript-time-color--: var(--ia-theme-transcript-time-color, white);
        --transcript-time-column-width--: var(
          --ia-theme-transcript-time-column-width,
          3rem
        );
        --transcript-time-font-size--: var(
          --ia-theme-transcript-time-font-size,
          1em
        );
        --transcript-time-line-height--: var(
          --ia-theme-transcript-time-line-height,
          1em
        );
        --transcript-time-display--: var(
          --ia-theme-transcript-time-display,
          block
        );

        --transcript-auto-scroll-button-color--: var(
          --ia-theme-transcript-auto-scroll-button-color,
          black
        );
        --transcript-auto-scroll-button-background--: var(
          --ia-theme-transcript-auto-scroll-button-background,
          white
        );
        --transcript-auto-scroll-button-width--: var(
          --ia-theme-transcript-auto-scroll-button-width,
          12rem
        );
        --transcript-auto-scroll-button-font-size--: var(
          --ia-theme-transcript-auto-scroll-button-font-size,
          1em
        );

        color: var(--transcript-normal-text-color--);
      }

      .container {
        position: relative;
      }

      .auto-scroll-button {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 1rem;
        margin: auto;
        width: var(--transcript-auto-scroll-button-width--);
        border-radius: 1em;
        border: 0;
        display: inline-block;
        color: var(--transcript-auto-scroll-button-color--);
        background-color: var(--transcript-auto-scroll-button-background--);
        font-size: var(--transcript-auto-scroll-button-font-size--);
        cursor: pointer;
        z-index: 10;
      }

      .auto-scroll-button.hidden {
        display: none;
      }

      .context-overlay {
        position: absolute;
        left: 0;
        width: 100%;
        height: 0;
        /* Purely a guide. It sits over the top and bottom of the scroll area,
           so without this it would swallow the wheel and the entry clicks
           there, breaking the scrolling it exists to help you look at. */
        pointer-events: none;
      }

      .context-overlay.top {
        top: 0;
        border-bottom: 1px solid green;
      }

      .context-overlay.bottom {
        bottom: 0;
        border-top: 1px solid green;
      }

      .time {
        display: var(--transcript-time-display--);
        flex: 0 0 var(--transcript-time-column-width--);
        color: var(--transcript-time-color--);
        position: relative;
      }

      .time-display {
        position: absolute;
        top: 0;
        font-size: var(--transcript-time-font-size--);
        line-height: var(--transcript-time-line-height--);
        transition: top 1s;
      }

      .scroll-container {
        display: flex;
        overflow-y: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
        height: var(--transcript-height--);
      }

      .scroll-container::-webkit-scrollbar {
        display: none;
      }

      ia-transcript-entry {
        cursor: pointer;
      }

      ia-transcript-entry:hover {
        color: var(--transcript-hover-text-color--);
      }

      ia-transcript-entry[ismusicentry] {
        color: var(--transcript-music-normal-text-color--);
        display: block;
        font-style: italic;
      }

      ia-transcript-entry[ismusicentry]:hover {
        color: var(--transcript-music-hover-text-color--);
      }

      ia-transcript-entry[ismusicentry][isactive] {
        color: var(--transcript-music-active-text-color--);
      }

      ia-transcript-entry[isactive] {
        color: var(--transcript-active-text-color--);
      }

      ia-transcript-entry[issearchresult] {
        /* Inline-block, or the outline adds a space to the right of the text */
        display: inline-block;
        padding: 0 5px;
        position: relative;
      }

      ia-transcript-entry[issearchresult]:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 2px solid
          var(--transcript-search-result-inactive-border-color--);
        border-radius: 5px;
      }

      ia-transcript-entry[issearchresult][isselected]:after {
        border: 2px solid var(--transcript-search-result-active-border-color--);
      }
    `;
  }
}
