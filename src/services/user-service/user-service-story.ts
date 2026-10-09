import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import serviceSource from './user-service.ts?raw';
import errorSource from './user-service-error.ts?raw';
import userSource from './models/user.ts?raw';

import '@demo/service-template';
import { UserService } from './user-service';
import { mockUserResponse } from './mock-responses.test-helper';

type Source = 'sample' | 'sample-denied' | 'live';

const COOKIE = 'logged-in-user';

const USAGE = `import { UserService } from '@internetarchive/elements/services/user-service/user-service';

const { success: user, error } = await new UserService().getLoggedInUser();
if (error) console.log(error.type); // 'UserService.userNotLoggedIn'
else console.log(user.screenname);`;

/** Strips the import statements, which are noise in the API listing. */
const withoutImports = (source: string) =>
  source.replace(/^import[\s\S]*?from '[^']+';\n/gm, '').trim();

const API_SOURCE = [serviceSource, errorSource, userSource]
  .map(withoutImports)
  .join('\n\n');

const jsonUrl = (body: unknown) =>
  `data:application/json,${encodeURIComponent(JSON.stringify(body))}`;

@customElement('user-service-story')
export class UserServiceStory extends LitElement {
  @state() private source: Source = 'sample';

  @state() private username = '';

  @state() private running = false;

  @state() private result?: { call: string; output: string };

  render() {
    return html`
      <service-template
        serviceName="user-service"
        .usage=${USAGE}
        .apiSource=${API_SOURCE}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Answer from
            <select @change=${this.pickSource}>
              <option value="sample" ?selected=${this.source === 'sample'}>
                Sample data: signed in
              </option>
              <option
                value="sample-denied"
                ?selected=${this.source === 'sample-denied'}
              >
                Sample data: not signed in
              </option>
              <option value="live" ?selected=${this.source === 'live'}>
                archive.org (live)
              </option>
            </select>
          </label>
          <label>
            Username in the cookie
            <input
              type="text"
              placeholder=${mockUserResponse.username}
              autocomplete="off"
              spellcheck="false"
              .value=${this.username}
              @input=${(e: Event) =>
                (this.username = (e.target as HTMLInputElement).value)}
            />
          </label>
          <button type="submit" ?disabled=${this.running}>
            getLoggedInUser
          </button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result
              ? html`<code class="call">${this.result.call}</code>
                  <pre class="output">${this.result.output}</pre>`
              : nothing}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            <code>getLoggedInUser()</code> needs the
            <code>${COOKIE}</code> cookie that archive.org sets when you sign
            in. This page sets it to the username below for the length of the
            call and puts back what was there. The sample data answers from a
            canned response and sends nothing. The live call goes to archive.org
            with your credentials, which the browser only allows from
            archive.org itself, so from here it fails with a network error.
          </p>
        </div>
      </service-template>
    `;
  }

  private pickSource(e: Event) {
    this.source = (e.target as HTMLSelectElement).value as Source;
    this.result = undefined;
  }

  private async run(e: Event) {
    e.preventDefault();
    const username = this.username.trim() || mockUserResponse.username;
    const endpoint =
      this.source === 'sample'
        ? jsonUrl({
            success: true,
            value: { ...mockUserResponse, username },
          })
        : this.source === 'sample-denied'
          ? jsonUrl({ success: false, error: 'Authentication failed' })
          : undefined;
    const service = new UserService(
      endpoint ? { userServiceEndpoint: endpoint } : undefined,
    );

    const previousCookie = getCookie(COOKIE);
    setCookie(COOKIE, username);
    this.running = true;
    let output: string;
    try {
      const { success: user, error } = await service.getLoggedInUser();
      output = error
        ? `error: ${error.type}${error.message ? ` (${error.message})` : ''}`
        : JSON.stringify(user, null, 2);
    } finally {
      if (previousCookie === undefined) removeCookie(COOKIE);
      else setCookie(COOKIE, previousCookie);
      this.running = false;
    }
    this.result = {
      call: 'getLoggedInUser()',
      output,
    };
  }

  static get styles(): CSSResultGroup {
    return css`
      form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.5rem;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 0.8rem;
      }

      input[type='text'] {
        min-width: 0;
        width: 12rem;
        max-width: 100%;
      }

      .result[hidden] {
        display: none;
      }

      .result {
        box-sizing: border-box;
        flex-basis: 100%;
        min-width: 0;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 0.5rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 0.85rem;
      }

      .output {
        margin: 0;
        font-weight: 600;
        overflow-x: auto;
      }
    `;
  }
}
