/**
 * Fills empty `<target>` elements in the XLIFF files.
 *
 * Translations come from a JSON file (`--from`), a map of trans-unit id to the
 * translated string with `{0}`-style tokens where the source has placeholders.
 * Already-translated units are left alone, so a re-run with nothing new writes
 * nothing.
 *
 *   pnpm strings:translate --from translations.es.json
 *   pnpm strings:translate --from translations.es.json --locale es --dry-run
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

import { parseUnits, restore, sentinelize, setTarget, untranslated } from './xliff.mts';

type Config = {
  targetLocales: string[];
  interchange?: { xliffDir?: string };
};

function xliffPath(locale: string): string {
  const config = JSON.parse(
    readFileSync('lit-localize.json', 'utf8'),
  ) as Config;
  const dir = config.interchange?.xliffDir ?? './xliff';
  return `${dir.replace(/\/$/, '')}/${locale}.xlf`;
}

/**
 * The locale to write, which has to be named: a translation file carries no
 * locale of its own, so defaulting to every target would write one language's
 * strings into another language's file.
 */
function checkLocale(requested: string): string {
  const config = JSON.parse(
    readFileSync('lit-localize.json', 'utf8'),
  ) as Config;
  if (!config.targetLocales.includes(requested)) {
    throw new Error(
      `${requested} is not in targetLocales (${config.targetLocales.join(', ')})`,
    );
  }
  return requested;
}

const { values } = parseArgs({
  options: {
    from: { type: 'string' },
    locale: { type: 'string' },
    'dry-run': { type: 'boolean', default: false },
  },
});

if (!values.from) {
  throw new Error('--from <file.json> is required');
}
if (!values.locale) {
  throw new Error('--locale <locale> is required');
}
const translations = JSON.parse(readFileSync(values.from, 'utf8')) as Record<
  string,
  string
>;

for (const locale of [checkLocale(values.locale)]) {
  const path = xliffPath(locale);
  let xml = readFileSync(path, 'utf8');
  const pending = untranslated(parseUnits(xml));

  let written = 0;
  const skipped: string[] = [];
  const missing: string[] = [];

  for (const unit of pending) {
    const translated = translations[unit.id];
    // An empty target renders as an empty string rather than falling back to
    // the source, so a blank translation counts as missing.
    if (translated === undefined || translated.trim() === '') {
      missing.push(unit.id);
      continue;
    }
    const { placeholders } = sentinelize(unit.source);
    try {
      xml = setTarget(xml, unit.id, restore(translated, placeholders));
      written += 1;
    } catch (err) {
      // A lost or duplicated placeholder would corrupt the target, so the unit
      // stays untranslated and gets reported instead.
      skipped.push(`${unit.id}: ${(err as Error).message}`);
    }
  }

  if (!values['dry-run']) writeFileSync(path, xml);

  const prefix = values['dry-run'] ? '[dry run] ' : '';
  console.log(
    `${prefix}${locale}: ${written} filled, ${missing.length} without a translation, ${skipped.length} skipped`,
  );
  for (const s of skipped) console.log(`  skipped ${s}`);
}
