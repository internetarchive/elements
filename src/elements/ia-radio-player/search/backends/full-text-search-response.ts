/**
 * @file Response models for the archive.org full text search backend.
 *
 * The raw JSON is deserialized into these on arrival, so the rest of the
 * search code works against named fields rather than untyped payloads.
 */

/** The shape of the raw JSON, as far as these models read it. */
interface RawHighlighting {
  text: string[];
}

interface RawFacetCounts {
  facet_dates: object;
  facet_fields: object;
}

interface RawDocHighlight {
  cc: string[];
}

interface RawDoc {
  identifier: string;
  title: string;
  text: string;
  times: string;
  downloads: number;
  collection: string;
  highlight: RawDocHighlight;
  description: string;
  mediatype: string;
  __href__: string;
  'SE-BYPASS': number;
}

interface RawValue {
  numFound: number;
  start: number;
  docs: RawDoc[];
  highlighting: Record<string, RawHighlighting>;
  facet_counts: RawFacetCounts;
}

interface RawResponse {
  success: boolean;
  value: RawValue;
}

export class FullTextSearchResponseValueHighlighting {
  text: string[];

  constructor(payload: RawHighlighting) {
    this.text = payload.text;
  }
}

export class FullTextSearchResponseValueFacetCounts {
  facetFields: object;

  facetDates: object;

  constructor(payload: RawFacetCounts) {
    this.facetDates = payload.facet_dates;
    this.facetFields = payload.facet_fields;
  }
}

export class FullTextSearchResponseDocHighlight {
  /** The matched closed-caption snippets, with the match tags still in them. */
  cc: string[];

  constructor(payload: RawDocHighlight) {
    this.cc = payload.cc;
  }
}

export class FullTextSearchResponseDoc {
  identifier: string;

  title: string;

  /** The full transcript the highlights are positions within. */
  text: string;

  times: string;

  downloads: number;

  collection: string;

  highlight: FullTextSearchResponseDocHighlight;

  description: string;

  mediatype: string;

  __href__: string;

  'SE-BYPASS': number;

  constructor(payload: RawDoc) {
    this.identifier = payload.identifier;
    this.title = payload.title;
    this.text = payload.text;
    this.times = payload.times;
    this.downloads = payload.downloads;
    this.collection = payload.collection;
    this.highlight = new FullTextSearchResponseDocHighlight(payload.highlight);
    this.description = payload.description;
    this.mediatype = payload.mediatype;
    this.__href__ = payload.__href__;
    this['SE-BYPASS'] = payload['SE-BYPASS'];
  }
}

export class FullTextSearchResponseValue {
  numFound: number;

  start: number;

  docs: FullTextSearchResponseDoc[];

  highlighting: Record<string, FullTextSearchResponseValueHighlighting> = {};

  facetCounts: FullTextSearchResponseValueFacetCounts;

  constructor(payload: RawValue) {
    this.numFound = payload.numFound;
    this.start = payload.start;
    this.docs = payload.docs.map((doc) => new FullTextSearchResponseDoc(doc));

    Object.entries(payload.highlighting ?? {}).forEach(([key, value]) => {
      this.highlighting[key] = new FullTextSearchResponseValueHighlighting(
        value,
      );
    });

    this.facetCounts = new FullTextSearchResponseValueFacetCounts(
      payload.facet_counts,
    );
  }
}

export class FullTextSearchResponse {
  success: boolean;

  value: FullTextSearchResponseValue;

  constructor(payload: RawResponse) {
    this.success = payload.success;
    this.value = new FullTextSearchResponseValue(payload.value);
  }
}

/**
 * Where the full text search request actually goes.
 *
 * The backend hands the request off through this, so a consumer can fetch
 * however it needs to rather than being tied to one HTTP client.
 */
export interface FullTextSearchServiceInterface {
  searchRequested(query: string): Promise<FullTextSearchResponse>;
}
