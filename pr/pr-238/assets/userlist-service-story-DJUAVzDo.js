import{i as O,A as u,b as l,a as x,r as h,c as F}from"./index-DZz4C8tm.js";import"./service-template-DTpM8V_J.js";import{S as w,a as v,b as T}from"./sample-lists-backend-BxQypQRb.js";import{F as k}from"./fetch-handler-CW24_TiN.js";import{a as P,I as D}from"./search-service-B4A5eDvd.js";import"./syntax-highlighter-BCQbA3uN.js";import"./theme-styles-CJ7DWbL_.js";import"./search-type-CZG-0Jk4.js";import"./memoize-decorator-Bcs06flF.js";import"./review-B6vp_H0n.js";import"./string-k5nQQhs7.js";import"./byte-Dx-GOKpv.js";const N=`import type { Result } from '../result-type/result-type';
import type { SearchResult } from '../search-service/models/hit-types/hit';
import type { UserListError } from './userlist-error';
import type {
  UserList,
  UserListMember,
  UserListMemberOptions,
  UserListOptions,
} from './models';

export interface UserListServiceInterface {
  /**
   * Fetches the full set of the given user's lists from the backend service.
   * The result does not include the members array for each list; only the list metadata.
   *
   * If fetching lists for the currently logged-in user, their user id will automatically
   * be replaced by \`me\` in the endpoint URL.
   *
   * @param userId The ID of the user to fetch lists for (e.g., \`@brewster\`)
   */
  fetchListsForUser(userId: string): Promise<Result<UserList[], UserListError>>;

  /**
   * Fetches a specific user list, including the list metadata and the array of list
   * members. Note that the list members returned include only the basic information
   * kept in the userlist store, not the full item metadata.
   * For that, use \`fetchListMemberSearchResults\`.
   *
   * @param userId The ID of the user whose list should be fetched
   * @param listId The ID of the list to fetch (with respect to the given user)
   */
  fetchList(
    userId: string,
    listId: string,
  ): Promise<Result<UserList, UserListError>>;

  /**
   * Fetches the full set of the current user's lists from the backend service,
   * each equipped with an additional flag specifying whether the given item is
   * included in that list.
   *
   * @param itemId The ID of the archive item to query lists for
   */
  fetchOwnListsContainingItem(
    itemId: string,
  ): Promise<Result<UserList[], UserListError>>;

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
  ): Promise<Result<UserListMember[], UserListError>>;

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
  ): Promise<Result<UserList, UserListError>>;

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
  ): Promise<Result<UserList, UserListError>>;

  /**
   * Deletes the given User List entirely.
   * @param listId The id of the list to delete.
   * @returns A boolean indicator of success; if true, the list was removed successfully.
   */
  deleteList(listId: string): Promise<Result<boolean, UserListError>>;

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
  ): Promise<Result<UserListMember, UserListError>>;

  /**
   * Removes the given member from the given User List.
   * @param listId The id of the list to remove a member from.
   * @param memberId The id of the member within the specified list that should be removed.
   * @returns A Result object containing the updated UserList if successful, or an error otherwise.
   */
  removeMemberFromList(
    listId: string,
    memberId: string,
  ): Promise<Result<UserList, UserListError>>;

  /**
   * Removes all of the given members from the given User List.
   * @param listId The id of the list to remove a member from.
   * @param memberIds An array of member IDs within the specified list that should be removed.
   * @returns A Result object containing the updated UserList if successful, or an error otherwise.
   */
  removeBulkMembersFromList(
    listId: string,
    memberIds: string[],
  ): Promise<Result<UserList, UserListError>>;
}
`,A=`export type UserListMember = {
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
};

export type UserList = {
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
};

/** Options that can be specified when creating or editing a list */
export type UserListOptions = {
  /** The title to apply to the list */
  list_name: string;
  /** The description to apply to the list */
  description: string;
  /** Whether the list should be marked private */
  is_private: boolean;
};

/** Options that can be specified when adding a member to a list */
export type UserListMemberOptions = {
  /** The identifier of the Archive item that the new member should represent */
  identifier: string;
  /** (Optional) A subfile path within the item that the new member should represent */
  file?: string;
  /** (Optional) A search term within the item that the new member should represent */
  search_term?: string;
};
`,H=`/** Reasons the service can produce an error */
export const UserListErrorReason = {
  NETWORK: 'failed to connect to user lists backend service',
  BAD_RESPONSE: 'malformed response from backend',
  USER_NOT_FOUND: 'user with the given id was not found',
  LIST_NOT_FOUND: 'user list with the given id was not found',
  LIST_MEMBER_NOT_FOUND: 'user list member with the given id was not found',
  ITEM_NOT_TOUND: 'item with the given id was not found',
} as const;

export type UserListErrorReason =
  (typeof UserListErrorReason)[keyof typeof UserListErrorReason];

/** Typed error for userlist service results */
export class UserListError extends Error {
  // Note that \`reason\` is an additional property of this subclass, not recognized by the Error superclass.
  reason: UserListErrorReason;

  constructor(
    reason: UserListErrorReason,
    message?: string,
    options?: { cause?: unknown },
  ) {
    // @ts-expect-error (to permit the second argument, which is well-supported but tsc dislikes for some reason)
    super(message, options);
    this.reason = reason;
  }
}
`;var q=Object.defineProperty,j=Object.getOwnPropertyDescriptor,c=(t,s,e,r)=>{for(var n=r>1?void 0:r?j(s,e):s,m=t.length-1,d;m>=0;m--)(d=t[m])&&(n=(r?d(s,e,n):d(n))||n);return r&&n&&q(s,e,n),n};const y={fetchListsForUser:["userId"],fetchList:["userId","listId"],fetchOwnListsContainingItem:["itemId"],fetchListMembers:["userId","listId"],fetchListMemberSearchResults:["userId","listId"],createList:["listName","description","isPrivate"],updateList:["listId","listName","description","privacy"],deleteList:["listId"],addMemberToList:["listId","itemId"],removeMemberFromList:["listId","memberId"],removeBulkMembersFromList:["listId","memberIds"]},b={userId:{label:"User id",placeholder:"@brewster"},listId:{label:"List id",placeholder:"1"},itemId:{label:"Item identifier",placeholder:"goody"},memberId:{label:"Member id",placeholder:"1"},memberIds:{label:"Member ids (comma separated)",placeholder:"1, 2"},listName:{label:"List name",placeholder:"My new list"},description:{label:"Description",placeholder:"Things I like"}},C=`import { UserListService } from '@internetarchive/elements/services/userlist-service/userlist-service';
import { FetchHandler } from '@internetarchive/elements/services/fetch-handler/fetch-handler';
import { SearchService } from '@internetarchive/elements/services/search-service/search-service';
import { UserService } from '@internetarchive/elements/services/user-service/user-service';

const service = new UserListService({
  fetchHandler: new FetchHandler(),
  searchService: SearchService.default,
  userService: new UserService(),
});

const { success: list, error } = await service.createList({
  list_name: 'My list',
  description: 'Things I like',
  is_private: false,
});
if (error) console.log(error.reason); // e.g. UserListErrorReason.NETWORK
else console.log(list.id);`,B=t=>t.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),W=`export declare class UserListService implements UserListServiceInterface {
  constructor(options: {
    fetchHandler: { fetchApiResponse<T>(url: string, options?: ApiFetchOptions): Promise<T> };
    searchService: SearchServiceInterface;
    userService: UserServiceInterface;
    baseUrl?: string; // defaults to https://archive.org
  });
}`,z=[N,W,A,H].map(B).join(`

`),U={async search(t){return{success:{response:{results:t.query.replace(/^identifier:\(|\)$/g,"").split(" OR ").map(e=>new D({hit_type:"item",fields:{identifier:e,title:`Sample title for ${e}`,mediatype:"texts"}}))}}}}},S={async getLoggedInUser(){return{success:{itemname:T}}}},R=["fetchListsForUser","fetchList","fetchListMembers","fetchListMemberSearchResults"];class G{constructor(){this.fetchHandler=new k}async fetchApiResponse(s,e){return this.last=`${e?.method??"GET"} ${s}`,this.fetchHandler.fetchApiResponse(s,e)}}const J={async getLoggedInUser(){return{error:new Error("Not signed in through the dev proxy")}}};let o=class extends O{constructor(){super(...arguments),this.source="sample",this.method="fetchListsForUser",this.values={userId:"",listId:"",itemId:"",memberId:"",memberIds:"",listName:"",description:""},this.isPrivate=!1,this.privacy="",this.running=!1,this.backend=new w,this.service=new v({fetchHandler:this.backend,searchService:U,userService:S}),this.liveFetchHandler=new G,this.liveService=new v({fetchHandler:this.liveFetchHandler,searchService:P.default,userService:J,baseUrl:`${window.location.origin}/__archive__`})}render(){const t=y[this.method],s=this.source==="live"?R:Object.keys(y);return l`
      <service-template
        serviceName="userlist-service"
        .usage=${C}
        .apiSource=${z}
      >
        <form slot="console" @submit=${this.run}>
          ${u}
          <label>
            Method
            <select name="method" @change=${this.pickMethod}>
              ${s.map(e=>l`<option
                    value=${e}
                    ?selected=${this.method===e}
                  >
                    ${e}
                  </option>`)}
            </select>
          </label>
          ${t.map(e=>e==="isPrivate"?l`<label class="check">
                <input
                  type="checkbox"
                  name="isPrivate"
                  .checked=${this.isPrivate}
                  @change=${r=>this.isPrivate=r.target.checked}
                />
                Private
              </label>`:e==="privacy"?l`<label>
                Privacy
                <select
                  name="privacy"
                  @change=${r=>this.privacy=r.target.value}
                >
                  <option value="" ?selected=${this.privacy===""}>
                    Leave as it is
                  </option>
                  <option
                    value="private"
                    ?selected=${this.privacy==="private"}
                  >
                    Private
                  </option>
                  <option value="public" ?selected=${this.privacy==="public"}>
                    Public
                  </option>
                </select>
              </label>`:this.textField(e))}
          <button type="submit" ?disabled=${this.running}>Run</button>
          ${this.source==="sample"?l`<button type="button" @click=${this.reset}>
                Reset sample data
              </button>`:u}
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?l`<code class="call">${this.result.call}</code>
                  ${this.result.request?l`<pre class="request">${this.result.request}</pre>`:u}
                  <pre class="output">${this.result.output}</pre>`:u}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Reads and edits a user's lists through
            <code>/services/users/…/lists</code>. The sample data is held in the
            page, signed in as <code>${T}</code>, so changes show
            up in later reads and nothing is sent anywhere.
          </p>
          <p>
            archive.org only answers these endpoints for pages on archive.org,
            so the browser blocks a direct call from here (CORS). Run
            <code>pnpm run dev</code> to get real data: the dev server fetches
            <code>/__archive__/…</code> from archive.org on the page's behalf.
            It drops cookies, so it's signed out and offers only the reads of
            public lists.
          </p>
        </div>
      </service-template>
    `}textField(t){const{label:s}=b[t],e=this.method==="updateList"&&(t==="listName"||t==="description")?"Leave empty to keep":b[t].placeholder;return l`<label>
      ${s}
      <input
        type="text"
        name=${t}
        placeholder=${e}
        autocomplete="off"
        spellcheck="false"
        .value=${this.values[t]}
        @input=${r=>this.values={...this.values,[t]:r.target.value}}
      />
    </label>`}pickSource(t){this.source=t.target.value,this.source==="live"&&!R.includes(this.method)&&(this.method="fetchListsForUser"),this.result=void 0}pickMethod(t){this.method=t.target.value,this.result=void 0}reset(){this.backend=new w,this.service=new v({fetchHandler:this.backend,searchService:U,userService:S}),this.result=void 0}value(t){return this.values[t].trim()||b[t].placeholder}async run(t){t.preventDefault();const s=this.value("userId"),e=this.value("listId"),r={list_name:this.value("listName"),description:this.values.description.trim(),is_private:this.isPrivate},n=this.values.listName.trim(),m=this.values.description.trim(),d={...n&&{list_name:n},...m&&{description:m},...this.privacy&&{is_private:this.privacy==="private"}},g=this.value("memberIds").split(",").map(a=>a.trim()).filter(Boolean),L=this.source==="live",i=L?this.liveService:this.service,I=L?this.liveFetchHandler:this.backend,_={fetchListsForUser:[[s],()=>i.fetchListsForUser(s)],fetchList:[[s,e],()=>i.fetchList(s,e)],fetchOwnListsContainingItem:[[this.value("itemId")],()=>i.fetchOwnListsContainingItem(this.value("itemId"))],fetchListMembers:[[s,e],()=>i.fetchListMembers(s,e)],fetchListMemberSearchResults:[[s,e],()=>i.fetchListMemberSearchResults(s,e)],createList:[[r],()=>i.createList(r)],updateList:[[e,d],()=>i.updateList(e,d)],deleteList:[[e],()=>i.deleteList(e)],addMemberToList:[[e,{identifier:this.value("itemId")}],()=>i.addMemberToList(e,{identifier:this.value("itemId")})],removeMemberFromList:[[e,this.value("memberId")],()=>i.removeMemberFromList(e,this.value("memberId"))],removeBulkMembersFromList:[[e,g],()=>i.removeBulkMembersFromList(e,g)]},[M,E]=_[this.method],$=`${this.method}(${M.map(a=>JSON.stringify(a)).join(", ")})`;I.last=void 0,this.result=void 0,this.running=!0;let f;try{const{success:a,error:p}=await E();f=p?`error: ${p.reason??p.name}${p.message?` (${p.message})`:""}`:JSON.stringify(a,null,2)}catch(a){f=`threw: ${a.message||a.name}`}finally{this.running=!1}this.result={call:$,request:I.last,output:f}}static get styles(){return x`
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

      .request {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-all;
      }

      .output {
        margin: 0;
        font-weight: 600;
        overflow-x: auto;
      }
    `}};c([h()],o.prototype,"source",2);c([h()],o.prototype,"method",2);c([h()],o.prototype,"values",2);c([h()],o.prototype,"isPrivate",2);c([h()],o.prototype,"privacy",2);c([h()],o.prototype,"running",2);c([h()],o.prototype,"result",2);o=c([F("userlist-service-story")],o);export{o as UserListServiceStory};
