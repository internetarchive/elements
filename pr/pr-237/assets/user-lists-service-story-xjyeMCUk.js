import{i as $,A as T,b as f,a as M,r as g,c as N}from"./index-BwnLms9O.js";import"./service-template-C16JUmlE.js";import{S as k}from"./search-type-CZG-0Jk4.js";import"./syntax-highlighter-DYW1njQj.js";import"./theme-styles-Bg4qa3ay.js";const x=`import type { Result } from '../result-type/result-type';
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
`,D=`export interface UserListMember {
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
`,P=`/** Reasons the service can produce an error */
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
`,I={NETWORK:"failed to connect to user lists backend service",BAD_RESPONSE:"malformed response from backend",USER_NOT_FOUND:"user with the given id was not found",LIST_NOT_FOUND:"user list with the given id was not found",LIST_MEMBER_NOT_FOUND:"user list member with the given id was not found",ITEM_NOT_TOUND:"item with the given id was not found"};class F extends Error{constructor(e,t,s){super(t,s),this.reason=e}}const L="application/json; charset=utf-8",h=class h{constructor({fetchHandler:e,searchService:t,userService:s,baseUrl:r=h.DEFAULT_BASE_URL}){this.fetchHandler=e,this.searchService=t,this.userService=s,this.baseUrl=r}async fetchEndpoint(e,t,s,r){try{const i=await this.fetchHandler.fetchApiResponse(e,{method:t,body:s,headers:r,includeCredentials:!0});return i.success?{success:i.value}:{error:h.getErrorResult(I.LIST_NOT_FOUND,i.error)}}catch(i){return{error:h.getErrorResult(I.NETWORK,i)}}}async fetchListsForUser(e){const s=(await this.userService.getLoggedInUser())?.success?.itemname===e?"me":e;return this.fetchEndpoint(`${this.baseUrl}/services/users/${s}/lists`)}async fetchList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/${e}/lists/${t}`)}async fetchOwnListsContainingItem(e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists?item=${e}`)}async fetchListMembers(e,t){const s=await this.fetchList(e,t);if(!s.success)return s;const{members:r}=s.success;if(!r)throw h.getErrorResult(I.BAD_RESPONSE);return{success:r}}async fetchListMemberSearchResults(e,t){const s=await this.fetchListMembers(e,t);if(!s.success)return s;const r=s.success;if(r.length===0)return{success:[]};const i=`identifier:(${r.map(v=>v.identifier).join(" OR ")})`,o=await this.searchService.search({query:i,rows:r.length,aggregations:{omit:!0}},k.METADATA);return o.success?{success:o.success.response.results}:{error:o.error}}async createList(e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists`,"POST",JSON.stringify(e),{"Content-Type":L})}async updateList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}`,"PATCH",JSON.stringify(t),{"Content-Type":L})}async deleteList(e){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}`,"DELETE")}async addMemberToList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}/members`,"POST",JSON.stringify(t),{"Content-Type":L})}async removeMemberFromList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}/members/${t}`,"DELETE")}async removeBulkMembersFromList(e,t){return this.fetchEndpoint(`${this.baseUrl}/services/users/me/lists/${e}/members`,"PATCH",JSON.stringify({remove:t}),{"Content-Type":L})}static getErrorResult(e,t){return new F(e,h.getErrorMessage(t),{cause:t})}static getErrorMessage(e){return e instanceof Error?e.message:typeof e=="string"?e:"Unknown error"}};h.DEFAULT_BASE_URL="https://archive.org";let w=h;var A=Object.defineProperty,C=Object.getOwnPropertyDescriptor,b=(n,e,t,s)=>{for(var r=s>1?void 0:s?C(e,t):e,i=n.length-1,o;i>=0;i--)(o=n[i])&&(r=(s?o(e,t,r):o(r))||r);return s&&r&&A(e,t,r),r};const E={fetchListsForUser:["userId"],fetchList:["userId","listId"],fetchOwnListsContainingItem:["itemId"],fetchListMembers:["userId","listId"],fetchListMemberSearchResults:["userId","listId"],createList:["listName","description","isPrivate"],updateList:["listId","listName","description","isPrivate"],deleteList:["listId"],addMemberToList:["listId","itemId"],removeMemberFromList:["listId","memberId"],removeBulkMembersFromList:["listId","memberIds"]},S={userId:{label:"User id",placeholder:"@brewster"},listId:{label:"List id",placeholder:"1"},itemId:{label:"Item identifier",placeholder:"goody"},memberId:{label:"Member id",placeholder:"1"},memberIds:{label:"Member ids (comma separated)",placeholder:"1, 2"},listName:{label:"List name",placeholder:"My new list"},description:{label:"Description",placeholder:"Things I like"}},y="@brewster",B=`import { UserListsService } from '@internetarchive/elements/services/user-lists-service/user-lists-service';
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
else console.log(list.id);`,j=n=>n.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),q=`export declare class UserListsService implements UserListsServiceInterface {
  constructor(options: {
    fetchHandler: { fetchApiResponse<T>(url: string, options?: ApiFetchOptions): Promise<T> };
    searchService: SearchServiceInterface;
    userService: UserServiceInterface;
    baseUrl?: string; // defaults to https://archive.org
  });
}`,H=[x,q,D,P].map(j).join(`

`),u="2025-01-02T00:00:00.000Z",U=(n,e)=>({member_id:n,identifier:e,date_added:u});class R{constructor(){this.nextListId=3,this.nextMemberId=3,this.lists=[{id:"1",list_name:"Favorite books",description:"Books worth reading twice",is_private:!1,date_created:u,date_updated:u,count:2,members:[U("1","goody"),U("2","alice")]},{id:"2",list_name:"To watch",description:"",is_private:!0,date_created:u,date_updated:u,count:0,members:[]}]}async fetchApiResponse(e,t){const s=t?.method??"GET",r=typeof t?.body=="string"?JSON.parse(t.body):void 0;return this.last=`${s} ${e}${r?`
${JSON.stringify(r)}`:""}`,this.answer(s,new URL(e),r)}answer(e,t,s){const[,r,i,o,v]=t.pathname.match(/^\/services\/users\/([^/]+)\/lists(?:\/([^/]+))?(\/members)?(?:\/([^/]+))?$/)??[];if(r!=="me"&&r!==y)return{success:!1,error:`User ${r} not found`};if(!i){if(e==="POST")return this.ok(this.create(s));const l=t.searchParams.get("item");return this.ok(this.lists.map(({members:m,...a})=>l?{...a,item_is_member:!!m?.some(d=>d.identifier===l)}:a))}const c=this.lists.find(l=>l.id===i);if(!c)return{success:!1,error:`List ${i} not found`};if(o){if(e==="POST")return this.ok(this.addMember(c,s));const l=e==="DELETE"?[v]:s.remove;return c.members=c.members?.filter(m=>!l.includes(m.member_id)),this.ok(this.touch(c))}return e==="PATCH"?this.ok(this.touch(Object.assign(c,s))):e==="DELETE"?(this.lists=this.lists.filter(l=>l!==c),this.ok(!0)):this.ok(c)}create(e){const t={id:String(this.nextListId++),list_name:"",description:"",is_private:!1,...e,date_created:u,date_updated:u,count:0,members:[]};return this.lists.push(t),t}addMember(e,t){const s=U(String(this.nextMemberId++),t.identifier);return e.members=[...e.members??[],s],this.touch(e),s}touch(e){return e.count=e.members?.length??0,e}ok(e){return{success:!0,value:e}}}const O={async search(n){return{success:{response:{results:n.query.replace(/^identifier:\(|\)$/g,"").split(" OR ").map(t=>({identifier:t,title:`Sample title for ${t}`}))}}}}},_={async getLoggedInUser(){return{success:{itemname:y}}}};let p=class extends ${constructor(){super(...arguments),this.method="fetchListsForUser",this.values={userId:"",listId:"",itemId:"",memberId:"",memberIds:"",listName:"",description:""},this.isPrivate=!1,this.running=!1,this.backend=new R,this.service=new w({fetchHandler:this.backend,searchService:O,userService:_})}render(){const n=E[this.method];return f`
      <service-template
        serviceName="user-lists-service"
        .usage=${B}
        .apiSource=${H}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Method
            <select @change=${this.pickMethod}>
              ${Object.keys(E).map(e=>f`<option
                    value=${e}
                    ?selected=${this.method===e}
                  >
                    ${e}
                  </option>`)}
            </select>
          </label>
          ${n.map(e=>e==="isPrivate"?f`<label class="check">
                  <input
                    type="checkbox"
                    name="isPrivate"
                    .checked=${this.isPrivate}
                    @change=${t=>this.isPrivate=t.target.checked}
                  />
                  Private
                </label>`:this.textField(e))}
          <button type="submit" ?disabled=${this.running}>Run</button>
          <button type="button" @click=${this.reset}>Reset sample data</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?f`<code class="call">${this.result.call}</code>
                  ${this.result.request?f`<pre class="request">${this.result.request}</pre>`:T}
                  <pre class="output">${this.result.output}</pre>`:T}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Reads and edits a user's lists through
            <code>/services/users/…/lists</code>. This console answers from
            sample data held in the page, signed in as
            <code>${y}</code>, so changes show up in later reads
            and nothing is sent anywhere. archive.org only accepts these
            credentialed requests from archive.org itself, so a live call from
            this page would fail anyway.
          </p>
        </div>
      </service-template>
    `}textField(n){const{label:e,placeholder:t}=S[n];return f`<label>
      ${e}
      <input
        type="text"
        name=${n}
        placeholder=${t}
        autocomplete="off"
        spellcheck="false"
        .value=${this.values[n]}
        @input=${s=>this.values={...this.values,[n]:s.target.value}}
      />
    </label>`}pickMethod(n){this.method=n.target.value,this.result=void 0}reset(){this.backend=new R,this.service=new w({fetchHandler:this.backend,searchService:O,userService:_}),this.result=void 0}value(n){return this.values[n].trim()||S[n].placeholder}async run(n){n.preventDefault();const e=this.value("userId"),t=this.value("listId"),s={list_name:this.value("listName"),description:this.values.description.trim(),is_private:this.isPrivate},r=this.value("memberIds").split(",").map(a=>a.trim()).filter(Boolean),i=this.service,o={fetchListsForUser:[[e],()=>i.fetchListsForUser(e)],fetchList:[[e,t],()=>i.fetchList(e,t)],fetchOwnListsContainingItem:[[this.value("itemId")],()=>i.fetchOwnListsContainingItem(this.value("itemId"))],fetchListMembers:[[e,t],()=>i.fetchListMembers(e,t)],fetchListMemberSearchResults:[[e,t],()=>i.fetchListMemberSearchResults(e,t)],createList:[[s],()=>i.createList(s)],updateList:[[t,s],()=>i.updateList(t,s)],deleteList:[[t],()=>i.deleteList(t)],addMemberToList:[[t,{identifier:this.value("itemId")}],()=>i.addMemberToList(t,{identifier:this.value("itemId")})],removeMemberFromList:[[t,this.value("memberId")],()=>i.removeMemberFromList(t,this.value("memberId"))],removeBulkMembersFromList:[[t,r],()=>i.removeBulkMembersFromList(t,r)]},[v,c]=o[this.method],l=`${this.method}(${v.map(a=>JSON.stringify(a)).join(", ")})`;this.backend.last=void 0,this.running=!0;let m;try{const{success:a,error:d}=await c();m=d?`error: ${d.reason??d.name}${d.message?` (${d.message})`:""}`:JSON.stringify(a,null,2)}catch(a){m=`threw: ${a.message||a.name}`}finally{this.running=!1}this.result={call:l,request:this.backend.last,output:m}}static get styles(){return M`
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
    `}};b([g()],p.prototype,"method",2);b([g()],p.prototype,"values",2);b([g()],p.prototype,"isPrivate",2);b([g()],p.prototype,"running",2);b([g()],p.prototype,"result",2);p=b([N("user-lists-service-story")],p);export{p as UserListsServiceStory};
