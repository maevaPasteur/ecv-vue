import Router from 'vue-router'
import Vue from 'vue'
import API from "@/api/config";

import newsRoutes from "./news";
import concertsRoutes from "./concerts";
import artistsRoutes from "./artists";
import albumsRoutes from "./albums";
import frontRoutes from "./front";
import adminRoutes from './admin'

Vue.use(Router);

const router = new Router({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    mode: 'history',
    base: '/',
    routes: [
        ...frontRoutes,
        ...newsRoutes,
        ...concertsRoutes,
        ...artistsRoutes,
        ...albumsRoutes,
        ...adminRoutes
    ]
});


router.beforeEach(async (to, from, next) => {
    if (to.matched.some(route => route.meta.auth)) {

        if(!localStorage.getItem('token')) return next({name: 'login'});

        API.head('/admin').then(res => {
            if (res.statusText === 'OK') return next();
            else return next({name: 'login'})
        }).catch(() => next({name: 'login'}))

    } else {
        return next()
    }
});

export default router
