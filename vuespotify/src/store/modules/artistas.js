import forEach from 'lodash/forEach';
import { CHANGE_ARTISTAS, CHANGE_ARTISTAS_ALBUM } from '../mutations-types';

const actions = {
  getList({ rootGetters, commit, dispatch }, ids) {
    dispatch('changeMsg', 'Carregando.... Aguarde!', { root: true });
    const datas = [];
    const artistas = ids || [
      '4cn4gMq0KXORHeYA45PcBi',
      '10naVTwNjE50daQVrN0bXh',
      '7uPgOaM3jjmkwuua1RgZHg',
      '7n1XMwvxPf10t4OX6h6Ufy',
      '1zWJTFpRoMlT21OaXniRsb',
      '7gRwkRxJz1ilKcYkeqhmEz',
      '6O67GI6ayhWHyFmOOJRLEq',
      '6ODCVWBfGNFUf1bpo0c2Ge',
      '6wd8OZcCaRQNDIMz6SPNGN',
      '4EUuQxMNowMUEs5gu4BzBX',
      '5rTjH3aABAmPM5B6DZebZ7',
      '6TYimByryGphZCtwYopH0y',
    ];
    const config = {
      headers: rootGetters.auth.headers,
      params: { ids: artistas.join(',') },
    };
    rootGetters.http.get('/artists', config).then(response => {
      let artists = [];
      if (response.status === 204) {
        dispatch('changeMsg', 'Ainda não há artistas para exibir!', { root: true });
      } else {
        forEach(response.data.artists, (value, index) => {
          if (index > 0 && index % 6 === 0) {
            datas.push(artists);
            artists = [];
          }
          artists.push(value);
        });
        if (artists.length > 0) datas.push(artists);
        commit(CHANGE_ARTISTAS, datas);
        dispatch('changeMsg', '', { root: true });
      }
    }, error => {
      if (error.response.status === 401) {
        sessionStorage.setItem('valid', false);
        dispatch('authAgain', { action: 'Artistas/getList' }, { root: true });
      }
      console.log(error);
    });
  },
  getArtistAlbums({ rootGetters, commit, dispatch }, id) {
    dispatch('changeMsg', 'Carregando.... Aguarde!', { root: true });
    const config = {
      headers: rootGetters.auth.headers,
    };
    const artist = {};
    rootGetters.http.get(`/artists/${id}`, config).then(response => {
      if (response.status === 204) {
        dispatch('changeMsg', 'Ainda não há detalhes deste artista para exibir!', { root: true });
      } else {
        artist.id = response.data.id;
        artist.nome = response.data.name;
        artist.imagem = response.data.images[0].url;
      }
    });

    config.params = { limit: 5 };

    rootGetters.http.get(`/artists/${id}/albums`, config).then(response => {
      if (response.status === 204) {
        dispatch('changeMsg', 'Ainda não há albums deste artista para exibir!', { root: true });
      } else {
        commit(CHANGE_ARTISTAS_ALBUM, { artista: artist, albums: response.data.items });
        dispatch('changeMsg', '', { root: true });
      }
    }, error => {
      if (error.response.status === 401) {
        sessionStorage.setItem('valid', false);
        dispatch('authAgain', { action: 'Artistas/getArtistAlbums', id }, { root: true });
      }
      console.log(error);
    });
  },
};

const mutations = {
  [CHANGE_ARTISTAS](state, value) {
    state.artistas = value;
  },
  [CHANGE_ARTISTAS_ALBUM](state, value) {
    state.artista_albums = value;
  },
};

const getters = {
  artistas: state => state.artistas,
  albums: state => state.artista_albums,
};

const state = {
  artistas: [],
  artista_albums: {},
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
