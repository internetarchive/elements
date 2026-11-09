/**
 * Lists the missing and unreviewed translations for every target locale.
 * Warns only: it always exits 0, since lit-localize falls back to English.
 *
 *   pnpm i18n:status
 */
import { readFileSync } from 'node:fs';

import { formatReports, localeReport } from './i18n-report.mts';

type Config = {
  targetLocales: string[];
  interchange?: { xliffDir?: string };
};

const config = JSON.parse(readFileSync('lit-localize.json', 'utf8')) as Config;
const dir = (config.interchange?.xliffDir ?? './xliff').replace(/\/$/, '');

const reports = config.targetLocales.map((locale) =>
  localeReport(locale, readFileSync(`${dir}/${locale}.xlf`, 'utf8')),
);
console.log(formatReports(reports));
