import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let send = () => import(/* webpackChunkName: "home" */ './components/send.vue')
let home = ()=>import(/* webpackChunkName: "messageList" */ './components/home.vue')
let signUp = ()=>import(/* webpackChunkName: "signUp" */ './components/signUp.vue')
let theContent = ()=>import(/* webpackChunkName: "theContent" */ './components/theContent.vue')
let contact = ()=>import(/* webpackChunkName: "contact" */ './components/contact.vue')

const sheshi = ()=>import(/* webpackChunkName: "contact" */ './components/sheshi.vue')
const editSelfData = ()=>import(/* webpackChunkName: "contact" */ './components/editSelfData.vue')
const login = ()=>import(/* webpackChunkName: "contact" */ './components/login.vue')

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'signUp',
      component: signUp
    }
      , 
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
        
        {
          path: '/theContent',
          name: 'theContent',
          component: theContent
        }
        ,
        {
          path: '/contact',
          name: 'contact',
          component: editSelfData
        },
        {
          path: '/login',
          name: 'login',
          component: login
        },
      ]
    },
    {
      path: '/send',
      name: 'send',
      component: send
    },
   
   
  ]
})

Vue.config.productionTip = false

router.beforeEach(function(to,form,next){
	//如果用户访问的登录页,直接放行
    if(to.path==='/') return next()
    //从sessionStorage 中获取 保存的token信息（值）
    const tokenStr = window.sessionStorage.getItem('uname')
    //没有token,强制跳转到登录页面
    if(!tokenStr) return next('/')
    //如果有，就直接放行
    next()
})

// axios.interceptors.request.use((config)=>{
//     if(config.url=='/loginUpload'){
//       config.headers.post["Content-Type"] = "multipart/form-data"
//     }
//     return config
// })

export default router