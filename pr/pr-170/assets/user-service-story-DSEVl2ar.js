import{i as R,A as L,b as E,a as $,r as g,c as O}from"./index-B8ShSBJo.js";import"./service-template-DOuvKgYi.js";import{N as j,B as N}from"./string-B_v7wtUf.js";import"./theme-styles-BHvFWeIU.js";const k=r=>encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),T=r=>encodeURIComponent(r).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent),U=decodeURIComponent,y=r=>(r[0]==='"'&&(r=r.slice(1,-1)),r.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent));function A(r){return r=Object.assign({},r),typeof r.expires=="number"&&(r.expires=new Date(Date.now()+r.expires*864e5)),r.expires!=null&&(r.expires=r.expires.toUTCString()),Object.entries(r).filter(([e,s])=>s!=null&&s!==!1).map(([e,s])=>s===!0?`; ${e}`:`; ${e}=${s.split(";")[0]}`).join("")}function x(r,e,s){const o=/(?:^|; )([^=]*)=([^;]*)/g,n={};let t;for(;(t=o.exec(document.cookie))!=null;)try{const i=s(t[1]);if(n[i]=e(t[2],i),r===i)break}catch{}return r!=null?n[r]:n}const b=Object.freeze({decodeName:U,decodeValue:y,encodeName:k,encodeValue:T}),w=Object.freeze({path:"/"});function f(r,e,s=w,{encodeValue:o=T,encodeName:n=k}={}){return document.cookie=`${n(r)}=${o(e,r)}${A(s)}`}function I(r,{decodeValue:e=y,decodeName:s=U}={}){return x(r,e,s)}function _({decodeValue:r=y,decodeName:e=U}={}){return x(void 0,r,e)}function P(r,e=w){f(r,"",Object.assign({},e,{expires:-1}))}function v(r,e){const s={set:function(n,t,i){return f(n,t,Object.assign({},this.attributes,i),{encodeValue:this.converter.write})},get:function(n){if(arguments.length===0)return _(this.converter.read);if(n!=null)return I(n,this.converter.read)},remove:function(n,t){P(n,Object.assign({},this.attributes,t))},withAttributes:function(n){return v(this.converter,Object.assign({},this.attributes,n))},withConverter:function(n){return v(Object.assign({},this.converter,n),this.attributes)}},o={attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(r)}};return Object.create(s,o)}v({read:b.decodeValue,write:b.encodeValue},w);const z=`import { getCookie } from 'typescript-cookie';
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
`,V=`export const UserServiceErrorType = {
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
`,K=`import { UserResponse } from './response';
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
`;class S{static fromResponse(e){const s=j.shared,o=N.shared;let n,t,i;return e.mtime&&(n=s.parseValue(e.mtime)),e.size&&(t=o.parseValue(e.size)),e.rotation&&(i=s.parseValue(e.rotation)),new S({name:e.name,source:e.source,mtime:n,size:t,md5:e.md5,crc32:e.crc32,sha1:e.sha1,format:e.format,rotation:i})}constructor(e){this.name=e.name,this.source=e.source,this.mtime=e.mtime,this.size=e.size,this.md5=e.md5,this.crc32=e.crc32,this.sha1=e.sha1,this.format=e.format,this.rotation=e.rotation}}class m{static fromUserResponse(e){return new m({username:e.username,itemname:e.itemname,screenname:e.screenname,privs:e.privs,image_info:S.fromResponse(e.image_info)})}constructor(e){this.username=e.username,this.itemname=e.itemname,this.screenname=e.screenname,this.privs=e.privs,this.image_info=e.image_info,this.isArchiveOrgUser=this.username.endsWith("@archive.org");const{itemname:s}=e;this.userid=s.startsWith("@")?s.substring(1):s}}const p={userNotLoggedIn:"UserService.userNotLoggedIn",networkError:"UserService.networkError",decodingError:"UserService.decodingError"};class l extends Error{constructor(e,s){super(s),this.name=e,this.type=e}}class D{constructor(e){this.userServiceEndpoint=e?.userServiceEndpoint??"https://archive.org/services/user.php?op=whoami",this.cache=e?.cache,this.cacheTTL=e?.cacheTTL,this.userCacheKey=e?.userCacheKey??"loggedInUserInfo"}async getLoggedInUser(){const e=I("logged-in-user");if(!(e!==void 0))return{error:new l(p.userNotLoggedIn)};const o=await this.getPersistedUser();if(o){const t=m.fromUserResponse(o);if(decodeURIComponent(e)===t.username)return await this.persistUser(o),{success:t}}if(this.fetchPromise)return this.fetchPromise=this.fetchPromise.then(t=>t),this.fetchPromise;this.fetchPromise=this.fetchUser();const n=await this.fetchPromise;return this.fetchPromise=void 0,n}async fetchUser(){let e;try{e=await fetch(this.userServiceEndpoint,{credentials:"include"})}catch(t){return{error:new l(p.networkError,t.message)}}let s;try{s=await e.json()}catch(t){return{error:new l(p.decodingError,t.message)}}if(!s.success||!s.value)return{error:new l(p.userNotLoggedIn,s.error)};const o=s.value,n=m.fromUserResponse(o);return await this.persistUser(o),{success:n}}async getPersistedUser(){return this.cache?.get(this.userCacheKey)}async persistUser(e){await this.cache?.set({key:this.userCacheKey,value:e,ttl:this.cacheTTL})}}const B={name:"foo.jpg",source:"original",mtime:"1234",size:"5678",md5:"abc123",crc32:"4243243",sha1:"1234432njknk",format:"Item Image",rotation:"0"},d={username:"foo@bar.com",itemname:"@fooey-mcbarrison",screenname:"Foo-Bar",privs:["/"],image_info:B};m.fromUserResponse(d);var F=Object.defineProperty,M=Object.getOwnPropertyDescriptor,h=(r,e,s,o)=>{for(var n=o>1?void 0:o?M(e,s):e,t=r.length-1,i;t>=0;t--)(i=r[t])&&(n=(o?i(e,s,n):i(n))||n);return o&&n&&F(e,s,n),n};const u="logged-in-user",W=`import { UserService } from '@internetarchive/elements/services/user-service/user-service';

const { success: user, error } = await new UserService().getLoggedInUser();
if (error) console.log(error.type); // 'UserService.userNotLoggedIn'
else console.log(user.screenname);`,q=r=>r.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),J=[z,V,K].map(q).join(`

`),C=r=>`data:application/json,${encodeURIComponent(JSON.stringify(r))}`;let c=class extends R{constructor(){super(...arguments),this.source="sample",this.username="",this.running=!1}render(){return E`
      <service-template
        serviceName="user-service"
        .usage=${W}
        .apiSource=${J}
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
              placeholder=${d.username}
              autocomplete="off"
              spellcheck="false"
              .value=${this.username}
              @input=${r=>this.username=r.target.value}
            />
          </label>
          <button type="submit" ?disabled=${this.running}>
            getLoggedInUser
          </button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?E`<code class="call">${this.result.call}</code>
                  <pre class="output">${this.result.output}</pre>`:L}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            <code>getLoggedInUser()</code> needs the
            <code>${u}</code> cookie that archive.org sets when you sign
            in. This page sets it to the username below for the length of the
            call and puts back what was there. The sample data answers from a
            canned response and sends nothing. The live call goes to archive.org
            with your credentials, which the browser only allows from
            archive.org itself, so from here it fails with a network error.
          </p>
        </div>
      </service-template>
    `}pickSource(r){this.source=r.target.value,this.result=void 0}async run(r){r.preventDefault();const e=this.username.trim()||d.username,s=this.source==="sample"?C({success:!0,value:{...d,username:e}}):this.source==="sample-denied"?C({success:!1,error:"Authentication failed"}):void 0,o=new D(s?{userServiceEndpoint:s}:void 0),n=I(u);f(u,e),this.running=!0;let t;try{const{success:i,error:a}=await o.getLoggedInUser();t=a?`error: ${a.type}${a.message?` (${a.message})`:""}`:JSON.stringify(i,null,2)}finally{n===void 0?P(u):f(u,n),this.running=!1}this.result={call:"getLoggedInUser()",output:t}}static get styles(){return $`
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
    `}};h([g()],c.prototype,"source",2);h([g()],c.prototype,"username",2);h([g()],c.prototype,"running",2);h([g()],c.prototype,"result",2);c=h([O("user-service-story")],c);export{c as UserServiceStory};
