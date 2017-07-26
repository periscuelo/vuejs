import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let addZero = data => {
  return (data < 10) ? '0' + data : data
}

export default new Vuex.Store({
  state: {
    values: []
  },
  getters: {
    values: state => {
      return state.values
    }
  },
  mutations: {
    MARK (state, obj) {
      let minute = addZero(obj.m)
      let second = addZero(obj.s)
      let milisecond = addZero(obj.ms)
      state.values.push(minute + ':' + second + '.' + milisecond)
      return state.values
    },
    RESET (state) {
      state.values = []
      return state.values
    }
  },
  actions: {
    mark ({commit}, obj) {
      commit('MARK', obj)
    },
    reset ({commit}) {
      commit('RESET')
    }
  }
})
