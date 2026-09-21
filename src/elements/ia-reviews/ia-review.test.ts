import { fixture, waitUntil } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test, vi } from 'vitest';
import axe from 'axe-core';
import { html } from 'lit';

import type { IAReview } from './ia-review';
import { Review } from '@internetarchive/metadata-service';
import './ia-review';

const mockReview: Review = new Review({
  stars: 5,
  reviewtitle: 'What a cool book!',
  reviewbody: 'I loved it.',
  reviewer: 'Foo Bar',
  reviewdate: '03/20/2025',
  createdate: '02/07/2025',
  reviewer_itemname: '@foo-bar',
});

describe('IAReview', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('passes the a11y audit', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const { violations } = await axe.run(el);
    expect(violations).toEqual([]);
  });

  test('renders an error if no review provided', async () => {
    const el = await fixture<IAReview>(html`<ia-review></ia-review>`);

    const error = el.shadowRoot?.querySelector('.error');
    expect(error).to.exist;
  });

  test('generates the correct Dom ID for the review', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const review = el.shadowRoot?.querySelector('.review');
    expect(review?.id).to.contain('review-1738');
  });

  test('always renders the reviewer screenname', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const topLine = el.shadowRoot?.querySelector('.top-line');
    expect(topLine?.textContent).to.contain('Foo Bar');
  });

  test('truncates the reviewer screenname if more than 40 characters', async () => {
    const longScreennameReview = new Review({
      reviewer: 'Foo Bar 123456789123456789123456789123456789',
    });

    const el = await fixture<IAReview>(
      html`<ia-review .review=${longScreennameReview}></ia-review>`,
    );

    const topLine = el.shadowRoot?.querySelector('.top-line');
    expect(topLine?.textContent).to.contain(
      'Foo Bar 12345678912345678912345678912345...',
    );
  });

  test('adds a link to the reviewer details page if itemname provided', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const reviewerLink = el.shadowRoot?.querySelector(
      '.reviewer-link',
    ) as HTMLAnchorElement;
    expect(reviewerLink?.href).to.contain('/details/@foo-bar');
  });

  test('uses a custom basehost for the reviewer details link if requested', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review
        .review=${mockReview}
        .baseHost=${'foo.archive.org'}
      ></ia-review>`,
    );

    const reviewerLink = el.shadowRoot?.querySelector(
      '.reviewer-link',
    ) as HTMLAnchorElement;
    expect(reviewerLink?.href).to.contain('foo.archive.org/details/@foo-bar');
  });

  test('defaults to archive.org if no custom host requested', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const reviewerLink = el.shadowRoot?.querySelector(
      '.reviewer-link',
    ) as HTMLAnchorElement;
    expect(reviewerLink?.href).to.contain(
      'https://archive.org/details/@foo-bar',
    );
  });

  test('does not add a link to the reviewer details page if itemname not provided', async () => {
    const reviewNoItemname = new Review({ reviewtitle: 'test' });

    const el = await fixture<IAReview>(
      html`<ia-review .review=${reviewNoItemname}></ia-review>`,
    );

    const reviewerLink = el.shadowRoot?.querySelector('.reviewer-link');
    expect(reviewerLink).to.be.null;
  });

  test('adds the correct number of stars, if provided', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const reviewStars = el.shadowRoot?.querySelectorAll('.review-star');
    expect(reviewStars?.length).to.equal(5);
  });

  test('adds a title with the number of stars', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const reviewStarSection = el.shadowRoot?.querySelector(
      '.review-stars',
    ) as HTMLDivElement;
    expect(reviewStarSection?.title).to.equal('5 out of 5 stars');
  });

  test('includes a prettified version of the create date', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const topLine = el.shadowRoot?.querySelector('.top-line');
    expect(topLine?.textContent).to.contain('February 7, 2025');
  });

  test('adds (edited) if the review date differs from the create date', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const topLine = el.shadowRoot?.querySelector('.top-line');
    expect(topLine?.textContent).to.contain('February 7, 2025 (edited)');
  });

  test('does not add (edited) if the review date does not differ from the create date', async () => {
    const uneditedReview = {
      rawValue: new Review({ stars: 5 }),
      stars: 5,
      reviewtitle: 'What a cool book!',
      reviewbody: 'I loved it.',
      reviewer: 'Foo Bar',
      reviewdate: new Date('02/07/2025'),
      createdate: new Date('02/07/2025'),
      reviewer_itemname: 'foo-bar',
    };

    const el = await fixture<IAReview>(
      html`<ia-review .review=${uneditedReview}></ia-review>`,
    );

    const topLine = el.shadowRoot?.querySelector('.top-line');
    expect(topLine?.textContent).to.contain('February 7, 2025');
    expect(topLine?.textContent).not.to.contain('(edited)');
  });

  test('renders the review subject', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const subject = el.shadowRoot?.querySelector('.subject');
    expect(subject?.textContent).to.contain('What a cool book!');
  });

  test('renders the review body', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const body = el.shadowRoot?.querySelector('.body');
    expect(body?.textContent).to.contain('I loved it.');
  });

  test('truncates the review subject if too long', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review
        .review=${mockReview}
        .maxSubjectLength=${6}
      ></ia-review>`,
    );

    const subject = el.shadowRoot?.querySelector('.subject');
    expect(subject?.textContent).to.contain('What a...');
  });

  test('truncates the review body if too long', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview} .maxBodyLength=${6}></ia-review>`,
    );

    const body = el.shadowRoot?.querySelector('.body');
    expect(body?.textContent).to.contain('I loved...');
  });

  test('can skip truncation if requested', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review
        .review=${mockReview}
        .maxSubjectLength=${6}
        .maxBodyLength=${6}
        ?bypassTruncation=${true}
      ></ia-review>`,
    );

    const subject = el.shadowRoot?.querySelector('.subject');
    expect(subject?.textContent).to.contain('What a cool book!');
    const body = el.shadowRoot?.querySelector('.body');
    expect(body?.textContent).to.contain('I loved it.');
  });

  test('shows a more button if subject/body are truncated', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review
        .review=${mockReview}
        .maxSubjectLength=${6}
        .maxBodyLength=${7}
      ></ia-review>`,
    );

    const moreBtn = el.shadowRoot?.querySelector('.more-btn');
    expect(moreBtn).to.exist;
  });

  test('does not show a more button if subject/body are not truncated', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const moreBtn = el.shadowRoot?.querySelector('.more-btn');
    expect(moreBtn).not.to.exist;
  });

  test('does not show a more button if truncation is bypassed', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review
        .review=${mockReview}
        .maxSubjectLength=${6}
        .maxBodyLength=${6}
        ?bypassTruncation=${true}
      ></ia-review>`,
    );

    const moreBtn = el.shadowRoot?.querySelector('.more-btn');
    expect(moreBtn).not.to.exist;
  });

  test('expands text on more button click', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review
        .review=${mockReview}
        .maxSubjectLength=${6}
        .maxBodyLength=${7}
      ></ia-review>`,
    );

    const subject = el.shadowRoot?.querySelector('.subject');
    const body = el.shadowRoot?.querySelector('.body');
    expect(subject?.textContent).to.contain('What a...');
    expect(body?.textContent).to.contain('I loved...');

    const moreBtn = el.shadowRoot?.querySelector(
      '.more-btn',
    ) as HTMLButtonElement;
    expect(moreBtn).to.exist;

    moreBtn.click();
    await el.updateComplete;

    expect(subject?.textContent).to.contain('What a cool book!');
    expect(body?.textContent).to.contain('I loved it.');
  });

  test('hides expanded text on less button click', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review
        .review=${mockReview}
        .maxSubjectLength=${6}
        .maxBodyLength=${7}
      ></ia-review>`,
    );

    const moreBtn = el.shadowRoot?.querySelector(
      '.more-btn',
    ) as HTMLButtonElement;
    expect(moreBtn).to.exist;

    moreBtn.click();
    await el.updateComplete;

    const subject = el.shadowRoot?.querySelector('.subject');
    const body = el.shadowRoot?.querySelector('.body');
    expect(subject?.textContent).to.contain('What a cool book!');
    expect(body?.textContent).to.contain('I loved it.');

    const lessBtn = el.shadowRoot?.querySelector(
      '.less-btn',
    ) as HTMLButtonElement;
    expect(lessBtn).to.exist;

    lessBtn.click();
    await el.updateComplete;

    expect(subject?.textContent).to.contain('What a...');
    expect(body?.textContent).to.contain('I loved...');
  });

  test('removes any HTML tags aside from anchor links prior to render', async () => {
    const mockHTMLReview = new Review({
      reviewtitle: 'What a cool book!',
      reviewbody:
        'I loved it.<img src="foo" /> <b>I am bold!</b> <script>doStuff()</script> <style></style>',
    });

    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockHTMLReview}></ia-review>`,
    );

    const reviewBody = el.shadowRoot?.querySelector('.body');
    expect(reviewBody).to.exist;

    const reviewImages = reviewBody?.querySelectorAll('img');
    expect(reviewImages?.length).to.equal(0);

    const reviewBoldText = reviewBody?.querySelectorAll('b');
    expect(reviewBoldText?.length).to.equal(0);

    const reviewScriptTags = reviewBody?.querySelectorAll('script');
    expect(reviewScriptTags?.length).to.equal(0);

    const reviewStyleTags = reviewBody?.querySelectorAll('style');
    expect(reviewStyleTags?.length).to.equal(0);

    expect(reviewBody?.innerHTML.trim()).to.contain('I loved it. I am bold!');
  });

  test('adds rel and target to anchor links before render', async () => {
    const mockHTMLReview = new Review({
      reviewtitle: 'What a cool book!',
      reviewbody: 'I loved it.<a href="/details/foo">So good!</a>',
    });

    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockHTMLReview}></ia-review>`,
    );

    const reviewBody = el.shadowRoot?.querySelector('.body');
    const reviewLink = reviewBody?.querySelector('a') as HTMLAnchorElement;

    expect(reviewLink).to.exist;
    expect(reviewLink.target).to.equal('_blank');
    expect(reviewLink.rel).to.equal('ugc nofollow');
  });

  test('converts inline links to live anchor links', async () => {
    const mockHTMLReview = new Review({
      reviewtitle: 'What a cool book!',
      reviewbody: 'I loved it. archive.org/details/foo',
    });

    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockHTMLReview}></ia-review>`,
    );

    const reviewBody = el.shadowRoot?.querySelector('.body');
    const reviewLink = reviewBody?.querySelector('a') as HTMLAnchorElement;

    expect(reviewLink).to.exist;
    expect(reviewLink.href).to.equal('https://archive.org/details/foo');
    expect(reviewLink.target).to.equal('_blank');
    expect(reviewLink.rel).to.equal('ugc nofollow');
    expect(reviewLink.innerText).to.equal('archive.org/details/foo');
  });

  test('collapses internal space prior to render', async () => {
    const mockHTMLReview = new Review({
      reviewtitle: 'What a cool book!',
      reviewbody: 'I loved it.\n\n\nSo great.',
    });

    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockHTMLReview}></ia-review>`,
    );

    const reviewBody = el.shadowRoot?.querySelector('.body');
    expect(reviewBody?.innerHTML.trim()).to.contain('I loved it.<br>So great.');
  });

  test('includes a delete button if specified', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview} ?canDelete=${true}></ia-review>`,
    );

    const deleteBtn = el.shadowRoot?.querySelector('.delete-btn');
    expect(deleteBtn).to.exist;
  });

  test('does not include a delete button by default', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review .review=${mockReview}></ia-review>`,
    );

    const deleteBtn = el.shadowRoot?.querySelector('.delete-btn');
    expect(deleteBtn).not.to.exist;
  });
  test('reports a failure when the server rejects the delete', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review
        .review=${mockReview}
        identifier="foo"
        ?canDelete=${true}
      ></ia-review>`,
    );
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    // fetch resolves on a 500, so the status is what distinguishes a failure.
    vi.spyOn(window, 'fetch').mockResolvedValue(
      new Response('', { status: 500 }),
    );

    (el.shadowRoot?.querySelector('.delete-btn') as HTMLButtonElement).click();
    await waitUntil(
      () => !!el.shadowRoot?.querySelector('.body i'),
      'the delete outcome was never reported',
    );

    expect(el.shadowRoot?.querySelector('.body')?.textContent).to.contain(
      'unable to delete',
    );
  });

  test('reports success when the delete is accepted', async () => {
    const el = await fixture<IAReview>(
      html`<ia-review
        .review=${mockReview}
        identifier="foo"
        ?canDelete=${true}
      ></ia-review>`,
    );
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    vi.spyOn(window, 'fetch').mockResolvedValue(
      new Response('', { status: 200 }),
    );

    (el.shadowRoot?.querySelector('.delete-btn') as HTMLButtonElement).click();
    await waitUntil(
      () => !!el.shadowRoot?.querySelector('.body i'),
      'the delete outcome was never reported',
    );

    expect(el.shadowRoot?.querySelector('.body')?.textContent).to.contain(
      'queued for deletion',
    );
  });
  test('a review body cannot inject an attribute onto the rendered link', async () => {
    const review = new Review({
      ...mockReview,
      reviewbody: 'Check archive.org/x"onmouseover="alert(document.domain)',
    });
    const el = await fixture<IAReview>(
      html`<ia-review .review=${review} bypassTruncation></ia-review>`,
    );

    const anchor = el.shadowRoot?.querySelector('.body a');
    expect(anchor).to.exist;
    expect(anchor?.hasAttribute('onmouseover')).to.be.false;
  });
});
