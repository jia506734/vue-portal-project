import Vue from 'vue'
import Vuex from 'vuex'
import action from './action.js'
import mutations from './mutations.js'

// 引入 axios
import axios from 'axios'
Vue.use(Vuex)

const state={
  //全局变量
}

const store = new Vuex.Store({
  // 定义状态
  state:{
    count:0
  },
  mutations:{
    increment:state => state.count ++,
    decrement:state => state.count --,
  }
  
})

export default store