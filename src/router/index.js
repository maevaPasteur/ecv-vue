import Router from 'vue-router'
import Vue from 'vue'
import userApi from '@/api/users'

import Home from "../pages/Home";
import Test from "../pages/Test";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.auth)) {
    try {
      await userApi.verifyUser()
      return next()
    } catch (e) {
      localStorage.removeItem('token')
      return next('/login')
    }
  } else {
    return next()
  }
})

export default router
