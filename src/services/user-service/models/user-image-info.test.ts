import { describe, expect, it } from 'vitest';
import { UserImageInfo } from './user-image-info';

describe('UserImageInfo', () => {
  it('can be instantiated', async () => {
    const imageInfo = new UserImageInfo({
      name: 'foo.jpg',
      source: 'original',
      mtime: 12345,
    });

    expect(imageInfo.name).to.equal('foo.jpg');
    expect(imageInfo.source).to.equal('original');
    expect(imageInfo.mtime).to.equal(12345);
  });

  it('can be deserialized from response', async () => {
    const imageInfo = UserImageInfo.fromResponse({
      name: 'foo.jpg',
      source: 'original',
      mtime: '12345',
      size: '5435',
      rotation: '0',
    });

    expect(imageInfo.name).to.equal('foo.jpg');
    expect(imageInfo.source).to.equal('original');
    expect(imageInfo.mtime).to.equal(12345);
    expect(imageInfo.size).to.equal(5435);
    expect(imageInfo.rotation).to.equal(0);
  });

  it('deserialized the bad number fields make them undefined', async () => {
    const imageInfo = UserImageInfo.fromResponse({
      name: 'foo.jpg',
      source: 'original',
      mtime: 'abc',
    });

    expect(imageInfo.name).to.equal('foo.jpg');
    expect(imageInfo.source).to.equal('original');
    expect(imageInfo.mtime).to.be.undefined;
    expect(imageInfo.size).to.be.undefined;
    expect(imageInfo.rotation).to.be.undefined;
  });

  it('deserialized without number fields make them undefined', async () => {
    const imageInfo = UserImageInfo.fromResponse({
      name: 'foo.jpg',
      source: 'original',
    });

    expect(imageInfo.name).to.equal('foo.jpg');
    expect(imageInfo.source).to.equal('original');
    expect(imageInfo.mtime).to.be.undefined;
    expect(imageInfo.size).to.be.undefined;
    expect(imageInfo.rotation).to.be.undefined;
  });
});
