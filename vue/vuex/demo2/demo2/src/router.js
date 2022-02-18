import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const select = () => import(/* webpackChunkName: "select" */ './components/select.vue')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'select',
      component: select
    },
    
  ]
})
