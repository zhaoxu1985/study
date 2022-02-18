import Vue from 'vue'
import Router from 'vue-router'


const login = () => import(/* webpackChunkName:"login_home_welcome"*/ './components/login.vue')
const home = () => import(/* webpackChunkName:"home"*/ './components/home.vue')

const welcome = () => import(/* webpackChunkName:"login_home_welcome"*/ './components/welcome.vue')


const users = () => import(/* webpackChunkName:"users"*/ './components/users.vue')
const roles = () => import(/* webpackChunkName:"roles_rights"*/ './components/power/roles.vue')
const rights = () => import(/* webpackChunkName:"roles_rights"*/ './components/power/rights.vue')

//引入 商品分类 cate 路由


const cate = () => import(/* webpackChunkName:"cate"*/ './components/goods/cate.vue')
const List = () => import(/* webpackChunkName:"List"*/ './components/goods/List.vue')
const params = () => import(/* webpackChunkName:"params"*/ './components/goods/params.vue')

const order = () => import(/* webpackChunkName:"order"*/ './components/order/Order.vue')
const add = () => import(/* webpackChunkName:"order_add_report"*/ './components/goods/add.vue')
const report = () => import(/* webpackChunkName:"order_add_report"*/ './components/report/report.vue')                  

const showGoods = () => import(/* webpackChunkName:"showGoods"*/ './components/show/showGoods.vue')                  

const detail = () => import(/* webpackChunkName:"detail"*/ './components/show/detail.vue')                  


Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
   
    {
      path: '/login',
      component: login
    },
    {
      path:'/showGoods',
      component:showGoods
    },
    {
      path:'/detail',
      component:detail
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
        },
        {
          path:'/params',

          component:params
        },
        {
          path:'/goods',
          component:List  
        },
        {
          path:'/goods/add',
          component:add
        },
        {
          path:"/orders",
          component:order
        },
        {
          path:'/reports',
          component:report
        }
      ]
    },
   
  ]
})
router.beforeEach((to, from, next) => {
  document.title='后台管理系统'
  
  if(to.path ===`/showGoods`) return next()
  if (to.path === '/login') return next()

  let token = window.sessionStorage.getItem('token')

  if (!token) return next('/login')
  next()
})
export default router
