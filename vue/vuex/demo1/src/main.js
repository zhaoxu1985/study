// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
Vue.config.silent = true
import form from '@/components/form'
Vue.use(form)
//ssss
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
