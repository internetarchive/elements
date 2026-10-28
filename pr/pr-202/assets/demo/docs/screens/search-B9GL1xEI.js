import{t as u,a as m,s as d,p,q as h,j as y,c as r,f as g,w as b,l as v,h as f,e as _,g as B}from"../../../site-DWhqVh6I.js";document.getElementById("topnav").innerHTML=u("topnav",!1,{search:!1});document.getElementById("sort-bar").innerHTML=m("sort","Relevance");document.getElementById("search-bar").innerHTML=d("main",{value:"buster keaton"});document.getElementById("search-type").innerHTML=p("st","results-panel");h(document.getElementById("search-type"));{const e=document.getElementById("main-type"),a=[...document.querySelectorAll("#search-type [role=tab]")];document.getElementById("search-type").addEventListener("click",t=>{const i=t.target.closest("[role=tab]");i&&(e.value=document.getElementById("scope").textContent=i.textContent)}),e.addEventListener("change",()=>a.find(t=>t.textContent===e.value)?.click())}const k=[["TheGeneral_201312",'"The General" (1926) starring Buster Keaton',"","movies",31959,107,3],["busterkeaton00robi","Buster Keaton","Robinson, David, 1930-","texts",456,19,0],["cig_0430-Salt_Lake_City_History_Minute_-_Buster_Keaton","Salt Lake City History Minute - Buster Keaton","SLCTV","movies",216,0,0],["my-movie_202208",'"Seven Chances" (1925) starring Buster Keaton',"","movies",5492,27,1],["mymovie_202004",'"The Navigator" (1924) starring Buster Keaton',"","movies",17425,40,1],["MyMovie_20190318",'"Sherlock Jr." (1924) starring Buster Keaton',"","movies",29454,123,1],["OneWeek512kb","One Week 512kb","Buster Keaton","movies",1759,16,1],["yorkmba99_hotmail_Vids",'"The Saphead" (1920) starring Buster Keaton',"","movies",12960,13,0],["SteamboatBillJr_201411",'"Steamboat Bill, Jr." (1928) starring Buster Keaton',"","movies",8160,33,1],["GoodNightNurse1918","GOOD NIGHT, NURSE! (1918) -- Roscoe Arbuckle, Buster Keaton, Al St. John","Wm. Thomas Sherman","movies",1920,9,0]],S=e=>e>=1e3?(e/1e3).toFixed(e>=1e4?0:1).replace(/\.0$/,"")+"K":String(e);document.getElementById("results").replaceChildren(...k.map(([e,a,t,i,o,l,c])=>{const n=document.createElement("article");return n.className="ia-tile ia-tile--item",n.innerHTML=`
    <a class="ia-tile__link" href="#maincontent">
      <h3 class="ia-tile__title">${a}</h3>
      ${t?`<p class="ia-tile__creator">by ${t}</p>`:""}
    </a>
    ${y(i,S(o),l,c)}`,n.prepend(r(e,i)),n}));const T=e=>`<button class="ia-button ia-button--link ia-facet-more" type="button" aria-haspopup="dialog">Show More ${e}</button>`,s=(e,a,t,i,o)=>_(`f-${e}`,a,B(e,t,{links:o})+T(i)),C=[1,2,6,12,22,30,26,14,8,5,4,3,4,6,9,12,16,22,28,34,30,24,18,12].map(e=>`<span class="ia-facet-histogram__bar" style="block-size:${e/34*100}%"></span>`).join("");document.getElementById("rail").innerHTML=g("rail-body")+`
  <div class="ia-facet-rail__body" id="rail-body">
    <fieldset class="ia-facet-group">
      <legend class="ia-facet-group__legend ia-type-subsection">Year Published</legend>
      <div class="ia-facet-histogram" aria-hidden="true">${C}</div>
      <div class="ia-facet-range">
        <label class="ia-visually-hidden" for="yr-from">From Year</label>
        <input class="ia-input ia-input--sm" id="yr-from" inputmode="numeric" value="1901">
        <span aria-hidden="true">–</span>
        <label class="ia-visually-hidden" for="yr-to">To Year</label>
        <input class="ia-input ia-input--sm" id="yr-to" inputmode="numeric" value="2025">
      </div>
    </fieldset>
    ${s("mediatype","Media Type",[["Movies",913],["Texts",158],["Audio",83],["Image",60],["Software",5],["Data",3]],"Media Types")}
    ${s("year","Year",[["1926",41],["1925",37],["1924",33],["1928",30],["1927",28],["1923",21]],"Years")}
    ${s("subject","Subject",[["Buster Keaton",524],["Charlie Chaplin",200],["Harold Lloyd",185],["Fatty Arbuckle",166],["1920s",158],["Comedy",140]],"Subjects")}
    ${s("collection","Collection",[["Community Video",455],["Movies",244],["Feature Films",222],["Silent Films",130],["Comedy Films",77],["Short Films",61]],"Collections",!0)}
    ${s("creator","Creator",[["Buster Keaton",301],["Roscoe Arbuckle",88],["Edward F. Cline",54],["Clyde Bruckman",32],["SLCTV",21],["Charles Reisner",12]],"Creators")}
    ${s("language","Language",[["English",477],["Spanish",40],["Handwritten English",19],["French",10],["German",10],["Italian",6]],"Languages")}
  </div>`;b();const E=[["busterkeaton00robi","Buster Keaton","the films of {Buster Keaton} were made between"],["keatonbusterkeat00blesrich","Keaton","when {Keaton} left Arbuckle in 1920"],["silentclowns00kerr","The Silent Clowns","Chaplin, Lloyd and {Keaton} each built"],["photoplay2930chic","Photoplay","a new {Buster Keaton} comedy, The General"],["motionpicturenew35moti","Motion Picture News","{Keaton} has finished shooting College"]];document.getElementById("suggestions").innerHTML=E.map(([e,a,t])=>`<li>
  <article class="ia-tile ia-tile--item" data-id="${e}">
    <a class="ia-tile__link" href="#maincontent"><h3 class="ia-tile__title">${a}</h3></a>
    <p class="ia-tile__snippet">… ${t.replace(/\{(.+?)\}/g,"<mark>$1</mark>")} …</p>
  </article></li>`).join("");for(const e of document.querySelectorAll("#suggestions .ia-tile"))e.prepend(r(e.dataset.id,"texts"));v();for(const e of document.querySelectorAll("form"))e.addEventListener("submit",a=>a.preventDefault());f();
