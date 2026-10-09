import type { UserDetails } from './user-details';

/**
 * Extra info about the target collection that is returned for
 * the `collection_details` page type.
 */
export interface CollectionExtraInfo {
  /** How many files are within this collection (incl. its members) */
  collection_files_count?: number;

  /** Total size in bytes of this collection (incl. its members) */
  collection_size?: number;

  /** User details for each of the "Additional Contributors" to this collection */
  contributor_details?: UserDetails[];

  /** How many total views this collection has received (all-time) */
  downloads?: number;

  /** How many files are within this collection proper (not incl. its members) */
  files_count?: number;

  /** How many forum posts this collection's associated forum has */
  forum_count?: number;

  /** The identifier of the forum associated with this collection, if any */
  forum_identifier?: string;

  /** Whether the items in this collection are available to search with FTS */
  has_items_with_searchable_text?: boolean;

  /** How many members exist within this collection */
  item_count?: number;

  /** How many views this collection has received in the past month */
  month?: number;

  /** How many users have favorited this collection */
  num_favorites?: number;

  /** The primary parent collection that contains this one as a member, if any */
  primary_collection?: string | null;

  /** Full MDAPI object for this collection */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public_metadata?: Record<string, any>;

  /** Identifiers, titles, and item counts for any related collections */
  related_collection_details?: RelatedCollection[];

  /** How many reviews this collection's members have */
  review_count?: number;

  /** URL for this collection's header thumbnail image */
  thumbnail_url?: string;

  /** Additional message to appear in the page title for this collection, if any */
  title_message?: string | null;

  /** User details for the collection uploader */
  uploader_details?: UserDetails;

  /** How many views this collection has received in the past week */
  week?: number;
}

/**
 * Info about a related collection, as returned for the `collection_details`
 * page type.
 */
export interface RelatedCollection {
  identifier: string;
  title?: string;
  item_count?: number;
}
