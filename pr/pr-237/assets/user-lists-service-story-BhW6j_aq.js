import{i as N,A as U,b as d,a as F,r as b,c as x}from"./index-CQ1BxCJf.js";import"./service-template-D9Rh8F5E.js";import{b as D,a as P}from"./search-service-C671YOhc.js";import{F as A}from"./fetch-handler-CW24_TiN.js";import"./syntax-highlighter-DsRUNJXU.js";import"./theme-styles-BZb7ltVu.js";import"./memoize-decorator-Bcs06flF.js";import"./review-B6vp_H0n.js";import"./string-k5nQQhs7.js";import"./byte-Dx-GOKpv.js";const H=`import type { Result } from '../result-type/result-type';
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
`,C=`export interface UserListMember {
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
`,B=`/** Reasons the service can produce an error */
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
`,S={NETWORK:"failed to connect to user lists backend service",BAD_RESPONSE:"malformed response from backend",USER_NOT_FOUND:"user with the given id was not found",LIST_NOT_FOUND:"user list with the given id was not found",LIST_MEMBER_NOT_FOUND:"user list member with the given id was not found",ITEM_NOT_TOUND:"item with the given id was not found"};class j extends Error{constructor(e,t,s){super(t,s),this.reason=e}}const y="application/json; charset=utf-8",l=class l{constructor({fetchHandler:e,searchService:t,userService:s,baseUrl:r=l.DEFAULT_BASE_URL}){this.fetchHandler=e,this.searchService=t,this.userService=s,this.baseUrl=r}async fetchEndpoint(e,t,s,r){try{const o=await this.fetchHandler.fetchApiResponse(e,{method:t,body:s,headers:r,includeCredentials:!0});return o.success?{success:o.value}:{error:l.getErrorResult(S.LIST_NOT_FOUND,o.error)}}catch(o){return{error:l.getErrorResult(S.NETWORK,o)}}}async fetchListsForUser(e){const s=(await this.userService.getLoggedInUser())?.success?.itemname===e?"me":e;return this.fetchEndpoint(`${this.baseUrl}/services/users/${s}/lists`)}async fetchList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/${e}/lists/${t}`)}async fetchOwnListsContainingItem(e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists?item=${e}`)}async fetchListMembers(e,t){const s=await this.fetchList(e,t);if(!s.success)return s;const{members:r}=s.success;if(!r)throw l.getErrorResult(S.BAD_RESPONSE);return{success:r}}async fetchListMemberSearchResults(e,t){const s=await this.fetchListMembers(e,t);if(!s.success)return s;const r=s.success;if(r.length===0)return{success:[]};const o=`identifier:(${r.map(f=>f.identifier).join(" OR ")})`,n=await this.searchService.search({query:o,rows:r.length,aggregations:{omit:!0}},D.METADATA);return n.success?{success:n.success.response.results}:{error:n.error}}async createList(e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists`,"POST",JSON.stringify(e),{"Content-Type":y})}async updateList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}`,"PATCH",JSON.stringify(t),{"Content-Type":y})}async deleteList(e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}`,"DELETE")}async addMemberToList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}/members`,"POST",JSON.stringify(t),{"Content-Type":y})}async removeMemberFromList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}/members/${t}`,"DELETE")}async removeBulkMembersFromList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}/members`,"PATCH",JSON.stringify({remove:t}),{"Content-Type":y})}static getErrorResult(e,t){return new j(e,l.getErrorMessage(t),{cause:t})}static getErrorMessage(e){return e instanceof Error?e.message:typeof e=="string"?e:"Unknown error"}};l.DEFAULT_BASE_URL="https://archive.org";let w=l;var q=Object.defineProperty,J=Object.getOwnPropertyDescriptor,p=(i,e,t,s)=>{for(var r=s>1?void 0:s?J(e,t):e,o=i.length-1,n;o>=0;o--)(n=i[o])&&(r=(s?n(e,t,r):n(r))||r);return s&&r&&q(e,t,r),r};const R={fetchListsForUser:["userId"],fetchList:["userId","listId"],fetchOwnListsContainingItem:["itemId"],fetchListMembers:["userId","listId"],fetchListMemberSearchResults:["userId","listId"],createList:["listName","description","isPrivate"],updateList:["listId","listName","description","isPrivate"],deleteList:["listId"],addMemberToList:["listId","itemId"],removeMemberFromList:["listId","memberId"],removeBulkMembersFromList:["listId","memberIds"]},_={userId:{label:"User id",placeholder:"@brewster"},listId:{label:"List id",placeholder:"1"},itemId:{label:"Item identifier",placeholder:"goody"},memberId:{label:"Member id",placeholder:"1"},memberIds:{label:"Member ids (comma separated)",placeholder:"1, 2"},listName:{label:"List name",placeholder:"My new list"},description:{label:"Description",placeholder:"Things I like"}},T="@brewster",W=`import { UserListsService } from '@internetarchive/elements/services/user-lists-service/user-lists-service';
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
else console.log(list.id);`,z=i=>i.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),G=`export declare class UserListsService implements UserListsServiceInterface {
  constructor(options: {
    fetchHandler: { fetchApiResponse<T>(url: string, options?: ApiFetchOptions): Promise<T> };
    searchService: SearchServiceInterface;
    userService: UserServiceInterface;
    baseUrl?: string; // defaults to https://archive.org
  });
}`,K=[H,G,C,B].map(z).join(`

`),u="2025-01-02T00:00:00.000Z",E=(i,e)=>({member_id:i,identifier:e,date_added:u});class O{constructor(){this.nextListId=3,this.nextMemberId=3,this.lists=[{id:"1",list_name:"Favorite books",description:"Books worth reading twice",is_private:!1,date_created:u,date_updated:u,count:2,members:[E("1","goody"),E("2","alice")]},{id:"2",list_name:"To watch",description:"",is_private:!0,date_created:u,date_updated:u,count:0,members:[]}]}async fetchApiResponse(e,t){const s=t?.method??"GET",r=typeof t?.body=="string"?JSON.parse(t.body):void 0;return this.last=`${s} ${e}${r?`
${JSON.stringify(r)}`:""}`,this.answer(s,new URL(e),r)}answer(e,t,s){const[,r,o,n,f]=t.pathname.match(/^\/services\/users\/([^/]+)\/lists(?:\/([^/]+))?(\/members)?(?:\/([^/]+))?$/)??[];if(r!=="me"&&r!==T)return{success:!1,error:`User ${r} not found`};if(!o){if(e==="POST")return this.ok(this.create(s));const c=t.searchParams.get("item");return this.ok(this.lists.map(({members:v,...I})=>c?{...I,item_is_member:!!v?.some(g=>g.identifier===c)}:I))}const a=this.lists.find(c=>c.id===o);if(!a)return{success:!1,error:`List ${o} not found`};if(n){if(e==="POST")return this.ok(this.addMember(a,s));const c=e==="DELETE"?[f]:s.remove;return a.members=a.members?.filter(v=>!c.includes(v.member_id)),this.ok(this.touch(a))}return e==="PATCH"?this.ok(this.touch(Object.assign(a,s))):e==="DELETE"?(this.lists=this.lists.filter(c=>c!==a),this.ok(!0)):this.ok(a)}create(e){const t={id:String(this.nextListId++),list_name:"",description:"",is_private:!1,...e,date_created:u,date_updated:u,count:0,members:[]};return this.lists.push(t),t}addMember(e,t){const s=E(String(this.nextMemberId++),t.identifier);return e.members=[...e.members??[],s],this.touch(e),s}touch(e){return e.count=e.members?.length??0,e}ok(e){return{success:!0,value:e}}}const $={async search(i){return{success:{response:{results:i.query.replace(/^identifier:\(|\)$/g,"").split(" OR ").map(t=>({identifier:t,title:`Sample title for ${t}`}))}}}}},M={async getLoggedInUser(){return{success:{itemname:T}}}},k=["fetchListsForUser","fetchList","fetchListMembers","fetchListMemberSearchResults"];class V{constructor(){this.fetchHandler=new A}async fetchApiResponse(e,t){return this.last=`${t?.method??"GET"} ${e}`,this.fetchHandler.fetchApiResponse(e,t)}}const Q={async getLoggedInUser(){return{error:new Error("Not signed in through the dev proxy")}}};let m=class extends N{constructor(){super(...arguments),this.source="sample",this.method="fetchListsForUser",this.values={userId:"",listId:"",itemId:"",memberId:"",memberIds:"",listName:"",description:""},this.isPrivate=!1,this.running=!1,this.backend=new O,this.service=new w({fetchHandler:this.backend,searchService:$,userService:M}),this.liveFetchHandler=new V,this.liveService=new w({fetchHandler:this.liveFetchHandler,searchService:P.default,userService:Q,baseUrl:`${window.location.origin}/__archive__`})}render(){const i=R[this.method],e=this.source==="live"?k:Object.keys(R);return d`
      <service-template
        serviceName="user-lists-service"
        .usage=${W}
        .apiSource=${K}
      >
        <form slot="console" @submit=${this.run}>
          ${U}
          <label>
            Method
            <select name="method" @change=${this.pickMethod}>
              ${e.map(t=>d`<option
                    value=${t}
                    ?selected=${this.method===t}
                  >
                    ${t}
                  </option>`)}
            </select>
          </label>
          ${i.map(t=>t==="isPrivate"?d`<label class="check">
                  <input
                    type="checkbox"
                    name="isPrivate"
                    .checked=${this.isPrivate}
                    @change=${s=>this.isPrivate=s.target.checked}
                  />
                  Private
                </label>`:this.textField(t))}
          <button type="submit" ?disabled=${this.running}>Run</button>
          ${this.source==="sample"?d`<button type="button" @click=${this.reset}>
                Reset sample data
              </button>`:U}
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?d`<code class="call">${this.result.call}</code>
                  ${this.result.request?d`<pre class="request">${this.result.request}</pre>`:U}
                  <pre class="output">${this.result.output}</pre>`:U}
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
            It sends no cookies, so it's signed out and offers only the reads of
            public lists.
          </p>
        </div>
      </service-template>
    `}textField(i){const{label:e,placeholder:t}=_[i];return d`<label>
      ${e}
      <input
        type="text"
        name=${i}
        placeholder=${t}
        autocomplete="off"
        spellcheck="false"
        .value=${this.values[i]}
        @input=${s=>this.values={...this.values,[i]:s.target.value}}
      />
    </label>`}pickSource(i){this.source=i.target.value,this.source==="live"&&!k.includes(this.method)&&(this.method="fetchListsForUser"),this.result=void 0}pickMethod(i){this.method=i.target.value,this.result=void 0}reset(){this.backend=new O,this.service=new w({fetchHandler:this.backend,searchService:$,userService:M}),this.result=void 0}value(i){return this.values[i].trim()||_[i].placeholder}async run(i){i.preventDefault();const e=this.value("userId"),t=this.value("listId"),s={list_name:this.value("listName"),description:this.values.description.trim(),is_private:this.isPrivate},r=this.value("memberIds").split(",").map(h=>h.trim()).filter(Boolean),o=this.source==="live",n=o?this.liveService:this.service,f=o?this.liveFetchHandler:this.backend,a={fetchListsForUser:[[e],()=>n.fetchListsForUser(e)],fetchList:[[e,t],()=>n.fetchList(e,t)],fetchOwnListsContainingItem:[[this.value("itemId")],()=>n.fetchOwnListsContainingItem(this.value("itemId"))],fetchListMembers:[[e,t],()=>n.fetchListMembers(e,t)],fetchListMemberSearchResults:[[e,t],()=>n.fetchListMemberSearchResults(e,t)],createList:[[s],()=>n.createList(s)],updateList:[[t,s],()=>n.updateList(t,s)],deleteList:[[t],()=>n.deleteList(t)],addMemberToList:[[t,{identifier:this.value("itemId")}],()=>n.addMemberToList(t,{identifier:this.value("itemId")})],removeMemberFromList:[[t,this.value("memberId")],()=>n.removeMemberFromList(t,this.value("memberId"))],removeBulkMembersFromList:[[t,r],()=>n.removeBulkMembersFromList(t,r)]},[c,v]=a[this.method],I=`${this.method}(${c.map(h=>JSON.stringify(h)).join(", ")})`;f.last=void 0,this.running=!0;let g;try{const{success:h,error:L}=await v();g=L?`error: ${L.reason??L.name}${L.message?` (${L.message})`:""}`:JSON.stringify(h,null,2)}catch(h){g=`threw: ${h.message||h.name}`}finally{this.running=!1}this.result={call:I,request:f.last,output:g}}static get styles(){return F`
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
    `}};p([b()],m.prototype,"source",2);p([b()],m.prototype,"method",2);p([b()],m.prototype,"values",2);p([b()],m.prototype,"isPrivate",2);p([b()],m.prototype,"running",2);p([b()],m.prototype,"result",2);m=p([x("user-lists-service-story")],m);export{m as UserListsServiceStory};
