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
        <router-link to="/">Artistas</router-link>
      </vs-navbar-item>
      <vs-navbar-item :index="1">
        <router-link to="/albums">Álbums</router-link>
      </vs-navbar-item>
      <vs-navbar-item :index="2">
        <router-link to="/musicas">Músicas</router-link>
      </vs-navbar-item>
      <vs-navbar-item :index="3">
        <router-link to="/favoritos/artistas">Favoritos</router-link>
      </vs-navbar-item>
      <vs-spacer/>
      <vs-input
        v-if="indexActive !== 3"
        v-model="search"
        :color="colorx"
        vs-icon="search"
        placeholder="Busca"/>
    </vs-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  data: () => ({
    colorx: '#4fc08d',
    indexActive: 0,
    search: '',
  }),
  mounted() {
    const query = (location.hash === '') ? location.pathname : location.hash;
    const sQuery = query.split('/');
    switch (sQuery[1]) {
      case 'albums':
        this.indexActive = 1;
        break;
      case 'musicas':
        this.indexActive = 2;
        break;
      case 'favoritos':
        this.indexActive = 3;
        break;
      default:
        this.indexActive = 0;
    }
  },
};
</script>

<style lang="scss">
.myNavbar {
  color: #fff;
}
</style>
