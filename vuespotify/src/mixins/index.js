const utils = {
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
