/**
 * Pure XLIFF helpers for `strings:translate`.
 *
 * Everything here is deliberately free of network and filesystem access so the
 * risky part, keeping placeholders intact, can be tested on its own.
 */

/** A `<trans-unit>` as it appears in the file. */
export type TransUnit = {
  id: string;
  /** Inner XML of `<source>`: escaped text plus self-closing `<x/>` tags. */
  source: string;
  /** Inner XML of `<target>`, or undefined when the unit has no target. */
  target?: string;
  /** The `state` attribute on `<target>`, when it has one. */
  state?: string;
  /** The whole `<trans-unit>…</trans-unit>` block, verbatim. */
  block: string;
};

const UNIT_RE =
  /<trans-unit\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/trans-unit>/g;
const SOURCE_RE = /<source>([\s\S]*?)<\/source>/;
const TARGET_RE = /<target(?:\s([^>]*))?>([\s\S]*?)<\/target>/;
const STATE_RE = /\bstate="([^"]*)"/;

/** The state a drafted translation carries until a native speaker reviews it. */
export const DRAFT_STATE = 'needs-review-translation';

/** Every `<trans-unit>` in document order. */
export function parseUnits(xml: string): TransUnit[] {
  const units: TransUnit[] = [];
  for (const m of xml.matchAll(UNIT_RE)) {
    const inner = m[2];
    const source = SOURCE_RE.exec(inner);
    const target = TARGET_RE.exec(inner);
    units.push({
      id: m[1],
      source: source ? source[1] : '',
      target: target ? target[2] : undefined,
      state: target ? STATE_RE.exec(target[1] ?? '')?.[1] : undefined,
      block: m[0],
    });
  }
  return units;
}

/** Units still needing a translation: no `<target>`, or an empty one. */
export function untranslated(units: TransUnit[]): TransUnit[] {
  return units.filter((u) => (u.target ?? '').trim() === '');
}

/** Translated units still marked as drafts, waiting on a native reviewer. */
export function needsReview(units: TransUnit[]): TransUnit[] {
  return units.filter(
    (u) => (u.target ?? '').trim() !== '' && u.state === DRAFT_STATE,
  );
}

/** A placeholder lifted out of a source string. */
export type Placeholder = { token: string; xml: string };

export type Sentinelized = {
  /** Plain text safe to hand to a translator, placeholders as `{0}`, `{1}`… */
  text: string;
  placeholders: Placeholder[];
};

const X_TAG_RE = /<x\b[^>]*\/>/g;

const ENTITIES: [RegExp, string][] = [
  [/&lt;/g, '<'],
  [/&gt;/g, '>'],
  [/&quot;/g, '"'],
  [/&apos;/g, "'"],
  [/&amp;/g, '&'],
];

function unescapeXml(s: string): string {
  return ENTITIES.reduce((acc, [re, ch]) => acc.replace(re, ch), s);
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Swaps each `<x/>` placeholder for a `{n}` token and unescapes the rest, so a
 * translator sees plain prose and never has a chance to rewrite the markup.
 */
export function sentinelize(source: string): Sentinelized {
  const placeholders: Placeholder[] = [];
  const text = source.replace(X_TAG_RE, (xml) => {
    const token = `{${placeholders.length}}`;
    placeholders.push({ token, xml });
    return token;
  });
  return { text: unescapeXml(text), placeholders };
}

/**
 * Puts the original `<x/>` tags back into a translated string.
 *
 * Throws when a token went missing or gained a duplicate, which is the signal
 * to leave that unit untranslated rather than write a corrupted target.
 */
export function restore(
  translated: string,
  placeholders: Placeholder[],
): string {
  let out = escapeXml(translated);
  for (const { token, xml } of placeholders) {
    const hits = out.split(token).length - 1;
    if (hits !== 1) {
      throw new Error(
        `placeholder ${token} appears ${hits} times, expected once`,
      );
    }
    // A replacer function, so a `$` in the placeholder XML is inserted rather
    // than read as a replacement pattern.
    out = out.replace(token, () => xml);
  }
  return out;
}

/**
 * Returns `xml` with the given unit's target set, adding a `<target>` when the
 * unit has none. Other units are untouched, so already-translated strings and
 * the rest of the file survive byte for byte. A `state` is written as the
 * target's `state` attribute.
 */
export function setTarget(
  xml: string,
  id: string,
  target: string,
  state?: string,
): string {
  const units = parseUnits(xml);
  const unit = units.find((u) => u.id === id);
  if (!unit) throw new Error(`no trans-unit with id ${id}`);

  // Replacer functions throughout, so a `$` in the translation is inserted
  // rather than read as a replacement pattern (`$1`, `$&`, `` $` ``, `$'`).
  const open = state === undefined ? '<target>' : `<target state="${state}">`;
  const updated =
    unit.target === undefined
      ? unit.block.replace(
          /<source>[\s\S]*?<\/source>/,
          (source) => `${source}\n${open}${target}</target>`,
        )
      : unit.block.replace(TARGET_RE, () => `${open}${target}</target>`);

  return xml.replace(unit.block, () => updated);
}
