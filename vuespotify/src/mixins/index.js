const utils = {
  filters: {
    implode: data => data.join(', '),
    popColor: pop => {
      let color;
      switch (true) {
        case (pop > 79):
          color = 'success';
          break;
        case (pop > 59 && pop < 80):
          color = 'primary';
          break;
        case (pop > 29 && pop < 60):
          color = 'warning';
          break;
        default:
          color = '';
      }
      return color;
    },
    popIcon: pop => {
      let icon;
      switch (true) {
        case (pop > 79):
          icon = 'grade';
          break;
        case (pop > 59 && pop < 80):
          icon = 'language';
          break;
        case (pop > 29 && pop < 60):
          icon = 'group_work';
          break;
        default:
          icon = '';
      }
      return icon;
    },
    popText: pop => {
      let text;
      switch (true) {
        case (pop > 79):
          text = 'Top';
          break;
        case (pop > 59 && pop < 80):
          text = 'Legal';
          break;
        case (pop > 29 && pop < 60):
          text = 'Bom';
          break;
        default:
          text = 'Desconhecido';
      }
      return text;
    },
    showAlbum: obj => {
      const ret = (obj.data.album) ? `${obj.names} | Álbum ${obj.data.album.name}` : '';
      return ret;
    },
    showArtistC: artists => {
      const artNames = artists.map(obj => obj.name);
      return artNames.join(', ');
    },
    showArtistD: data => {
      let artNames = [];
      if (data.artists) {
        artNames = data.artists.map(obj => obj.name);
      }
      return { data, names: artNames.join(', ') };
    },
    showArtistMA: artists => {
      let ret;
      if (artists.length < 3) {
        const artNames = artists.map(obj => obj.name);
        ret = artNames.join(' e ');
      } else {
        ret = 'Vários Artistas';
      }
      return ret;
    },
  },
  methods: {
    msToMnSec(ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    },
    test() {
      // eslint-disable-next-line
      alert('Ops! Este é apenas um teste, não vai rolar ouvir musica por aqui! Desculpe :(');
    },
  },
};

export default {
  utils,
};
