import{i as E,A as u,b as d,a as T,r as h,c as S}from"./index-CtKmEI4b.js";import"./service-template-Dc9vqoEh.js";import{b as R,a as O}from"./search-service-C671YOhc.js";import{F as _}from"./fetch-handler-CW24_TiN.js";import{U as $}from"./user-service-CYdVou8b.js";import"./syntax-highlighter-C_APXYvy.js";import"./theme-styles-BTRAjEP3.js";import"./memoize-decorator-Bcs06flF.js";import"./review-B6vp_H0n.js";import"./string-k5nQQhs7.js";import"./byte-Dx-GOKpv.js";const D=`import type { Result } from '../result-type/result-type';
import type { SearchResult } from '../search-service/models/hit-types/hit';
import type { UserListsError } from './user-lists-error';
import type {
  UserList,
  UserListMember,
  UserListMemberOptions,
  UserListOptions,
} from './models';

export interface UserListsServiceInterface {
  /**
   * Fetches the full set of the given user's lists from the backend service.
   * The result does not include the members array for each list; only the list metadata.
   *
   * If fetching lists for the currently logged-in user, their user id will automatically
   * be replaced by \`me\` in the endpoint URL.
   *
   * @param userId The ID of the user to fetch lists for (e.g., \`@brewster\`)
   */
  fetchListsForUser(
    userId: string,
  ): Promise<Result<UserList[], UserListsError>>;

  /**
   * Fetches a specific user list, including the list metadata and the array of list
   * members. Note that the list members returned include only the basic information
   * kept in the user lists store, not the full item metadata.
   * For that, use \`fetchListMemberSearchResults\`.
   *
   * @param userId The ID of the user whose list should be fetched
   * @param listId The ID of the list to fetch (with respect to the given user)
   */
  fetchList(
    userId: string,
    listId: string,
  ): Promise<Result<UserList, UserListsError>>;

  /**
   * Fetches the full set of the current user's lists from the backend service,
   * each equipped with an additional flag specifying whether the given item is
   * included in that list.
   *
   * @param itemId The ID of the archive item to query lists for
   */
  fetchOwnListsContainingItem(
    itemId: string,
  ): Promise<Result<UserList[], UserListsError>>;

  /**
   * Fetches an array of UserListMembers representing all of the members of the
   * given user list.
   *
   * @param userId The ID of the user whose list members should be fetched
   * @param listId The ID of the list to fetch (with respect to the given user)
   */
  fetchListMembers(
    userId: string,
    listId: string,
  ): Promise<Result<UserListMember[], UserListsError>>;

  /**
   * Fetches an array of SearchResults representing all of the members of the
   * given user list, prepared for rendering on tiles.
   *
   * @param userId The ID of the user whose list members should be fetched
   * @param listId The ID of the list to fetch (with respect to the given user)
   */
  fetchListMemberSearchResults(
    userId: string,
    listId: string,
  ): Promise<Result<SearchResult[], Error>>;

  /**
   * Creates a new User List with the given options.
   * @param options Details about the new list to create (e.g., name, description, privacy)
   * @returns A Result object containing the newly-created UserList if successful,
   * or an error otherwise.
   */
  createList(
    options: UserListOptions,
  ): Promise<Result<UserList, UserListsError>>;

  /**
   * Updates the given properties of an existing User List.
   * @param listId The id of the list to update
   * @param options An object containing the new property values to apply to the list
   * @returns A Result object containing the newly-updated UserList if successful,
   * or an error otherwise.
   */
  updateList(
    listId: string,
    options: Partial<UserListOptions>,
  ): Promise<Result<UserList, UserListsError>>;

  /**
   * Deletes the given User List entirely.
   * @param listId The id of the list to delete.
   * @returns A boolean indicator of success; if true, the list was removed successfully.
   */
  deleteList(listId: string): Promise<Result<boolean, UserListsError>>;

  /**
   * Adds a new member to an existing User List.
   * @param listId The id of the list to which the member should be added.
   * @param options Details about the member to add (e.g., item identifier, subfile, search term)
   * @returns A Result object containing the newly-added UserListMember if successful,
   * or an error otherwise.
   */
  addMemberToList(
    listId: string,
    options: UserListMemberOptions,
  ): Promise<Result<UserListMember, UserListsError>>;

  /**
   * Removes the given member from the given User List.
   * @param listId The id of the list to remove a member from.
   * @param memberId The id of the member within the specified list that should be removed.
   * @returns A Result object containing the updated UserList if successful, or an error otherwise.
   */
  removeMemberFromList(
    listId: string,
    memberId: string,
  ): Promise<Result<UserList, UserListsError>>;

  /**
   * Removes all of the given members from the given User List.
   * @param listId The id of the list to remove a member from.
   * @param memberIds An array of member IDs within the specified list that should be removed.
   * @returns A Result object containing the updated UserList if successful, or an error otherwise.
   */
  removeBulkMembersFromList(
    listId: string,
    memberIds: string[],
  ): Promise<Result<UserList, UserListsError>>;
}
`,x=`export interface UserListMember {
  /** The id of this list member, unique within the current list */
  member_id: string;
  /** The identifier of the Archive item that this member represents */
  identifier: string;
  /** The timestamp when this member was added to the list */
  date_added: Date;
  /** (Optional) A subfile path within the item that this member represents */
  file?: string;
  /** (Optional) The search term within the item that this member represents */
  search_term?: string;
}

export interface UserList {
  /** The id of this list, unique among the current user's lists */
  id: string;
  /** The user-generated title for the list */
  list_name: string;
  /** The user-generated description for the list */
  description: string;
  /** Whether the list is marked private */
  is_private: boolean;
  /** The timestamp when this list was first created */
  date_created: Date;
  /** The timestamp when this list was last updated */
  date_updated: Date;
  /** The total number of members in this list */
  count: number;
  /** The array of members within this list (not always present) */
  members?: UserListMember[];
  /** Whether this list contains the queried item (only present on item-specific requests) */
  item_is_member?: boolean;
}

/** Options that can be specified when creating or editing a list */
export interface UserListOptions {
  /** The title to apply to the list */
  list_name: string;
  /** The description to apply to the list */
  description: string;
  /** Whether the list should be marked private */
  is_private: boolean;
}

/** Options that can be specified when adding a member to a list */
export interface UserListMemberOptions {
  /** The identifier of the Archive item that the new member should represent */
  identifier: string;
  /** (Optional) A subfile path within the item that the new member should represent */
  file?: string;
  /** (Optional) A search term within the item that the new member should represent */
  search_term?: string;
}
`,A=`/** Reasons the service can produce an error */
export const UserListsErrorReason = {
  NETWORK: 'failed to connect to user lists backend service',
  BAD_RESPONSE: 'malformed response from backend',
  USER_NOT_FOUND: 'user with the given id was not found',
  LIST_NOT_FOUND: 'user list with the given id was not found',
  LIST_MEMBER_NOT_FOUND: 'user list member with the given id was not found',
  ITEM_NOT_TOUND: 'item with the given id was not found',
} as const;

export type UserListsErrorReason =
  (typeof UserListsErrorReason)[keyof typeof UserListsErrorReason];

/** Typed error for user lists service results */
export class UserListsError extends Error {
  // Note that \`reason\` is an additional property of this subclass, not recognized by the Error superclass.
  reason: UserListsErrorReason;

  constructor(
    reason: UserListsErrorReason,
    message?: string,
    options?: { cause?: unknown },
  ) {
    // @ts-expect-error (to permit the second argument, which is well-supported but tsc dislikes for some reason)
    super(message, options);
    this.reason = reason;
  }
}
`,b={NETWORK:"failed to connect to user lists backend service",BAD_RESPONSE:"malformed response from backend",USER_NOT_FOUND:"user with the given id was not found",LIST_NOT_FOUND:"user list with the given id was not found",LIST_MEMBER_NOT_FOUND:"user list member with the given id was not found",ITEM_NOT_TOUND:"item with the given id was not found"};class F extends Error{constructor(e,t,s){super(t,s),this.reason=e}}const f="application/json; charset=utf-8",c=class c{constructor({fetchHandler:e,searchService:t,userService:s,baseUrl:r=c.DEFAULT_BASE_URL}){this.fetchHandler=e,this.searchService=t,this.userService=s,this.baseUrl=r}async fetchEndpoint(e,t,s,r){try{const i=await this.fetchHandler.fetchApiResponse(e,{method:t,body:s,headers:r,includeCredentials:!0});return i.success?{success:i.value}:{error:c.getErrorResult(b.LIST_NOT_FOUND,i.error)}}catch(i){return{error:c.getErrorResult(b.NETWORK,i)}}}async fetchListsForUser(e){const s=(await this.userService.getLoggedInUser())?.success?.itemname===e?"me":e;return this.fetchEndpoint(`${this.baseUrl}/services/users/${s}/lists`)}async fetchList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/${e}/lists/${t}`)}async fetchOwnListsContainingItem(e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists?item=${e}`)}async fetchListMembers(e,t){const s=await this.fetchList(e,t);if(!s.success)return s;const{members:r}=s.success;if(!r)throw c.getErrorResult(b.BAD_RESPONSE);return{success:r}}async fetchListMemberSearchResults(e,t){const s=await this.fetchListMembers(e,t);if(!s.success)return s;const r=s.success;if(r.length===0)return{success:[]};const i=`identifier:(${r.map(m=>m.identifier).join(" OR ")})`,o=await this.searchService.search({query:i,rows:r.length,aggregations:{omit:!0}},R.METADATA);return o.success?{success:o.success.response.results}:{error:o.error}}async createList(e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists`,"POST",JSON.stringify(e),{"Content-Type":f})}async updateList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}`,"PATCH",JSON.stringify(t),{"Content-Type":f})}async deleteList(e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}`,"DELETE")}async addMemberToList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}/members`,"POST",JSON.stringify(t),{"Content-Type":f})}async removeMemberFromList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}/members/${t}`,"DELETE")}async removeBulkMembersFromList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}/members`,"PATCH",JSON.stringify({remove:t}),{"Content-Type":f})}static getErrorResult(e,t){return new F(e,c.getErrorMessage(t),{cause:t})}static getErrorMessage(e){return e instanceof Error?e.message:typeof e=="string"?e:"Unknown error"}};c.DEFAULT_BASE_URL="https://archive.org";let v=c;var M=Object.defineProperty,N=Object.getOwnPropertyDescriptor,l=(n,e,t,s)=>{for(var r=s>1?void 0:s?N(e,t):e,i=n.length-1,o;i>=0;i--)(o=n[i])&&(r=(s?o(e,t,r):o(r))||r);return s&&r&&M(e,t,r),r};const P=["fetchListsForUser","fetchList","fetchOwnListsContainingItem","fetchListMembers"],y="@brewster",L="1",w="goody",C=`import { UserListsService } from '@internetarchive/elements/services/user-lists-service/user-lists-service';
import { FetchHandler } from '@internetarchive/elements/services/fetch-handler/fetch-handler';
import { SearchService } from '@internetarchive/elements/services/search-service/search-service';
import { UserService } from '@internetarchive/elements/services/user-service/user-service';

const service = new UserListsService({
  fetchHandler: new FetchHandler(),
  searchService: SearchService.default,
  userService: new UserService(),
});

const { success: lists, error } = await service.fetchListsForUser('@brewster');
if (error) console.log(error.reason); // e.g. UserListsErrorReason.NETWORK
else console.log(lists.map(list => list.list_name));`,k=n=>n.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),j=`export declare class UserListsService implements UserListsServiceInterface {
  constructor(options: {
    fetchHandler: { fetchApiResponse<T>(url: string, options?: ApiFetchOptions): Promise<T> };
    searchService: SearchServiceInterface;
    userService: UserServiceInterface;
    baseUrl?: string; // defaults to https://archive.org
  });
}`,q=[D,j,x,A].map(k).join(`

`),I=n=>({id:n,list_name:"Sample list",description:"A list answered from sample data",is_private:!1,date_created:new Date("2025-01-01T00:00:00Z"),date_updated:new Date("2025-01-02T00:00:00Z"),count:1,members:[{member_id:"1",identifier:w,date_added:new Date("2025-01-02T00:00:00Z")}]});class H{constructor(e){this.live=new _,this.sample=e}async fetchApiResponse(e,t){if(this.last=`${t?.method??"GET"} ${e}`,!this.sample)return this.live.fetchApiResponse(e,t);const{pathname:s,searchParams:r}=new URL(e),i=s.match(/\/lists\/([^/]+)$/)?.[1];if(i)return{success:!0,value:I(i)};const o=[{...I(L),members:void 0}];return{success:!0,value:r.has("item")?o.map(m=>({...m,item_is_member:!0})):o}}}let a=class extends E{constructor(){super(...arguments),this.call="fetchListsForUser",this.userId="",this.listId="",this.itemId="",this.sample=!0,this.running=!1}render(){const n=this.call==="fetchListsForUser"||this.call==="fetchList"||this.call==="fetchListMembers",e=this.call==="fetchList"||this.call==="fetchListMembers",t=this.call==="fetchOwnListsContainingItem";return d`
      <service-template
        serviceName="user-lists-service"
        .usage=${C}
        .apiSource=${q}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Method
            <select @change=${this.pickCall}>
              ${P.map(s=>d`<option value=${s} ?selected=${this.call===s}>
                    ${s}
                  </option>`)}
            </select>
          </label>
          ${n?this.textField("User id","userId",y):u}
          ${e?this.textField("List id","listId",L):u}
          ${t?this.textField("Item identifier","itemId",w):u}
          <label class="check">
            <input
              type="checkbox"
              .checked=${this.sample}
              @change=${s=>this.sample=s.target.checked}
            />
            Sample data (works offline)
          </label>
          <button type="submit" ?disabled=${this.running}>Run</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?d`<code class="call">${this.result.call}</code>
                  ${this.result.request?d`<code class="request">${this.result.request}</code>`:u}
                  <pre class="output">${this.result.output}</pre>`:u}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Reads and edits a user's lists through
            <code>/services/users/…/lists</code>. Only the reads run here, so a
            live call can't change anyone's lists. The sample data answers from
            canned lists and sends nothing. A live call goes to archive.org with
            your credentials, which the browser only allows from archive.org
            itself, so from here it fails with a network error.
          </p>
        </div>
      </service-template>
    `}textField(n,e,t){return d`<label>
      ${n}
      <input
        type="text"
        name=${e}
        placeholder=${t}
        autocomplete="off"
        spellcheck="false"
        .value=${this[e]}
        @input=${s=>this[e]=s.target.value}
      />
    </label>`}pickCall(n){this.call=n.target.value,this.result=void 0}async run(n){n.preventDefault();const e=this.userId.trim()||y,t=this.listId.trim()||L,s=this.itemId.trim()||w,r=new H(this.sample),i=new v({fetchHandler:r,searchService:O.default,userService:new $}),o={fetchListsForUser:[e],fetchList:[e,t],fetchOwnListsContainingItem:[s],fetchListMembers:[e,t]}[this.call],m=`${this.call}(${o.map(g=>JSON.stringify(g)).join(", ")})`;this.running=!0;let U;try{const{success:g,error:p}=this.call==="fetchListsForUser"?await i.fetchListsForUser(e):this.call==="fetchList"?await i.fetchList(e,t):this.call==="fetchOwnListsContainingItem"?await i.fetchOwnListsContainingItem(s):await i.fetchListMembers(e,t);U=p?`error: ${p.reason}${p.message?` (${p.message})`:""}`:JSON.stringify(g,null,2)}finally{this.running=!1}this.result={call:m,request:r.last,output:U}}static get styles(){return T`
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

      label.check {
        flex-direction: row;
        align-items: center;
        gap: 4px;
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
    `}};l([h()],a.prototype,"call",2);l([h()],a.prototype,"userId",2);l([h()],a.prototype,"listId",2);l([h()],a.prototype,"itemId",2);l([h()],a.prototype,"sample",2);l([h()],a.prototype,"running",2);l([h()],a.prototype,"result",2);a=l([S("user-lists-service-story")],a);export{a as UserListsServiceStory};
