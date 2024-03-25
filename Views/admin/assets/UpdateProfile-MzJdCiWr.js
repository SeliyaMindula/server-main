import{r as t,A as Y,u as Z,j as s,L as k,c as r,d as n}from"./index-1ZIe4Z95.js";import{T as c}from"./TextInput-Buusu_Su.js";import{S as D}from"./react-select.esm-ydH9zQ6E.js";import"./defineProperty-QXht6sKD.js";import"./typeof-Q9eVcF_1.js";import"./emotion-react.browser.esm--QwjLHsi.js";import"./hoist-non-react-statics.cjs-ruMgn741.js";const re=()=>{const{currentUser:i}=t.useContext(Y),F=i==null?void 0:i.id,[l,O]=t.useState(null),[b,h]=t.useState(""),[f,x]=t.useState(""),[w,g]=t.useState(""),[j,v]=t.useState({value:"",label:""}),[N,C]=t.useState({value:"",label:""}),[R,U]=t.useState(""),[A,$]=t.useState(null),{id:y}=Z(),P=+y,[d,T]=t.useState([]),[m,I]=t.useState([]),[p,_]=t.useState([]),[u,H]=t.useState([]);t.useEffect(()=>{(async()=>{try{const a=await r.get("/departments/"),o=await r.get("/job-roles/");I(a.data),T(o.data)}catch(a){console.log(a)}})()},[]),t.useEffect(()=>{d.length>0&&_(d.map(e=>({label:e.role,value:e.role}))),m.length>0&&H(m.map(e=>({label:e.name,value:e.name})))},[d,m]);const[S,L]=t.useState(!1),[J,M]=t.useState(""),[E,q]=t.useState(""),[z,B]=t.useState(""),G=async e=>{try{return(await r.get(`/users/${e}`)).data}catch(a){console.log(a),n({error:a.response.data.error})}};t.useEffect(()=>{(async()=>{const a=await G(P);O(a[0])})()},[]),t.useEffect(()=>{if(l){h(l==null?void 0:l.email),g(l==null?void 0:l.username),x(l==null?void 0:l.full_name),U(l==null?void 0:l.emp_no);const e=p.find(o=>o.value===(l==null?void 0:l.role));v(e);const a=u.find(o=>o.value===(l==null?void 0:l.department));C(a)}},[l,p,u]);const K=e=>{const a=e.target.files[0];$(a)},Q=async()=>{try{const e=new FormData;e.append("email",b),e.append("username",w),e.append("full_name",f),e.append("contact",R),e.append("role",j.value),e.append("department",N.value),e.append("avatar",A);const a=await r.put(`/users/${y}`,e,{headers:{"Content-Type":"multipart/form-data"}});console.log(a.data),n(a.data)}catch(e){console.log(e),n({error:e.response.data.error})}},V=async()=>{if(E!==z){n({error:"Password mismatch!"});return}const e=await W(F,J);if(console.log("is password",e),!e){n({error:"Admin password incorrect"});return}await X(E)},W=async(e,a)=>{try{if((await r.post(`/users/check-password/${e}`,{password:a})).status===200)return!0}catch(o){return console.log(o),!1}},X=async e=>{try{const a=await r.put(`users/change-password/${P}`,{password:e});n(a.data)}catch(a){console.log(a),n({error:a.response.data.error})}};return s.jsxs("div",{children:[s.jsxs("div",{className:"page-title-box d-flex justify-content-between",children:[s.jsx("h4",{className:"page-title",children:"Edit Profile"}),s.jsx("nav",{"aria-label":"breadcrumb",children:s.jsxs("ol",{className:"breadcrumb",children:[s.jsx("li",{className:"breadcrumb-item",children:s.jsx(k,{to:"/",className:"b-link",children:"Home"})}),s.jsxs("li",{className:"breadcrumb-item",children:[s.jsx(k,{to:"#",className:"b-link"}),"Setting"]}),s.jsx("li",{className:"breadcrumb-item active","aria-current":"page",children:"Update Profile"})]})})]}),s.jsxs("div",{className:"content col-6",children:[s.jsx("div",{className:"col mt-4",children:s.jsx(c,{label:"Email:",type:"email",parentClasses:"d-flex align-items-baseline",labelClass:"col-2 fw-bold",inputClass:"col",value:b,onChange:e=>h(e.target.value)})}),s.jsx("div",{className:"col mt-4",children:s.jsx(c,{label:"Username:",type:"text",parentClasses:"d-flex align-items-baseline",labelClass:"col-2 fw-bold",inputClass:"col",value:w,onChange:e=>g(e.target.value)})}),s.jsx("div",{className:"col mt-4",children:s.jsx(c,{label:"Full Name:",type:"Text",parentClasses:"d-flex align-items-baseline",labelClass:"col-2 fw-bold",inputClass:"col",value:f,onChange:e=>x(e.target.value)})}),s.jsx("div",{className:"col mt-4",children:s.jsxs("div",{className:"d-flex align-items-baseline",children:[s.jsx("label",{htmlFor:"role",className:"col-2 fw-bold",children:"Job Role:"}),s.jsx(D,{className:"col p-0",isSearchable:!0,options:p,value:j,onChange:e=>v(e)})]})}),s.jsx("div",{className:"col mt-4",children:s.jsxs("div",{className:"d-flex align-items-baseline",children:[s.jsx("label",{htmlFor:"role",className:"col-2 fw-bold",children:"Department:"}),s.jsx(D,{className:"col p-0",isSearchable:!0,options:u,value:N,onChange:e=>C(e)})]})}),s.jsx("div",{className:"col mt-4",children:s.jsxs("div",{className:"d-flex align-items-baseline",children:[s.jsx("label",{htmlFor:"picture",className:"fw-bold col-2",children:"Profile Picture:"}),s.jsx("input",{className:"form-control col",type:"file",onChange:K,multiple:!0})]})}),s.jsxs("div",{className:"col mt-4",children:[s.jsx("button",{className:"btn btn-warning d-block  ",onClick:()=>L(!S),children:"Change Password"}),S&&s.jsxs("div",{className:"col mt-3 ",children:[s.jsx(c,{parentClasses:"col",labelClass:"fw-bold",label:"Old Password:",type:"password",onChange:e=>M(e.target.value)}),s.jsx(c,{parentClasses:"col mt-1",label:"New Password:",labelClass:"fw-bold",type:"password",onChange:e=>q(e.target.value)}),s.jsx(c,{parentClasses:"col mt-1",labelClass:"fw-bold",label:"Confirm Password:",type:"password",onChange:e=>B(e.target.value)}),s.jsx("button",{className:"btn btn-primary d-block ms-auto mt-3",onClick:V,children:"Change Password"})]})]}),s.jsx("div",{className:"row mt-3",children:s.jsx("button",{className:"btn btn-primary col-4 ms-3",onClick:Q,children:"Update"})})]})]})};export{re as default};