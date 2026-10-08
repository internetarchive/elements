import { fixture } from '@open-wc/testing-helpers';
import { configureLocalization } from '@lit/localize';
import { html } from 'lit';
import { afterEach, describe, expect, test } from 'vitest';

import './ia-feature-feedback';
import './ia-feature-feedback-survey';
import type { IAFeatureFeedback } from './ia-feature-feedback';
import type { IAFeatureFeedbackSurvey } from './ia-feature-feedback-survey';
import type { IAFeatureFeedbackSurveyVote } from './ia-feature-feedback-survey-vote';
import type { IAFeatureFeedbackSurveyComment } from './ia-feature-feedback-survey-comment';

// The host app configures localization once. This stands in for it.
const { setLocale } = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['es'],
  loadLocale: () => import('@src/locales/es'),
});

describe('feature feedback localization', () => {
  afterEach(async () => {
    await setLocale('en');
  });

  test('re-renders the survey in Spanish when the app switches locale', async () => {
    const el = await fixture<IAFeatureFeedbackSurvey>(html`
      <ia-feature-feedback-survey>
        <ia-feature-feedback-survey-vote
          prompt="Foo?"
        ></ia-feature-feedback-survey-vote>
        <ia-feature-feedback-survey-comment
          prompt="Bar?"
        ></ia-feature-feedback-survey-comment>
      </ia-feature-feedback-survey>
    `);
    el.shadowRoot?.querySelector<HTMLButtonElement>('#beta-button')?.click();
    await el.updateComplete;
    const vote = el.querySelector<IAFeatureFeedbackSurveyVote>(
      'ia-feature-feedback-survey-vote',
    );
    const comment = el.querySelector<IAFeatureFeedbackSurveyComment>(
      'ia-feature-feedback-survey-comment',
    );

    const text = (host: Element | null, selector: string) =>
      host?.shadowRoot?.querySelector(selector)?.textContent?.trim();
    const placeholder = () =>
      comment?.shadowRoot?.querySelector('textarea')?.placeholder;

    expect(text(el, '#button-text')).to.equal('Feedback');
    expect(text(el, '#submit-button')).to.equal('Submit feedback');

    await setLocale('es');
    await Promise.all([
      el.updateComplete,
      vote?.updateComplete,
      comment?.updateComplete,
    ]);

    expect(text(el, '#button-text')).to.equal('Comentarios');
    expect(text(el, '#survey-heading')).to.equal('Encuesta de opinión');
    expect(text(el, '#cancel-button')).to.equal('Cancelar');
    expect(text(el, '#submit-button')).to.equal('Enviar comentarios');
    expect(text(vote, '#upvote .sr-only')).to.equal('Votar a favor');
    expect(text(vote, '#downvote .sr-only')).to.equal('Votar en contra');
    expect(placeholder()).to.equal('Comentarios (opcional)');
  });

  test('re-renders the feature feedback widget in Spanish when the app switches locale', async () => {
    const el = await fixture<IAFeatureFeedback>(html`
      <ia-feature-feedback displayMode="vote-prompt"></ia-feature-feedback>
    `);
    const root = el.shadowRoot;
    const text = (selector: string) =>
      root?.querySelector(selector)?.textContent?.trim();
    const placeholder = () =>
      root?.querySelector<HTMLTextAreaElement>('#comments')?.placeholder;
    const submitValue = () =>
      root?.querySelector<HTMLInputElement>('#submit-button')?.value;

    expect(text('.prompt-text')).to.equal('Do you find this feature useful?');
    expect(text('#cancel-button')).to.equal('Cancel');

    root?.querySelector<HTMLInputElement>('#submit-button')?.click();
    await el.updateComplete;
    expect(text('#error')).to.equal('Please select a vote.');

    await setLocale('es');
    await el.updateComplete;

    expect(text('.prompt-text')).to.equal('¿Te resulta útil esta función?');
    expect(text('#comment-button')).to.equal('Deja un comentario');
    expect(text('#cancel-button')).to.equal('Cancelar');
    expect(submitValue()).to.equal('Enviar comentarios');
    expect(placeholder()).to.equal('Comentarios (opcional)');
    expect(text('#error')).to.equal('Selecciona un voto.');
  });
});
