import{r as k,K as S,j as d,G as p,c,b as I,i as r,m as f,p as C,s as b,o as A,S as w,a as h,t as H,w as B,g as E,q as x,h as F,L as R,M as K,O as z,k as j,l as G,d as P,f as q,e as N}from"./site-BzgLb0QC.js";/* empty css             */const W=`<!-- collection-browser's null-result illustration (src/assets/img/icons/null-result.ts) -->
<svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg"><g fill="#999" fill-rule="evenodd"><path d="m392.387152 0c90.212937 0 163.325255 73.1823935 163.325255 163.414428 0 34.161159-10.533846 65.858529-28.422252 92.099564l96.093209 96.172128c5.880272 5.034454 9.616636 12.49332 9.616636 20.857826 0 15.159612-12.300741 27.456054-27.47128 27.456054-7.270154 0-13.876316-2.846294-18.788734-7.464492l-97.84885-97.516523c-27.037997 19.929684-60.361413 31.804247-96.503984 31.804247-90.274834 0-163.387152-73.126143-163.387152-163.408804 0-90.2320345 73.112318-163.414428 163.387152-163.414428zm.132028 36c-70.323133 0-127.51918 57.1785661-127.51918 127.511499 0 70.294604 57.196047 127.488501 127.51918 127.488501 70.246413 0 127.48082-57.193897 127.48082-127.488501 0-70.3329329-57.234407-127.511499-127.48082-127.511499z"/><path d="m378.080616 218.418605v24.781395h24.697248v-24.781395zm-36.267131-84.83721h18.912307c0-5.209302.593328-10.046511 1.779982-14.511628 1.186655-4.465116 3.077886-8.334883 5.673692-11.609302 2.595807-3.274418 5.822025-5.87907 9.678652-7.8139534 3.856627-1.9348837 8.454914-2.9023256 13.79486-2.9023256 8.009918 0 14.351104 2.3069768 19.023556 6.92093 4.672453 4.613954 7.305342 11.013954 7.89867 19.2.296663 5.506977-.37083 10.195349-2.00248 14.065117-1.63165 3.869767-3.819544 7.404651-6.563683 10.604651s-5.710775 6.251163-8.89991 9.153488c-3.189134 2.902326-6.229936 6.065116-9.122407 9.488372-2.89247 3.423256-5.339945 7.330233-7.342425 11.72093-2.00248 4.390698-3.152051 9.711628-3.448715 15.962791v10.493023h18.912308v-8.706976c0-3.869768.556244-7.330233 1.668733-10.381396 1.112488-3.051163 2.595807-5.879069 4.449954-8.483721 1.854148-2.604651 3.930794-5.060465 6.229937-7.367442 2.299143-2.306976 4.635369-4.576744 7.008679-6.809302 2.373309-2.381395 4.709535-4.837209 7.008678-7.367442 2.299144-2.530232 4.338706-5.283721 6.118688-8.260465s3.226217-6.288372 4.338706-9.934884c1.112489-3.646511 1.668733-7.776744 1.668733-12.390697 0-7.144186-1.149572-13.469768-3.448715-18.976744-2.299143-5.506977-5.52536-10.1581399-9.678651-13.9534888-4.153292-3.7953488-9.085325-6.6976744-14.7961-8.7069767s-12.051961-3.0139535-19.023556-3.0139535c-7.713255 0-14.684851 1.3395349-20.914788 4.0186047-6.229936 2.6790697-11.495716 6.4372093-15.797339 11.2744186-4.301623 4.8372097-7.602006 10.5302327-9.901149 17.0790697s-3.374549 13.618605-3.226217 21.209302z" fill-rule="nonzero"/></g></svg>
`,O={button:["ia-button"],input:["ia-clearable-text-input"],search:["ia-dropdown-search-bar","ia-expandable-search-bar"],dropdown:["ia-dropdown"],modal:["modal-manager"],loading:["ia-status-indicator"],topnav:["ia-topnav"]};for(const[e,t]of Object.entries(O)){const s=document.createElement("p");s.className="doc-note",s.innerHTML=`Element: ${t.map(i=>`<a href="index.html#elem-${i}"><code>&lt;${i}&gt;</code></a>`).join(", ")}.
    Where the two differ, this section is the target.`,document.querySelector(`#${e} > .doc-section__title`)?.after(s)}k("specs.html");const D=document.getElementById("stage");document.getElementById("vp").append(S(D));document.getElementById("force-focus").addEventListener("change",e=>{if(document.getElementById("force-focus-style")?.remove(),!e.target.checked)return;const t=document.createElement("style");t.id="force-focus-style",t.textContent=`#stage :where(a,button,input,select,textarea,summary,[tabindex]) {
    outline: var(--ia-size-focus-ring) solid var(--ia-color-border-focus);
    outline-offset: var(--ia-size-focus-ring-offset);
  }`,document.head.append(t)});const _=[["goody","The history of Little Goody Two-Shoes","Welsh, Charles",4900,35,2,"texts"],["prelinger","Prelinger Archives newsreel footage","Prelinger, Rick",3700,17,0,"movies"],["librivoxaudio","LibriVox recording of Pride and Prejudice","Austen, Jane",2300,13,1,"texts"],["gutenberg","Project Gutenberg collected editions","Project Gutenberg",3e3,22,3,"texts"],["americana","American Libraries scanned volume","Internet Archive",1200,52,6,"texts"],["no-such-item","A title long enough that it has to wrap onto a second line and then clamp","An unusually long creator name that clamps to one line",810,4,0,"movies"]];document.getElementById("tile-grid").replaceChildren(..._.map(([e,t,s,i,a,n,o])=>{const l=document.createElement("article");return l.className="ia-tile ia-tile--item",l.innerHTML=`
    <button class="ia-tile__info" aria-label="More info about ${t}" aria-expanded="false"
            data-icon="info"></button>
    <a class="ia-tile__link" href="#tiles">
      <h3 class="ia-tile__title">${t}</h3>
      <p class="ia-tile__creator">by ${s}</p>
    </a>
    ${d(o,p(i),a,n)}`,l.prepend(c(e,o)),l}));const J=[["texts","Government Documents (Worldwide)","17,871,144 items","307.1 terabytes"],["americana","American Libraries","4,387,411 items","1.7 petabytes"],["audio","Books by Language","1,461,143 items","444.8 terabytes"],["movies","US Government Documents","9,407,881 items","191.7 terabytes"],["software","JaiGyan: Bharat Ek Khoj","1,027,029 items","314.3 terabytes"],["no-such-collection","A collection whose name is long enough to wrap onto a second line","812 items","4.1 terabytes"]];document.getElementById("collection-tile-grid").replaceChildren(...J.map(([e,t,s,i])=>{const a=document.createElement("article");return a.className="ia-tile ia-tile--collection",a.innerHTML=`
    <a class="ia-tile__link" href="#tiles">
      <h3 class="ia-tile__title">${t}</h3>
    </a>
    ${I(s,i)}`,a.prepend(c(e,"collection")),a}));document.getElementById("other-tile-grid").innerHTML=`
  <article class="ia-tile ia-tile--account">
    <a class="ia-tile__link" href="#tiles"><h3 class="ia-tile__title">@brewster</h3></a>
    <p class="ia-tile__detail">Archivist since 2001</p>
    <ul class="ia-tile__stats" aria-label="Account Stats">
      <li class="ia-tile__stat">${r("user",{size:"lg"})}<span class="ia-visually-hidden">Media Type: Account</span></li>
      <li class="ia-tile__stat">${r("upload",{size:"sm"})}<span class="ia-visually-hidden">Uploads: </span>1.2K</li>
      <li class="ia-tile__stat">${r("star",{size:"sm"})}<span class="ia-visually-hidden">Favorites: </span>310</li>
      <li class="ia-tile__stat">${r("comment",{size:"sm"})}<span class="ia-visually-hidden">Reviews: </span>42</li>
    </ul>
  </article>
  <article class="ia-tile ia-tile--search">
    <span class="ia-tile__thumb"><span class="ia-tile__search-well">${r("search",{size:"2xl"})}</span></span>
    <a class="ia-tile__link" href="#tiles"><h3 class="ia-tile__title">buster keaton AND mediatype:movies</h3></a>
  </article>`;document.querySelector("#other-tile-grid .ia-tile--account").prepend(c("@brewster","texts"));{const e=(t,s,i,a,n,{restricted:o}={})=>{const l=document.createElement("article");l.className="ia-tile ia-tile--item",l.innerHTML=`<a class="ia-tile__link" href="#tiles"><h3 class="ia-tile__title">${i}</h3></a>${a}${n}`;const m=c(t,s);return o&&(m.classList.add("ia-tile__thumb--restricted"),m.insertAdjacentHTML("beforeend",`<p class="ia-tile__overlay">${r("alert",{size:"xl"})}${o}</p>`)),l.prepend(m),l};document.getElementById("content-tile-grid").replaceChildren(e("TheGeneral_201312","movies",'"The General" (1926) starring Buster Keaton','<p class="ia-tile__detail">published 1926</p>',d("movies","32K",107,3)),e("MyMovie_20190318","movies",'"Sherlock Jr." (1924) starring Buster Keaton','<p class="ia-tile__creator">by Buster Keaton</p>',d("movies","1.1K",123,1).replace("All-Time Views: ","Weekly Views: ")),e("sim_photoplay_1925-04_27_5","texts","Photoplay",'<p class="ia-tile__detail">Volume 27, Issue 5</p>',d("texts","2.4K",9,0)),e("busterkeaton00robi","texts","Buster Keaton",`<p class="ia-tile__creator">by Robinson, David</p>
         <p class="ia-tile__snippet">… the great stone face of <mark>Buster</mark> <mark>Keaton</mark>, whose
         films were made between 1920 and 1928 …</p>`,d("texts","456",19,0)),e("no-such-item-restricted","texts","A title only signed-in patrons can view",'<p class="ia-tile__creator">by Anonymous</p>',d("texts","1.4K",6,0),{restricted:"Log in to view this item"}))}const g=[["TheGeneral_201312",'"The General" (1926) starring Buster Keaton',["Buster Keaton","Clyde Bruckman"],"1926","movies",31959,"4.5",3,["Comedy","Silent films","Buster Keaton"],["Silent Films","Feature Films"],"Johnnie Gray, a Southern railroad engineer, sets out alone to recover his locomotive after Union spies steal it."],["busterkeaton00robi","Buster Keaton",["Robinson, David, 1930-"],"1969","texts",456,"",0,["Keaton, Buster, 1895-1966"],["American Libraries"],"A critical study of Keaton’s films."],["OneWeek512kb","One Week",["Buster Keaton","Edward F. Cline"],"1920","movies",1759,"5.0",1,["Comedy","Short films"],["Silent Films"],"Newlyweds assemble a build-it-yourself house from a kit, with a sabotaged numbering."],["SteamboatBillJr_201411",'"Steamboat Bill, Jr." (1928) starring Buster Keaton',["Charles Reisner"],"1928","movies",8160,"",1,["Comedy"],["Feature Films"],"A college student returns home to his father’s riverboat as a cyclone approaches."]],y=e=>`<a class="ia-link" href="#tiles">${e}</a>`,T=([e,t,s,i,a,n,o,l,m,$,L],M="li")=>{const u=document.createElement(M);return u.className="ia-tile-list__row",u.innerHTML=`
    <a class="ia-tile-list__thumb" href="#tiles" tabindex="-1" aria-hidden="true"></a>
    <div class="ia-tile-list__title-line">
      <h3 class="ia-tile-list__title"><a href="#tiles">${t}</a></h3>
      <a class="ia-tile-list__type" data-mediatype="${a}" href="#tiles" title="See More: ${a}">${r(f(a),{size:"md",label:a})}</a>
    </div>
    <div class="ia-tile-list__details">
      <p class="ia-tile-list__line ia-tile-list__clamp"><span class="ia-tile-list__label">By:</span> ${s.map(y).join(", ")}</p>
      <p class="ia-tile-list__line"><span><span class="ia-tile-list__label">Published:</span> ${i}</span></p>
      <p class="ia-tile-list__line"><span><span class="ia-tile-list__label">Views:</span> ${p(n)}</span>
        ${o?`<span><span class="ia-tile-list__label">Avg Rating:</span> ${o}</span>`:""}
        ${l?`<span><span class="ia-tile-list__label">Reviews:</span> ${l}</span>`:""}</p>
      <p class="ia-tile-list__line ia-tile-list__clamp"><span class="ia-tile-list__label">Topics:</span> ${m.map(y).join(", ")}</p>
      <p class="ia-tile-list__line ia-tile-list__clamp"><span class="ia-tile-list__label">Collections:</span> ${$.map(y).join(", ")}</p>
      <p class="ia-tile-list__clamp ia-tile-list__description">${L}</p>
    </div>`,u.querySelector(".ia-tile-list__thumb").append(...c(e,a).childNodes),u};document.getElementById("tile-list-demo").replaceChildren(...g.map(e=>T(e)));{const e=document.getElementById("hover-pane-demo");e.innerHTML=`<div class="ia-hover-pane__header"><a class="ia-link" href="#tiles">
      <img src="https://archive.org/services/img/silent_films" alt="">Silent Films</a></div>
    <div class="ia-hover-pane__body ia-results"></div>`,e.querySelector(".ia-hover-pane__body").append(T(g[0],"div"))}document.getElementById("tile-compact-demo").innerHTML=`
  <div class="ia-tile-compact__row ia-tile-compact__row--header" role="row">
    <span role="columnheader"><span class="ia-visually-hidden">Thumbnail</span></span><span role="columnheader">Title</span>
    <span role="columnheader">Creator</span><span role="columnheader">Published</span><span role="columnheader">Type</span>
    <span role="columnheader" class="ia-tile-compact__views">Weekly Views</span></div>
  ${g.map(([e,t,s,i,a,n])=>`<div class="ia-tile-compact__row" role="row">
    <span role="cell"><span class="ia-tile-compact__thumb" data-thumb="${e}" data-kind="${a}"></span></span>
    <span role="cell" class="ia-tile-compact__title"><a href="#tiles">${t}</a></span>
    <span role="cell">${s[0]}</span><span role="cell">${i}</span>
    <span role="cell" class="ia-tile-compact__type" data-mediatype="${a}">${r(f(a),{size:"md",label:a})}</span>
    <span role="cell" class="ia-tile-compact__views">${p(Math.round(n/40))}</span></div>`).join("")}`;for(const e of document.querySelectorAll("#tile-compact-demo [data-thumb]"))e.append(...c(e.dataset.thumb,e.dataset.kind).childNodes);document.getElementById("search-type-tabs").innerHTML=C("stt","demo-results")+`<div role="tabpanel" id="demo-results" aria-labelledby="stt-0" class="ia-type-meta"
        style="padding-block-start:var(--ia-space-2)">1,228 Results</div>`;document.getElementById("search-md").innerHTML=b("sb-md");document.getElementById("search-lg").innerHTML=b("sb-lg",{size:"lg"});document.getElementById("search-value").innerHTML=b("sb-v",{value:"buster keaton",type:"Text Contents"});document.getElementById("dropdown-demo").innerHTML=A("dd-demo",w,"Relevance",'aria-label="Sort By"');document.getElementById("dropdown-preview").innerHTML=w.slice(0,7).map(e=>`<li aria-selected="${e==="Relevance"}">${e}</li>`).join("");document.getElementById("sort-bar-demo").innerHTML=h("sb","Weekly Views");document.getElementById("sort-bar-demo-asc").innerHTML=h("sb1","Date Published","grid",{direction:"asc"});document.getElementById("sort-bar-demo-relevance").innerHTML=h("sb2","Relevance");document.getElementById("sort-bar-demo-title").innerHTML=h("sb3","Title","grid",{direction:"asc",letter:"K"});document.getElementById("part-thumb").append(c("librivoxaudio","texts"));document.getElementById("part-thumb-collection").append(c("americana","collection"));document.getElementById("part-stats").innerHTML=d("movies","4,900",35,2);for(const[e,t,s]of[["topnav-demo",!1],["topnav-demo-user",!1,{user:"brewster",openType:"texts"}],["topnav-demo-open",!0],["topnav-demo-banner",!1],["topnav-demo-loading",!1]]){const i=document.getElementById(e);i.innerHTML=H(e,t,s),i.querySelector(".ia-topnav__icon-button[aria-controls]").addEventListener("click",a=>{const n=!i.hasAttribute("data-open");i.toggleAttribute("data-open",n),a.currentTarget.setAttribute("aria-expanded",String(n))})}const V=`<fieldset class="ia-facet-group">
    <legend class="ia-facet-group__legend ia-type-subsection">Year Published</legend>
    <div class="ia-facet-histogram" aria-hidden="true">${[2,3,5,9,14,22,30,26,18,12,9,7,6,8,11,16,24,35,48,60,72,64,51,40].map(e=>`<span class="ia-facet-histogram__bar" style="block-size:${e/72*100}%"></span>`).join("")}</div>
    <div class="ia-facet-range">
      <label class="ia-visually-hidden" for="FX-yr-from">From Year</label>
      <input class="ia-input ia-input--sm" id="FX-yr-from" inputmode="numeric" value="1893">
      <span aria-hidden="true">–</span>
      <label class="ia-visually-hidden" for="FX-yr-to">To Year</label>
      <input class="ia-input ia-input--sm" id="FX-yr-to" inputmode="numeric" value="2026">
    </div>
  </fieldset>`,Y=e=>`<button class="ia-button ia-button--link ia-facet-more" type="button" aria-haspopup="dialog">Show More ${e}</button>`,U=[["mediatype","Media Type",[["Movies",912,"in"],["Texts",158],["Audio",83],["Image",60],["Software",5,"out"],["Data",2]],"Media Types"],["year","Year",[["1926",212],["1925",164],["1924",151],["1928",140],["1927",133],["1923",97]],"Years"],["subject","Subject",[["Buster Keaton",524],["Charlie Chaplin",200],["Harold Lloyd",185],["Fatty Arbuckle",166],["1920s",158],["Comedy",140]],"Subjects"],["collection","Collection",[["Community Video",455],["Movies",244],["Feature Films",222],["Silent Films",130],["Comedy Films",77],["Short Films",61]],"Collections",!0],["creator","Creator",[["Buster Keaton",301],["Roscoe Arbuckle",88],["Edward F. Cline",54],["Clyde Bruckman",32],["Joseph M. Schenck",21],["Charles Reisner",12]],"Creators"],["language","Language",[["English",812,"in"],["French",34],["German",21],["Spanish",12],["Italian",9],["Japanese",4]],"Languages"]],v=(e,{clear:t=!1,open:s=!0}={})=>`
  <div class="ia-facets__layout">
    <aside class="ia-facet-rail" aria-label="Filters">
      ${q(`${e}-body`,{clear:t})}
      <div class="ia-facet-rail__body" id="${e}-body">
        ${V.replaceAll("FX",e)}
        ${U.map(([i,a,n,o,l])=>N(`${e}-${i}`,a,E(`${e}-${i}`,n,{links:l})+Y(o),{open:s&&i==="mediatype"})).join("")}
      </div>
    </aside>
    <div class="ia-facets__results">
      <h2 class="ia-results-heading" aria-live="polite">812 Results</h2>
      <p class="ia-type-body" style="margin:0;color:var(--ia-color-text-secondary)">The sort bar and results go here.</p>
    </div>
  </div>`;document.getElementById("facets-wide").innerHTML=v("fw",{clear:!0});document.getElementById("facets-narrow").innerHTML=v("fn",{clear:!0});document.getElementById("facets-opt-in").innerHTML=v("fo");B(document.getElementById("facets"));{const e=document.getElementById("demo-more-facets"),t=["Buster Keaton","Charlie Chaplin","Harold Lloyd","Fatty Arbuckle","1920s","Comedy","Silent films","Short films","Feature films","Slapstick","Railroads","Cinema","Film history","Biography","Vaudeville","Stunts","Hollywood","Mabel Normand","Laurel and Hardy","Mack Sennett","Keystone","Public domain","Restoration","Newsreels","Westerns","Melodrama","Animation","Documentary","Romance","Adventure","Civil War","Boats","Sports","College","Music","Theater","Circus","Photography","Criticism","Interviews"];document.getElementById("dmf-values").innerHTML=E("dmf",t.map((a,n)=>[a,Math.round(524/(1+n*.4)),a==="Buster Keaton"?"in":a==="1920s"?"out":void 0]));const s=document.getElementById("dmf-values"),i=()=>s.clientWidth;for(const a of e.querySelectorAll("[data-pages]"))a.addEventListener("click",()=>s.scrollBy({left:(a.dataset.pages==="next"?1:-1)*i(),behavior:"smooth"}));s.addEventListener("scroll",()=>{e.querySelector("[data-pages=prev]").disabled=s.scrollLeft<=0,e.querySelector("[data-pages=next]").disabled=s.scrollLeft+s.clientWidth>=s.scrollWidth-1},{passive:!0}),B(e),document.getElementById("open-more-facets").addEventListener("click",()=>e.showModal()),e.addEventListener("click",a=>{a.target.closest(".ia-modal__close, [value]")&&e.close()})}document.getElementById("skeleton-grid").innerHTML=Array.from({length:6},()=>`
  <div class="ia-tile ia-tile--item" aria-hidden="true">
    <div class="ia-skeleton" style="block-size:17rem"></div>
    <div style="display:flex;flex-direction:column;gap:var(--ia-space-1);padding:var(--ia-space-1)">
      <div class="ia-skeleton" style="block-size:1.8rem"></div>
      <div class="ia-skeleton" style="block-size:1.8rem;inline-size:70%"></div>
      <div class="ia-skeleton" style="block-size:1.4rem;inline-size:50%"></div>
    </div>
  </div>`).join("")+'<span class="ia-visually-hidden" role="status">Loading search results…</span>';{const e=(t,s,i=s,a="")=>`<button class="ia-button ia-button--stacked" type="button" ${a}>
    ${r(t)}<span class="ia-button__long">${s}</span><span class="ia-button__short" aria-hidden="true">${i}</span></button>`;document.getElementById("item-actions").innerHTML=e("add","Add to List","List")+e("email","Borrow Program","Borrow")+e("star","Favorite","Favorite",'aria-pressed="true"')+e("share","Share")+e("flag","Flag","Flag","data-active")}{const t=W.replace(/^<!--.*?-->\s*/s,"").replace("<svg ",'<svg class="ia-results-placeholder__art" aria-hidden="true" ');document.getElementById("placeholder-empty").innerHTML=`
    <h2 class="ia-results-placeholder__title ia-type-section">Your search did not match any items in the Archive.
      Try different keywords or a more general search.</h2>
    <div class="ia-results-placeholder__actions">
      <button class="ia-button ia-button--secondary" type="button">Clear Filters</button>
      <button class="ia-button ia-button--primary" type="button">Search All Media Types</button>
    </div>${t}`,document.getElementById("placeholder-error").innerHTML=`
    <h2 class="ia-results-placeholder__title ia-type-section">The search engine encountered an error, which might be
      related to your search query. <a class="ia-link" href="#empty">Tips for constructing search queries.</a></h2>
    <div class="ia-results-placeholder__actions">
      <button class="ia-button ia-button--secondary" type="button">Retry</button>
    </div>${t}
    <p class="ia-results-placeholder__details">Error details: Query parse error near “AND OR” at position 14</p>`}x(document.getElementById("search-type-tabs"));for(const e of document.querySelectorAll("#stage form"))e.addEventListener("submit",t=>t.preventDefault());for(const e of document.querySelectorAll(".ia-search-bar__clear"))e.addEventListener("click",()=>{const t=e.parentElement.querySelector("input");t.value="",t.focus()});document.getElementById("carousel-items").replaceChildren(...[..._,..._].map(([e,t,s,i,a,n,o])=>{const l=document.createElement("li");return l.innerHTML=`<article class="ia-tile ia-tile--item">
      <a class="ia-tile__link" href="#carousel"><h4 class="ia-tile__title">${t}</h4>
        <p class="ia-tile__creator">by ${s}</p></a>
      ${d(o,p(i),a,n)}</article>`,l.firstElementChild.prepend(c(e,o)),l}));F();R();K();z();j();G();P();for(const[e,t]of[["open-modal-default","demo-modal-default"],["open-modal","demo-modal"]]){const s=document.getElementById(t);document.getElementById(e).addEventListener("click",()=>s.showModal()),s.addEventListener("click",i=>{i.target.closest("button")&&s.close()})}
