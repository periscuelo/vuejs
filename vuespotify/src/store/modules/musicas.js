import { CHANGE_MUSICAS } from '../mutations-types';

const actions = {
  getList({ rootGetters, commit, dispatch }, ids) {
    dispatch('changeMsg', 'Carregando.... Aguarde!', { root: true });
    const musicas = ids || [
      '2AXmPzar7HNqI6ksI562UX',
      '7KCOMlNvjtkaQVBWwq3rd8',
      '548AxnT5rmzjT1AUpxgCoM',
      '0CpIVOnfJTu99vr0uQARPD',
      '3qK4cPOkKJ00tAWeFBFMXm',
      '1VwyjcpwWGMMXDe1xGnRyx',
      '0zBbyR1llVe56n9P28dv2m',
      '0zRzJU415EsEQ3NOjZj6Lu',
      '3VTaBE3DsiREAxFtp6hREj',
      '4NV9CHd1KRZ7dCySTtATey',
      '5MY8WIRTMZ5uHEKSFJ4ZRP',
      '2hGsyzJD1GiYlOD4bEb7KD',
    ];
    const config = {
      headers: rootGetters.auth.headers,
      params: { ids: musicas.join(',') },
    };
    rootGetters.http.get('/tracks', config).then(response => {
      if (response.status === 204) {
        dispatch('changeMsg', 'Ainda não há músicas para exibir!', { root: true });
      } else {
        commit(CHANGE_MUSICAS, response.data.tracks);
        dispatch('changeMsg', '', { root: true });
      }
    }, error => {
      if (error.response.status === 401) {
        sessionStorage.setItem('valid', false);
        dispatch('authAgain', { action: 'Musicas/getList' }, { root: true });
      }
      console.log(error);
    });
  },
};

const mutations = {
  [CHANGE_MUSICAS](state, value) {
    state.musicas = value;
  },
};

const getters = {
  musicas: state => state.musicas,
};

const state = {
  musicas: [],
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
