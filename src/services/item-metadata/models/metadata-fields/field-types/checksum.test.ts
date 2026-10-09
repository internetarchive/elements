import { describe, it, expect } from 'vitest';

import { ChecksumField } from './checksum';

describe('ChecksumField', () => {
  it('parses the md5sum layout', () => {
    const field = new ChecksumField(
      '6a78e6865622bd85f43c7ae0c392feed *bobwalkenhorst2014-05-28.txt\neecaebe7289ed7b05d19024f31249f89 *bobwalkenhorst2014-05-28d1t01.flac',
    );

    expect(field.values).to.deep.equal([
      {
        file: 'bobwalkenhorst2014-05-28.txt',
        md5: '6a78e6865622bd85f43c7ae0c392feed',
      },
      {
        file: 'bobwalkenhorst2014-05-28d1t01.flac',
        md5: 'eecaebe7289ed7b05d19024f31249f89',
      },
    ]);
    expect(field.value?.file).to.equal('bobwalkenhorst2014-05-28.txt');
  });

  it('parses the file-first layout', () => {
    const field = new ChecksumField(
      'bmt2012-02-16d1t01.flac:f597cef86ec02dfcd851ab56eadfd329\nbmt2012-02-16d1t02.flac:876ee07dea4c3812f955688ff2c59c8f',
    );

    expect(field.values).to.deep.equal([
      {
        file: 'bmt2012-02-16d1t01.flac',
        md5: 'f597cef86ec02dfcd851ab56eadfd329',
      },
      {
        file: 'bmt2012-02-16d1t02.flac',
        md5: '876ee07dea4c3812f955688ff2c59c8f',
      },
    ]);
  });

  it('accepts a filename with spaces', () => {
    const field = new ChecksumField(
      '1ddf028fde2ee3bdbc220ddea709aeab *Drunken Hearts 2012-06-02flac16.md5',
    );

    expect(field.value?.file).to.equal('Drunken Hearts 2012-06-02flac16.md5');
  });

  it('lowercases the digest', () => {
    const field = new ChecksumField(
      '6A78E6865622BD85F43C7AE0C392FEED *upper.flac',
    );

    expect(field.value?.md5).to.equal('6a78e6865622bd85f43c7ae0c392feed');
  });

  it('handles a listing with no separator character', () => {
    const field = new ChecksumField(
      '6a78e6865622bd85f43c7ae0c392feed nostar.flac',
    );

    expect(field.value).to.deep.equal({
      file: 'nostar.flac',
      md5: '6a78e6865622bd85f43c7ae0c392feed',
    });
  });

  it('drops a line that is not a checksum but keeps the rest', () => {
    const field = new ChecksumField(
      '01 Funk Rex\n6a78e6865622bd85f43c7ae0c392feed *real.flac',
    );

    expect(field.values).to.deep.equal([
      { file: 'real.flac', md5: '6a78e6865622bd85f43c7ae0c392feed' },
    ]);
  });

  it('rejects a track listing outright but keeps the raw value', () => {
    // some items fill this field with a setlist rather than checksums
    const raw = '01 Funk Rex\n02 The Source\n03 Danger Kitty';
    const field = new ChecksumField(raw);

    expect(field.value).to.be.undefined;
    expect(field.values).to.deep.equal([]);
    expect(field.rawValue).to.equal(raw);
  });
});
