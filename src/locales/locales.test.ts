import { fixture } from '@open-wc/testing-helpers';
import { configureLocalization } from '@lit/localize';
import { html } from 'lit';
import { afterEach, describe, expect, test } from 'vitest';

import xliff from '../../xliff/es.xlf?raw';
import { templates } from './es';
import type { IAPlaybackControls } from '@src/elements/ia-playback-controls/ia-playback-controls';
import '@src/elements/ia-playback-controls/ia-playback-controls';
import type { IAStatusIndicator } from '@src/elements/ia-status-indicator/ia-status-indicator';
import '@src/elements/ia-status-indicator/ia-status-indicator';
import type { IATranscriptEntry } from '@src/elements/ia-transcript-view/ia-transcript-entry';
import '@src/elements/ia-transcript-view/ia-transcript-entry';
import { TranscriptEntryConfig } from '@src/elements/ia-transcript-view/models';

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

function titleOf(el: IAStatusIndicator): string | null {
  return el.shadowRoot?.querySelector('title')?.textContent ?? null;
}

describe('published es locale', () => {
  afterEach(async () => {
    await setLocale('en');
  });

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

  test('switches an element already on the page', async () => {
    const controls = await fixture<IAPlaybackControls>(
      html`<ia-playback-controls></ia-playback-controls>`,
    );
    // The default title is resolved when it renders, not when the element is
    // created, so it follows the locale too.
    const indicator = await fixture<IAStatusIndicator>(
      html`<ia-status-indicator mode="loading"></ia-status-indicator>`,
    );
    // Its text comes from a model getter, so the entry has to re-render itself.
    const music = await fixture<IATranscriptEntry>(
      html`<ia-transcript-entry
        .entry=${new TranscriptEntryConfig(1, 0, 5, '', true)}
      ></ia-transcript-entry>`,
    );
    expect(labelOf(controls, 'back-btn')).toBe('Skip back ten seconds');
    expect(titleOf(indicator)).toBe('Loading...');
    expect(music.shadowRoot?.textContent).toBe('[Transcript unavailable]');

    await setLocale('es');
    await controls.updateComplete;
    await indicator.updateComplete;
    await music.updateComplete;

    expect(labelOf(controls, 'back-btn')).toBe('Retroceder diez segundos');
    expect(titleOf(indicator)).toBe('Cargando...');
    expect(music.shadowRoot?.textContent).toBe('[Transcripción no disponible]');
  });
});
