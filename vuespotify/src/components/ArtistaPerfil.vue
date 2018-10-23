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
                v-if="dados.artista"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="12">
                <vs-avatar
                  :src="dados.artista.imagem"
                  size="90px"/>
                <h3>
                  {{ dados.artista.nome }}
                </h3>
                <vs-checkbox
                  v-model="artistsFav"
                  :vs-value="dados.artista.id"
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
    <vs-row
      vs-align="flex-start"
      vs-type="flex"
      vs-justify="center"
      vs-w="12">
      <vs-col
        v-for="(dado, index) in dados.albums"
        :key="index"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-xs="6"
        vs-sm="4"
        vs-lg="2">
        <vs-card>
          <div
            class="avatar"
            @click="enter(dados.artista.id, dado.id)">
            <img
              v-if="dado.images"
              :src="dado.images[1].url">
            <div class="middle">
              <vs-button
                vs-type="filled"
                vs-icon="play_arrow"
                class="play-button"
                color="dark"/>
            </div>
          </div>
          <div slot="footer">
            <vs-row>
              <vs-col
                :title="dado.name"
                vs-type="flex"
                vs-justify="center"
                vs-align="center">
                <h4 class="albumName">{{ dado.name }}</h4>
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col
                :title="dado.artists | showArtist"
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                class="albumName">
                {{ dado.artists | showArtist }}
              </vs-col>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ArtistaPerfil',
  filters: {
    showArtist: artists => {
      let ret;
      const artNames = [];
      if (artists.length < 3) {
        artists.map(obj => {
          artNames.push(obj.name);
          return true;
        });
        ret = artNames.join(' e ');
      } else {
        ret = 'Vários Artistas';
      }
      return ret;
    },
  },
  data: () => ({
    artistsFav: [],
  }),
  computed: {
    ...mapGetters({
      dados: 'Artistas/albums',
      msg: 'Artistas/msg',
    }),
  },
  watch: {
    artistsFav(newValues) {
      this.setMyFavArtists(newValues);
    },
  },
  mounted() {
    this.getAlbums(this.$route.params.id);
    this.getMyFavArtists();
  },
  methods: {
    ...mapActions({
      getAlbums: 'Artistas/getArtistAlbums',
    }),
    enter(artista, album) {
      this.$router.push({ path: `/artista/${artista}/album/${album}` });
    },
    getMyFavArtists() {
      const mf = localStorage.getItem('vueSpotifyFavorites');
      const obj = JSON.parse(mf);
      this.artistsFav = obj.artists;
    },
    setMyFavArtists(values) {
      const mf = localStorage.getItem('vueSpotifyFavorites');
      const obj = JSON.parse(mf);
      obj.artists = values;
      const newVal = JSON.stringify(obj);
      localStorage.setItem('vueSpotifyFavorites', newVal);
    },
  },
};
</script>

<style scoped lang="scss">
  .template-container /deep/ .avatar {
    position: relative;
    cursor: pointer;
    img {
      opacity: 1;
      display: block;
      width: 100%;
      height: auto;
      transition: .5s ease;
      backface-visibility: hidden;
    }
    .middle {
      transition: .5s ease;
      opacity: 0;
      position: absolute;
      width: 0;
      top: 50%;
      left: 42%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      text-align: center;
    }
    .play-button {
      border-radius: 50%;
    }
    &:hover img {
      opacity: 0.3;
    }
    &:hover .middle {
      opacity: 1;
    }
  }
  .template-container /deep/ .con-vs-card {
    .vs-card-footer {
      padding: 0 10px 35px;
      margin-top: -30px;
      .albumName {
        display: block !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
      }
    }
    .vs-card-media {
      .con-vs-avatar {
        cursor: default;
        &:hover img {
          opacity: 1;
        }
      }
    }
  }
  .radius {
    border-radius: 50%;
  }
</style>
