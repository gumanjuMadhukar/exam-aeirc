(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1817],{75527:function(e,r,n){"use strict";n.d(r,{Z:function(){return _}});var t=n(4942),a=n(87462),o=n(97685),i=n(74902),l=n(94184),c=n.n(l),u=n(50344),s=n(67294),d=n(53124),p=n(68508),f=n(96159),m=n(80882),b=n(42409),g=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&0>r.indexOf(t)&&(n[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)0>r.indexOf(t[a])&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(n[t[a]]=e[t[a]]);return n},h=function(e){var r,n,t=e.prefixCls,o=e.separator,i=void 0===o?"/":o,l=e.children,c=e.menu,u=e.overlay,p=e.dropdownProps,f=g(e,["prefixCls","separator","children","menu","overlay","dropdownProps"]),h=(0,s.useContext(d.E_).getPrefixCls)("breadcrumb",t);return(r=n="href"in f?s.createElement("a",(0,a.Z)({className:h+"-link"},f),l):s.createElement("span",(0,a.Z)({className:h+"-link"},f),l),n=c||u?s.createElement(b.Z,(0,a.Z)({menu:c,overlay:u,placement:"bottom"},p),s.createElement("span",{className:h+"-overlay-link"},r,s.createElement(m.Z,null))):r,null!=l)?s.createElement("li",null,n,i&&s.createElement("span",{className:h+"-separator"},i)):null};h.__ANT_BREADCRUMB_ITEM=!0;var v=function(e){var r=e.children,n=(0,s.useContext(d.E_).getPrefixCls)("breadcrumb");return s.createElement("span",{className:n+"-separator"},r||"/")};v.__ANT_BREADCRUMB_SEPARATOR=!0;var x=n(67968),Z=n(45503),y=n(14747),S=function(e){var r,n,o=e.componentCls,i=e.iconCls;return(0,t.Z)({},o,(0,a.Z)((0,a.Z)({},(0,y.Wf)(e)),(n={color:e.breadcrumbBaseColor,fontSize:e.breadcrumbFontSize},(0,t.Z)(n,i,{fontSize:e.breadcrumbIconFontSize}),(0,t.Z)(n,"ol",{display:"flex",flexWrap:"wrap",margin:0,padding:0,listStyle:"none"}),(0,t.Z)(n,"a",(0,a.Z)({color:e.breadcrumbLinkColor,transition:"color "+e.motionDurationMid,padding:"0 "+e.paddingXXS+"px",borderRadius:e.borderRadiusSM,height:e.lineHeight*e.fontSize,display:"inline-block",marginInline:-e.marginXXS,"&:hover":{color:e.breadcrumbLinkColorHover,backgroundColor:e.colorBgTextHover}},(0,y.Qy)(e))),(0,t.Z)(n,"li:last-child > "+o+"-separator",{display:"none"}),(0,t.Z)(n,o+"-separator",{marginInline:e.breadcrumbSeparatorMargin,color:e.breadcrumbSeparatorColor}),(0,t.Z)(n,o+"-link",(0,t.Z)({},"\n          > "+i+" + span,\n          > "+i+" + a\n        ",{marginInlineStart:e.marginXXS})),(0,t.Z)(n,o+"-overlay-link",(r={borderRadius:e.borderRadiusSM,height:e.lineHeight*e.fontSize,display:"inline-block",padding:"0 "+e.paddingXXS+"px",marginInline:-e.marginXXS},(0,t.Z)(r,"> "+i,{marginInlineStart:e.marginXXS,fontSize:e.fontSizeIcon}),(0,t.Z)(r,"&:hover",{color:e.breadcrumbLinkColorHover,backgroundColor:e.colorBgTextHover,a:{color:e.breadcrumbLinkColorHover}}),(0,t.Z)(r,"a",{"&:hover":{backgroundColor:"transparent"}}),r)),(0,t.Z)(n,"&"+e.componentCls+"-rtl",{direction:"rtl"}),n)))},C=(0,x.Z)("Breadcrumb",function(e){return[S((0,Z.TS)(e,{breadcrumbBaseColor:e.colorTextDescription,breadcrumbFontSize:e.fontSize,breadcrumbIconFontSize:e.fontSize,breadcrumbLinkColor:e.colorTextDescription,breadcrumbLinkColorHover:e.colorText,breadcrumbLastItemColor:e.colorText,breadcrumbSeparatorMargin:e.marginXS,breadcrumbSeparatorColor:e.colorTextDescription}))]}),E=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&0>r.indexOf(t)&&(n[t]=e[t]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)0>r.indexOf(t[a])&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(n[t[a]]=e[t[a]]);return n};function k(e,r,n,t){var a=n.indexOf(e)===n.length-1,o=function(e,r){if(!e.breadcrumbName)return null;var n=Object.keys(r).join("|");return e.breadcrumbName.replace(RegExp(":("+n+")","g"),function(e,n){return r[n]||e})}(e,r);return a?s.createElement("span",null,o):s.createElement("a",{href:"#/"+t.join("/")},o)}var w=function(e,r){return e=(e||"").replace(/^\//,""),Object.keys(r).forEach(function(n){e=e.replace(":"+n,r[n])}),e},j=function(e,r,n){var t=(0,i.Z)(e),a=w(r||"",n);return a&&t.push(a),t},O=function(e){var r,n=e.prefixCls,i=e.separator,l=void 0===i?"/":i,m=e.style,b=e.className,g=e.routes,v=e.children,x=e.itemRender,Z=void 0===x?k:x,y=e.params,S=void 0===y?{}:y,O=E(e,["prefixCls","separator","style","className","routes","children","itemRender","params"]),_=s.useContext(d.E_),P=_.getPrefixCls,N=_.direction,I=P("breadcrumb",n),T=C(I),X=(0,o.Z)(T,2),R=X[0],z=X[1];if(g&&g.length>0){var B=[];r=g.map(function(e){var r,n=w(e.path,S);n&&B.push(n),e.children&&e.children.length&&(r=s.createElement(p.Z,{items:e.children.map(function(e){return{key:e.path||e.breadcrumbName,label:Z(e,S,g,j(B,e.path,S))}})}));var t={separator:l};return r&&(t.overlay=r),s.createElement(h,(0,a.Z)({},t,{key:n||e.breadcrumbName}),Z(e,S,g,B))})}else v&&(r=(0,u.Z)(v).map(function(e,r){return e?(0,f.Tm)(e,{separator:l,key:r}):e}));var H=c()(I,(0,t.Z)({},I+"-rtl","rtl"===N),b,z);return R(s.createElement("nav",(0,a.Z)({className:H,style:m},O),s.createElement("ol",null,r)))};O.Item=h,O.Separator=v;var _=O},43259:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dir/settings",function(){return n(6248)}])},6248:function(e,r,n){"use strict";n.r(r);var t=n(7297),a=n(85893),o=n(94589),i=n(75527),l=n(41664),c=n.n(l),u=n(67294),s=n(19001),d=n(88767),p=n(9166),f=n(60144),m=n(63129);function b(){let e=(0,t.Z)([""]);return b=function(){return e},e}let g=()=>{let[e,r]=(0,u.useState)(!1),[n,t]=(0,u.useState)(!1),[o,l]=(0,u.useState)(!1),b=new s.Z,{data:g,isLoading:v}=(0,d.useQuery)(["SettingData"],async()=>{let e=await b.list();return null==e?void 0:e.data});return(0,u.useEffect)(()=>{g&&l(null==g?void 0:g.active)},[g]),(0,a.jsxs)(h,{children:[(0,a.jsx)(p.mr,{children:(0,a.jsxs)(p.rm,{children:[(0,a.jsxs)(i.Z,{children:[(0,a.jsx)(i.Z.Item,{children:(0,a.jsx)(c(),{href:"/dashboard",children:"Home"})}),(0,a.jsx)(i.Z.Item,{children:(0,a.jsx)("span",{style:{color:f.w.BLACK},children:"Settings"})})]}),(0,a.jsx)(p.oY,{children:(0,a.jsx)("h2",{children:"Settings"})})]})}),(0,a.jsx)(m.default,{data:g,isLoading:v})]})};r.default=g;let h=o.ZP.div(b())},9166:function(e,r,n){"use strict";n.d(r,{A_:function(){return g},E1:function(){return b},Y3:function(){return h},mr:function(){return p},oY:function(){return m},rm:function(){return f}});var t=n(7297),a=n(94589);function o(){let e=(0,t.Z)([""]);return o=function(){return e},e}function i(){let e=(0,t.Z)(["\n  border-top: 1px solid rgba(0, 0, 0, 0.2);\n"]);return i=function(){return e},e}function l(){let e=(0,t.Z)(["\n  background: #fff;\n  padding: 24px;\n"]);return l=function(){return e},e}function c(){let e=(0,t.Z)(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  @media (max-width: 480px) {\n    display: flex;\n    flex-wrap: wrap;\n  }\n"]);return c=function(){return e},e}function u(){let e=(0,t.Z)(["\n  background: #fff;\n  margin: 24px;\n  height: 64px;\n  @media (max-width: 762px) {\n    overflow-wrap: anywhere;\n    height: auto;\n  }\n"]);return u=function(){return e},e}function s(){let e=(0,t.Z)(["\n  padding: 16px;\n  line-height: 20px;\n\n  // display: grid;\n  // gap: 20px;\n  align-items: center;\n  // justify-content: center;\n"]);return s=function(){return e},e}function d(){let e=(0,t.Z)(["\n  padding: 24px;\n  padding-top: 0;\n"]);return d=function(){return e},e}a.ZP.div(o());let p=a.ZP.div(i()),f=a.ZP.div(l()),m=a.ZP.div(c()),b=a.ZP.div(u()),g=a.ZP.div(s()),h=a.ZP.div(d())}},function(e){e.O(0,[4297,3129,9774,2888,179],function(){return e(e.s=43259)}),_N_E=e.O()}]);