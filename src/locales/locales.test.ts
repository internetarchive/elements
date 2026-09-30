import { fixture } from '@open-wc/testing-helpers';
import { configureLocalization } from '@lit/localize';
import { html } from 'lit';
import { describe, expect, test } from 'vitest';

import xliff from '../../xliff/es.xlf?raw';
import { templates } from './es';
import type { IAPlaybackControls } from '@src/elements/ia-playback-controls/ia-playback-controls';
import '@src/elements/ia-playback-controls/ia-playback-controls';

// This package never configures localization. The app that uses it does, once,
// and this file stands in for that app.
const { setLocale } = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['es'],
  loadLocale: () => import('./es'),
});

/** Units in the XLIFF with a non-blank target. */
const translatedIds = [
  ...xliff.matchAll(/<trans-unit id="([^"]+)"[^>]*>([\s\S]*?)<\/trans-unit>/g),
]
  .filter(([, , unit]) => {
    const target = /<target>([\s\S]*?)<\/target>/.exec(unit);
    return target !== null && target[1].trim() !== '';
  })
  .map(([, id]) => id);

function labelOf(el: IAPlaybackControls, id: string): string | null {
  return el.shadowRoot?.getElementById(id)?.getAttribute('aria-label') ?? null;
}

describe('published es locale', () => {
  test('has exactly the translated units in the XLIFF', () => {
    // An untranslated message has to be missing, not English. The app merges
    // this module with others, and an English entry would override a real
    // translation of the same text.
    expect(Object.keys(templates).sort()).toEqual([...translatedIds].sort());
  });

  test('renders an element in Spanish once the app sets the locale', async () => {
    await setLocale('es');
    const el = await fixture<IAPlaybackControls>(
      html`<ia-playback-controls .volume=${0.5}></ia-playback-controls>`,
    );

    expect(labelOf(el, 'back-btn')).toBe('Retroceder diez segundos');
    expect(labelOf(el, 'volume-control-btn')).toBe(
      'Volumen, actualmente al 50 por ciento',
    );
  });
});
