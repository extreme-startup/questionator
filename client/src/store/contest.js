import Vue from 'vue';
import * as api from '@/api/contest';

const contestState = {
  accumulatedAnsweredQuestions: {
    data: {},
    lastUpdateDateTime: null,
  },
};

const getters = {
  accumulatedAnsweredQuestions: state => {
    const data = state.accumulatedAnsweredQuestions.data;
    return Object.keys(data).map(key => {
      return {
        label: key,
        borderColor: data[key].color,
        data: data[key].answers,
        totalScore: data[key].answers[data[key].answers.length - 1].y,
      };
    });
  },
  lastUpdateDateTime: state => state.accumulatedAnsweredQuestions.lastUpdateDateTime,
};

const setAnsweredQuestionsMutations = {
  setAccumulatedAnsweredQuestions(state, answeredQuestions) {
    state.accumulatedAnsweredQuestions.data = getUpdatedAnswers(
      answeredQuestions,
      state.accumulatedAnsweredQuestions.data,
    );
  },
  setLastUpdateDateTime(state, lastUpdateDateTime) {
    state.accumulatedAnsweredQuestions.lastUpdateDateTime = lastUpdateDateTime;
  },
};

const mutations = {
  ...setAnsweredQuestionsMutations,
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
  return Object.keys(inputData).reduce((acc, curr) => {
    if (acc[curr]) {
      return {
        ...acc,
        [curr]: {
          color: acc[curr].color,
          answers: getUpdatedAnswersByContender(inputData[curr], acc[curr].answers),
        },
      };
    }

    return {
      ...acc,
      [curr]: {
        color: getRandomColor(),
        answers: getUpdatedAnswersByContender(inputData[curr]),
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

const actions = {
  getAnsweredQuestions: async ({ commit, state }, contestSessionId) => {
    const { data } = await api.resultSession(
      contestSessionId,
      state.accumulatedAnsweredQuestions.lastUpdateDateTime,
    );

    if (data && data.length) {
      commit('setAccumulatedAnsweredQuestions', Vue._.groupBy(data, 'contestPlayerId'));
      commit('setLastUpdateDateTime', Number(new Date(data[data.length - 1].answeredOn)));
    }
  },
};

export default {
  namespaced: true,
  state: contestState,
  getters,
  mutations,
  actions,
};
