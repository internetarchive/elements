import { describe, expect, it } from 'vitest';
import { User } from './user';

describe('User', () => {
  it('can be instantiated', async () => {
    const user = new User({
      username: 'foo@bar.org',
      itemname: '@foo-user',
      screenname: 'Foo-Bar',
      privs: ['/'],
      image_info: {
        name: 'foo.jpg',
        mtime: 1234,
      },
    });

    expect(user.username).to.equal('foo@bar.org');
    expect(user.itemname).to.equal('@foo-user');
    expect(user.screenname).to.equal('Foo-Bar');
    expect(user.userid).to.equal('foo-user');
    expect(user.privs).to.deep.equal(['/']);
    expect(user.image_info.name).to.equal('foo.jpg');
    expect(user.image_info.mtime).to.equal(1234);
  });

  it('userid is the itemname if it has no at sign', async () => {
    const user = new User({
      username: 'foo@bar.org',
      itemname: 'foo-user',
      screenname: 'Foo-Bar',
      privs: ['/'],
      image_info: {
        name: 'foo.jpg',
        mtime: 4567,
      },
    });

    expect(user.itemname).to.equal('foo-user');
    expect(user.userid).to.equal('foo-user');
    expect(user.image_info.name).to.equal('foo.jpg');
    expect(user.image_info.mtime).to.equal(4567);
  });

  it('properly populates `isArchiveOrg` value', async () => {
    const user = new User({
      username: 'foo@bar.org',
      itemname: 'foo-user',
      screenname: 'Foo-Bar',
      privs: ['/'],
      image_info: {
        name: 'foo.jpg',
        mtime: 4567,
      },
    });

    expect(user.isArchiveOrgUser).to.be.false;

    const user2 = new User({
      username: 'foo@archive.org',
      itemname: 'foo-user',
      screenname: 'Foo-Bar',
      privs: ['/'],
      image_info: {
        name: 'foo.jpg',
        mtime: 4567,
      },
    });

    expect(user2.isArchiveOrgUser).to.be.true;
  });
});
