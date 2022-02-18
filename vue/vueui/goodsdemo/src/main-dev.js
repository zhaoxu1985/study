
import App from './App.vue'
import router from './router'

import './assets/css/global.css'
import '../src/assets/fonts/iconfont.css'
import axios from 'axios'

import TreeTable from 'vue-table-with-tree-grid'

import vueQuillEditor from 'vue-quill-editor'

Vue.use(vueQuillEditor)
import Nprogress from 'nprogress'
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
//响应拦截器
axios.interceptors.response.use(
  res => {
    console.log(res);
    return res
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)


Vue.component('tree-table',TreeTable)
Vue.prototype.$axios = axios
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
Vue.filter('dateFormat',(originVal)=>{
     //originVal :需要格式化的毫秒数
	const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth()+1+'').padStart(2,'0')
  const d = (dt.getDate()+'').padStart(2,'0')
  
  const hh = (dt.getHours()+'').padStart(2,'0')
  const mm = (dt.getMinutes()+'').padStart(2,'0')
  const ss = (dt.getSeconds()+'').padStart(2,'0')
  
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
