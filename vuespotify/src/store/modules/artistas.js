import forEach from 'lodash/forEach';
import { CHANGE_STATE } from '../mutations-types';

const actions = {
  getList({ rootGetters, commit, dispatch }) {
    commit(CHANGE_STATE, { index: 'msg', value: 'Carregando.... Aguarde!' });
    const datas = [];
    const artistas = [
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
        commit(CHANGE_STATE, { index: 'msg', value: 'Ainda não há artistas para exibir!' });
      } else {
        forEach(response.data.artists, (value, index) => {
          if (index > 0 && index % 6 === 0) {
            datas.push(artists);
            artists = [];
          }
          artists.push(value);
        });
        if (artists.length > 0) datas.push(artists);
        commit(CHANGE_STATE, { index: 'artistas', value: datas });
        commit(CHANGE_STATE, { index: 'msg', value: '' });
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
    commit(CHANGE_STATE, { index: 'msg', value: 'Carregando.... Aguarde!' });
    const config = {
      headers: rootGetters.auth.headers,
    };
    const artist = {};
    rootGetters.http.get(`/artists/${id}`, config).then(response => {
      if (response.status === 204) {
        commit(CHANGE_STATE, { index: 'msg', value: 'Ainda não há detalhes deste artista para exibir!' });
      } else {
        artist.id = response.data.id;
        artist.nome = response.data.name;
        artist.imagem = response.data.images[0].url;
      }
    });

    config.params = { limit: 5 };

    rootGetters.http.get(`/artists/${id}/albums`, config).then(response => {
      if (response.status === 204) {
        commit(CHANGE_STATE, { index: 'msg', value: 'Ainda não há albums deste artista para exibir!' });
      } else {
        commit(CHANGE_STATE, { index: 'artista_albums', value: { artista: artist, albums: response.data.items } });
        commit(CHANGE_STATE, { index: 'msg', value: '' });
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
  [CHANGE_STATE](state, obj) {
    state[obj.index] = obj.value;
  },
};

const getters = {
  artistas: state => state.artistas,
  albums: state => state.artista_albums,
  msg: state => state.msg,
};

const state = {
  artistas: [],
  artista_albums: {},
  msg: '',
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
