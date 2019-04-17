import Vue from 'vue';
import Vuex from 'vuex';
import question from './question';
import session from './session';
import form from './form';
import contest from './contest';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    isUserLoggedIn: false,
  },
  getters: {},
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
    session,
  },
});

export default store;
