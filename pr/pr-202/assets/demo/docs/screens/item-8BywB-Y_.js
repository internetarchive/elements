import{t as c,i as o,m,j as u,c as p,k as h,l as f,d as _,h as b}from"../../../site-ChfTGo1o.js";/* empty css                  */document.getElementById("topnav").innerHTML=c("topnav",!1,{user:"brewster"});document.getElementById("type").innerHTML=o(m("texts"),{size:"2xl",label:"Texts"});const n=(e,a,t=a,s="")=>`<button class="ia-button ia-button--stacked" type="button" ${s}>
  ${o(e)}<span class="ia-button__long">${a}</span><span class="ia-button__short" aria-hidden="true">${t}</span></button>`;document.getElementById("actions").innerHTML=`
  <span class="ia-menu-anchor">
    ${n("add","Add to List","List",'aria-haspopup="menu" aria-expanded="false" aria-controls="list-picker"')}
    <ul class="ia-menu ia-inverse" id="list-picker" role="menu" aria-label="Add to List" hidden>
      <li role="none"><button class="ia-menu__item" role="menuitemcheckbox" aria-checked="false" tabindex="-1">Children's Books</button></li>
      <li role="none"><button class="ia-menu__item" role="menuitemcheckbox" aria-checked="false" tabindex="-1">Read Later</button></li>
      <li role="separator" class="ia-menu__separator"></li>
      <li role="none"><button class="ia-menu__item" role="menuitem" tabindex="-1">${o("add",{size:"sm"})}Create New List</button></li>
    </ul>
  </span>
  ${n("star","Favorite","Favorite",'aria-pressed="true"')}
  ${n("share","Share")}
  <span class="ia-menu-anchor ia-menu-anchor--end">
    ${n("flag","Flag","Flag",'aria-haspopup="menu" aria-expanded="false" aria-controls="flag-panel"')}
    <div class="ia-flag-panel" id="flag-panel" role="menu" aria-labelledby="flag-title" hidden>
      <p class="ia-flag-panel__title" id="flag-title">Flag This Item For</p>
      ${["Graphic Violence","Explicit Sexual Content","Hate Speech","Misinformation"].map(e=>`<button class="ia-menu__item" role="menuitemcheckbox" aria-checked="false" tabindex="-1">${e}</button>`).join("")}
    </div>
  </span>`;document.querySelector("[aria-pressed]").addEventListener("click",e=>e.currentTarget.setAttribute("aria-pressed",String(e.currentTarget.getAttribute("aria-pressed")!=="true")));const g=[["A charming early children's book",5,"readingroom","March 2, 2019","A clean, complete scan, and an easy read for anyone curious about how children's stories were told in the 1760s."],["Good scan, small type",4,"bookworm1881","August 14, 2017","The facsimile pages are crisp. The introduction is the most useful part for research."],["Useful for a class",4,"teacher_k","January 9, 2016","We read it alongside the 1765 first edition. Worth having both."]];document.getElementById("review-list").innerHTML=g.map(([e,a,t,s,r])=>`
  <li class="ia-review">
    <h3 class="ia-review__title">${e}</h3>
    <p class="ia-review__meta">
      <span class="ia-review__stars" role="img" aria-label="${a} out of 5 stars">${Array.from({length:5},($,d)=>o("star",{size:"sm"}).replace("<svg ",d<a?"<svg ":"<svg data-off ")).join("")}</span>
      <span>by <a class="ia-link" href="#maincontent">${t}</a></span><span>${s}</span>
    </p>
    <p class="ia-review__body">${r}</p>
  </li>`).join("");const w=[["ABBYY GZ",1,"4.2M"],["DAISY",1,"1.1M","For users with print disabilities"],["EPUB",1,"612K"],["Full Text",1,"201K"],["PDF",2,"18.3M"],["Single Page Processed JP2 ZIP",1,"221.4M"],["Torrent",1,"30K"]],i=document.getElementById("download-list"),l=()=>{i.innerHTML=w.map(([e,a,t,s])=>`
    <li class="ia-downloads__row">
      <span>${a===1?`<a class="ia-downloads__format" href="#maincontent"><span class="ia-downloads__size">${t}</span>${e}<span class="ia-downloads__pill" aria-hidden="true">${o("download")}</span></a>`:`<button class="ia-downloads__format" type="button" aria-expanded="false" data-format="${e}">${e}<span class="ia-downloads__caret">${o("caret",{size:"sm"})}</span></button>`}
        ${s?`<span class="ia-downloads__note">${s}</span>`:""}</span>
      <a class="ia-downloads__count" href="#maincontent">${a} ${a===1?"file":"files"}</a>
    </li>`).join(""),i.nextElementSibling.hidden=!1,i.previousElementSibling.textContent="Download Options"};i.addEventListener("click",e=>{const a=e.target.closest("[data-format]");if(a){const t=a.dataset.format;i.previousElementSibling.textContent=`${t} Files`,i.nextElementSibling.hidden=!0,i.innerHTML=`
      <li class="ia-downloads__expanded-head"><button class="ia-button ia-button--link" type="button" data-back>${o("chevron-left",{size:"sm"})}Back</button>
        <a class="ia-downloads__badge" href="#maincontent">${o("download",{size:"sm"})}2 files</a></li>
      <li class="ia-downloads__file"><a class="ia-link" href="#maincontent">goody.pdf</a><span>17.9M</span></li>
      <li class="ia-downloads__file"><a class="ia-link" href="#maincontent">goody_text.pdf</a><span>412K</span></li>`,i.querySelector("[data-back]").focus()}e.target.closest("[data-back]")&&(l(),i.querySelector("[data-format]").focus())});l();const y=[["historygoodytwos00goldiala","The history of little Goody Two-Shoes : ornamented with cuts","Goldsmith, Oliver","3.3K"],["GoodyTwoShoes00CranA","Goody Two Shoes","Crane, Walter","2K"],["historyoflittleg00goldiala","The history of little Goody Two-Shoes : otherwise called Mrs Margery Two-Shoes","Goldsmith, Oliver","6.1K"],["adventuresofgood00goldiala","Adventures of Goody Two Shoes","Goldsmith, Oliver","1.7K"],["goodytwoshoesfac00golduoft","Goody Two-Shoes; a facsimile reproduction of the edition of 1766","Goldsmith, Oliver","1.1K"],["littlegoodytwosh00bant","Little Goody Two Shoes,","Banta, Nathaniel Moore","480"]];document.getElementById("similar-items").innerHTML=y.map(([e,a,t,s])=>`<li>
  <article class="ia-tile ia-tile--item" data-id="${e}">
    <a class="ia-tile__link" href="#maincontent"><h3 class="ia-tile__title">${a}</h3></a>
    ${t?`<p class="ia-tile__creator">by ${t}</p>`:""}
    ${u("texts",s,4,0)}
  </article></li>`).join("");for(const e of document.querySelectorAll("#similar-items .ia-tile"))e.prepend(p(e.dataset.id,"texts"));h();f();_();b();
