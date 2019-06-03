import Vue from 'vue';
import Vuex from 'vuex';
import forEach from 'lodash/forEach';

import Axios from '../services/axios';
import Albums from './modules/albums';
import Artistas from './modules/artistas';
import Musicas from './modules/musicas';

import { CHANGE_MSG, CHANGE_SEARCH } from './mutations-types';

// Cria variável no localStorage
if (!localStorage.getItem('vueSpotifyFavorites')) {
  const favInit = {
    artists: [],
    albums: [],
    tracks: [],
  };
  localStorage.setItem('vueSpotifyFavorites', JSON.stringify(favInit));
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    msg: '',
    searched: [],
  },
  actions: {
    search({ commit }, obj) {
      commit(CHANGE_MSG, 'Pesquisando.... Aguarde!');
      const datas = [];
      const config = {
        params: { q: obj.q, type: obj.type },
      };
      Axios().get('/search', config).then(response => {
        if (response.status === 204) {
          commit(CHANGE_MSG, 'Não há dados para exibir!');
        } else {
          let searchs = [];
          forEach(response.data[`${obj.type}s`].items, (value, index) => {
            if (index > 0 && index % 6 === 0) {
              datas.push(searchs);
              searchs = [];
            }
            searchs.push(value);
          });
          if (searchs.length > 0) datas.push(searchs);
          const myValues = (obj.type !== 'track') ? datas : response.data[`${obj.type}s`].items;
          commit(CHANGE_SEARCH, myValues);
          commit(CHANGE_MSG, '');
        }
      }, error => {
        if (error.response.status === 401) {
          sessionStorage.setItem('valid', false);
        }
        console.log(error);
      });
    },
  },
  mutations: {
    [CHANGE_MSG](state, value) {
      state.msg = value;
    },
    [CHANGE_SEARCH](state, value) {
      state.searched = value;
    },
  },
  modules: {
    Albums,
    Artistas,
    Musicas,
  },
});
