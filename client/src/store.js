import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isUserLoggedIn: false,
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
});
