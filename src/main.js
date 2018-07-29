// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/'
//import store from './service/config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import assets from './assets/cookie.js'
import  VueQuillEditor from 'vue-quill-editor'

//import '/tools/getBrowserLang'

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(VueQuillEditor)

Vue.prototype.assets= assets;
// var browserLang = (getBrowerLang()==="zh-CN"?'zh':'en')
const i18n = new VueI18n({
  locale: 'zh',    // 语言标识
  messages:{
    'zh':require('./assets/i18n/zh'),
    'en':require('./assets/i18n/en')
  }

})


Vue.use(ElementUI,{size:'small'})
//Vue.config.productionTip=false;
var vm = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
