import Vue from 'vue'
import Router from 'vue-router'
import manage from '@/components/manage'
import login from '@/components/login'
import routeManage from '@/components/page/routeManage'
import ticketManage from '@/components/page/ticketManage'
import airLineManage from '@/components/page/airLineManage'
import insuranceManage from '@/components/page/insuranceManage'
import distributorManage from '@/components/page/distributorManage'
import configurationManage from '@/components/page/configurationManage'
import authorManage from '@/components/page/authorManage'
import newRoute from '@/components/page/newRoute'
import newTicket from '@/components/page/newTicket'
import mainPage from '@/components/page/mainPage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HuiChengTianXia',
      component: login
    },
    
    {
      path: '/manage',
      component: manage,
      name: '',
      children: [
        {
          path: '/mainPage',
          component: mainPage,
          meta: ['主页'],
        },
        {
        path: '/routeManage',
        component: routeManage,
        meta: ['线路管理'],
      },
      {
        path: '/ticketManage',
        component: ticketManage,
        meta: ['门票管理'],
      },
      {
        path: '/airLineManage',
        component: airLineManage,
        meta: ['机票管理'],
      },
      {
        path: '/insuranceManage',
        component: insuranceManage,
        meta: ['保险管理'],
      },
      {
        path: '/distributorManage',
        component: distributorManage,
        meta: ['分销商管理'],
      },
      {
        path: '/configurationManage',
        component: configurationManage,
        meta: ['配置管理'],
      },
      {
        path: '/authorManage',
        component: authorManage,
        meta: ['权限管理'],
      },
      {
        path: '/newRoute',
        component: newRoute,
         meta: ['新建线路'],
      },
      {
        path: '/newTicket',
        component: newTicket,
         meta: ['新建线路'],
      },
    ]
    }
  ]
})
