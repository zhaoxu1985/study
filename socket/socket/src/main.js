import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SocketIO from 'vue-socket.io'
import ClientSocketIO from 'socket.io-client'
import './assets/global/global.css'
import VueTouch from 'vue-touch'

Vue.use(VueTouch) 
axios.defaults.validateStatus = status=> true
axios.defaults.baseURL='http://tj.testw.top/v1/'
Vue.prototype.$axios = axios

//获取年月日 格式 ` 2020-01-01`  
Vue.prototype.$getDate = ()=>{
  let now = new Date()
  let y = now.getFullYear()
  let m = now.getMonth() + 1
  let d = now.getDate()
  m >= 10 ? '' : m = '0' + (now.getMonth() + 1)
  d >= 10 ? '' : d = '0' + now.getDate()
  return `${y}-${m}-${d}`
}

//获取事件 ` 00:00`
Vue.prototype.$getTime= ()=>{
  let now = new Date()
  let hh = now.getHours()
  let mm = now.getMinutes()
  // hh == 00 ? hh = 24 : ''
  hh >= 10 ? '' : hh = '0' + hh
  mm >= 10 ? '' : mm = '0' + mm
  return `${hh}:${mm}`
}
new Vue({
  router,
  render: h => h(App)

}).$mount('#app')
