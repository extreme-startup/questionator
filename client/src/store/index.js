import Vue from 'vue';
import Vuex from 'vuex';
import question from './question';
import contestSession from './contest-session';
import form from './form';
import contenders from './contenders';
import activeSession from './activeSession';
import training from './training';

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
    contestSession,
    contenders,
    activeSession,
    training,
  },
});

export default store;
