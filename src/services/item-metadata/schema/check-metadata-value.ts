import { fieldSchema, type MetadataValueType } from './metadata-schema';

/**
 * Why a value doesn't fit its field. A code rather than a message, so each
 * client can word it in its own language.
 */
export type MetadataValueProblem =
  | 'not-plain-text'
  | 'invalid-datetime'
  | 'invalid-timestamp'
  | 'invalid-year'
  | 'invalid-integer'
  | 'invalid-number'
  | 'invalid-boolean'
  | 'invalid-url'
  | 'invalid-email'
  | 'invalid-identifier'
  | 'invalid-isbn'
  | 'invalid-issn'
  | 'invalid-runtime'
  | 'invalid-aspect-ratio'
  | 'invalid-openlibrary-id'
  | 'invalid-ark'
  | 'not-an-allowed-value';

/** Weighted-sum check shared by ISBN-10 and ISSN, whose last digit may be X */
function hasMod11CheckDigit(digits: string, firstWeight: number): boolean {
  const total = [...digits].reduce((sum, char, index) => {
    const digit = char === 'X' ? 10 : Number(char);
    return sum + digit * (firstWeight - index);
  }, 0);
  return total % 11 === 0;
}

function isIsbn(value: string): boolean {
  const digits = value.replace(/[\s-]/g, '').toUpperCase();
  if (/^\d{9}[\dX]$/.test(digits)) return hasMod11CheckDigit(digits, 10);
  if (!/^\d{13}$/.test(digits)) return false;
  const total = [...digits].reduce(
    (sum, char, index) => sum + Number(char) * (index % 2 === 0 ? 1 : 3),
    0,
  );
  return total % 10 === 0;
}

function isIssn(value: string): boolean {
  const digits = value.replace(/[\s-]/g, '').toUpperCase();
  return /^\d{7}[\dX]$/.test(digits) && hasMod11CheckDigit(digits, 8);
}

/**
 * The date formats the schema recommends (YYYY, YYYY-MM, YYYY-MM-DD) and the
 * other common ones it lists, plus a full timestamp and a bare `c` for circa.
 */
const recommendedDatePatterns = [
  /^\d{4}$/,
  /^\d{4}-(0[1-9]|1[0-2])$/,
  // A range, of which search indexes the first year
  /^\d{4}-\d{4}$/,
  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/,
  /^\[\d{4}\]$/,
  // c1888, c. 1888, ca 1888, c.a. 1888
  /^c\.?\s?(a\.?\s?)?\d{4}$/i,
  /^\[n\.d\.\]$/i,
];

/**
 * Whether a `date` value uses one of the formats the schema recommends.
 * The schema accepts any text for `date`, so `checkMetadataValue` never
 * rejects one; this is for clients that want to nudge toward the usual
 * formats, and that search sorts and filters by.
 */
export function isRecommendedDateFormat(value: string): boolean {
  const trimmed = value.trim();
  return recommendedDatePatterns.some((pattern) => pattern.test(trimmed));
}

/** Format checks by value type; types without one accept any text */
const typeChecks: Partial<
  Record<
    MetadataValueType,
    [RegExp | ((value: string) => boolean), MetadataValueProblem]
  >
> = {
  'plain-text': [(value) => !/<[a-z/!]/i.test(value), 'not-plain-text'],
  datetime: [/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/, 'invalid-datetime'],
  timestamp: [/^\d{14}$/, 'invalid-timestamp'],
  year: [/^\d{4}$/, 'invalid-year'],
  integer: [/^-?\d+$/, 'invalid-integer'],
  number: [/^-?\d+(\.\d+)?$/, 'invalid-number'],
  boolean: [/^true$/i, 'invalid-boolean'],
  url: [/^https?:\/\/\S+$/i, 'invalid-url'],
  email: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'invalid-email'],
  identifier: [/^[a-zA-Z0-9][a-zA-Z0-9_.-]{4,99}$/, 'invalid-identifier'],
  isbn: [isIsbn, 'invalid-isbn'],
  issn: [isIssn, 'invalid-issn'],
  runtime: [/^(\d{1,2}:)?\d{1,2}:[0-5]\d$/, 'invalid-runtime'],
  'aspect-ratio': [/^\d+:\d+$/, 'invalid-aspect-ratio'],
  'openlibrary-edition': [/^OL\d+M$/, 'invalid-openlibrary-id'],
  'openlibrary-work': [/^OL\d+W$/, 'invalid-openlibrary-id'],
  'openlibrary-author': [/^OL\d+A$/, 'invalid-openlibrary-id'],
  ark: [/^ark:\/\d+\/\S+$/, 'invalid-ark'],
};

/**
 * Checks one value against its field's type and, for fields with a closed
 * set of values, against that set. Returns `undefined` when the value fits.
 *
 * Empty values aren't checked, since writing one removes the field.
 *
 * ```ts
 * checkMetadataValue('isbn', '978-0-306-40615-7'); // undefined
 * checkMetadataValue('isbn', '12345'); // 'invalid-isbn'
 * checkMetadataValue('page-progression', 'tb'); // 'not-an-allowed-value'
 * ```
 */
export function checkMetadataValue(
  key: string,
  value: string,
): MetadataValueProblem | undefined {
  const trimmed = value.trim();
  if (trimmed === '') return undefined;

  const schema = fieldSchema(key);

  if (schema.values?.closed) {
    const allowed = schema.values.options.map((option) => option.toLowerCase());
    if (!allowed.includes(trimmed.toLowerCase())) return 'not-an-allowed-value';
  }

  const check = typeChecks[schema.type];
  if (!check) return undefined;
  const [test, problem] = check;
  const passes =
    typeof test === 'function' ? test(trimmed) : test.test(trimmed);
  return passes ? undefined : problem;
}
