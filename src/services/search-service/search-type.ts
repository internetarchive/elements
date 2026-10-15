/**
 * The different types of search that can be conducted
 * through the SearchService.
 */
export const SearchType = {
  DEFAULT: 0,
  METADATA: 1,
  FULLTEXT: 2,
  TV: 3,
  RADIO: 4,
  FEDERATED: 5,
} as const;

export type SearchType = (typeof SearchType)[keyof typeof SearchType];
