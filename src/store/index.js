import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'

// 引入 axios
import axios from 'axios'
Vue.use(Vuex)

const state={
	tenantId:'',//等路人的租户Id
  //全局变量
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})



