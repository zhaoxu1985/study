import Vue from "vue";
import App from "./App.vue";
import Message from '@/components/Message'

Vue.prototype.$message = Message
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
