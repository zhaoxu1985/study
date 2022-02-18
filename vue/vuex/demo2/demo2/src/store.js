import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    obj: [],
    activeName: 'first',
    countClick: '', // 记录上一次的选项卡
    addInput: '',
    countIndex: 8
  },
  mutations: {
    getList(state, data) {
      state.obj = data
    },

    //监听tab切换事件
    handleClick(state, tab) {

      state.activeName = tab.name
      if (tab.name == 'second') {

      }
      console.log(state.activeName);
    },
    //获取选中项
    handleSelectionChange(state, e) {
      console.log(e);
      
    },

    //删除代办事项按钮
    deleted(state, id) {

      for (let i = 0; i < state.obj.length; i++) {
        if (state.obj[i].id == id) {
          state.obj.splice(i, 1)
        }
      }
    },
    handleInputChange(state, val) {
      state.addInput = val
      // console.log(state.addInput);
    },
    //添加事项
    addListValue(state, val) {
      state.countIndex++;
      const obj = {
        id: state.countIndex,
        value: val,
        isTrue: false
      }
      state.obj.push(obj)
    },

    // 多选框触发事件
    selectChange(state,isTrue){
      state.obj.find(x=>x.id==isTrue[1].id).isTrue=isTrue[0]
      console.log(state.obj);
    }
  },
  actions: {
    async AsyncGetList(connext, n) {
      let {
        data: res
      } = await axios.get('/list.json')
      connext.commit('getList', res)
    }
  },
  getters: {
    isFalse(state) {
      let newObj = []
      for (let i = 0; i < state.obj.length; i++) {
        if (state.obj[i].isTrue == false) {
          newObj.push(state.obj[i])
        }
      }
      // console.log('isFalse getters');
      return newObj
    },
    already: function (state) {
      let newObj = []
      for (let i = 0; i < state.obj.length; i++) {
        if (state.obj[i].isTrue == true) {
          newObj.push(state.obj[i])
        }
      }
      return newObj
    }
  }
})