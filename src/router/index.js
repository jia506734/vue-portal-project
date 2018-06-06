import Vue from 'vue'
import Router from 'vue-router'
import common from '@/components/common'
import login from '@/components/login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    // {
    //   path:'/main',
    //   name:'innomain',
    //   component:common,
    //   redirect:'/main',
    //   beforeEnter:(to,from,next)=>{

    //   }
    // },
    {
      path: '/common',
      component: common,
      name: '',
      children: [{
        path: '',
        //component: home,
        meta: [],
      }]
    }
  ]
})
