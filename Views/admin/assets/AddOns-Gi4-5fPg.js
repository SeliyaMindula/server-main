import{j as e,r as m,u as N,b as A,B as C,c as f,d as x}from"./index-eyw8BnPF.js";import{M as S,a as k,d as B,b as M,T as q}from"./Typography-pCSkGzwL.js";import{s as p}from"./createSvgIcon-9L_HP3XF.js";import{u as F}from"./formik.esm--zH59csQ.js";import{A as D}from"./AddVenueFormValidation-sCnMuODa.js";import"./emotion-react.browser.esm-lwrUyskd.js";import"./hoist-non-react-statics.cjs-ruMgn741.js";import"./TransitionGroup-oHyFqxKi.js";const $=p(a=>e.jsx(S,{disableGutters:!0,elevation:0,square:!0,...a}))(({theme:a})=>({border:`1px solid ${a.palette.divider}`,"&:not(:last-child)":{borderBottom:0},"&::before":{display:"none"}})),w=p(a=>e.jsx(k,{expandIcon:e.jsx(B,{sx:{fontSize:"0.9rem"}}),...a}))(({theme:a})=>({backgroundColor:a.palette.mode==="dark"?"rgba(255, 255, 255, .05)":"rgba(0, 0, 0, .03)",flexDirection:"row-reverse","& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":{transform:"rotate(90deg)"},"& .MuiAccordionSummary-content":{marginLeft:a.spacing(1)}})),O=p(M)(({theme:a})=>({padding:a.spacing(2),borderTop:"1px solid rgba(0, 0, 0, .125)"}));function E({addons:a}){const[u,c]=m.useState(""),i=n=>(o,d)=>{c(d?n:!1)},t=n=>{a.splice(n,1),c("")};return e.jsx("div",{children:a.map((n,o)=>e.jsxs($,{expanded:u===`panel${o}`,onChange:i(`panel${o}`),children:[e.jsx(w,{"aria-controls":"panel1d-content",id:"panel1d-header",children:e.jsx(q,{children:n.add_ons_name})}),e.jsxs(O,{children:[e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"p-1",children:"Add-Ons Name"}),e.jsxs("td",{className:"p-1",children:[": ",n.add_ons_name]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-1",children:"Add-Ons Description"}),e.jsxs("td",{className:"p-1",children:[": ",n.add_ons_description]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-1",children:"Add-Ons Description"}),e.jsxs("td",{className:"p-1",children:[": ",n.cost]})]})]})}),e.jsx("button",{type:"button",className:"btn btn-outline-danger btn-sm mt-2",onClick:()=>t(o),children:"Remove Option"})]})]},o))})}const T=({setOpen:a,venue_id:u,setAddons:c})=>{const i=s=>{const{add_ons_name:b,add_ons_description:j,cost:_,max_qty:y}=s,g={add_ons_name:b,add_ons_description:j,cost:_,max_qty:y};c(v=>[...v,g]),a(!1)},{values:t,errors:n,handleChange:o,touched:d,handleBlur:l,handleSubmit:r}=F({initialValues:{add_ons_name:"",add_ons_description:"",cost:"",max_qty:""},validationSchema:D,onSubmit:s=>i(s)}),h=[{_id:1,label:"Add-ons Name:",type:"text",name:"add_ons_name",value:t.add_ons_name,error:n.add_ons_name,touched:d.add_ons_name,onChange:o,onBlur:l},{_id:2,label:"Add-ons Description:",type:"text-area",name:"add_ons_description",value:t.add_ons_description,error:n.add_ons_description,touched:d.add_ons_description,onChange:o,onBlur:l},{_id:3,label:"Cost:",type:"number",name:"cost",value:t.cost,error:n.cost,touched:d.cost,onChange:o,onBlur:l},{_id:4,label:"Maximum Quantity:",type:"number",name:"max_qty",value:t.max_qty,error:n.max_qty,touched:d.max_qty,onChange:o,onBlur:l}];return e.jsx("div",{className:"modal",style:{display:"block",backgroundColor:"rgba(0,0,0,0.5)"},children:e.jsx("div",{className:"modal-dialog",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Add Venue Add-ons"}),e.jsx("button",{type:"button",className:"btn-close","aria-label":"Close",onClick:()=>a(!1)})]}),e.jsxs("form",{onSubmit:r,children:[e.jsx("div",{className:"modal-body",children:h.map(s=>s.type==="text-area"?e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:s.name,className:"form-label",children:s.label}),e.jsx("textarea",{className:`form-control ${s.error&&s.touched?"is-invalid":""}`,id:s.name,name:s.name,value:s.value,onChange:s.onChange,onBlur:s.onBlur}),e.jsx("div",{className:"invalid-feedback",children:s.error})]},s._id):e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:s.name,className:"form-label",children:s.label}),e.jsx("input",{type:s.type,className:`form-control ${s.error&&s.touched?"is-invalid":""}`,id:s.name,name:s.name,value:s.value,onChange:s.onChange,onBlur:s.onBlur}),e.jsx("div",{className:"invalid-feedback",children:s.error})]},s._id))}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>a(!1),children:"Close"}),e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Add Add-on"})]})]})]})})})},J=()=>{const{venue_id:a}=N(),[u,c]=m.useState(!1),[i,t]=m.useState(!1),[n,o]=m.useState([]),d=A(r=>r.updateStep);m.useEffect(()=>{d(3)},[]);const l=async()=>{if(n.length!==0){t(!0);try{const r=await f.post(`/venues/addons/${a}`,{addons:JSON.stringify(n)});console.log(r.data),t(!1),x({variant:"success",message:"Add-ons added successfully"})}catch(r){t(!1),console.log(r),r.response.data&&x({error:r.response.data.error})}}};return e.jsxs(e.Fragment,{children:[u&&e.jsx(T,{setOpen:c,venue_id:a,setAddons:o}),e.jsxs(C,{sx:{width:"100%",background:"#fff",padding:"30px 10px",marginTop:1,border:"1px solid #eee"},children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center px-4",children:[e.jsx("h4",{children:"Add-ons"}),e.jsx("button",{className:"btn btn-primary",onClick:()=>c(!0),children:"Add New Add-ons"})]}),e.jsx("div",{className:"mt-4",children:n.length===0?e.jsx("div",{className:"text-center",children:e.jsx("h5",{children:"No Addon Found"})}):e.jsxs(e.Fragment,{children:[e.jsx(E,{addons:n}),i?e.jsx("button",{className:"d-block ms-left btn btn-primary col-2 mt-4",type:"button",disabled:!0,children:e.jsx("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"})}):e.jsx("button",{type:"button",onClick:l,className:"d-block ms-left mt-4 btn btn-primary col-2",children:"Save & Next"})]})})]})]})};export{J as default};