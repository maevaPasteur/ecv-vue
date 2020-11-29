import Vuex from 'vuex'
import Vue from 'vue'

import news from "./modules/news";
import albums from "./modules/albums";
import genres from "./modules/genres";
import artists from "./modules/artists";
import concerts from "./modules/concerts";
import session from "./modules/session";

Vue.use(Vuex);

const state = {
  ...news.state,
  ...albums.state,
  ...genres.state,
  ...artists.state,
  ...concerts.state,
  ...session.state
};

const mutations = {
  ...news.mutations,
  ...albums.mutations,
  ...genres.mutations,
  ...artists.mutations,
  ...concerts.mutations,
  ...session.mutations
};

const actions = {
  ...news.actions,
  ...albums.actions,
  ...genres.actions,
  ...artists.actions,
  ...concerts.actions,
  ...session.actions
};

const getters = {
  ...news.getters,
  ...albums.getters,
  ...genres.getters,
  ...artists.getters,
  ...concerts.getters,
  ...session.getters
};

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
});

global.store = store;

export default store;