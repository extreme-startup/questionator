import * as api from '@/contenders/api';

const CUSTOMERS_POLLING_INTERVAL = 2000;

const contendersState = {
  contenders: [],
  isFetching: false,
  error: null,
  isGetContendersPolling: {
    timerId: null,
    isStarted: false,
    error: null,
  },
};

const getters = {
  getContenders: state => state.contenders,
  getContendersFetchingStatus: state => {
    const { isFetching, error } = state;
    return { isFetching, error };
  },
  getIsGetContendersPollingStarted: state => {
    return state.isGetContendersPolling.isStarted;
  },
};

const contendersMutations = {
  setContenders(state, contenders) {
    state.contenders = contenders;
  },
  toggleContendersIsFetching(state) {
    state.contenders.isFetching = !state.contenders.isFetching;
  },
  setContendersError(state, error) {
    state.contenders.error = error;
  },
};

const pollingMutations = {
  setPollingTimerId(state, payload) {
    state.isGetContendersPolling.timerId = payload;
  },
  togglePollingIsStarted(state) {
    state.isGetContendersPolling.isStarted = !state.isGetContendersPolling.isStarted;
  },
  setPollingError(state, payload) {
    state.isGetContendersPolling.error = payload;
  },
};

const actions = {
  getContenders: async (context, payload) => {
    if (context.state.isFetching) {
      return;
    }
    context.commit('toggleContendersIsFetching');
    try {
      const { data } = await api.getContenders(payload);
      context.commit('setContenders', data);
    } catch (e) {
      context.commit('setContendersError', e);
    } finally {
      context.commit('toggleContendersIsFetching');
    }
  },
  startPollingContenders: async (context, payload) => {
    context.commit('togglePollingIsStarted');
    try {
      const pollingTimerId = setInterval(() => {
        context.dispatch('getContenders', payload);
      }, CUSTOMERS_POLLING_INTERVAL);
      context.commit('setPollingTimerId', pollingTimerId);
    } catch (err) {
      context.commit('setPollingError', err);
      context.dispatch('stopPollingContenders');
    }
  },
  stopPollingContenders: context => {
    clearInterval(context.state.isGetContendersPolling.timerId);
    context.commit('togglePollingIsStarted');
  },
};

const mutations = {
  ...contendersMutations,
  ...pollingMutations,
};

export default {
  namespaced: true,
  state: contendersState,
  getters,
  mutations,
  actions,
};
