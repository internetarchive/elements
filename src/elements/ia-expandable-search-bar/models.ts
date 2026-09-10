/**
 * One entry in the quick search list that drops out of the search bar.
 *
 * `data` rides along untouched so the consumer can recognise the entry it gets
 * back on the selection event without keeping a lookup table of its own.
 */
export interface QuickSearchEntry {
  /** The text shown in the list, and put into the search bar when picked. */
  displayText: string;

  /** Anything the consumer wants handed back when this entry is selected. */
  data?: unknown;
}
