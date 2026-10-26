import type { ItemHit } from './item-hit';
import type { TextHit } from './text-hit';
import type { FavoritedSearchHit } from './favorited-search-hit';
import { WebArchiveHit } from './web-archive-hit';
import type { TvClipHit } from './tv-clip-hit';

/**
 * Union of the different hit_type values returned by the PPS.
 * There will probably be more of these.
 */
export type HitType =
  | 'item'
  | 'text'
  | 'asr_text'
  | 'favorited_search'
  | 'web_archive'
  | 'tv_clip';

/**
 * Additional information provided by the PPS about hits, separately from
 * their fields map.
 */
interface HitInfo {
  hit_type?: HitType;
  index?: string;
  service_backend?: string;
}

/**
 * Type that includes all the fields present on any type of hit
 */
type AllHitFields = ItemHit &
  TextHit &
  FavoritedSearchHit &
  WebArchiveHit &
  TvClipHit;

/**
 * Result is an expansive type definition encompassing all the optional
 * and required properties that may occur on any type of search result
 * ('hit') returned by the various search backends. (Most metadata
 * properties are optional anyway).
 */
export type SearchResult = Partial<AllHitFields> & HitInfo;
