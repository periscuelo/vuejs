(function(t){function e(e){for(var n,s,i=e[0],c=e[1],u=e[2],l=0,d=[];l<i.length;l++)s=i[l],r[s]&&d.push(r[s][0]),r[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);f&&f(e);while(d.length)d.shift()();return o.push.apply(o,u||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],n=!0,s=1;s<a.length;s++){var i=a[s];0!==r[i]&&(n=!1)}n&&(o.splice(e--,1),t=c(c.s=a[0]))}return t}var n={},s={app:0},r={app:0},o=[];function i(t){return c.p+"src/assets/js/"+({}[t]||t)+"."+{"chunk-00e5f3a9":"6e837259","chunk-083a9a81":"7a3d5fbc","chunk-2d0ccb5d":"9c80da21","chunk-71555cd8":"bd8d4bf2","chunk-79326fad":"a51e3d2b","chunk-82833b3c":"f13f4b24"}[t]+".js"}function c(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(t){var e=[],a={"chunk-00e5f3a9":1,"chunk-083a9a81":1,"chunk-71555cd8":1,"chunk-79326fad":1};s[t]?e.push(s[t]):0!==s[t]&&a[t]&&e.push(s[t]=new Promise(function(e,a){for(var n="src/assets/css/"+({}[t]||t)+"."+{"chunk-00e5f3a9":"e5f95f41","chunk-083a9a81":"cea4c7c8","chunk-2d0ccb5d":"31d6cfe0","chunk-71555cd8":"011a49dc","chunk-79326fad":"31c05e83","chunk-82833b3c":"31d6cfe0"}[t]+".css",r=c.p+n,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var u=o[i],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===n||l===r))return e()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){u=d[i],l=u.getAttribute("data-href");if(l===n||l===r)return e()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=e,f.onerror=function(e){var n=e&&e.target&&e.target.src||r,o=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=n,delete s[t],f.parentNode.removeChild(f),a(o)},f.href=r;var h=document.getElementsByTagName("head")[0];h.appendChild(f)}).then(function(){s[t]=0}));var n=r[t];if(0!==n)if(n)e.push(n[2]);else{var o=new Promise(function(e,a){n=r[t]=[e,a]});e.push(n[2]=o);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=i(t),u=function(e){l.onerror=l.onload=null,clearTimeout(d);var a=r[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),s=e&&e.target&&e.target.src,o=new Error("Loading chunk "+t+" failed.\n("+n+": "+s+")");o.type=n,o.request=s,a[1](o)}r[t]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=n,c.d=function(t,e,a){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)c.d(a,n,function(e){return t[e]}.bind(null,n));return a},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/vuejs/vuespotify/",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var d=0;d<u.length;d++)e(u[d]);var f=l;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},1129:function(t,e,a){"use strict";var n=a("fac0"),s=a.n(n);s.a},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("a026"),s=a("fb9a"),r=a.n(s),o=(a("04f2"),a("c789"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("vs-navbar",{staticClass:"myNavbar",attrs:{color:t.colorx,"text-color":"rgba(255,255,255,.6)","active-text-color":"rgba(255,255,255,1)"},model:{value:t.indexActive,callback:function(e){t.indexActive=e},expression:"indexActive"}},[a("vs-navbar-title",[t._v("\n      Vue Spotify\n    ")]),a("vs-navbar-item",{attrs:{index:0}},[a("router-link",{attrs:{to:"/"},nativeOn:{click:function(e){return t.debounce_check(e)}}},[t._v("\n        Artistas\n      ")])],1),a("vs-navbar-item",{attrs:{index:1}},[a("router-link",{attrs:{to:"/albums"},nativeOn:{click:function(e){return t.debounce_check(e)}}},[t._v("\n        Álbums\n      ")])],1),a("vs-navbar-item",{attrs:{index:2}},[a("router-link",{attrs:{to:"/musicas"},nativeOn:{click:function(e){return t.debounce_check(e)}}},[t._v("\n        Músicas\n      ")])],1),a("vs-navbar-item",{attrs:{index:3}},[a("router-link",{attrs:{to:"/favoritos/vazio"},nativeOn:{click:function(e){return t.debounce_check(e)}}},[t._v("\n        Favoritos\n      ")])],1),a("vs-spacer"),3!==t.indexActive?a("vs-input",{attrs:{value:t.search,color:t.colorx,icon:"search","label-placeholder":"Busca"},on:{input:t.debounce_search}}):t._e()],1),a("router-view")],1)}),i=[],c=(a("386d"),a("28a5"),a("cebc")),u=a("b047"),l=a.n(u),d=a("2f62"),f={data:function(){return{colorx:"#4fc08d",indexActive:0,search:"",sParams:{},myRoute:""}},computed:{myRoutes:function(){return this.$route.fullPath}},watch:{search:function(){this.checkUrl()},myRoutes:function(t){this.myRoute=t,this.checkUrl()}},methods:Object(c["a"])({},Object(d["c"])({changeData:"CHANGE_SEARCH"}),{checkUrl:function(){var t=this.myRoute.split("/"),e=t.length<=3?1:3;switch(t[e]){case"albums":this.indexActive=1,this.sParams.q=this.search,this.sParams.type="album";break;case"musicas":this.indexActive=2,this.sParams.q=this.search,this.sParams.type="track";break;case"favoritos":this.indexActive=3,this.sParams.q="",this.sParams.type="";break;default:this.indexActive=0,this.sParams.q=this.search,this.sParams.type="artist"}""!==this.sParams.q?this.$store.dispatch("search",this.sParams):this.changeData([])},debounce_search:l()(function(t){this.search=t},1e3),debounce_check:l()(function(){this.checkUrl()},1e3)})},h=f,p=(a("5c0b"),a("2877")),m=Object(p["a"])(h,o,i,!1,null,null,null),v=m.exports,b=(a("7f7f"),{filters:{implode:function(t){return t.join(", ")},popColor:function(t){var e;switch(!0){case t>79:e="success";break;case t>59&&t<80:e="primary";break;case t>29&&t<60:e="warning";break;default:e=""}return e},popIcon:function(t){var e;switch(!0){case t>79:e="grade";break;case t>59&&t<80:e="language";break;case t>29&&t<60:e="group_work";break;default:e=""}return e},popText:function(t){var e;switch(!0){case t>79:e="Top";break;case t>59&&t<80:e="Legal";break;case t>29&&t<60:e="Bom";break;default:e="Desconhecido"}return e},showAlbum:function(t){var e=t.data.album?"".concat(t.names," | Álbum ").concat(t.data.album.name):"";return e},showArtistC:function(t){var e=t.map(function(t){return t.name});return e.join(", ")},showArtistD:function(t){var e=[];return t.artists&&(e=t.artists.map(function(t){return t.name})),{data:t,names:e.join(", ")}},showArtistMA:function(t){var e;if(t.length<3){var a=t.map(function(t){return t.name});e=a.join(" e ")}else e="Vários Artistas";return e}},methods:{msToMnSec:function(t){var e=Math.floor(t/6e4),a=(t%6e4/1e3).toFixed(0);return"".concat(e,":").concat(a<10?"0":"").concat(a)},test:function(){alert("Ops! Este é apenas um teste, não vai rolar ouvir musica por aqui! Desculpe :(")}}}),g={utils:b},k=a("8c4f"),A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"template-container"},[t.msg?a("vs-row",[a("vs-col",{attrs:{"vs-type":"flex","vs-justify":"center","vs-align":"center","vs-w":"12"}},[a("vs-alert",{attrs:{active:"true",color:"#842993"}},[t._v("\n        "+t._s(t.msg)+"\n      ")])],1)],1):t._l(t.myData,function(e,n){return a("vs-row",{key:n},t._l(e,function(e,n){return a("vs-col",{key:n,attrs:{"vs-type":"flex","vs-justify":"center","vs-align":"center","vs-xs":"6","vs-sm":"4","vs-lg":"2"}},[e?a("div",{staticClass:"avatar",on:{click:function(a){return t.enter(e.id)}}},[a("div",{staticClass:"middle"},[a("vs-button",{attrs:{radius:"",color:"dark",type:"filled",icon:"play_arrow"}})],1),e.images&&e.images[2]?a("vs-avatar",{attrs:{src:e.images[2].url,size:"120px"}}):a("vs-avatar",{attrs:{color:"success",icon:"music_video",size:"120px"}}),a("vs-row",[a("vs-col",{attrs:{"vs-type":"flex","vs-justify":"center","vs-align":"center"}},[a("h4",[t._v(t._s(e.name))])])],1),a("vs-row",[a("vs-col",{attrs:{"vs-type":"flex","vs-justify":"center","vs-align":"center"}},[e.genres&&e.genres[0]?a("vs-tooltip",{attrs:{text:t._f("implode")(e.genres),title:"Gêneros",position:"right"}},[t._v("\n                "+t._s(e.genres[0])+"\n              ")]):[t._v("\n                N/A\n              ")]],2)],1),a("vs-row",[a("vs-col",{attrs:{"vs-type":"flex","vs-justify":"center","vs-align":"center"}},[a("vs-chip",{attrs:{color:t._f("popColor")(e.popularity)}},[a("vs-avatar",{attrs:{icon:t._f("popIcon")(e.popularity)}}),t._v("\n                "+t._s(t._f("popText")(e.popularity))+"\n              ")],1)],1)],1)],1):t._e()])}),1)})],2)},y=[],x={name:"Artistas",props:{favoritos:{default:!1,type:Boolean}},computed:Object(c["a"])({},Object(d["d"])("Artistas",{dados:"artistas"}),Object(d["d"])(["msg","searched"]),{myData:function(){return 0===this.searched.length?this.dados:this.searched}}),created:function(){this.favoritos||this.getArtistas()},methods:Object(c["a"])({},Object(d["b"])("Artistas",{getArtistas:"getList"}),{enter:function(t){this.$router.push({path:"/artista/".concat(t)})}})},w=x,_=(a("1129"),Object(p["a"])(w,A,y,!1,null,"153da312",null)),j=_.exports;n["default"].use(k["a"]);var O=new k["a"]({mode:"hash",base:"/",routes:[{path:"/",name:"artistas",component:j},{path:"/artista/:id",name:"artista",component:function(){return a.e("chunk-79326fad").then(a.bind(null,"d38d"))}},{path:"/artista/:id/album/:id2",name:"album",component:function(){return a.e("chunk-71555cd8").then(a.bind(null,"33c4"))}},{path:"/albums",name:"albums",component:function(){return a.e("chunk-00e5f3a9").then(a.bind(null,"be55"))}},{path:"/musicas",name:"musicas",component:function(){return a.e("chunk-82833b3c").then(a.bind(null,"f4de5"))}},{path:"/favoritos/",name:"favoritos",component:function(){return a.e("chunk-083a9a81").then(a.bind(null,"5628"))},children:[{path:"artistas",component:j,props:{favoritos:!0}},{path:"albums",component:function(){return a.e("chunk-00e5f3a9").then(a.bind(null,"be55"))},props:{favoritos:!0}},{path:"musicas",component:function(){return a.e("chunk-82833b3c").then(a.bind(null,"f4de5"))},props:{favoritos:!0}},{path:"vazio",component:function(){return a.e("chunk-2d0ccb5d").then(a.bind(null,"4ea7"))}}]}]}),S=a("bd86"),C=a("6cd4"),E=a.n(C),N=a("bc3a"),P=a.n(N),T=function(){return P.a.create({baseURL:"https://www.eleganciachick.com.br",withCredentials:!0,headers:{Accept:"application/json, text/plain, */*","Content-Type":"text/html; charset=UTF-8"}})},M={getToken:function(){return T().get("/spot.php")}},I="",R=function(){if(sessionStorage.getItem("valid"))I=JSON.parse(sessionStorage.getItem("token"));else var t=window.open("https://accounts.spotify.com/authorize?client_id=da18b610d64c4573be48c92fe8ae8eee&response_type=token&redirect_uri=https:%2F%2Fwww.eleganciachick.com.br%2Fgtoken.php","gtoken"),e=function(){t.closed&&M.getToken().then(function(t){sessionStorage.setItem("token",t.request.response),sessionStorage.setItem("valid",!0),I=JSON.parse(t.request.response),clearInterval(a),window.location.reload()})},a=setInterval(e,1e3)},D=P.a.create({baseURL:"https://api.spotify.com/v1"});D.interceptors.request.use(function(t){return R(),t.headers.Authorization="".concat(I.token_type," ").concat(I.access_token),t});var U,q,B,G=function(){return D},H={getAlbums:function(t){return G().get("/albums",t)},getAlbum:function(t){return G().get("/albums/".concat(t))}},z="CHANGE_ALBUM",F="CHANGE_ALBUMS",L="CHANGE_ARTISTAS",J="CHANGE_ARTISTAS_ALBUM",V="CHANGE_MUSICAS",X="CHANGE_MSG",Q="CHANGE_SEARCH",Z={getList:function(t,e){var a=t.commit;a(X,"Carregando.... Aguarde!",{root:!0});var n=[],s=e||["5FwdSSQrDlVvGQ14hpPO9S","0tbu4twiafAbrakCB3mxz4","7z7bTIHtSNmuIX0yWTimZ7","5lPYUxk21ijQNVA0r1wPhk","1XdmakXviDcpmNrl5mNMrt","5oohuDD9sE7C1MxwA8uzHe","7vDirGAUVrYMQc7G3sDxfQ","2Wz4oDBOPs3hYkb3eUtsNd","7CB9ERpNXGxnCgRxQt94CH","5V6r9gmQXxfSQ4gzSxYEx6","6EtAuxIwZCEuUZEqn2DwII","1CqADkcK8HJY1ss4i3cJqU"],r={params:{ids:s.join(",")}};H.getAlbums(r).then(function(t){if(204===t.status)a(X,"Ainda não há albums para exibir!",{root:!0});else{var e=[];E()(t.data.albums,function(t,a){a>0&&a%6===0&&(n.push(e),e=[]),e.push(t)}),e.length>0&&n.push(e),a(F,n),a(X,"",{root:!0})}},function(t){401===t.response.status&&sessionStorage.setItem("valid",!1),console.log(t)})},getAlbum:function(t,e){var a=t.commit;a(X,"Carregando.... Aguarde!",{root:!0}),H.getAlbum(e).then(function(t){204===t.status?a(X,"Ainda não há albums deste artista para exibir!",{root:!0}):(a(z,t.data),a(X,"",{root:!0}))},function(t){401===t.response.status&&sessionStorage.setItem("valid",!1),console.log(t)})}},Y=(U={},Object(S["a"])(U,z,function(t,e){t.album=e}),Object(S["a"])(U,F,function(t,e){t.albums=e}),U),K={albums:[],album:{}},W={namespaced:!0,actions:Z,mutations:Y,state:K},$={getArtists:function(t){return G().get("/artists",t)},getArtist:function(t){return G().get("/artists/".concat(t))},getArtistAlbums:function(t,e){return G().get("/artists/".concat(t,"/albums"),e)}},tt={getList:function(t,e){var a=t.commit;a(X,"Carregando.... Aguarde!",{root:!0});var n=[],s=e||["4cn4gMq0KXORHeYA45PcBi","10naVTwNjE50daQVrN0bXh","7uPgOaM3jjmkwuua1RgZHg","7n1XMwvxPf10t4OX6h6Ufy","1zWJTFpRoMlT21OaXniRsb","7gRwkRxJz1ilKcYkeqhmEz","6O67GI6ayhWHyFmOOJRLEq","6ODCVWBfGNFUf1bpo0c2Ge","6wd8OZcCaRQNDIMz6SPNGN","4EUuQxMNowMUEs5gu4BzBX","5rTjH3aABAmPM5B6DZebZ7","6TYimByryGphZCtwYopH0y"],r={params:{ids:s.join(",")}};$.getArtists(r).then(function(t){var e=[];204===t.status?a(X,"Ainda não há artistas para exibir!",{root:!0}):(E()(t.data.artists,function(t,a){a>0&&a%6===0&&(n.push(e),e=[]),e.push(t)}),e.length>0&&n.push(e),a(L,n),a(X,"",{root:!0}))},function(t){401===t.response.status&&sessionStorage.setItem("valid",!1),console.log(t)})},getArtistAlbums:function(t,e){var a=t.commit;a(X,"Carregando.... Aguarde!",{root:!0});var n={};$.getArtist(e).then(function(t){204===t.status?a(X,"Ainda não há detalhes deste artista para exibir!",{root:!0}):(n.id=t.data.id,n.nome=t.data.name,n.imagem=t.data.images[0].url)});var s={limit:5};$.getArtistAlbums(e,s).then(function(t){204===t.status?a(X,"Ainda não há albums deste artista para exibir!",{root:!0}):(a(J,{artista:n,albums:t.data.items}),a(X,"",{root:!0}))},function(t){401===t.response.status&&sessionStorage.setItem("valid",!1),console.log(t)})}},et=(q={},Object(S["a"])(q,L,function(t,e){t.artistas=e}),Object(S["a"])(q,J,function(t,e){t.artista_albums=e}),q),at={artistas:[],artista_albums:{}},nt={namespaced:!0,actions:tt,mutations:et,state:at},st={getTracks:function(t){return G().get("/tracks",t)}},rt={getList:function(t,e){var a=t.commit;a(X,"Carregando.... Aguarde!",{root:!0});var n=e||["2AXmPzar7HNqI6ksI562UX","7KCOMlNvjtkaQVBWwq3rd8","548AxnT5rmzjT1AUpxgCoM","0CpIVOnfJTu99vr0uQARPD","3qK4cPOkKJ00tAWeFBFMXm","1VwyjcpwWGMMXDe1xGnRyx","0zBbyR1llVe56n9P28dv2m","0zRzJU415EsEQ3NOjZj6Lu","3VTaBE3DsiREAxFtp6hREj","4NV9CHd1KRZ7dCySTtATey","5MY8WIRTMZ5uHEKSFJ4ZRP","2hGsyzJD1GiYlOD4bEb7KD"],s={params:{ids:n.join(",")}};st.getTracks(s).then(function(t){204===t.status?a(X,"Ainda não há músicas para exibir!",{root:!0}):(a(V,t.data.tracks),a(X,"",{root:!0}))},function(t){401===t.response.status&&sessionStorage.setItem("valid",!1),console.log(t)})}},ot=Object(S["a"])({},V,function(t,e){t.musicas=e}),it={musicas:[]},ct={namespaced:!0,actions:rt,mutations:ot,state:it};if(!localStorage.getItem("vueSpotifyFavorites")){var ut={artists:[],albums:[],tracks:[]};localStorage.setItem("vueSpotifyFavorites",JSON.stringify(ut))}n["default"].use(d["a"]);var lt=new d["a"].Store({state:{msg:"",searched:[]},actions:{search:function(t,e){var a=t.commit;a(X,"Pesquisando.... Aguarde!");var n=[],s={params:{q:e.q,type:e.type}};G().get("/search",s).then(function(t){if(204===t.status)a(X,"Não há dados para exibir!");else{var s=[];E()(t.data["".concat(e.type,"s")].items,function(t,e){e>0&&e%6===0&&(n.push(s),s=[]),s.push(t)}),s.length>0&&n.push(s);var r="track"!==e.type?n:t.data["".concat(e.type,"s")].items;a(Q,r),a(X,"")}},function(t){401===t.response.status&&sessionStorage.setItem("valid",!1),console.log(t)})}},mutations:(B={},Object(S["a"])(B,X,function(t,e){t.msg=e}),Object(S["a"])(B,Q,function(t,e){t.searched=e}),B),modules:{Albums:W,Artistas:nt,Musicas:ct}});n["default"].use(r.a),n["default"].mixin(g.utils),n["default"].config.productionTip=!1,new n["default"]({router:O,store:lt,render:function(t){return t(v)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";var n=a("5e27"),s=a.n(n);s.a},"5e27":function(t,e,a){},fac0:function(t,e,a){}});
//# sourceMappingURL=app.96bcfbb2.js.map