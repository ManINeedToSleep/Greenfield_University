(()=>{var e={};e.id=690,e.ids=[690],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},79551:e=>{"use strict";e.exports=require("url")},25090:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,pages:()=>c,routeModule:()=>x,tree:()=>o});var r=s(70260),a=s(28203),l=s(25155),n=s.n(l),i=s(67292),d={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>i[e]);s.d(t,d);let o=["",{children:["portal",{children:["student",{children:["dashboard",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,45173)),"C:\\Users\\Launchpad\\Greenfield_University\\src\\app\\portal\\student\\dashboard\\page.tsx"]}]},{}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,23482)),"C:\\Users\\Launchpad\\Greenfield_University\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(s.t.bind(s,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(s.t.bind(s,41485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["C:\\Users\\Launchpad\\Greenfield_University\\src\\app\\portal\\student\\dashboard\\page.tsx"],m={require:s,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/portal/student/dashboard/page",pathname:"/portal/student/dashboard",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},67077:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,59607,23))},60997:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,28531,23))},58026:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,13219,23)),Promise.resolve().then(s.t.bind(s,34863,23)),Promise.resolve().then(s.t.bind(s,25155,23)),Promise.resolve().then(s.t.bind(s,40802,23)),Promise.resolve().then(s.t.bind(s,9350,23)),Promise.resolve().then(s.t.bind(s,48530,23)),Promise.resolve().then(s.t.bind(s,88921,23))},97778:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,66959,23)),Promise.resolve().then(s.t.bind(s,33875,23)),Promise.resolve().then(s.t.bind(s,88903,23)),Promise.resolve().then(s.t.bind(s,57174,23)),Promise.resolve().then(s.t.bind(s,84178,23)),Promise.resolve().then(s.t.bind(s,87190,23)),Promise.resolve().then(s.t.bind(s,61365,23))},34260:(e,t,s)=>{Promise.resolve().then(s.bind(s,45173))},86996:(e,t,s)=>{Promise.resolve().then(s.bind(s,6993))},6993:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>d});var r=s(45512);s(58009);var a=s(44098),l=s(89295),n=s(63626),i=s(55641);function d(){let e=[{title:"Current Courses",value:5,icon:a.vd0},{title:"Assignments Due",value:3,icon:a.w_X,trend:{value:2,isUpward:!1}},{title:"GPA",value:"3.8",icon:a.YNd,trend:{value:.2,isUpward:!0}},{title:"Attendance Rate",value:"95%",icon:a.bfZ,trend:{value:5,isUpward:!0}}],t=[{id:"1",title:"New Grade Posted: CS101 Quiz",timestamp:"2 hours ago",icon:a.YNd},{id:"2",title:"Assignment Submitted: MATH201",timestamp:"5 hours ago",icon:a.A7C},{id:"3",title:"New Assignment Posted: PHY101",timestamp:"1 day ago",icon:a.jNV}];return(0,r.jsxs)("div",{className:"min-h-screen bg-emerald-50",children:[(0,r.jsx)(l.A,{title:"Student Dashboard",role:"STUDENT",userName:"John Doe",currentPath:"/portal/student/dashboard"}),(0,r.jsxs)("main",{className:"container mx-auto p-6",children:[(0,r.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6",children:e.map((e,t)=>(0,r.jsx)(n.A,{...e},t))}),(0,r.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6",children:[(0,r.jsxs)("div",{className:"lg:col-span-2",children:[(0,r.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-md mb-6",children:[(0,r.jsx)("h2",{className:"text-xl font-bold text-emerald-900 mb-4",children:"Course Progress"}),(0,r.jsx)("div",{className:"space-y-4",children:[{id:"1",name:"Introduction to Computer Science",code:"CS101",progress:75,grade:"A",nextAssignment:{title:"Binary Search Implementation",dueDate:"2024-03-25"}},{id:"2",name:"Calculus I",code:"MATH201",progress:60,grade:"B+",nextAssignment:{title:"Integration Practice Set",dueDate:"2024-03-23"}},{id:"3",name:"Physics Mechanics",code:"PHY101",progress:85,grade:"A-",nextAssignment:{title:"Force Analysis Lab Report",dueDate:"2024-03-28"}}].map(e=>(0,r.jsxs)("div",{className:"border-b pb-4",children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-2",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"font-semibold text-gray-800",children:e.name}),(0,r.jsx)("p",{className:"text-sm text-gray-600",children:e.code})]}),(0,r.jsx)("span",{className:"text-lg font-bold text-emerald-600",children:e.grade})]}),(0,r.jsx)("div",{className:"w-full bg-gray-200 rounded-full h-2.5",children:(0,r.jsx)("div",{className:"bg-emerald-600 h-2.5 rounded-full",style:{width:`${e.progress}%`}})}),e.nextAssignment&&(0,r.jsxs)("p",{className:"text-sm text-gray-600 mt-2",children:["Next due: ",e.nextAssignment.title," (",new Date(e.nextAssignment.dueDate).toLocaleDateString(),")"]})]},e.id))})]}),(0,r.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-md",children:[(0,r.jsx)("h2",{className:"text-xl font-bold text-emerald-900 mb-4",children:"Assignments"}),(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"min-w-full",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{className:"bg-emerald-50",children:[(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-semibold text-emerald-800",children:"Assignment"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-semibold text-emerald-800",children:"Course"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-semibold text-emerald-800",children:"Due Date"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-semibold text-emerald-800",children:"Status"})]})}),(0,r.jsx)("tbody",{className:"divide-y divide-emerald-100",children:[{id:"1",title:"Binary Search Implementation",course:"CS101",dueDate:"2024-03-25",status:"pending"},{id:"2",title:"Integration Practice Set",course:"MATH201",dueDate:"2024-03-23",status:"submitted"},{id:"3",title:"Force Analysis Lab Report",course:"PHY101",dueDate:"2024-03-28",status:"graded",grade:"A"}].map(e=>(0,r.jsxs)("tr",{className:"hover:bg-emerald-50",children:[(0,r.jsx)("td",{className:"px-6 py-4 text-sm text-gray-800",children:e.title}),(0,r.jsx)("td",{className:"px-6 py-4 text-sm text-gray-600",children:e.course}),(0,r.jsx)("td",{className:"px-6 py-4 text-sm text-gray-600",children:new Date(e.dueDate).toLocaleDateString()}),(0,r.jsx)("td",{className:"px-6 py-4",children:(0,r.jsxs)("span",{className:`px-2 py-1 rounded-full text-xs ${"pending"===e.status?"bg-yellow-100 text-yellow-800":"submitted"===e.status?"bg-blue-100 text-blue-800":"bg-green-100 text-green-800"}`,children:[e.status.charAt(0).toUpperCase()+e.status.slice(1),e.grade&&` - ${e.grade}`]})})]},e.id))})]})})]})]}),(0,r.jsx)("div",{className:"lg:col-span-1",children:(0,r.jsx)(i.A,{title:"Recent Activity",activities:t})})]})]})]})}},55641:(e,t,s)=>{"use strict";s.d(t,{A:()=>a});var r=s(45512);function a({activities:e,title:t}){return(0,r.jsxs)("section",{className:"bg-white p-6 shadow-md rounded-lg",children:[(0,r.jsx)("h2",{className:"text-xl font-bold text-emerald-900 mb-6",children:t}),(0,r.jsx)("div",{className:"space-y-4",children:e.map(e=>(0,r.jsxs)("div",{className:"flex items-center p-3 bg-emerald-50 rounded-lg",children:[(0,r.jsx)(e.icon,{className:"text-emerald-600 mr-3"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"font-medium text-gray-800",children:e.title}),(0,r.jsx)("p",{className:"text-sm text-gray-700",children:e.timestamp})]})]},e.id))})]})}s(58009)},89295:(e,t,s)=>{"use strict";s.d(t,{A:()=>l});var r=s(45512);s(58009);var a=s(44098);function l({title:e,role:t,userName:s,currentPath:l}){let n=(e=>{switch(e){case"ADMIN":return[{href:"/portal/admin/dashboard",label:"Dashboard"},{href:"/portal/admin/user-management",label:"User Management"},{href:"/portal/admin/course-management",label:"Course Management"},{href:"/portal/admin/report-systems",label:"Report Systems"}];case"FACULTY":return[{href:"/portal/faculty/dashboard",label:"Dashboard"},{href:"/portal/faculty/courses",label:"My Courses"},{href:"/portal/faculty/grades",label:"Grade Management"},{href:"/portal/faculty/schedule",label:"Schedule"}];case"STUDENT":return[{href:"/portal/student/dashboard",label:"Dashboard"},{href:"/portal/student/courses",label:"My Courses"},{href:"/portal/student/grades",label:"My Grades"},{href:"/portal/student/schedule",label:"My Schedule"}];default:return[]}})(t);return(0,r.jsxs)("header",{className:"bg-white shadow-md p-4 flex justify-between items-center",children:[(0,r.jsxs)("h1",{className:"text-2xl font-bold text-emerald-900",children:[e,(0,r.jsx)("span",{className:"ml-2 text-sm px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full",children:t})]}),(0,r.jsx)("nav",{className:"flex space-x-4",children:n.map(e=>(0,r.jsx)("a",{href:e.href,className:`text-gray-700 hover:text-emerald-600 ${l===e.href?"font-bold text-emerald-600":""}`,children:e.label},e.href))}),(0,r.jsxs)("div",{className:"flex items-center gap-4",children:[(0,r.jsxs)("div",{className:"relative",children:[(0,r.jsx)(a.jNV,{className:"text-gray-600 text-xl cursor-pointer hover:text-emerald-600"}),(0,r.jsx)("span",{className:"absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",children:"3"})]}),(0,r.jsx)("span",{className:"text-gray-700",children:s})]})]})}},63626:(e,t,s)=>{"use strict";s.d(t,{A:()=>a});var r=s(45512);function a({title:e,value:t,icon:s,trend:a,className:l=""}){return(0,r.jsxs)("div",{className:`bg-white p-6 rounded-lg shadow-md ${l}`,children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,r.jsx)("h3",{className:"text-gray-700 text-sm font-medium",children:e}),(0,r.jsx)(s,{className:"text-emerald-600 text-xl"})]}),(0,r.jsxs)("div",{className:"flex items-end justify-between",children:[(0,r.jsx)("span",{className:"text-3xl font-bold text-emerald-900",children:t}),a&&(0,r.jsxs)("span",{className:`flex items-center ${a.isUpward?"text-green-600":"text-red-600"}`,children:[a.isUpward?"↑":"↓"," ",a.value,"%"]})]})]})}s(58009)},23482:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>d});var r=s(62740),a=s(59607),l=s.n(a);function n(){return(0,r.jsx)("header",{className:"bg-gradient-to-r from-emerald-700 to-emerald-900 text-white p-4",children:(0,r.jsxs)("nav",{className:"container mx-auto flex justify-between items-center",children:[(0,r.jsx)("h1",{className:"text-xl font-bold",children:"Greenfield University"}),(0,r.jsxs)("ul",{className:"flex gap-4",children:[(0,r.jsx)("li",{children:(0,r.jsx)(l(),{href:"/",className:"hover:text-emerald-200 transition-colors",children:"Homepage"})}),(0,r.jsx)("li",{children:(0,r.jsx)(l(),{href:"/visit",className:"hover:text-emerald-200 transition-colors",children:"Visit"})}),(0,r.jsx)("li",{children:(0,r.jsx)(l(),{href:"/apply",className:"hover:text-emerald-200 transition-colors",children:"Apply"})}),(0,r.jsx)("li",{children:(0,r.jsx)(l(),{href:"/portal",className:"hover:text-emerald-200 transition-colors",children:"GU Portal"})})]})]})})}function i(){return(0,r.jsx)("footer",{className:"bg-gradient-to-r from-emerald-700 to-emerald-900 text-white p-6",children:(0,r.jsxs)("div",{className:"container mx-auto flex flex-col md:flex-row justify-between items-center",children:[(0,r.jsxs)("p",{children:["\xa9 ",new Date().getFullYear()," Greenfield University. All rights reserved."]}),(0,r.jsxs)("div",{className:"flex gap-4",children:[(0,r.jsx)(l(),{href:"/contact",className:"hover:text-emerald-200 transition-colors",children:"Contact Us"}),(0,r.jsx)(l(),{href:"/faq",className:"hover:text-emerald-200 transition-colors",children:"FAQs"}),(0,r.jsx)(l(),{href:"/policies",className:"hover:text-emerald-200 transition-colors",children:"Policies"})]})]})})}function d({children:e}){return(0,r.jsx)("html",{lang:"en",children:(0,r.jsxs)("body",{className:"min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 flex flex-col",children:[(0,r.jsx)(n,{}),(0,r.jsx)("main",{className:"flex-grow",children:e}),(0,r.jsx)(i,{})]})})}s(35692)},45173:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\Launchpad\\\\Greenfield_University\\\\src\\\\app\\\\portal\\\\student\\\\dashboard\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Launchpad\\Greenfield_University\\src\\app\\portal\\student\\dashboard\\page.tsx","default")},70440:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var r=s(88077);let a=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,r.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},35692:()=>{}};var t=require("../../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[638,767,77,98],()=>s(25090));module.exports=r})();