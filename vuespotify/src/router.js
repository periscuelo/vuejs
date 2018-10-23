import Vue from 'vue';
import Router from 'vue-router';
import Artistas from './views/Artistas.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'artistas',
      component: Artistas,
    },
    {
      path: '/artista/:id',
      name: 'artista',
      component: () => import('./components/ArtistaPerfil.vue'),
    },
    {
      path: '/artista/:id/album/:id2',
      name: 'album',
      component: () => import('./components/AlbumMusicas.vue'),
    },
    {
      path: '/albums',
      name: 'albums',
      component: () => import('./views/Albums.vue'),
    },
    {
      path: '/musicas',
      name: 'musicas',
      component: () => import('./views/Musicas.vue'),
    },
    {
      path: '/favoritos/',
      name: 'favoritos',
      component: () => import('./views/Favoritos.vue'),
      children: [
        {
          path: 'artistas',
          component: Artistas,
          props: { favoritos: true },
        },
        {
          path: 'albums',
          component: () => import('./views/Albums.vue'),
          props: { favoritos: true },
        },
        {
          path: 'musicas',
          component: () => import('./views/Musicas.vue'),
          props: { favoritos: true },
        },
      ],
    },
  ],
});
