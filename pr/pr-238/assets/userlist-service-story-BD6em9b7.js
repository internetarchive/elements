import{i as M,A as u,b as l,a as E,r as m,c as O}from"./index-CltZBY7d.js";import"./service-template-BIFyZSPi.js";import{S as b,a as f,b as y}from"./sample-lists-backend-VOrfOYT8.js";import{F as x}from"./fetch-handler-CW24_TiN.js";import{a as $,I as F}from"./search-service-B4A5eDvd.js";import"./syntax-highlighter-BvUVexyk.js";import"./theme-styles-oGbLh6Gt.js";import"./search-type-CZG-0Jk4.js";import"./memoize-decorator-Bcs06flF.js";import"./review-B6vp_H0n.js";import"./string-k5nQQhs7.js";import"./byte-Dx-GOKpv.js";const k=`import type { Result } from '../result-type/result-type';
import type { SearchResult } from '../search-service/models/hit-types/hit';
import type { UserListsError } from './userlist-error';
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
`,P=`export interface UserListMember {
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
`,D=`/** Reasons the service can produce an error */
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
`;var N=Object.defineProperty,A=Object.getOwnPropertyDescriptor,h=(t,s,e,i)=>{for(var n=i>1?void 0:i?A(s,e):s,c=t.length-1,r;c>=0;c--)(r=t[c])&&(n=(i?r(s,e,n):r(n))||n);return i&&n&&N(s,e,n),n};const g={fetchListsForUser:["userId"],fetchList:["userId","listId"],fetchOwnListsContainingItem:["itemId"],fetchListMembers:["userId","listId"],fetchListMemberSearchResults:["userId","listId"],createList:["listName","description","isPrivate"],updateList:["listId","listName","description","isPrivate"],deleteList:["listId"],addMemberToList:["listId","itemId"],removeMemberFromList:["listId","memberId"],removeBulkMembersFromList:["listId","memberIds"]},L={userId:{label:"User id",placeholder:"@brewster"},listId:{label:"List id",placeholder:"1"},itemId:{label:"Item identifier",placeholder:"goody"},memberId:{label:"Member id",placeholder:"1"},memberIds:{label:"Member ids (comma separated)",placeholder:"1, 2"},listName:{label:"List name",placeholder:"My new list"},description:{label:"Description",placeholder:"Things I like"}},H=`import { UserListsService } from '@internetarchive/elements/services/userlist-service/userlist-service';
import { FetchHandler } from '@internetarchive/elements/services/fetch-handler/fetch-handler';
import { SearchService } from '@internetarchive/elements/services/search-service/search-service';
import { UserService } from '@internetarchive/elements/services/user-service/user-service';

const service = new UserListsService({
  fetchHandler: new FetchHandler(),
  searchService: SearchService.default,
  userService: new UserService(),
});

const { success: list, error } = await service.createList({
  list_name: 'My list',
  description: 'Things I like',
  is_private: false,
});
if (error) console.log(error.reason); // e.g. UserListsErrorReason.NETWORK
else console.log(list.id);`,q=t=>t.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),j=`export declare class UserListsService implements UserListsServiceInterface {
  constructor(options: {
    fetchHandler: { fetchApiResponse<T>(url: string, options?: ApiFetchOptions): Promise<T> };
    searchService: SearchServiceInterface;
    userService: UserServiceInterface;
    baseUrl?: string; // defaults to https://archive.org
  });
}`,C=[k,j,P,D].map(q).join(`

`),I={async search(t){return{success:{response:{results:t.query.replace(/^identifier:\(|\)$/g,"").split(" OR ").map(e=>new F({hit_type:"item",fields:{identifier:e,title:`Sample title for ${e}`,mediatype:"texts"}}))}}}}},w={async getLoggedInUser(){return{success:{itemname:y}}}},U=["fetchListsForUser","fetchList","fetchListMembers","fetchListMemberSearchResults"];class B{constructor(){this.fetchHandler=new x}async fetchApiResponse(s,e){return this.last=`${e?.method??"GET"} ${s}`,this.fetchHandler.fetchApiResponse(s,e)}}const W={async getLoggedInUser(){return{error:new Error("Not signed in through the dev proxy")}}};let a=class extends M{constructor(){super(...arguments),this.source="sample",this.method="fetchListsForUser",this.values={userId:"",listId:"",itemId:"",memberId:"",memberIds:"",listName:"",description:""},this.isPrivate=!1,this.running=!1,this.backend=new b,this.service=new f({fetchHandler:this.backend,searchService:I,userService:w}),this.liveFetchHandler=new B,this.liveService=new f({fetchHandler:this.liveFetchHandler,searchService:$.default,userService:W,baseUrl:`${window.location.origin}/__archive__`})}render(){const t=g[this.method],s=this.source==="live"?U:Object.keys(g);return l`
      <service-template
        serviceName="userlist-service"
        .usage=${H}
        .apiSource=${C}
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
                    @change=${i=>this.isPrivate=i.target.checked}
                  />
                  Private
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
            page, signed in as <code>${y}</code>, so changes show
            up in later reads and nothing is sent anywhere.
          </p>
          <p>
            archive.org only answers these endpoints for pages on archive.org,
            so the browser blocks a direct call from here (CORS). Run
            <code>pnpm run dev</code> to get real data: the dev server fetches
            <code>/__archive__/…</code> from archive.org on the page's behalf.
            It sends no cookies, so it's signed out and offers only the reads of
            public lists.
          </p>
        </div>
      </service-template>
    `}textField(t){const{label:s,placeholder:e}=L[t];return l`<label>
      ${s}
      <input
        type="text"
        name=${t}
        placeholder=${e}
        autocomplete="off"
        spellcheck="false"
        .value=${this.values[t]}
        @input=${i=>this.values={...this.values,[t]:i.target.value}}
      />
    </label>`}pickSource(t){this.source=t.target.value,this.source==="live"&&!U.includes(this.method)&&(this.method="fetchListsForUser"),this.result=void 0}pickMethod(t){this.method=t.target.value,this.result=void 0}reset(){this.backend=new b,this.service=new f({fetchHandler:this.backend,searchService:I,userService:w}),this.result=void 0}value(t){return this.values[t].trim()||L[t].placeholder}async run(t){t.preventDefault();const s=this.value("userId"),e=this.value("listId"),i={list_name:this.value("listName"),description:this.values.description.trim(),is_private:this.isPrivate},n=this.value("memberIds").split(",").map(o=>o.trim()).filter(Boolean),c=this.source==="live",r=c?this.liveService:this.service,v=c?this.liveFetchHandler:this.backend,S={fetchListsForUser:[[s],()=>r.fetchListsForUser(s)],fetchList:[[s,e],()=>r.fetchList(s,e)],fetchOwnListsContainingItem:[[this.value("itemId")],()=>r.fetchOwnListsContainingItem(this.value("itemId"))],fetchListMembers:[[s,e],()=>r.fetchListMembers(s,e)],fetchListMemberSearchResults:[[s,e],()=>r.fetchListMemberSearchResults(s,e)],createList:[[i],()=>r.createList(i)],updateList:[[e,i],()=>r.updateList(e,i)],deleteList:[[e],()=>r.deleteList(e)],addMemberToList:[[e,{identifier:this.value("itemId")}],()=>r.addMemberToList(e,{identifier:this.value("itemId")})],removeMemberFromList:[[e,this.value("memberId")],()=>r.removeMemberFromList(e,this.value("memberId"))],removeBulkMembersFromList:[[e,n],()=>r.removeBulkMembersFromList(e,n)]},[R,T]=S[this.method],_=`${this.method}(${R.map(o=>JSON.stringify(o)).join(", ")})`;v.last=void 0,this.running=!0;let p;try{const{success:o,error:d}=await T();p=d?`error: ${d.reason??d.name}${d.message?` (${d.message})`:""}`:JSON.stringify(o,null,2)}catch(o){p=`threw: ${o.message||o.name}`}finally{this.running=!1}this.result={call:_,request:v.last,output:p}}static get styles(){return E`
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
    `}};h([m()],a.prototype,"source",2);h([m()],a.prototype,"method",2);h([m()],a.prototype,"values",2);h([m()],a.prototype,"isPrivate",2);h([m()],a.prototype,"running",2);h([m()],a.prototype,"result",2);a=h([O("userlist-service-story")],a);export{a as UserListsServiceStory};
