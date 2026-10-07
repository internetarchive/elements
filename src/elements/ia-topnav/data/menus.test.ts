import { describe, expect, test } from 'vitest';

import { buildTopNavMenus } from '../data/menus';
import type { IATopNavMenuConfig } from '../models';

const MEDIA_CATEGORIES: (keyof IATopNavMenuConfig)[] = [
  'texts',
  'video',
  'audio',
  'software',
  'images',
  'web',
  'more',
];

describe('Menu data', () => {
  test.each(MEDIA_CATEGORIES)('builds a %s media menu', (category) => {
    const menus = buildTopNavMenus();
    const menu = menus[category];

    expect(menu, `${category} should be built`).to.exist;
    expect(menu).to.have.property('heading');
  });

  test('builds the signed-out and user link lists', () => {
    const menus = buildTopNavMenus();

    expect(menus.signedOut).to.be.an('array').that.is.not.empty;
    expect(menus.user).to.be.an('array').that.is.not.empty;
  });

  /**
   * The topnav gates each admin section on the matching list being non-empty,
   * so an unset uploader or biblio has to build nothing rather than a section
   * with no links in it.
   */
  test('leaves the uploader and biblio sections empty when not given one', () => {
    const menus = buildTopNavMenus('brewster', '', '', 'goody');

    expect(menus.userAdminUploader).to.be.an('array').that.is.empty;
    expect(menus.userAdminBiblio).to.be.an('array').that.is.empty;
  });

  test('builds the uploader and biblio sections when given both', () => {
    const menus = buildTopNavMenus(
      'brewster',
      '',
      '',
      'goody',
      'uploader@archive.org',
      'https://openlibrary.org/search/inside?q=',
    );

    expect(menus.userAdminUploader).to.be.an('array').that.is.not.empty;
    expect(menus.userAdminBiblio).to.be.an('array').that.is.not.empty;
  });
});
