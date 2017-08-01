import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/components/Board'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/', // Change here if you need run the app in subfolders
  routes: [
    {
      path: '/',
      name: 'Board',
      component: Board
    }
  ]
})
