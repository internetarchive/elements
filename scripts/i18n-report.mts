/**
 * Pure helpers for `i18n:status`: what each locale is missing and what is
 * still a draft, and how that reads in a CI log.
 */
import { needsReview, parseUnits, untranslated } from './xliff.mts';

export type LocaleReport = {
  locale: string;
  total: number;
  /** Ids with no translation yet. English shows until they're filled. */
  missing: string[];
  /** Ids drafted but not yet reviewed by a native speaker. */
  unreviewed: string[];
};

export function localeReport(locale: string, xml: string): LocaleReport {
  const units = parseUnits(xml);
  return {
    locale,
    total: units.length,
    missing: untranslated(units).map((u) => u.id),
    unreviewed: needsReview(units).map((u) => u.id),
  };
}

const SHOWN = 20;

function idList(label: string, ids: string[]): string[] {
  if (ids.length === 0) return [];
  const lines = ids.slice(0, SHOWN).map((id) => `    ${id}`);
  const more = ids.length - SHOWN;
  return [
    `  ${label}: ${ids.length}`,
    ...lines,
    ...(more > 0 ? [`    ...and ${more} more`] : []),
  ];
}

/** One block per locale, then a verdict line. */
export function formatReports(reports: LocaleReport[]): string {
  const lines: string[] = [];
  for (const r of reports) {
    const done = r.total - r.missing.length;
    lines.push(`${r.locale}: ${done}/${r.total} translated`);
    lines.push(...idList('missing', r.missing));
    lines.push(...idList('unreviewed drafts', r.unreviewed));
  }
  const incomplete = reports.filter(
    (r) => r.missing.length > 0 || r.unreviewed.length > 0,
  );
  lines.push(
    incomplete.length === 0
      ? 'All locales are complete and reviewed.'
      : `Warning: ${incomplete.map((r) => r.locale).join(', ')} need work. English shows for anything missing.`,
  );
  return lines.join('\n');
}
