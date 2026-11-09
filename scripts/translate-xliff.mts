/**
 * Fills empty `<target>` elements in the XLIFF files.
 *
 * Translations come from a JSON file (`--from`), a map of trans-unit id to the
 * translated string with `{0}`-style tokens where the source has placeholders.
 * Already-translated units are left alone, so a re-run with nothing new writes
 * nothing. Every target it writes is a draft, marked
 * `state="needs-review-translation"` until a native speaker reviews it.
 *
 * `--export <file>` writes the pending units instead (id to source text, with
 * `{0}` tokens), which is what gets handed to a translator.
 *
 *   pnpm i18n:draft --locale es --export pending.es.json
 *   pnpm i18n:draft --locale es --from translations.es.json
 *   pnpm i18n:draft --locale es --from translations.es.json --dry-run
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

import {
  DRAFT_STATE,
  parseUnits,
  restore,
  sentinelize,
  setTarget,
  untranslated,
} from './xliff.mts';

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
    export: { type: 'string' },
    locale: { type: 'string' },
    'dry-run': { type: 'boolean', default: false },
  },
});

if (!values.locale) {
  throw new Error('--locale <locale> is required');
}
if (!values.from && !values.export) {
  throw new Error('--from <file.json> or --export <file.json> is required');
}

if (values.export) {
  const locale = checkLocale(values.locale);
  const pending = untranslated(
    parseUnits(readFileSync(xliffPath(locale), 'utf8')),
  );
  const out: Record<string, string> = {};
  for (const unit of pending) out[unit.id] = sentinelize(unit.source).text;
  writeFileSync(values.export, `${JSON.stringify(out, null, 2)}\n`);
  console.log(
    `${locale}: ${pending.length} pending units written to ${values.export}`,
  );
  process.exit(0);
}

const translations = JSON.parse(
  readFileSync(values.from as string, 'utf8'),
) as Record<string, string>;

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
      xml = setTarget(
        xml,
        unit.id,
        restore(translated, placeholders),
        DRAFT_STATE,
      );
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
