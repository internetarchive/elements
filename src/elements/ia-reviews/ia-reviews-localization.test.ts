import { fixture, waitUntil } from '@open-wc/testing-helpers';
import { configureLocalization, str } from '@lit/localize';
import { generateMsgId } from '@lit/localize/internal/id-generation.js';
import { html } from 'lit';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { Review } from '@internetarchive/metadata-service';
import type { RecaptchaManagerInterface } from '@internetarchive/recaptcha-manager';

import type { IAReviews } from './ia-reviews';
import type { IAReview } from './ia-review';
import type { IAReviewForm } from './ia-review-form';
import './ia-reviews';
import { MockReviewService } from './mocks/mock-review-service';

/** Keys a message the way the runtime does, from its literal parts */
const id = (strings: string | string[]) => generateMsgId(strings, false);

// A stand-in catalog, keyed and shaped like the one lit-localize generates.
// Placeholders are the index of the source expression.
const templates = {
  [id(['There are ', ' reviews for this item.'])]:
    str`Hay ${0} reseñas de este elemento.`,
  [id('Display reviews')]: 'Mostrar reseñas',
  [id('Delete this review')]: 'Eliminar esta reseña',
  [id(['', ' out of 5 stars'])]: str`${0} de 5 estrellas`,
  [id(['', ' (edited)'])]: str`${0} (editada)`,
  [id('This review has been queued for deletion.')]:
    'Esta reseña está en cola para eliminarse.',
  [id('Could not validate review. Please try again later.')]:
    'No se pudo validar la reseña. Inténtalo de nuevo más tarde.',
  [id('Anonymous')]: 'Anónimo',
};

// The app configures localization, once; this file stands in for it.
const { setLocale } = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['es'],
  loadLocale: async () => ({ templates }),
});

const review = new Review({
  stars: 5,
  reviewtitle: 'What a cool book!',
  reviewbody: 'I loved it.',
  reviewer: 'Foo Bar',
  reviewdate: '03/20/2025',
  createdate: '02/07/2025',
  reviewer_itemname: '@foo-bar',
});

const textOf = (el: Element | null | undefined) =>
  el?.textContent?.replace(/\s+/g, ' ').trim();

describe('ia-reviews localization', () => {
  afterEach(async () => {
    vi.restoreAllMocks();
    await setLocale('en');
  });

  test('switches the review count already on the page', async () => {
    const el = await fixture<IAReviews>(
      html`<ia-reviews .reviews=${[review, review]}></ia-reviews>`,
    );
    const message = () => textOf(el.shadowRoot?.querySelector('.message'));
    expect(message()).toBe(
      'There are 2 reviews for this item. Display reviews.',
    );

    await setLocale('es');
    await el.updateComplete;

    expect(message()).toBe('Hay 2 reseñas de este elemento. Mostrar reseñas.');
  });

  test('switches a rendered review', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${review} ?canDelete=${true}></ia-review>`,
    );
    const stars = () =>
      el.shadowRoot?.querySelector('.review-stars')?.getAttribute('title');
    const deleteTitle = () =>
      el.shadowRoot?.querySelector('.delete-btn')?.getAttribute('title');
    const topLine = () => textOf(el.shadowRoot?.querySelector('.top-line'));
    expect(stars()).toBe('5 out of 5 stars');
    expect(deleteTitle()).toBe('Delete this review');
    expect(topLine()).toContain('February 7, 2025 (edited)');

    await setLocale('es');
    await el.updateComplete;

    expect(stars()).toBe('5 de 5 estrellas');
    expect(deleteTitle()).toBe('Eliminar esta reseña');
    expect(topLine()).toContain('February 7, 2025 (editada)');
  });

  test('resolves the delete outcome when it renders, not when the delete finishes', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const el = await fixture<IAReview>(
      html`<ia-review
        .review=${review}
        .reviewService=${new MockReviewService()}
        identifier="foo"
        ?canDelete=${true}
      ></ia-review>`,
    );
    (el.shadowRoot?.querySelector('.delete-btn') as HTMLButtonElement).click();
    await waitUntil(
      () => !!el.shadowRoot?.querySelector('.body i'),
      'the delete outcome was never reported',
    );
    const outcome = () => textOf(el.shadowRoot?.querySelector('.body i'));
    expect(outcome()).toBe('This review has been queued for deletion.');

    await setLocale('es');
    await el.updateComplete;

    expect(outcome()).toBe('Esta reseña está en cola para eliminarse.');
  });

  test('resolves the recaptcha error when it renders, not when the form is built', async () => {
    const recaptchaManager = {
      getRecaptchaWidget: () => Promise.reject(new Error('blocked')),
    } as unknown as RecaptchaManagerInterface;
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        .recaptchaManager=${recaptchaManager}
      ></ia-review-form>`,
    );
    const error = () =>
      textOf(el.shadowRoot?.querySelector('.unrecoverable-error'));
    await waitUntil(() => !!error(), 'the recaptcha error never showed');
    expect(error()).toBe('Could not validate review. Please try again later.');

    await setLocale('es');
    await el.updateComplete;

    expect(error()).toBe(
      'No se pudo validar la reseña. Inténtalo de nuevo más tarde.',
    );
  });

  test('names an anonymous submitter in the locale active at submit', async () => {
    const el = await fixture<IAReviewForm>(
      html`<ia-review-form
        identifier="foo"
        .oldReview=${new Review({
          reviewtitle: 'What a cool book!',
          reviewbody: 'I loved it.',
        })}
        .reviewService=${new MockReviewService()}
        ?bypassRecaptcha=${true}
      ></ia-review-form>`,
    );
    await setLocale('es');
    await el.updateComplete;

    const submitted = new Promise<Review>((resolve) =>
      el.addEventListener('reviewUpdated', (e) =>
        resolve((e as CustomEvent<Review>).detail),
      ),
    );
    (
      el.shadowRoot?.querySelector('ia-button.submit-btn') as HTMLElement
    ).click();

    expect((await submitted).reviewer).toBe('Anónimo');
  });
});
