export type VisitorStatus = 'new' | 'returning';

/** localStorage key holding the local date (YYYY-MM-DD) of the first visit. */
export const FIRST_VISIT_STORAGE_KEY = 'ia-first-visit';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function localDateString(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * Whether this browser has been here on an earlier day.
 *
 * The first visit date lives in localStorage. A visit on the same day as the
 * first visit still counts as `new`. Returns `undefined` when storage can't be
 * read or written, so callers send no value at all.
 */
export function getVisitorStatus(now = new Date()): VisitorStatus | undefined {
  const today = localDateString(now);
  try {
    const firstVisit = window.localStorage.getItem(FIRST_VISIT_STORAGE_KEY);
    if (firstVisit && DATE_PATTERN.test(firstVisit)) {
      return firstVisit < today ? 'returning' : 'new';
    }
    window.localStorage.setItem(FIRST_VISIT_STORAGE_KEY, today);
    return 'new';
  } catch {
    return undefined;
  }
}
