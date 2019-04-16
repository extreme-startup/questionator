import * as api from '@/sessions/api';

const sessionState = {
  sessions: {
    data: [],
    isFetching: false,
    error: null,
  },
  addSession: {
    isFetching: false,
    error: null,
  },
};

const getters = {
  sessions: state => state.sessions.data,
  sessionsFetchingStatus: state => ({
    isFetching: state.sessions.isFetching,
    error: state.sessions.error,
  }),
  addSessionFetchingStatus: state => ({
    isFetching: state.addSession,
  }),
};

const setSessionMutations = {
  setSessions(state, sessions) {
    state.sessions.data = sessions;
  },
  setSessionsIsFetching(state) {
    state.sessions.isFetching = !state.sessions.isFetching;
  },
  setSessionsError(state, error) {
    state.sessions.error = error;
  },
};

const addSessionMutation = {
  addSessionIsFetching(state) {
    state.addSession.isFetching = !state.addSession.isFetching;
  },
  addSessionError(state, error) {
    state.addSession.error = error;
  },
};

const mutations = {
  ...setSessionMutations,
  ...addSessionMutation,
};

const actions = {
  getSessions: async context => {
    context.commit('setSessionsIsFetching');
    try {
      const { data } = await api.getSession();
      context.commit('setSessions', data);
    } catch (e) {
      context.commit('setSessionsError', e);
    } finally {
      context.commit('setSessionsIsFetching');
    }
  },
  addSession: async (context, payload) => {
    context.commit('addSessionIsFetching');
    try {
      await api.addSession(payload);
      context.dispatch('getSessions');
    } catch (e) {
      context.commit('addSessionError', e);
    } finally {
      context.commit('addSessionIsFetching');
    }
  },
};

export default {
  namespaced: true,
  state: sessionState,
  getters,
  mutations,
  actions,
};
