import { describe, it, expect } from 'vitest';
import { SearchReview } from '../../responses/page-elements';

describe('SearchReview', () => {
  it('does not have reviewer account status by default', () => {
    const review = new SearchReview({ reviewbody: 'Great item!' });
    expect(review.reviewer_account_status).to.be.undefined;
    expect(review.reviewer_account_status_reason).to.be.undefined;
  });

  it('properly parses ok reviewer account status', () => {
    const reviewOk = new SearchReview({
      reviewbody: 'Great item!',
      reviewer_account_status: 'ok',
    });
    expect(reviewOk.reviewer_account_status).to.equal('ok');
    expect(reviewOk.reviewer_account_status_reason).to.be.undefined;
  });

  it('properly parses locked reviewer account status with reason', () => {
    const reviewLocked = new SearchReview({
      reviewbody: 'Not good.',
      reviewer_account_status: 'locked__spam_activity',
    });
    expect(reviewLocked.reviewer_account_status).to.equal('locked');
    expect(reviewLocked.reviewer_account_status_reason).to.equal(
      'spam_activity',
    );
  });

  it('handles unknown reviewer account status', () => {
    const reviewUnknown = new SearchReview({
      reviewbody: 'Average item.',
      reviewer_account_status: 'unknown__account_issue',
    });
    expect(reviewUnknown.reviewer_account_status).to.equal('unknown');
    expect(reviewUnknown.reviewer_account_status_reason).to.equal(
      'account_issue',
    );
  });
});
