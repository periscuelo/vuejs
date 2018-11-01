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
          <div
            v-if="dado"
            class="avatar"
            @click="enter(dado.id)">
            <vs-avatar
              v-if="dado.images && dado.images[2]"
              :src="dado.images[2].url"
              size="120px"/>
            <vs-avatar
              v-else
              color="success"
              icon="music_video"
              size="120px"/>
            <vs-row>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center">
                <h4>{{ dado.name }}</h4>
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center">
                <vs-tooltip
                  v-if="dado.genres && dado.genres[0]"
                  :text="dado.genres | implode"
                  title="Gêneros"
                  position="right">
                  {{ dado.genres[0] }}
                </vs-tooltip>
                <span v-else>
                  N/A
                </span>
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center">
                <vs-chip :color="dado.popularity | popColor">
                  <vs-avatar :icon="dado.popularity | popIcon" />
                  {{ dado.popularity | popText }}
                </vs-chip>

              </vs-col>
            </vs-row>
            <div class="middle">
              <vs-button
                radius
                color="dark"
                type="filled"
                icon="play_arrow"/>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Artistas',
  props: {
    favoritos: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters('Artistas', {
      dados: 'artistas',
    }),
    ...mapGetters(['msg', 'searched']),
    myData() {
      return (this.searched.length === 0) ? this.dados : this.searched;
    },
  },
  created() {
    if (!this.favoritos) this.getArtistas();
  },
  methods: {
    ...mapActions({
      getArtistas: 'Artistas/getList',
    }),
    enter(artista) {
      this.$router.push({ path: `/artista/${artista}` });
    },
  },
};
</script>

<style scoped lang="scss">
.template-container /deep/ .avatar {
  position: relative;
  text-align: center;
  width: 100%;
  .con-img {
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
    top: 33%;
    left: 42%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }
  .play-button {
    border-radius: 50%;
  }
  &:hover .con-img {
    opacity: 0.3;
  }
  &:hover .middle {
    opacity: 1;
  }
}
</style>
