<template>
  <div class="template-container">
    <vs-row v-if="msg">
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="12">
        <vs-alert
          active="true"
          color="#842993">
          {{ msg }}
        </vs-alert>
      </vs-col>
    </vs-row>
    <vs-row
      v-else
      vs-justify="center">
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center">
        <vs-card>
          <div slot="media">
            <vs-row vs-justify="center">
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="12">
                <vs-avatar
                  v-if="dados.images"
                  :src="dados.images[1].url"
                  size="90px"/>
                <h3>
                  {{ dados.name }}
                  <br>
                  <span v-if="dados.artists">
                    {{ dados.artists[0].name }}
                  </span>
                </h3>
                <vs-checkbox
                  v-model="albumsFav"
                  :vs-value="dados.id"
                  icon="favorite"
                  color="danger">
                  Favoritar
                </vs-checkbox>
                <vs-button
                  radius
                  color="success"
                  type="filled"
                  icon="replay"
                  title="Voltar"
                  @click="$router.go(-1)"/>
              </vs-col>
            </vs-row>
            <img src="https://picsum.photos/1000/180?random">
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
    <vs-list v-if="dados.tracks">
      <vs-list-item
        v-for="(dado, index) in dados.tracks.items"
        :key="index"
        :title="dado.name"
        :subtitle="dado.artists | showArtistC">
        <template slot="avatar">
          <vs-avatar
            color="dark"
            icon="music_video"
            @click="test"/>
        </template>
        <vs-chip color="success">
          {{ msToMnSec(dado.duration_ms) }}
        </vs-chip>
        <vs-checkbox
          v-model="musicFavs"
          :vs-value="dado.id"
          icon="favorite"
          color="danger">
          Favoritar
        </vs-checkbox>
      </vs-list-item>
    </vs-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MusicaListagem',
  data: () => ({
    albumsFav: [],
    musicFavs: [],
  }),
  computed: {
    ...mapGetters('Albums', {
      dados: 'album',
    }),
    ...mapGetters(['msg']),
  },
  watch: {
    albumsFav(newValues) {
      this.setMyFavs('albums', newValues);
    },
    musicFavs(newValues) {
      this.setMyFavs('tracks', newValues);
    },
  },
  created() {
    this.getAlbum(this.$route.params.id2);
    this.getMyFavs();
  },
  methods: {
    ...mapActions('Albums', ['getAlbum']),
    getMyFavs() {
      const mf = localStorage.getItem('vueSpotifyFavorites');
      const obj = JSON.parse(mf);
      this.albumsFav = obj.albums;
      this.musicFavs = obj.tracks;
    },
    setMyFavs(id, values) {
      const mf = localStorage.getItem('vueSpotifyFavorites');
      const obj = JSON.parse(mf);
      obj[id] = values;
      const newVal = JSON.stringify(obj);
      localStorage.setItem('vueSpotifyFavorites', newVal);
    },
  },
};
</script>

<style scoped lang="scss">
.template-container /deep/ .con-vs-card {
  .con-vs-avatar {
    cursor: default;
  }
  h3 {
    span {
      font-size: .9rem;
      font-weight: normal;
    }
  }
}
</style>
