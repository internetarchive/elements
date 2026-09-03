import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { TranscriptEntryConfig } from './models';

/**
 * One line of the transcript.
 *
 * Carries no styles of its own. Every flag reflects to an attribute so the
 * transcript view around it can style entries from a single stylesheet rather
 * than pushing styles down into each one.
 */
@customElement('ia-transcript-entry')
export class IATranscriptEntry extends LitElement {
  /** The entry to render */
  @property({ type: Object }) entry?: TranscriptEntryConfig;

  /** Whether playback is currently inside this entry */
  @property({ type: Boolean, reflect: true }) isActive = false;

  /** Whether this is the search result currently being looked at */
  @property({ type: Boolean, reflect: true }) isSelected = false;

  /** Whether clicking this entry does anything */
  @property({ type: Boolean, reflect: true }) isClickable = false;

  /** Whether this entry matched the current search */
  @property({ type: Boolean, reflect: true }) isSearchResult = false;

  /** Whether this entry is a stretch of music rather than speech */
  @property({ type: Boolean, reflect: true }) isMusicEntry = false;

  render(): TemplateResult {
    return html`${this.entry?.displayText ?? ''}`;
  }
}
