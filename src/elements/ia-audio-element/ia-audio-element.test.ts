import { fixture, oneEvent, elementUpdated } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { AudioSource } from './models';
import type { IAAudioElement } from './ia-audio-element';
import './ia-audio-element';

const arrowOgg = new URL('./assets/arrow.ogg', import.meta.url).href;
const arrowMp3 = new URL('./assets/arrow.mp3', import.meta.url).href;
const springOgg = new URL('./assets/spring.ogg', import.meta.url).href;
const springMp3 = new URL('./assets/spring.mp3', import.meta.url).href;

const ARROW_SOURCES: AudioSource[] = [
  { url: arrowOgg, mimetype: 'audio/ogg' },
  { url: arrowMp3, mimetype: 'audio/mpeg' },
];

const SPRING_SOURCES: AudioSource[] = [
  { url: springOgg, mimetype: 'audio/ogg' },
  { url: springMp3, mimetype: 'audio/mpeg' },
];

/** Renders an audio element preloaded with the `arrow` sources. */
async function arrowFixture(): Promise<IAAudioElement> {
  return fixture<IAAudioElement>(
    html`<ia-audio-element .sources=${ARROW_SOURCES}></ia-audio-element>`,
  );
}

describe('IA Audio Element', () => {
  test('does not have any sources by default', async () => {
    const el = await fixture<IAAudioElement>(
      html`<ia-audio-element></ia-audio-element>`,
    );

    const sources = el.shadowRoot?.querySelectorAll('source');
    expect(sources?.length).to.equal(0);
  });

  test('configures sources properly when they are provided', async () => {
    const el = await arrowFixture();

    const sources = el.shadowRoot?.querySelectorAll('source');
    expect(sources?.length).to.equal(2);
    expect(sources?.[0].src.endsWith('arrow.ogg')).to.be.true;
    expect(sources?.[1].src.endsWith('arrow.mp3')).to.be.true;
  });

  test('emits `playbackStarted` when audio starts playing', async () => {
    const el = await arrowFixture();

    // Fired from a timeout so the listener below is attached before play starts
    setTimeout(() => el.play());

    expect(await oneEvent(el, 'playbackStarted')).to.exist;
  });

  test('emits `playbackPaused` when audio gets paused', async () => {
    const el = await arrowFixture();
    el.play();

    setTimeout(() => el.pause());

    expect(await oneEvent(el, 'playbackPaused')).to.exist;
  });

  test('emits `canplay` when the audio is ready to play', async () => {
    const el = await arrowFixture();

    setTimeout(() => el.play());

    expect(await oneEvent(el, 'canplay')).to.exist;
  });

  test('emits `timeupdate` with the current time as playback progresses', async () => {
    const el = await arrowFixture();

    setTimeout(() => el.play());

    const event = await oneEvent(el, 'timeupdate');
    expect(event.detail.currentTime).to.be.a('number');
  });

  test('emits `durationchange` with the duration once it is known', async () => {
    const el = await fixture<IAAudioElement>(
      html`<ia-audio-element></ia-audio-element>`,
    );
    el.sources = SPRING_SOURCES;

    setTimeout(() => el.load());

    const event = await oneEvent(el, 'durationchange');
    expect(event.detail.duration).to.be.closeTo(1.05, 0.1);
  });

  test('shows controls if set', async () => {
    const el = await fixture<IAAudioElement>(
      html`<ia-audio-element showControls></ia-audio-element>`,
    );

    expect(el.shadowRoot?.querySelector('audio')?.controls).to.be.true;
  });

  test('does not show controls by default', async () => {
    const el = await fixture<IAAudioElement>(
      html`<ia-audio-element></ia-audio-element>`,
    );

    expect(el.shadowRoot?.querySelector('audio')?.controls).to.be.false;
  });

  test('can set the volume properly', async () => {
    const el = await fixture<IAAudioElement>(
      html`<ia-audio-element></ia-audio-element>`,
    );

    el.volume = 0.5;
    await elementUpdated(el);

    expect(el.shadowRoot?.querySelector('audio')?.volume).to.equal(0.5);
  });

  test('can set the playback rate properly', async () => {
    const el = await fixture<IAAudioElement>(
      html`<ia-audio-element></ia-audio-element>`,
    );

    el.playbackRate = 2;
    await elementUpdated(el);

    expect(el.shadowRoot?.querySelector('audio')?.playbackRate).to.equal(2);
  });

  test('can load the track', async () => {
    const el = await arrowFixture();

    setTimeout(() => el.load());

    expect(await oneEvent(el, 'canplay')).to.exist;
  });

  test('reapplies the playback rate after loading, since loading resets it', async () => {
    const el = await fixture<IAAudioElement>(
      html`<ia-audio-element
        .sources=${ARROW_SOURCES}
        playbackRate="2"
      ></ia-audio-element>`,
    );

    setTimeout(() => el.load());
    await oneEvent(el, 'canplay');

    expect(el.shadowRoot?.querySelector('audio')?.playbackRate).to.equal(2);
  });

  test('can seek to a time in the track', async () => {
    const el = await arrowFixture();

    el.seekTo(0.7);

    expect(el.currentTime).to.equal(0.7);
  });

  test('can seek by a time offset in the track', async () => {
    const el = await arrowFixture();

    el.seekBy(0.2);

    expect(el.currentTime).to.equal(0.2);
  });

  test('returns the proper duration for tracks', async () => {
    const el = await fixture<IAAudioElement>(
      html`<ia-audio-element></ia-audio-element>`,
    );
    el.sources = SPRING_SOURCES;

    setTimeout(() => el.load());
    await oneEvent(el, 'durationchange');

    // `spring.mp3` is ~1.05s, but MP3 containers carry no reliable duration, so
    // browsers estimate it and different Chrome versions land on slightly
    // different values. Assert with a tolerance rather than exact equality.
    expect(el.duration).to.be.closeTo(1.05, 0.1);
  });

  test('reports duration as NaN until the metadata has loaded', async () => {
    const el = await fixture<IAAudioElement>(
      html`<ia-audio-element .sources=${SPRING_SOURCES}></ia-audio-element>`,
    );

    // The browser has not read the track's metadata yet, and `duration`
    // follows `HTMLMediaElement.duration` rather than flattening to 0.
    expect(el.duration).to.be.NaN;
  });

  test('emits `error` once every source has failed', async () => {
    const el = await fixture<IAAudioElement>(
      html`<ia-audio-element></ia-audio-element>`,
    );
    el.sources = [
      { url: './assets/does-not-exist.ogg', mimetype: 'audio/ogg' },
      { url: './assets/does-not-exist.mp3', mimetype: 'audio/mpeg' },
    ];
    await elementUpdated(el);

    setTimeout(() => el.load());

    const event = await oneEvent(el, 'error');
    // Exhausting `<source>` candidates leaves no MediaError behind.
    expect(event.detail.error).to.be.null;
  });

  test('does not emit `error` while a working fallback source remains', async () => {
    const el = await fixture<IAAudioElement>(
      html`<ia-audio-element></ia-audio-element>`,
    );
    el.sources = [
      { url: './assets/does-not-exist.ogg', mimetype: 'audio/ogg' },
      { url: springMp3, mimetype: 'audio/mpeg' },
    ];
    await elementUpdated(el);

    let errored = false;
    el.addEventListener('error', () => {
      errored = true;
    });

    setTimeout(() => el.load());
    await oneEvent(el, 'canplay');

    expect(errored).to.be.false;
  });

  test('returns 0 for duration and currentTime before anything renders', async () => {
    const el = document.createElement('ia-audio-element') as IAAudioElement;

    expect(el.duration).to.equal(0);
    expect(el.currentTime).to.equal(0);
  });

  test('returns the proper currentTime', async () => {
    const el = await fixture<IAAudioElement>(
      html`<ia-audio-element></ia-audio-element>`,
    );
    el.sources = SPRING_SOURCES;

    el.seekTo(0.75);

    expect(el.currentTime).to.equal(0.75);
  });

  test('can change tracks', async () => {
    const el = await arrowFixture();

    el.sources = SPRING_SOURCES;
    await elementUpdated(el);

    const sources = el.shadowRoot?.querySelectorAll('source');
    expect(sources?.length).to.equal(2);
    expect(sources?.[0].src.endsWith('spring.ogg')).to.be.true;
    expect(sources?.[1].src.endsWith('spring.mp3')).to.be.true;
  });
});
