<template>
  <div id="app">
    <vs-navbar
      v-model="indexActive"
      :color="colorx"
      text-color="rgba(255,255,255,.6)"
      active-text-color="rgba(255,255,255,1)"
      class="myNavbar">

      <vs-navbar-title>
        Vue Spotify
      </vs-navbar-title>

      <vs-navbar-item :index="0" >
        <router-link
          to="/"
          @click.native="debounce_check">
          Artistas
        </router-link>
      </vs-navbar-item>
      <vs-navbar-item :index="1">
        <router-link
          to="/albums"
          @click.native="debounce_check">
          Álbums
        </router-link>
      </vs-navbar-item>
      <vs-navbar-item :index="2">
        <router-link
          to="/musicas"
          @click.native="debounce_check">
          Músicas
        </router-link>
      </vs-navbar-item>
      <vs-navbar-item :index="3">
        <router-link
          to="/favoritos/artistas"
          @click.native="debounce_check">
          Favoritos
        </router-link>
      </vs-navbar-item>
      <vs-spacer/>
      <vs-input
        v-if="indexActive !== 3"
        :value="search"
        :color="colorx"
        vs-icon="search"
        vs-label-placeholder="Busca"
        @input="debounce_search"/>
    </vs-navbar>
    <router-view/>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  data: () => ({
    colorx: '#4fc08d',
    indexActive: 0,
    search: '',
    sParams: {},
    myRoute: '',
  }),
  computed: {
    myRoutes() {
      return this.$route.fullPath;
    },
  },
  watch: {
    search() {
      this.checkUrl();
    },
    myRoutes(newValue) {
      this.myRoute = newValue;
      this.checkUrl();
    },
  },
  methods: {
    checkUrl() {
      const splitted = this.myRoute.split('/');
      const splitIndex = (splitted.length <= 3) ? 1 : 3;
      switch (splitted[splitIndex]) {
        case 'albums':
          this.indexActive = 1;
          this.sParams.q = this.search;
          this.sParams.type = 'album';
          break;
        case 'musicas':
          this.indexActive = 2;
          this.sParams.q = this.search;
          this.sParams.type = 'track';
          break;
        case 'favoritos':
          this.indexActive = 3;
          this.sParams.q = '';
          this.sParams.type = '';
          break;
        default:
          this.indexActive = 0;
          this.sParams.q = this.search;
          this.sParams.type = 'artist';
      }
      if (this.sParams.q !== '') {
        this.$store.dispatch('search', this.sParams);
      } else {
        const data = { index: 'searched', value: [] };
        this.$store.dispatch('changeData', data);
      }
    },
    /* eslint func-names: ["error", "never"] */
    debounce_search: debounce(function (val) {
      this.search = val;
    }, 1000),
    debounce_check: debounce(function () {
      this.checkUrl();
    }, 1000),
  },
};
</script>

<style scoped lang="scss">
  #app /deep/ .myNavbar  {
    color: #fff;
    .vs-con-input-label {
      color: #000;
      &.is-label-placeholder {
        margin-top: 0;
      }
    }
  }
</style>
