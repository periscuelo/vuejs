import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import forEach from 'lodash/forEach';
import Albums from './modules/albums';
import Artistas from './modules/artistas';
import Musicas from './modules/musicas';

import { CHANGE_STATE } from './mutations-types';

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
    http,
    auth,
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
            commit('CHANGE_STATE', { index: 'auth', value: auth });
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
    changeData({ commit }, obj) {
      commit(CHANGE_STATE, { index: obj.index, value: obj.value });
    },
    search({ getters, commit, dispatch }, obj) {
      commit(CHANGE_STATE, { index: 'msg', value: 'Pesquisando.... Aguarde!' });
      const datas = [];
      const config = {
        headers: getters.auth.headers,
        params: { q: obj.q, type: obj.type },
      };
      getters.http.get('/search', config).then(response => {
        if (response.status === 204) {
          commit(CHANGE_STATE, { index: 'msg', value: 'Não há dados para exibir!' });
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
          commit(CHANGE_STATE, { index: 'searched', value: myValues });
          commit(CHANGE_STATE, { index: 'msg', value: '' });
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
    [CHANGE_STATE](state, obj) {
      state[obj.index] = obj.value;
    },
  },
  getters: {
    auth: state => state.auth,
    http: state => state.http,
    searched: state => state.searched,
  },
  modules: {
    Albums,
    Artistas,
    Musicas,
  },
});
