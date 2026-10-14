import { describe, it, expect } from 'vitest';

import { MetadataResponse } from './metadata-response';

describe('MetadataResponse', () => {
  it('parses alternate_locations into servers and workable lists', async () => {
    const response = new MetadataResponse({
      metadata: { identifier: 'foo' },
      alternate_locations: {
        servers: [
          { server: 'ia801234.us.archive.org', dir: '/12/items/foo' },
          { server: 'ia601234.us.archive.org', dir: '/12/items/foo' },
        ],
        workable: [{ server: 'ia801234.us.archive.org', dir: '/12/items/foo' }],
      },
    });
    expect(response.alternate_locations?.servers).to.have.lengthOf(2);
    expect(response.alternate_locations?.servers[0].server).to.equal(
      'ia801234.us.archive.org',
    );
    expect(response.alternate_locations?.servers[0].dir).to.equal(
      '/12/items/foo',
    );
    expect(response.alternate_locations?.workable).to.have.lengthOf(1);
  });

  it('exposes the clips, plays, and simplelists maps', async () => {
    const response = new MetadataResponse({
      metadata: { identifier: 'foo' },
      clips: { '60|120': [1, 2, 3] },
      plays: { total: 5 },
      simplelists: {},
    });
    expect(response.clips).to.deep.equal({ '60|120': [1, 2, 3] });
    expect(response.plays).to.deep.equal({ total: 5 });
    expect(response.simplelists).to.deep.equal({});
  });

  it('exposes the solo flag', async () => {
    const response = new MetadataResponse({
      metadata: { identifier: 'foo' },
      solo: true,
    });
    expect(response.solo).to.be.true;
  });

  it('leaves the top-level fields undefined when absent', async () => {
    const response = new MetadataResponse({ metadata: { identifier: 'foo' } });
    expect(response.alternate_locations).to.be.undefined;
    expect(response.clips).to.be.undefined;
    expect(response.plays).to.be.undefined;
    expect(response.simplelists).to.be.undefined;
    expect(response.solo).to.be.undefined;
  });
});
