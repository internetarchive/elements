import{t as s,s as r,a as l,b as c,c as u,f as d,w as m,d as p,h as b,e as y,g}from"../../../site-CV8P5jsN.js";document.getElementById("topnav").innerHTML=s("topnav",!1,{user:"brewster"});document.getElementById("collection-search").innerHTML=r("cs",{type:null,label:"Search This Collection",placeholder:"Search this collection"});document.getElementById("sort-bar").innerHTML=l("sort","Weekly Views");const f=[["government-documents","Government Documents (Worldwide)",17872477,337634826220224],["americana","American Libraries",4390195,0x6a2da7c4f22e5],["booksbylanguage","Books by Language",1465827,489346369324112],["USGovernmentDocuments","US Government Documents",9412971,0xc18ab0238bc5],["folkscanomy","Folkscanomy: A Library of Books",607610,0xc62c8469b447],["JaiGyan","JaiGyan: Bharat Ek Khoj",1829253,345707926688110],["internetarchivebooks","Internet Archive Books",5750916,0xef87e51c558f5],["printdisabled","Books for People with Print Disabilities",5493995,0xe0b9b6d57b1f9]],h=e=>{const a=["bytes","kilobytes","megabytes","gigabytes","terabytes","petabytes"];let t=0;for(;e>=1e3&&t<a.length-1;)e/=1e3,t++;return`${e.toFixed(1)} ${a[t]}`};document.getElementById("results").replaceChildren(...f.map(([e,a,t,o])=>{const i=document.createElement("article");return i.className="ia-tile ia-tile--collection",i.innerHTML=`
    <a class="ia-tile__link" href="#maincontent"><h3 class="ia-tile__title">${a}</h3></a>
    ${c(`${t.toLocaleString("en-US")} items`,h(o))}`,i.prepend(u(e,"collection")),i}));const k=e=>`<button class="ia-button ia-button--link ia-facet-more" type="button" aria-haspopup="dialog">Show More ${e}</button>`,n=(e,a,t,o,i)=>y(`f-${e}`,a,g(e,t,{links:i})+k(o)),v=[1,1,2,2,3,4,5,6,8,9,11,12,14,15,17,18,20,23,27,32,38,34,30,22].map(e=>`<span class="ia-facet-histogram__bar" style="block-size:${e/38*100}%"></span>`).join("");document.getElementById("rail").innerHTML=d("rail-body")+`
  <div class="ia-facet-rail__body" id="rail-body">
    <fieldset class="ia-facet-group">
      <legend class="ia-facet-group__legend ia-type-subsection">Year Published</legend>
      <div class="ia-facet-histogram" aria-hidden="true">${v}</div>
      <div class="ia-facet-range">
        <label class="ia-visually-hidden" for="yr-from">From Year</label>
        <input class="ia-input ia-input--sm" id="yr-from" inputmode="numeric" value="1450">
        <span aria-hidden="true">–</span>
        <label class="ia-visually-hidden" for="yr-to">To Year</label>
        <input class="ia-input ia-input--sm" id="yr-to" inputmode="numeric" value="2026">
      </div>
    </fieldset>
    <section class="ia-facet-group" aria-labelledby="part-of">
      <h3 class="ia-facet-group__legend ia-type-subsection" id="part-of">Part Of</h3>
      <ul class="ia-facet-links"><li><a class="ia-link" href="#maincontent">Internet Archive</a></li></ul>
    </section>
    ${n("mediatype","Media Type",[["Texts",52423147],["Collection",23109],["Data",6],["Image",3],["Software",2],["Audio",1]],"Media Types")}
    ${n("year","Year",[["2015",656158],["2016",629659],["2019",597328],["2018",527924],["2014",515411],["2017",498230]],"Years")}
    ${n("subject","Subject",[["manuals",2637943],["microfilm",2557343],["manualzilla",1641332],["State Department",981397],["CIA Reading Room",978056],["periodicals",812440]],"Subjects")}
    ${n("collection","Collection",[["American Libraries",4390195],["Internet Archive Books",5750916],["Books for People with Print Disabilities",5493995],["US Government Documents",9412971],["Books by Language",1465827],["Folkscanomy",607610]],"Collections",!0)}
    ${n("creator","Creator",[["United States",1180322],["Great Britain",214877],["France",96541],["Library of Congress",88102],["Anonymous",81230],["Unknown",77490]],"Creators")}
    ${n("language","Language",[["English",37301752],["German",1439423],["French",1120810],["Spanish",1094343],["Dutch",771715],["Italian",640118]],"Languages")}
  </div>`;m();p();for(const e of document.querySelectorAll("form"))e.addEventListener("submit",a=>a.preventDefault());b();
