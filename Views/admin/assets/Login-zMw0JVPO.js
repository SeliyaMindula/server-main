import{a as h,r as o,A as p,j as s,q as u,L as g,c as j}from"./index-algzo-nC.js";/* empty css             */import{C as b}from"./CopyRight-Keljo5HL.js";const f=()=>{const i=h(),[l,n]=o.useState({usernameOrEmail:"",password:""}),{dispatch:c}=o.useContext(p),[r,d]=o.useState(null),m=(e,a)=>{n(t=>({...t,[e]:a}))},x=async()=>{try{const e=await j.post("/users/login",{email:l.usernameOrEmail,password:l.password});if(e.status===200){const a={name:e.data.user.full_name,role:e.data.user.role,id:e.data.user.id};c({type:"LOGIN",payload:a}),i("/bmichadmin")}}catch(e){console.log(e),d(e.response.data.error)}};return s.jsx("div",{className:"form-container ",children:s.jsxs("div",{className:"col ",children:[s.jsx("div",{style:{width:"100%",height:"50px",textAlign:"center",marginTop:"20px"},children:s.jsx("img",{src:u,alt:"logo",style:{width:"200px",height:"auto"}})}),s.jsxs("div",{className:"d-flex content ",style:{marginTop:"85px"},children:[s.jsxs("div",{className:"col-6 p-4  ",children:[s.jsx("h4",{children:"BMICH RESERVATION SYSTEM"}),s.jsx("h6",{children:"Welcome Back!"}),r&&s.jsx("div",{className:"text-danger",children:r}),s.jsxs("form",{children:[[{label:"Email",icon:"bi bi-person-fill",field:"usernameOrEmail"},{label:"Password",icon:"bi bi-key-fill",field:"password"}].map((e,a)=>s.jsxs("div",{className:"col mt-3",children:[s.jsx("label",{htmlFor:e.label.toLowerCase(),className:"fw-bold",children:e.label}),s.jsxs("div",{className:"d-flex input-group",children:[s.jsx("span",{className:"p-2 icon",children:s.jsx("i",{className:e.icon})}),s.jsx("input",{type:e.label.toLowerCase().includes("password")?"password":"text",className:"form-control",placeholder:e.label,value:l[e.field],onChange:t=>m(e.field,t.target.value)})]})]},a)),s.jsx("div",{className:"col mt-4",children:s.jsx("button",{type:"button",className:"btn btn-gold col-12",onClick:x,children:"Sign In"})}),s.jsx("div",{className:"col mt-3",children:s.jsx(g,{to:"/bmichadmin/forgot-password",className:"b-link primary-link",children:"Forgot Password?"})})]})]}),s.jsx("div",{className:"col-6 bg-img"})]}),s.jsx("div",{className:"text-center mt-5",children:s.jsx(b,{})})]})})};export{f as default};