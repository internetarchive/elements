import { describe, it, expect } from 'vitest';
import { ExtraInfo } from './extra-info';
import { Metadata } from '../../item-metadata/item-metadata';

describe('ExtraInfo', () => {
  it('constructs item extra info from json', () => {
    const json = {
      item_size: 123,
    };
    const extraInfo = new ExtraInfo(json);
    expect(extraInfo).to.be.instanceOf(ExtraInfo);
    expect(extraInfo.rawResponse).to.deep.equal(json);
    expect(extraInfo.public_metadata).to.be.undefined;
  });

  it('constructs public_metadata from json', () => {
    const json = {
      public_metadata: {
        title: 'Test Item',
        description: 'This is a test item',
      },
    };
    const extraInfo = new ExtraInfo(json);
    expect(extraInfo.public_metadata).to.be.instanceOf(Metadata);
    expect(extraInfo.public_metadata?.title?.value).to.equal('Test Item');
    expect(extraInfo.public_metadata?.description?.value).to.equal(
      'This is a test item',
    );
  });

  it('constructs reviews from json', () => {
    const json = {
      reviews_metadata: [
        {
          reviewbody: 'Foo',
          stars: '5',
          reviewtitle: 'Bar!',
        },
      ],
    };
    const extraInfo = new ExtraInfo(json);
    expect(extraInfo.reviews_metadata?.length).to.equal(1);
    expect(extraInfo.reviews_metadata?.[0].stars).to.equal(5);
    expect(extraInfo.reviews_metadata?.[0].reviewtitle).to.equal('Bar!');
    expect(extraInfo.reviews_metadata?.[0].reviewbody).to.equal('Foo');
  });

  it('returns empty reviews array if none provided', () => {
    const json = {};
    const extraInfo = new ExtraInfo(json);
    expect(extraInfo.reviews_metadata).to.deep.equal([]);
  });

  it('constructs complete extra info object from json', () => {
    const json = {
      item_size: 123,
      public_metadata: {
        title: 'Test Item',
        description: 'This is a test item',
      },
      files_count: 5,
      month: 2,
      week: 3,
      downloads: 100,
      num_favorites: 10,
      title_message: 'foo',
      primary_collection: 'bar',
      thumbnail_url: 'http://example.com/thumbnail.jpg',
      num_reviews: 1,
      part_of: ['beep', 'boop'],
      speech_vs_music_asr_metadata: [
        {
          end: 243,
          id: 1,
          is_music: false,
          start: 0,
          text: 'Fee fi fo fum',
        },
      ],
      reviews_metadata: [
        {
          reviewbody: 'Foo',
          stars: '5',
          reviewtitle: 'Bar!',
          reviewer_account_status: 'ok',
        },
      ],
      uploader_details: {
        screen_name: 'uploader123',
        useritem: 'user123',
        is_archivist: true,
      },
    };
    const extraInfo = new ExtraInfo(json);
    expect(extraInfo.rawResponse).to.deep.equal(json);

    expect(extraInfo.public_metadata).to.be.instanceOf(Metadata);
    expect(extraInfo.public_metadata?.title?.value).to.equal('Test Item');
    expect(extraInfo.public_metadata?.description?.value).to.equal(
      'This is a test item',
    );
    expect(extraInfo.item_size).to.equal(123);
    expect(extraInfo.uploader_details?.screen_name).to.equal('uploader123');
    expect(extraInfo.uploader_details?.useritem).to.equal('user123');
    expect(extraInfo.uploader_details?.is_archivist).to.equal(true);
    expect(extraInfo.files_count).to.equal(5);
    expect(extraInfo.month).to.equal(2);
    expect(extraInfo.week).to.equal(3);
    expect(extraInfo.downloads).to.equal(100);
    expect(extraInfo.num_favorites).to.equal(10);
    expect(extraInfo.title_message).to.equal('foo');
    expect(extraInfo.primary_collection).to.equal('bar');
    expect(extraInfo.thumbnail_url).to.equal(
      'http://example.com/thumbnail.jpg',
    );
    expect(extraInfo.num_reviews).to.equal(1);
    expect(extraInfo.part_of).to.deep.equal(['beep', 'boop']);
    expect(extraInfo.reviews_metadata?.length).to.equal(1);
    expect(extraInfo.reviews_metadata?.[0].reviewbody).to.equal('Foo');
    expect(extraInfo.reviews_metadata?.[0].stars).to.equal(5);
    expect(extraInfo.reviews_metadata?.[0].reviewtitle).to.equal('Bar!');
    expect(extraInfo.reviews_metadata?.[0].reviewer_account_status).to.equal(
      'ok',
    );
    expect(extraInfo.speech_vs_music_asr_metadata?.length).to.equal(1);
    expect(extraInfo.speech_vs_music_asr_metadata?.[0]).to.deep.equal({
      end: 243,
      id: 1,
      is_music: false,
      start: 0,
      text: 'Fee fi fo fum',
    });
  });
});
