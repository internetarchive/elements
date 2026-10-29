import{r as g,i as f,g as h,j as v,B as b,y,E as w,N as k}from"./site-RCMHBSsD.js";/* empty css           *//* empty css             */const D=`# Principles

What the interface is going for, and where it has to choose. Each principle comes with a
case where both directions are reasonable and the principle tips the decision — most of them
decisions already in [DECISIONS.md](../DECISIONS.md), so the principle is shown doing work.

These are about the product. The principles in the guide's README — derive, don't invent;
follow what ships — are about how the guide itself is made.

## 1. The collection is the content

Chrome recedes so that thumbnails, titles and metadata carry the page. One accent — the
navy — muted status colors, and ornament used sparingly. The interface should be forgettable
so the collection is not.

> **Decides:** media-type colors appear on the tile's type glyph and nowhere else on the tile
> ([D-43](../DECISIONS.md#d-43)). A card tinted per media type would be more distinctive, and
> it would compete with fifty thumbnails that already bring their own color.

## 2. A dark frame around a light page

The \`#222\` topnav and the dark menus are archive.org's strongest visual cue — the thing a
returning visitor recognizes before reading a word. Content surfaces stay light and neutral,
so the colors of a film still, a scanned page or a screenshot read true.

> **Decides:** the grays stay neutral, with the faint cool cast of \`#fbfbfd\` and \`#f1f1f4\`,
> rather than warming toward paper. Dark panels — the dropdown, the menu — use the inverse
> tokens rather than a color set of their own.

## 3. Dense on the desk, generous to the thumb

People spend hours in results and facets. A fine pointer gets compact controls and more on
the screen; a coarse pointer gets 44px targets. The pointer decides, not the screen width —
a touch laptop is wide and coarse.

> **Decides:** facet rows are 30px on a mouse and 44px on touch ([D-17](../DECISIONS.md#d-17)).
> 44px everywhere would be simpler and would halve the facets visible on a laptop.

## 4. Everything answers back

A pointer landing, a key pressed, a click made: each gets an immediate, visible response.
Press squeezes; selection changes on the same frame. The site should feel like it is
listening even when the server is slow.

> **Decides:** controls squeeze on press, by a scale tiered to their width so every edge
> travels about the same distance ([D-49](../DECISIONS.md#d-49)).

## 5. Never hide the wait

Loading, saving and progress are part of the interface, not a failure state. A wait long
enough to notice shows a skeleton, a spinner or progress, and says what is loading.

> **Decides:** grids get skeletons shaped like what is coming, never a spinner; a button keeps
> its label and width while it works. Under about 300ms nothing shows, because a flash of
> skeleton reads worse than a brief pause ([patterns/empty-loading-error.md](../patterns/empty-loading-error.md)).

## 6. The keyboard is a first-class pointer

Every control is reachable by Tab, every stop shows the ring, forms submit on Enter, and
focus never gets lost inside a shadow root or an overlay.

> **Decides:** every \`outline: none\` in the topnav is deleted ([D-19](../DECISIONS.md#d-19)),
> including where a designer preferred the look without a ring. Half the live keyboard
> stops have no indicator at all.

## 7. One way to say each thing

One selected look, one hover mechanism, one focus ring, one icon system. When two components
disagree, one of them is wrong. Fewer patterns is the point, even when the second one is
nicer.

> **Decides:** "this one is chosen" is two token tiers, strong and soft, instead of a surface
> chosen per component ([D-45](../DECISIONS.md#d-45)); hover is one translucent
> overlay ([D-46](../DECISIONS.md#d-46)); Iconochive and Glyphicons converge on inline SVG
> ([D-18](../DECISIONS.md#d-18)).

## 8. Nothing shifts

Layout stability is a feature. Reserved space for what is loading, tabular figures for
anything that counts, no size change that moves the neighbors. A page that jumps feels
broken even when it isn't.

> **Decides:** the tile's thumbnail is a fixed 170px, not an aspect ratio; a tab strip keeps
> one height at every breakpoint; a collapsed description reserves its collapsed height
> before it measures ([read-more.md](../components/read-more.md)).

## 9. Accessible is the floor

WCAG 2.2 AA ([D-38](../DECISIONS.md#d-38)), checked by \`src/themes/tokens.node.test.ts\` against the surface
a color is actually drawn on, not against white.

> **Decides:** every edge that tells you where a control begins clears 3:1 — \`#666\` on a
> text field, not the \`#ccc\` hairline live uses (elements' \`ia-clearable-text-input\`) — even
> where the hairline looks lighter ([components/input.md](../components/input.md)).

## 10. Every language, every script

Titles, creators and descriptions arrive in hundreds of languages, from uploaders, at any
length. Layout survives any script, any direction and any string.

> **Decides:** the stylesheet uses logical properties only — \`padding-inline\`, never
> \`padding-left\` — and user-supplied titles carry \`dir="auto"\`, so a Latin name inside an
> Arabic title keeps its order. The Playground (\`playground.html\` in the demo) tests both.

## Tensions

The conflicts that keep coming up, and how they are resolved so far.

| Tension | Resolution |
| --- | --- |
| **Density vs. touch** | Resolved by pointer type (D-17). Contrast is never traded for density. |
| **Endless browsing vs. reachability** | Infinite scroll, with nothing essential below it ([D-27](../DECISIONS.md#d-27)); numbered pages where a set is linkable. |
| **Honesty vs. calm** | Showing every wait adds activity. Feedback is local and small — a spinner in the button that was pressed — never page-wide unless the page itself is loading. |
| **One system vs. the legacy page** | Offshoot is the target. petabox pages migrate when they are touched, and new work never adds a petabox-only pattern. |
| **One system vs. the special case** | An exception is allowed only where the shared component can't be extended. Every bespoke piece is a debt the next person inherits. |
`;g("principles.html");const s=(n,e)=>`<div class="pf-stack">${n}<span class="pf-caption">${e}</span></div>`,u={1:[["A Visit to the Library","texts","4.9K",35,2],["Live at the Fillmore","audio","2.3K",13,1]].map(([n,e,o,i,l])=>`<div class="pf-card"><span class="ia-tile__title">${n}</span>${v(e,o,i,l)}</div>`).join(""),2:`<div class="pf-page"><div class="pf-page__chrome"><img src="${b["ia-logo-white"]}" alt="" height="18"></div>
      <div class="pf-page__body">${"<span></span>".repeat(6)}<div class="pf-page__menu"><i></i><i></i><i></i></div></div></div>`,3:s(`<div class="pf-rows">${h("pf-mouse",[["Texts",812],["Audio",96]])}</div>`,"Mouse · 30px")+s(`<div class="pf-rows pf-rows--touch">${h("pf-touch",[["Texts",812],["Audio",96]])}</div>`,"Touch · 44px"),4:[["","Rest"],["pf-hover","Hover"],["pf-press","Press"]].map(([n,e])=>s(`<button class="ia-button ia-button--secondary ia-button--sm ${n}" type="button">Favorite</button>`,e)).join(""),5:s(`<div class="pf-skeleton"><div class="ia-skeleton" style="block-size:7rem"></div>
       <div class="ia-skeleton" style="block-size:1.4rem"></div><div class="ia-skeleton" style="block-size:1.4rem;inline-size:60%"></div></div>`,"Loading")+s('<button class="ia-button ia-button--primary" type="button" aria-busy="true">Saving</button>',"Working"),6:`<span class="pf-key">Tab</span>${f("chevron-right",{size:"sm"})}<button class="ia-button ia-button--primary pf-focus" type="button">Save Changes</button>`,7:s('<label class="ia-choice"><input class="ia-choice__control" type="checkbox" checked><span class="ia-choice__label">Texts</span></label>',"Strong")+s('<div class="ia-segmented ia-segmented--sm"><button class="ia-segmented__option" type="button" aria-checked="true" role="radio">Metadata</button><button class="ia-segmented__option" type="button" aria-checked="false" role="radio">Text Contents</button></div>',"Soft"),8:["Uploads","Favorites"].map(n=>`<div class="ia-tabs" style="inline-size:fit-content">${["Uploads","Loans","Favorites"].map(e=>`<button class="ia-tab" role="tab" aria-selected="${e===n}" data-label="${e}">${e}</button>`).join("")}</div>`).join(""),9:s('<input class="ia-input pf-field" value="brewster" aria-label="Screen Name"><span class="pf-ratio">5.74:1</span>',"Spec · #666")+s('<input class="ia-input pf-field pf-field--hairline" value="brewster" aria-label="Screen Name"><span class="pf-ratio pf-ratio--fail">1.61:1</span>',"Live · #ccc"),10:`<div class="pf-titles"><p dir="auto">أرشيف Prelinger للأفلام التاريخية</p><p dir="auto">東京の古地図コレクション</p>
       <p dir="auto">Donaudampfschifffahrtsgesellschaftskapitänsmütze</p></div>`},S=n=>new URL(n,`${k}foundations/`).href,c=n=>w(n).replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/\*([^*]+)\*/g,"<em>$1</em>").replace(/\[([^\]]+)\]\(([^)]+)\)/g,(e,o,i)=>`<a href="${S(i)}">${o}</a>`),d=n=>n.trim().split(/\n\s*\n/).map(e=>e.trim()).filter(Boolean),p=n=>`<p>${c(n.replace(/\n/g," "))}</p>`,m=n=>n.trim().replace(/^\||\|$/g,"").split("|").map(e=>c(e.trim()));{const[n,...e]=D.split(/^## (.+)$/m),o=n.replace(/^# .+$/m,"");document.getElementById("intro").innerHTML=d(o).map(p).join("");const i=[];let l="";for(let t=0;t<e.length;t+=2){const a=e[t].match(/^(\d+)\.\s+(.+)$/);a?i.push({n:a[1],title:a[2],body:e[t+1]}):e[t]==="Tensions"&&(l=e[t+1])}document.getElementById("cards").innerHTML=i.map(t=>{const a=d(t.body).map(r=>r.startsWith(">")?`<p class="principle__label">Decides</p>
         <p class="principle__decides">${c(r.replace(/^>\s?/gm,"").replace(/^\*\*Decides:\*\*\s*/,"").replace(/\n/g," "))}</p>`:p(r)).join("");return`<article class="principle" id="p-${t.n}">
      ${u[t.n]?`<div class="principle__figure" aria-hidden="true" inert>${u[t.n]}</div>`:""}
      <span class="principle__number">${t.n.padStart(2,"0")}</span>
      <h3 class="ia-type-section">${c(t.title)}</h3>
      ${a}
    </article>`}).join(""),document.getElementById("tension-body").innerHTML=d(l).map(t=>{if(!t.startsWith("|"))return p(t);const[a,,...r]=t.split(`
`);return y(m(a),r.map(m))}).join("")}location.hash&&document.querySelector(location.hash)?.scrollIntoView();
