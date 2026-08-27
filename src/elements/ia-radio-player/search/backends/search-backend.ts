import type { TextRange } from '../models';

/**
 * Where the actual matching happens.
 *
 * The search handler asks a backend for the spans that matched, and knows
 * nothing about how they were found. Swapping the backend is how the player
 * moves between searching in the browser and searching against the archive.
 */
export interface SearchBackendInterface {
  getSearchRanges(query: string): Promise<TextRange[]>;
}
