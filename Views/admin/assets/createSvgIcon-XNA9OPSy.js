import{h as a,F as G,_ as b,G as J,H as K,I as q,J as Q,e as X,K as Y,T as D,i as Z,g as N,k as z,r as O,j as E,f as ee}from"./index-algzo-nC.js";function L(e,o){const t=a({},o);return Object.keys(e).forEach(n=>{if(n.toString().match(/^(components|slots)$/))t[n]=a({},e[n],t[n]);else if(n.toString().match(/^(componentsProps|slotProps)$/)){const r=e[n]||{},s=o[n];t[n]={},!s||!Object.keys(s)?t[n]=r:!r||!Object.keys(r)?t[n]=s:(t[n]=a({},s),Object.keys(r).forEach(i=>{t[n][i]=L(r[i],s[i])}))}else t[n]===void 0&&(t[n]=e[n])}),t}function te(e,o,t=void 0){const n={};return Object.keys(e).forEach(r=>{n[r]=e[r].reduce((s,i)=>{if(i){const c=o(i);c!==""&&s.push(c),t&&t[i]&&s.push(t[i])}return s},[]).join(" ")}),n}const oe=["ownerState"],ne=["variants"],re=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function se(e){return Object.keys(e).length===0}function ie(e){return typeof e=="string"&&e.charCodeAt(0)>96}function j(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const le=K(),ce=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function C({defaultTheme:e,theme:o,themeId:t}){return se(o)?e:o[t]||o}function ae(e){return e?(o,t)=>t[e]:null}function I(e,o){let{ownerState:t}=o,n=b(o,oe);const r=typeof e=="function"?e(a({ownerState:t},n)):e;if(Array.isArray(r))return r.flatMap(s=>I(s,a({ownerState:t},n)));if(r&&typeof r=="object"&&Array.isArray(r.variants)){const{variants:s=[]}=r;let c=b(r,ne);return s.forEach(l=>{let u=!0;typeof l.props=="function"?u=l.props(a({ownerState:t},n)):Object.keys(l.props).forEach(f=>{(t==null?void 0:t[f])!==l.props[f]&&n[f]!==l.props[f]&&(u=!1)}),u&&(Array.isArray(c)||(c=[c]),c.push(typeof l.style=="function"?l.style(a({ownerState:t},n)):l.style))}),c}return r}function ue(e={}){const{themeId:o,defaultTheme:t=le,rootShouldForwardProp:n=j,slotShouldForwardProp:r=j}=e,s=i=>q(a({},i,{theme:C(a({},i,{defaultTheme:t,themeId:o}))}));return s.__mui_systemSx=!0,(i,c={})=>{G(i,d=>d.filter(v=>!(v!=null&&v.__mui_systemSx)));const{name:l,slot:u,skipVariantsResolver:f,skipSx:S,overridesResolver:h=ae(ce(u))}=c,g=b(c,re),m=f!==void 0?f:u&&u!=="Root"&&u!=="root"||!1,w=S||!1;let T,x=j;u==="Root"||u==="root"?x=n:u?x=r:ie(i)&&(x=void 0);const P=J(i,a({shouldForwardProp:x,label:T},g)),F=d=>typeof d=="function"&&d.__emotion_real!==d||Q(d)?v=>I(d,a({},v,{theme:C({theme:v.theme,defaultTheme:t,themeId:o})})):d,M=(d,...v)=>{let A=F(d);const _=v?v.map(F):[];l&&h&&_.push(y=>{const p=C(a({},y,{defaultTheme:t,themeId:o}));if(!p.components||!p.components[l]||!p.components[l].styleOverrides)return null;const $=p.components[l].styleOverrides,R={};return Object.entries($).forEach(([H,W])=>{R[H]=I(W,a({},y,{theme:p}))}),h(y,R)}),l&&!m&&_.push(y=>{var p;const $=C(a({},y,{defaultTheme:t,themeId:o})),R=$==null||(p=$.components)==null||(p=p[l])==null?void 0:p.variants;return I({variants:R},a({},y,{theme:$}))}),w||_.push(s);const V=_.length-v.length;if(Array.isArray(d)&&V>0){const y=new Array(V).fill("");A=[...d,...y],A.raw=[...d.raw,...y]}const B=P(A,..._);return i.muiName&&(B.muiName=i.muiName),B};return P.withConfig&&(M.withConfig=P.withConfig),M}}function fe(e){const{theme:o,name:t,props:n}=e;return!o||!o.components||!o.components[t]||!o.components[t].defaultProps?n:L(o.components[t].defaultProps,n)}function de({props:e,name:o,defaultTheme:t,themeId:n}){let r=X(t);return n&&(r=r[n]||r),fe({theme:r,name:o,props:e})}const he=Y(),U=he;function me({props:e,name:o}){return de({props:e,name:o,defaultTheme:U,themeId:D})}const pe=e=>j(e)&&e!=="classes",Se=ue({themeId:D,defaultTheme:U,rootShouldForwardProp:pe});function ve(e){return Z("MuiSvgIcon",e)}N("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const ye=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],ge=e=>{const{color:o,fontSize:t,classes:n}=e,r={root:["root",o!=="inherit"&&`color${z(o)}`,`fontSize${z(t)}`]};return te(r,ve,n)},xe=Se("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:t}=e;return[o.root,t.color!=="inherit"&&o[`color${z(t.color)}`],o[`fontSize${z(t.fontSize)}`]]}})(({theme:e,ownerState:o})=>{var t,n,r,s,i,c,l,u,f,S,h,g,m;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:o.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(t=e.transitions)==null||(n=t.create)==null?void 0:n.call(t,"fill",{duration:(r=e.transitions)==null||(r=r.duration)==null?void 0:r.shorter}),fontSize:{inherit:"inherit",small:((s=e.typography)==null||(i=s.pxToRem)==null?void 0:i.call(s,20))||"1.25rem",medium:((c=e.typography)==null||(l=c.pxToRem)==null?void 0:l.call(c,24))||"1.5rem",large:((u=e.typography)==null||(f=u.pxToRem)==null?void 0:f.call(u,35))||"2.1875rem"}[o.fontSize],color:(S=(h=(e.vars||e).palette)==null||(h=h[o.color])==null?void 0:h.main)!=null?S:{action:(g=(e.vars||e).palette)==null||(g=g.action)==null?void 0:g.active,disabled:(m=(e.vars||e).palette)==null||(m=m.action)==null?void 0:m.disabled,inherit:void 0}[o.color]}}),k=O.forwardRef(function(o,t){const n=me({props:o,name:"MuiSvgIcon"}),{children:r,className:s,color:i="inherit",component:c="svg",fontSize:l="medium",htmlColor:u,inheritViewBox:f=!1,titleAccess:S,viewBox:h="0 0 24 24"}=n,g=b(n,ye),m=O.isValidElement(r)&&r.type==="svg",w=a({},n,{color:i,component:c,fontSize:l,instanceFontSize:o.fontSize,inheritViewBox:f,viewBox:h,hasSvgAsChild:m}),T={};f||(T.viewBox=h);const x=ge(w);return E.jsxs(xe,a({as:c,className:ee(x.root,s),focusable:"false",color:u,"aria-hidden":S?void 0:!0,role:S?"img":void 0,ref:t},T,g,m&&r.props,{ownerState:w,children:[m?r.props.children:r,S?E.jsx("title",{children:S}):null]}))});k.muiName="SvgIcon";function $e(e,o){function t(n,r){return E.jsx(k,a({"data-testid":`${o}Icon`,ref:r},n,{children:e}))}return t.muiName=k.muiName,O.memo(O.forwardRef(t))}export{k as S,$e as a,te as c,U as d,Se as s,me as u};
