import { describe, it, expect } from 'vitest';

import { Metadata } from './metadata';

describe('Metadata', () => {
  it('properly instantiates metadata with no data', async () => {
    const metadata = new Metadata();
    expect(metadata.identifier).to.be.undefined;
    expect(metadata.collection).to.be.undefined;
  });

  it('properly instantiates metadata with identifier', async () => {
    const json = { identifier: 'foo', collection: 'bar' };
    const metadata = new Metadata(json);
    expect(metadata.identifier).to.equal('foo');
  });

  it('properly instantiates metadata with addeddate', async () => {
    const json = { identifier: 'foo', addeddate: '2021-05-20T13:37:15Z' };
    const metadata = new Metadata(json);

    const expected = new Date(Date.UTC(2021, 4, 20, 13, 37, 15));

    expect(metadata.addeddate?.value?.getTime()).to.equal(expected.getTime());
  });

  it('properly instantiates metadata with audio_codec', async () => {
    const json = { identifier: 'foo', audio_codec: 'boop' };
    const metadata = new Metadata(json);
    expect(metadata.audio_codec?.value).to.equal('boop');
  });

  it('properly instantiates metadata with audio_sample_rate', async () => {
    const json = { identifier: 'foo', audio_sample_rate: '123' };
    const metadata = new Metadata(json);
    expect(metadata.audio_sample_rate?.value).to.equal(123);
  });

  it('properly instantiates metadata with external-identifier', async () => {
    const json = { identifier: 'foo', 'external-identifier': ['abc', '123'] };
    const metadata = new Metadata(json);
    expect(metadata.external_identifier?.values).to.deep.equal(['abc', '123']);
  });

  it('properly instantiates metadata with reviews-allowed', async () => {
    const json = { identifier: 'foo', 'reviews-allowed': 'frozen' };
    const metadata = new Metadata(json);
    expect(metadata.reviews_allowed?.value).to.equal('frozen');
  });

  it('accepts all valid reviews-allowed values', async () => {
    for (const value of ['true', 'none', 'frozen']) {
      const metadata = new Metadata({
        identifier: 'foo',
        'reviews-allowed': value,
      });
      expect(metadata.reviews_allowed?.value).to.equal(value);
    }
  });

  it('rejects an invalid reviews-allowed value', async () => {
    const json = { identifier: 'foo', 'reviews-allowed': 'maybe' };
    const metadata = new Metadata(json);
    expect(metadata.reviews_allowed?.value).to.be.undefined;
    // the raw value is still preserved for inspection
    expect(metadata.reviews_allowed?.rawValue).to.equal('maybe');
  });

  it('properly instantiates metadata with mediatype', async () => {
    const json = { identifier: 'foo', mediatype: 'texts' };
    const metadata = new Metadata(json);
    expect(metadata.mediatype?.value).to.equal('texts');
  });

  it('rejects an invalid mediatype value', async () => {
    const json = { identifier: 'foo', mediatype: 'blah' };
    const metadata = new Metadata(json);
    expect(metadata.mediatype?.value).to.be.undefined;
    // the raw value is still preserved for inspection
    expect(metadata.mediatype?.rawValue).to.equal('blah');
  });

  it('properly instantiates metadata with page-progression', async () => {
    // the spelling the API actually returns
    const json = { identifier: 'foo', 'page-progression': 'rl' };
    const metadata = new Metadata(json);
    expect(metadata.page_progression?.value).to.equal('rl');
  });

  it('properly instantiates metadata with page_progression', async () => {
    const json = { identifier: 'foo', page_progression: 'rl' };
    const metadata = new Metadata(json);
    expect(metadata.page_progression?.value).to.equal('rl');
  });

  it('prefers page-progression over the underscored spelling', async () => {
    const json = {
      identifier: 'foo',
      'page-progression': 'rl',
      page_progression: 'lr',
    };
    const metadata = new Metadata(json);
    expect(metadata.page_progression?.value).to.equal('rl');
  });

  it('rejects an invalid page_progression value', async () => {
    const json = { identifier: 'foo', page_progression: 'blah' };
    const metadata = new Metadata(json);
    expect(metadata.page_progression?.value).to.be.undefined;
    // the raw value is still preserved for inspection
    expect(metadata.page_progression?.rawValue).to.equal('blah');
  });

  it('returns undefined for fields that have not been provided', async () => {
    const json = { identifier: 'foo', collection: ['abc', '123'] };
    const metadata = new Metadata(json);
    expect(metadata.runtime?.value).to.be.undefined;
  });

  it('accepts fields that have not been modeled', async () => {
    const json = { identifier: 'foo', foo: ['abc', '123'] };
    const metadata = new Metadata(json);
    // foo hasn't been added to the Metadata class,
    // but can be accessed via the rawMetadata property
    expect(metadata.rawMetadata.foo).to.be.deep.equal(['abc', '123']);
  });

  it('models the year as a NumberField, string value', async () => {
    const json = { identifier: 'foo', year: '1982' };
    const metadata = new Metadata(json);
    expect(metadata.year?.value).to.equal(1982);
  });

  it('models the year as a NumberField, number value', async () => {
    const json = { identifier: 'foo', year: 1982 };
    const metadata = new Metadata(json);
    expect(metadata.year?.value).to.equal(1982);
  });

  it('properly handles falsy number values', async () => {
    const json = {
      identifier: 'foo',
      year: 0,
      duration: 0,
      collection_size: 0,
    };
    const metadata = new Metadata(json);
    expect(metadata.year).to.not.be.undefined;
    expect(metadata.year?.value).to.equal(0);
    expect(metadata.duration).to.not.be.undefined;
    expect(metadata.duration?.value).to.equal(0);
    expect(metadata.collection_size).to.not.be.undefined;
    expect(metadata.collection_size?.value).to.equal(0);
  });

  it('properly handles falsy boolean values', async () => {
    const json = { identifier: 'foo', noindex: false };
    const metadata = new Metadata(json);
    expect(metadata.noindex).to.not.be.undefined;
    expect(metadata.noindex?.value).to.be.false;
  });

  it('properly handles falsy string values', async () => {
    const json = { identifier: 'foo', description: '' };
    const metadata = new Metadata(json);
    expect(metadata.description).to.not.be.undefined;
    expect(metadata.description?.value).to.equal('');
  });

  // TV / audiovisual item fields
  it('properly instantiates metadata with station_name', async () => {
    const metadata = new Metadata({ identifier: 'foo', station_name: 'KGO' });
    expect(metadata.station_name?.value).to.equal('KGO');
  });

  it('properly instantiates metadata with sound', async () => {
    const metadata = new Metadata({ identifier: 'foo', sound: 'silent' });
    expect(metadata.sound?.value).to.equal('silent');
  });

  it('rejects an invalid sound value', async () => {
    const metadata = new Metadata({ identifier: 'foo', sound: 'loud' });
    expect(metadata.sound?.value).to.be.undefined;
    expect(metadata.sound?.rawValue).to.equal('loud');
  });

  it('properly instantiates metadata with color', async () => {
    const metadata = new Metadata({ identifier: 'foo', color: 'b&w' });
    expect(metadata.color?.value).to.equal('b&w');
  });

  it('rejects an invalid color value', async () => {
    const metadata = new Metadata({ identifier: 'foo', color: 'sepia' });
    expect(metadata.color?.value).to.be.undefined;
    expect(metadata.color?.rawValue).to.equal('sepia');
  });

  it('parses closed_captioning "yes" as true', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      closed_captioning: 'yes',
    });
    expect(metadata.closed_captioning?.value).to.be.true;
  });

  it('parses closed_captioning "no" as false', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      closed_captioning: 'no',
    });
    expect(metadata.closed_captioning?.value).to.be.false;
  });

  it('properly instantiates metadata with frames_per_second', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      frames_per_second: '29',
    });
    expect(metadata.frames_per_second?.value).to.equal(29);
  });

  it('properly instantiates metadata with video_codec', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      video_codec: 'mpeg2video',
    });
    expect(metadata.video_codec?.value).to.equal('mpeg2video');
  });

  it('properly instantiates metadata with source_pixel_width', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      source_pixel_width: '720',
    });
    expect(metadata.source_pixel_width?.value).to.equal(720);
  });

  it('properly instantiates metadata with source_pixel_height', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      source_pixel_height: '480',
    });
    expect(metadata.source_pixel_height?.value).to.equal(480);
  });

  it('parses aspect_ratio into width, height, and decimal', async () => {
    const metadata = new Metadata({ identifier: 'foo', aspect_ratio: '16:9' });
    expect(metadata.aspect_ratio?.value?.width).to.equal(16);
    expect(metadata.aspect_ratio?.value?.height).to.equal(9);
    expect(metadata.aspect_ratio?.value?.decimal).to.be.closeTo(1.778, 0.001);
  });

  it('parses a "Channel N (F MHz)" tuner into channel and frequency', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      tuner: 'Channel 93 (639 MHz)',
    });
    expect(metadata.tuner?.value?.channel).to.equal(93);
    expect(metadata.tuner?.value?.frequencyMhz).to.equal(639);
  });

  it('preserves the raw tuner value for unrecognized formats', async () => {
    const metadata = new Metadata({ identifier: 'foo', tuner: 'V4L2 1' });
    expect(metadata.tuner?.value).to.be.undefined;
    expect(metadata.tuner?.rawValue).to.equal('V4L2 1');
  });

  it('properly instantiates metadata with mpeg_program', async () => {
    const metadata = new Metadata({ identifier: 'foo', mpeg_program: '3' });
    expect(metadata.mpeg_program?.value).to.equal(3);
  });

  it('properly instantiates metadata with previous_item', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      previous_item: 'KGO_prev',
    });
    expect(metadata.previous_item?.value).to.equal('KGO_prev');
  });

  it('properly instantiates metadata with next_item', async () => {
    const metadata = new Metadata({ identifier: 'foo', next_item: 'KGO_next' });
    expect(metadata.next_item?.value).to.equal('KGO_next');
  });

  it('properly instantiates metadata with imagecount', async () => {
    const metadata = new Metadata({ identifier: 'foo', imagecount: '42' });
    expect(metadata.imagecount?.value).to.equal(42);
  });

  it('properly instantiates metadata with identifier-access', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      'identifier-access': 'https://archive.org/details/foo',
    });
    expect(metadata.identifier_access?.value).to.equal(
      'https://archive.org/details/foo',
    );
  });

  it('parses a compact scandate timestamp into a Date', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      scandate: '20101106063500',
    });
    const date = metadata.scandate?.value;
    expect(date).to.be.an.instanceof(Date);
    expect(date?.getFullYear()).to.equal(2010);
    expect(date?.getMonth()).to.equal(10); // November (0-indexed)
    expect(date?.getDate()).to.equal(6);
  });

  it('still parses standard date strings for scandate', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      scandate: '2010-11-06',
    });
    expect(metadata.scandate?.value).to.be.an.instanceof(Date);
  });

  it('properly instantiates metadata with ccnum', async () => {
    const metadata = new Metadata({ identifier: 'foo', ccnum: 'cc1' });
    expect(metadata.ccnum?.value).to.equal('cc1');
  });

  it('properly instantiates metadata with scanningcenter', async () => {
    const metadata = new Metadata({ identifier: 'foo', scanningcenter: 'SF' });
    expect(metadata.scanningcenter?.value).to.equal('SF');
  });

  it('properly instantiates metadata with backup_location', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      backup_location: 'ia903604_7',
    });
    expect(metadata.backup_location?.value).to.equal('ia903604_7');
  });

  it('properly instantiates metadata with program', async () => {
    const metadata = new Metadata({ identifier: 'foo', program: 'Nightline' });
    expect(metadata.program?.value).to.equal('Nightline');
  });

  it('parses times into a list of numbers', async () => {
    const metadata = new Metadata({ identifier: 'foo', times: '16,18,20' });
    expect(metadata.times?.values).to.deep.equal([16, 18, 20]);
  });

  it('parses thumbs into a list of numbers', async () => {
    const metadata = new Metadata({ identifier: 'foo', thumbs: '25,56,86' });
    expect(metadata.thumbs?.values).to.deep.equal([25, 56, 86]);
  });

  it('parses utc_offset into hours, minutes, and total minutes', async () => {
    const metadata = new Metadata({ identifier: 'foo', utc_offset: '-800' });
    expect(metadata.utc_offset?.value?.hours).to.equal(-8);
    expect(metadata.utc_offset?.value?.minutes).to.equal(0);
    expect(metadata.utc_offset?.value?.totalMinutes).to.equal(-480);
  });

  it('properly instantiates metadata with access-restricted-item', async () => {
    const metadata = new Metadata({
      identifier: 'foo',
      'access-restricted-item': 'true',
    });
    expect(metadata.access_restricted_item?.value).to.be.true;
  });
});
