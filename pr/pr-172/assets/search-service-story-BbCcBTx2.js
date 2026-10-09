import{i as W,A as Q,b as S,a as J,r as k,c as X}from"./index-nupA3kNI.js";import"./service-template-B8lBX3uo.js";import{n as o,R as V,h as N,D as T,N as P,S as c,B as E,M as Y}from"./review-D_C1-oQ3.js";import"./string-B_v7wtUf.js";import"./theme-styles-BQ6GYRF4.js";const Z=`import { SearchResponse } from './responses/search-response';
import type { SearchParams } from './search-params';
import type { SearchServiceError } from './search-service-error';
import type { SearchServiceInterface } from './search-service-interface';
import type { Result } from '../result-type/result-type';
import { SearchType } from './search-type';
import type { SearchBackendOptionsInterface } from './search-backend/search-backend-options';
import type { SearchBackendInterface } from './search-backend/search-backend-interface';
import { FulltextSearchBackend } from './search-backend/fulltext-search-backend';
import { MetadataSearchBackend } from './search-backend/metadata-search-backend';
import { TVSearchBackend } from './search-backend/tv-search-backend';
import { RadioSearchBackend } from './search-backend/radio-search-backend';
import { FederatedSearchBackend } from './search-backend/federated-search-backend';
import { DefaultSearchBackend } from './search-backend/default-search-backend';
import { Memoize } from 'typescript-memoize';

/**
 * The Search Service is responsible for taking the raw response provided by
 * the Search Backend and modeling it as a \`SearchResponse\` object.
 */
export class SearchService implements SearchServiceInterface {
  public static default: SearchServiceInterface = new SearchService();

  private backendOptions: SearchBackendOptionsInterface;

  constructor(backendOptions: SearchBackendOptionsInterface = {}) {
    this.backendOptions = backendOptions;
  }

  /** @inheritdoc */
  async search(
    params: SearchParams,
    searchType: SearchType = SearchType.METADATA,
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    const searchBackend = SearchService.getBackendForSearchType(
      searchType,
      this.backendOptions,
    );

    const rawResponse = await searchBackend.performSearch(params);
    if (rawResponse.error) {
      return rawResponse;
    }

    const modeledResponse = new SearchResponse(rawResponse.success);
    return { success: modeledResponse };
  }

  itemDetails(
    identifier: string,
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    const searchParams: SearchParams = {
      pageType: 'item_details',
      pageTarget: identifier,
    };

    return this.search(searchParams, SearchType.DEFAULT);
  }

  /**
   * Retrieve a search backend that can handle the given type of search.
   * @param type The type of search that the backend needs to handle.
   * @param options Options to pass to the search backend.
   */
  @Memoize((type: SearchType, options: SearchBackendOptionsInterface = {}) => {
    // We can memoize backends based on their params, to avoid constructing redundant backends
    const {
      includeCredentials = false,
      verbose = false,
      scope = '',
      baseUrl = '',
    } = options;
    return \`\${type};\${includeCredentials};\${verbose};\${scope};\${baseUrl}\`;
  })
  static getBackendForSearchType(
    type: SearchType,
    options: SearchBackendOptionsInterface = {},
  ): SearchBackendInterface {
    switch (type) {
      case SearchType.METADATA:
        return new MetadataSearchBackend(options);
      case SearchType.FULLTEXT:
        return new FulltextSearchBackend(options);
      case SearchType.RADIO:
        return new RadioSearchBackend(options);
      case SearchType.TV:
        return new TVSearchBackend(options);
      case SearchType.FEDERATED:
        return new FederatedSearchBackend(options);
      default:
        return new DefaultSearchBackend(options);
    }
  }
}
`,K=`import type { Result } from '../result-type/result-type';
import type { SearchResponse } from './responses/search-response';
import type { SearchParams } from './search-params';
import type { SearchServiceError } from './search-service-error';
import type { SearchType } from './search-type';

export interface SearchServiceInterface {
  /**
   * Perform a search for given search params.
   *
   * @param {SearchParams} params Params object specifying the search query,
   * sorting/aggregation options, and other ways to adjust what is returned.
   * @param {SearchType} searchType What type of search to perform (e.g.,
   * metadata or full text)
   * @returns {Promise<Result<SearchResponse, SearchServiceError>>}
   */
  search(
    params: SearchParams,
    searchType?: SearchType,
  ): Promise<Result<SearchResponse, SearchServiceError>>;

  /**
   * Retrieve item details for a specific item.
   *
   * @param {string} identifier The item identifier
   * @returns {Promise<Result<SearchResponse, SearchServiceError>>}
   */
  itemDetails(
    identifier: string,
  ): Promise<Result<SearchResponse, SearchServiceError>>;
}
`,ee=`import { PageElementName } from './responses/page-elements';

export interface AggregateSearchParam {
  field: string;
  size?: number;
}

/**
 * An object specifying which aggregation types should be returned with
 * a search query.
 */
export interface AggregateSearchParams {
  /**
   * An array of objects each specifying both a field name for which
   * aggregations should be returned and the number of "buckets" that
   * should be returned for it.
   *
   * Note: this format may not be supported by all backends. Run some
   * test queries with advanced aggregation objects before relying on this.
   */
  advancedParams?: AggregateSearchParam[];

  /**
   * An array of field names for which aggregations should be returned.
   */
  simpleParams?: string[];

  /**
   * A flag to indicate that aggregations should be omitted entirely
   * from the response (e.g., to retrieve only search results without
   * the added time cost of generating aggregations for them).
   *
   * Setting this to \`true\` in a search call will result in a response
   * with \`undefined\` aggregations.
   */
  omit?: boolean;
}

export type SortDirection = 'asc' | 'desc';

export interface SortParam {
  /**
   * The name of the field to sort on (e.g., 'title').
   */
  field: string;

  /**
   * Which direction to sort in ('asc' or 'desc').
   */
  direction: SortDirection;
}

/**
 * Enumerates the possible contraints that may be imposed on search results
 * by filter params.
 */
export const FilterConstraint = {
  /**
   * Specifies that all results must include _at least one of_ the values constrained
   * with INCLUDE for this field.
   *
   * For instance, \`{ subject: { baseball: INCLUDE, basketball: INCLUDE } }\` specifies
   * that only results containing _either_ \`baseball\` _or_ \`basketball\` as a subject
   * should be returned.
   */
  INCLUDE: 'inc',

  /**
   * Specifies that all results must _not_ include the given value for this field.
   *
   * For instance, \`{ subject: { baseball: EXCLUDE, basketball: EXCLUDE } }\` specifies
   * that only results containing _neither_ \`baseball\` _nor_ \`basketball\` as a subject
   * should be returned.
   */
  EXCLUDE: 'exc',

  /**
   * Imposes a strict lower bound on numeric values for the current field.
   * All returned hits must have a value for this field that is greater than the one
   * specified by this filter.
   *
   * This only makes sense for numeric fields like \`year\`.
   * Note that \`GREATER_THAN\` is not supported by the FTS engine, for which it is
   * coerced to \`GREATER_OR_EQUAL\`.
   */
  GREATER_THAN: 'gt',

  /**
   * Imposes a non-strict lower bound on numeric values for the current field.
   * All returned hits must have a value for this field that is greater than or equal
   * to the one specified by this filter.
   *
   * This only makes sense for numeric fields like \`year\`.
   */
  GREATER_OR_EQUAL: 'gte',

  /**
   * Imposes a strict upper bound on numeric values for the current field.
   * All returned hits must have a value for this field that is less than the one
   * specified by this filter.
   *
   * This only makes sense for numeric fields like \`year\`.
   * Note that \`LESS_THAN\` is not supported by the FTS engine, for which it is
   * coerced to \`LESS_OR_EQUAL\`.
   */
  LESS_THAN: 'lt',

  /**
   * Imposes a non-strict upper bound on numeric values for the current field.
   * All returned hits must have a value for this field that is less than or equal
   * to the one specified by this filter.
   *
   * This only makes sense for numeric fields like \`year\`.
   */
  LESS_OR_EQUAL: 'lte',
} as const;

export type FilterConstraint =
  (typeof FilterConstraint)[keyof typeof FilterConstraint];

/**
 * A filter mapping a field value to the type of constraint(s) that it should impose on results.
 * Multiple constraints for the same value may be provided as an array.
 *
 * Some examples (where the property values are members of \`FilterConstraint\`):
 * - \`{ 'puppies': INCLUDE }\`
 * - \`{ '1950': GREATER_OR_EQUAL, '1970': LESS_OR_EQUAL }\`
 * - \`{ '1950': [ GREATER_OR_EQUAL, EXCLUDE ] }\`
 */
export type FieldFilter = Record<string, FilterConstraint | FilterConstraint[]>;

/**
 * A map of fields (e.g., 'year', 'subject', ...) to the filters that should be
 * applied to them when retrieving search results.
 *
 * These filters may represent selected/hidden facets, value ranges (e.g., date picker),
 * or other types of restrictions on the result set.
 *
 * An example of a valid FilterMap:
 * \`\`\`
 * {
 *   'subject': {
 *     'dogs': INCLUDE,
 *     'puppies': EXCLUDE,
 *   },
 *   'year': {
 *     '1990': GREATER_OR_EQUAL,
 *     '2010': LESS_OR_EQUAL,
 *     '2003': EXCLUDE,
 *     '2004': EXCLUDE,
 *   },
 *   // ...
 * }
 * \`\`\`
 */
export type FilterMap = Record<string, FieldFilter>;

export type PageType =
  | 'search_results'
  | 'collection_details'
  | 'account_details'
  | 'item_details'
  | 'client_document_fetch';

/**
 * SearchParams provides an encapsulation to all of the search parameters
 * available for searching.
 *
 * We use \`SearchParamURLGenerator.generateUrlSearchParams\` to convert the
 * parameters to a PPS-conforming query string -- i.e., it converts the
 * \`fields\` array to \`fields=identifier,collection\` and \`sort\` to
 * \`sort=date:desc,downloads:asc\`
 */
export interface SearchParams {
  /**
   * The query string to search for.
   */
  query?: string;

  /**
   * The page type to generate results for (e.g., 'search_results').
   *
   * Defaults to 'search_results' in the PPS. Meant to allow different
   * backend defaults to be used depending on the needs of certain pages.
   */
  pageType?: PageType;

  /**
   * For details pages, specifies the name of the collection/account
   * that is to be retrieved (e.g., 'prelinger', '@brewster').
   */
  pageTarget?: string;

  /**
   * For account details pages, which segments of page data should be retrieved
   * (e.g., 'uploads', 'reviews', ...)
   */
  pageElements?: PageElementName[];

  /**
   * Array of identifiers to fetch when performing a \`client_document_fetch\`.
   * Ignored for all other page types.
   */
  identifiers?: string[];

  /**
   * One or more parameters specifying how the search results should be
   * sorted. Each parameter should include the field name and sort direction,
   * e.g.: \`{ field: 'title', sort: 'desc' }\`
   */
  sort?: SortParam[];

  /**
   * The number of results to be retrieved per page.
   */
  rows?: number;

  /**
   * The page number to be retrieved (beginning from page 1).
   *
   * Note that the _size_ of each page is determined by the \`rows\` parameter.
   */
  page?: number;

  /**
   * A list of fields that should be retrieved for each search result. In most
   * cases it should be unnecessary to specify the fields parameter as it is
   * defaulted by the PPS depending on the page_type. However, it may be useful
   * in some cases to restrict which fields are returned to a smaller subset of
   * the defaults.
   */
  fields?: string[];

  /**
   * A map from field names to filters that can be used to shape the result set.
   * The keys identify what field to filter on (e.g., \`'year'\`, \`'subject'\`, etc.),
   * and the values identify what filters to apply for that field.
   *
   * The constraints allowed are the members of \`FilterContraint\`:
   * - \`INCLUDE\` (at least one of these values must be present)
   * - \`EXCLUDE\` (none of these values may be present)
   * - \`GREATER_THAN\` (result values must be strictly greater than the one specified)
   * - \`GREATER_OR_EQUAL\` (result values must be greater than or equal to than the one specified)
   * - \`LESS_THAN\` (result values must be strictly less than the one specified)
   * - \`LESS_OR_EQUAL\` (result values must be less than or equal to the one specified)
   *
   * So filters like \`{ creator: { 'Cicero': INCLUDE } }\` will produce
   * search results that all include \`Cicero\` as a creator, while filters like
   * \`{ year: { '2000': GREATER_THAN, '2005': LESS_THAN } }\` will produce search results whose
   * \`year\` field is between 2000 and 2005 (exclusive).
   */
  filters?: FilterMap;

  /**
   * An object specifying which aggregation types should be returned with
   * a search query.
   */
  aggregations?: AggregateSearchParams;

  /**
   * The number of buckets that should be returned for each aggregation type.
   * This defaults to 6 in the PPS (the number of facets displayed for each
   * facet type by default in the sidebar).
   */
  aggregationsSize?: number;

  /**
   * Whether to include debugging info in the returned PPS response.
   */
  debugging?: boolean;

  /**
   * A unique request ID to pass to the service.
   * Will be returned unmodified in the response, for ease of tracking responses,
   * e.g., to quickly determine whether a given response has obsolete data.
   */
  uid?: string;

  /**
   * Whether to include the client URL in the request.
   * This is useful for PPS debugging as it allows the backend folks to compare
   * any PPS response issues with the client URLs that generated them,
   * especially for issues related to parameter parsing & normalization.
   *
   * This defaults to true, as these should be sent on every request unless
   * there is a specific need not to include them for certain request types. Thus:
   *  * \`includeClientUrl: undefined\` causes \`client_url\` param to be included in the request, by default.
   *  * \`includeClientUrl: true\` causes \`client_url\` param to be included, explicitly.
   *  * \`includeClientUrl: false\` causes \`client_url\` param to _not_ be included in the request.
   *
   * Note that when included, the client URL is truncated to at most 400 characters, to prevent
   * overrunning URL length limits in the payload sent to the PPS. Moreover, if the query being
   * sent exceeds 1000 characters in length, then the client_url will be omitted from the request
   * regardless of this setting.
   */
  includeClientUrl?: boolean;
}
`;var te=Object.defineProperty,re=Object.getOwnPropertyDescriptor,se=(i,e,t,n)=>{for(var r=re(e,t),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(e,t,r)||r);return r&&te(e,t,r),r};const A={COUNT:0,ALPHABETICAL:1,NUMERIC:2};class F{constructor(e){this.buckets=e.buckets,this.first_bucket_key=e.first_bucket_key,this.last_bucket_key=e.last_bucket_key,this.number_buckets=e.number_buckets,this.interval=e.interval,this.first_bucket_year=e.first_bucket_year,this.first_bucket_month=e.first_bucket_month,this.last_bucket_year=e.last_bucket_year,this.last_bucket_month=e.last_bucket_month,this.interval_in_months=e.interval_in_months}getSortedBuckets(e){const t=[...this.buckets];if(this.isRawNumberBuckets(t))return t;const n=new Intl.Collator;switch(e){case A.ALPHABETICAL:return t.sort((r,s)=>n.compare(r.key.toString(),s.key.toString()));case A.NUMERIC:return t.sort((r,s)=>Number(s.key)-Number(r.key));case A.COUNT:default:return t}}isRawNumberBuckets(e){return typeof e[0]=="number"}}se([o()],F.prototype,"getSortedBuckets");var ne=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,ae=(i,e,t,n)=>{for(var r=ie(e,t),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(e,t,r)||r);return r&&ne(e,t,r),r};class $ extends V{get reviewer_account_status(){return this.account_status?.status}get reviewer_account_status_reason(){return this.account_status?.reason}get __href__(){return this.rawValue.__href__}get account_status(){const e=this.rawValue.reviewer_account_status;if(!e)return;let t="unknown",n;e.startsWith("ok")&&(t="ok"),e.startsWith("locked")&&(t="locked");const r=e.split("__");return r.length>1&&(n=r.slice(1).join("__")),{status:t,reason:n}}}ae([o()],$.prototype,"account_status");const oe=["loans","waitlist","loan_history"];function le(i){const e=i.slice(0,4),t=i.slice(4,6),n=i.slice(6,8),r=i.slice(8,10),s=i.slice(10,12),a=i.slice(12,14);return`${e}-${t}-${n}T${r}:${s}:${a}Z`}function ce(i){const e=[];for(const t of i){if(!t.captures?.length)continue;const n=`https://web.archive.org/web/${t.captures[0]}/${t.url}`;e.push({hit_type:"web_archive",fields:{url:t.url,capture_dates:t.captures.map(r=>le(r)),__href__:n}})}return e}var de=Object.defineProperty,he=Object.getOwnPropertyDescriptor,h=(i,e,t,n)=>{for(var r=he(e,t),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(e,t,r)||r);return r&&de(e,t,r),r};class l extends N{get created_on(){return this.rawMetadata.created_on!=null?new T(this.rawMetadata.created_on):void 0}get file_creation_mtime(){return this.rawMetadata.file_creation_mtime!=null?new P(this.rawMetadata.file_creation_mtime):void 0}get filename(){return this.rawMetadata.filename!=null?new c(this.rawMetadata.filename):void 0}get file_basename(){return this.rawMetadata.file_basename!=null?new c(this.rawMetadata.file_basename):void 0}get result_in_subfile(){return this.rawMetadata.result_in_subfile!=null?new E(this.rawMetadata.result_in_subfile):void 0}get query(){return this.rawMetadata.query!=null?new c(this.rawMetadata.query):void 0}get date_favorited(){return this.rawMetadata.date_favorited!=null?new T(this.rawMetadata.date_favorited):void 0}get updated_on(){return this.rawMetadata.updated_on!=null?new T(this.rawMetadata.updated_on):void 0}get ad_id(){return this.rawMetadata.ad_id!=null?new c(this.rawMetadata.ad_id):void 0}get factcheck(){return this.rawMetadata.factcheck!=null?new c(this.rawMetadata.factcheck):void 0}get is_clip(){return this.rawMetadata.clip!=null?new E(this.rawMetadata.clip):void 0}get num_clips(){return this.rawMetadata.nclips!=null?new P(this.rawMetadata.nclips):void 0}get __href__(){return this.rawMetadata.__href__!=null?new c(this.rawMetadata.__href__):void 0}get __img__(){return this.rawMetadata.__img__!=null?new c(this.rawMetadata.__img__):void 0}}h([o()],l.prototype,"created_on");h([o()],l.prototype,"file_creation_mtime");h([o()],l.prototype,"filename");h([o()],l.prototype,"file_basename");h([o()],l.prototype,"result_in_subfile");h([o()],l.prototype,"query");h([o()],l.prototype,"date_favorited");h([o()],l.prototype,"updated_on");h([o()],l.prototype,"ad_id");h([o()],l.prototype,"factcheck");h([o()],l.prototype,"is_clip");h([o()],l.prototype,"num_clips");h([o()],l.prototype,"__href__");h([o()],l.prototype,"__img__");var ue=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,p=(i,e,t,n)=>{for(var r=pe(e,t),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(e,t,r)||r);return r&&ue(e,t,r),r};class u{constructor(e){this.rawMetadata=e,this.fields=new l(e.fields??{})}get identifier(){return this.fields.identifier}get addeddate(){return this.fields.addeddate}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get collection_files_count(){return this.rawMetadata.fields?.collection_files_count!=null?new P(this.rawMetadata.fields.collection_files_count):void 0}get collection_size(){return this.fields.collection_size}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get files_count(){return this.fields.files_count}get genre(){return this.rawMetadata.fields?.genre!=null?new c(this.rawMetadata.fields.genre):void 0}get indexflag(){return this.rawMetadata.fields?.indexflag!=null?new c(this.rawMetadata.fields.indexflag):void 0}get issue(){return this.fields.issue}get item_count(){return this.fields.item_count}get item_size(){return this.fields.item_size}get language(){return this.fields.language}get lending___available_to_borrow(){return this.rawMetadata.fields?.lending___available_to_borrow!=null?new E(this.rawMetadata.fields.lending___available_to_borrow):void 0}get lending___available_to_browse(){return this.rawMetadata.fields?.lending___available_to_browse!=null?new E(this.rawMetadata.fields.lending___available_to_browse):void 0}get lending___available_to_waitlist(){return this.rawMetadata.fields?.lending___available_to_waitlist!=null?new E(this.rawMetadata.fields.lending___available_to_waitlist):void 0}get lending___status(){return this.rawMetadata.fields?.lending___status!=null?new c(this.rawMetadata.fields.lending___status):void 0}get licenseurl(){return this.rawMetadata.fields?.licenseurl!=null?new c(this.rawMetadata.fields.licenseurl):void 0}get mediatype(){return this.fields.mediatype}get month(){return this.fields.month}get noindex(){return this.fields.noindex}get num_favorites(){return this.fields.num_favorites}get num_reviews(){return this.fields.num_reviews}get publicdate(){return this.fields.publicdate}get reviewdate(){return this.fields.reviewdate}get review(){const e=this.rawMetadata.review;return e?new $(e):void 0}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get type(){return this.fields.type}get volume(){return this.fields.volume}get week(){return this.fields.week}get year(){return this.fields.year}}p([o()],u.prototype,"collection_files_count");p([o()],u.prototype,"genre");p([o()],u.prototype,"indexflag");p([o()],u.prototype,"lending___available_to_borrow");p([o()],u.prototype,"lending___available_to_browse");p([o()],u.prototype,"lending___available_to_waitlist");p([o()],u.prototype,"lending___status");p([o()],u.prototype,"licenseurl");p([o()],u.prototype,"review");var ge=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,I=(i,e,t,n)=>{for(var r=fe(e,t),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(e,t,r)||r);return r&&ge(e,t,r),r};class M{constructor(e){this.rawMetadata=e,this.fields=new l(e.fields??{})}get identifier(){return this.fields.identifier}get highlight(){return this.rawMetadata.highlight?.text?new c(this.rawMetadata.highlight.text):void 0}get addeddate(){return this.fields.addeddate}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get created_on(){return this.fields.created_on}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get filename(){return this.fields.filename}get file_basename(){return this.fields.file_basename}get file_creation_mtime(){return this.fields.file_creation_mtime}get issue(){return this.fields.issue}get mediatype(){return this.fields.mediatype}get page_num(){return this.rawMetadata.fields?.page_num!=null?new P(this.rawMetadata.fields.page_num):void 0}get publicdate(){return this.fields.publicdate}get result_in_subfile(){return this.fields.result_in_subfile}get reviewdate(){return this.fields.reviewdate}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get updated_on(){return this.fields.updated_on}get year(){return this.fields.year}get __href__(){return this.fields.__href__}}I([o()],M.prototype,"highlight");I([o()],M.prototype,"page_num");class _e{constructor(e){this.rawMetadata=e,this.fields=new l(e.fields??{})}get identifier(){return this.fields.query?.value}get title(){return this.fields.title}get query(){return this.fields.query}get date_favorited(){return this.fields.date_favorited}get __href__(){return this.fields.__href__}}var me=Object.defineProperty,be=Object.getOwnPropertyDescriptor,B=(i,e,t,n)=>{for(var r=be(e,t),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(e,t,r)||r);return r&&me(e,t,r),r};class x{constructor(e){this.rawMetadata=e,this.fields=new l(e.fields??{})}get identifier(){return this.rawMetadata.fields?.url}get mediatype(){return new Y("web")}get title(){return this.rawMetadata.fields?.url?new c(this.rawMetadata.fields?.url):void 0}get capture_dates(){return this.rawMetadata.fields?.capture_dates?new T(this.rawMetadata.fields?.capture_dates):void 0}get __href__(){return this.fields.__href__}}B([o()],x.prototype,"title");B([o()],x.prototype,"capture_dates");var ve=Object.defineProperty,we=Object.getOwnPropertyDescriptor,j=(i,e,t,n)=>{for(var r=we(e,t),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(e,t,r)||r);return r&&ve(e,t,r),r};class U{constructor(e){this.rawMetadata=e,this.fields=new l(e.fields??{})}get identifier(){return this.fields.identifier}get highlight(){return this.rawMetadata.highlight?.text?new c(this.rawMetadata.highlight.text):void 0}get addeddate(){return this.fields.addeddate}get ad_id(){return this.fields.ad_id}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get created_on(){return this.fields.created_on}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get factcheck(){return this.fields.factcheck}get filename(){return this.fields.filename}get file_basename(){return this.fields.file_basename}get file_creation_mtime(){return this.fields.file_creation_mtime}get files_count(){return this.fields.files_count}get is_clip(){return this.fields.is_clip}get issue(){return this.fields.issue}get item_count(){return this.fields.item_count}get item_size(){return this.fields.item_size}get language(){return this.fields.language}get mediatype(){return this.fields.mediatype}get num_clips(){return this.fields.num_clips}get num_favorites(){return this.fields.num_favorites}get publicdate(){return this.fields.publicdate}get result_in_subfile(){return this.fields.result_in_subfile}get reviewdate(){return this.fields.reviewdate}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get updated_on(){return this.fields.updated_on}get week(){return this.fields.week}get year(){return this.fields.year}get start(){return this.rawMetadata.fields?.start!=null?new c(this.rawMetadata.fields.start):void 0}get __href__(){return this.fields.__href__}get __img__(){return this.fields.__img__}}j([o()],U.prototype,"highlight");j([o()],U.prototype,"start");var ye=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,H=(i,e,t,n)=>{for(var r=Se(e,t),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(e,t,r)||r);return r&&ye(e,t,r),r};class D{constructor(e){this.rawResponse=e}get item_size(){return this.rawResponse.item_size}get files_count(){return this.rawResponse.files_count}get month(){return this.rawResponse.month}get week(){return this.rawResponse.week}get downloads(){return this.rawResponse.downloads}get num_favorites(){return this.rawResponse.num_favorites}get title_message(){return this.rawResponse.title_message}get primary_collection(){return this.rawResponse.primary_collection}get thumbnail_url(){return this.rawResponse.thumbnail_url}get num_reviews(){return this.rawResponse.num_reviews}get uploader_details(){return this.rawResponse.uploader_details}get public_metadata(){if(this.rawResponse.public_metadata)return new N(this.rawResponse.public_metadata)}get part_of(){return this.rawResponse.part_of}get speech_vs_music_asr_metadata(){return this.rawResponse.speech_vs_music_asr_metadata}get reviews_metadata(){return(this.rawResponse.reviews_metadata??[]).map(t=>new $(t))}}H([o()],D.prototype,"public_metadata");H([o()],D.prototype,"reviews_metadata");class C{constructor(e,t){this.extraInfo=null,this.schema=t,this.schemaHitType=t?.hit_type;let n;e?.page_elements&&(this.pageElements=e.page_elements,n=Object.values(this.pageElements)[0]);let r=e?.hits?.hits;this.totalResults=e?.hits?.total??0,this.returnedCount=e?.hits?.returned??0,!r?.length&&this.pageElements?.service___fts?(this.totalResults=0,this.returnedCount=0,this.handleFederatedPageElements()):!r?.length&&n?.hits?.hits?(r=n.hits.hits,this.totalResults=n.hits.total??0,this.returnedCount=n.hits.returned??0):this.pageElements?.lending?r=this.handleLendingPageElement():this.pageElements?.web_archives&&(r=this.handleWebArchivesPageElement()),this.results=this.formatHits(r);let s=e?.aggregations;!(this.aggregations&&Object.keys(this.aggregations).length>0)&&n?.aggregations&&(s=n.aggregations),s&&this.buildAggregations(s),e?.collection_titles&&(this.collectionTitles=e.collection_titles??{}),e?.tv_channel_aliases&&(this.tvChannelAliases=e.tv_channel_aliases??{}),e?.collection_extra_info&&(this.collectionExtraInfo=e.collection_extra_info??null),e?.account_extra_info&&(this.accountExtraInfo=e.account_extra_info??null),e?.extra_info&&(this.extraInfo=new D(e.extra_info))}formatHits(e){return e?.map(t=>C.createResult(t.hit_type??this.schemaHitType,t))??[]}buildAggregations(e){this.aggregations=Object.entries(e).reduce((t,[n,r])=>(t[n]=new F(r),t),{})}handleLendingPageElement(){const e=this.pageElements?.lending,t=e.loans??[];this.totalResults=t.length,this.returnedCount=this.totalResults;for(const n of oe)e[n]=this.formatHits(e[n]);return t}handleWebArchivesPageElement(){const e=ce(this.pageElements?.web_archives);return this.totalResults=e.length,this.returnedCount=this.totalResults,e}handleFederatedPageElements(){const e=["service___fts","service___tvs","service___rcs","service___whisper","metadata___mediatype___texts","metadata___mediatype___movies","metadata___mediatype___audio","metadata___mediatype___software","metadata___mediatype___image","metadata___mediatype___etree"];for(const t of e){const n=this.removePageElementPrefix(t);this.federatedResults?this.federatedResults[t]=[]:this.federatedResults={[n]:[]};const r=this.pageElements?.[t]?.hits;r?.hits&&(this.federatedResults[n]=this.formatHits(r?.hits)),this.totalResults+=r?.total??0,this.returnedCount+=r?.returned??0}}removePageElementPrefix(e){return e.split("___").pop()}static createResult(e,t){switch(e){case"item":return new u(t);case"text":case"asr_text":return new M(t);case"favorited_search":return new _e(t);case"web_archive":return new x(t);case"tv_clip":return new U(t);default:return new u(t)}}}class Ee{constructor(e){this.clientParameters=e.client_parameters,this.backendRequests=e.backend_requests,this.kind=e.kind}}class z{constructor(e){this.rawResponse=e,this.request=new Ee(e.request),this.responseHeader=e.response?.header,this.sessionContext=e.session_context,this.response=new C(e.response?.body,e.response?.hit_schema)}}const g={DEFAULT:0,METADATA:1,FULLTEXT:2,TV:3,RADIO:4,FEDERATED:5};class v{static aggregateSearchParamsAsString(e){if(e.omit)return"false";if(e.advancedParams){const t=e.advancedParams.map(r=>({terms:r}));return JSON.stringify(t)}if(e.simpleParams)return e.simpleParams.join(",")}static sortParamsAsString(e){return`${e.field}:${e.direction}`}static filterParamsAsString(e){return JSON.stringify(e)}static generateURLSearchParams(e){const t=new URLSearchParams;if(e.query&&t.append("user_query",e.query),e.pageType&&t.append("page_type",String(e.pageType)),e.pageTarget&&t.append("page_target",String(e.pageTarget)),e.pageElements&&e.pageElements.length>0){const s=`[${e.pageElements.map(a=>`"${a}"`).join(",")}]`;t.append("page_elements",s)}if(e.rows!=null&&t.append("hits_per_page",String(e.rows)),e.page!=null&&t.append("page",String(e.page)),e.fields&&e.fields.length>0&&t.append("fields",e.fields.join(",")),e.filters&&Object.keys(e.filters).length>0){const r=this.filterParamsAsString(e.filters);r&&r!=="{}"&&t.append("filter_map",r)}if(e.sort&&e.sort.length>0){const r=e.sort.map(s=>this.sortParamsAsString(s));t.append("sort",r.join(","))}const n=e.aggregations;if(n){const r=this.aggregateSearchParamsAsString(n);r&&t.append("aggregations",r)}if(e.aggregationsSize!=null&&t.append("aggregations_size",String(e.aggregationsSize)),e.debugging&&t.append("debugging","true"),e.uid&&t.append("uid",e.uid),e.includeClientUrl!==!1){const r=e.query==null,s=e.query&&e.query.length<=1e3;if(r||s){const d=window.location.href.slice(0,400);t.append("client_url",d)}}return t}}const O={networkError:"SearchService.NetworkError",itemNotFound:"SearchService.ItemNotFound",decodingError:"SearchService.DecodingError",searchEngineError:"SearchService.SearchEngineError"};class ke extends Error{constructor(e,t,n){super(t),this.name=e,this.type=e,this.details=n}}const L={reCache:JSON.stringify({recompute:!0}),noCache:JSON.stringify({bypass:!0}),dontCache:JSON.stringify({no_compute:!0})};class w{constructor(e){this.baseUrl=e?.baseUrl??"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null;const t=new URL(window.location.href).searchParams,n=t.get("scope"),r=t.get("verbose"),s=t.get("debugging"),a=t.get("cacheDebug");let d="";for(const m of Object.keys(L))if(t.get(m)){d=L[m];break}d=t.get("caching")??d,e?.caching!==void 0?this.cachingFlags=e.caching:d&&(this.cachingFlags=d),e?.debuggingEnabled!==void 0?this.debuggingEnabled=e.debuggingEnabled:(s||a)&&(this.debuggingEnabled=!0),e?.scope!==void 0?this.requestScope=e.scope:n&&(this.requestScope=n),e?.verbose!==void 0?this.verbose=e.verbose:r&&(this.verbose=!!r)}async fetchUrl(e,t){const n=new URL(e);this.requestScope&&n.searchParams.set("scope",this.requestScope),this.cachingFlags&&n.searchParams.set("caching",this.cachingFlags);let r;try{const s=t?.requestOptions??{credentials:this.includeCredentials?"include":"same-origin"};r=await fetch(n.href,s)}catch(s){const a=s instanceof Error?s.message:typeof s=="string"?s:"Unknown error";return this.getErrorResult(O.networkError,a)}try{const s=await r.json();this.verbose&&this.printResponse(s),s.debugging&&this.printDebuggingInfo(s);const a=s.response?.error;return a?this.getErrorResult(O.searchEngineError,a.message,a.forensics):{success:s}}catch(s){const a=s instanceof Error?s.message:typeof s=="string"?s:"Unknown error";return this.getErrorResult(O.decodingError,a)}}getErrorResult(e,t,n){return{error:new ke(e,t,n)}}printResponse(e){try{const t=JSON.parse(JSON.stringify(e)),n=t?.response?.body?.hits?.hits;if(Array.isArray(n)&&n.length>1){const s=[];s.push(n[0]),s.push(`*** ${n.length-1} hits omitted ***`),t.response.body.hits.hits=s}const r=t?.response?.body?.aggregations;r&&Object.entries(r).forEach(([s,a])=>{if(a?.buckets?.length>0){const d=JSON.parse(JSON.stringify(a));d.buckets=`*** ${d.buckets?.length??0} buckets omitted ***`,t.response.body.aggregations[s]=d}}),console.log("***** RESPONSE RECEIVED *****"),console.groupCollapsed("Response"),console.log(JSON.stringify(t,null,2)),console.groupEnd()}catch(t){console.error("Error printing search response:",t)}}printDebuggingInfo(e){const t=e.debugging,n=t.messages??[],r=t.data??{};console.log("***** BEGIN DEBUGGING *****"),console.log("Full response:"),console.log(JSON.stringify(e,null,2)),console.group("Debug messages");for(const s of n)console.log(s);console.groupEnd(),console.group("Debug data");for(const[s,a]of Object.entries(r))console.log(s,a);console.groupEnd(),console.log("***** END DEBUGGING *****")}}class Re extends w{constructor(e){super(e),this.servicePath=e?.servicePath??"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const n=v.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}${this.servicePath}/?service_backend=fts&${n}`;return this.fetchUrl(r)}}class Te extends w{constructor(e){super(e),this.servicePath=e?.servicePath??"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const n=v.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}${this.servicePath}/?service_backend=metadata&${n}`;return this.fetchUrl(r)}}class Pe extends w{constructor(e){super(e),this.servicePath=e?.servicePath??"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const n=v.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}${this.servicePath}/?service_backend=tvs&${n}`;return this.fetchUrl(r)}}class Ae extends w{constructor(e){super(e),this.servicePath=e?.servicePath??"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const n=v.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}${this.servicePath}/?service_backend=rcs&${n}`;return this.fetchUrl(r)}}class Oe extends w{constructor(e){super(e),this.servicePath=e?.servicePath??"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const n=v.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}${this.servicePath}/?page_type=simple_federation&${n}`;return this.fetchUrl(r)}}class $e extends w{constructor(e){super(e),this.servicePath=e?.servicePath??"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const n=v.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}${this.servicePath}/?${n}`,{pageType:s,identifiers:a}=e,m=s==="client_document_fetch"&&!!a?.length?{requestOptions:{method:"POST",body:JSON.stringify({doc_ids:a}),credentials:"include"}}:void 0;return this.fetchUrl(r,m)}}var Me=Object.defineProperty,xe=Object.getOwnPropertyDescriptor,Ue=(i,e,t,n)=>{for(var r=xe(e,t),s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=a(e,t,r)||r);return r&&Me(e,t,r),r},f;const G=(f=class{constructor(e={}){this.backendOptions=e}async search(e,t=g.METADATA){const r=await f.getBackendForSearchType(t,this.backendOptions).performSearch(e);return r.error?r:{success:new z(r.success)}}itemDetails(e){const t={pageType:"item_details",pageTarget:e};return this.search(t,g.DEFAULT)}static getBackendForSearchType(e,t={}){switch(e){case g.METADATA:return new Te(t);case g.FULLTEXT:return new Re(t);case g.RADIO:return new Ae(t);case g.TV:return new Pe(t);case g.FEDERATED:return new Oe(t);default:return new $e(t)}}},f.default=new f,f);Ue([o((i,e={})=>{const{includeCredentials:t=!1,verbose:n=!1,scope:r="",baseUrl:s=""}=e;return`${i};${t};${n};${r};${s}`})],G,"getBackendForSearchType");let De=G;var Ce=Object.defineProperty,Le=Object.getOwnPropertyDescriptor,y=(i,e,t,n)=>{for(var r=n>1?void 0:n?Le(e,t):e,s=i.length-1,a;s>=0;s--)(a=i[s])&&(r=(n?a(e,t,r):a(r))||r);return n&&r&&Ce(e,t,r),r};const q="nasa",qe={request:{client_parameters:{user_query:"sample",page:1,hits_per_page:3}},response:{header:{succeeded:!0,query_time:12},hit_schema:{hit_type:"item",field_properties:{}},body:{hits:{total:1234,returned:3,hits:[{fields:{identifier:"sample-moon-landing",title:"Sample: the moon landing",mediatype:"movies",creator:"A sample creator"}},{fields:{identifier:"sample-apollo-guide",title:"Sample: an Apollo guide",mediatype:"texts"}},{fields:{identifier:"sample-mission-audio",title:"Sample: mission audio",mediatype:"etree"}}]}}}},Ne=`import { SearchService } from '@internetarchive/elements/services/search-service/search-service';
import { SearchType } from '@internetarchive/elements/services/search-service/search-type';

const { success, error } = await new SearchService().search(
  { query: 'nasa', rows: 5, fields: ['title', 'mediatype'] },
  SearchType.METADATA,
);
success?.response.results.map((hit) => hit.identifier);`,Fe=i=>i.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),Ie=[K,ee,Z].map(Fe).join(`

`);let _=class extends W{constructor(){super(...arguments),this.query="",this.rows=5,this.sample=!1,this.running=!1}render(){return S`
      <service-template
        serviceName="search-service"
        .usage=${Ne}
        .apiSource=${Ie}
      >
        <form slot="console" @submit=${this.run}>
          <label class="query">
            Query
            <input
              type="text"
              placeholder=${q}
              autocomplete="off"
              spellcheck="false"
              .value=${this.query}
              @input=${i=>this.query=i.target.value}
            />
          </label>
          <label>
            Results
            <input
              type="number"
              min="1"
              max="20"
              .value=${String(this.rows)}
              @input=${i=>this.rows=Number(i.target.value)}
            />
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this.sample}
              @change=${i=>this.sample=i.target.checked}
            />
            Sample data (works offline)
          </label>
          <button type="submit" ?disabled=${this.running}>Search</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?this.renderResult(this.result):Q}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Searches archive.org's metadata search and models the response. The
            sample data skips the request and runs a canned response through the
            same <code>SearchResponse</code> model.
          </p>
        </div>
      </service-template>
    `}renderResult(i){return S`<code class="call">${i.call}</code> ${i.error?S`<code class="error">${i.error}</code>`:S`<p class="summary">${i.summary}</p>
            <table>
              <thead>
                <tr>
                  <th scope="col">Identifier</th>
                  <th scope="col">Title</th>
                  <th scope="col">Media type</th>
                </tr>
              </thead>
              <tbody>
                ${i.rows.map(e=>S`<tr>
                      <th scope="row">${e.identifier}</th>
                      <td>${e.title}</td>
                      <td>${e.mediatype}</td>
                    </tr>`)}
              </tbody>
            </table>`}`}async run(i){i.preventDefault();const e=this.query.trim()||q,t=Math.min(Math.max(this.rows||1,1),20),n={query:e,rows:t,fields:["title","mediatype"]},r=this.sample?"new SearchResponse(sampleResponse)":`search(${JSON.stringify(n)}, SearchType.METADATA)`;this.running=!0;try{let s;if(this.sample)s=new z(qe);else{const{success:b,error:R}=await new De().search(n,g.METADATA);if(R||!b)throw new Error(R?`${R.type}: ${R.message}`:"No response");s=b}const{totalResults:a,returnedCount:d,results:m}=s.response;this.result={call:r,summary:`${d} of ${a} results`,rows:m.map(b=>({identifier:b.identifier??"",title:b.title?.value??"",mediatype:b.mediatype?.value??""}))}}catch(s){this.result={call:r,rows:[],error:`${s instanceof Error?s.message:s}${this.sample?"":'. Try "Sample data".'}`}}finally{this.running=!1}}static get styles(){return J`
      form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.5rem;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 0.8rem;
      }

      label.check {
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }

      label.query input {
        min-width: 0;
        width: 14rem;
        max-width: 100%;
      }

      input[type='number'] {
        width: 5rem;
      }

      .result[hidden] {
        display: none;
      }

      .result {
        box-sizing: border-box;
        flex-basis: 100%;
        min-width: 0;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 0.5rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 0.85rem;
        overflow-x: auto;
      }

      .call,
      .error {
        overflow-wrap: anywhere;
      }

      .error {
        color: #b00020;
      }

      .summary {
        margin: 0;
        font-weight: 600;
      }

      table {
        border-collapse: collapse;
        font-size: 0.8rem;
      }

      th,
      td {
        text-align: left;
        padding: 2px 10px 2px 0;
        vertical-align: top;
        overflow-wrap: anywhere;
      }

      thead th {
        border-bottom: 1px solid #ccc;
      }
    `}};y([k()],_.prototype,"query",2);y([k()],_.prototype,"rows",2);y([k()],_.prototype,"sample",2);y([k()],_.prototype,"running",2);y([k()],_.prototype,"result",2);_=y([X("search-service-story")],_);export{_ as SearchServiceStory};
