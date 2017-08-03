var verificaHorizontal = function (arr, index, value) {
  return (arr[index][0] === value && arr[index][1] === value && arr[index][2] === value);
}

var verificaVertical = function (arr, index, value) {
  return (arr[0][index] === value && arr[1][index] === value && arr[2][index] === value);
}

var verificaDiagonal = function (arr, value) {
  if (arr[1][1] === value && ((arr[0][0] === value && arr[2][2] === value) || (arr[0][2] === value && arr[2][0] === value))) return true;
  return false;
}

var verificaPreenchimento = function(arr) {
  var preenchido = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (arr[i][j] === 0) preenchido++;
    }
  }
  return (preenchido === 0);
}

Vue.component('tictactoe', {
  template: `<div>
              <h1>Jogo da Velha</h1>
              <div class="container">
                <div class="row" v-for="(lines, line) in cSquares">
                  <div class="col-md-4" v-for="(value, square) in lines" @click="register(line, square, value)">
                    <span v-if="value === 1">X</span>
                    <span v-else-if="value === 2">O</span>
                    <span v-else>&nbsp;</span>
                  </div>
                </div>
                <div class="row text-uppercase smFont" v-if="status === 'over'">
                  game {{status}} <br> {{cMsg}} <br>
                  <button type="button" class="button btn-primary" @click="reset()">Revanche?</button>
                </div>
                <div class="row" v-if="status !== 'over'">Jogador {{player}}</div>
              </div>
            </div>`,
  data: function() {
    return {
      timePlayer: 1,
      game: 'start',
      squares: [],
      msg: ''
    };
  },
  computed: {
    player: function() {
      return this.timePlayer;
    },
    status: function() {
      return this.game;
    },
    cSquares: function() {
      if (this.squares.length === 0) {
        for (var i = 3; i > 0; i--) {
          this.squares.push([0, 0, 0]);
        }
      }
      return this.squares;
    },
    cMsg: function() {
      return this.msg
    }
  },
  methods: {
    changePlayer: function() {
      return this.timePlayer = (this.timePlayer === 1) ? 2 : 1
    },
    play: function (obj) {
      if (this.squares[obj.line][obj.square] === 0) this.squares[obj.line][obj.square] = obj.player
    },
    gameStatus: function (obj) {
      for (var i = 0; i < 3; i++) {
        if (verificaHorizontal(this.squares, i, obj.player) || verificaVertical(this.squares, i, obj.player)) {
          this.game = 'over'
          this.msg = 'Jogador ' + obj.player + ' venceu!'
        }
      }
      if (verificaDiagonal(this.squares, obj.player)) {
        this.game = 'over'
        this.msg = 'Jogador ' + obj.player + ' venceu!'
      }
      if (verificaPreenchimento(this.squares) && this.msg === '') {
        this.game = 'over'
        this.msg = 'Deu velha :('
      }
    },
    register: function (line, square, value) {
      if (value === 0 && this.status !== 'over') {
        var obj = { player: this.player, line: line, square: square };
        this.play(obj);
        this.gameStatus(obj);
        if (this.status !== 'over') this.changePlayer();
      }
    },
    reset: function () {
      this.timePlayer = 1
      this.game = 'start'
      this.squares = []
      this.msg = ''
    }
  }
});

// Instância Vue
new Vue({
  el: '#app'
});
