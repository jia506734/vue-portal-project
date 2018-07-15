import Vue from 'vue'
import Router from 'vue-router'
import manage from '@/components/manage'
import login from '@/components/login'
//import main from '@/components/page/main'


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
      path: '/manage',
      component: manage,
      name: '',
      // children: [{
      //   path: '',
      //   component: main,
      //   meta: [],
      // }]
    }
  ]
})
