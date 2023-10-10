(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[53],{51904:function(n,e,t){"use strict";t.d(e,{Z:function(){return P}});var r=t(4942),o=t(87462),i=t(97685),l=t(97937),c=t(94184),a=t.n(c),u=t(67294),s=t(53124),d=t(98787),p=t(28704),f=t(8796),m=t(67968),g=t(45503),h=t(14747),x=function(n,e,t){var o="string"!=typeof t?t:t.charAt(0).toUpperCase()+t.slice(1);return(0,r.Z)({},n.componentCls+"-"+e,{color:n["color"+t],background:n["color"+o+"Bg"],borderColor:n["color"+o+"Border"]})},Z=function(n){var e,t=n.paddingXXS,i=n.lineWidth,l=n.tagPaddingHorizontal-i;return(0,r.Z)({},n.componentCls,(0,o.Z)((0,o.Z)({},(0,h.Wf)(n)),(e={display:"inline-block",height:"auto",marginInlineEnd:n.marginXS,paddingInline:l,fontSize:n.tagFontSize,lineHeight:n.tagLineHeight+"px",whiteSpace:"nowrap",background:n.tagDefaultBg,border:n.lineWidth+"px "+n.lineType+" "+n.colorBorder,borderRadius:n.borderRadiusSM,opacity:1,transition:"all "+n.motionDurationMid,textAlign:"start","&&-rtl":{direction:"rtl"},"&, a, a:hover":{color:n.tagDefaultColor}},(0,r.Z)(e,n.componentCls+"-close-icon",{marginInlineStart:t-i,color:n.colorTextDescription,fontSize:n.tagIconSize,cursor:"pointer",transition:"all "+n.motionDurationMid,"&:hover":{color:n.colorTextHeading}}),(0,r.Z)(e,"&&-has-color",(0,r.Z)({borderColor:"transparent"},"&, a, a:hover, "+n.iconCls+"-close, "+n.iconCls+"-close:hover",{color:n.colorTextLightSolid})),(0,r.Z)(e,"&-checkable",{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer","&:not(&-checked):hover":{color:n.colorPrimary,backgroundColor:n.colorFillSecondary},"&:active, &-checked":{color:n.colorTextLightSolid},"&-checked":{backgroundColor:n.colorPrimary,"&:hover":{backgroundColor:n.colorPrimaryHover}},"&:active":{backgroundColor:n.colorPrimaryActive}}),(0,r.Z)(e,"&-hidden",{display:"none"}),(0,r.Z)(e,"> "+n.iconCls+" + span, > span + "+n.iconCls,{marginInlineStart:l}),e)))},v=(0,m.Z)("Tag",function(n){var e=n.fontSize,t=n.lineHeight,i=n.lineWidth,l=n.fontSizeIcon,c=n.fontSizeSM,a=n.colorFillAlter,u=n.colorText,s=(0,g.TS)(n,{tagFontSize:c,tagLineHeight:Math.round(e*t)-2*i,tagDefaultBg:a,tagDefaultColor:u,tagIconSize:l-2*i,tagPaddingHorizontal:8});return[Z(s),f.i.reduce(function(n,e){var t,i=s[e+"-1"],l=s[e+"-3"],c=s[e+"-6"],a=s[e+"-7"];return(0,o.Z)((0,o.Z)({},n),(t={},(0,r.Z)(t,s.componentCls+"-"+e,{color:a,background:i,borderColor:l}),(0,r.Z)(t,s.componentCls+"-"+e+"-inverse",{color:s.colorTextLightSolid,background:c,borderColor:c}),t))},{}),x(s,"success","Success"),x(s,"processing","Info"),x(s,"error","Error"),x(s,"warning","Warning")]}),b=function(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&0>e.indexOf(r)&&(t[r]=n[r]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(n);o<r.length;o++)0>e.indexOf(r[o])&&Object.prototype.propertyIsEnumerable.call(n,r[o])&&(t[r[o]]=n[r[o]]);return t},j=function(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&0>e.indexOf(r)&&(t[r]=n[r]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(n);o<r.length;o++)0>e.indexOf(r[o])&&Object.prototype.propertyIsEnumerable.call(n,r[o])&&(t[r[o]]=n[r[o]]);return t},y=RegExp("^("+d.Y.join("|")+")(-inverse)?$"),w=RegExp("^("+d.E.join("|")+")$"),C=u.forwardRef(function(n,e){var t,c=n.prefixCls,d=n.className,f=n.style,m=n.children,g=n.icon,h=n.color,x=n.onClose,Z=n.closeIcon,b=n.closable,C=j(n,["prefixCls","className","style","children","icon","color","onClose","closeIcon","closable"]),P=u.useContext(s.E_),S=P.getPrefixCls,k=P.direction,_=u.useState(!0),O=(0,i.Z)(_,2),E=O[0],T=O[1];u.useEffect(function(){"visible"in C&&T(C.visible)},[C.visible]);var N=function(){return!!h&&(y.test(h)||w.test(h))},I=(0,o.Z)({backgroundColor:h&&!N()?h:void 0},f),B=N(),Q=S("tag",c),z=v(Q),R=(0,i.Z)(z,2),D=R[0],A=R[1],H=a()(Q,(t={},(0,r.Z)(t,Q+"-"+h,B),(0,r.Z)(t,Q+"-has-color",h&&!B),(0,r.Z)(t,Q+"-hidden",!E),(0,r.Z)(t,Q+"-rtl","rtl"===k),t),d,A),L=function(n){n.stopPropagation(),null==x||x(n),n.defaultPrevented||T(!1)},Y="onClick"in C||m&&"a"===m.type,F=g||null,M=F?u.createElement(u.Fragment,null,F,u.createElement("span",null,m)):m,q=u.createElement("span",(0,o.Z)({},C,{ref:e,className:H,style:I}),M,void 0!==b&&b?Z?u.createElement("span",{className:Q+"-close-icon",onClick:L},Z):u.createElement(l.Z,{className:Q+"-close-icon",onClick:L}):null);return D(Y?u.createElement(p.Z,null,q):q)});C.CheckableTag=function(n){var e,t=n.prefixCls,l=n.className,c=n.checked,d=n.onChange,p=n.onClick,f=b(n,["prefixCls","className","checked","onChange","onClick"]),m=(0,u.useContext(s.E_).getPrefixCls)("tag",t),g=v(m),h=(0,i.Z)(g,2),x=h[0],Z=h[1],j=a()(m,(e={},(0,r.Z)(e,m+"-checkable",!0),(0,r.Z)(e,m+"-checkable-checked",c),e),l,Z);return x(u.createElement("span",(0,o.Z)({},f,{className:j,onClick:function(n){null==d||d(!c),null==p||p(n)}})))};var P=C},21812:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dir/student/[programId]",function(){return t(74692)}])},8392:function(n,e,t){"use strict";t.d(e,{BB:function(){return a},Bk:function(){return c},Km:function(){return u},ZP:function(){return i},ts:function(){return l}});var r=t(84545),o=t(27836);class i extends r.Z{getQuestionBasedOnSubject(n,e){return(0,o.Z)({url:"/getQuestionBasedOnSubject/".concat(n,"?page=").concat(e.currentPage),method:"get",params:e})}getRandomQuestion(n){return(0,o.Z)({url:"/attempts/".concat(n),method:"get"})}postQuestionsAnswer(n){return(0,o.Z)({url:"/attempts",method:"post",data:n})}storeMultipleQuestionAnswer(n){return(0,o.Z)({url:"/storeMultipleQuestionAnswer",method:"post",data:n})}getPaginatedQuestion(n,e){return(0,o.Z)({url:"/pulchockWiseData/5",method:"get",params:n})}getQuestionBasedOnCourseContent(n,e){return(0,o.Z)({url:"/getQuestionBasedOnCourseContent/".concat(n,"?page=").concat(e.currentPage),method:"get",params:e})}constructor(){super("questions")}}function l(n){let{file:e,subject_id:t}=n,r=new FormData;return r.append("file",e[0]),r.append("subject_id",t),(0,o.Z)({url:"/importQuestions",method:"post",data:r,headers:{"Content-Type":"multipart/form-data"}})}let c=n=>(0,o.Z)({url:"/allocateRandomQuestion",method:"post",data:n}),a=n=>(0,o.Z)({url:"/calculateStudentMarks/".concat(n),method:"get"}),u=n=>{let{file:e,course_content_id:t}=n,r=new FormData;return r.append("file",e[0]),r.append("course_content_id",t),(0,o.Z)({url:"/import/course-content-questions",method:"post",data:r,headers:{"Content-Type":"multipart/form-data"}})}},80237:function(n,e,t){"use strict";t.d(e,{Z:function(){return i},s:function(){return l}});var r=t(84545),o=t(27836);class i extends r.Z{getStudentBasedOnSubject(n){return(0,o.Z)({url:"/getStudentBasedOnSubject/".concat(n),method:"get"})}constructor(){super("student")}}function l(n){let{file:e,subject_id:t}=n,r=new FormData;return r.append("file",e[0]),r.append("subject_id",t),(0,o.Z)({url:"/importStudents",method:"post",data:r,headers:{"Content-Type":"multipart/form-data"}})}},82631:function(n,e,t){"use strict";t.r(e);var r=t(85893),o=t(60144),i=t(45297);let l=n=>{var e;let{data:t}=n;return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(i.c0,{children:[(0,r.jsx)(i.wg,{children:(0,r.jsx)(i.fw,{children:"Basic Information"})}),(0,r.jsxs)(i.Te,{children:[(0,r.jsx)(i.N0,{xs:8,children:"Name:"}),(0,r.jsx)(i.hY,{xs:16,children:null==t?void 0:t.name}),(0,r.jsx)(i.N0,{xs:8,children:"Email:"}),(0,r.jsx)(i.hY,{xs:16,children:null==t?void 0:t.email}),(0,r.jsx)(i.N0,{xs:8,children:"Symbol Number:"}),(0,r.jsx)(i.hY,{xs:16,children:null==t?void 0:t.symbol_number}),(0,r.jsx)(i.N0,{xs:8,children:"Date Of Birth:"}),(0,r.jsx)(i.hY,{xs:16,children:null==t?void 0:t.date_of_birth}),(0,r.jsx)(i.N0,{xs:8,children:"Subject:"}),(0,r.jsx)(i.hY,{xs:16,style:{color:o.w.PRIMARY},children:null==t?void 0:null===(e=t.subject)||void 0===e?void 0:e.name})]})]})})};e.default=l},74692:function(n,e,t){"use strict";t.r(e);var r=t(7297),o=t(85893),i=t(94589),l=t(75527),c=t(51904),a=t(78613),u=t(15746),s=t(88577),d=t(71230),p=t(41664),f=t.n(p),m=t(67294),g=t(80237),h=t(8392),x=t(88767),Z=t(11163),v=t(9166),b=t(60144),j=t(82631);function y(){let n=(0,r.Z)([""]);return y=function(){return n},n}function w(){let n=(0,r.Z)(["\n  padding: 25px;\n"]);return w=function(){return n},n}function C(){let n=(0,r.Z)(["\n  background-color: #fff;\n  height: 300px;\n"]);return C=function(){return n},n}function P(){let n=(0,r.Z)(["\n  width: 200px;\n  text-align: center;\n  .ant-image {\n    width: 100%;\n    .profile-img {\n      &.img-padding {\n        padding: 40px;\n      }\n      background: ",";\n      border-radius: 50%;\n    }\n  }\n"]);return P=function(){return n},n}function S(){let n=(0,r.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n"]);return S=function(){return n},n}function k(){let n=(0,r.Z)(["\n  margin-left: 15px;\n"]);return k=function(){return n},n}let _=()=>{let[n,e]=(0,m.useState)(""),t=(0,Z.useRouter)(),{programId:r}=t.query,i=new g.Z,d=new h.ZP,p=(0,x.useQuery)(["StudentData"],async()=>await i.get(r).then(n=>n.data.data).catch(n=>n),{enabled:!!r}),y=(0,x.useQuery)(["StudentList"],async()=>await d.getRandomQuestion(r).then(n=>n.data.data).catch(n=>n),{enabled:!!r}),w=null==y?void 0:y.data,C=null==p?void 0:p.data;return(0,o.jsxs)(O,{children:[(0,o.jsx)(v.mr,{children:(0,o.jsxs)(v.rm,{children:[(0,o.jsxs)(l.Z,{children:[(0,o.jsx)(l.Z.Item,{children:(0,o.jsx)(f(),{href:"/dashboard",children:"Home"})}),(0,o.jsx)(l.Z.Item,{children:(0,o.jsx)("span",{style:{color:b.w.BLACK},children:null==C?void 0:C.name})})]}),(0,o.jsxs)(v.oY,{children:[(0,o.jsxs)("h2",{children:[null==C?void 0:C.name," "]}),(0,o.jsx)(c.Z,{color:"success",children:"Passed"})]})]})}),(0,o.jsxs)(E,{children:[(0,o.jsx)(T,{lg:5,sm:24,children:(0,o.jsx)(I,{children:(0,o.jsx)("div",{children:(0,o.jsx)(N,{children:(0,o.jsx)(a.Z,{className:"profile-img",alt:"avatar",src:""})})})})}),(0,o.jsx)(u.Z,{lg:19,sm:24,className:"search-col-margin",children:(0,o.jsx)(j.default,{data:C})})]}),(0,o.jsx)(v.Y3,{children:(0,o.jsx)(s.Z,{columns:[{title:"S.N",render:(n,e,t)=>t+1,responsive:["sm","md","lg"]},{title:"Question",key:"question_text",render(n){var e;return(0,o.jsx)("text",{children:null==n?void 0:null===(e=n.question)||void 0===e?void 0:e.question_text})},responsive:["sm","md","lg"]},{title:"Question Type",render(n){var e;return(0,o.jsx)("text",{children:null==n?void 0:null===(e=n.question)||void 0===e?void 0:e.question_type})},responsive:["sm","md","lg"]},{title:"Options",render:n=>(0,o.jsx)("text",{children:n.options.map(n=>"".concat(n.option_text," : "))}),responsive:["sm","md","lg"]},{title:"Attempted Answer",render(n){var e;return(0,o.jsx)("text",{children:null===(e=n.attempted_options)||void 0===e?void 0:e.map(n=>(0,o.jsx)(B,{color:"success",children:n.option_text}))})},responsive:["sm","md","lg"]}],dataSource:w,scroll:{x:1e3}})})]})};e.default=_;let O=i.ZP.div(y()),E=(0,i.ZP)(d.Z)(w()),T=(0,i.ZP)(u.Z)(C()),N=i.ZP.div(P(),b.w.LIGHTER_BG),I=i.ZP.div(S()),B=(0,i.ZP)(c.Z)(k())},45297:function(n,e,t){"use strict";t.d(e,{N0:function(){return x},Te:function(){return h},c0:function(){return v},fw:function(){return b},hY:function(){return Z},wg:function(){return j}});var r=t(7297),o=t(71230),i=t(15746),l=t(94589),c=t(60144);function a(){let n=(0,r.Z)(["\n  width: 100%;\n  @media (max-width: 480px) {\n    font-size: 12px;\n  }\n"]);return a=function(){return n},n}function u(){let n=(0,r.Z)(["\n  margin-bottom: 10px;\n  color: ",";\n  @media (max-width: 480px) {\n    font-size: 12px;\n  }\n"]);return u=function(){return n},n}function s(){let n=(0,r.Z)(["\n  font-weight: bold;\n  // margin-left: 10px;\n"]);return s=function(){return n},n}function d(){let n=(0,r.Z)(["\n  background: #fff;\n  // margin-bottom: 25px;\n  margin-left: 25px;\n  padding: 25px;\n  @media (max-width: 988px) {\n    margin-left: 0px;\n    padding: 10px;\n    overflow: scroll;\n  }\n"]);return d=function(){return n},n}function p(){let n=(0,r.Z)(["\n  font-size: 20px;\n  color: #000;\n  font-weight: 700;\n  @media (max-width: 480px) {\n    font-size: 14px;\n    font-weight: 600;\n  }\n"]);return p=function(){return n},n}function f(){let n=(0,r.Z)(["\n  margin-bottom: 15px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  column-gap: 10px;\n"]);return f=function(){return n},n}function m(){let n=(0,r.Z)(["\n  float: right;\n  margin-top: 10px;\n"]);return m=function(){return n},n}function g(){let n=(0,r.Z)(["\n  color: ",";\n"]);return g=function(){return n},n}let h=(0,l.ZP)(o.Z)(a()),x=(0,l.ZP)(i.Z)(u(),c.w.LIGHT_TEXT_COLOR),Z=(0,l.ZP)(i.Z)(s()),v=l.ZP.div(d()),b=l.ZP.div(p()),j=l.ZP.div(f());l.ZP.div(m()),(0,l.ZP)(i.Z)(g(),c.w.LIGHT_TEXT_COLOR)},9166:function(n,e,t){"use strict";t.d(e,{A_:function(){return h},E1:function(){return g},Y3:function(){return x},mr:function(){return p},oY:function(){return m},rm:function(){return f}});var r=t(7297),o=t(94589);function i(){let n=(0,r.Z)([""]);return i=function(){return n},n}function l(){let n=(0,r.Z)(["\n  border-top: 1px solid rgba(0, 0, 0, 0.2);\n"]);return l=function(){return n},n}function c(){let n=(0,r.Z)(["\n  background: #fff;\n  padding: 24px;\n"]);return c=function(){return n},n}function a(){let n=(0,r.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  @media (max-width: 480px) {\n    display: flex;\n    flex-wrap: wrap;\n  }\n"]);return a=function(){return n},n}function u(){let n=(0,r.Z)(["\n  background: #fff;\n  margin: 24px;\n  height: 64px;\n  @media (max-width: 762px) {\n    overflow-wrap: anywhere;\n    height: auto;\n  }\n"]);return u=function(){return n},n}function s(){let n=(0,r.Z)(["\n  padding: 16px;\n  line-height: 20px;\n\n  // display: grid;\n  // gap: 20px;\n  align-items: center;\n  // justify-content: center;\n"]);return s=function(){return n},n}function d(){let n=(0,r.Z)(["\n  padding: 24px;\n  padding-top: 0;\n"]);return d=function(){return n},n}o.ZP.div(i());let p=o.ZP.div(l()),f=o.ZP.div(c()),m=o.ZP.div(a()),g=o.ZP.div(u()),h=o.ZP.div(s()),x=o.ZP.div(d())}},function(n){n.O(0,[2808,8045,8668,8613,9774,2888,179],function(){return n(n.s=21812)}),_N_E=n.O()}]);