import { describe, expect, test } from 'vitest';
import { TemplateResult } from 'lit';

import audio from './icon-audio';
import close from './icon-close';
import donate from './icon-donate';
import donateUnpadded from './icon-donate-unpadded';
import ellipses from './icon-ellipses';
import iaLogo from './icon-ia-logo';
import images from './icon-images';
import search from './icon-search';
import software from './icon-software';
import texts from './icon-texts';
import upload from './icon-upload';
import uploadUnpadded from './icon-upload-unpadded';
import user from './icon-user';
import video from './icon-video';
import web from './icon-web';
import waybackLogo from './wayback-logo';
import wordmarkStacked from './wordmark-stacked';
import icons from './icons';

describe('the 1.2.1 topnav icon modules', () => {
  test('icons.ts default-exports every icon by its 1.2.1 key', () => {
    expect(icons).to.deep.equal({
      audio,
      close,
      donate,
      donateUnpadded,
      ellipses,
      iaLogo,
      images,
      search,
      software,
      texts,
      upload,
      uploadUnpadded,
      user,
      video,
      web,
    });
  });

  test('every module default-exports a lit template', () => {
    [...Object.values(icons), waybackLogo, wordmarkStacked].forEach((icon) => {
      expect(icon).to.be.instanceOf(Object);
      expect((icon as TemplateResult).strings).to.be.an('array');
    });
  });
});
