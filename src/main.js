import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue'
import router from "./router";
import store from '@/store';
import moment from 'moment'

import Main from "./layouts/Main";

Vue.component('default-layout', Main);

Vue.config.productionTip = false;

Vue.use(Vuex);

Vue.filter('splitNumber', function (value) {
  return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : '';
});

Vue.filter('date', function (value) {
    const date = moment(value, 'YYYY-MM-DD');
    if(!date) return value;
    return date.format('DD/MM/YYYY');
});

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
