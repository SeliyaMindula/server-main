import{r as t,a as w,j as e,L as p,c as i,d as r}from"./index-algzo-nC.js";import{T as C}from"./TextInput-l4_44VDM.js";import{P as S}from"./Pagination-2ATBRs-G.js";const I=()=>{const j=["DEPARTMENT","DELETE"],[n,b]=t.useState(10),[d,o]=t.useState(1),[l,u]=t.useState([]),m=w(),[g,N]=t.useState(""),v=s=>{const a=parseInt(s.target.value,10);b(a),o(1)},h=d*n,y=h-n,c=l.slice(y,h)||[],x=Math.ceil(l.length/n),f=[...Array(x+1).keys()].slice(1),P=async()=>{try{return(await i.get("/departments/")).data}catch(s){console.log(s),r({error:s.response.data.error})}};t.useEffect(()=>{(async()=>{const a=await P();Array.isArray(a)&&u(a)})()},[]);const D=async()=>{try{const s=await i.post("/departments",{name:g});r(s),m(0)}catch(s){r({error:s.response.data.error})}},E=async s=>{try{const a=await i.delete(`/departments/${s}`);r(a)}catch(a){r({error:a.response.data.error}),m(0)}};return e.jsxs("div",{children:[e.jsxs("div",{className:"page-title-box d-flex justify-content-between",children:[e.jsx("h4",{className:"page-title",children:"Department"}),e.jsx("nav",{"aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item ",children:e.jsx(p,{className:"b-link",to:"/",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item ",children:e.jsx(p,{className:"b-link",to:"#",children:"System"})}),e.jsx("li",{className:"breadcrumb-item active","aria-current":"page",children:"Department"})]})})]}),e.jsxs("div",{className:"content",children:[e.jsx("h5",{children:"Add Department"}),e.jsx("div",{className:"col-7 mt-4",children:e.jsxs("div",{className:"d-flex",style:{width:"100%"},children:[e.jsx(C,{label:"Add department:",parentClasses:"d-flex align-items-center",type:"text",labelClass:"col-4",inputClass:"col",onChange:s=>N(s.target.value)}),e.jsx("button",{className:"btn btn-primary col-1 ms-2",onClick:D,children:"Add"})]})}),e.jsx("h5",{className:"mt-5",children:"Departments"}),e.jsxs("div",{className:"d-flex align-items-baseline",style:{width:"50%"},children:[e.jsx("label",{htmlFor:"",className:"",children:"Show Entries:"}),e.jsxs("select",{name:"",id:"",className:"form-select en-numbers col-1",onChange:v,style:{width:"100px"},children:[e.jsx("option",{value:"10",children:"10"}),e.jsx("option",{value:"25",children:"25"}),e.jsx("option",{value:"50",children:"50"}),e.jsx("option",{value:"100",children:"100"})]})]}),e.jsxs("div",{className:"col mt-4",children:[e.jsxs("table",{className:"table table-hover",children:[e.jsx("thead",{children:e.jsx("tr",{children:j.map((s,a)=>e.jsx("th",{children:s},a))})}),e.jsx("tbody",{children:c.length!==0&&c.map((s,a)=>e.jsxs("tr",{children:[e.jsx("td",{className:"align-middle",children:s.name}),e.jsx("td",{className:"align-middle",children:e.jsx("button",{className:"btn text-danger",onClick:()=>E(s.id),children:e.jsx("i",{className:"bi bi-trash-fill"})})})]},a))})]}),c.length===0&&e.jsx("h3",{className:"text-center",children:"No data available ..."})]}),e.jsx(S,{nPage:x,pageNumbers:f,currentPage:d,setCurrentPage:o,totalEntries:l.length,itemsPerPage:n})]})]})};export{I as default};
