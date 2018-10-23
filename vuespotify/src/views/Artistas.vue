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
                v-if="dado.genres"
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
              vs-type="filled"
              vs-icon="play_arrow"
              class="play-button"
              color="dark"/>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Artistas',
  filters: {
    popText: pop => {
      let text;
      switch (true) {
        case (pop > 79):
          text = 'Top';
          break;
        case (pop > 59 && pop < 80):
          text = 'Legal';
          break;
        case (pop > 29 && pop < 60):
          text = 'Bom';
          break;
        default:
          text = 'Desconhecido';
      }
      return text;
    },
    popColor: pop => {
      let color;
      switch (true) {
        case (pop > 79):
          color = 'success';
          break;
        case (pop > 59 && pop < 80):
          color = 'primary';
          break;
        case (pop > 29 && pop < 60):
          color = 'warning';
          break;
        default:
          color = '';
      }
      return color;
    },
    popIcon: pop => {
      let icon;
      switch (true) {
        case (pop > 79):
          icon = 'grade';
          break;
        case (pop > 59 && pop < 80):
          icon = 'language';
          break;
        case (pop > 29 && pop < 60):
          icon = 'group_work';
          break;
        default:
          icon = '';
      }
      return icon;
    },
    implode: data => data.join(', '),
  },
  props: {
    favoritos: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters({
      dados: 'Artistas/artistas',
      msg: 'Artistas/msg',
      searched: 'searched',
    }),
    myData() {
      return (this.searched.length === 0) ? this.dados : this.searched;
    },
  },
  mounted() {
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
    .con-img {
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
      top: 34%;
      left: 36%;
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
