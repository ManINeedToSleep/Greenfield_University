(()=>{var e={};e.id=547,e.ids=[547],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},79551:e=>{"use strict";e.exports=require("url")},67628:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>i.a,__next_app__:()=>m,pages:()=>c,routeModule:()=>u,tree:()=>d});var s=t(70260),n=t(28203),a=t(25155),i=t.n(a),o=t(67292),l={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);t.d(r,l);let d=["",{children:["portal",{children:["student",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,85528)),"C:\\Users\\Launchpad\\Greenfield_University\\src\\app\\portal\\student\\login\\page.tsx"]}]},{}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,23482)),"C:\\Users\\Launchpad\\Greenfield_University\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["C:\\Users\\Launchpad\\Greenfield_University\\src\\app\\portal\\student\\login\\page.tsx"],m={require:t,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:n.RouteKind.APP_PAGE,page:"/portal/student/login/page",pathname:"/portal/student/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},67077:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,59607,23))},60997:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,28531,23))},58026:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,13219,23)),Promise.resolve().then(t.t.bind(t,34863,23)),Promise.resolve().then(t.t.bind(t,25155,23)),Promise.resolve().then(t.t.bind(t,40802,23)),Promise.resolve().then(t.t.bind(t,9350,23)),Promise.resolve().then(t.t.bind(t,48530,23)),Promise.resolve().then(t.t.bind(t,88921,23))},97778:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,66959,23)),Promise.resolve().then(t.t.bind(t,33875,23)),Promise.resolve().then(t.t.bind(t,88903,23)),Promise.resolve().then(t.t.bind(t,57174,23)),Promise.resolve().then(t.t.bind(t,84178,23)),Promise.resolve().then(t.t.bind(t,87190,23)),Promise.resolve().then(t.t.bind(t,61365,23))},32203:(e,r,t)=>{Promise.resolve().then(t.bind(t,85528))},91875:(e,r,t)=>{Promise.resolve().then(t.bind(t,95324))},79334:(e,r,t)=>{"use strict";var s=t(58686);t.o(s,"useRouter")&&t.d(r,{useRouter:function(){return s.useRouter}})},95324:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a});var s=t(45512),n=t(53808);function a(){return(0,s.jsx)(n.A,{role:"STUDENT"})}},53808:(e,r,t)=>{"use strict";t.d(r,{A:()=>o});var s=t(45512),n=t(58009),a=t(79334),i=t(2242);function o({role:e}){let r=(0,a.useRouter)(),[t,o]=(0,n.useState)(""),[l,d]=(0,n.useState)(!1),c=async t=>{t.preventDefault(),o(""),d(!0);let s=new FormData(t.currentTarget),n=s.get("email"),a=s.get("password");try{let t=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n,password:a,role:e.toUpperCase()})}),s=await t.json();if(!t.ok)throw Error(s.error||"Login failed");let o=(0,i.W)(e.toUpperCase());r.push(o)}catch(e){o(e instanceof Error?e.message:"Login failed")}finally{d(!1)}};return(0,s.jsx)("div",{className:"min-h-screen flex items-center justify-center bg-gray-50",children:(0,s.jsxs)("div",{className:"max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg",children:[(0,s.jsx)("div",{children:(0,s.jsxs)("h2",{className:"mt-6 text-center text-3xl font-extrabold text-gray-900 capitalize",children:[e," Login"]})}),t&&(0,s.jsx)("div",{className:"bg-red-50 text-red-500 p-4 rounded-md text-center",children:t}),(0,s.jsxs)("form",{className:"mt-8 space-y-6",onSubmit:c,children:[(0,s.jsxs)("div",{className:"rounded-md shadow-sm space-y-4",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email"}),(0,s.jsx)("input",{id:"email",name:"email",type:"email",required:!0,className:"appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm",placeholder:"Enter your email"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Password"}),(0,s.jsx)("input",{id:"password",name:"password",type:"password",required:!0,className:"appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm",placeholder:"Enter your password"})]})]}),(0,s.jsx)("div",{children:(0,s.jsx)("button",{type:"submit",disabled:l,className:`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${l?"bg-emerald-400 cursor-not-allowed":"bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"}`,children:l?"Signing in...":"Sign in"})})]})]})})}},2242:(e,r,t)=>{"use strict";t.d(r,{W:()=>n,_:()=>s});let s={ADMIN:"/portal/admin/dashboard",FACULTY:"/portal/faculty/dashboard",STUDENT:"/portal/student/dashboard"},n=e=>s[e]},23482:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>l});var s=t(62740),n=t(59607),a=t.n(n);function i(){return(0,s.jsx)("header",{className:"bg-gradient-to-r from-emerald-700 to-emerald-900 text-white p-4",children:(0,s.jsxs)("nav",{className:"container mx-auto flex justify-between items-center",children:[(0,s.jsx)("h1",{className:"text-xl font-bold",children:"Greenfield University"}),(0,s.jsxs)("ul",{className:"flex gap-4",children:[(0,s.jsx)("li",{children:(0,s.jsx)(a(),{href:"/",className:"hover:text-emerald-200 transition-colors",children:"Homepage"})}),(0,s.jsx)("li",{children:(0,s.jsx)(a(),{href:"/visit",className:"hover:text-emerald-200 transition-colors",children:"Visit"})}),(0,s.jsx)("li",{children:(0,s.jsx)(a(),{href:"/apply",className:"hover:text-emerald-200 transition-colors",children:"Apply"})}),(0,s.jsx)("li",{children:(0,s.jsx)(a(),{href:"/portal",className:"hover:text-emerald-200 transition-colors",children:"GU Portal"})})]})]})})}function o(){return(0,s.jsx)("footer",{className:"bg-gradient-to-r from-emerald-700 to-emerald-900 text-white p-6",children:(0,s.jsxs)("div",{className:"container mx-auto flex flex-col md:flex-row justify-between items-center",children:[(0,s.jsxs)("p",{children:["\xa9 ",new Date().getFullYear()," Greenfield University. All rights reserved."]}),(0,s.jsxs)("div",{className:"flex gap-4",children:[(0,s.jsx)(a(),{href:"/contact",className:"hover:text-emerald-200 transition-colors",children:"Contact Us"}),(0,s.jsx)(a(),{href:"/faq",className:"hover:text-emerald-200 transition-colors",children:"FAQs"}),(0,s.jsx)(a(),{href:"/policies",className:"hover:text-emerald-200 transition-colors",children:"Policies"})]})]})})}function l({children:e}){return(0,s.jsx)("html",{lang:"en",children:(0,s.jsxs)("body",{className:"min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 flex flex-col",children:[(0,s.jsx)(i,{}),(0,s.jsx)("main",{className:"flex-grow",children:e}),(0,s.jsx)(o,{})]})})}t(35692)},85528:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});let s=(0,t(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\Launchpad\\\\Greenfield_University\\\\src\\\\app\\\\portal\\\\student\\\\login\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Launchpad\\Greenfield_University\\src\\app\\portal\\student\\login\\page.tsx","default")},70440:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n});var s=t(88077);let n=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},35692:()=>{}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,767,77],()=>t(67628));module.exports=s})();