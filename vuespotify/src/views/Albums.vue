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
    <span v-else>
      <vs-row
        v-for="(grupos, index) in myData"
        :key="index">
        <vs-col
          v-for="(dado, index2) in grupos"
          :key="index2"
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-xs="6"
          vs-sm="4"
          vs-lg="2">
          <vs-card v-if="dado">
            <div
              class="avatar"
              @click="enter(dado.artists[0].id, dado.id)">
              <img
                v-if="dado.images && dado.images[1]"
                :src="dado.images[1].url"
                size="300px">
              <div class="middle">
                <vs-button
                  radius
                  color="dark"
                  type="filled"
                  icon="play_arrow"/>
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
              <vs-row v-if="dado.artists">
                <vs-col
                  :title="dado.artists | showArtistMA"
                  vs-type="flex"
                  vs-justify="center"
                  vs-align="center"
                  class="albumName">
                  {{ dado.artists | showArtistMA }}
                </vs-col>
              </vs-row>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Albums',
  props: {
    favoritos: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters('Albums', {
      dados: 'albums',
    }),
    ...mapGetters(['msg', 'searched']),
    myData() {
      return (this.searched.length === 0) ? this.dados : this.searched;
    },
  },
  created() {
    if (!this.favoritos) this.getAlbums();
  },
  methods: {
    ...mapActions({
      getAlbums: 'Albums/getList',
    }),
    enter(artista, album) {
      this.$router.push({ path: `/artista/${artista}/album/${album}` });
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
  &:hover img {
    opacity: 0.3;
  }
  &:hover .middle {
    opacity: 1;
  }
}
.template-container /deep/ .con-vs-card {
  .vs-card--footer {
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
}
</style>
