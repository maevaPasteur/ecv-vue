import Router from 'vue-router'
import Vue from 'vue'
import userApi from '@/api/users'

import newsRoutes from "./news";
import concertsRoutes from "./concerts"
import frontRoutes from "./front";

import Backoffice from "../pages/backoffice/Index";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
          path: '/admin',
          name: 'admin',
          component: Backoffice
        },
        ...frontRoutes,
        ...newsRoutes,
        ...concertsRoutes
    ]
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(route => route.meta.auth)) {
        try {
            await userApi.verifyUser();
            return next()
        } catch (e) {
            localStorage.removeItem('token');
            return next('/login')
        }
    } else {
        return next()
    }
});

export default router
