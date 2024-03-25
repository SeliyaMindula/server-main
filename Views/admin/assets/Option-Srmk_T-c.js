import{j as e,r as m,a as B,u as T,b as F,B as A,c as M,d as P}from"./index-1ZIe4Z95.js";import{M as W,a as w,d as O,b as $,T as V}from"./Typography-x_jeF_ic.js";import{s as j}from"./createSvgIcon-TLsmELY-.js";import{u as H}from"./formik.esm-r2JvyV-y.js";import{O as D}from"./AddVenueFormValidation-hR2InnWK.js";import"./emotion-react.browser.esm--QwjLHsi.js";import"./hoist-non-react-statics.cjs-ruMgn741.js";import"./TransitionGroup-4e466_IC.js";const E=j(o=>e.jsx(W,{disableGutters:!0,elevation:0,square:!0,...o}))(({theme:o})=>({border:`1px solid ${o.palette.divider}`,"&:not(:last-child)":{borderBottom:0},"&::before":{display:"none"}})),I=j(o=>e.jsx(w,{expandIcon:e.jsx(O,{sx:{fontSize:"0.9rem"}}),...o}))(({theme:o})=>({backgroundColor:o.palette.mode==="dark"?"rgba(255, 255, 255, .05)":"rgba(0, 0, 0, .03)",flexDirection:"row-reverse","& .MuiAccordionSummary-expandIconWrapper.Mui-expanded":{transform:"rotate(90deg)"},"& .MuiAccordionSummary-content":{marginLeft:o.spacing(1)}})),L=j($)(({theme:o})=>({padding:o.spacing(2),borderTop:"1px solid rgba(0, 0, 0, .125)"}));function R({options:o}){const[d,u]=m.useState(""),_=n=>(t,i)=>{u(i?n:!1)},s=n=>{o.splice(n,1),u("")};return e.jsx("div",{children:o.map((n,t)=>e.jsxs(E,{expanded:d===`panel${t}`,onChange:_(`panel${t}`),children:[e.jsx(I,{"aria-controls":"panel1d-content",id:"panel1d-header",children:e.jsx(V,{children:n.title})}),e.jsxs(L,{children:[e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"p-1",children:"Option Name"}),e.jsxs("td",{className:"p-1",children:[": ",n.title]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-1",children:"Initial Booking Hour"}),e.jsxs("td",{className:"p-1",children:[": ",n.initial_booking_hours]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-1",children:"Price (Fri/Sat/Sun)"}),e.jsxs("td",{className:"p-1",children:[": ",n.different_date_price_Fri_Sat_Sun]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-1",children:"Price (Tue/Wed/Thu)"}),e.jsxs("td",{className:"p-1",children:[": ",n.different_date_price_Tue_Wed_Thu]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-1",children:"Price (Mon)"}),e.jsxs("td",{className:"p-1",children:[": ",n.different_date_price_Mon]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-1",children:"Price Per Additional Hour"}),e.jsxs("td",{className:"p-1",children:[": ",n.price_per_additional_hour]})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"p-1",children:"Book With Another Venue"}),e.jsxs("td",{className:"p-1",children:[": ",n.book_with_another_option," "]})]})]})}),e.jsx("button",{type:"button",className:"btn btn-outline-danger btn-sm mt-2",onClick:()=>s(t),children:"Remove Option"})]})]},t))})}const z=({setOpen:o,venue_id:d,setOptions:u})=>{const _=a=>{const{title:r,initial_booking_hours:v,price_per_additional_hour:g,max_booking_hours:q,book_with_another_option:f,different_prices:b,same_date_price:x,different_date_price_Fri_Sat_Sun:k,different_date_price_Tue_Wed_Thu:y,different_date_price_Mon:S}=a;let h={};b?h={title:r,initial_booking_hours:v,price_per_additional_hour:g,max_booking_hours:12,book_with_another_option:f,different_prices:b,different_date_price_Fri_Sat_Sun:k,different_date_price_Tue_Wed_Thu:y,different_date_price_Mon:S}:h={title:r,initial_booking_hours:v,price_per_additional_hour:g,max_booking_hours:12,book_with_another_option:f,different_prices:b,different_date_price_Fri_Sat_Sun:x,different_date_price_Tue_Wed_Thu:x,different_date_price_Mon:x},console.log(h),u(C=>[...C,h]),o(!1)},{values:s,errors:n,handleChange:t,touched:i,handleBlur:l,handleSubmit:p,setFieldValue:c,resetForm:K}=H({initialValues:{title:"",initial_booking_hours:"",price_per_additional_hour:"",max_booking_hours:"",book_with_another_option:"",different_prices:!1,same_date_price:"",different_date_price_Fri_Sat_Sun:"",different_date_price_Tue_Wed_Thu:"",different_date_price_Mon:""},validationSchema:D,onSubmit:a=>_(a)}),N=[{_id:1,label:"Title:",type:"text",name:"title",value:s.title,error:n.title,touched:i.title,onChange:t,onBlur:l},{_id:2,label:"Initial Booking Hours:",type:"number",name:"initial_booking_hours",value:s.initial_booking_hours,error:n.initial_booking_hours,touched:i.initial_booking_hours,onChange:t,onBlur:l},{_id:4,label:"Price Per Additional Hour (LKR):",type:"number",name:"price_per_additional_hour",value:s.price_per_additional_hour,error:n.price_per_additional_hour,touched:i.price_per_additional_hour,onChange:t,onBlur:l},{_id:6,label:"Book With Another Option:",type:"select",name:"book_with_another_option",value:s.book_with_another_option,error:n.book_with_another_option,touched:i.book_with_another_option,onChange:t,onBlur:l,option:[{value:!0,label:"Yes"},{value:!1,label:"No"}]},{_id:5,label:"Different Prices",type:"checkbox",name:"different_prices",value:s.different_prices,error:n.different_prices,touched:i.different_prices,onChange:t,onBlur:l,same:[{_id:6,label:"Price (LKR):",type:"number",name:"same_date_price",value:s.same_date_price,error:n.same_date_price,touched:i.same_date_price,onChange:t,onBlur:l}],different:[{_id:7,label:"Price (Fri/Sat/Sun):",type:"number",name:"different_date_price_Fri_Sat_Sun",value:s.different_date_price_Fri_Sat_Sun,error:n.different_date_price_Fri_Sat_Sun,touched:i.different_date_price_Fri_Sat_Sun,onChange:t,onBlur:l},{_id:8,label:"Price (Tue/Wed/Thu):",type:"number",name:"different_date_price_Tue_Wed_Thu",value:s.different_date_price_Tue_Wed_Thu,error:n.different_date_price_Tue_Wed_Thu,touched:i.different_date_price_Tue_Wed_Thu,onChange:t,onBlur:l},{_id:9,label:"Price (Mon):",type:"number",name:"different_date_price_Mon",value:s.different_date_price_Mon,error:n.different_date_price_Mon,touched:i.different_date_price_Mon,onChange:t,onBlur:l}]}];return e.jsx("div",{className:"modal",style:{display:"block",backgroundColor:"rgba(0,0,0,0.5)"},children:e.jsx("div",{className:"modal-dialog",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Add Venue Option"}),e.jsx("button",{type:"button",className:"btn-close","aria-label":"Close",onClick:()=>o(!1)})]}),e.jsxs("form",{onSubmit:p,children:[e.jsx("div",{className:"modal-body",children:N.map(a=>a.type==="select"?e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:a.name,className:"form-label",children:a.label}),e.jsxs("select",{className:`form-control ${a.error&&a.touched?"is-invalid":""}`,id:a.name,name:a.name,value:a.value,onChange:a.onChange,onBlur:a.onBlur,children:[e.jsx("option",{value:"",children:"Select"}),a.option.map(r=>e.jsx("option",{value:r.value,children:r.label},r.value))]}),e.jsx("div",{className:"invalid-feedback",children:a.error})]},a._id):a.type==="checkbox"?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-3 form-check",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",id:a.name,name:a.name,value:a.value,onChange:a.onChange,onBlur:a.onBlur}),e.jsx("label",{className:"form-check-label",htmlFor:a.name,children:a.label})]},a._id),a.value?a.different.map(r=>e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:r.name,className:"form-label",children:r.label}),e.jsx("input",{type:r.type,className:`form-control ${r.error&&r.touched?"is-invalid":""}`,id:r.name,name:r.name,value:r.value,onChange:r.onChange,onBlur:r.onBlur}),e.jsx("div",{className:"invalid-feedback",children:r.error})]},r._id)):a.same.map(r=>e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:r.name,className:"form-label",children:r.label}),e.jsx("input",{type:r.type,className:`form-control ${r.error&&r.touched?"is-invalid":""}`,id:r.name,name:r.name,value:r.value,onChange:r.onChange,onBlur:r.onBlur}),e.jsx("div",{className:"invalid-feedback",children:r.error})]},r._id))]}):e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:a.name,className:"form-label",children:a.label}),e.jsx("input",{type:a.type,className:`form-control ${a.error&&a.touched?"is-invalid":""}`,id:a.name,name:a.name,value:a.value,onChange:a.onChange,onBlur:a.onBlur}),e.jsx("div",{className:"invalid-feedback",children:a.error})]},a._id))}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{type:"button",className:"btn btn-secondary",onClick:()=>o(!1),children:"Close"}),e.jsx("button",{type:"submit",className:"btn btn-primary",children:"Add Venue"})]})]})]})})})},ae=()=>{const o=B(),{venue_id:d}=T(),[u,_]=m.useState(!1),[s,n]=m.useState(!1),[t,i]=m.useState([]),l=F(c=>c.updateStep);m.useEffect(()=>{l(2)},[]);const p=async()=>{if(n(!0),t.length!==0)try{const c=await M.post(`/venues/option/${d}`,{options:JSON.stringify(t)});console.log(c.data),o(`/bmichadmin/add-venue/addons/${d}`)}catch(c){n(!1),console.log(c),c.response.data&&P({error:c.response.data.error})}};return e.jsxs(e.Fragment,{children:[u&&e.jsx(z,{setOpen:_,venue_id:d,setOptions:i}),e.jsxs(A,{sx:{width:"100%",background:"#fff",padding:"30px 10px",marginTop:1,border:"1px solid #eee"},children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center px-4",children:[e.jsx("h4",{children:"Booking Option"}),e.jsx("button",{className:"btn btn-primary",onClick:()=>_(!0),children:"Add New Option"})]}),e.jsx("div",{className:"mt-4",children:t.length===0?e.jsx("div",{className:"text-center",children:e.jsx("h5",{children:"No Option Found"})}):e.jsxs(e.Fragment,{children:[e.jsx(R,{options:t}),s?e.jsx("button",{className:"d-block ms-left btn btn-primary col-2 mt-4",type:"button",disabled:!0,children:e.jsx("span",{className:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"})}):e.jsx("button",{type:"button",onClick:p,className:"d-block ms-left mt-4 btn btn-primary col-2",children:"Save & Next"})]})})]})]})};export{ae as default};
