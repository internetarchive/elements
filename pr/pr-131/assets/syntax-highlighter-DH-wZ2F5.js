import{a as g,r as c,n,c as j,i as u,o as d,b as p,_ as m}from"./index-BXm_b8wE.js";const f=g`
  pre {
    max-height: var(--syntax-max-height, none);
    overflow-y: auto;
  }
  pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
  }
  code.hljs {
    padding: 3px 5px;
  }
  /*

Atom One Light by Daniel Gamage
Original One Light Syntax theme from https://github.com/atom/one-light-syntax

base:    #fafafa
mono-1:  #383a42
mono-2:  #686b77
mono-3:  #a0a1a7
hue-1:   #0184bb
hue-2:   #4078f2
hue-3:   #a626a4
hue-4:   #50a14f
hue-5:   #e45649
hue-5-2: #c91243
hue-6:   #986801
hue-6-2: #c18401

*/
  .hljs {
    color: #383a42;
    background: #fafafa;
  }
  .hljs-comment,
  .hljs-quote {
    color: #a0a1a7;
    font-style: italic;
  }
  .hljs-doctag,
  .hljs-keyword,
  .hljs-formula {
    color: #a626a4;
  }
  .hljs-section,
  .hljs-name,
  .hljs-selector-tag,
  .hljs-deletion,
  .hljs-subst {
    color: #e45649;
  }
  .hljs-literal {
    color: #0184bb;
  }
  .hljs-string,
  .hljs-regexp,
  .hljs-addition,
  .hljs-attribute,
  .hljs-meta .hljs-string {
    color: #50a14f;
  }
  .hljs-attr,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-type,
  .hljs-selector-class,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-number {
    color: #986801;
  }
  .hljs-symbol,
  .hljs-bullet,
  .hljs-link,
  .hljs-meta,
  .hljs-selector-id,
  .hljs-title {
    color: #4078f2;
  }
  .hljs-built_in,
  .hljs-title.class_,
  .hljs-class .hljs-title {
    color: #c18401;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: bold;
  }
  .hljs-link {
    text-decoration: underline;
  }
`;var b=Object.defineProperty,y=Object.getOwnPropertyDescriptor,a=(s,t,h,e)=>{for(var l=e>1?void 0:e?y(t,h):t,i=s.length-1,r;i>=0;i--)(r=s[i])&&(l=(e?r(t,h,l):r(l))||l);return e&&l&&b(t,h,l),l};let o=class extends u{constructor(){super(...arguments),this.code="",this.language="auto",this.highlightedCode=""}willUpdate(s){(s.has("code")||s.has("language"))&&this.highlightCode()}render(){return p`
      <pre><code class="hljs">${d(this.highlightedCode)}</code></pre>
    `}async highlightCode(){const t=(await m(()=>import("./index-BBc-AmEf.js"),[],import.meta.url)).default,h=this.code.trim();let e;this.language==="auto"?e=t.highlightAuto(h).value:e=t.highlight(h,{language:this.language}).value,this.highlightedCode=e}static get styles(){return[f]}};a([n({type:String})],o.prototype,"code",2);a([n({type:String})],o.prototype,"language",2);a([c()],o.prototype,"highlightedCode",2);o=a([j("syntax-highlighter")],o);
