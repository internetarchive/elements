export { ItemHit } from './models/hit-types/item-hit';
export { TextHit } from './models/hit-types/text-hit';
export type { SearchResult, HitType } from './models/hit-types/hit';
export { Aggregation, AggregationSortType } from './models/aggregation';
export type { Bucket } from './models/aggregation';

export { SearchMetadata } from './models/search-metadata';
export { SearchResponse } from './responses/search-response';
export type { SearchResponseHeader } from './responses/search-response-header';
export type { SearchResponseSessionContext } from './responses/search-response-session-context';
export type { SearchResponseParams } from './responses/search-response-params';
export type {
  CollectionExtraInfo,
  RelatedCollection,
} from './responses/collection-extra-info';
export type { UserDetails } from './responses/user-details';
export type { AccountExtraInfo } from './responses/account-extra-info';
export { ExtraInfo } from './responses/extra-info';
export { SearchReview, LENDING_SUB_ELEMENTS } from './responses/page-elements';
export type {
  PageElementMap,
  PageElementName,
  ReviewerAccountStatus,
  ForumPost,
  WebArchiveEntry,
  LendingPageElement,
  LendingSubElement,
} from './responses/page-elements';

export { MetadataSearchBackend } from './search-backend/metadata-search-backend';
export { FulltextSearchBackend } from './search-backend/fulltext-search-backend';
export { RadioSearchBackend } from './search-backend/radio-search-backend';

export type { SearchServiceInterface } from './search-service-interface';
export { SearchService } from './search-service';
export type { SearchResponseDetailsInterface } from './responses/search-response-details';
export type { SearchBackendOptionsInterface } from './search-backend/search-backend-options';
export { SearchType } from './search-type';
export { FilterConstraint } from './search-params';
export type {
  SearchParams,
  PageType,
  SortParam,
  SortDirection,
  AggregateSearchParams,
  AggregateSearchParam,
  FilterMap,
  FieldFilter,
} from './search-params';
export type { FederatedResults } from './responses/search-response-details';
export { FilterMapBuilder } from './filter-map-builder';
export { SearchServiceError } from './search-service-error';
