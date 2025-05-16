"use strict";(self.webpackChunkklipper_docs=self.webpackChunkklipper_docs||[]).push([["18815"],{92952:function(t,e,i){i.d(e,{zM:function(){return d}});let n=["abort","canplay","canplaythrough","durationchange","emptied","encrypted","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting","waitingforkey","resize","enterpictureinpicture","leavepictureinpicture","webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"],s=["autopictureinpicture","disablepictureinpicture","disableremoteplayback","autoplay","controls","controlslist","crossorigin","loop","muted","playsinline","poster","preload","src"];function r(t){return`
    <style>
      :host {
        display: inline-flex;
        line-height: 0;
        flex-direction: column;
        justify-content: end;
      }

      audio {
        width: 100%;
      }
    </style>
    <slot name="media">
      <audio${l(t)}></audio>
    </slot>
    <slot></slot>
  `}function o(t){return`
    <style>
      :host {
        display: inline-block;
        line-height: 0;
      }

      video {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, 50% 50%);
      }

      video::-webkit-media-text-track-container {
        transform: var(--media-webkit-text-track-transform);
        transition: var(--media-webkit-text-track-transition);
      }
    </style>
    <slot name="media">
      <video${l(t)}></video>
    </slot>
    <slot></slot>
  `}function a(t,{tag:e,is:i}){let a=globalThis.document?.createElement?.(e,{is:i}),l=a?function(t){let e=[];for(let i=Object.getPrototypeOf(t);i&&i!==HTMLElement.prototype;i=Object.getPrototypeOf(i)){let t=Object.getOwnPropertyNames(i);e.push(...t)}return e}(a):[];return class d extends t{static getTemplateHTML=e.endsWith("audio")?r:o;static shadowRootOptions={mode:"open"};static Events=n;static #t=!1;static get observedAttributes(){return d.#e(),[...a?.constructor?.observedAttributes??[],...s]}static #e(){if(this.#t)return;this.#t=!0;let t=new Set(this.observedAttributes);for(let e of(t.delete("muted"),l))if(!(e in this.prototype)){if("function"==typeof a[e])this.prototype[e]=function(...t){return this.#i(),(()=>{if(this.call)return this.call(e,...t);let i=this.nativeEl?.[e];return i?.apply(this.nativeEl,t)})()};else{let i={get(){this.#i();let i=e.toLowerCase();if(t.has(i)){let t=this.getAttribute(i);return null!==t&&(""===t||t)}return this.get?.(e)??this.nativeEl?.[e]}};e!==e.toUpperCase()&&(i.set=function(i){this.#i();let n=e.toLowerCase();if(t.has(n)){!0===i||!1===i||null==i?this.toggleAttribute(n,!!i):this.setAttribute(n,i);return}if(this.set){this.set(e,i);return}this.nativeEl&&(this.nativeEl[e]=i)}),Object.defineProperty(this.prototype,e,i)}}}#n=!1;#s=null;#r=new Map;#o;get;set;call;get nativeEl(){return this.#i(),this.#s??this.querySelector(":scope > [slot=media]")??this.querySelector(e)??this.shadowRoot?.querySelector(e)??null}set nativeEl(t){this.#s=t}get defaultMuted(){return this.hasAttribute("muted")}set defaultMuted(t){this.toggleAttribute("muted",t)}get src(){return this.getAttribute("src")}set src(t){this.setAttribute("src",`${t}`)}get preload(){return this.getAttribute("preload")??this.nativeEl?.preload}set preload(t){this.setAttribute("preload",`${t}`)}#i(){this.#n||(this.#n=!0,this.init())}init(){if(!this.shadowRoot){this.attachShadow({mode:"open"});let t=function(t){let e={};for(let i of t)e[i.name]=i.value;return e}(this.attributes);i&&(t.is=i),e&&(t.part=e),this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t)}for(let t of(this.nativeEl.muted=this.hasAttribute("muted"),l))this.#a(t);for(let t of(this.#o=new MutationObserver(this.#l.bind(this)),this.shadowRoot.addEventListener("slotchange",this),this.#d(),this.constructor.Events))this.shadowRoot?.addEventListener(t,this,!0)}handleEvent(t){if("slotchange"===t.type){this.#d();return}t.target===this.nativeEl&&this.dispatchEvent(new CustomEvent(t.type,{detail:t.detail}))}#d(){let t=new Map(this.#r),e=this.shadowRoot?.querySelector("slot:not([name])");(e?.assignedElements({flatten:!0}).filter(t=>["track","source"].includes(t.localName))).forEach(e=>{t.delete(e);let i=this.#r.get(e);i||(i=e.cloneNode(),this.#r.set(e,i),this.#o?.observe(e,{attributes:!0})),this.nativeEl?.append(i),this.#u(i)}),t.forEach((t,e)=>{t.remove(),this.#r.delete(e)})}#l(t){for(let e of t)if("attributes"===e.type){let{target:t,attributeName:i}=e,n=this.#r.get(t);n&&i&&(n.setAttribute(i,t.getAttribute(i)??""),this.#u(n))}}#u(t){t&&"track"===t.localName&&t.default&&("chapters"===t.kind||"metadata"===t.kind)&&"disabled"===t.track.mode&&(t.track.mode="hidden")}#a(t){if(Object.prototype.hasOwnProperty.call(this,t)){let e=this[t];delete this[t],this[t]=e}}attributeChangedCallback(t,e,i){this.#i(),this.#c(t,e,i)}#c(t,e,i){!["id","class"].includes(t)&&!(!d.observedAttributes.includes(t)&&this.constructor.observedAttributes.includes(t))&&(null===i?this.nativeEl?.removeAttribute(t):this.nativeEl?.getAttribute(t)!==i&&this.nativeEl?.setAttribute(t,i))}connectedCallback(){this.#i()}}}function l(t){let e="";for(let i in t){if(!s.includes(i))continue;let n=t[i];""===n?e+=` ${i}`:e+=` ${i}="${n}"`}return e}let d=a(globalThis.HTMLElement??class{},{tag:"video"});a(globalThis.HTMLElement??class{},{tag:"audio"})},58038:function(t,e,i){i.r(e),i.d(e,{default:()=>d});var n=i("67294"),s=i("92952");class r extends s.zM{static shadowRootOptions={...s.zM.shadowRootOptions};static getTemplateHTML=t=>{let{src:e,...i}=t;return s.zM.getTemplateHTML(i)};#h;attributeChangedCallback(t,e,i){"src"!==t&&super.attributeChangedCallback(t,e,i),"src"===t&&e!=i&&this.load()}async load(){if(this.#h)this.api.attachSource(this.src);else{this.#h=!0;let t=await i.e("32451").then(i.bind(i,37073));this.api=t.MediaPlayer().create(),this.api.initialize(this.nativeEl,this.src,this.autoplay)}}}globalThis.customElements&&!globalThis.customElements.get("dash-video")&&globalThis.customElements.define("dash-video",r);var o=new Set(["style","children","ref","key","suppressContentEditableWarning","suppressHydrationWarning","dangerouslySetInnerHTML"]),a={className:"class",htmlFor:"for"};function l(t,e,i){var n;t[e]=i,null==i&&e in((null==(n=globalThis.HTMLElement)?void 0:n.prototype)??{})&&t.removeAttribute(e)}var d=function({react:t,tagName:e,elementClass:i,events:n,displayName:s,toAttributeName:r=function(t){return t.toLowerCase()},toAttributeValue:d=function(t){return"boolean"==typeof t?t?"":void 0:"function"==typeof t?void 0:"object"!=typeof t||null===t?t:void 0}}){let u=Number.parseInt(t.version)>=19,c=t.forwardRef((s,c)=>{var h,p;let f=t.useRef(null),b=t.useRef(new Map),m={},v={},g={},y={};for(let[t,e]of Object.entries(s)){if(o.has(t)){g[t]=e;continue}let n=r(a[t]??t);if(t in i.prototype&&!(t in((null==(h=globalThis.HTMLElement)?void 0:h.prototype)??{}))&&!(null==(p=i.observedAttributes)?void 0:p.some(t=>t===n))){y[t]=e;continue}if(t.startsWith("on")){m[t]=e;continue}let s=d(e);n&&null!=s&&(v[n]=String(s),u||(g[n]=s)),n&&u&&(g[n]=e)}if("undefined"!=typeof window){for(let e in m){let i=m[e],s=e.endsWith("Capture"),r=((null==n?void 0:n[e])??e.slice(2).toLowerCase()).slice(0,s?-7:void 0);t.useLayoutEffect(()=>{let t=null==f?void 0:f.current;if(t&&"function"==typeof i)return t.addEventListener(r,i,s),()=>{t.removeEventListener(r,i,s)}},[null==f?void 0:f.current,i])}t.useLayoutEffect(()=>{if(null===f.current)return;let t=new Map;for(let e in y)l(f.current,e,y[e]),b.current.delete(e),t.set(e,y[e]);for(let[t,e]of b.current)l(f.current,t,void 0);b.current=t})}if("undefined"==typeof window&&(null==i?void 0:i.getTemplateHTML)&&(null==i?void 0:i.shadowRootOptions)){let{mode:e,delegatesFocus:n}=i.shadowRootOptions,r=t.createElement("template",{shadowrootmode:e,shadowrootdelegatesfocus:n,dangerouslySetInnerHTML:{__html:i.getTemplateHTML(v,s)}});g.children=[r,g.children]}return t.createElement(e,{...g,ref:t.useCallback(t=>{f.current=t,"function"==typeof c?c(t):null!==c&&(c.current=t)},[c])})});return c.displayName=s??i.name,c}({react:n,tagName:"dash-video",elementClass:r})}}]);