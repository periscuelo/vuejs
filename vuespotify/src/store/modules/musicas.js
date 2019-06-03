import MusicService from '../../services/musics';
import { CHANGE_MUSICAS, CHANGE_MSG } from '../mutations-types';

const actions = {
  getList({ commit }, ids) {
    commit(CHANGE_MSG, 'Carregando.... Aguarde!', { root: true });
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
      params: { ids: musicas.join(',') },
    };
    MusicService.getTracks(config).then(response => {
      if (response.status === 204) {
        commit(CHANGE_MSG, 'Ainda não há músicas para exibir!', { root: true });
      } else {
        commit(CHANGE_MUSICAS, response.data.tracks);
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
  [CHANGE_MUSICAS](state, value) {
    state.musicas = value;
  },
};

const state = {
  musicas: [],
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
