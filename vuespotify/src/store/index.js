import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import forEach from 'lodash/forEach';
import Albums from './modules/albums';
import Artistas from './modules/artistas';
import Musicas from './modules/musicas';

import { CHANGE_AUTH, CHANGE_MSG, CHANGE_SEARCH } from './mutations-types';

// Cria variável no localStorage
if (!localStorage.getItem('vueSpotifyFavorites')) {
  const favInit = {
    artists: [],
    albums: [],
    tracks: [],
  };
  localStorage.setItem('vueSpotifyFavorites', JSON.stringify(favInit));
}

// Valida token
let token = '';
if (!sessionStorage.getItem('valid')) {
  const opened = window.open('https://accounts.spotify.com/authorize?client_id=da18b610d64c4573be48c92fe8ae8eee&response_type=token&redirect_uri=https:%2F%2Fwww.eleganciachick.com.br%2Fgtoken.php', 'gtoken');

  const checkClosed = () => {
    if (opened.closed) {
      axios.get('https://www.eleganciachick.com.br/spot.php').then(response => {
        sessionStorage.setItem('token', response.request.response);
        sessionStorage.setItem('valid', true);

        /* eslint no-use-before-define: ["error", { "variables": false }] */
        clearInterval(iId);
        window.location.reload();
      });
    }
  };

  const iId = setInterval(checkClosed, 1000);
} else {
  token = JSON.parse(sessionStorage.getItem('token'));
}

let auth = { headers: { Authorization: `${token.token_type} ${token.access_token}` } };

const http = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth,
    http,
    msg: '',
    searched: [],
  },
  actions: {
    authAgain({ commit, dispatch }, obj) {
      const opened = window.open('https://accounts.spotify.com/authorize?client_id=da18b610d64c4573be48c92fe8ae8eee&response_type=token&redirect_uri=https:%2F%2Fwww.eleganciachick.com.br%2Fgtoken.php', 'gtoken');

      const checkClosed = () => {
        if (opened.closed) {
          axios.get('https://www.eleganciachick.com.br/spot.php').then(response => {
            sessionStorage.setItem('token', response.request.response);
            sessionStorage.setItem('valid', true);
            token = JSON.parse(response.request.response);
            auth = { headers: { Authorization: `${token.token_type} ${token.access_token}` } };
            commit(CHANGE_AUTH, auth);
            if (obj.id !== undefined) {
              dispatch(obj.action, obj.id);
            } else {
              dispatch(obj.action);
            }
            /* eslint no-use-before-define: ["error", { "variables": false }] */
            clearInterval(iId);
          });
        }
      };

      const iId = setInterval(checkClosed, 1000);
    },
    changeMsg({ commit }, value) {
      commit(CHANGE_MSG, value);
    },
    search({ getters, commit, dispatch }, obj) {
      dispatch('changeMsg', 'Pesquisando.... Aguarde!');
      const datas = [];
      const config = {
        headers: getters.auth.headers,
        params: { q: obj.q, type: obj.type },
      };
      getters.http.get('/search', config).then(response => {
        if (response.status === 204) {
          dispatch('changeMsg', 'Não há dados para exibir!');
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
          dispatch('changeMsg', '');
        }
      }, error => {
        if (error.response.status === 401) {
          sessionStorage.setItem('valid', false);
          dispatch('authAgain', { action: 'search', obj });
        }
        console.log(error);
      });
    },
  },
  mutations: {
    [CHANGE_AUTH](state, value) {
      state.auth = value;
    },
    [CHANGE_MSG](state, value) {
      state.msg = value;
    },
    [CHANGE_SEARCH](state, value) {
      state.searched = value;
    },
  },
  getters: {
    auth: state => state.auth,
    http: state => state.http,
    msg: state => state.msg,
    searched: state => state.searched,
  },
  modules: {
    Albums,
    Artistas,
    Musicas,
  },
});
