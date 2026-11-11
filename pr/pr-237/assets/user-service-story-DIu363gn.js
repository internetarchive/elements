import{i as U,A as y,b as f,a as S,r as h,c as I}from"./index-CtKmEI4b.js";import{a as w,U as E,g as R,s as g,r as b}from"./user-service-CYdVou8b.js";import"./service-template-Dc9vqoEh.js";import"./byte-Dx-GOKpv.js";import"./syntax-highlighter-C_APXYvy.js";import"./theme-styles-BTRAjEP3.js";const x=`import { getCookie } from 'typescript-cookie';
import type { Result } from '../result-type/result-type';
import { UserResponse, UserServiceResponse } from './models/response';
import { User } from './models/user';
import type { UserInterface } from './models/user';
import { UserServiceError, UserServiceErrorType } from './user-service-error';

export interface UserServiceInterface {
  /**
   * Return the current user info or null if no current user
   *
   * @returns {Promise<Result<UserInterface, UserServiceError>>}
   * @memberof UserServiceInterface
   */
  getLoggedInUser(): Promise<Result<UserInterface, UserServiceError>>;
}

/**
 * An interface for a cache to conform to for caching User info
 *
 * @export
 * @interface UserServiceCacheInterface
 */
export interface UserServiceCacheInterface {
  set(options: { key: string; value: any; ttl?: number }): Promise<void>;

  get(key: string): Promise<any>;
}

export class UserService implements UserServiceInterface {
  private userServiceEndpoint: string;

  private cache?: UserServiceCacheInterface;

  private userCacheKey;

  private cacheTTL?: number;

  constructor(options?: {
    userServiceEndpoint?: string;
    cache?: UserServiceCacheInterface;
    cacheTTL?: number;
    userCacheKey?: string;
  }) {
    this.userServiceEndpoint =
      options?.userServiceEndpoint ??
      'https://archive.org/services/user.php?op=whoami';
    this.cache = options?.cache;
    this.cacheTTL = options?.cacheTTL;
    this.userCacheKey = options?.userCacheKey ?? 'loggedInUserInfo';
  }

  /** @inheritdoc */
  async getLoggedInUser(): Promise<Result<UserInterface, UserServiceError>> {
    const cookieUsername = getCookie('logged-in-user');

    const hasCookies = cookieUsername !== undefined;
    if (!hasCookies)
      return {
        error: new UserServiceError(UserServiceErrorType.userNotLoggedIn),
      };

    // check for cached user
    const persistedUser = await this.getPersistedUser();
    if (persistedUser) {
      const user = User.fromUserResponse(persistedUser);
      // verify that the cached used matches the user in the cookie
      // otherwise fetch new user info for the cookie'd user
      const decodedCookie = decodeURIComponent(cookieUsername);
      const nameMatches = decodedCookie === user.username;
      if (nameMatches) {
        // increase the cache TTL if successful
        await this.persistUser(persistedUser);
        return { success: user };
      }
    }

    // if another fetch is in progress, chain this request to it
    if (this.fetchPromise) {
      this.fetchPromise = this.fetchPromise.then((response) => {
        return response;
      });
      return this.fetchPromise;
    }

    // assign the fetch promise so chaining starts
    this.fetchPromise = this.fetchUser();
    // fetch the result
    const result = await this.fetchPromise;
    // reset it so subsequent requests go through normal flow
    this.fetchPromise = undefined;
    return result;
  }

  private fetchPromise?: Promise<Result<UserInterface, UserServiceError>>;

  private async fetchUser(): Promise<Result<UserInterface, UserServiceError>> {
    let response: Response;
    try {
      response = await fetch(this.userServiceEndpoint, {
        credentials: 'include',
      });
    } catch (err) {
      return {
        error: new UserServiceError(
          UserServiceErrorType.networkError,
          (err as Error).message,
        ),
      };
    }

    let result: UserServiceResponse;
    try {
      result = (await response.json()) as UserServiceResponse;
    } catch (err) {
      return {
        error: new UserServiceError(
          UserServiceErrorType.decodingError,
          (err as Error).message,
        ),
      };
    }

    if (!result.success || !result.value) {
      return {
        error: new UserServiceError(
          UserServiceErrorType.userNotLoggedIn,
          result.error,
        ),
      };
    }

    const userResponse = result.value;
    const user = User.fromUserResponse(userResponse);
    await this.persistUser(userResponse);
    return { success: user };
  }

  private async getPersistedUser(): Promise<UserResponse | null> {
    return this.cache?.get(this.userCacheKey);
  }

  private async persistUser(user: UserResponse): Promise<void> {
    await this.cache?.set({
      key: this.userCacheKey,
      value: user,
      ttl: this.cacheTTL, // if set, otherwise will default to the localCache default
    });
  }
}
`,k=`export const UserServiceErrorType = {
  userNotLoggedIn: 'UserService.userNotLoggedIn',
  networkError: 'UserService.networkError',
  decodingError: 'UserService.decodingError',
} as const;

export type UserServiceErrorType =
  (typeof UserServiceErrorType)[keyof typeof UserServiceErrorType];

export class UserServiceError extends Error {
  type: UserServiceErrorType;

  constructor(type: UserServiceErrorType, message?: string) {
    super(message);
    this.name = type;
    this.type = type;
  }
}
`,C=`import { UserResponse } from './response';
import { UserImageInfo, UserImageInfoInterface } from './user-image-info';

export interface UserInterface {
  /**
   * The user's email address
   */
  username: string;

  /**
   * The user's item identifier
   *
   * eg. \`@foo-user\`
   */
  itemname: string;

  /**
   * A common use of the itemname is to remove the leading \`@\`,
   * which is referred to as the userid.
   *
   * eg. \`foo-user\`
   */
  userid: string;

  /**
   * The user's screen name, typically used for display purposes
   *
   * eg. \`Foo-User\`
   */
  screenname: string;

  /**
   * Array of privileges for the user
   */
  privs: string[];

  /**
   * Info about the user's profile picture
   */
  image_info: UserImageInfoInterface;

  /**
   * If the user has an archive.org email address
   */
  isArchiveOrgUser: boolean;
}

export class User implements UserInterface {
  /** @inheritdoc */
  username: string;

  /** @inheritdoc */
  itemname: string;

  /** @inheritdoc */
  userid: string;

  /** @inheritdoc */
  screenname: string;

  /** @inheritdoc */
  privs: string[];

  /** @inheritdoc */
  image_info: UserImageInfoInterface;

  /** @inheritdoc */
  isArchiveOrgUser: boolean;

  /**
   * Construct a UserModelInterface object from a UserResponse
   *
   * @static
   * @param {UserResponse} userResponse
   * @returns {UserInterface}
   * @memberof User
   */
  static fromUserResponse(userResponse: UserResponse): UserInterface {
    return new User({
      username: userResponse.username,
      itemname: userResponse.itemname,
      screenname: userResponse.screenname,
      privs: userResponse.privs,
      image_info: UserImageInfo.fromResponse(userResponse.image_info),
    });
  }

  constructor(options: {
    username: string;
    itemname: string;
    screenname: string;
    privs: string[];
    image_info: UserImageInfoInterface;
  }) {
    this.username = options.username;
    this.itemname = options.itemname;
    this.screenname = options.screenname;
    this.privs = options.privs;
    this.image_info = options.image_info;
    this.isArchiveOrgUser = this.username.endsWith('@archive.org');

    const { itemname } = options;
    this.userid = itemname.startsWith('@') ? itemname.substring(1) : itemname;
  }
}
`,T={name:"foo.jpg",source:"original",mtime:"1234",size:"5678",md5:"abc123",crc32:"4243243",sha1:"1234432njknk",format:"Item Image",rotation:"0"},m={username:"foo@bar.com",itemname:"@fooey-mcbarrison",screenname:"Foo-Bar",privs:["/"],image_info:T};w.fromUserResponse(m);var P=Object.defineProperty,L=Object.getOwnPropertyDescriptor,u=(e,s,n,t)=>{for(var r=t>1?void 0:t?L(s,n):s,o=e.length-1,c;o>=0;o--)(c=e[o])&&(r=(t?c(s,n,r):c(r))||r);return t&&r&&P(s,n,r),r};const a="logged-in-user",$=`import { UserService } from '@internetarchive/elements/services/user-service/user-service';

const { success: user, error } = await new UserService().getLoggedInUser();
if (error) console.log(error.type); // 'UserService.userNotLoggedIn'
else console.log(user.screenname);`,l=e=>e.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),d=(e,s,n)=>e.slice(e.indexOf(s),e.indexOf(n)).trim(),_=`export declare class UserService implements UserServiceInterface {
  constructor(options?: {
    userServiceEndpoint?: string;
    cache?: UserServiceCacheInterface;
    cacheTTL?: number;
    userCacheKey?: string;
  });

  getLoggedInUser(): Promise<Result<UserInterface, UserServiceError>>;
}`,O=[d(l(x),"export interface UserServiceInterface","export class UserService "),_,l(k),d(l(C),"export interface UserInterface","export class User ")].join(`

`),v=e=>`data:application/json,${encodeURIComponent(JSON.stringify(e))}`;let i=class extends U{constructor(){super(...arguments),this.source="sample",this.username="",this.running=!1}render(){return f`
      <service-template
        serviceName="user-service"
        .usage=${$}
        .apiSource=${O}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Answer from
            <select @change=${this.pickSource}>
              <option value="sample" ?selected=${this.source==="sample"}>
                Sample data: signed in
              </option>
              <option
                value="sample-denied"
                ?selected=${this.source==="sample-denied"}
              >
                Sample data: not signed in
              </option>
              <option value="live" ?selected=${this.source==="live"}>
                archive.org (live)
              </option>
            </select>
          </label>
          <label>
            Username in the cookie
            <input
              type="text"
              placeholder=${m.username}
              autocomplete="off"
              spellcheck="false"
              .value=${this.username}
              @input=${e=>this.username=e.target.value}
            />
          </label>
          <button type="submit" ?disabled=${this.running}>
            getLoggedInUser
          </button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?f`<code class="call">${this.result.call}</code>
                  <pre class="output">${this.result.output}</pre>`:y}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            <code>getLoggedInUser()</code> needs the
            <code>${a}</code> cookie that archive.org sets when you sign
            in. This page sets it to the username below for the length of the
            call and puts back what was there. The sample data answers from a
            canned response and sends nothing. The live call goes to archive.org
            with your credentials, which the browser only allows from
            archive.org itself, so from here it fails with a network error.
          </p>
        </div>
      </service-template>
    `}pickSource(e){this.source=e.target.value,this.result=void 0}async run(e){e.preventDefault();const s=this.username.trim()||m.username,n=this.source==="sample"?v({success:!0,value:{...m,username:s}}):this.source==="sample-denied"?v({success:!1,error:"Authentication failed"}):void 0,t=new E(n?{userServiceEndpoint:n}:void 0),r=R(a);g(a,s),this.running=!0;let o;try{const{success:c,error:p}=await t.getLoggedInUser();o=p?`error: ${p.type}${p.message?` (${p.message})`:""}`:JSON.stringify(c,null,2)}finally{r===void 0?b(a):g(a,r),this.running=!1}this.result={call:"getLoggedInUser()",output:o}}static get styles(){return S`
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
    `}};u([h()],i.prototype,"source",2);u([h()],i.prototype,"username",2);u([h()],i.prototype,"running",2);u([h()],i.prototype,"result",2);i=u([I("user-service-story")],i);export{i as UserServiceStory};
