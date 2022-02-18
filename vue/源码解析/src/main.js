import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
Vue.config.productionTip = false
Vue.use(Element)
import 'element-ui/lib/theme-chalk/index.css';
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
