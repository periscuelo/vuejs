(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-083a9a81"],{5628:function(s,t,a){"use strict";a.r(t);var i=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"template-container"},[a("vs-row",[a("vs-col",{attrs:{"vs-w":"2"}},[a("div",{staticClass:"parentx-static"},[a("vs-sidebar",{staticClass:"sidebarx",attrs:{"default-index":s.sideBarIndex,"static-position":"",spacer:"",color:"primary"},model:{value:s.active,callback:function(t){s.active=t},expression:"active"}},[a("div",{staticClass:"header-sidebar",attrs:{slot:"header"},slot:"header"},[a("vs-avatar",{attrs:{size:"70px",src:"https://randomuser.me/api/portraits/men/85.jpg"}}),a("h4",[s._v("My Name")])],1),a("vs-sidebar-item",{attrs:{to:"/favoritos/"+s.rArtists,index:"1",icon:"grade"}},[s._v("\n            Artistas\n          ")]),a("vs-sidebar-item",{attrs:{to:"/favoritos/"+s.rAlbums,index:"2",icon:"album"}},[s._v("\n            Albums\n          ")]),a("vs-sidebar-item",{attrs:{to:"/favoritos/"+s.rTracks,index:"3",icon:"music_note"}},[s._v("\n            Musicas\n          ")])],1)],1)]),a("vs-col",{attrs:{"vs-w":"10"}},[a("router-view")],1)],1)],1)},e=[],r=a("be94"),c=(a("28a5"),a("2f62")),o={data:function(){return{active:!1,artistsFav:[],albumsFav:[],musicFavs:[],rArtists:"vazio",rAlbums:"vazio",rTracks:"vazio"}},computed:{sideBarIndex:function(){var s=this.$route.path,t=s.split("/"),a=3===t.length?2:4,i=0;switch(t[a]){case"albums":i=2;break;case"musicas":i=3;break;default:i=1}return i}},created:function(){this.getMyFavs(),this.getArtistas(this.artistsFav),this.getAlbums(this.albumsFav),this.getMusicas(this.musicFavs),this.setMyRoutes()},methods:Object(r["a"])({},Object(c["b"])({getArtistas:"Artistas/getList",getAlbums:"Albums/getList",getMusicas:"Musicas/getList"}),{getMyFavs:function(){var s=localStorage.getItem("vueSpotifyFavorites"),t=JSON.parse(s);this.artistsFav=t.artists,this.albumsFav=t.albums,this.musicFavs=t.tracks},setMyRoutes:function(){var s=this.$route.path,t=s.split("/"),a=3===t.length?2:4;this.artistsFav.length>0&&(this.rArtists="artistas","vazio"===t[a]&&this.$router.push({path:"/favoritos/".concat(this.rArtists)})),this.albumsFav.length>0&&(this.rAlbums="albums"),this.musicFavs.length>0&&(this.rTracks="musicas");var i=!1;switch(t[a]){case"albums":this.albumsFav.length<1&&(i=!0);break;case"musicas":this.musicFavs.length<1&&(i=!0);break;case"vazio":i=!1;break;default:this.artistsFav.length<1&&(i=!0)}i&&this.$router.push({path:"/favoritos/vazio"})}})},u=o,n=(a("7b2d"),a("2877")),v=Object(n["a"])(u,i,e,!1,null,"7b7d544c",null);v.options.__file="Favoritos.vue";t["default"]=v.exports},"7b2d":function(s,t,a){"use strict";var i=a("8158"),e=a.n(i);e.a},8158:function(s,t,a){}}]);
//# sourceMappingURL=chunk-083a9a81.402ad18e.js.map