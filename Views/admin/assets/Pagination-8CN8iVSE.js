import{j as i,L as o}from"./index-1ZIe4Z95.js";const b=({nPage:l,currentPage:n,setCurrentPage:a,totalEntries:c,itemsPerPage:t})=>{const x=()=>{const s=[];for(let e=1;e<=l;e++)e===1||e===l||e>=n-2&&e<=n+2?s.push(e):s[s.length-1]!=="..."&&(e<n-2||e>n+2)&&s.push("...");return s},h=()=>{n>1&&a(n-1)},m=()=>{n<l&&a(n+1)},p=s=>{s!=="..."&&a(s)},j=()=>(n-1)*t+1,f=()=>{const s=n*t;return s>c?c:s};return i.jsxs("div",{className:"d-flex align-items-baseline justify-content-between",children:[i.jsx("p",{className:"fw-bold",children:`Showing ${j()||0} to ${f()||0} of ${c||0} entries`}),i.jsx("nav",{children:i.jsxs("ul",{className:"pagination-c",children:[i.jsx("li",{className:"page-item-c ",children:i.jsx(o,{to:"#",className:"page-link-c b-link",onClick:h,children:i.jsx("i",{className:"bi bi-chevron-left fw-bold"})})}),x().map((s,d)=>i.jsx("li",{className:` ${n===s?"active":""} page-item-c`,children:i.jsx(o,{to:"#",className:"page-link-c",onClick:()=>p(s),children:s})},d)),i.jsx("li",{className:"page-item-c",children:i.jsx(o,{to:"#",className:"page-link-c b-link",onClick:m,children:i.jsx("i",{className:"bi bi-chevron-right fw-bold"})})})]})})]})};export{b as P};
