(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c22ce246"],{"33c4":function(s,t,a){"use strict";a.r(t);var e=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"template-container"},[s.msg?a("vs-row",[a("vs-col",{attrs:{"vs-type":"flex","vs-justify":"center","vs-align":"center","vs-w":"12"}},[a("vs-alert",{attrs:{active:"true",color:"#842993"}},[s._v("\n        "+s._s(s.msg)+"\n      ")])],1)],1):s._e(),a("vs-row",{attrs:{"vs-justify":"center"}},[a("vs-col",{attrs:{"vs-type":"flex","vs-justify":"center","vs-align":"center"}},[a("vs-card",[a("div",{attrs:{slot:"media"},slot:"media"},[a("vs-row",{attrs:{"vs-justify":"center"}},[a("vs-col",{attrs:{"vs-type":"flex","vs-justify":"center","vs-align":"center","vs-w":"12"}},[s.dados.images?a("vs-avatar",{attrs:{src:s.dados.images[1].url,size:"90px"}}):s._e(),a("h3",[s._v("\n                "+s._s(s.dados.name)+"\n                "),a("br"),s.dados.artists?a("span",[s._v("\n                  "+s._s(s.dados.artists[0].name)+"\n                ")]):s._e()]),a("vs-checkbox",{attrs:{"vs-value":s.dados.id,"vs-icon":"favorite",color:"danger"}},[s._v("\n                Favoritar\n              ")]),a("vs-button",{staticClass:"radius",attrs:{color:"success","vs-type":"filled","vs-icon":"replay",title:"Voltar"},on:{click:function(t){s.$router.go(-1)}}})],1)],1),a("img",{attrs:{src:"https://picsum.photos/1000/180?random"}})],1)])],1)],1),s.dados.tracks?a("vs-list",s._l(s.dados.tracks.items,function(t,e){return a("vs-list-item",{key:e,attrs:{title:t.name,subtitle:s._f("showArtist")(t.artists)}},[a("template",{slot:"avatar"},[a("vs-avatar",{attrs:{color:"dark",icon:"music_video"}})],1),a("vs-chip",{attrs:{color:"success"}},[s._v("\n        "+s._s(s.msToMnSec(t.duration_ms))+"\n      ")]),a("vs-checkbox",{attrs:{"vs-value":t.id,"vs-icon":"favorite",color:"danger"},model:{value:s.musicFavs,callback:function(t){s.musicFavs=t},expression:"musicFavs"}},[s._v("\n        Favoritar\n      ")])],2)})):s._e()],1)},r=[],c=a("c93e"),n=(a("7f7f"),a("2f62")),o={name:"MusicaListagem",filters:{showArtist:function(s){var t=[];return s.map(function(s){return t.push(s.name),!0}),t.join(", ")}},data:function(){return{musicFavs:[]}},computed:Object(c["a"])({},Object(n["c"])({dados:"Albums/album",msg:"Albums/msg"})),mounted:function(){this.getAlbum(this.$route.params.id2)},methods:Object(c["a"])({},Object(n["b"])({getAlbum:"Albums/getAlbum"}),{msToMnSec:function(s){var t=Math.floor(s/6e4),a=(s%6e4/1e3).toFixed(0);return"".concat(t," : ").concat(a<10?"0":""," ").concat(a)}})},i=o,v=(a("b05b"),a("2877")),u=Object(v["a"])(i,e,r,!1,null,"72abae5e",null);u.options.__file="AlbumMusicas.vue";t["default"]=u.exports},"9a1a":function(s,t,a){},b05b:function(s,t,a){"use strict";var e=a("9a1a"),r=a.n(e);r.a}}]);
//# sourceMappingURL=chunk-c22ce246.700521cd.js.map