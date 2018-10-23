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
            icon="music_video"/>
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
      if (obj.data.album) return `${obj.names} | Álbum ${obj.data.album.name}`;
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
  mounted() {
    this.getMusicas();
  },
  methods: {
    ...mapActions({
      getMusicas: 'Musicas/getList',
    }),
    msToMnSec(ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return `${minutes} : ${(seconds < 10 ? '0' : '')} ${seconds}`;
    },
  },
};
</script>
