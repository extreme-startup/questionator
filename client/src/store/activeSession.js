import * as api from '@/contest-session/api';

const ACTIVE_SESSION_POLLING_INTERVAL = 2000;

const sessionStatus = {
  CREATED: 'created',
  IN_PROGRESS: 'in progress',
  PAUSED: 'paused',
  COMPLETED: 'completed',
};

const activeSessionState = {
  lastUpdateDateTime: 0,
  accumulatedAnsweredQuestions: {
    data: {},
  },
  data: {
    players: [],
    contest: {
      trainer: {},
    },
    startedTime: '',
    sessionHash: '',
    status: '',
    id: '',
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
  contenders: state => {
    const data = state.accumulatedAnsweredQuestions.data;
    return Object.keys(data).map(key => {
      return {
        nickname: data[key].nickname,
        score: data[key].answers.length ? data[key].answers[data[key].answers.length - 1].y : 0,
      };
    });
  },
  accumulatedAnsweredQuestions: state => {
    const data = state.accumulatedAnsweredQuestions.data;
    return Object.keys(data).map(key => {
      return {
        label: key,
        borderColor: data[key].color,
        data: data[key].answers,
      };
    });
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
  stopActiveSession(state) {
    state.data.status = sessionStatus.COMPLETED;
  },

  setAccumulatedAnsweredQuestions(state, accumulatedAnsweredQuestions) {
    state.accumulatedAnsweredQuestions.data = accumulatedAnsweredQuestions;
  },
  setLastUpdateDateTime(state, lastUpdateDateTime) {
    state.lastUpdateDateTime = lastUpdateDateTime;
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
  getContestSessionResults: async ({ commit, state }) => {
    const lastAnswerOn = await api.getLastAnswerOn(state.data.id);
    const { data } = await api.getContestSessionResults(state.data.id, state.lastUpdateDateTime);
    commit('setLastUpdateDateTime', lastAnswerOn.data);
    if (data && data.length) {
      commit(
        'setAccumulatedAnsweredQuestions',
        getUpdatedAnswers(data, state.accumulatedAnsweredQuestions.data),
      );
    }
  },
  getActiveSession: async (context, payload) => {
    if (context.state.isFetching) {
      return;
    }
    context.commit('toggleActiveSessionIsFetching');
    try {
      const { data: activeSession } = await api.getActiveSession(payload);
      context.commit('setActiveSession', activeSession);

      context.dispatch('getContestSessionResults');
    } catch (e) {
      context.commit('setActiveSessionError', e);
    } finally {
      context.commit('toggleActiveSessionIsFetching');
    }
  },
  setActiveSessionError: (context, payload) => {
    context.commit('setActiveSessionError', payload);
    context.commit('toggleActiveSessionIsFetching');
    context.dispatch('stopPollingActiveSession');
  },
  startPollingActiveSession: async (context, payload) => {
    context.commit('togglePollingIsStarted');
    try {
      const pollingTimerId = setInterval(() => {
        context.dispatch('getContestSessionResults');
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
    context.commit('setAccumulatedAnsweredQuestions', {});
    context.commit('setLastUpdateDateTime', 0);
  },
  startActiveSession: async context => {
    try {
      await api.startSession({ id: context.state.data.id });
      context.commit('startActiveSession');
    } catch (e) {
      context.dispatch('setActiveSessionError', e);
    }
  },
  pauseActiveSession: async context => {
    try {
      await api.pauseSession({ id: context.state.data.id });
      context.commit('pauseActiveSession');
      context.dispatch('stopPollingActiveSession');
    } catch (e) {
      context.dispatch('setActiveSessionError', e);
    }
  },
  stopActiveSession: async context => {
    try {
      await api.completeSession({ id: context.state.data.id });
      context.commit('stopActiveSession');
      context.dispatch('stopPollingActiveSession');
    } catch (e) {
      context.dispatch('setActiveSessionError', e);
    }
  },
};

const getRandomColor = () => {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getUpdatedAnswers = (inputData, currData = {}) => {
  return inputData.reduce((acc, curr) => {
    if (acc[curr.id]) {
      return {
        ...acc,
        [curr.id]: {
          nickname: curr.nickname,
          color: acc[curr.id].color,
          answers: getUpdatedAnswersByContender(curr.askedQuestions, acc[curr.id].answers),
        },
      };
    }

    return {
      ...acc,
      [curr.id]: {
        nickname: curr.nickname,
        color: getRandomColor(),
        answers: getUpdatedAnswersByContender(curr.askedQuestions),
      },
    };
  }, currData);
};

const getUpdatedAnswersByContender = (newAnswers, currentAnswers = []) => {
  return newAnswers.reduce((answers, answer) => {
    if (!answers.length) {
      return answers.concat({ x: answers.length, y: answer.score });
    }

    const aggregatedScore = answers[answers.length - 1].y + answer.score;

    return answers.concat({ x: answers.length, y: aggregatedScore });
  }, currentAnswers);
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
