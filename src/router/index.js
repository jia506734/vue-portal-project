import Vue from 'vue'
import Router from 'vue-router'
import manageCenter from '@/components/manageCenter'
import login from '@/components/login'
import register from '@/components/register'

import routeManage from '@/components/page/routeManage'
import ticketManage from '@/components/page/ticketManage'
import airLineManage from '@/components/page/airLineManage'
import insuranceManage from '@/components/page/insuranceManage'
import distributorManage from '@/components/page/distributorManage'
import dictionaryMgt from '@/components/configManage/dictionaryMgt'
import authorManage from '@/components/page/authorManage'//权限管理
import menuManage from '@/components/authorMgt/menuManage'
import roleManage from '@/components/authorMgt/roleManage'
import userManage from '@/components/authorMgt/userManage'
import tenantManage from '@/components/authorMgt/tenantManage'
import newRoute from '@/components/page/newRoute'
import newTicket from '@/components/page/newTicket'
import mainPage from '@/components/page/mainPage'
import showRouteDetail from '@/components/page/showRouteDetail'

Vue.use(Router)
export default new Router({
  
  routes: [
    {
      path: '/index.html',
      component: login
    },
    {
      path: '/register',
      component: register,
      meta: ['用户管理'],
    },
    {
      path: '/showRouteDetail',
      component: showRouteDetail,
      meta: ['线路详情'],
    },
    {
      path: '/manageCenter',
      component: manageCenter,
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
        path: '/dictionaryMgt',
        component: dictionaryMgt,
        meta: ['字典管理'],
      },
      {
          path: '/menuManage',
          component: menuManage,
          meta: ['菜单管理'],
        },
        {
          path: '/userManage',
          component: userManage,
          meta: ['用户管理'],
        },
        {
          path: '/roleManage',
          component: roleManage,
          meta: ['角色管理'],
        },
        {
          path: '/tenantManage',
          component: tenantManage,
          meta: ['租户管理'],
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
