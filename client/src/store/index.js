import Vue from 'vue';
import Vuex from 'vuex';
import question from './question';
import contestSession from './contest-session';
import form from './form';
import contest from './contest';
import contenders from './contenders';
import activeSession from './activeSession';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    isUserLoggedIn: false,
  },
  getters: {
    userId: state => state.user.id,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isUserLoggedIn = !!user;
    },
  },
  actions: {
    login({ commit }) {},
    setUser({ commit }, user) {
      commit('setUser', user);
    },
  },
  modules: {
    question,
    form,
    contest,
    contestSession,
    contenders,
    activeSession,
  },
});

export default store;
