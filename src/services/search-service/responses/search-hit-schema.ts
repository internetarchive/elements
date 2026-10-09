import { HitType } from '../models/hit-types/hit';

/**
 * Schema for individual field types within a hit
 */
export interface FieldSchema {
  mapping: string;
  multivalue: boolean;
  optional?: boolean;
  comment?: string;
}

/**
 * Top-level schema structure returned by the PPS
 */
export interface SearchHitSchema {
  /**
   * A string identifying what type of hits were returned
   * (and which this schema describes)
   */
  hit_type: HitType;

  /**
   * A map of the fields present on each search hit, with info
   * about their type and whether they are optional or multivalued.
   */
  field_properties: Record<string, FieldSchema>;
}
