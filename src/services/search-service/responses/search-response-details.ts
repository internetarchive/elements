/* eslint-disable @typescript-eslint/no-explicit-any */
import { Aggregation } from '../models/aggregation';
import { SearchResult, HitType } from '../models/hit-types/hit';
import { ItemHit } from '../models/hit-types/item-hit';
import { TextHit } from '../models/hit-types/text-hit';
import { FavoritedSearchHit } from '../models/hit-types/favorited-search-hit';
import { WebArchiveHit } from '../models/hit-types/web-archive-hit';
import { TvClipHit } from '../models/hit-types/tv-clip-hit';
import { CollectionExtraInfo } from './collection-extra-info';
import type { SearchHitSchema } from './search-hit-schema';
import { AccountExtraInfo } from './account-extra-info';
import {
  LendingPageElement,
  PageElementMap,
  SearchResponseHits,
  convertWebArchivesToSearchHits,
  LENDING_SUB_ELEMENTS,
  WebArchivesPageElement,
  FederatedPageElementName,
} from './page-elements';
import { ExtraInfo } from './extra-info';

/**
 * The structure of the response body returned from the PPS endpoint.
 */
export interface SearchResponseBody {
  hits?: SearchResponseHits;
  aggregations?: Record<string, Aggregation>;
  collection_titles?: Record<string, string>;
  tv_channel_aliases?: Record<string, string>;
  collection_extra_info?: CollectionExtraInfo;
  account_extra_info?: AccountExtraInfo;
  page_elements?: PageElementMap;
  extra_info?: Record<string, any>;
}

/**
 * The structure of the optional federated results to be added to the results
 */
export interface FederatedResults {
  [key: string]: SearchResult[];
}

/**
 * This is the search response details inside the SearchResponse object that contains
 * the search results, under the `results` key.
 *
 * @export
 */
export interface SearchResponseDetailsInterface {
  /**
   * Total number of results found
   */
  totalResults: number;

  /**
   * Number of returned hits in this response
   */
  returnedCount: number;

  /**
   * The array of search results
   */
  results: SearchResult[];

  /**
   * The array of federated search results
   */
  federatedResults?: FederatedResults;

  /**
   * Requested aggregations such as facets or histogram data
   *
   * @type {Record<string, Aggregation>}
   * @memberof SearchResponseDetails
   */
  aggregations?: Record<string, Aggregation>;

  /**
   * A map from collection identifiers (those present on the hits/aggregations)
   * to their titles.
   */
  collectionTitles?: Record<string, string>;

  /**
   * A map from TV channel names (creators) to their network names.
   */
  tvChannelAliases?: Record<string, string>;

  /**
   * Extra info about the target collection, returned when the page type is
   * `collection_details`.
   */
  collectionExtraInfo?: CollectionExtraInfo;

  /**
   * Extra info about the target account, returned when the page type is
   * `account_details`.
   */
  accountExtraInfo?: AccountExtraInfo;

  /**
   * Extra info about the target item, returned when the page type is
   * `item_details`.
   */
  extraInfo?: ExtraInfo | null;

  /**
   * Specific page elements requested from the PPS will be present in this map
   */
  pageElements?: PageElementMap;

  /**
   * The hit schema for this response
   */
  schema?: SearchHitSchema;

  /**
   * The hit type from the schema for this resopnse
   */
  schemaHitType?: HitType;
}

/**
 * Implementation for search response details, converting raw response bodies
 * into a more consistent set of properties & types.
 */
export class SearchResponseDetails implements SearchResponseDetailsInterface {
  /**
   * @inheritdoc
   */
  totalResults: number;

  /**
   * @inheritdoc
   */
  returnedCount: number;

  /**
   * @inheritdoc
   */
  results: SearchResult[];

  /**
   * @inheritdoc
   */
  federatedResults?: FederatedResults;

  /**
   * @inheritdoc
   */
  aggregations?: Record<string, Aggregation>;

  /**
   * @inheritdoc
   */
  collectionTitles?: Record<string, string>;

  /**
   * @inheritdoc
   */
  tvChannelAliases?: Record<string, string>;

  /**
   * @inheritdoc
   */
  collectionExtraInfo?: CollectionExtraInfo;

  /**
   * @inheritdoc
   */
  accountExtraInfo?: AccountExtraInfo;

  /**
   * @inheritdoc
   */
  extraInfo?: ExtraInfo | null = null;

  /**
   * @inheritdoc
   */
  pageElements?: PageElementMap;

  /**
   * @inheritdoc
   */
  schema?: SearchHitSchema;

  /**
   * @inheritdoc
   */
  schemaHitType?: HitType;

  constructor(body: SearchResponseBody, schema: SearchHitSchema) {
    this.schema = schema;
    this.schemaHitType = schema?.hit_type;

    let firstPageElement;
    if (body?.page_elements) {
      this.pageElements = body.page_elements;
      firstPageElement = Object.values(this.pageElements)[0];
    }

    // Use hits directly from the body if available.
    // Otherwise, try extracting them from the first page_element
    let hits = body?.hits?.hits;
    this.totalResults = body?.hits?.total ?? 0;
    this.returnedCount = body?.hits?.returned ?? 0;

    // If page elements include services i.e. fts,
    // this indicates a federated search,
    // so we should trigger the fed search results handler
    if (!hits?.length && this.pageElements?.service___fts) {
      this.totalResults = 0;
      this.returnedCount = 0;

      this.handleFederatedPageElements();
    } else if (!hits?.length && firstPageElement?.hits?.hits) {
      hits = firstPageElement.hits.hits;

      this.totalResults = firstPageElement.hits.total ?? 0;
      this.returnedCount = firstPageElement.hits.returned ?? 0;
    } else if (this.pageElements?.lending) {
      hits = this.handleLendingPageElement();
    } else if (this.pageElements?.web_archives) {
      hits = this.handleWebArchivesPageElement();
    }

    this.results = this.formatHits(hits);

    // Use aggregations directly from the body if available.
    // Otherwise, try extracting them from the first page_element.
    let aggregations = body?.aggregations;
    const bodyHasAggregations =
      this.aggregations && Object.keys(this.aggregations).length > 0;

    if (!bodyHasAggregations && firstPageElement?.aggregations) {
      aggregations = firstPageElement.aggregations;
    }

    // Construct Aggregation objects
    if (aggregations) {
      this.buildAggregations(aggregations);
    }

    if (body?.collection_titles) {
      this.collectionTitles = body.collection_titles ?? {};
    }

    if (body?.tv_channel_aliases) {
      this.tvChannelAliases = body.tv_channel_aliases ?? {};
    }

    if (body?.collection_extra_info) {
      this.collectionExtraInfo = body.collection_extra_info ?? null;
    }

    if (body?.account_extra_info) {
      this.accountExtraInfo = body.account_extra_info ?? null;
    }

    if (body?.extra_info) {
      this.extraInfo = new ExtraInfo(body.extra_info);
    }
  }

  /**
   * Constructs correctly typed search results objects from raw hits.
   *
   * @param hits An array of raw hits data from the PPS
   * @returns An array of correctly-typed hits given each hit type
   */
  private formatHits(hits?: SearchResult[]) {
    return (
      hits?.map((hit: SearchResult) =>
        SearchResponseDetails.createResult(
          hit.hit_type ?? (this.schemaHitType as HitType),
          hit,
        ),
      ) ?? []
    );
  }

  /**
   * Constructs Aggregation objects from raw aggregations data and applies them
   * to this instance's aggregations property.
   * @param aggregations The raw aggregations data from the PPS
   */
  private buildAggregations(aggregations: Record<string, Aggregation>): void {
    this.aggregations = Object.entries(aggregations).reduce(
      (acc, [key, val]) => {
        acc[key] = new Aggregation(val);
        return acc;
      },
      {} as Record<string, Aggregation>,
    );
  }

  /**
   * Special handling for when the 'lending' page element is present on the response.
   * @returns An array of raw hits representing current loans.
   */
  private handleLendingPageElement(): Record<string, unknown>[] {
    const pageElements = this.pageElements?.lending as LendingPageElement;
    const hits = pageElements.loans ?? [];
    this.totalResults = hits.length;
    this.returnedCount = this.totalResults;

    // For loans, we also need to build hit models for each sub-element
    for (const subElement of LENDING_SUB_ELEMENTS) {
      pageElements[subElement] = this.formatHits(
        pageElements[subElement],
      ) as Record<string, unknown>[];
    }

    return hits;
  }

  /**
   * Special handling for when the 'web_archives' page element is present on the response.
   * @returns An array of raw hits representing the web archive results.
   */
  private handleWebArchivesPageElement(): Record<string, unknown>[] {
    const hits = convertWebArchivesToSearchHits(
      this.pageElements?.web_archives as WebArchivesPageElement,
    );
    this.totalResults = hits.length;
    this.returnedCount = this.totalResults;
    return hits;
  }

  /**
   * Special handling for when the federated search elements are present in the response.
   * Formats all non-metadata hits to a new federatedResults object in the results.
   */
  private handleFederatedPageElements(): void {
    const FEDERATED_PAGE_ELEMENTS: FederatedPageElementName[] = [
      'service___fts',
      'service___tvs',
      'service___rcs',
      'service___whisper',
      'metadata___mediatype___texts',
      'metadata___mediatype___movies',
      'metadata___mediatype___audio',
      'metadata___mediatype___software',
      'metadata___mediatype___image',
      'metadata___mediatype___etree',
    ];

    for (const element of FEDERATED_PAGE_ELEMENTS) {
      const simpleElementName: string = this.removePageElementPrefix(element);

      // Add service name to federated results section.
      // Create section if not already created.
      if (this.federatedResults) {
        this.federatedResults[element] = [];
      } else {
        this.federatedResults = { [simpleElementName]: [] };
      }

      // Add hits to service
      const pageElementHits = this.pageElements?.[element]?.hits;
      if (pageElementHits?.hits) {
        this.federatedResults[simpleElementName] = this.formatHits(
          pageElementHits?.hits,
        );
      }

      // Update totals with counts from this service
      this.totalResults += pageElementHits?.total ?? 0;
      this.returnedCount += pageElementHits?.returned ?? 0;
    }
  }

  /**
   * Utility method to remove 'service___' or 'metadata___mediatype___' from the beginning of
   * federated page element names, so that output will be cleaner.
   *
   * @param name Original page element name
   * @returns Page element name with prefix removed
   */
  private removePageElementPrefix(name: FederatedPageElementName): string {
    return name.split('___').pop() as string;
  }

  /**
   * Returns a correctly-typed search result depending on the schema's hit_type.
   */
  private static createResult(
    type: HitType,
    result: SearchResult,
  ): SearchResult {
    switch (type) {
      case 'item':
        return new ItemHit(result);
      case 'text':
      case 'asr_text':
        return new TextHit(result);
      case 'favorited_search':
        return new FavoritedSearchHit(result);
      case 'web_archive':
        return new WebArchiveHit(result);
      case 'tv_clip':
        return new TvClipHit(result);
      default:
        // The hit type doesn't tell us what to construct, so just construct an ItemHit
        return new ItemHit(result);
    }
  }
}
