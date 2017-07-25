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
  mutations: {
    mark (state, obj) {
      let minute = addZero(obj.m)
      let second = addZero(obj.s)
      let milisecond = addZero(obj.ms)
      state.values.push(minute + ':' + second + '.' + milisecond)
      return state.values
    },
    reset (state) {
      state.values = []
      return state.values
    }
  }
})
