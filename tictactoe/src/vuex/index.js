import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let verificaHorizontal = (arr, index, value) => {
  return (arr[index][0] === value && arr[index][1] === value && arr[index][2] === value)
}

let verificaVertical = (arr, index, value) => {
  return (arr[0][index] === value && arr[1][index] === value && arr[2][index] === value)
}

let verificaDiagonal = (arr, value) => {
  if (arr[1][1] === value && ((arr[0][0] === value && arr[2][2] === value) || (arr[0][2] === value && arr[2][0] === value))) return true
  return false
}

let verificaPreenchimento = arr => {
  let preenchido = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (arr[i][j] === 0) preenchido++
    }
  }
  return (preenchido === 0)
}

export default new Vuex.Store({
  state: {
    timePlayer: 1,
    game: 'start',
    squares: [],
    msg: ''
  },
  getters: {
    player: state => {
      return state.timePlayer
    },
    status: state => {
      return state.game
    },
    squares: state => {
      if (state.squares.length === 0) {
        for (let i = 3; i > 0; i--) {
          state.squares.push([0, 0, 0])
        }
      }
      return state.squares
    },
    msg: state => {
      return state.msg
    }
  },
  mutations: {
    CHANGE_PLAYER (state) {
      state.timePlayer = (state.timePlayer === 1) ? 2 : 1
    },
    PLAY (state, obj) {
      if (state.squares[obj.line][obj.square] === 0) state.squares[obj.line][obj.square] = obj.player
    },
    GAME_STATUS (state, obj) {
      for (let i = 0; i < 3; i++) {
        if (verificaHorizontal(state.squares, i, obj.player) || verificaVertical(state.squares, i, obj.player)) {
          state.game = 'over'
          state.msg = 'Jogador ' + obj.player + ' venceu!'
        }
      }
      if (verificaDiagonal(state.squares, obj.player)) {
        state.game = 'over'
        state.msg = 'Jogador ' + obj.player + ' venceu!'
      }
      if (verificaPreenchimento(state.squares)) {
        state.game = 'over'
        state.msg = 'Deu velha :('
      }
    },
    RESET (state) {
      state.timePlayer = 1
      state.game = 'start'
      state.squares = []
    }
  },
  actions: {
    changePlayer ({commit}) {
      commit('CHANGE_PLAYER')
    },
    play ({commit}, obj) {
      commit('PLAY', obj)
      commit('GAME_STATUS', obj)
    },
    reset ({commit}) {
      commit('RESET')
    }
  }
})
