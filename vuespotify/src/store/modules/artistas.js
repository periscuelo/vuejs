import forEach from 'lodash/forEach';
import ArtistService from '../../services/artists';
import { CHANGE_ARTISTAS, CHANGE_ARTISTAS_ALBUM, CHANGE_MSG } from '../mutations-types';

const actions = {
  getList({ commit }, ids) {
    commit(CHANGE_MSG, 'Carregando.... Aguarde!', { root: true });
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
      params: { ids: artistas.join(',') },
    };
    ArtistService.getArtists(config).then(response => {
      let artists = [];
      if (response.status === 204) {
        commit(CHANGE_MSG, 'Ainda não há artistas para exibir!', { root: true });
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
        commit(CHANGE_MSG, '', { root: true });
      }
    }, error => {
      if (error.response.status === 401) {
        sessionStorage.setItem('valid', false);
      }
      console.log(error);
    });
  },
  getArtistAlbums({ commit }, id) {
    commit(CHANGE_MSG, 'Carregando.... Aguarde!', { root: true });
    const artist = {};
    ArtistService.getArtist(id).then(response => {
      if (response.status === 204) {
        commit(CHANGE_MSG, 'Ainda não há detalhes deste artista para exibir!', { root: true });
      } else {
        artist.id = response.data.id;
        artist.nome = response.data.name;
        artist.imagem = response.data.images[0].url;
      }
    });

    const params = { limit: 5 };

    ArtistService.getArtistAlbums(id, params).then(response => {
      if (response.status === 204) {
        commit(CHANGE_MSG, 'Ainda não há albums deste artista para exibir!', { root: true });
      } else {
        commit(CHANGE_ARTISTAS_ALBUM, { artista: artist, albums: response.data.items });
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
  [CHANGE_ARTISTAS](state, value) {
    state.artistas = value;
  },
  [CHANGE_ARTISTAS_ALBUM](state, value) {
    state.artista_albums = value;
  },
};

const state = {
  artistas: [],
  artista_albums: {},
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
