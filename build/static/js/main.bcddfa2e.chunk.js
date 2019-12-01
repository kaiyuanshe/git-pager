(this["webpackJsonpgit-pager"]=this["webpackJsonpgit-pager"]||[]).push([[0],{137:function(e,t,r){e.exports={editor:"MarkdownEditor_editor__2gENy"}},138:function(e){e.exports=JSON.parse('{"title":"Git Pager","menu":[{"title":"Editor","href":"#top"},{"title":"Source code","href":"https://github.com/kaiyuanshe/git-pager"}]}')},140:function(e,t,r){e.exports=r(265)},234:function(e,t){},265:function(e,t,r){"use strict";r.r(t);r(141),r(165);var n=r(22),a=r(133),c=r(0),o=r.n(c),i=r(52),s=r.n(i),u=r(2),l=r.n(u),p=r(11),f=r(23);function m(e){return!(null!=e)||"number"===typeof e&&isNaN(e)}function h(){return parseInt((Math.random()+"").slice(2)).toString(36)}var b=["Y","M","D","H","m","s","ms"],d=/[YMDHms]+/g;function v(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Date.now(),t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-DD HH:mm:ss";e=new Date(e);var r=new Date(+e-60*e.getTimezoneOffset()*1e3).toISOString().split(/[^\d]/).reduce((function(e,t,r){return e[b[r]]=+t,e}),{});return t.replace(d,(function(e){return(r[e[0]]+"").padStart(e.length,"0")}))}function y(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.25;return function(){clearTimeout(t);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];t=setTimeout(e.bind.apply(e,[].concat.apply([this],a)),1e3*r)}}var O=document.createElement("template"),g=document.createDocumentFragment();function j(){g.append.apply(g,arguments);var e=window.getSelection();e&&e.getRangeAt(0).insertNode(g)}function w(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.location.search,t={},r=(/(?:\?|#)?(\S+)/.exec(e)||"")[1],n=!0,a=!1,c=void 0;try{for(var o,i=new URLSearchParams(r)[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var s=o.value,u=Object(f.a)(s,2),l=u[0],p=u[1];try{p=JSON.parse(p)}catch(h){}m(t[l])?t[l]=p:(t[l]instanceof Array||(t[l]=[t[l]]),t[l].push(p))}}catch(b){a=!0,c=b}finally{try{n||null==i.return||i.return()}finally{if(a)throw c}}return t}function k(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.cookie;return Object.fromEntries(e.split(/;\s*/).map((function(e){var t=e.split("=");return[t.shift(),t.join("=")]})))}var x=/^data:(.+?\/(.+?))?(;base64)?,([\s\S]+)/;function E(e){var t=x.exec(e)||[],r=Object(f.a)(t,5),n=(r[0],r[1]),a=(r[2],r[3]),c=r[4];c=a?window.atob(c):c;for(var o=new ArrayBuffer(c.length),i=new Uint8Array(o),s=0;c[s];s++)i[s]=c.charCodeAt(s);return new Blob([o],{type:n})}function S(e){return N.apply(this,arguments)}function N(){return(N=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return e.abrupt("return",e.sent.blob());case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"DataURL",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"UTF-8",n=new FileReader;return new Promise((function(a,c){switch(n.onload=function(){return a(n.result)},n.onerror=c,t){case"Text":return n.readAsText(e,r);case"DataURL":return n.readAsDataURL(e);case"BinaryString":return n.readAsBinaryString(e);case"ArrayBuffer":return n.readAsArrayBuffer(e)}throw TypeError("Unsupported type: "+t)}))}function D(e){return C.apply(this,arguments)}function C(){return(C=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t instanceof Blob)){e.next=11;break}return e.t2=x,e.next=4,P(t);case 4:if(e.t3=e.sent,e.t1=e.t2.exec.call(e.t2,e.t3),e.t1){e.next=8;break}e.t1="";case 8:e.t0=e.t1[4],e.next=12;break;case 11:e.t0=window.btoa(encodeURIComponent(t).replace(/%([0-9A-F]{2})/g,(function(e,t){return String.fromCharCode(+("0x"+t))})));case 12:return e.abrupt("return",e.t0);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var A=r(66),L=r(64),R=r.n(L);function M(e){var t=e.title,r=e.menu,n=void 0===r?[]:r,a=e.expand,c=void 0===a?"lg":a,i=e.theme,s=void 0===i?"light":i,u=e.background,l=void 0===u?"light":u,p=e.rightSlot,f=h();return o.a.createElement("nav",{className:"navbar navbar-expand-".concat(c," navbar-").concat(s," bg-").concat(l," sticky-top")},o.a.createElement("div",{className:"container"},o.a.createElement("a",{className:"navbar-brand",href:"."},t),o.a.createElement("button",{type:"button",className:"navbar-toggler","data-toggle":"collapse","data-target":"#"+f,"aria-controls":f,"aria-expanded":"false","aria-label":"Toggle navigation"},o.a.createElement("span",{className:"navbar-toggler-icon"})),o.a.createElement("div",{className:"collapse navbar-collapse",id:f},o.a.createElement("ul",{className:"navbar-nav mr-auto"},n.map((function(e,t){var r,n=e.title,a=e.href;return o.a.createElement("li",{className:R()("nav-item",{active:!t}),key:n},o.a.createElement("a",{className:"nav-link",href:a,target:(r=a,new URL(r,document.baseURI).origin!==window.location.origin?"_blank":void 0)},n,!t&&o.a.createElement("span",{className:"sr-only"},"(current)")))}))),p)))}var U=Object(A.a)((function(e){var t=e.name,r=e.avatar_url,n=e.html_url,a=e.blog;return o.a.createElement("a",{href:a||n,title:t},o.a.createElement("img",{className:"img-thumbnail",style:{width:"2.5rem"},alt:t,src:r}))})),_=r(31),B=r(13),F=r(19),I=r(18),T=r(10),V=r(42),q=r(17),H=r(134),J=r(87),Y=function(e){function t(){var e,r;Object(B.a)(this,t);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(r=Object(I.a)(this,(e=Object(T.a)(t)).call.apply(e,[this].concat(a)))).UID=h(),r.state={path:[],list:[]},r.changeLevel=y(function(){var e=Object(p.a)(l.a.mark((function e(t,n){var a,c,o,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.state,c=a.path,o=a.list,c.splice(t,1/0,n),e.next=4,r.getNextLevel();case 4:null!=(i=e.sent)?o.splice(++t,1/0,i):o.length=++t,r.setState({list:o});case 7:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()),r}return Object(q.a)(t,e),Object(F.a)(t,[{key:"reset",value:function(){var e=this.state,t=e.path,r=e.list;this.setState({path:[t[0]],list:[r[0]]})}},{key:"componentDidMount",value:function(){this.changeLevel(-1,"")}},{key:"render",value:function(){var e=this,t=this.UID,r=this.state.list,n=this.props.required;return o.a.createElement(o.a.Fragment,null,r.map((function(r,a){var c=r.label,i=r.list,s="input-".concat(t,"-").concat(a),u="list-".concat(t,"-").concat(a);return o.a.createElement("span",{key:s,className:"form-inline d-inline-flex"},o.a.createElement("input",{type:"text",className:"form-control",id:s,list:u,onChange:function(t){var r=t.target.value;return(r=r.trim())&&e.changeLevel(a,r)},required:!a&&n}),o.a.createElement("datalist",{id:u},i.map((function(e){return o.a.createElement("option",{value:e,key:e})}))),o.a.createElement("label",{htmlFor:s,className:"pl-2 pr-2"},c))})))}},{key:"path",get:function(){return this.state.path.filter(Boolean).slice(0,-1).join("/")}},{key:"name",get:function(){return this.state.path.slice(-1)[0]}},{key:"pathName",get:function(){return this.state.path.filter(Boolean).join("/")}}]),t}(o.a.Component),K=r(65),z=r.n(K);function G(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var W=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?G(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):G(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},k(),{},w()).token,$=new z.a({auth:W});function Q(){return X.apply(this,arguments)}function X(){return(X=Object(p.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$.users.getAuthenticated();case 2:return e.abrupt("return",e.sent.data);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Z(e){return ee.apply(this,arguments)}function ee(){return(ee=Object(p.a)(l.a.mark((function e(t){var r,n,a,c,o,i=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=i.length>1&&void 0!==i[1]?i[1]:"",n=t.split("/"),a=Object(f.a)(n,2),c=a[0],o=a[1],e.next=4,$.repos.getContents({owner:c,repo:o,path:r});case 4:return e.abrupt("return",e.sent.data);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function te(e,t,r,n){return re.apply(this,arguments)}function re(){return(re=Object(p.a)(l.a.mark((function e(t,r,n,a){var c,o,i,s,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.split("/"),o=Object(f.a)(c,2),i=o[0],s=o[1],e.prev=1,e.next=4,Z(t,r);case 4:u=e.sent.sha,e.next=9;break;case 7:e.prev=7,e.t0=e.catch(1);case 9:return e.t1=$.repos,e.t2=i,e.t3=s,e.t4=r,e.t5=n,e.next=16,D(a);case 16:return e.t6=e.sent,e.t7=u,e.t8={owner:e.t2,repo:e.t3,path:e.t4,message:e.t5,content:e.t6,sha:e.t7},e.next=21,e.t1.createOrUpdateFile.call(e.t1,e.t8);case 21:return e.abrupt("return",e.sent.data);case 22:case"end":return e.stop()}}),e,null,[[1,7]])})))).apply(this,arguments)}var ne,ae=function(e){function t(e){var r;return Object(B.a)(this,t),(r=Object(I.a)(this,Object(T.a)(t).call(this,e))).filter=void 0,r.filter=e.filter instanceof Function?e.filter:Boolean,r.state.html_url="",r}return Object(q.a)(t,e),Object(F.a)(t,[{key:"reset",value:function(){Object(J.a)(Object(T.a)(t.prototype),"reset",this).call(this),this.setState({html_url:""})}},{key:"getNextLevel",value:function(){var e=Object(p.a)(l.a.mark((function e(){var t,r,n,a,c,o,i,s,u,p,f;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.name,r=this.pathName,n=this.props,a=n.repository,c=n.onLoad,e.prev=1,e.next=4,Z(a,r);case 4:if(!((o=e.sent)instanceof Array)){e.next=7;break}return e.abrupt("return",{label:"/",list:o.filter(this.filter).map((function(e){return e.name}))});case 7:if(i=o.type,s=o.content,u=o.html_url,"file"===i){e.next=10;break}return e.abrupt("return");case 10:this.setState({html_url:u}),c instanceof Function&&c(u,E("data:;base64,".concat(s))),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(1),p=e.t0.name,f=e.t0.status,"HttpError"===p&&404===f&&t.includes(".")&&c instanceof Function&&c("https://github.com/".concat(a,"/blob/master/").concat(r));case 19:case"end":return e.stop()}}),e,this,[[1,14]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.html_url;return o.a.createElement(o.a.Fragment,null,Object(J.a)(Object(T.a)(t.prototype),"render",this).call(this),e&&o.a.createElement("a",{className:"d-block pt-2",target:"_blank",href:e,rel:"noopener noreferrer"},o.a.createElement("code",null,e)))}}]),t}(Y),ce=r(35),oe={string:{title:"Inline text",icon:"grip-lines"},text:{title:"Rows text",icon:"align-left"},object:{title:"Key-value list",icon:"list-ul"},array:{title:"Ordered list",icon:"list-ol"}};function ie(e){var t=e.onSelect;return o.a.createElement("nav",null,Object.entries(oe).map((function(e){var r=Object(f.a)(e,2),n=r[0],a=r[1],c=a.title,i=a.icon;return o.a.createElement("button",{key:n,type:"button",className:"btn btn-sm btn-success m-1 fas fa-"+i,title:c,onClick:t.bind(null,n)})})))}function se(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function ue(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?se(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):se(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function le(e,t,r){var n=e[t];r.value=function(e,t){var r=t.target.value,a=this.state.children,c=(void 0===a?[]:a)[e];if(c){n.call(this,c,r);var o=this.props.onChange;o instanceof Function&&o({target:{value:this.state.value}})}}}var pe=(ne=function(e){function t(){var e,r;Object(B.a)(this,t);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(r=Object(I.a)(this,(e=Object(T.a)(t)).call.apply(e,[this].concat(a)))).state=ue({},t.metaOf(r.props.value)),r.addItem=function(e){var n={type:e,value:[]};switch(e){case"string":n=t.metaOf("");break;case"text":n=t.metaOf("\n");break;case"object":n=t.metaOf({});break;case"array":n=t.metaOf([])}r.setState(ue({},r.state,{children:(r.state.children||[]).concat(n)}))},r}return Object(q.a)(t,e),Object(F.a)(t,[{key:"setKey",value:function(e,t){var r=this.state,n=r.value,a=r.children,c=void 0===a?[]:a;e.key=t;var o=function(e){if(!c.find((function(t){return t.key===e})))return n[t]=n[e],delete n[e],{v:void 0}};for(var i in n){var s=o(i);if("object"===typeof s)return s.v}n[t]=e.value}},{key:"setValue",value:function(e,t){var r=this.state.value;t instanceof Array?t=Object(_.a)(t):"object"===typeof t&&(t=ue({},t)),e.value=t,null!=e.key?r[e.key+""]=t:r instanceof Array&&(e.key=r.push(t)-1)}},{key:"fieldOf",value:function(e,r,n){switch(r){case"string":return o.a.createElement("input",{type:"text",className:"form-control",defaultValue:n,placeholder:"Value",onBlur:this.setValue.bind(this,e)});case"text":return o.a.createElement("textarea",{className:"form-control",defaultValue:n,placeholder:"Value",onBlur:this.setValue.bind(this,e)});default:return o.a.createElement(t,{value:n,onChange:this.setValue.bind(this,e)})}}},{key:"wrapper",value:function(e){return"array"===this.state.type?o.a.createElement("ol",{className:"inline-form"},e):o.a.createElement("ul",{className:"inline-form"},e)}},{key:"render",value:function(){var e=this,t=this.state,r=t.type,n=t.children,a=void 0===n?[]:n;return this.wrapper(o.a.createElement(o.a.Fragment,null,o.a.createElement("li",{className:"form-group"},o.a.createElement(ie,{onSelect:this.addItem})),a.map((function(t,n){var a=t.type,c=t.key,i=t.value;return o.a.createElement("li",{className:"input-group input-group-sm",key:c},"object"===r&&o.a.createElement("input",{type:"text",className:"form-control",defaultValue:c,required:!0,placeholder:"Key",onBlur:e.setKey.bind(e,n)}),e.fieldOf(n,a,i))}))))}}],[{key:"metaOf",value:function(e){var t=this;return e instanceof Array?{type:"array",value:e,children:Array.from(e,(function(e,r){return ue({},t.metaOf(e),{key:r})}))}:e instanceof Object?{type:"object",value:e,children:Object.entries(e).map((function(e){var r=Object(f.a)(e,2),n=r[0],a=r[1];return ue({},t.metaOf(a),{key:n})}))}:{type:/[\r\n]/.test(e)?"text":"string",value:e}}}]),t}(o.a.Component),Object(ce.a)(ne.prototype,"setKey",[le],Object.getOwnPropertyDescriptor(ne.prototype,"setKey"),ne.prototype),Object(ce.a)(ne.prototype,"setValue",[le],Object.getOwnPropertyDescriptor(ne.prototype,"setValue"),ne.prototype),ne),fe=r(139),me=r(85),he=r.n(me),be=r(135),de=r(136);function ve(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var ye=/^(#|javascript:\s*void\(0\);?\s*)$/,Oe=function(e){function t(e){var r;return Object(B.a)(this,t),(r=Object(I.a)(this,Object(T.a)(t).call(this,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ve(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ve(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({headingStyle:"atx",hr:"---",bulletListMarker:"-",codeBlockStyle:"fenced",linkStyle:"referenced"},e)))).use(de.a).addRule("non_url",{filter:function(e){return["a","area"].includes(e.nodeName.toLowerCase())&&ye.test(e.getAttribute("href")||"")},replacement:function(e,t){return e.trim()||(t instanceof HTMLElement?t.title.trim():"")}}).addRule("asset_code",{filter:["style","script"],replacement:function(){return""}}),r}return Object(q.a)(t,e),t}(be.a),ge=r(137),je=r.n(ge),we=function(e){function t(e){var r;for(var n in Object(B.a)(this,t),(r=Object(I.a)(this,Object(T.a)(t).call(this,e))).convertor=void 0,r.contentEditable=Object(c.createRef)(),r.state={count:0},r.countText=y((function(){var e=0;r.root&&(e=(r.root.textContent||"").trim().length),r.setState({count:e})})),r.handleOuterData=function(){var e=Object(p.a)(l.a.mark((function e(t){var n,a,c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.dataTransfer||t.clipboardData,(a=n.items)[0]){e.next=3;break}return e.abrupt("return");case 3:return t.preventDefault(),(c=Array.from(a)).find((function(e){var t=e.type;return/xml|html/.test(t)}))&&(c=c.filter((function(e){return"text/plain"!==e.type}))),e.next=8,Promise.all(c.map((function(e){if("string"===e.kind)return new Promise((function(t){return e.getAsString((function(e){return t(he()(e))}))}));var t=e.getAsFile();if(t){var r=URL.createObjectURL(t);switch(e.type.split("/")[0]){case"image":return"<img src=".concat(r,">");case"audio":return"<audio src=".concat(r,"></audio>");case"video":return"<video src=".concat(r,"></video>")}}return""})));case 8:o=e.sent,j.apply(void 0,Object(_.a)((i=o.filter(Boolean).join("\n"),O.innerHTML=i,Array.from(O.content.childNodes).map((function(e){return e.remove(),e}))))),r.manualChange();case 11:case"end":return e.stop()}var i}),e)})));return function(t){return e.apply(this,arguments)}}(),r.convertor=new Oe,e.rules)r.convertor.addRule(n,e.rules[n]);return r}return Object(q.a)(t,e),Object(F.a)(t,[{key:"root",get:function(){return this.contentEditable.current}}]),Object(F.a)(t,[{key:"componentDidMount",value:function(){fe.a(this.root)}},{key:"manualChange",value:function(){this.countText(),this.root&&this.root.dispatchEvent(new CustomEvent("input",{bubbles:!0,detail:this.root.textContent}))}},{key:"render",value:function(){return o.a.createElement("div",{contentEditable:!0,ref:this.contentEditable,className:R()("form-control","markdown-body",je.a.editor),"data-count":this.state.count,onInput:this.countText,onPaste:this.handleOuterData,onDrop:this.handleOuterData})}},{key:"raw",set:function(e){this.root&&(this.root.innerHTML=he()(e),this.manualChange())},get:function(){return this.root?this.convertor.turndown(this.root):""}}]),t}(o.a.Component),ke=r(53),xe=r.n(ke);function Ee(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Se(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ee(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ee(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Ne,Pe,De,Ce=window.location.href.split("?")[0],Ae={MarkDown:["md","markdown"],JSON:["json"],YAML:["yml","yaml"]},Le=/^---[\r\n]([\s\S]*?)[\r\n]---/,Re=function(e){function t(){var e,r;Object(B.a)(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(r=Object(I.a)(this,(e=Object(T.a)(t)).call.apply(e,[this].concat(a)))).Selector=Object(c.createRef)(),r.Core=Object(c.createRef)(),r.URL="",r.state={meta:null,copied:!1},r.setContent=function(){var e=Object(p.a)(l.a.mark((function e(t,n){var a,c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.URL=t,a=t.split(".").slice(-1)[0],n instanceof Blob){e.next=7;break}if(!Ae.MarkDown.includes(a)){e.next=6;break}return e.next=6,r.setPostMeta();case 6:return e.abrupt("return");case 7:return e.next=9,P(n,"Text");case 9:if(c=e.sent,!Ae.JSON.includes(a)){e.next=12;break}return e.abrupt("return",r.setState({meta:JSON.parse(c)}));case 12:if(!Ae.YAML.includes(a)){e.next=14;break}return e.abrupt("return",r.setState({meta:xe.a.parse(c)}));case 14:if(o=Le.exec(c)){e.next=20;break}return e.next=18,r.setPostMeta();case 18:e.next=23;break;case 20:c=c.slice(o[0].length),o[1]=o[1].trim(),o[1]&&r.setPostMeta(o[1]);case 23:r.core&&(r.core.raw=c);case 24:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),r.reset=function(){r.setState({meta:null}),r.selector&&r.selector.reset(),r.core&&(r.core.raw="")},r.onPathClear=function(e){e.target.value.trim()||(r.setState({meta:null}),r.core&&(r.core.raw=""))},r.fixURL=y((function(){var e=r.props.repository;if(r.core&&r.core.root){var t=!0,n=!1,a=void 0;try{for(var c,o=r.core.root.querySelectorAll("[href], [src]")[Symbol.iterator]();!(t=(c=o.next()).done);t=!0){var i=c.value,s=i.href||i.src;s.startsWith(Ce)&&(s=s.slice(Ce.length)),s=new URL(s,r.URL||window.location.href)+"","src"in i?i.src=s.replace(e+"/blob/",e+"/raw/"):i.href=s}}catch(u){n=!0,a=u}finally{try{t||null==o.return||o.return()}finally{if(n)throw a}}}})),r.submit=function(){var e=Object(p.a)(l.a.mark((function e(t){var n,a,c,o,i,s,u,p,f,m,b,d,v,y,O,g;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),n=r.props.repository,a=Object(V.a)(r),c=a.selector.pathName,o=a.core,i=t.target.elements.message,o&&o.root){e.next=4;break}return e.abrupt("return");case 4:s=[].filter.call(o.root.querySelectorAll("img[src], audio[src], video[src]"),(function(e){var t=e.src;return"blob:"===new URL(t).protocol})),u=!0,p=!1,f=void 0,e.prev=8,m=s[Symbol.iterator]();case 10:if(u=(b=m.next()).done){e.next=24;break}return d=b.value,e.next=14,S(d.src);case 14:return v=e.sent,y=c.replace(/\.\w+$/,"/".concat(h(),".").concat(v.type.split("/")[1])),e.next=18,te(n,y,"[Upload] from Git-Pager",v);case 18:O=e.sent,g=O.content.download_url,d.src=g;case 21:u=!0,e.next=10;break;case 24:e.next=30;break;case 26:e.prev=26,e.t0=e.catch(8),p=!0,f=e.t0;case 30:e.prev=30,e.prev=31,u||null==m.return||m.return();case 33:if(e.prev=33,!p){e.next=36;break}throw f;case 36:return e.finish(33);case 37:return e.finish(30);case 38:return e.next=40,te(n,c,i.value.trim(),r.getContent());case 40:window.alert("Submitted");case 41:case"end":return e.stop()}}),e,null,[[8,26,30,38],[31,,33,37]])})));return function(t){return e.apply(this,arguments)}}(),r.copyMarkdown=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!r.core){e.next=5;break}return e.next=4,H.a(r.core.raw);case 4:r.setState({copied:!0});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r}return Object(q.a)(t,e),Object(F.a)(t,[{key:"setPostMeta",value:function(){var e=Object(p.a)(l.a.mark((function e(t){var r,n,a,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Se({authors:[]},t?xe.a.parse(t):null),e.next=3,Q();case 3:n=e.sent,a=n.login,r.authors.includes(a)||r.authors.push(a),c=this.URL.split("/").slice(7,-1).filter((function(e){return!e.startsWith("_")})),r.categories=Object(_.a)(new Set([].concat(Object(_.a)(c),Object(_.a)(r.categories||[])))),r.tags=r.tags||[],this.setState({meta:Se({title:"",date:v()},r)});case 10:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getContent",value:function(){var e=this.URL.split(".").slice(-1)[0],t=this.state.meta,r=this.core;return Ae.JSON.includes(e)?JSON.stringify(t):Ae.YAML.includes(e)?xe.a.stringify(t):Ae.MarkDown.includes(e)&&r?t?(t.updated=v(),"---\n".concat(xe.a.stringify(t),"\n---\n\n").concat(r.raw)):r.raw:void 0}},{key:"render",value:function(){var e=this,r=this.props.repository,n=this.state,a=n.meta,c=n.copied;return o.a.createElement("main",{className:"card m-3"},o.a.createElement("form",{className:"card-body",onReset:this.reset,onSubmit:this.submit},o.a.createElement("h1",{className:"card-title"},r),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-2 col-form-label"},"File path"),o.a.createElement("div",{className:"col-sm-10",onChange:this.onPathClear},o.a.createElement(ae,{ref:this.Selector,repository:r,filter:t.contentFilter,onLoad:this.setContent,required:!0}))),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-2 col-form-label"},"Commit message"),o.a.createElement("span",{className:"col-sm-7"},o.a.createElement("textarea",{className:"form-control",name:"message",required:!0})),o.a.createElement("span",{className:"col-sm-3 d-flex justify-content-between align-items-center"},o.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Commit"),o.a.createElement("button",{type:"reset",className:"btn btn-danger"},"Clear"))),a&&o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Meta"),o.a.createElement(pe,{value:a,onChange:function(t){var r=t.target.value;return e.setState({meta:r})}})),o.a.createElement("div",{className:"form-group",onInput:this.fixURL},o.a.createElement("label",null,"Content"),o.a.createElement("button",{type:"button",className:"btn btn-secondary btn-sm float-right",onClick:this.copyMarkdown,onBlur:function(){return e.setState({copied:!1})}},c?"\u221a":""," Copy MarkDown"),o.a.createElement(we,{ref:this.Core}))))}},{key:"selector",get:function(){return this.Selector.current}},{key:"core",get:function(){return this.Core.current}}],[{key:"contentFilter",value:function(e){var t=e.type,r=e.name;return"dir"===t||"file"===t&&Object.values(Ae).flat().includes(r.split(".").slice(-1)[0])}}]),t}(o.a.Component),Me=Object(A.a)((function(e){var t=e.navData,r=e.repository,n=e.store;return o.a.createElement(o.a.Fragment,null,o.a.createElement(M,Object.assign({},t,{expand:"sm",theme:"dark",background:"dark",rightSlot:o.a.createElement(U,n.user)})),o.a.createElement("main",{className:"container",style:{cursor:n.loadingCount?"wait":"auto"}},o.a.createElement(Re,{repository:r})))})),Ue=r(138),_e=r(86),Be=(r(264),r(4)),Fe=(Ne=function(){function e(t){var r=this;Object(B.a)(this,e),this.client=void 0,Object(_e.a)(this,"loadingCount",Pe,this),Object(_e.a)(this,"user",De,this),this.client=new z.a({auth:t}),this.client.hook.before("request",(function(){return r.loadingCount++})),this.client.hook.after("request",(function(){return r.loadingCount--}))}return Object(F.a)(e,[{key:"signIn",value:function(){var e=Object(p.a)(l.a.mark((function e(){var t,r,n,a,c,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.client.users.getAuthenticated();case 2:t=e.sent,r=t.data,n=r.name,a=r.avatar_url,c=r.html_url,o=r.blog,Object.assign(this.user,{name:n,avatar_url:a,html_url:c,blog:o});case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),Pe=Object(ce.a)(Ne.prototype,"loadingCount",[Be.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 0}}),De=Object(ce.a)(Ne.prototype,"user",[Be.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{name:"GitHub",avatar_url:"https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png",html_url:"https://github.com/",blog:""}}}),Object(ce.a)(Ne.prototype,"signIn",[Be.d],Object.getOwnPropertyDescriptor(Ne.prototype,"signIn"),Ne.prototype),Ne);function Ie(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}Object(a.a)();var Te=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ie(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ie(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},k(),{},w()),Ve=Te.token,qe=Te.repository,He=new Fe(Ve);s.a.render(o.a.createElement(Me,{navData:Ue,repository:qe,store:He}),document.getElementById("root")),He.signIn(),window.addEventListener("unhandledrejection",(function(e){var t=e.reason;e.preventDefault(),window.alert(t.message||t)})),!1===["localhost","127.0.0.1"].includes(window.location.hostname)&&window.addEventListener("beforeunload",(function(e){return e.returnValue="Exit ?"}))}},[[140,1,2]]]);
//# sourceMappingURL=main.bcddfa2e.chunk.js.map