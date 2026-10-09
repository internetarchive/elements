import { describe, it, expect } from 'vitest';

import { File } from './file';

describe('File', () => {
  it('can be instantiated with an object', async () => {
    const file = new File({ name: 'foo.jpg' });
    expect(file.name).to.equal('foo.jpg');
  });

  // some fields like size and length get converted to their proper types
  it('properly instantiates modeled fields', async () => {
    const file = new File({
      name: 'foo.jpg',
      size: '1234',
      length: '1:23',
      height: '1080',
      width: '1920',
      track: '1',
    });
    expect(file.size).to.equal(1234);
    expect(file.length).to.equal(83);
    expect(file.height).to.equal(1080);
    expect(file.width).to.equal(1920);
    expect(file.track).to.equal(1);
  });

  it('external_identifier can be a single value', async () => {
    const file = new File({ name: 'foo.jpg', external_identifier: 'bar' });
    expect(file.external_identifier).to.equal('bar');
  });

  it('external_identifier can be an array', async () => {
    const file = new File({
      name: 'foo.jpg',
      external_identifier: ['foo', 'bar'],
    });
    expect(file.external_identifier).to.deep.equal(['foo', 'bar']);
  });

  it('handles falsy values properly', async () => {
    const file = new File({
      name: 'foo.jpg',
      size: 0,
      track: 0,
    });
    expect(file.size).to.not.be.undefined;
    expect(file.size).to.equal(0);
    expect(file.track).to.not.be.undefined;
    expect(file.track).to.equal(0);
  });

  it('parses mtime properly', async () => {
    const file = new File({
      name: 'foo.jpg',
      mtime: '1639591034',
    });
    expect(file.mtime).to.not.be.undefined;
    expect(file.mtime instanceof Date).to.be.true;
    expect(file.mtime?.getTime()).to.equal(1639591034000);
  });

  it('parses bitrate as a number', async () => {
    const file = new File({ name: 'foo.mpeg', bitrate: '825000' });
    expect(file.bitrate).to.equal(825000);
  });

  it('parses the private flag as a boolean', async () => {
    expect(new File({ name: 'foo.mpeg', private: 'true' }).private).to.be.true;
    expect(new File({ name: 'foo.mpeg', private: 'false' }).private).to.be
      .false;
  });
});
