import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import '../src/assets/fonts/iconfont.css'
import axios from 'axios'
import '../node_modules/font-awesome/css/font-awesome.css'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.config.productionTip = false
//请求拦截器
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
   
    config.headers.Authorization=window.sessionStorage.getItem('token')
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
