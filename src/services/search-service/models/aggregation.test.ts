import { describe, it, expect } from 'vitest';
import { Aggregation, AggregationSortType, Bucket } from './aggregation';

describe('Aggregation model', () => {
  it('constructs with number buckets by year', () => {
    const buckets = [1, 2, 3, 4];
    const first_bucket_key = 0;
    const last_bucket_key = 3;
    const number_buckets = 4;
    const interval = 1;

    const agg = new Aggregation({
      buckets,
      first_bucket_key,
      last_bucket_key,
      number_buckets,
      interval,
    });

    expect(agg.buckets).to.equal(buckets);
    expect(agg.first_bucket_key).to.equal(first_bucket_key);
    expect(agg.last_bucket_key).to.equal(last_bucket_key);
    expect(agg.number_buckets).to.equal(number_buckets);
    expect(agg.interval).to.equal(interval);
  });

  it('constructs with number buckets by month', () => {
    const buckets = [1, 2, 3, 4, 5];
    const first_bucket_year = 2000;
    const last_bucket_year = 2001;
    const first_bucket_month = 3;
    const last_bucket_month = 6;
    const number_buckets = 5;
    const interval_in_months = 3;

    const agg = new Aggregation({
      buckets,
      first_bucket_year,
      last_bucket_year,
      first_bucket_month,
      last_bucket_month,
      number_buckets,
      interval_in_months,
    });

    expect(agg.buckets).to.equal(buckets);
    expect(agg.first_bucket_year).to.equal(first_bucket_year);
    expect(agg.last_bucket_year).to.equal(last_bucket_year);
    expect(agg.first_bucket_month).to.equal(first_bucket_month);
    expect(agg.last_bucket_month).to.equal(last_bucket_month);
    expect(agg.number_buckets).to.equal(number_buckets);
    expect(agg.interval_in_months).to.equal(interval_in_months);
  });

  it('expects default sorted buckets by count', async () => {
    const buckets: Bucket[] = [
      { key: 'a', doc_count: 5 },
      { key: 'e', doc_count: 4 },
      { key: 'b', doc_count: 3 },
      { key: 'c', doc_count: 2 },
      { key: 'd', doc_count: 1 },
    ];
    const agg = new Aggregation({ buckets });

    expect(agg.getSortedBuckets(AggregationSortType.COUNT)).to.deep.equal(
      buckets,
    );
  });

  it('sorts buckets alphabetically', async () => {
    const buckets: Bucket[] = [
      { key: 'e', doc_count: 4 },
      { key: 'c', doc_count: 2 },
      { key: 'b', doc_count: 3 },
      { key: 'd', doc_count: 1 },
      { key: 'a', doc_count: 5 },
    ];
    const agg = new Aggregation({ buckets });

    expect(
      agg.getSortedBuckets(AggregationSortType.ALPHABETICAL),
    ).to.deep.equal([
      { key: 'a', doc_count: 5 },
      { key: 'b', doc_count: 3 },
      { key: 'c', doc_count: 2 },
      { key: 'd', doc_count: 1 },
      { key: 'e', doc_count: 4 },
    ]);
  });

  it('sorts buckets numerically', async () => {
    const buckets: Bucket[] = [
      { key: 400, doc_count: 4 },
      { key: 1999, doc_count: 2 },
      { key: 1001, doc_count: 3 },
      { key: 1900, doc_count: 1 },
      { key: 2005, doc_count: 5 },
    ];
    const agg = new Aggregation({ buckets });

    expect(agg.getSortedBuckets(AggregationSortType.NUMERIC)).to.deep.equal([
      { key: 2005, doc_count: 5 },
      { key: 1999, doc_count: 2 },
      { key: 1900, doc_count: 1 },
      { key: 1001, doc_count: 3 },
      { key: 400, doc_count: 4 },
    ]);
  });

  it('does not sort raw number buckets', async () => {
    const buckets: number[] = [3, 5, 2, 4, 1];
    const agg = new Aggregation({ buckets });
    expect(agg.getSortedBuckets(AggregationSortType.COUNT)).to.deep.equal(
      buckets,
    );
  });
});
