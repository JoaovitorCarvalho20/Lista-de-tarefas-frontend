(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(1635)}])},1635:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>l});var r=a(5893),o=a(7294),n=a(5581);let s=e=>{let{tarefa:t,onEdit:a,onDelete:o,onMoveUp:s,onMoveDown:i}=e;return(0,r.jsxs)("div",{className:"flex items-center justify-between p-4 border rounded-lg ".concat(t.custo>=1e3?"bg-yellow-200":"bg-white"),children:[(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("span",{className:"font-semibold text-lg",children:t.nome}),(0,r.jsxs)("span",{className:"text-gray-600",children:["Custo: R$ ",t.custo]}),(0,r.jsxs)("span",{className:"text-gray-600",children:["Data Limite: ",new Date(t.dataLimite).toLocaleDateString()]})]}),(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,r.jsx)("button",{onClick:()=>s(t.id),className:"text-blue-500 hover:text-blue-700",children:(0,r.jsx)(n.y1n,{size:20})}),(0,r.jsx)("button",{onClick:()=>i(t.id),className:"text-blue-500 hover:text-blue-700",children:(0,r.jsx)(n.Duv,{size:20})}),(0,r.jsx)("button",{onClick:()=>a(t),className:"text-blue-500 hover:text-blue-700",children:(0,r.jsx)(n.$iz,{size:20})}),(0,r.jsx)("button",{onClick:()=>o(t.id),className:"text-red-500 hover:text-red-700",children:(0,r.jsx)(n.VPh,{size:20})})]})]})},i=()=>{let[e,t]=(0,o.useState)([]),[a,n]=(0,o.useState)({id:0,nome:"",custo:0,dataLimite:"",ordemDeApresentacao:0}),[i,l]=(0,o.useState)(null),[c,d]=(0,o.useState)(!1),u=async()=>{try{let e=await fetch("http://localhost:8080/tarefas"),a=await e.json();t(a)}catch(e){console.error("Erro ao buscar tarefas:",e)}};(0,o.useEffect)(()=>{u()},[]);let m=async a=>{if(window.confirm("Voc\xea tem certeza que deseja excluir esta tarefa?"))try{await fetch("http://localhost:8080/tarefas/".concat(a),{method:"DELETE"}),t(e.filter(e=>e.id!==a))}catch(e){console.error("Erro ao excluir tarefa:",e)}},f=async()=>{try{let r=await fetch("http://localhost:8080/tarefas",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(r.ok){let a=await r.json();t([...e,a]),n({id:0,nome:"",custo:0,dataLimite:"",ordemDeApresentacao:0})}else console.error("Erro ao adicionar tarefa:",r.statusText)}catch(e){console.error("Erro ao adicionar tarefa:",e)}},p=async()=>{if(i)try{let a=await fetch("http://localhost:8080/tarefas/".concat(i.id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(a.ok){let r;r=a.headers.get("content-length")&&Number(a.headers.get("content-length"))>0?await a.json():i,t(e.map(e=>e.id===r.id?r:e)),l(null),d(!1)}else console.error("Erro ao editar tarefa:",a.statusText)}catch(e){console.error("Erro ao editar tarefa:",e)}},h=e=>{l(e),d(!0)},b=async a=>{let r=e.findIndex(e=>e.id===a);if(r>0){let a=[...e];[a[r-1],a[r]]=[a[r],a[r-1]],t(a),await y(a.map(e=>e.id))}},x=async a=>{let r=e.findIndex(e=>e.id===a);if(r<e.length-1){let a=[...e];[a[r+1],a[r]]=[a[r],a[r+1]],t(a),await y(a.map(e=>e.id))}},y=async e=>{try{await fetch("http://localhost:8080/tarefas/ordem",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}catch(e){console.error("Erro ao atualizar a ordem das tarefas:",e)}};return(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)("h1",{className:"text-2xl font-bold mb-4",children:"Lista de Tarefas"}),(0,r.jsxs)("div",{className:"mb-4",children:[(0,r.jsx)("input",{type:"text",placeholder:"Nome da tarefa",value:a.nome,onChange:e=>n({...a,nome:e.target.value}),className:"border p-2 mr-2"}),(0,r.jsx)("input",{type:"text",placeholder:"Custo",value:a.custo,onChange:e=>{let t=Number(e.target.value);!isNaN(t)&&Number(t)>=0&&n({...a,custo:Number(t)})},className:"border p-2 mr-2"}),(0,r.jsx)("input",{type:"date",value:a.dataLimite,onChange:e=>n({...a,dataLimite:e.target.value}),className:"border p-2 mr-2"}),(0,r.jsx)("button",{onClick:f,className:"bg-blue-500 text-white px-4 py-2 rounded",children:"Adicionar Tarefa"})]}),(0,r.jsx)("div",{className:"space-y-2",children:e.map(e=>(0,r.jsx)(s,{tarefa:e,onDelete:m,onEdit:()=>h(e),onMoveUp:()=>b(e.id),onMoveDown:()=>x(e.id)},e.id))}),c&&i&&(0,r.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50",children:(0,r.jsxs)("div",{className:"bg-white p-4 rounded-lg w-1/2",children:[(0,r.jsx)("h2",{className:"text-xl font-bold mb-4",children:"Editar Tarefa"}),(0,r.jsx)("input",{type:"text",placeholder:"Nome da tarefa",value:i.nome,onChange:e=>l({...i,nome:e.target.value}),className:"border p-2 mb-2 w-full"}),(0,r.jsx)("input",{type:"text",placeholder:"Digite o custo da tarefa",value:i.custo.toString(),onChange:e=>{let t=Number(e.target.value);!isNaN(t)&&t>=0&&l({...i,custo:t})},className:"border p-2 mb-2 w-full"}),(0,r.jsx)("input",{type:"date",value:i.dataLimite,onChange:e=>l({...i,dataLimite:e.target.value}),className:"border p-2 mb-2 w-full"}),(0,r.jsxs)("div",{className:"flex justify-end",children:[(0,r.jsx)("button",{onClick:()=>d(!1),className:"bg-gray-500 text-white px-4 py-2 mr-2 rounded",children:"Cancelar"}),(0,r.jsx)("button",{onClick:p,className:"bg-blue-500 text-white px-4 py-2 rounded",children:"Salvar"})]})]})})]})};function l(){return(0,r.jsx)("div",{className:"App",children:(0,r.jsx)(i,{})})}},7796:(e,t,a)=>{"use strict";a.d(t,{w_:()=>d});var r=a(7294),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},n=r.createContext&&r.createContext(o),s=["attr","size","title"];function i(){return(i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach(function(t){var r,o;r=t,o=a[t],(r=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var r=a.call(e,t||"default");if("object"!=typeof r)return r;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(r))in e?Object.defineProperty(e,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[r]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function d(e){return t=>r.createElement(u,i({attr:c({},e.attr)},t),function e(t){return t&&t.map((t,a)=>r.createElement(t.tag,c({key:a},t.attr),e(t.child)))}(e.child))}function u(e){var t=t=>{var a,{attr:o,size:n,title:l}=e,d=function(e,t){if(null==e)return{};var a,r,o=function(e,t){if(null==e)return{};var a={};for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;a[r]=e[r]}return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],!(t.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}(e,s),u=n||t.size||"1em";return t.className&&(a=t.className),e.className&&(a=(a?a+" ":"")+e.className),r.createElement("svg",i({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,o,d,{className:a,style:c(c({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),l&&r.createElement("title",null,l),e.children)};return void 0!==n?r.createElement(n.Consumer,null,e=>t(e)):t(o)}}},e=>{var t=t=>e(e.s=t);e.O(0,[594,888,774,179],()=>t(8312)),_N_E=e.O()}]);