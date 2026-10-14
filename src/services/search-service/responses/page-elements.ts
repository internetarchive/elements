import { Review } from '../../item-metadata/item-metadata';
import { Aggregation } from '../models/aggregation';
import { Memoize } from 'typescript-memoize';
import { CollectionExtraInfo } from './collection-extra-info';

/**
 * The structure of the response body `hits` object returned from the PPS endpoint.
 */
export interface SearchResponseHits {
  total: number;
  returned: number;
  hits: Record<string, unknown>[];
}

export type FederatedServiceName =
  | 'service___fts'
  | 'service___tvs'
  | 'service___rcs'
  | 'service___whisper';

export type FederatedMediatypeName =
  | 'metadata___mediatype___texts'
  | 'metadata___mediatype___movies'
  | 'metadata___mediatype___audio'
  | 'metadata___mediatype___software'
  | 'metadata___mediatype___image'
  | 'metadata___mediatype___etree';

export type FederatedPageElementName =
  | FederatedServiceName
  | FederatedMediatypeName;

/**
 * Valid page element names recognized & returned by the PPS
 */
export type PageElementName =
  | 'uploads'
  | 'favorites'
  | 'reviews'
  | 'collections'
  | 'lending'
  | 'web_archives'
  | 'forum_posts'
  | FederatedPageElementName;

/**
 * A basic page element returning hits and/or aggregations
 */
interface HitsAggregationsPageElement {
  hits?: SearchResponseHits;
  aggregations?: Record<string, Aggregation>;
  collection_extra_info?: CollectionExtraInfo;
}

/**
 * A single entry in a user's web archives, representing one or more captures for
 * a given URL.
 */
export interface WebArchiveEntry {
  url: string;
  captures: string[];
}

/**
 * An object representing a single forum post
 */
export interface ForumPost {
  id: number;
  subject: string;
  subject_href: string;
  poster: string;
  poster_href: string;
  forum: string;
  forum_href: string;
  replies: number;
  date: string;
}

export type ReviewerAccountStatus = 'ok' | 'locked' | 'unknown';

export class SearchReview extends Review {
  get reviewer_account_status(): ReviewerAccountStatus | undefined {
    return this.account_status?.status;
  }

  get reviewer_account_status_reason(): string | undefined {
    return this.account_status?.reason;
  }

  get __href__(): string | undefined {
    return this.rawValue.__href__;
  }

  /**
   * Parses the raw reviewer_account_status string into a structured object
   *
   * Examples of raw strings:
   * - "ok"
   * - "locked__darked"
   * - "unknown__account_not_found__by_itemname"
   */
  @Memoize() private get account_status():
    | {
        status: ReviewerAccountStatus;
        reason?: string;
      }
    | undefined {
    const rawStatus = this.rawValue.reviewer_account_status;
    if (!rawStatus) return undefined;

    let status: ReviewerAccountStatus = 'unknown';
    let reason: string | undefined;

    if (rawStatus.startsWith('ok')) {
      status = 'ok';
    }

    if (rawStatus.startsWith('locked')) {
      status = 'locked';
    }

    const reasonParts = rawStatus.split('__');
    if (reasonParts.length > 1) {
      reason = reasonParts.slice(1).join('__');
    }

    return { status, reason };
  }
}

export type UploadsPageElement = HitsAggregationsPageElement;
export type FavoritesPageElement = HitsAggregationsPageElement;
export type ReviewsPageElement = HitsAggregationsPageElement;
export type CollectionsPageElement = HitsAggregationsPageElement;
export type FederatedPageElement = HitsAggregationsPageElement;

export const LENDING_SUB_ELEMENTS = [
  'loans',
  'waitlist',
  'loan_history',
] as const;
export type LendingSubElement = (typeof LENDING_SUB_ELEMENTS)[number];
export type LendingPageElement = Record<
  LendingSubElement,
  Record<string, unknown>[]
>;

export type WebArchivesPageElement = WebArchiveEntry[];
export type ForumPostsPageElement = ForumPost[];

export type PageElement =
  | UploadsPageElement
  | FavoritesPageElement
  | ReviewsPageElement
  | CollectionsPageElement
  | LendingPageElement
  | WebArchivesPageElement
  | ForumPostsPageElement
  | FederatedPageElement;

/**
 * A map containing one or more page elements returned by the PPS, keyed by the
 * name of the element.
 */
export interface PageElementMap
  extends Partial<Record<PageElementName, PageElement>> {
  uploads?: UploadsPageElement;
  favorites?: FavoritesPageElement;
  reviews?: ReviewsPageElement;
  collections?: CollectionsPageElement;
  lending?: LendingPageElement;
  web_archives?: WebArchivesPageElement;
  forum_posts?: ForumPostsPageElement;
  service___fts?: FederatedPageElement;
  service___tvs?: FederatedPageElement;
  service___rcs?: FederatedPageElement;
  service___whisper?: FederatedPageElement;
  metadata___mediatype___texts?: FederatedPageElement;
  metadata___mediatype___movies?: FederatedPageElement;
  metadata___mediatype___audio?: FederatedPageElement;
  metadata___mediatype___software?: FederatedPageElement;
  metadata___mediatype___image?: FederatedPageElement;
  metadata___mediatype___etree?: FederatedPageElement;
}

/**
 * Converts dates from web capture "YYYYMMDDhhmmss" format to ISO-8601 "YYYY-MM-DDThh:mm:ssZ" format.
 */
function fixWebCaptureDateFormatting(date: string): string {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const hour = date.slice(8, 10);
  const minute = date.slice(10, 12);
  const second = date.slice(12, 14);
  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}

/**
 * Converts an array of web archive entries to an array of objects compatible with the search hit constructors
 */
export function convertWebArchivesToSearchHits(
  pageElement: WebArchivesPageElement,
): Record<string, unknown>[] {
  const results: Record<string, unknown>[] = [];

  for (const entry of pageElement) {
    if (!entry.captures?.length) continue;

    // url must not be percent-encoded — Wayback Machine matches on the raw URL
    const href = `https://web.archive.org/web/${entry.captures[0]}/${entry.url}`;
    results.push({
      hit_type: 'web_archive',
      fields: {
        url: entry.url,
        capture_dates: entry.captures.map((date) =>
          fixWebCaptureDateFormatting(date),
        ),
        __href__: href,
      },
    });
  }

  return results;
}
