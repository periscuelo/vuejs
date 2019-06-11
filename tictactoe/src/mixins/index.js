const utils = {
  methods: {
    gameStatus() {
      for (let i = 0; i < 3; i += 1) {
        if (this.verificaHorizontal(this.squares, i, this.timePlayer)
            || this.verificaVertical(this.squares, i, this.timePlayer)) {
          this.status = 'over';
          this.msg = `Jogador ${this.timePlayer} venceu!`;
        }
      }
      if (this.verificaDiagonal(this.squares, this.timePlayer)) {
        this.status = 'over';
        this.msg = `Jogador ${this.timePlayer} venceu!`;
      }
      if (this.verificaPreenchimento(this.squares) && this.msg === '') {
        this.status = 'over';
        this.msg = 'Deu velha :(';
      }
    },
    verificaHorizontal(arr, index, value) {
      return (arr[index][0] === value && arr[index][1] === value && arr[index][2] === value);
    },
    verificaVertical(arr, index, value) {
      return (arr[0][index] === value && arr[1][index] === value && arr[2][index] === value);
    },
    verificaDiagonal(arr, value) {
      if (arr[1][1] === value
          && ((arr[0][0] === value && arr[2][2] === value)
              || (arr[0][2] === value && arr[2][0] === value))) {
        return true;
      }
      return false;
    },
    verificaPreenchimento(arr) {
      let preenchido = 0;
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          if (arr[i][j] === 0) preenchido += 1;
        }
      }
      return (preenchido === 0);
    },
  },
};

export default {
  utils,
};
