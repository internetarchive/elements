import{r as y,u as t,x as o,y as p,z as d,A as l,C as $,D as f,E as h}from"./site-BTJxegk4.js";/* empty css             */y("foundations.html");const n=e=>e.replace("--ia-",""),r=e=>document.getElementById(e),u=e=>{const a=/^var\((--ia-[\w-]+)\)$/.exec(e.declared);return a?`<span class="doc-swatch__value">via ${n(a[1])}</span>`:""},m=(e,a)=>{const s=e.resolved;return`<div class="doc-swatch">
    <div class="doc-swatch__chip" style="background:${s};color:${a??"var(--ia-color-text-primary)"}">
      ${a?"Aa":""}
    </div>
    <div class="doc-swatch__meta">
      <span class="doc-swatch__name">${n(e.name)}</span>
      <span class="doc-swatch__value">${d(s)}</span>
      ${u(e)}
    </div>
  </div>`};r("surfaces").innerHTML=t("color-surface-").map(e=>/scrim/.test(e.name)?m(e):m(e,/chrome|inverse|collection|theater/.test(e.name)?o("color-text-inverse"):o("color-text-primary"))).join("");r("palette").innerHTML=t("color-palette-").map(e=>m(e)).join("");r("legacy").innerHTML=t("color-legacy-").map(e=>m(e)).join("");{const e=["color-surface-page","color-surface-raised","color-surface-sunken"],a=["color-text-primary","color-text-secondary","color-text-link","color-text-link-hover","color-text-danger"];r("text-matrix").innerHTML=p(["Token","Value",...e.map(s=>({label:n(s).replace("color-surface-",""),num:!0}))],a.map(s=>{const i=o(s);return[`<code>${n("--ia-"+s)}</code>`,`<code>${d(i)}</code>`,...e.map(c=>`<span style="background:${o(c)};padding:0.3rem 0.6rem;border-radius:var(--ia-radius-sm);color:${i}">Aa</span> ${l(i,o(c))}`)]}))}{const e=["primary","secondary","danger","warning","donate","disabled"];r("actions").innerHTML=e.map(a=>{const s=o(`color-action-${a}-fill`),i=o(`color-action-${a}-text`),c=o(`color-action-${a}-border`),v=a==="warning"||a==="secondary",g=v?c:s,b=v?"border vs page":"fill vs page";return`<div class="doc-swatch">
      <div class="doc-swatch__chip" style="background:${s};border:2px solid ${c}">
        <span style="color:${i};font-weight:var(--ia-font-weight-bold)">${a}</span>
      </div>
      <div class="doc-swatch__meta">
        <span class="doc-swatch__value">fill ${d(s)} · border ${d(c)}</span>
        <span>label ${l(i,s)}</span>
        <span>${b} ${a==="disabled"?'<span class="doc-ratio">exempt</span>':l(g,o("color-surface-page"),3)}</span>
      </div>
    </div>`}).join("")}r("status").innerHTML=t("color-status-").filter(e=>!/-(subtle|border)$/.test(e.name)).map(e=>{const a=e.resolved;return`<div class="doc-swatch">
    <div class="doc-swatch__chip" style="background:${o("color-surface-raised")};color:${a};font-weight:var(--ia-font-weight-bold)">Aa</div>
    <div class="doc-swatch__meta">
      <span class="doc-swatch__name">${n(e.name)}</span>
      <span class="doc-swatch__value">${d(a)}</span>
      ${u(e)}
      <span>as text on white ${l(a,o("color-surface-raised"))}</span>
      <span>on sunken ${l(a,o("color-surface-sunken"))}</span>
    </div></div>`}).join("");r("status-tints").innerHTML=["info","success","warning","danger"].map(e=>{const a=o(`color-status-${e}-subtle`),s=o(`color-status-${e}-border`),i=o(`color-status-${e}`);return`<div class="doc-swatch">
    <div class="doc-swatch__chip" style="padding-inline:var(--ia-space-3)">
      <span style="display:flex;align-items:center;gap:var(--ia-space-2);padding:var(--ia-space-2) var(--ia-space-3);background:${a};border:var(--ia-size-border-width) solid ${s};border-radius:var(--ia-radius-default)">
        <span style="color:${i};font-weight:var(--ia-font-weight-bold)">${e}</span>
        <span style="color:var(--ia-color-text-primary)">Message text</span>
      </span>
    </div>
    <div class="doc-swatch__meta">
      <span class="doc-swatch__name">status-${e}-subtle · -border</span>
      <span class="doc-swatch__value">${d(a)} · ${d(s)}</span>
      <span>text ${l(o("color-text-primary"),a)} · ink ${l(i,a)}</span>
    </div></div>`}).join("");r("selected").innerHTML=`
  <div class="doc-swatch">
    <div class="doc-swatch__chip" style="display:flex;align-items:center;justify-content:center;gap:var(--ia-space-1)">
      <span style="display:grid;place-content:center;inline-size:var(--ia-size-control-md);block-size:var(--ia-size-control-md);color:var(--ia-color-text-link)">4</span>
      <span style="display:grid;place-content:center;inline-size:var(--ia-size-control-md);block-size:var(--ia-size-control-md);border-radius:var(--ia-radius-default);background:var(--ia-color-selected-strong-fill);color:var(--ia-color-selected-strong-text);font-weight:var(--ia-font-weight-bold)">5</span>
      <span style="display:grid;place-content:center;inline-size:var(--ia-size-control-md);block-size:var(--ia-size-control-md);color:var(--ia-color-text-link)">6</span>
    </div>
    <div class="doc-swatch__meta"><span class="doc-swatch__name">selected-strong-*</span>
      <span>current page, applied filter, checked box</span>
      <span>${l(o("color-selected-strong-text"),o("color-selected-strong-fill"))}</span></div>
  </div>
  <div class="doc-swatch">
    <div class="doc-swatch__chip" style="background:var(--ia-color-surface-sunken)">
      <span style="padding:var(--ia-space-1) var(--ia-space-3);border:var(--ia-size-border-width) solid var(--ia-color-selected-soft-border);border-radius:var(--ia-radius-sm);background:var(--ia-color-selected-soft-fill);color:var(--ia-color-text-primary)">Grid</span>
    </div>
    <div class="doc-swatch__meta"><span class="doc-swatch__name">selected-soft-*</span>
      <span>chosen view, segment, option; a segment's label stays ink</span>
      <span>${l(o("color-text-primary"),o("color-selected-soft-fill"))}</span></div>
  </div>
  <div class="doc-swatch">
    <div class="doc-swatch__chip" style="background:var(--ia-color-surface-sunken);display:flex;align-items:center;justify-content:center;gap:var(--ia-space-2)">
      <span style="padding:var(--ia-space-1) var(--ia-space-2);border-radius:var(--ia-radius-sm)">Rest</span>
      <span style="padding:var(--ia-space-1) var(--ia-space-2);background-image:linear-gradient(var(--ia-color-hover-overlay),var(--ia-color-hover-overlay));border-radius:var(--ia-radius-sm)">Hover</span>
    </div>
    <div class="doc-swatch__meta"><span class="doc-swatch__name">hover-overlay</span>
      <span class="doc-swatch__value">${o("color-hover-overlay")}</span>
      <span>on the sunken surface — a sunken fill would not show</span></div>
  </div>`;{const e=/-(strong|focus|focus-inverse)$/;r("borders").innerHTML=t("color-border-").map(a=>{const s=a.resolved,i=/inverse/.test(a.name),c=i?o("color-surface-chrome"):o("color-surface-raised"),v=e.test(a.name);return`<div class="doc-swatch">
      <div class="doc-swatch__chip" style="background:${c}">
        <span style="display:block;inline-size:8rem;block-size:3rem;border:2px solid ${s};border-radius:var(--ia-radius-default)"></span>
      </div>
      <div class="doc-swatch__meta">
        <span class="doc-swatch__name">${n(a.name)}</span>
        <span class="doc-swatch__value">${d(s)}</span>
        <span>vs ${i?"chrome":"raised"} ${v?l(s,c,3):`<span class="doc-ratio">${$(s,c).toFixed(2)}:1 · decorative, exempt</span>`}</span>
      </div></div>`}).join("")}r("inverse").innerHTML=`<div class="doc-panel doc-panel--inverse ia-inverse">
  <p class="ia-type-body" style="color:var(--ia-color-text-primary);margin-block-start:0">
    Primary text on chrome ${l(o("color-text-inverse"),o("color-surface-chrome"))}</p>
  <p class="ia-type-body" style="color:var(--ia-color-text-secondary)">
    Secondary text ${l(o("color-text-inverse-secondary"),o("color-surface-chrome"))}</p>
  <p class="ia-type-body"><a class="ia-link" href="#color" style="color:var(--ia-color-text-link)">
    A link on dark chrome</a> ${l(o("color-text-inverse-link"),o("color-surface-chrome"))}</p>
  <button class="ia-button ia-button--secondary">Tab Here for the Inverse Focus Ring</button>
</div>`;{const e=["display","page-title","section","subsection","overline","body","body-strong","prose","meta","caption"];r("roles").innerHTML=e.map(a=>`
    <div style="padding-block:var(--ia-space-2);border-block-end:1px solid var(--ia-color-border-subtle)">
      <div class="ia-type-${a}">The Internet Archive is a non-profit library</div>
      <div class="doc-swatch__value">.ia-type-${a}</div>
    </div>`).join("");for(const a of r("roles").querySelectorAll('[class^="ia-type-"]')){const s=getComputedStyle(a),i=parseFloat(s.fontSize);a.nextElementSibling.textContent+=` — ${i/10}rem / ${s.fontWeight} / ${+(parseFloat(s.lineHeight)/i).toFixed(2)}`}r("type-scale").innerHTML=p(["Token","rem","px","Sample"],t("font-size-").map(a=>[`<code>${n(a.name)}</code>`,`<code>${a.resolved}</code>`,`<span class="num">${parseFloat(a.resolved)*10}</span>`,`<span style="font-size:${a.resolved}">Buster Keaton</span>`])),r("weights").innerHTML=t("font-weight-").map(a=>`<div style="font-weight:${a.resolved};font-size:var(--ia-font-size-xl);padding-block:var(--ia-space-1)">
       ${a.resolved} — ${n(a.name).replace("font-weight-","")} — The Internet Archive
     </div>`).join(""),r("line-heights").innerHTML=t("font-line-height-").map(a=>`<div style="margin-block-end:var(--ia-space-3)">
       <div class="doc-swatch__value">${n(a.name)} — ${a.resolved}</div>
       <p style="line-height:${a.resolved};max-inline-size:60ch;margin:0;color:var(--ia-color-text-primary)">
         The Internet Archive is a non-profit library of millions of free texts, movies,
         software, music, websites, and more.</p>
     </div>`).join("")}r("space-scale").innerHTML=t("space-").filter(e=>/^--ia-space-\d+$/.test(e.name)).map(e=>`<div style="display:flex;align-items:center;gap:var(--ia-space-3);padding-block:0.4rem">
     <code style="min-inline-size:12rem">${n(e.name)}</code>
     <code style="min-inline-size:6rem">${e.resolved}</code>
     <span style="display:block;block-size:1.6rem;inline-size:${e.resolved};background:var(--ia-color-action-primary-fill);border-radius:var(--ia-radius-sm)"></span>
   </div>`).join("");r("radii").innerHTML=t("radius-").map(e=>`<div class="doc-swatch">
     <div class="doc-swatch__chip">
       <span style="display:block;inline-size:8rem;block-size:5rem;background:var(--ia-color-action-primary-fill);border-radius:${e.resolved}"></span>
     </div>
     <div class="doc-swatch__meta"><span class="doc-swatch__name">${n(e.name)}</span>
       <span class="doc-swatch__value">${e.resolved}</span>${u(e)}</div>
   </div>`).join("");r("shadows").innerHTML=t("shadow-").map(e=>`<div class="doc-swatch">
     <div class="doc-swatch__chip" style="background:var(--ia-color-surface-page)">
       <span style="display:block;inline-size:9rem;block-size:4rem;background:var(--ia-color-surface-raised);border-radius:var(--ia-radius-default);box-shadow:${e.resolved}"></span>
     </div>
     <div class="doc-swatch__meta"><span class="doc-swatch__name">${n(e.name)}</span>
       <span class="doc-swatch__value">${e.resolved}</span>${u(e)}</div>
   </div>`).join("");r("motion-demo").innerHTML=t("motion-duration-").map(e=>`<div class="doc-swatch">
     <div class="doc-swatch__chip" style="background:var(--ia-color-surface-page)">
       <span tabindex="0" style="display:block;inline-size:6rem;block-size:4.4rem;background:var(--ia-color-action-primary-fill);border-radius:var(--ia-radius-default);transition:translate ${e.resolved} var(--ia-motion-easing-standard)"
             onmouseover="this.style.translate='4rem 0'" onmouseout="this.style.translate='0'"
             onfocus="this.style.translate='4rem 0'" onblur="this.style.translate='0'"></span>
     </div>
     <div class="doc-swatch__meta"><span class="doc-swatch__name">${n(e.name)}</span>
       <span class="doc-swatch__value">${e.resolved}</span></div>
   </div>`).join("");r("easings").innerHTML=p(["Token","Value","Use"],t("motion-easing-").map(e=>[`<code>${n(e.name)}</code>`,`<code>${e.resolved}</code>`,{standard:"anything that moves and stays",enter:"appearing — decelerate in",exit:"leaving — accelerate out",linear:"progress, spinners",state:"checked, selected, expanded, disabled"}[n(e.name).replace("motion-easing-","")]??""]));r("breakpoints").innerHTML=p(["Token","Value","What changes"],t("breakpoint-").map(e=>[`<code>${n(e.name)}</code>`,`<code>${e.resolved}</code>`,{sm:"result grids gain a second column",md:"wider gutters; inputs return to 1.4rem",lg:"topnav goes desktop; facet rail appears; display and page-title step up",xl:"widest grid tier; the container stops growing"}[n(e.name).replace("breakpoint-","")]??""]));r("containers").innerHTML=p(["Token","Value","Use"],t("container-").map(e=>[`<code>${n(e.name)}</code>`,`<code>${e.resolved}</code>`,{"container-page":"the default page container","container-prose":"continuous text","container-form":"forms","container-gutter":"page gutter above md","container-gutter-narrow":"page gutter at and below md"}[n(e.name)]??""]));r("zindex").innerHTML=p([{label:"Token"},{label:"Value",num:!0}],t("z-index-").map(e=>[`<code>${n(e.name)}</code>`,e.resolved]));r("sizes").innerHTML=p(["Token","Value","px"],t("size-").map(e=>[`<code>${n(e.name)}</code>`,`<code>${e.resolved}</code>`,e.resolved.endsWith("rem")?String(parseFloat(e.resolved)*10):e.resolved]));{const e=f();r("token-count").textContent=e.length;const a=s=>{const i=e.filter(c=>!s||c.name.includes(s)||c.resolved.includes(s)).map(c=>[`<code>${n(c.name)}</code>`,`<code>${h(c.declared)}</code>`,`<code>${h(c.resolved)}</code>`,c.name.startsWith("--ia-theme-")?"compatibility alias":c.name.startsWith("--ia-color-legacy-")?"legacy — not for new code":""]);r("all-tokens").innerHTML=i.length?p(["Token","Declared","Resolved",""],i):'<p class="doc-empty">No tokens match that filter.</p>'};a(""),r("tok-filter").addEventListener("input",s=>a(s.target.value.trim().toLowerCase()))}
