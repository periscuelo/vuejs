(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71555cd8"],{"33c4":function(s,t,a){"use strict";a.r(t);var e=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"template-container"},[s.msg?a("vs-row",[a("vs-col",{attrs:{"vs-type":"flex","vs-justify":"center","vs-align":"center","vs-w":"12"}},[a("vs-alert",{attrs:{active:"true",color:"#842993"}},[s._v("\n        "+s._s(s.msg)+"\n      ")])],1)],1):a("vs-row",{attrs:{"vs-justify":"center"}},[a("vs-col",{attrs:{"vs-type":"flex","vs-justify":"center","vs-align":"center"}},[a("vs-card",[a("div",{attrs:{slot:"media"},slot:"media"},[a("vs-row",{attrs:{"vs-justify":"center"}},[a("vs-col",{attrs:{"vs-type":"flex","vs-justify":"center","vs-align":"center","vs-w":"12"}},[s.dados.images?a("vs-avatar",{attrs:{src:s.dados.images[1].url,size:"90px"}}):s._e(),a("h3",[s._v("\n                "+s._s(s.dados.name)+"\n                "),a("br"),s.dados.artists?a("span",[s._v("\n                  "+s._s(s.dados.artists[0].name)+"\n                ")]):s._e()]),a("vs-checkbox",{attrs:{"vs-value":s.dados.id,icon:"favorite",color:"danger"},model:{value:s.albumsFav,callback:function(t){s.albumsFav=t},expression:"albumsFav"}},[s._v("\n                Favoritar\n              ")]),a("vs-button",{attrs:{radius:"",color:"success",type:"filled",icon:"replay",title:"Voltar"},on:{click:function(t){return s.$router.go(-1)}}})],1)],1),a("img",{attrs:{src:"https://picsum.photos/1000/180?random"}})],1)])],1)],1),s.dados.tracks?a("vs-list",s._l(s.dados.tracks.items,function(t,e){return a("vs-list-item",{key:e,attrs:{title:t.name,subtitle:s._f("showArtistC")(t.artists)}},[a("template",{slot:"avatar"},[a("vs-avatar",{attrs:{color:"dark",icon:"music_video"},on:{click:s.test}})],1),a("vs-chip",{attrs:{color:"success"}},[s._v("\n        "+s._s(s.msToMnSec(t.duration_ms))+"\n      ")]),a("vs-checkbox",{attrs:{"vs-value":t.id,icon:"favorite",color:"danger"},model:{value:s.musicFavs,callback:function(t){s.musicFavs=t},expression:"musicFavs"}},[s._v("\n        Favoritar\n      ")])],2)}),1):s._e()],1)},r=[],c=a("cebc"),i=a("2f62"),o={name:"MusicaListagem",data:function(){return{albumsFav:[],musicFavs:[]}},computed:Object(c["a"])({},Object(i["d"])("Albums",{dados:"album"}),Object(i["d"])(["msg"])),watch:{albumsFav:function(s){this.setMyFavs("albums",s)},musicFavs:function(s){this.setMyFavs("tracks",s)}},created:function(){this.getAlbum(this.$route.params.id2),this.getMyFavs()},methods:Object(c["a"])({},Object(i["b"])("Albums",["getAlbum"]),{getMyFavs:function(){var s=localStorage.getItem("vueSpotifyFavorites"),t=JSON.parse(s);this.albumsFav=t.albums,this.musicFavs=t.tracks},setMyFavs:function(s,t){var a=localStorage.getItem("vueSpotifyFavorites"),e=JSON.parse(a);e[s]=t;var r=JSON.stringify(e);localStorage.setItem("vueSpotifyFavorites",r)}})},n=o,v=(a("e8b7"),a("2877")),l=Object(v["a"])(n,e,r,!1,null,"8b83bd70",null);t["default"]=l.exports},5834:function(s,t,a){},e8b7:function(s,t,a){"use strict";var e=a("5834"),r=a.n(e);r.a}}]);
//# sourceMappingURL=chunk-71555cd8.bd8d4bf2.js.map