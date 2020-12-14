import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login.vue'
import home from './components/home.vue'
import welcome from './components/welcome.vue'
import users from './components/users.vue'
import roles from './components/power/roles.vue'
import rights from './components/power/rights.vue'
//引入 商品分类 cate 路由
import cate from './components/goods/cate.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home,
      redirect:'/welcome',
      children:[
        {
          path:'/welcome',
          component:welcome
        },
        {
          path:'/users',
          component:users
        },
        {
          path:'/roles',
          component:roles
        },
        {
        path:'/rights',
        component:rights
        },
        {
          path:'/categories',
          component:cate
        }
      ]
    },
   
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

  let token = window.sessionStorage.getItem('token')

  if (!token) return next('/login')
  next()
})
export default router
