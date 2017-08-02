import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const addZero = data => {
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
      const minute = addZero(obj.m)
      const second = addZero(obj.s)
      const milisecond = addZero(obj.ms)
      state.values.push(minute + ':' + second + '.' + milisecond)
    },
    RESET (state) {
      state.values = []
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
