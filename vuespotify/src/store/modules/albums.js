import forEach from 'lodash/forEach';
import { CHANGE_ALBUM, CHANGE_ALBUMS } from '../mutations-types';

const actions = {
  getList({ rootGetters, commit, dispatch }, ids) {
    dispatch('changeMsg', 'Carregando.... Aguarde!', { root: true });
    const datas = [];
    const albumsIds = ids || [
      '5FwdSSQrDlVvGQ14hpPO9S',
      '0tbu4twiafAbrakCB3mxz4',
      '7z7bTIHtSNmuIX0yWTimZ7',
      '5lPYUxk21ijQNVA0r1wPhk',
      '1XdmakXviDcpmNrl5mNMrt',
      '5oohuDD9sE7C1MxwA8uzHe',
      '7vDirGAUVrYMQc7G3sDxfQ',
      '2Wz4oDBOPs3hYkb3eUtsNd',
      '7CB9ERpNXGxnCgRxQt94CH',
      '5V6r9gmQXxfSQ4gzSxYEx6',
      '6EtAuxIwZCEuUZEqn2DwII',
      '1CqADkcK8HJY1ss4i3cJqU',
    ];
    const config = {
      headers: rootGetters.auth.headers,
      params: { ids: albumsIds.join(',') },
    };
    rootGetters.http.get('/albums', config).then(response => {
      if (response.status === 204) {
        dispatch('changeMsg', 'Ainda não há albums para exibir!', { root: true });
      } else {
        let albums = [];
        forEach(response.data.albums, (value, index) => {
          if (index > 0 && index % 6 === 0) {
            datas.push(albums);
            albums = [];
          }
          albums.push(value);
        });
        if (albums.length > 0) datas.push(albums);
        commit(CHANGE_ALBUMS, datas);
        dispatch('changeMsg', '', { root: true });
      }
    }, error => {
      if (error.response.status === 401) {
        sessionStorage.setItem('valid', false);
        dispatch('authAgain', { action: 'Albums/getList' }, { root: true });
      }
      console.log(error);
    });
  },
  getAlbum({ rootGetters, commit, dispatch }, id) {
    dispatch('changeMsg', 'Carregando.... Aguarde!', { root: true });
    const config = {
      headers: rootGetters.auth.headers,
    };
    rootGetters.http.get(`/albums/${id}`, config).then(response => {
      if (response.status === 204) {
        dispatch('changeMsg', 'Ainda não há albums deste artista para exibir!', { root: true });
      } else {
        commit(CHANGE_ALBUM, response.data);
        dispatch('changeMsg', '', { root: true });
      }
    }, error => {
      if (error.response.status === 401) {
        sessionStorage.setItem('valid', false);
        dispatch('authAgain', { action: 'Albums/getAlbum', id }, { root: true });
      }
      console.log(error);
    });
  },
};

const mutations = {
  [CHANGE_ALBUM](state, value) {
    state.album = value;
  },
  [CHANGE_ALBUMS](state, value) {
    state.albums = value;
  },
};

const getters = {
  albums: state => state.albums,
  album: state => state.album,
};

const state = {
  albums: [],
  album: {},
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
