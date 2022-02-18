import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  //定义共享数据对象  state
    state:{
      count: 0,
      a:123,
      b:"2'2"
    },
    mutations:{
      addCount(state,i){
        state.count+=i
        console.log(i);
      }
    },
    actions:{
      addCountAsync(context,n){
        setTimeout(function () { 
          context.commit('addCount',n)
         },2000)
          
      }
    }

})
export default store