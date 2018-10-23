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
    <vs-list>
      <vs-list-item
        v-for="(dado, index) in myData"
        :key="index"
        :title="dado.name"
        :subtitle="dado | showArtist | showAlbum">
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
import isEqual from 'lodash/isEqual';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Musicas',
  filters: {
    showArtist: data => {
      const artNames = [];
      if (data.artists) {
        data.artists.map(obj => {
          artNames.push(obj.name);
          return true;
        });
      }
      return { data, names: artNames.join(', ') };
    },
    showAlbum: obj => {
      const ret = (obj.data.album) ? `${obj.names} | Álbum ${obj.data.album.name}` : '';
      return ret;
    },
  },
  props: {
    favoritos: {
      default: false,
      type: Boolean,
    },
  },
  data: () => ({
    musicFavs: [],
  }),
  computed: {
    ...mapGetters({
      dados: 'Musicas/musicas',
      msg: 'Musicas/msg',
      searched: 'searched',
    }),
    myData() {
      return (this.searched.length === 0) ? this.dados : this.searched;
    },
  },
  watch: {
    musicFavs(newValues, oldValues) {
      this.setMyFavMusics(newValues);
      if (oldValues.length > 0 && !isEqual(newValues, oldValues) && this.favoritos) {
        this.$router.go(this.$router.currentRoute);
      }
    },
  },
  mounted() {
    if (!this.favoritos) this.getMusicas();
    this.getMyFavMusics();
  },
  methods: {
    ...mapActions({
      getMusicas: 'Musicas/getList',
    }),
    getMyFavMusics() {
      const mf = localStorage.getItem('vueSpotifyFavorites');
      const obj = JSON.parse(mf);
      this.musicFavs = obj.tracks;
    },
    msToMnSec(ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return `${minutes} : ${(seconds < 10 ? '0' : '')} ${seconds}`;
    },
    setMyFavMusics(values) {
      const mf = localStorage.getItem('vueSpotifyFavorites');
      const obj = JSON.parse(mf);
      obj.tracks = values;
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
