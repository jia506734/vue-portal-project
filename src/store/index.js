import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'

// 引入 axios
import axios from 'axios'
Vue.use(Vuex)

const state={
	tenantId:"ba43dd3f-a2db-11e8-8f98-52540016ed2f",//等路人的租户Id
	register:1,//1注册 0修改
  //全局变量
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})



