import * as api from '@/sessions/api';

const ACTIVE_SESSION_POLLING_INTERVAL = 2000;

const sessionStatus = {
  CREATED: 'created',
  IN_PROGRESS: 'in progress',
  PAUSED: 'paused',
  COMPLETED: 'completed',
};

const activeSessionState = {
  data: {
    members: [],
    trainer: null,
    startedTime: '',
    sessionHash: '',
    status: '',
    askedQuestion: [],
  },
  isFetching: false,
  error: null,
  isGetActiveSessionPolling: {
    timerId: null,
    isStarted: false,
    error: null,
  },
};

const getters = {
  getActiveSession: state => ({ ...state.data }),
  getActiveSessionFetchingStatus: state => {
    const { isFetching, error } = state;
    return { isFetching, error };
  },
  getIsActiveSessionPollingStarted: state => {
    return state.isGetActiveSessionPolling.isStarted;
  },
  getIsSessionStarted: state => {
    return state.data.status === sessionStatus.IN_PROGRESS;
  },
  getIsSessionPaused: state => {
    return state.data.status === sessionStatus.PAUSED;
  },
  getIsSessionCompleted: state => {
    return state.data.status === sessionStatus.COMPLETED;
  },
};

const activeSessionMutations = {
  setActiveSession(state, activeSession) {
    state.data = activeSession;
  },
  toggleActiveSessionIsFetching(state) {
    state.isFetching = !state.isFetching;
  },
  setActiveSessionError(state, error) {
    state.error = error;
  },
  startActiveSession(state) {
    state.data.startedTime = new Date();
    state.data.status = sessionStatus.IN_PROGRESS;
  },
  pauseActiveSession(state) {
    state.data.status = sessionStatus.PAUSED;
  },
};

const pollingMutations = {
  setPollingTimerId(state, payload) {
    state.isGetActiveSessionPolling.timerId = payload;
  },
  togglePollingIsStarted(state) {
    state.isGetActiveSessionPolling.isStarted = !state.isGetActiveSessionPolling.isStarted;
  },
  setPollingError(state, payload) {
    state.isGetActiveSessionPolling.error = payload;
  },
};

const actions = {
  getActiveSession: async (context, payload) => {
    if (context.state.isFetching) {
      return;
    }
    context.commit('toggleActiveSessionIsFetching');
    try {
      const { data: activeSession } = await api.getActiveSession(payload);
      context.commit('setActiveSession', activeSession);
    } catch (e) {
      context.commit('setActiveSessionError', e);
    } finally {
      context.commit('toggleActiveSessionIsFetching');
    }
  },
  startPollingActiveSession: async (context, payload) => {
    context.commit('togglePollingIsStarted');
    try {
      const pollingTimerId = setInterval(() => {
        context.dispatch('getActiveSession', payload);
      }, ACTIVE_SESSION_POLLING_INTERVAL);
      context.commit('setPollingTimerId', pollingTimerId);
    } catch (err) {
      context.commit('setPollingError', err);
      context.dispatch('stopPollingActiveSession');
    }
  },
  stopPollingActiveSession: context => {
    clearInterval(context.state.isGetActiveSessionPolling.timerId);
    context.commit('togglePollingIsStarted');
  },
  updateSession: async context => {
    try {
      await api.updateSession(context.state.data);
    } catch (err) {
      context.dispatch('setActiveSessionError', err);
    }
  },
  startActiveSession: async context => {
    context.commit('startActiveSession');
    context.dispatch('updateSession');
  },
  pauseActiveSession: async context => {
    context.commit('pauseActiveSession');
    context.dispatch('updateSession');
  },
  stopActiveSession: async context => {
    context.commit('stopActiveSession');
    context.dispatch('updateSession');
  },
};

const mutations = {
  ...activeSessionMutations,
  ...pollingMutations,
};

export default {
  namespaced: true,
  state: activeSessionState,
  getters,
  mutations,
  actions,
};
