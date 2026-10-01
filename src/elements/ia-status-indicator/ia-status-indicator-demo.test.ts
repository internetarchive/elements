import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IAStatusIndicator } from './ia-status-indicator';
import './ia-status-indicator-story';

/**
 * Drives the demo the way a person does -- clicking the panels' own controls --
 * and asserts what the indicator ends up rendering. The subject here is the
 * indicator's UI; the story is only the driver, so nothing reaches into the
 * settings panels' internals.
 */

type Story = HTMLElement & { updateComplete: Promise<unknown> };

async function makeStory() {
  const story = (await fixture(
    html`<ia-status-indicator-story></ia-status-indicator-story>`,
  )) as Story;
  await story.updateComplete;

  const template = story.shadowRoot?.querySelector(
    'story-template',
  ) as Story | null;
  expect(template, 'the story should render a <story-template>').to.exist;
  await (template as Story).updateComplete;

  const indicator = story.shadowRoot?.querySelector(
    'ia-status-indicator',
  ) as IAStatusIndicator;
  expect(indicator, 'the story should slot an indicator into the demo').to
    .exist;

  return { story, template: template as Story, indicator };
}

/** Lets the panels apply, the template re-render, and the indicator follow. */
async function settle(story: Story, template: Story, el: IAStatusIndicator) {
  await template.updateComplete;
  await story.updateComplete;
  await el.updateComplete;
}

function panel(template: Story, tag: string): Story {
  const found = template.shadowRoot?.querySelector(tag) as Story | null;
  expect(found, `<${tag}> should be rendered`).to.exist;
  return found as Story;
}

/** Finds a control by its visible label, so markup churn doesn't break these. */
function byLabel(host: Story, selector: string, label: string): HTMLElement {
  const match = [...(host.shadowRoot?.querySelectorAll(selector) ?? [])].find(
    (node) => node.textContent?.includes(label),
  );
  expect(match, `"${label}" should exist among ${selector}`).to.exist;
  return match as HTMLElement;
}

function radio(host: Story, value: string): HTMLInputElement {
  const input = host.shadowRoot?.querySelector<HTMLInputElement>(
    `input[type="radio"][value="${value}"]`,
  );
  expect(input, `a radio for "${value}" should exist`).to.exist;
  return input as HTMLInputElement;
}

function usageExample(template: Story): string {
  const highlighters = [
    ...(template.shadowRoot?.querySelectorAll('syntax-highlighter') ?? []),
  ] as (HTMLElement & { code: string })[];
  // import, usage, then styling once styles are applied
  return highlighters[1]?.code ?? '';
}

describe('ia-status-indicator demo', () => {
  test('a width preset resizes the indicator in one click', async () => {
    const { story, template, indicator } = await makeStory();
    const styles = panel(template, 'story-styles-settings');

    const before = indicator.getBoundingClientRect().width;
    // No Apply click: choosing a preset is meant to be a single action.
    byLabel(styles, '.style-preset', 'Theater').click();
    await settle(story, template, indicator);

    const after = indicator.getBoundingClientRect().width;
    expect(after, `width did not change from ${before}px`).to.not.equal(before);
    expect(after, 'Theater is 5rem, so 80px at the default root size').to.equal(
      80,
    );
  });

  test('choosing a mediatype swaps the glyph and the usage example', async () => {
    const { story, template, indicator } = await makeStory();
    const props = panel(template, 'story-props-settings');

    expect(
      indicator.shadowRoot?.querySelector('.ia-icon'),
      'no glyph before a mediatype is chosen',
    ).to.not.exist;

    // Radios apply on change -- no trip to Apply.
    const textsRadio = radio(props, 'texts');
    textsRadio.checked = true;
    textsRadio.dispatchEvent(new Event('change', { bubbles: true }));
    await settle(story, template, indicator);

    expect(indicator.mediatype).to.equal('texts');
    expect(
      indicator.shadowRoot?.querySelector('.ia-icon'),
      'the glyph should render once a mediatype is chosen',
    ).to.exist;
    expect(usageExample(template)).to.contain(".mediatype=${'texts'}");
  });

  test('a light loading colour puts the indicator on a dark surface', async () => {
    const { story, template, indicator } = await makeStory();
    const styles = panel(template, 'story-styles-settings');

    expect(
      getComputedStyle(indicator).backgroundColor,
      'no surface before a light colour is chosen',
    ).to.equal('rgba(0, 0, 0, 0)');

    byLabel(styles, '.style-preset', 'White').click();
    await settle(story, template, indicator);

    // White on the demo's white page would be invisible, so the surface follows
    // the colour rather than being toggled by hand.
    expect(getComputedStyle(indicator).backgroundColor).to.equal(
      'rgb(0, 0, 0)',
    );
  });

  test('reverting the styles takes the dark surface away again', async () => {
    const { story, template, indicator } = await makeStory();
    const styles = panel(template, 'story-styles-settings');

    byLabel(styles, '.style-preset', 'White').click();
    await settle(story, template, indicator);

    // Revert dispatches an empty styles string. Before that was handled, the
    // colour regex found no match and the surface stayed stuck on.
    byLabel(styles, 'button', 'Revert').click();
    await settle(story, template, indicator);

    expect(getComputedStyle(indicator).backgroundColor).to.equal(
      'rgba(0, 0, 0, 0)',
    );
  });

  test('returning a prop to its default drops it from the usage example', async () => {
    const { story, template, indicator } = await makeStory();
    const props = panel(template, 'story-props-settings');

    const setMode = async (value: string) => {
      const input = radio(props, value);
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      await settle(story, template, indicator);
    };

    await setMode('error');
    expect(
      usageExample(template),
      'precondition: a non-default prop should show in the example',
    ).to.contain(".mode=${'error'}");

    await setMode('loading');

    // Back at its default, every prop drops out and the example collapses. The
    // emitted prop string is empty here, which has to mean "show nothing"
    // rather than "nothing to do" -- otherwise the stale example sticks.
    expect(usageExample(template)).to.equal(
      '<ia-status-indicator></ia-status-indicator>',
    );
  });

  test('reset props returns the indicator to its defaults', async () => {
    const { story, template, indicator } = await makeStory();
    const props = panel(template, 'story-props-settings');

    const errorRadio = radio(props, 'error');
    errorRadio.checked = true;
    errorRadio.dispatchEvent(new Event('change', { bubbles: true }));
    await settle(story, template, indicator);
    expect(indicator.mode, 'precondition: mode moved off its default').to.equal(
      'error',
    );

    byLabel(story, 'button', 'Reset props').click();
    await settle(story, template, indicator);

    expect(indicator.mode).to.equal('loading');
    expect(indicator.mediatype).to.equal(undefined);
    expect(indicator.hideDots).to.equal(false);
    expect(
      indicator.shadowRoot?.querySelector('.loading-dots'),
      'the dots should be back',
    ).to.exist;
  });
});
