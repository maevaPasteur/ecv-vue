import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue'
import router from "./router";
import store from '@/store';

import Main from "./layouts/Main";

Vue.component('default-layout', Main);

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
