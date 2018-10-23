<template lang="html">
  <div class="template-container">
    <vs-row>
      <vs-col vs-w="2">
        <div class="parentx-static">
          <vs-sidebar
            v-model="active"
            :default-index="sideBarIndex"
            static-position
            spacer
            color="primary"
            class="sidebarx">
            <div
              slot="header"
              class="header-sidebar">
              <vs-avatar
                size="70px"
                src="https://randomuser.me/api/portraits/men/85.jpg"/>
              <h4>My Name</h4>
            </div>

            <vs-sidebar-item
              :to="`/favoritos/${rArtists}`"
              index="1"
              icon="grade">
              Artistas
            </vs-sidebar-item>

            <vs-sidebar-item
              :to="`/favoritos/${rAlbums}`"
              index="2"
              icon="album">
              Albums
            </vs-sidebar-item>

            <vs-sidebar-item
              :to="`/favoritos/${rTracks}`"
              index="3"
              icon="music_note">
              Musicas
            </vs-sidebar-item>
          </vs-sidebar>
        </div>
      </vs-col>
      <vs-col vs-w="10">
        <router-view/>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    active: false,
    artistsFav: [],
    albumsFav: [],
    musicFavs: [],
    rArtists: 'vazio',
    rAlbums: 'vazio',
    rTracks: 'vazio',
  }),
  computed: {
    sideBarIndex() {
      const myRoute = this.$route.path;
      const splitted = myRoute.split('/');
      const splitIndex = (splitted.length === 3) ? 2 : 4;
      let ret = 0;
      switch (splitted[splitIndex]) {
        case 'albums':
          ret = 2;
          break;
        case 'musicas':
          ret = 3;
          break;
        default:
          ret = 1;
      }
      return ret;
    },
  },
  mounted() {
    this.getMyFavs();
    this.getArtistas(this.artistsFav);
    this.getAlbums(this.albumsFav);
    this.getMusicas(this.musicFavs);
    this.setMyRoutes();
  },
  methods: {
    ...mapActions({
      getArtistas: 'Artistas/getList',
      getAlbums: 'Albums/getList',
      getMusicas: 'Musicas/getList',
    }),
    getMyFavs() {
      const mf = localStorage.getItem('vueSpotifyFavorites');
      const obj = JSON.parse(mf);
      this.artistsFav = obj.artists;
      this.albumsFav = obj.albums;
      this.musicFavs = obj.tracks;
    },
    setMyRoutes() {
      const myRoute = this.$route.path;
      const splitted = myRoute.split('/');
      const splitIndex = (splitted.length === 3) ? 2 : 4;
      if (this.artistsFav.length > 0) {
        this.rArtists = 'artistas';
        this.$router.push({ path: `/favoritos/${this.rArtists}` });
      }
      if (this.albumsFav.length > 0) this.rAlbums = 'albums';
      if (this.musicFavs.length > 0) this.rTracks = 'musicas';

      let ret = false;
      switch (splitted[splitIndex]) {
        case 'albums':
          if (this.albumsFav.length < 1) ret = true;
          break;
        case 'musicas':
          if (this.musicFavs.length < 1) ret = true;
          break;
        case 'vazio':
          ret = false;
          break;
        default:
          if (this.artistsFav.length < 1) ret = true;
      }
      if (ret) this.$router.push({ path: '/favoritos/vazio' });
    },
  },
};
</script>

<style scoped lang="scss">
.parentx-static {
  overflow: hidden;
  height: 500px;
  position: relative;
}
.header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
}
</style>
