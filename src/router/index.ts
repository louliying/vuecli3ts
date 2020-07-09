import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Login from '../views/login.vue';
import IndexPg from '../views/index.vue';
// () => import(/* webpackChunkName: "about" */ '../views/index.vue')

// common components
import SideMenu from '../components/common/sideMenu.vue';
import Header from '../components/common/header.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: IndexPg,
    children: [
        {
            path: 'sideMenu',
            name: 'SideMenu',
            component: SideMenu
        },{
          path: 'header',
            name: 'Header',
            component: Header
        },
        {
          path: '/refund',
          name: 'Refund',          
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../components/refund.vue')
      },
      {
          path: '/keeypromise',
          name: 'KeeyPromise',
          component: () => import(/* webpackChunkName: "about" */ '../components/keepPromise.vue')
      },
      {
        path: '/triproute',
        name: 'TripRoute',
        component: () => import(/* webpackChunkName: "about" */ '../components/tripRoute.vue')
      }
     ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
