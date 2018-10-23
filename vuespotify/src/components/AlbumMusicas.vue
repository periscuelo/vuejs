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
    <vs-row vs-justify="center">
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
                  vs-icon="favorite"
                  color="danger">
                  Favoritar
                </vs-checkbox>
                <vs-button
                  color="success"
                  vs-type="filled"
                  vs-icon="replay"
                  title="Voltar"
                  class="radius"
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
        :subtitle="dado.artists | showArtist">
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
          vs-icon="favorite"
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
  filters: {
    showArtist: artists => {
      const artNames = [];
      artists.map(obj => {
        artNames.push(obj.name);
        return true;
      });
      return artNames.join(', ');
    },
  },
  data: () => ({
    albumsFav: [],
    musicFavs: [],
  }),
  computed: {
    ...mapGetters({
      dados: 'Albums/album',
      msg: 'Albums/msg',
    }),
  },
  watch: {
    albumsFav(newValues) {
      this.setMyFavs('albums', newValues);
    },
    musicFavs(newValues) {
      this.setMyFavs('tracks', newValues);
    },
  },
  mounted() {
    this.getAlbum(this.$route.params.id2);
    this.getMyFavs();
  },
  methods: {
    ...mapActions({
      getAlbum: 'Albums/getAlbum',
    }),
    getMyFavs() {
      const mf = localStorage.getItem('vueSpotifyFavorites');
      const obj = JSON.parse(mf);
      this.albumsFav = obj.albums;
      this.musicFavs = obj.tracks;
    },
    msToMnSec(ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return `${minutes} : ${(seconds < 10 ? '0' : '')} ${seconds}`;
    },
    setMyFavs(id, values) {
      const mf = localStorage.getItem('vueSpotifyFavorites');
      const obj = JSON.parse(mf);
      obj[id] = values;
      const newVal = JSON.stringify(obj);
      localStorage.setItem('vueSpotifyFavorites', newVal);
    },
    test() {
      // eslint-disable-next-line
      alert('Ops! Este é apenas um teste, não vai rolar ouvir musica por aqui! Desculpe :(');
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
