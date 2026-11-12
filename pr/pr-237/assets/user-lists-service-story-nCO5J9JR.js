import{i as k,A as L,b as u,a as x,r as b,c as D}from"./index-ClJk7ARy.js";import"./service-template-C6YK2rQ_.js";import{b as A,a as P,I as C}from"./search-service-C2uLVzpx.js";import{F as H}from"./fetch-handler-CW24_TiN.js";import"./syntax-highlighter-hpDdi9Hm.js";import"./theme-styles-DlRoQMx8.js";import"./memoize-decorator-Bcs06flF.js";import"./review-B6vp_H0n.js";import"./string-k5nQQhs7.js";import"./byte-Dx-GOKpv.js";const B=`import type { Result } from '../result-type/result-type';
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
`,q=`export interface UserListMember {
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
`,j=`/** Reasons the service can produce an error */
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
`,U={NETWORK:"failed to connect to user lists backend service",BAD_RESPONSE:"malformed response from backend",USER_NOT_FOUND:"user with the given id was not found",LIST_NOT_FOUND:"user list with the given id was not found",LIST_MEMBER_NOT_FOUND:"user list member with the given id was not found",ITEM_NOT_TOUND:"item with the given id was not found"};class J extends Error{constructor(t,e,s){super(e,s),this.reason=t}}const I="application/json; charset=utf-8",l=class l{constructor({fetchHandler:t,searchService:e,userService:s,baseUrl:r=l.DEFAULT_BASE_URL}){this.fetchHandler=t,this.searchService=e,this.userService=s,this.baseUrl=r}async fetchEndpoint(t,e,s,r){try{const i=await this.fetchHandler.fetchApiResponse(t,{method:e,body:s,headers:r,includeCredentials:!0});return i.success?{success:i.value}:{error:l.getErrorResult(U.LIST_NOT_FOUND,i.error)}}catch(i){return{error:l.getErrorResult(U.NETWORK,i)}}}async fetchListsForUser(t){const s=(await this.userService.getLoggedInUser())?.success?.itemname===t?"me":t;return this.fetchEndpoint(`${this.baseUrl}/services/users/${s}/lists`)}async fetchList(t,e){return this.fetchEndpoint(`${this.baseUrl}/services/users/${t}/lists/${e}`)}async fetchOwnListsContainingItem(t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists?item=${t}`)}async fetchListMembers(t,e){const s=await this.fetchList(t,e);if(!s.success)return s;const{members:r}=s.success;if(!r)throw l.getErrorResult(U.BAD_RESPONSE);return{success:r}}async fetchListMemberSearchResults(t,e){const s=await this.fetchListMembers(t,e);if(!s.success)return s;const r=s.success;if(r.length===0)return{success:[]};const i=`identifier:(${r.map(d=>d.identifier).join(" OR ")})`,o=await this.searchService.search({query:i,rows:r.length,aggregations:{omit:!0}},A.METADATA);return o.success?{success:o.success.response.results}:{error:o.error}}async createList(t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists`,"POST",JSON.stringify(t),{"Content-Type":I})}async updateList(t,e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${t}`,"PATCH",JSON.stringify(e),{"Content-Type":I})}async deleteList(t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${t}`,"DELETE")}async addMemberToList(t,e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${t}/members`,"POST",JSON.stringify(e),{"Content-Type":I})}async removeMemberFromList(t,e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${t}/members/${e}`,"DELETE")}async removeBulkMembersFromList(t,e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${t}/members`,"PATCH",JSON.stringify({remove:e}),{"Content-Type":I})}static getErrorResult(t,e){return new J(t,l.getErrorMessage(e),{cause:e})}static getErrorMessage(t){return t instanceof Error?t.message:typeof t=="string"?t:"Unknown error"}};l.DEFAULT_BASE_URL="https://archive.org";let g=l;var G=Object.defineProperty,W=Object.getOwnPropertyDescriptor,p=(n,t,e,s)=>{for(var r=s>1?void 0:s?W(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&G(t,e,r),r};const T={fetchListsForUser:["userId"],fetchList:["userId","listId"],fetchOwnListsContainingItem:["itemId"],fetchListMembers:["userId","listId"],fetchListMemberSearchResults:["userId","listId"],createList:["listName","description","isPrivate"],updateList:["listId","listName","description","isPrivate"],deleteList:["listId"],addMemberToList:["listId","itemId"],removeMemberFromList:["listId","memberId"],removeBulkMembersFromList:["listId","memberIds"]},E={userId:{label:"User id",placeholder:"@brewster"},listId:{label:"List id",placeholder:"1"},itemId:{label:"Item identifier",placeholder:"goody"},memberId:{label:"Member id",placeholder:"1"},memberIds:{label:"Member ids (comma separated)",placeholder:"1, 2"},listName:{label:"List name",placeholder:"My new list"},description:{label:"Description",placeholder:"Things I like"}},_="@brewster",z=`import { UserListsService } from '@internetarchive/elements/services/user-lists-service/user-lists-service';
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
else console.log(list.id);`,K=n=>n.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),V=`export declare class UserListsService implements UserListsServiceInterface {
  constructor(options: {
    fetchHandler: { fetchApiResponse<T>(url: string, options?: ApiFetchOptions): Promise<T> };
    searchService: SearchServiceInterface;
    userService: UserServiceInterface;
    baseUrl?: string; // defaults to https://archive.org
  });
}`,Y=[B,V,q,j].map(K).join(`

`),S=(n=new Date)=>n.toISOString().replace(/\.\d{3}Z$/,"Z"),f="2025-01-02T00:00:00Z",Z="provided user does not exists or not authorized to execute request.",y="List not found!",Q="List member not found!",X=100,ee="You have exceeded the maximum number of lists.",te=1e3,se="You have exceeded the maximum number of members in this list.";class R{constructor(){this.latestListId=2,this.lists=[{list_name:"Favorite books",description:"Books worth reading twice",is_private:!1,id:1,date_created:f,date_updated:f,members:[{identifier:"goody",member_id:1,date_added:f},{identifier:"alice",member_id:2,date_added:f}]},{list_name:"To watch",description:"",is_private:!0,id:2,date_created:f,date_updated:f,members:[]}]}async fetchApiResponse(t,e){const s=e?.method??"GET",r=typeof e?.body=="string"?JSON.parse(e.body):{};return this.last=`${s} ${t}${typeof e?.body=="string"?`
${e.body}`:""}`,structuredClone(this.answer(s,new URL(t),r))}answer(t,e,s){const[,r,i,o,d]=e.pathname.match(/^\/services\/users\/([^/]+)\/lists(?:\/([^/]+))?(\/members)?(?:\/([^/]+))?$/)??[];if(r!=="me"&&r!==_)return this.notFound(Z);const a=i?this.lists.find(c=>String(c.id)===i):void 0;if(i&&!a)return this.notFound(y);switch(t){case"GET":{const c=e.searchParams.get("item");return a?this.ok(a):c?this.ok(this.listsContaining(c)):this.ok(this.lists)}case"POST":return a?this.addMember(a,s):this.create(s);case"PATCH":return a?o?this.removeMembers(a,s.remove):this.edit(a,s):this.notFound(y);case"DELETE":return a?d?this.removeMembers(a,[d]):(this.lists=this.lists.filter(c=>c!==a),this.ok(this.lists)):this.notFound(y);default:return this.notFound("invalid set of arguments.")}}listsContaining(t){return this.lists.map(e=>{const s=e.members.find(r=>r.identifier===t);return s?{...e,item_is_member:!0,member_id:s.member_id}:{...e,item_is_member:!1}})}create(t){if(this.lists.length>=X)return this.badRequest(ee);const e=S(),s={list_name:t.list_name??"",description:t.description??null,is_private:t.is_private??null,id:++this.latestListId,date_created:e,date_updated:e,members:[]};return this.lists.push(s),this.ok(s)}edit(t,e){const s=Object.fromEntries(["list_name","description","is_private"].filter(i=>e[i]!==void 0&&e[i]!==null).map(i=>[i,e[i]])),r={...t,...s};return Object.keys(s).length&&Object.assign(t,s,{date_updated:S()}),this.ok(r)}addMember(t,e){if(t.members.length>=te)return this.badRequest(se);const s={identifier:String(e.identifier),...e.file?{file:String(e.file)}:{},...e.search_term?{search_term:String(e.search_term)}:{},member_id:Math.max(0,...t.members.map(r=>r.member_id))+1,date_added:S()};return t.members.push(s),this.ok(s)}removeMembers(t,e){const s=new Set(e.map(String)),r=t.members.filter(i=>s.has(String(i.member_id)));return r.length<s.size?this.notFound(Q):(t.members=t.members.filter(i=>!r.includes(i)),this.ok(t))}ok(t){return{success:!0,value:t}}notFound(t){return{success:!1,error:"Not Found",value:t}}badRequest(t){return{success:!1,error:"Bad Request",value:t}}}const M={async search(n){return{success:{response:{results:n.query.replace(/^identifier:\(|\)$/g,"").split(" OR ").map(e=>new C({hit_type:"item",fields:{identifier:e,title:`Sample title for ${e}`,mediatype:"texts"}}))}}}}},O={async getLoggedInUser(){return{success:{itemname:_}}}},$=["fetchListsForUser","fetchList","fetchListMembers","fetchListMemberSearchResults"];class re{constructor(){this.fetchHandler=new H}async fetchApiResponse(t,e){return this.last=`${e?.method??"GET"} ${t}`,this.fetchHandler.fetchApiResponse(t,e)}}const ie={async getLoggedInUser(){return{error:new Error("Not signed in through the dev proxy")}}};let m=class extends k{constructor(){super(...arguments),this.source="sample",this.method="fetchListsForUser",this.values={userId:"",listId:"",itemId:"",memberId:"",memberIds:"",listName:"",description:""},this.isPrivate=!1,this.running=!1,this.backend=new R,this.service=new g({fetchHandler:this.backend,searchService:M,userService:O}),this.liveFetchHandler=new re,this.liveService=new g({fetchHandler:this.liveFetchHandler,searchService:P.default,userService:ie,baseUrl:`${window.location.origin}/__archive__`})}render(){const n=T[this.method],t=this.source==="live"?$:Object.keys(T);return u`
      <service-template
        serviceName="user-lists-service"
        .usage=${z}
        .apiSource=${Y}
      >
        <form slot="console" @submit=${this.run}>
          ${L}
          <label>
            Method
            <select name="method" @change=${this.pickMethod}>
              ${t.map(e=>u`<option
                    value=${e}
                    ?selected=${this.method===e}
                  >
                    ${e}
                  </option>`)}
            </select>
          </label>
          ${n.map(e=>e==="isPrivate"?u`<label class="check">
                  <input
                    type="checkbox"
                    name="isPrivate"
                    .checked=${this.isPrivate}
                    @change=${s=>this.isPrivate=s.target.checked}
                  />
                  Private
                </label>`:this.textField(e))}
          <button type="submit" ?disabled=${this.running}>Run</button>
          ${this.source==="sample"?u`<button type="button" @click=${this.reset}>
                Reset sample data
              </button>`:L}
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?u`<code class="call">${this.result.call}</code>
                  ${this.result.request?u`<pre class="request">${this.result.request}</pre>`:L}
                  <pre class="output">${this.result.output}</pre>`:L}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Reads and edits a user's lists through
            <code>/services/users/…/lists</code>. The sample data is held in the
            page, signed in as <code>${_}</code>, so changes show
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
    `}textField(n){const{label:t,placeholder:e}=E[n];return u`<label>
      ${t}
      <input
        type="text"
        name=${n}
        placeholder=${e}
        autocomplete="off"
        spellcheck="false"
        .value=${this.values[n]}
        @input=${s=>this.values={...this.values,[n]:s.target.value}}
      />
    </label>`}pickSource(n){this.source=n.target.value,this.source==="live"&&!$.includes(this.method)&&(this.method="fetchListsForUser"),this.result=void 0}pickMethod(n){this.method=n.target.value,this.result=void 0}reset(){this.backend=new R,this.service=new g({fetchHandler:this.backend,searchService:M,userService:O}),this.result=void 0}value(n){return this.values[n].trim()||E[n].placeholder}async run(n){n.preventDefault();const t=this.value("userId"),e=this.value("listId"),s={list_name:this.value("listName"),description:this.values.description.trim(),is_private:this.isPrivate},r=this.value("memberIds").split(",").map(h=>h.trim()).filter(Boolean),i=this.source==="live",o=i?this.liveService:this.service,d=i?this.liveFetchHandler:this.backend,a={fetchListsForUser:[[t],()=>o.fetchListsForUser(t)],fetchList:[[t,e],()=>o.fetchList(t,e)],fetchOwnListsContainingItem:[[this.value("itemId")],()=>o.fetchOwnListsContainingItem(this.value("itemId"))],fetchListMembers:[[t,e],()=>o.fetchListMembers(t,e)],fetchListMemberSearchResults:[[t,e],()=>o.fetchListMemberSearchResults(t,e)],createList:[[s],()=>o.createList(s)],updateList:[[e,s],()=>o.updateList(e,s)],deleteList:[[e],()=>o.deleteList(e)],addMemberToList:[[e,{identifier:this.value("itemId")}],()=>o.addMemberToList(e,{identifier:this.value("itemId")})],removeMemberFromList:[[e,this.value("memberId")],()=>o.removeMemberFromList(e,this.value("memberId"))],removeBulkMembersFromList:[[e,r],()=>o.removeBulkMembersFromList(e,r)]},[c,F]=a[this.method],N=`${this.method}(${c.map(h=>JSON.stringify(h)).join(", ")})`;d.last=void 0,this.running=!0;let w;try{const{success:h,error:v}=await F();w=v?`error: ${v.reason??v.name}${v.message?` (${v.message})`:""}`:JSON.stringify(h,null,2)}catch(h){w=`threw: ${h.message||h.name}`}finally{this.running=!1}this.result={call:N,request:d.last,output:w}}static get styles(){return x`
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
    `}};p([b()],m.prototype,"source",2);p([b()],m.prototype,"method",2);p([b()],m.prototype,"values",2);p([b()],m.prototype,"isPrivate",2);p([b()],m.prototype,"running",2);p([b()],m.prototype,"result",2);m=p([D("user-lists-service-story")],m);export{m as UserListsServiceStory};
