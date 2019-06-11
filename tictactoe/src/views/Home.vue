<template>
  <div class="vue-container">
    <h1>Jogo da Velha</h1>
    <div class="container">
      <div v-for="(lines, line, index) in squares"
        :key="index"
        class="row">
        <div class="col-4"
          v-for="(value, square, index2) in lines"
          :key="index2"
          @click="register(line, square, value)">
          <span v-if="value === 1">X</span>
          <span v-else-if="value === 2">O</span>
          <span v-else>&nbsp;</span>
        </div>
      </div>
      <div class="row text-uppercase smFont" v-if="status === 'over'">
        <span class="col-12">
          game {{status}} <br> {{msg}}
        </span>
        <span class="col-12">
          <button type="button" class="btn btn-primary" @click="reset()">Revanche?</button>
        </span>
      </div>
      <div class="row" v-if="status !== 'over'">
        <span class="col-12">Jogador {{timePlayer}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'board',
  data: () => ({
    timePlayer: 1,
    status: 'start',
    squares: [],
    msg: '',
  }),
  created() {
    this.start();
  },
  methods: {
    changePlayer() {
      this.timePlayer = (this.timePlayer === 1) ? 2 : 1;
    },
    play(line, square) {
      if (this.squares[line][square] === 0) {
        this.squares[line][square] = this.timePlayer;
      }
      this.gameStatus();
    },
    register(line, square, value) {
      if (value === 0 && this.status !== 'over') {
        this.play(line, square);
        if (this.status !== 'over') this.changePlayer();
      }
    },
    reset() {
      Object.assign(this.$data, this.$options.data());
      this.start();
    },
    start() {
      if (this.squares.length === 0) {
        for (let i = 3; i > 0; i -= 1) {
          this.squares.push([0, 0, 0]);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  $tamanhoQuadro: 255px;
  $border: 2px solid black;
  $geralSize: 50px;
  $otherSize: 20px;

  .container {
    width: $tamanhoQuadro;
    height: $tamanhoQuadro;
    font-size: $geralSize;
    .row:nth-child(-n+2) {
      border-bottom: $border;
    }
    .row {
      div {
        padding-left: 0;
        padding-right: 0;
        &:nth-child(-n+2) {
          border-right: $border;
        }
      }
      span {
        display: block;
        cursor: pointer;
      }
    }
  }
  .smFont {
    font-size: $otherSize;
  }
</style>
