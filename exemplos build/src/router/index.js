import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Clock from '@/components/Clock'
import Stopwatch from '@/components/Stopwatch'
import All from '@/components/All'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/', // Change hear if you need run the app in subfolders
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/clock',
      name: 'Clock',
      component: Clock
    },
    {
      path: '/sw',
      name: 'Stopwatch',
      component: Stopwatch
    },
    {
      path: '/all',
      name: 'All',
      component: All
    }
  ]
})
