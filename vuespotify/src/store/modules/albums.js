import forEach from 'lodash/forEach';
import AlbumService from '../../services/albums';
import { CHANGE_ALBUM, CHANGE_ALBUMS, CHANGE_MSG } from '../mutations-types';

const actions = {
  getList({ commit }, ids) {
    commit(CHANGE_MSG, 'Carregando.... Aguarde!', { root: true });
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
      params: { ids: albumsIds.join(',') },
    };
    AlbumService.getAlbums(config).then(response => {
      if (response.status === 204) {
        commit(CHANGE_MSG, 'Ainda não há albums para exibir!', { root: true });
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
        commit(CHANGE_MSG, '', { root: true });
      }
    }, error => {
      if (error.response.status === 401) {
        sessionStorage.setItem('valid', false);
      }
      console.log(error);
    });
  },
  getAlbum({ commit }, id) {
    commit(CHANGE_MSG, 'Carregando.... Aguarde!', { root: true });
    AlbumService.getAlbum(id).then(response => {
      if (response.status === 204) {
        commit(CHANGE_MSG, 'Ainda não há albums deste artista para exibir!', { root: true });
      } else {
        commit(CHANGE_ALBUM, response.data);
        commit(CHANGE_MSG, '', { root: true });
      }
    }, error => {
      if (error.response.status === 401) {
        sessionStorage.setItem('valid', false);
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

const state = {
  albums: [],
  album: {},
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
