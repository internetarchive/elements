import { fixture } from '@open-wc/testing-helpers';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { UserServiceStory } from './user-service-story';
import './user-service-story';

async function run(options: { source?: string; username?: string } = {}) {
  const el = await fixture<UserServiceStory>(
    html`<user-service-story></user-service-story>`,
  );
  const root = el.shadowRoot!;
  if (options.source) {
    const select = root.querySelector('select') as HTMLSelectElement;
    select.value = options.source;
    select.dispatchEvent(new Event('change'));
  }
  if (options.username) {
    const input = root.querySelector('input[type="text"]') as HTMLInputElement;
    input.value = options.username;
    input.dispatchEvent(new Event('input'));
  }
  (root.querySelector('form') as HTMLFormElement).requestSubmit();
  await vi.waitFor(() => {
    if (!root.querySelector('.output')) throw new Error('still running');
  });
  await el.updateComplete;
  return {
    call: root.querySelector('.call')?.textContent,
    output: root.querySelector('.output')?.textContent ?? '',
  };
}

describe('user-service story', () => {
  afterEach(() => {
    removeCookie('logged-in-user');
    vi.restoreAllMocks();
  });

  test('shows nothing until it is run', async () => {
    const el = await fixture<UserServiceStory>(
      html`<user-service-story></user-service-story>`,
    );

    expect(el.shadowRoot!.querySelector('.output')).to.be.null;
  });

  test('returns the sample user for the typed username', async () => {
    const shown = await run({ username: 'someone@example.org' });

    expect(shown.call).to.equal('getLoggedInUser()');
    const user = JSON.parse(shown.output);
    expect(user.username).to.equal('someone@example.org');
    expect(user.screenname).to.equal('Foo-Bar');
  });

  test('reports not signed in when the sample says authentication failed', async () => {
    const shown = await run({ source: 'sample-denied' });

    expect(shown.output).to.equal(
      'error: UserService.userNotLoggedIn (Authentication failed)',
    );
  });

  test('reports a network error for the live call when the request fails', async () => {
    vi.spyOn(window, 'fetch').mockRejectedValue(new TypeError('offline'));

    const shown = await run({ source: 'live' });

    expect(shown.output).to.equal('error: UserService.networkError (offline)');
  });

  test('puts the logged-in-user cookie back as it found it', async () => {
    setCookie('logged-in-user', 'before@example.org');

    await run({ username: 'during@example.org' });

    expect(getCookie('logged-in-user')).to.equal('before@example.org');
  });

  test('leaves no cookie behind when there was none', async () => {
    await run();

    expect(getCookie('logged-in-user')).to.be.undefined;
  });
});
