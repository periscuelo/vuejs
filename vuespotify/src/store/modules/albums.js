import forEach from 'lodash/forEach';
import { CHANGE_STATE } from '../mutations-types';

const actions = {
  getList({ rootGetters, commit, dispatch }) {
    commit(CHANGE_STATE, { index: 'msg', value: 'Carregando.... Aguarde!' });
    const datas = [];
    const albumsIds = [
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
        commit(CHANGE_STATE, { index: 'msg', value: 'Ainda não há albums para exibir!' });
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
        commit(CHANGE_STATE, { index: 'albums', value: datas });
        commit(CHANGE_STATE, { index: 'msg', value: '' });
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
    commit(CHANGE_STATE, { index: 'msg', value: 'Carregando.... Aguarde!' });
    const config = {
      headers: rootGetters.auth.headers,
    };
    rootGetters.http.get(`/albums/${id}`, config).then(response => {
      if (response.status === 204) {
        commit(CHANGE_STATE, { index: 'msg', value: 'Ainda não há albums deste artista para exibir!' });
      } else {
        commit(CHANGE_STATE, { index: 'album', value: response.data });
        commit(CHANGE_STATE, { index: 'msg', value: '' });
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
  [CHANGE_STATE](state, obj) {
    state[obj.index] = obj.value;
  },
};

const getters = {
  albums: state => state.albums,
  album: state => state.album,
  msg: state => state.msg,
};

const state = {
  albums: {},
  album: {},
  msg: '',
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
