import { fixture, oneEvent, elementUpdated } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { PlaybackMode } from './models';
import type { IAPlaybackControls } from './ia-playback-controls';
import './ia-playback-controls';

async function controlsFixture(): Promise<IAPlaybackControls> {
  return fixture<IAPlaybackControls>(
    html`<ia-playback-controls></ia-playback-controls>`,
  );
}

function buttonIn(el: IAPlaybackControls, id: string): HTMLButtonElement {
  const button = el.shadowRoot?.getElementById(id);
  if (!button) throw new Error(`no button with id ${id}`);
  return button as HTMLButtonElement;
}

function click(el: IAPlaybackControls, id: string): void {
  buttonIn(el, id).dispatchEvent(new MouseEvent('click'));
}

describe('IA Playback Controls', () => {
  test('defaults to paused', async () => {
    const el = await controlsFixture();

    expect(el.playbackMode).to.equal(PlaybackMode.paused);
  });

  test('switches to playing when the play/pause button is pressed', async () => {
    const el = await controlsFixture();

    click(el, 'play-pause-btn');

    expect(el.playbackMode).to.equal(PlaybackMode.playing);
  });

  test('switches back to paused when pressed again', async () => {
    const el = await controlsFixture();

    click(el, 'play-pause-btn');
    click(el, 'play-pause-btn');

    expect(el.playbackMode).to.equal(PlaybackMode.paused);
  });

  test('accepts the playback mode as an attribute', async () => {
    const el = await fixture<IAPlaybackControls>(
      html`<ia-playback-controls
        playbackMode="playing"
      ></ia-playback-controls>`,
    );

    expect(el.playbackMode).to.equal(PlaybackMode.playing);
  });

  test.each([
    ['play-pause-btn', 'play-pause-button-pressed'],
    ['back-btn', 'back-button-pressed'],
    ['forward-btn', 'forward-button-pressed'],
    ['prev-section-btn', 'prev-section-button-pressed'],
    ['next-section-btn', 'next-section-button-pressed'],
    ['playback-rate-btn', 'playbackRateChange'],
    ['volume-control-btn', 'volumeChange'],
  ])('pressing %s emits %s', async (id, eventName) => {
    const el = await controlsFixture();

    setTimeout(() => click(el, id));

    expect(await oneEvent(el, eventName)).to.exist;
  });

  test('steps the playback rate up by 0.25', async () => {
    const el = await controlsFixture();

    click(el, 'playback-rate-btn');

    expect(el.playbackRate).to.equal(1.25);
  });

  test('wraps the playback rate back to 0.5 once it passes 2', async () => {
    const el = await fixture<IAPlaybackControls>(
      html`<ia-playback-controls playbackRate="2.0"></ia-playback-controls>`,
    );

    click(el, 'playback-rate-btn');

    expect(el.playbackRate).to.equal(0.5);
  });

  test('wraps a playback rate set above the maximum rather than climbing', async () => {
    const el = await fixture<IAPlaybackControls>(
      html`<ia-playback-controls playbackRate="3.1"></ia-playback-controls>`,
    );

    click(el, 'playback-rate-btn');

    expect(el.playbackRate).to.equal(0.5);
  });

  test('never steps the playback rate above the maximum', async () => {
    const el = await fixture<IAPlaybackControls>(
      html`<ia-playback-controls playbackRate="1.9"></ia-playback-controls>`,
    );

    click(el, 'playback-rate-btn');

    expect(el.playbackRate).to.equal(2);
  });

  test('reports the new playback rate on the event', async () => {
    const el = await controlsFixture();

    setTimeout(() => click(el, 'playback-rate-btn'));

    const { detail } = await oneEvent(el, 'playbackRateChange');
    expect(detail.playbackRate).to.equal(1.25);
  });

  test('steps the volume up by 0.25 when below full', async () => {
    const el = await fixture<IAPlaybackControls>(
      html`<ia-playback-controls volume="0.5"></ia-playback-controls>`,
    );

    click(el, 'volume-control-btn');

    expect(el.volume).to.equal(0.75);
  });

  test('wraps the volume round to muted once it is full', async () => {
    const el = await controlsFixture();

    click(el, 'volume-control-btn');

    expect(el.volume).to.equal(0);
  });

  test('never steps the volume above 1', async () => {
    const el = await fixture<IAPlaybackControls>(
      html`<ia-playback-controls volume="0.9"></ia-playback-controls>`,
    );

    click(el, 'volume-control-btn');

    expect(el.volume).to.equal(1);
  });

  test('reports the new volume on the event', async () => {
    const el = await fixture<IAPlaybackControls>(
      html`<ia-playback-controls volume="0.25"></ia-playback-controls>`,
    );

    setTimeout(() => click(el, 'volume-control-btn'));

    const { detail } = await oneEvent(el, 'volumeChange');
    expect(detail.volume).to.equal(0.5);
  });

  test('shows the playback rate and volume as text', async () => {
    const el = await fixture<IAPlaybackControls>(
      html`<ia-playback-controls
        playbackRate="1.5"
        volume="0.75"
      ></ia-playback-controls>`,
    );

    const values = el.shadowRoot?.querySelectorAll('.vertical-button-value');
    expect(values?.[0].textContent?.trim()).to.equal('1.5x');
    expect(values?.[1].textContent?.trim()).to.equal('75%');
  });

  test('labels the play/pause button for its current state', async () => {
    const el = await controlsFixture();

    expect(buttonIn(el, 'play-pause-btn').getAttribute('aria-label')).to.equal(
      'Play',
    );

    el.playbackMode = PlaybackMode.playing;
    await elementUpdated(el);

    expect(buttonIn(el, 'play-pause-btn').getAttribute('aria-label')).to.equal(
      'Pause',
    );
  });

  test('labels the speed button without a unit that needs pluralising', async () => {
    const el = await controlsFixture();

    // At the default rate of 1, any trailing "times" would read as "1 times",
    // and @lit/localize has no plural support to fix it per language.
    expect(
      buttonIn(el, 'playback-rate-btn').getAttribute('aria-label'),
    ).to.equal('Playback speed, currently 1');

    el.playbackRate = 1.5;
    await elementUpdated(el);

    expect(
      buttonIn(el, 'playback-rate-btn').getAttribute('aria-label'),
    ).to.equal('Playback speed, currently 1.5');
  });

  test('labels the volume button with its current percentage', async () => {
    const el = await fixture<IAPlaybackControls>(
      html`<ia-playback-controls volume="0.75"></ia-playback-controls>`,
    );

    expect(
      buttonIn(el, 'volume-control-btn').getAttribute('aria-label'),
    ).to.equal('Volume, currently 75 percent');
  });

  test('gives every button an accessible name', async () => {
    const el = await controlsFixture();

    const buttons = el.shadowRoot?.querySelectorAll('button') ?? [];
    expect(buttons.length).to.equal(7);
    for (const button of buttons) {
      expect(button.getAttribute('aria-label')).to.be.a('string').and.not.empty;
    }
  });

  test('shows the muted icon at zero volume and the full icon at full', async () => {
    const el = await controlsFixture();

    // Full volume by default.
    expect(
      el.shadowRoot?.querySelector(
        '#volume-control-btn svg path[stroke-opacity]',
      ),
    ).to.not.exist;

    el.volume = 0;
    await elementUpdated(el);
    const mutedPolygon = el.shadowRoot?.querySelector(
      '#volume-control-btn svg polygon',
    );
    expect(mutedPolygon).to.exist;

    // The partial icon is the one with the faded outer arc.
    el.volume = 0.5;
    await elementUpdated(el);
    expect(
      el.shadowRoot?.querySelector(
        '#volume-control-btn svg path[stroke-opacity]',
      ),
    ).to.exist;
  });
});
