import Router from 'vue-router'
import Vue from 'vue'
import {isConnect, isAdmin} from "@/api/users";
import store from '../store/index';

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

            if(store && store.state && store.state.session && store.state.session.role) {
                next()
            } else {
                isAdmin()
                    .then(() => next())
                    .catch(() => next({name: 'login'}))
            }

        } else {

            if(store && store.state && store.state.session) {
                next()
            } else {
                isConnect()
                    .then(() => next())
                    .catch(() => next({name: 'login'}))
            }
        }
    } else {
        return next()
    }
});

export default router
