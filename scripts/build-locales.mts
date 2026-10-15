/**
 * Builds the published locale modules, `src/locales/<locale>.ts`, from the
 * XLIFF files in `xliff/`.
 *
 * This is `lit-localize build` in runtime mode with one change: only messages
 * that have a translation are written. The app merges these modules with its
 * own, and a message with no translation has to be absent rather than present
 * as English, or it would override a real translation of the same text from
 * somewhere else.
 *
 * Only the app calls `configureLocalization`. This package never does.
 */
import { readConfigFileAndWriteSchema } from '@lit/localize-tools/lib/config.js';
import type { Message } from '@lit/localize-tools/lib/messages.js';
import { RuntimeLitLocalizer } from '@lit/localize-tools/lib/modes/runtime.js';
import type { RuntimeOutputConfig } from '@lit/localize-tools/lib/types/modes.js';
import type { Config } from '@lit/localize-tools/lib/types/config.js';
import type { Locale } from '@lit/localize-tools/lib/types/locale.js';

type RuntimeConfig = Config & { output: RuntimeOutputConfig };

/** A target that is missing or blank is not a translation. */
function isTranslated(message: Message): boolean {
  return message.contents.some(
    (part) => typeof part !== 'string' || part.trim() !== '',
  );
}

class TranslatedOnlyLocalizer extends RuntimeLitLocalizer {
  private readonly locale: Locale;

  constructor(config: RuntimeConfig, locale: Locale) {
    super({ ...config, targetLocales: [locale] });
    this.locale = locale;
  }

  private translatedNames(): Set<string> {
    const messages = super.readTranslationsSync().translations.get(this.locale);
    return new Set(
      (messages ?? []).filter(isTranslated).map((message) => message.name),
    );
  }

  override readTranslationsSync(): ReturnType<
    RuntimeLitLocalizer['readTranslationsSync']
  > {
    const { translations } = super.readTranslationsSync();
    const translated = this.translatedNames();
    const messages = (translations.get(this.locale) ?? []).filter((message) =>
      translated.has(message.name),
    );
    return { translations: new Map([[this.locale, messages]]) };
  }

  override extractSourceMessages(): ReturnType<
    RuntimeLitLocalizer['extractSourceMessages']
  > {
    const { messages, errors } = super.extractSourceMessages();
    const translated = this.translatedNames();
    return {
      messages: messages.filter((message) => translated.has(message.name)),
      errors,
    };
  }
}

const config = readConfigFileAndWriteSchema('lit-localize.json');
if (config.output.mode !== 'runtime') {
  throw new Error('lit-localize.json output.mode has to be "runtime"');
}

for (const locale of config.targetLocales) {
  const localizer = new TranslatedOnlyLocalizer(
    config as RuntimeConfig,
    locale,
  );
  const { errors } = localizer.extractSourceMessages();
  if (errors.length > 0) {
    throw new Error(
      `${errors.length} msg() call(s) could not be analyzed, run lit-localize extract to see them`,
    );
  }
  const { errors: placeholderErrors } = localizer.validateTranslations();
  if (placeholderErrors.length > 0) {
    throw new Error(placeholderErrors.join('\n'));
  }
  await localizer.build();
  const count =
    localizer.readTranslationsSync().translations.get(locale)?.length ?? 0;
  console.log(`${locale}: ${count} translated messages`);
}
