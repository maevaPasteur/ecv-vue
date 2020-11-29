import Router from 'vue-router'
import Vue from 'vue'
import {isConnect, isAdmin} from "@/api/users";

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

        if(to.matched.some(route => route.meta.auth === "admin")) {

            isAdmin()
                .then(() => next())
                .catch(() => next({name: 'login'}))

        } else {

            isConnect()
                .then(() => next())
                .catch(() => next({name: 'login'}))

        }
    } else {
        return next()
    }
});

export default router
