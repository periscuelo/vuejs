import Vue from 'vue'
import Router from 'vue-router'
import VueHead from 'vue-head'
import Hello from '@/components/Hello'
import Clock from '@/components/Clock'
import Stopwatch from '@/components/Stopwatch'
import All from '@/components/All'

// Lazy Load (Add comment to the imports components above and remove comment below)
/* const Hello = () => import('@/components/Hello')
const Clock = () => import('@/components/Clock')
const Stopwatch = () => import('@/components/Stopwatch')
const All = () => import('@/components/All') */

Vue.use(Router)
Vue.use(VueHead)

export default new Router({
  mode: 'history',
  base: '/', // Change here if you need run the app in subfolders
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
