import { TemplateResult } from 'lit';

/**
 * Represents a single predefined option in a combo box.
 */
export interface IAComboBoxOption {
  /**
   * A unique ID representing this option.
   *
   * This value is used both as the DOM `id` for the option element, and as the
   * identifier indicating which option(s) are selected.
   */
  id: string;

  /**
   * The text to use for filtering autocomplete entries in the options menu, and for
   * displaying the option in the menu if no separate `content` value is provided.
   */
  text: string;

  /**
   * Optionally, the text or template to render for this option in the dropdown menu.
   *
   * If provided, it will be displayed in the options list instead of the option's
   * `text` value (though `text` will still be used for filtering the list). For this
   * reason, it is strongly encouraged to ensure that this content still prominently
   * includes the `text` value both visually and in accessible labels to avoid confusion.
   *
   * If not provided, then `text` assumes both display and filtering roles by default.
   */
  content?: string | TemplateResult;

  /**
   * Optionally, a callback to invoke when this option is selected in the combo box menu.
   */
  onSelected?: (option: this) => unknown;
}

/**
 * Type union of the possible preset options for combo box behavior (defining editability,
 * autocomplete style, etc).
 * @see {@linkcode IAComboBox.behavior}
 */
export type IAComboBoxBehavior = 'select-only' | 'list' | 'freeform';

/**
 * Type union of the possible preset options for filtering combo box entries.
 * @see {@linkcode IAComboBox.filter}
 */
export type IAComboBoxFilterPreset =
  | 'all'
  | 'prefix'
  | 'suffix'
  | 'substring'
  | 'subsequence';

/**
 * Required shape of functions used to filter combo box entries.
 * @see {@linkcode IAComboBox.filter}
 */
export type IAComboBoxFilterFunction = (
  filterText: string,
  optionText: string,
  option: IAComboBoxOption,
) => boolean;

/**
 * The `filter` property of a combo box may be specified either as a string
 * identifying a preset function, or directly as a custom filtering function.
 * @see {@linkcode IAComboBox.filter}
 */
export type IAComboBoxFilterOption =
  | IAComboBoxFilterPreset
  | IAComboBoxFilterFunction;

/**
 * Helper function to check if a Map has any of a list of keys
 * @param map The map to check
 * @param keys The list of keys to check
 */
export function hasAnyOf<T>(map: Map<T, unknown>, keys: T[]): boolean {
  return keys.some((prop) => map.has(prop));
}

/**
 * Tests whether the given `haystack` string has the given `needle` as a subsequence.
 * Returns `true` if the characters of `needle` appear in order within `haystack`,
 * regardless of whether they are contiguous. Returns `false` otherwise.
 *
 * E.g., `ace` is a subsequence of `archive` (but not a contiguous substring).
 *
 * Note: The empty string is a subsequence of any string, including itself.
 *
 * @param needle The potential subsequence to check for inside `haystack`.
 * @param haystack The string to be tested for containing the `needle` subsequence.
 * @returns Whether `haystack` has `needle` as a subsequence.
 */
export function isSubsequence(needle: string, haystack: string): boolean {
  const needleLen = needle.length;
  const haystackLen = haystack.length;
  if (needleLen === 0) return true;

  let needleIdx = 0;
  let haystackIdx = 0;
  while (haystackIdx < haystackLen) {
    if (haystack[haystackIdx] === needle[needleIdx]) needleIdx += 1;
    if (needleIdx >= needleLen) return true;
    haystackIdx += 1;
  }
  return false;
}